"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import ScoreRing from "@/components/brand/ScoreRing";
import DimensionBreakdown from "@/components/brand/DimensionBreakdown";
import CTABlock from "@/components/brand/CTABlock";
import type { ScoreReport, DimensionScores, AssessmentAnswers } from "@/types";

interface FullReportProps {
  report: ScoreReport;
  scores: DimensionScores;
  answers: AssessmentAnswers;
  phone?: string;
}

const TIMEFRAME_STYLE: Record<string, string> = {
  "This week": "bg-teal-light text-teal-dark",
  "This month": "bg-gold-light text-gold-dark",
  "Next 30 days": "bg-subtle text-mid",
};

export default function FullReport({ report, scores, answers }: FullReportProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `My Ghana Business Score is ${report.score}/100 (Grade ${report.grade}). Find out where your business stands: score.b-vm.com`;

  function handleShare() {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
  }
  function handleCopy() {
    navigator.clipboard.writeText("https://score.b-vm.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="py-3 space-y-10">
      <div className="rounded-2xl border border-border bg-subtle/70 px-4 py-8 sm:px-6">
        <p className="text-xs font-semibold text-mid uppercase tracking-widest mb-5 text-center">
          {answers.businessName} · {answers.city} · {answers.industry}
        </p>
        <div className="flex flex-col items-center">
          <ScoreRing score={report.score} grade={report.grade} />
          <div className="mt-8 w-full border-l-[3px] border-teal pl-4 animate-score-headline">
            <h2 className="text-lg font-semibold text-ink leading-display mb-2">{report.headline}</h2>
            <p className="text-sm text-mid leading-body">{report.summary}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-mid uppercase tracking-widest mb-5">
          Score breakdown
        </h3>

        <div className="border border-border rounded-xl bg-white px-4 py-5">
          <DimensionBreakdown scores={scores} variant="grouped" />
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-mid uppercase tracking-widest mb-4">
          Your 3 biggest gaps
        </h3>
        <div className="space-y-3">
          {report.top_gaps.map((gap, i) => (
            <div key={i} className="rounded-xl border border-border bg-white overflow-hidden">
              <div className="px-4 pt-4 pb-3">
                <p className="text-xs font-semibold text-teal uppercase tracking-wide mb-2">
                  {gap.gap_title}
                </p>
                <p className="text-sm font-semibold text-ink leading-body">{gap.impact}</p>
                <p className="text-xs text-mid mt-1.5 leading-body">{gap.gap_description}</p>
              </div>
              <div className="border-t border-border bg-subtle px-4 py-3">
                <p className="text-xs font-semibold text-teal-dark mb-1">First step</p>
                <p className="text-sm text-ink leading-body">{gap.fix}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-mid uppercase tracking-widest mb-1">
          Your 5 priority actions
        </h3>
        <p className="text-xs text-mid mb-4">In the order that moves the needle fastest.</p>
        <div className="border border-border rounded-xl overflow-hidden divide-y divide-border">
          {report.priority_actions.map((item, i) => (
            <div key={i} className="flex items-start gap-3 px-4 py-3.5 bg-white">
              <span className="w-6 h-6 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-ink leading-body">{item.action}</p>
                <span
                  className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded mt-1.5 inline-block",
                    TIMEFRAME_STYLE[item.timeframe] ?? "bg-subtle text-mid",
                  )}
                >
                  {item.timeframe}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-bblue-light border border-bblue rounded-xl p-4">
        <p className="text-xs font-semibold text-bblue uppercase tracking-wide mb-2">
          How you compare
        </p>
        <p className="text-sm text-ink leading-body">{report.benchmark}</p>
      </div>

      <div>
        <p className="text-sm font-semibold text-ink mb-1">
          Most business owners in your network do not know their score.
        </p>
        <p className="text-sm text-mid mb-4 leading-body">
          Be the one who sends it. Every person who takes the score using your link sees exactly
          where their own business needs work.
        </p>
        <div className="flex gap-3 flex-col sm:flex-row">
          <button
            type="button"
            onClick={handleShare}
            className="flex-1 min-h-[44px] bg-[#25D366] text-white text-sm font-semibold rounded-lg px-4 py-3"
          >
            Share on WhatsApp
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="sm:w-auto w-full min-h-[44px] border border-border text-sm font-medium rounded-lg px-4 py-3 text-ink"
          >
            {copied ? "Copied" : "Copy link"}
          </button>
        </div>
      </div>

      <CTABlock businessName={answers.businessName} score={report.score} />
    </div>
  );
}
