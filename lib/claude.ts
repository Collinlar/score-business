import { isTutorialEnvValue } from "@/lib/env";
import { gradeFromScore } from "@/lib/scoring";
import type { AssessmentAnswers, DimensionScores, ScoreReport } from "@/types";

const GROQ_CHAT_URL = "https://api.groq.com/openai/v1/chat/completions";

const SYSTEM_PROMPT = `You are a Ghanaian business advisor working for BVM Digital. You read digital health assessments for Ghanaian SMEs and write honest, specific, emotionally resonant reports that make business owners understand exactly what they are losing and what they need to do first.

Your output is always structured JSON and nothing else. No markdown. No preamble. No explanation outside the JSON object.

Rules that are absolute:
- Speak directly to the business owner. Use "you" and "your" throughout. Never say "this business" or "the business" — say "you" or "your business".
- Sound like a trusted advisor who has just reviewed their numbers and is talking to them honestly over coffee. Not a report generator. Not a textbook. A real expert giving a real diagnosis.
- Never write what the tool found. Write what is happening to the business.
- Never say "this is costing you sales." Show a real customer who cannot find this business today.
- Never use abstract language when concrete language is available.
- Always name the city and the industry in examples. Generic advice is useless.
- Acknowledge what the business is doing well before naming what is broken. The contrast creates urgency.
- Your fix recommendations name the exact tool, platform, or service — not vague advice.
- Write in plain, direct English. No corporate language. No motivational phrases.

Your output must not contain em dashes.
Your output must not contain any of the following phrases: "In today's fast-paced world", "Leverage your full potential", "Unlock the power of", "Take your business to the next level", "Seamlessly integrate", "Best-in-class", "Cutting-edge", "Robust solution", "Streamlined", "Game-changing", "Innovative approach", "Transformative experience", "Empowering businesses to", "In the digital age", "In an increasingly competitive landscape", "It's never been easier to".`;

// Human-readable descriptions of each answer option
const ANSWER_TEXT: Record<string, Record<string, string>> = {
  website: {
    functional: "has a working, well-designed website with SEO foundations in place",
    basic:      "has a basic website that is live but needs significant improvement",
    none:       "has no website",
  },
  googleBiz: {
    complete: "has a fully verified Google Business Profile with photos, reviews, and accurate details",
    basic:    "has a basic Google Business Profile listing with minimal information",
    none:     "has no Google Business Profile and does not appear on Google Maps",
  },
  socialMedia: {
    daily:      "posts on social media daily with consistent, branded content",
    weekly:     "posts on social media weekly",
    occasional: "posts on social media occasionally with no consistent schedule",
    none:       "has no active social media presence",
  },
  payments: {
    multiple: "accepts multiple payment methods: MTN MoMo, Telecel Cash, card, and cash",
    one:      "accepts one payment method only",
    none:     "accepts cash only and no digital payments",
  },
  discovery: {
    search:   "customers primarily find this business through Google search",
    social:   "customers primarily find this business through social media",
    referral: "customers primarily find this business through word of mouth",
    walkin:   "customers primarily find this business by walking past the physical location",
  },
  tools: {
    multiple:    "uses multiple digital tools for inventory, invoicing, and business management",
    one:         "uses one digital business management tool",
    spreadsheets:"manages the business using spreadsheets only",
    none:        "uses no digital tools to manage the business",
  },
  aiUsage: {
    regularly:  "uses AI tools regularly in daily business operations",
    occasional: "uses AI tools occasionally",
    interested: "is aware of AI tools but has not started using them yet",
    none:       "does not use any AI tools",
  },
  marketing: {
    active:  "runs an active, ongoing marketing strategy",
    basic:   "has a basic, informal marketing approach",
    planned: "has a marketing plan that has not been put into action yet",
    none:    "has no marketing strategy in place",
  },
};

// Grade-specific emotional register for the summary
function gradeFraming(
  grade:    string,
  name:     string,
  industry: string,
  city:     string
): string {
  switch (grade) {
    case "A":
      return `TONE: Genuine acknowledgement of real achievement. ${name} is ahead of most businesses in Ghana. The summary must first name specifically what they have built and why it matters, then name the precise gap that separates them from the very top.`;
    case "B":
      return `TONE: Close but with a specific gap. The summary must: (1) name what is working and what it means for the business in concrete terms, (2) name the exact gap between ${name} and the top businesses in ${city}, (3) show what closes when that gap is fixed.`;
    case "C":
      return `TONE: Running but partially invisible. ${name} is operating, but there are customers in ${city} searching for ${industry} right now who may not find them. The summary must name one real strength, then describe the specific way people searching for ${industry} in ${city} are not reaching ${name}, then name what changes when that is fixed.`;
    case "D":
      return `TONE: Real daily loss. The summary must open by describing a customer in ${city} who searches for ${industry} today and finds competitors before ${name}, or does not find ${name} at all. Then acknowledge one genuine strength. Then name the one fix that changes the most.`;
    case "F":
      return `TONE: Honest, non-judgmental, urgent. ${name} has almost no digital presence. Frame this as a fixable starting point. Name the two most important first steps and describe specifically what changes for ${name} in ${city} in the next 30 days when those steps happen.`;
    default:
      return "";
  }
}

