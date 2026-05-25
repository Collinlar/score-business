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
      <div className="rounded-2xl border border-white/[0.08] bg-[#141210] px-4 py-7 sm:px-6 sm:py-8 mb-8">
        <div className="flex flex-col items-center">
          <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3 text-center">
            {businessName ? `${businessName}'s` : "Your"} Ghana Business Score
          </p>
          <ScoreRing score={report.score} grade={report.grade} />
          <p className="text-base font-medium text-white mt-6 text-center max-w-sm leading-body animate-score-headline">
            {report.headline}
          </p>
        </div>
      </div>

      <div className="mb-8 border border-white/[0.08] rounded-xl bg-[#141210] px-4 py-5">
        <h2 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">
          Where your points sit
        </h2>
        <DimensionBreakdown scores={scores} variant="compact" />
      </div>

      <div className="mt-2">
        <h2 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">
          Your biggest gaps
        </h2>

        <div className="space-y-3">
          {report.top_gaps.map((gap, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/[0.08] bg-[#141210] overflow-hidden relative"
            >
              {i > 0 && (
                <div className="absolute inset-0 flex items-center justify-center rounded-xl z-10" style={{ background: "rgba(20,18,16,0.85)", backdropFilter: "blur(4px)" }}>
                  <div className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <rect x="2" y="6" width="10" height="7" rx="1.5" stroke="#FF7A00" strokeWidth="1.5" />
                      <path
                        d="M4.5 6V4.5a2.5 2.5 0 015 0V6"
                        stroke="#FF7A00"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="text-xs font-medium text-white/60">Unlock to see this gap</span>
                  </div>
                </div>
              )}
              <div
                className={["px-4 pt-4 pb-3", i > 0 ? "opacity-20 select-none" : ""].join(" ")}
              >
                <p className="text-xs font-semibold text-orange uppercase tracking-wide mb-2">
                  {gap.gap_title}
                </p>
                <p className="text-sm font-semibold text-white leading-body">{gap.impact}</p>
                <p className="text-xs text-white/60 mt-1.5 leading-body">{gap.gap_description}</p>
              </div>
              <div
                className={[
                  "border-t border-white/[0.08] bg-[#0B0907] px-4 py-3",
                  i > 0 ? "opacity-20 select-none" : "",
                ].join(" ")}
              >
                <p className="text-xs font-semibold text-orange mb-1">First step</p>
                <p className="text-sm text-white/80 leading-body">{gap.fix}</p>
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
