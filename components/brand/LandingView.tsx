import Button from "@/components/ui/Button";

interface LandingViewProps {
  onStart: () => void;
}

export default function LandingView({ onStart }: LandingViewProps) {
  return (
    <div className="pt-2 pb-10">

      {/* ── HEADLINE ─────────────────────────────────────
          Dominant. Font-black. Lets "online." land last.
      ─────────────────────────────────────────────────── */}
      <div className="landing-stagger-item landing-delay-1 mb-9">
        <h1
          className="font-black font-heading tracking-tight mb-4"
          style={{ fontSize: "clamp(2.5rem, 9vw, 3.6rem)", lineHeight: 1.05 }}
        >
          <span className="text-white">
            Find out how your business actually looks{" "}
          </span>
          <span
            style={{
              background: "linear-gradient(135deg,#FF9020,#FF6800)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            online.
          </span>
        </h1>

        <p className="leading-body max-w-[260px]" style={{ fontSize: "13px", color: "rgba(255,255,255,0.40)" }}>
          8 questions. A score out of 100. The exact gaps to fix first.
        </p>
      </div>

      {/* ── SCORE PREVIEW ────────────────────────────────
          Visual proof of outcome. Score number is the hero.
          Card uses darker bg + orange border so it stands
          out from the #141210 container.
      ─────────────────────────────────────────────────── */}
      <div className="landing-stagger-item landing-delay-2 mb-9">
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #1a1410 0%, #0f0c08 100%)",
            border: "1px solid rgba(255,122,0,0.18)",
            boxShadow: "0 12px 40px -16px rgba(255,122,0,0.22)",
          }}
        >
          {/* Accent line */}
          <div
            className="h-px w-full"
            style={{ background: "linear-gradient(90deg, #FF7A00, transparent 70%)" }}
            aria-hidden="true"
          />

          <div className="px-5 pt-5 pb-5">
            <p
              className="font-bold uppercase mb-4"
              style={{ fontSize: "9px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.22)" }}
            >
              Sample score preview
            </p>

            {/* Score number + grade badge */}
            <div className="flex items-end gap-3 mb-5">
              <span
                className="font-black font-heading tabular-nums leading-none"
                style={{
                  fontSize: "5.5rem",
                  background: "linear-gradient(180deg, #FFFFFF 15%, #FF7A00 130%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                62
              </span>
              <div className="pb-2 space-y-1.5">
                <span
                  className="block px-2.5 py-0.5 rounded-full text-[11px] font-black text-white text-center"
                  style={{ background: "linear-gradient(135deg,#FF8C1A,#FF6F00)" }}
                >
                  Grade C
                </span>
                <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)" }}>
                  out of 100
                </p>
              </div>
            </div>

            {/* Dimension bar teasers */}
            <div className="space-y-2.5">
              {[
                { label: "Website",         pct: 50, val: "10/20", dim: false },
                { label: "Google Business", pct: 0,  val: "0/15",  dim: true  },
                { label: "Social Media",    pct: 70, val: "7/10",  dim: false },
              ].map(({ label, pct, val, dim }) => (
                <div key={label}>
                  <div className="flex justify-between mb-1">
                    <span style={{ fontSize: "10px", fontWeight: 500, color: "rgba(255,255,255,0.45)" }}>
                      {label}
                    </span>
                    <span
                      className="tabular-nums font-semibold"
                      style={{ fontSize: "10px", color: dim ? "rgba(255,255,255,0.20)" : "rgba(255,122,0,0.75)" }}
                    >
                      {val}
                    </span>
                  </div>
                  <div
                    className="h-1 rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    {pct > 0 && (
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${pct}%`, background: "#FF7A00" }}
                      />
                    )}
                  </div>
                </div>
              ))}
              <p style={{ fontSize: "9px", color: "rgba(255,255,255,0.18)", paddingTop: "2px" }}>
                + 5 more dimensions in your real report
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── SOCIAL PROOF ─────────────────────────────────
          Quiet — it confirms, it doesn't compete.
      ─────────────────────────────────────────────────── */}
      <div className="landing-stagger-item landing-delay-3 mb-9">
        <p
          className="italic leading-body mb-1.5"
          style={{ fontSize: "13px", color: "rgba(255,255,255,0.42)" }}
        >
          &ldquo;The score showed me three things costing us customers every week.
          We fixed two of them in the first month.&rdquo;
        </p>
        <p
          className="font-medium"
          style={{ fontSize: "10px", color: "rgba(255,255,255,0.25)" }}
        >
          Retail business owner, Accra
        </p>
      </div>

      {/* ── CTA ──────────────────────────────────────────
          The one action. Clear, full-width, orange.
      ─────────────────────────────────────────────────── */}
      <div className="landing-stagger-item landing-delay-4 space-y-3">
        <Button size="lg" onClick={onStart}>
          Get my free business score
        </Button>
        <p
          className="text-center"
          style={{ fontSize: "11px", color: "rgba(255,255,255,0.28)" }}
        >
          Free · No login · Full result on WhatsApp
        </p>
      </div>
    </div>
  );
}
