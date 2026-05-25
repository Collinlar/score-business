"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import ScoreRing from "@/components/brand/ScoreRing";
import DimensionBreakdown from "@/components/brand/DimensionBreakdown";
import CTABlock from "@/components/brand/CTABlock";
import type { ScoreReport, DimensionScores, AssessmentAnswers } from "@/types";

interface FullReportProps {
  report:  ScoreReport;
  scores:  DimensionScores;
  answers: AssessmentAnswers;
  phone?:  string;
}

const TIMEFRAME_STYLE: Record<string, string> = {
  "This week":    "bg-orange/[0.12] text-orange",
  "This month":   "bg-gold/[0.12] text-gold",
  "Next 30 days": "bg-white/[0.06] text-white/40",
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
    <div className="py-3 space-y-8">

      {/* ── SCORECARD ─────────────────────────────────────── */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #1a1410 0%, #0f0c08 100%)",
          border: "1px solid rgba(255,122,0,0.14)",
          boxShadow: "0 0 40px -20px rgba(255,122,0,0.20)",
        }}
      >
        {/* Business identity strip */}
        <div className="px-4 pt-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-orange shrink-0" aria-hidden />
          <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest truncate">
            {answers.businessName} · {answers.city} · {answers.industry}
          </p>
        </div>

        {/* Score ring */}
        <div className="flex flex-col items-center px-4 pt-6 pb-2">
          <ScoreRing score={report.score} grade={report.grade} />
        </div>

        {/* Headline + summary */}
        <div
          className="mx-4 mb-6 mt-5 pl-4 animate-score-headline"
          style={{ borderLeft: "2px solid #FF7A00" }}
        >
          <h2 className="text-base font-bold text-white leading-snug mb-2">
            {report.headline}
          </h2>
          <p className="text-[13px] leading-body" style={{ color: "rgba(255,255,255,0.55)" }}>
            {report.summary}
          </p>
        </div>
      </div>

      {/* ── SCORE BREAKDOWN ───────────────────────────────── */}
      <div>
        <h3 className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.25)" }}>
          Score breakdown
        </h3>
        <div
          className="rounded-xl px-4 py-5"
          style={{ background: "#141210", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <DimensionBreakdown scores={scores} variant="grouped" />
        </div>
      </div>

      {/* ── BIGGEST GAPS ──────────────────────────────────── */}
      <div>
        <h3 className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.25)" }}>
          Your 3 biggest gaps
        </h3>
        <div className="space-y-3">
          {report.top_gaps.map((gap, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden"
              style={{
                background: "#0f0c08",
                border: "1px solid rgba(255,122,0,0.12)",
              }}
            >
              <div className="px-4 pt-4 pb-3">
                {/* Gap number + title */}
                <div className="flex items-center gap-2 mb-2.5">
                  <span
                    className="w-5 h-5 rounded flex items-center justify-center shrink-0 text-[10px] font-black text-orange"
                    style={{
                      background: "rgba(255,122,0,0.10)",
                      border: "1px solid rgba(255,122,0,0.20)",
                    }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-[11px] font-bold text-orange uppercase tracking-wide">
                    {gap.gap_title}
                  </p>
                </div>
                {/* Impact — the scene */}
                <p className="text-sm font-semibold text-white leading-snug mb-2">
                  {gap.impact}
                </p>
                {/* Description — the diagnosis */}
                <p className="text-[13px] leading-body" style={{ color: "rgba(255,255,255,0.50)" }}>
                  {gap.gap_description}
                </p>
              </div>
              {/* Fix footer */}
              <div
                className="px-4 py-3 flex items-start gap-2.5"
                style={{
                  background: "rgba(255,122,0,0.05)",
                  borderTop: "1px solid rgba(255,122,0,0.10)",
                }}
              >
                <span className="text-orange font-bold text-sm shrink-0 mt-[-1px]">→</span>
                <p className="text-[13px] leading-body" style={{ color: "rgba(255,255,255,0.75)" }}>
                  {gap.fix}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PRIORITY ACTIONS ──────────────────────────────── */}
      <div>
        <h3 className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>
          Your 5 priority actions
        </h3>
        <p className="text-[11px] mb-3" style={{ color: "rgba(255,255,255,0.30)" }}>
          In the order that moves the needle fastest.
        </p>
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.06)", background: "#0d0a07" }}
        >
          {report.priority_actions.map((item, i) => (
            <div
              key={i}
              className={cn(
                "flex items-start gap-3 px-4 py-3.5",
                i > 0 && "border-t"
              )}
              style={{ borderColor: "rgba(255,255,255,0.05)" }}
            >
              <span
                className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-xs font-black"
                style={{
                  background: i === 0 ? "#FF7A00" : "rgba(255,122,0,0.10)",
                  color:      i === 0 ? "#ffffff" : "#FF7A00",
                }}
              >
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] leading-body" style={{ color: "rgba(255,255,255,0.80)" }}>
                  {item.action}
                </p>
                <span
                  className={cn(
                    "text-[11px] font-medium px-2 py-0.5 rounded mt-1.5 inline-block",
                    TIMEFRAME_STYLE[item.timeframe] ?? "bg-white/[0.06] text-white/35",
                  )}
                >
                  {item.timeframe}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW YOU COMPARE ───────────────────────────────── */}
      <div
        className="rounded-xl p-4"
        style={{
          background: "rgba(29,158,117,0.05)",
          border: "1px solid rgba(29,158,117,0.18)",
        }}
      >
        <p className="text-[11px] font-bold text-teal uppercase tracking-widest mb-2">
          How you compare
        </p>
        <p className="text-[13px] leading-body" style={{ color: "rgba(255,255,255,0.65)" }}>
          {report.benchmark}
        </p>
      </div>

      {/* ── SHARE ─────────────────────────────────────────── */}
      <div>
        <p className="text-sm font-bold text-white mb-1.5">
          Most business owners in your network don&apos;t know their score.
        </p>
        <p className="text-[13px] leading-body mb-4" style={{ color: "rgba(255,255,255,0.45)" }}>
          Send it to them. Every business that takes the score using your link sees exactly
          where they need to focus.
        </p>
        <div className="flex gap-2.5 flex-col sm:flex-row">
          <button
            type="button"
            onClick={handleShare}
            className="flex-1 min-h-[44px] text-white text-sm font-semibold rounded-lg px-4 py-3"
            style={{ background: "#25D366" }}
          >
            Share on WhatsApp
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="sm:w-auto w-full min-h-[44px] text-sm font-medium rounded-lg px-4 py-3"
            style={{
              border: "1px solid rgba(255,255,255,0.10)",
              background: "rgba(255,255,255,0.04)",
              color: "rgba(255,255,255,0.70)",
            }}
          >
            {copied ? "Copied" : "Copy link"}
          </button>
        </div>
      </div>

      <CTABlock businessName={answers.businessName} score={report.score} />
    </div>
  );
}
