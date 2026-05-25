export interface QuestionOption {
  value:  string;
  label:  string;
  points: number;
}

export interface Question {
  id:          string;
  field:       string;
  question:    string;
  subtext?:    string;
  options:     QuestionOption[];
  maxPoints:   number;
}

export const QUESTIONS: Question[] = [
  {
    id:       "q1",
    field:    "website",
    question: "Does your business have a website?",
    subtext:  "A website people can find on Google.",
    maxPoints: 20,
    options: [
      { value: "functional", label: "Yes, fully working with products or services listed", points: 20 },
      { value: "basic",      label: "Yes, but it is basic or outdated",                   points: 10 },
      { value: "none",       label: "No, we do not have one",                             points: 0  },
    ],
  },
  {
    id:       "q2",
    field:    "googleBiz",
    question: "Is your business on Google Maps?",
    subtext:  "A Google Business Profile lets customers find you when they search.",
    maxPoints: 15,
    options: [
      { value: "complete", label: "Yes, with photos, hours, and reviews",     points: 15 },
      { value: "basic",    label: "Yes, but we have not filled it in fully",  points: 7  },
      { value: "none",     label: "No, we are not on Google Maps",            points: 0  },
    ],
  },
  {
    id:       "q3",
    field:    "socialMedia",
    question: "How active is your social media?",
    subtext:  "WhatsApp broadcasts, Facebook, Instagram, TikTok.",
    maxPoints: 10,
    options: [
      { value: "daily",      label: "We post every day or almost every day",  points: 10 },
      { value: "weekly",     label: "We post a few times a week",              points: 7  },
      { value: "occasional", label: "We post when we remember",                points: 3  },
      { value: "none",       label: "We rarely or never post",                 points: 0  },
    ],
  },
  {
    id:       "q4",
    field:    "payments",
    question: "Can customers pay you digitally?",
    subtext:  "MTN MoMo, Telecel Cash, card payments, or online checkout.",
    maxPoints: 15,
    options: [
      { value: "multiple", label: "Yes, multiple ways (MoMo, card, etc.)",  points: 15 },
      { value: "one",      label: "Yes, one method only",                    points: 8  },
      { value: "none",     label: "No, cash only",                           points: 0  },
    ],
  },
  {
    id:       "q5",
    field:    "discovery",
    question: "How do most new customers find you?",
    subtext:  "Think about the last 10 new customers you got.",
    maxPoints: 15,
    options: [
      { value: "search",   label: "They search on Google and find us",   points: 15 },
      { value: "social",   label: "They find us on social media",         points: 10 },
      { value: "referral", label: "Word of mouth and referrals only",     points: 5  },
      { value: "walkin",   label: "They walk past or see our signage",    points: 2  },
    ],
  },
  {
    id:       "q6",
    field:    "tools",
    question: "Do you use digital tools to run your business?",
    subtext:  "Invoicing software, inventory apps, CRM, accounting tools.",
    maxPoints: 10,
    options: [
      { value: "multiple",    label: "Yes, several tools (invoicing, CRM, inventory, etc.)", points: 10 },
      { value: "one",         label: "Yes, one tool",                                        points: 7  },
      { value: "spreadsheets", label: "Just spreadsheets or WhatsApp notes",                 points: 3  },
      { value: "none",        label: "Nothing digital",                                      points: 0  },
    ],
  },
  {
    id:       "q7",
    field:    "aiUsage",
    question: "Do you use AI tools in your business?",
    subtext:  "ChatGPT, Claude, Gemini, or any AI writing or image tools.",
    maxPoints: 10,
    options: [
      { value: "regularly",   label: "Yes, I use AI tools regularly",       points: 10 },
      { value: "occasional",  label: "I have tried them a few times",       points: 6  },
      { value: "interested",  label: "Not yet, but I want to start",        points: 2  },
      { value: "none",        label: "No, and I am not sure about them",    points: 0  },
    ],
  },
  {
    id:       "q8",
    field:    "marketing",
    question: "Do you have a digital marketing plan?",
    subtext:  "A content calendar, a posting schedule, or a plan for ads.",
    maxPoints: 5,
    options: [
      { value: "active",   label: "Yes, we have one and we follow it",   points: 5 },
      { value: "basic",    label: "We have something basic written down", points: 3 },
      { value: "planned",  label: "No plan yet, but we are working on it", points: 1 },
      { value: "none",     label: "No marketing plan at all",             points: 0 },
    ],
  },
];

export const GHANA_CITIES = [
  "Accra", "Kumasi", "Takoradi", "Tamale", "Cape Coast",
  "Sunyani", "Koforidua", "Ho", "Bolgatanga", "Wa",
  "Tema", "Kasoa", "Ashaiman", "Obuasi", "Techiman",
];

export const INDUSTRIES = [
  "Retail / Trading",
  "Food and Beverages",
  "Fashion and Clothing",
  "Beauty and Hair",
  "Construction and Real Estate",
  "Logistics and Delivery",
  "Financial Services",
  "Healthcare and Pharmacy",
  "Education and Training",
  "Technology and IT",
  "Agriculture",
  "Manufacturing",
  "Hospitality and Events",
  "Professional Services",
  "Media and Creative",
  "Other",
];
