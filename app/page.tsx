"use client";

import { useState } from "react";
import BrandBar from "@/components/brand/BrandBar";
import LandingView from "@/components/brand/LandingView";
import AssessmentForm from "@/components/brand/AssessmentForm";
import LoadingScreen from "@/components/brand/LoadingScreen";
import PartialResult from "@/components/brand/PartialResult";
import WhatsAppGate from "@/components/brand/WhatsAppGate";
import FullReport from "@/components/brand/FullReport";
import { funnelPhaseKey } from "@/lib/funnelStepKey";
import { calculateScore } from "@/lib/scoring";
import { generateSessionId } from "@/lib/utils";
import type { AssessmentAnswers, DimensionScores, ScoreReport, AssessmentStep } from "@/types";

const SESSION_ID = generateSessionId();

export default function Home() {
  const [step, setStep] = useState<AssessmentStep>("landing");
  const [answers, setAnswers] = useState<Partial<AssessmentAnswers>>({});
  const [scores, setScores] = useState<DimensionScores | null>(null);
  const [report, setReport] = useState<ScoreReport | null>(null);
  const [phone, setPhone] = useState("");
  const [apiError, setApiError] = useState("");

  async function handleFormComplete(finalAnswers: AssessmentAnswers) {
    setAnswers(finalAnswers);
    setStep("loading");
    setApiError("");

    const dimensionScores = calculateScore(finalAnswers);
    setScores(dimensionScores);

    try {
      const res = await fetch("/api/generate-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: finalAnswers, sessionId: SESSION_ID }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.report) setReport(data.report);
        if (data.scores) setScores(data.scores);
        setApiError(data.error ?? "We could not read your business signals just now. Tap to try again.");
        setStep("partial");
        return;
      }

      setReport(data.report);
      setStep("partial");
    } catch {
      setStep("partial");
    }
  }

  async function handleGateVerified(verifiedPhone: string) {
    setPhone(verifiedPhone);

    fetch("/api/capture-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: verifiedPhone,
        businessName: answers.businessName,
        industry: answers.industry,
        city: answers.city,
        score: scores?.total ?? 0,
        grade: report?.grade ?? "F",
      }),
    }).catch(console.error);

    setStep("full");
  }

  const phaseKey = funnelPhaseKey(step);

  return (
    <div className="min-h-screen bg-[#0B0907] flex flex-col">
      <BrandBar />

      <main className="flex-1 w-full max-w-2xl mx-auto px-3 sm:px-4 py-5 sm:py-6 flex flex-col">
        <div className="flex-1 bg-[#141210] rounded-2xl border border-white/[0.08] px-4 py-6 sm:px-6">
          <div key={phaseKey} className="animate-funnel-enter">
            {step === "landing" && <LandingView onStart={() => setStep("q1")} />}

            {["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"].includes(step) && (
              <AssessmentForm
                initialAnswers={answers}
                initialStep={step as AssessmentStep}
                onComplete={handleFormComplete}
              />
            )}

            {step === "loading" && <LoadingScreen />}

            {step === "partial" && report && scores && (
              <>
                {apiError && (
                  <div className="mb-4 px-4 py-3 bg-[#141210] border border-orange/30 rounded-lg text-sm text-orange">
                    {apiError}
                  </div>
                )}
                <PartialResult
                  report={report}
                  scores={scores}
                  businessName={answers.businessName ?? ""}
                  onUnlock={() => setStep("gate")}
                />
              </>
            )}

            {step === "gate" && (
              <div className="py-6">
                <WhatsAppGate onVerified={handleGateVerified} />
              </div>
            )}

            {step === "full" && report && scores && (
              <FullReport
                report={report}
                scores={scores}
                answers={answers as AssessmentAnswers}
                phone={phone}
              />
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-white/[0.08] bg-[#0B0907] py-4 px-4">
        <p className="text-xs text-white/40 text-center max-w-2xl mx-auto">
          Ghana Business Score by{" "}
          <a
            href="https://b-vm.com"
            className="text-orange font-medium hover:underline underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            BVM Digital
          </a>{" "}
          &middot;{" "}
          <a
            href="https://b-vm.com/privacy"
            className="text-white/40 hover:text-white/70 hover:underline underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy
          </a>
        </p>
      </footer>
    </div>
  );
}
