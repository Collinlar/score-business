"use client";

import { useState } from "react";
import ProgressIndicator from "@/components/brand/ProgressIndicator";
import Button from "@/components/ui/Button";
import { QUESTIONS, GHANA_CITIES, INDUSTRIES } from "@/lib/questions";
import type { AssessmentAnswers, AssessmentStep } from "@/types";

interface AssessmentFormProps {
  initialAnswers: Partial<AssessmentAnswers>;
  initialStep:    AssessmentStep;
  onComplete:     (answers: AssessmentAnswers) => void;
}

// Before the 8 questions: collect business name, industry, city
type MetaStep = "meta_name" | "meta_industry" | "meta_city";

export default function AssessmentForm({ initialAnswers, onComplete }: AssessmentFormProps) {
  const [metaStep,  setMetaStep]  = useState<MetaStep>("meta_name");
  const [qIndex,    setQIndex]    = useState<number | null>(null); // null = in meta phase
  const [answers,   setAnswers]   = useState<Partial<AssessmentAnswers>>(initialAnswers);
  const [tempInput, setTempInput] = useState("");
  const [error,     setError]     = useState("");

  const totalSteps = 11; // 3 meta + 8 questions
  const currentStep =
    qIndex === null
      ? metaStep === "meta_name"    ? 1
      : metaStep === "meta_industry" ? 2
      : 3
      : qIndex + 4;

  // Running score calculation from current answers
  const runningScore = QUESTIONS.reduce((acc, q) => {
    const val = answers[q.field as keyof AssessmentAnswers];
    if (!val) return acc;
    const opt = q.options.find((o) => o.value === val);
    return acc + (opt?.points ?? 0);
  }, 0);

  function handleMetaNext() {
    setError("");
    if (metaStep === "meta_name") {
      if (!tempInput.trim()) { setError("What is your business called?"); return; }
      setAnswers((a) => ({ ...a, businessName: tempInput.trim() }));
      setTempInput("");
      setMetaStep("meta_industry");
    } else if (metaStep === "meta_industry") {
      if (!tempInput) { setError("Select the industry that fits your business."); return; }
      setAnswers((a) => ({ ...a, industry: tempInput }));
      setTempInput("");
      setMetaStep("meta_city");
    } else {
      if (!tempInput) { setError("Which city are you based in?"); return; }
      setAnswers((a) => ({ ...a, city: tempInput }));
      setTempInput("");
      setQIndex(0); // Start questions
    }
  }

  function handleOptionSelect(value: string) {
    if (qIndex === null) return;
    const question = QUESTIONS[qIndex];
    setAnswers((a) => ({ ...a, [question.field]: value }));

    // Auto-advance on selection
    setTimeout(() => {
      if (qIndex < QUESTIONS.length - 1) {
        setQIndex(qIndex + 1);
      } else {
        const final = { ...answers, [question.field]: value } as AssessmentAnswers;
        onComplete(final);
      }
    }, 250);
  }

  // === META STEPS ===
  if (qIndex === null) {
    return (
      <div className="py-4">
        <ProgressIndicator current={currentStep} total={totalSteps} />

        <div key={metaStep} className="animate-form-step mt-8 mb-6">
          {metaStep === "meta_name" && (
            <>
              <h2 className="text-xl font-bold font-heading text-white mb-2">
                What is your business called?
              </h2>
              <p className="text-sm text-white/60 mb-5">
                Your score will be personalised to your business.
              </p>
              <input
                type="text"
                value={tempInput}
                onChange={(e) => setTempInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleMetaNext()}
                placeholder="e.g. Kofi's Kitchen, Akoma Styles"
                className="w-full min-h-[44px] px-4 py-3 rounded-lg border border-white/[0.08] bg-[#141210] text-base text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-orange"
                autoFocus
                autoComplete="organization"
              />
              {error && <p className="text-sm text-red-400 mt-2">{error}</p>}
            </>
          )}

          {metaStep === "meta_industry" && (
            <>
              <h2 className="text-xl font-bold font-heading text-white mb-2">
                What does your business sell or offer?
              </h2>
              <p className="text-sm text-white/60 mb-5">
                We use this to compare your score against similar businesses.
              </p>
              <select
                value={tempInput}
                onChange={(e) => setTempInput(e.target.value)}
                className="w-full min-h-[44px] px-4 py-3 rounded-lg border border-white/[0.08] text-base text-white bg-[#141210] focus:outline-none focus:ring-2 focus:ring-orange"
              >
                <option value="" className="bg-[#141210]">Pick your industry</option>
                {INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind} className="bg-[#141210]">{ind}</option>
                ))}
              </select>
              {error && <p className="text-sm text-red-400 mt-2">{error}</p>}
            </>
          )}

          {metaStep === "meta_city" && (
            <>
              <h2 className="text-xl font-bold font-heading text-white mb-2">
                Which city are you based in?
              </h2>
              <p className="text-sm text-white/60 mb-5">
                Your benchmark will compare you to businesses in your city.
              </p>
              <select
                value={tempInput}
                onChange={(e) => setTempInput(e.target.value)}
                className="w-full min-h-[44px] px-4 py-3 rounded-lg border border-white/[0.08] text-base text-white bg-[#141210] focus:outline-none focus:ring-2 focus:ring-orange"
              >
                <option value="" className="bg-[#141210]">Pick your city</option>
                {GHANA_CITIES.map((city) => (
                  <option key={city} value={city} className="bg-[#141210]">{city}</option>
                ))}
              </select>
              {error && <p className="text-sm text-red-400 mt-2">{error}</p>}
            </>
          )}
        </div>

        <Button size="lg" onClick={handleMetaNext}>
          {metaStep === "meta_city" ? "Start my assessment" : "Next"}
        </Button>
      </div>
    );
  }

  // === QUESTION STEPS ===
  const question = QUESTIONS[qIndex];

  return (
    <div className="py-4">
      <ProgressIndicator current={currentStep} total={totalSteps} />

      <div key={`q-${qIndex}`} className="animate-form-step mt-8 mb-4">
        <h2 className="text-xl font-bold font-heading text-white mb-1">
          {question.question}
        </h2>
        {question.subtext && (
          <p className="text-sm text-white/60 mb-6">{question.subtext}</p>
        )}

        <div className="space-y-3 mt-5">
          {question.options.map((opt) => {
            const selected = answers[question.field as keyof AssessmentAnswers] === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => handleOptionSelect(opt.value)}
                className={[
                  "w-full text-left px-4 py-4 rounded-xl border text-sm font-medium transition-all min-h-[44px]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange",
                  "flex items-center justify-between gap-3",
                  selected
                    ? "border-orange text-white"
                    : "bg-[#141210] border-white/[0.08] text-white/80 hover:border-white/[0.14]",
                ].join(" ")}
                style={selected ? { background: "rgba(255,122,0,0.14)", borderColor: "#FF7A00" } : undefined}
              >
                <span className="flex items-center gap-3 flex-1">
                  {/* Radio circle */}
                  <span
                    className="shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors"
                    style={selected
                      ? { borderColor: "#FF7A00" }
                      : { borderColor: "rgba(255,255,255,0.25)" }
                    }
                    aria-hidden="true"
                  >
                    {selected && (
                      <span className="w-2 h-2 rounded-full bg-orange block" />
                    )}
                  </span>
                  <span>{opt.label}</span>
                </span>
                {/* Points badge */}
                <span
                  className="shrink-0 text-xs font-semibold tabular-nums"
                  style={{ color: selected ? "#FF7A00" : "rgba(255,255,255,0.40)" }}
                >
                  +{opt.points}pts
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Running score chip */}
      {runningScore > 0 && (
        <div
          className="flex items-center justify-between px-4 py-2.5 rounded-lg border border-white/[0.08] mb-4"
          style={{ background: "#141210" }}
        >
          <span className="text-[10px] font-semibold text-white/40 uppercase tracking-widest">
            Running score
          </span>
          <span className="text-base font-black font-heading text-orange tabular-nums">
            {runningScore}
          </span>
        </div>
      )}

      {/* Back button */}
      {(qIndex > 0 || metaStep !== "meta_name") && (
        <button
          onClick={() => {
            if (qIndex > 0) setQIndex(qIndex - 1);
            else { setQIndex(null); setMetaStep("meta_city"); }
          }}
          className="text-sm text-white/40 underline underline-offset-2 mt-2"
        >
          Back
        </button>
      )}
    </div>
  );
}
