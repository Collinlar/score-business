export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { generateScoreReport } from "@/lib/claude";
import { calculateScore } from "@/lib/scoring";
import { getSupabaseAdmin } from "@/lib/supabase";
import { isEnvConfigurationError } from "@/lib/env";
import type { AssessmentAnswers, DimensionScores, ScoreReport } from "@/types";

export async function POST(req: NextRequest) {
  let report: ScoreReport | undefined;
  let scores: DimensionScores | undefined;

  try {
    const body = await req.json();
    const { answers, sessionId } = body as {
      answers:   AssessmentAnswers;
      sessionId: string;
    };

    if (!answers || !sessionId) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Score client-side logic mirrored server-side for integrity
    scores = calculateScore(answers);

    // Generate AI report — 8 second timeout
    const controller = new AbortController();
    const timeout    = setTimeout(() => controller.abort(), 8000);

    try {
      report = await generateScoreReport(answers, scores, {
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }

    // Persist to Supabase (errors are returned, not thrown)
    const db = getSupabaseAdmin();
    const { error: persistError } = await db.from("score_results").insert({
      session_id:       sessionId,
      business_name:    answers.businessName,
      industry:         answers.industry,
      city:             answers.city,
      answers:          answers,
      dimension_scores: scores,
      total_score:      scores.total,
      grade:            report.grade,
      report:           report,
    });

    if (persistError) {
      console.error("[generate-score] supabase insert:", persistError);
      return NextResponse.json(
        {
          error:
            "Your score is ready but we could not save it. Confirm SUPABASE_SERVICE_ROLE_KEY and the score_results table in Supabase.",
          report,
          scores,
        },
        { status: 503 }
      );
    }

    return NextResponse.json({ report, scores });
  } catch (err) {
    console.error("[generate-score]", err);
    if (isEnvConfigurationError(err)) {
      return NextResponse.json(
        {
          error: err.message,
          ...(report !== undefined && scores !== undefined ? { report, scores } : {}),
        },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { error: "We could not read your business signals just now. Tap to try again." },
      { status: 500 }
    );
  }
}
