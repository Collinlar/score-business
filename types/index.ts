// Assessment answers from the 8-question form
export interface AssessmentAnswers {
  businessName: string;
  industry:     string;
  city:         string;
  website:      "functional" | "basic" | "none";
  googleBiz:    "complete" | "basic" | "none";
  socialMedia:  "daily" | "weekly" | "occasional" | "none";
  payments:     "multiple" | "one" | "none";
  discovery:    "search" | "social" | "referral" | "walkin";
  tools:        "multiple" | "one" | "spreadsheets" | "none";
  aiUsage:      "regularly" | "occasional" | "interested" | "none";
  marketing:    "active" | "basic" | "planned" | "none";
}

// Individual dimension scores
export interface DimensionScores {
  website:     number; // max 20
  googleBiz:   number; // max 15
  socialMedia: number; // max 10
  payments:    number; // max 15
  discovery:   number; // max 15
  tools:       number; // max 10
  aiUsage:     number; // max 10
  marketing:   number; // max 5
  total:       number; // max 100
}

// A single gap item in the report
export interface Gap {
  gap_title:       string;
  gap_description: string;
  impact:          string;  // a concrete scene, not an abstract cost
  fix:             string;
}

// A single priority action with a timeframe
export interface PriorityAction {
  action:    string;
  timeframe: "This week" | "This month" | "Next 30 days";
}

// Full AI-generated score report
export interface ScoreReport {
  score:            number;
  grade:            "A" | "B" | "C" | "D" | "F";
  headline:         string;
  summary:          string;
  top_gaps:         Gap[];
  priority_actions: PriorityAction[];
  benchmark:        string;
}

// Lead stored in Supabase
export interface Lead {
  id?:           string;
  phone:         string;
  business_name: string;
  industry:      string;
  city:          string;
  score:         number;
  grade:         string;
  created_at?:   string;
}

// OTP state
export type OTPStatus = "idle" | "sending" | "sent" | "verifying" | "verified" | "error";

// Assessment step state
export type AssessmentStep =
  | "landing"
  | "q1" | "q2" | "q3" | "q4" | "q5" | "q6" | "q7" | "q8"
  | "loading"
  | "partial"
  | "gate"
  | "full";
