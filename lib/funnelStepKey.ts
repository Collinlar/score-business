import type { AssessmentStep } from "@/types";

/** Stable key per funnel phase so step transitions animate at major boundaries only. */
export function funnelPhaseKey(step: AssessmentStep): string {
  if (step === "landing") return "landing";
  if (["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"].includes(step)) return "assessment";
  return step;
}
