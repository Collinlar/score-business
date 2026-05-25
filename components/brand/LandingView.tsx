import Button from "@/components/ui/Button";

interface LandingViewProps {
  onStart: () => void;
}

export default function LandingView({ onStart }: LandingViewProps) {
  return (
    <div className="pt-2 pb-10">
      <div className="landing-stagger-item landing-delay-1 mb-10 max-w-lg">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-5 h-0.5 bg-orange rounded-full" aria-hidden="true" />
          <p className="text-xs font-medium text-white/60 uppercase tracking-widest">
            Free · 3 minutes · No login
          </p>
        </div>
        <h1 className="text-[1.75rem] sm:text-4xl font-bold font-heading leading-display mb-4 text-balance text-white">
          Find out how your business actually looks{" "}
          <span
            style={{
              background: "linear-gradient(135deg,#FF8C1A,#FF6F00)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            online.
          </span>
        </h1>
        <p className="text-base text-white/60 leading-body max-w-sm">
          8 questions. A personalised score out of 100. The specific gaps holding your business back, and
          what to fix first.
        </p>
      </div>

      {/* Sample score teaser card */}
      <div className="landing-stagger-item landing-delay-2 mb-10">
        <div
          className="rounded-xl overflow-hidden border border-white/[0.08]"
          style={{ background: "#141210" }}
        >
          <div className="h-0.5 w-full" style={{ background: "linear-gradient(135deg,#FF8C1A,#FF6F00)" }} aria-hidden="true" />
          <div className="px-4 py-5 flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-1">
                Sample score preview
              </p>
              <p className="text-sm text-white/60 leading-body">
                Google Business Profile is incomplete. Customers searching &ldquo;food near me&rdquo; in Accra are not finding this business.
              </p>
            </div>
            <div className="shrink-0 flex flex-col items-center">
              <span
                className="text-4xl font-black font-heading tabular-nums leading-none"
                style={{
                  background: "linear-gradient(180deg,#FFFFFF 30%,#FF7A00 110%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                62
              </span>
              <span className="text-[10px] text-white/40 mt-0.5">out of 100</span>
              <span
                className="mt-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-black font-heading"
                style={{ background: "linear-gradient(135deg,#FF8C1A,#FF6F00)" }}
              >
                C
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="landing-stagger-item landing-delay-3 border-l-2 border-orange pl-4 mb-10 py-1">
        <p className="text-sm text-white/60 italic leading-body">
          &ldquo;I thought we were doing fine digitally. The score showed me three things costing us
          customers every week. We fixed two of them in the first month.&rdquo;
        </p>
        <p className="text-xs text-white/40 mt-2 font-medium">
          Retail business owner, Accra
        </p>
      </div>

      <div className="landing-stagger-item landing-delay-4">
        <Button size="lg" onClick={onStart}>
          Get my free business score
        </Button>
      </div>

      <p className="landing-stagger-item landing-delay-5 text-xs text-white/40 text-center mt-4 max-w-xs mx-auto sm:mx-0 sm:text-left sm:max-w-none">
        No account needed. Takes 3 minutes. Full result on WhatsApp.
      </p>
    </div>
  );
}
