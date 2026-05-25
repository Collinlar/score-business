import ScoreRing from "@/components/brand/ScoreRing";
import DimensionBreakdown from "@/components/brand/DimensionBreakdown";
import Button from "@/components/ui/Button";
import type { ScoreReport, DimensionScores } from "@/types";

interface PartialResultProps {
  report: ScoreReport;
  scores: DimensionScores;
  businessName: string;
  onUnlock: () => void;
}

export default function PartialResult({ report, scores, businessName, onUnlock }: PartialResultProps) {
  return (
    <div className="py-2">
      <div
        className="rounded-2xl overflow-hidden mb-8"
        style={{
          background: "linear-gradient(160deg, #1a1410 0%, #0f0c08 100%)",
          border: "1px solid rgba(255,122,0,0.14)",
          boxShadow: "0 0 40px -20px rgba(255,122,0,0.20)",
        }}
      >
        <div className="px-4 pt-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-orange shrink-0" aria-hidden />
          <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest truncate">
            {businessName ? `${businessName}'s` : "Your"} Ghana Business Score
          </p>
        </div>
        <div className="flex flex-col items-center px-4 pt-6 pb-2">
          <ScoreRing score={report.score} grade={report.grade} />
        </div>
        <div
          className="mx-4 mb-6 mt-5 pl-4 animate-score-headline"
          style={{ borderLeft: "2px solid #FF7A00" }}
        >
          <p className="text-sm font-semibold text-white leading-snug">
            {report.headline}
          </p>
        </div>
      </div>

      <div className="mb-8 border border-white/[0.08] rounded-xl bg-[#141210] px-4 py-5">
        <h2 className="text-[10px] font-semibold text-white/25 uppercase tracking-widest mb-4">
          Where your points sit
        </h2>
        <DimensionBreakdown scores={scores} variant="compact" />
      </div>

      <div className="mt-2">
        <h2 className="text-[10px] font-semibold text-white/25 uppercase tracking-widest mb-4">
          Your biggest gaps
        </h2>

        <div className="space-y-3">
          {report.top_gaps.map((gap, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden relative"
              style={{
                background: "#0f0c08",
                border: `1px solid ${i === 0 ? "rgba(255,122,0,0.18)" : "rgba(255,255,255,0.06)"}`,
              }}
            >
              {i > 0 && (
                <div
                  className="absolute inset-0 flex items-center justify-center rounded-xl z-10"
                  style={{ background: "rgba(15,12,8,0.88)", backdropFilter: "blur(4px)" }}
                >
                  <div className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <rect x="2" y="6" width="10" height="7" rx="1.5" stroke="#FF7A00" strokeWidth="1.5" />
                      <path d="M4.5 6V4.5a2.5 2.5 0 015 0V6" stroke="#FF7A00" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span className="text-xs font-medium text-white/50">Unlock to see this gap</span>
                  </div>
                </div>
              )}
              <div className={["px-4 pt-4 pb-3", i > 0 ? "opacity-20 select-none" : ""].join(" ")}>
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
                <p className="text-sm font-semibold text-white leading-snug mb-2">{gap.impact}</p>
                <p className="text-[13px] leading-body" style={{ color: "rgba(255,255,255,0.50)" }}>
                  {gap.gap_description}
                </p>
              </div>
              <div
                className={["px-4 py-3 flex items-start gap-2.5", i > 0 ? "opacity-20 select-none" : ""].join(" ")}
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

      <div className="mt-8 border border-white/[0.08] rounded-xl p-5 bg-[#141210]">
        <p className="text-sm font-semibold text-white mb-1">
          Your full report includes:
        </p>
        <ul className="text-sm text-white/60 space-y-1 mb-5">
          <li>All 3 gaps with specific fix instructions</li>
          <li>5 priority actions in order</li>
          <li>
            How you compare to {scores.total >= 55 ? "top" : "similar"} businesses in your city
          </li>
          <li>Your report saved to WhatsApp</li>
        </ul>
        <Button size="lg" onClick={onUnlock}>
          Unlock my full report
        </Button>
        <p className="text-xs text-white/40 text-center mt-3">
          Free. Takes 10 seconds. Enter your WhatsApp number.
        </p>
      </div>
    </div>
  );
}
