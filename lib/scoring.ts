import type { AssessmentAnswers, DimensionScores } from "@/types";

/**
 * Client-side scoring — runs instantly without an API call.
 * The total is passed to Claude alongside the raw answers for narrative generation.
 */
export function calculateScore(answers: AssessmentAnswers): DimensionScores {
  const website = { functional: 20, basic: 10, none: 0 }[answers.website] ?? 0;
  const googleBiz = { complete: 15, basic: 7, none: 0 }[answers.googleBiz] ?? 0;
  const socialMedia = { daily: 10, weekly: 7, occasional: 3, none: 0 }[answers.socialMedia] ?? 0;
  const payments = { multiple: 15, one: 8, none: 0 }[answers.payments] ?? 0;
  const discovery = { search: 15, social: 10, referral: 5, walkin: 2 }[answers.discovery] ?? 0;
  const tools = { multiple: 10, one: 7, spreadsheets: 3, none: 0 }[answers.tools] ?? 0;
  const aiUsage = { regularly: 10, occasional: 6, interested: 2, none: 0 }[answers.aiUsage] ?? 0;
  const marketing = { active: 5, basic: 3, planned: 1, none: 0 }[answers.marketing] ?? 0;

  const total = website + googleBiz + socialMedia + payments + discovery + tools + aiUsage + marketing;

  return { website, googleBiz, socialMedia, payments, discovery, tools, aiUsage, marketing, total };
}

export function gradeFromScore(score: number): "A" | "B" | "C" | "D" | "F" {
  if (score >= 85) return "A";
  if (score >= 70) return "B";
  if (score >= 55) return "C";
  if (score >= 40) return "D";
  return "F";
}

export function gradeColour(grade: string): string {
  return {
    A: "#1D9E75",
    B: "#185FA5",
    C: "#E8A020",
    D: "#E8A020",
    F: "#DC2626",
  }[grade] ?? "#4B5563";
}

export function gradeLabel(grade: string): string {
  return {
    A: "Excellent",
    B: "Good",
    C: "Developing",
    D: "Needs Work",
    F: "Critical Gaps",
  }[grade] ?? "";
}

/** SVG ring offset for the animated score circle (circumference = 2*pi*90 ≈ 565) */
export function scoreRingOffset(score: number): number {
  const circumference = 565;
  return circumference - (score / 100) * circumference;
}