function buildUserPrompt(answers: AssessmentAnswers, scores: DimensionScores): string {
  const dims = [
    { key: "website",     label: "Website",            max: 20 },
    { key: "googleBiz",   label: "Google Business",    max: 15 },
    { key: "socialMedia", label: "Social Media",       max: 10 },
    { key: "payments",    label: "Digital Payments",   max: 15 },
    { key: "discovery",   label: "Customer Discovery", max: 15 },
    { key: "tools",       label: "Business Tools",     max: 10 },
    { key: "aiUsage",     label: "AI Usage",           max: 10 },
    { key: "marketing",   label: "Marketing",          max: 5  },
  ];

  const strong: string[] = [];
  const zeros:  string[] = [];

  const answerLines = dims.map(({ key, label, max }) => {
    const val       = scores[key as keyof DimensionScores] as number;
    const answerKey = answers[key as keyof AssessmentAnswers] as string;
    const text      = ANSWER_TEXT[key]?.[answerKey] ?? answerKey;
    if (val / max >= 0.8) strong.push(label);
    if (val === 0)        zeros.push(label);
    return `  - ${label} (${val}/${max}): ${text}`;
  }).join("\n");

  const grade     = gradeFromScore(scores.total);
  const strongStr = strong.length > 0 ? strong.join(", ")  : "none";
  const zeroStr   = zeros.length  > 0 ? zeros.join(", ")   : "none";

  return `Business name: ${answers.businessName}
Industry: ${answers.industry}
City: ${answers.city}
Total score: ${scores.total}/100. Grade: ${grade}.

What this business currently has:
${answerLines}

Strongest areas (scored 80% or more of their maximum): ${strongStr}
Complete gaps (scored zero): ${zeroStr}

${gradeFraming(grade, answers.businessName, answers.industry, answers.city)}

Generate JSON with exactly these keys:

"score": integer — same as ${scores.total}

"grade": string — "${grade}"

"headline": string — maximum 12 words. The single most important reality right now. Use "you" or "your" where natural. The owner should read it and think: yes, that is exactly my problem. No em dashes. Examples: "You are invisible to customers searching in Accra." or "Your payments are turning buyers away." Write the one thing that matters most.

"summary": string — exactly 3 sentences. Write in direct address, speaking to the owner as "you". Follow this structure:
  Sentence 1: Name one specific strength from the data. Be concrete — say what it is doing for the business right now, in their city, not just that a score is high.
  Sentence 2: Name the biggest gap as a scene. A real customer in ${answers.city} searching for ${answers.industry} today. Where do they end up instead? Make it feel immediate.
  Sentence 3: What changes for the owner specifically when that gap is fixed. Name the outcome in concrete terms — not the action, the result.

"top_gaps": array of exactly 3 objects, each with:
  "gap_title": string (3 to 5 words naming the gap)
  "gap_description": string (1 to 2 sentences. Speak directly to the owner — use "you" and "your". Sound like a consultant explaining what you found: "You don't have a website, which means..." or "Right now, your Google profile is empty, so when someone searches..." Be candid and specific to their city and industry. No passive voice. No textbook language.)
  "impact": string (1 vivid sentence: paint a specific scene. A real customer type in ${answers.city} picks up their phone, searches for ${answers.industry}, and goes somewhere else because they cannot find ${answers.businessName}. Name the competitor type if relevant. Present tense. Make it feel real and immediate — not hypothetical.)
  "fix": string (1 sentence. A direct instruction — tell them what to do right now: "Set up your Google Business Profile at business.google.com — it takes 15 minutes and it is free." Name the exact tool or platform and the precise first action. Sound like you are telling them, not writing a report about them.)

"priority_actions": array of exactly 5 objects, each with:
  "action": string (specific, under 15 words, names exact tools or platforms where relevant)
  "timeframe": string (exactly one of: "This week", "This month", "Next 30 days")

"benchmark": string (1 to 2 sentences: how this score compares to similar ${answers.industry} businesses in ${answers.city}. Use specific, honest language. Reference real patterns in Ghanaian SMEs where it adds useful context.)

Respond with only the JSON object. No other text.`;
}

function getGroqApiKey(): string {
  const key =
    process.env.GROQ_API_KEY?.trim() ||
    process.env.Groq_API_KEY?.trim() ||
    "";
  if (!key || isTutorialEnvValue(key)) {
    throw new Error(
      "GROQ_API_KEY is missing or still a placeholder. Add your Groq API key to .env.local (GROQ_API_KEY or Groq_API_KEY)."
    );
  }
  return key;
}

type GroqChatResponse = {
  choices?: Array<{ message?: { content?: string | null } }>;
  error?: { message?: string };
};

export async function generateScoreReport(
  answers: AssessmentAnswers,
  scores:  DimensionScores,
  options?: { signal?: AbortSignal }
): Promise<ScoreReport> {
  const model =
    (process.env.GROQ_MODEL && process.env.GROQ_MODEL.trim()) ||
    "llama-3.3-70b-versatile";

  const res = await fetch(GROQ_CHAT_URL, {
    method: "POST",
    headers: {
      Authorization:  `Bearer ${getGroqApiKey()}`,
      "Content-Type": "application/json",
    },
    signal: options?.signal,
    body: JSON.stringify({
      model,
      max_tokens:      1200,
      temperature:     0.4,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user",   content: buildUserPrompt(answers, scores) },
      ],
    }),
  });

  const data = (await res.json()) as GroqChatResponse;

  if (!res.ok) {
    const detail = data.error?.message ?? `HTTP ${res.status}`;
    throw new Error(`Groq request failed: ${detail}`);
  }

  const text = data.choices?.[0]?.message?.content;
  if (!text?.trim()) {
    throw new Error("Groq returned no message content.");
  }

  const raw    = text.replace(/```json\n?|\n?```/g, "").trim();
  const report = JSON.parse(raw) as ScoreReport;

  return report;
}
