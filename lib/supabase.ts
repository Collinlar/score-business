import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { isTutorialEnvValue } from "@/lib/env";

/** Supabase project URL (must match NEXT_PUBLIC_SUPABASE_URL in .env.local). */
export function requirePublicSupabaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!url || isTutorialEnvValue(url)) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is missing or still a placeholder. Set your Supabase project URL in .env.local."
    );
  }
  return url;
}

/** Browser-safe anon key (NEXT_PUBLIC_SUPABASE_ANON_KEY). */
export function requireSupabaseAnonKey(): string {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";
  if (!key || isTutorialEnvValue(key)) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_ANON_KEY is missing or still a placeholder. Copy the anon public key from Supabase → Project Settings → API."
    );
  }
  return key;
}

/** Service role key for server-side writes only. Never expose to the client. */
export function requireServiceRoleKey(): string {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ?? "";
  if (!key) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is missing. Add the service_role JWT from Supabase → Project Settings → API to .env.local."
    );
  }
  if (isTutorialEnvValue(key)) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is still a placeholder. Replace it with the real service_role secret from Supabase → Project Settings → API."
    );
  }
  return key;
}

// Public client — lazy singleton for browser use (same URL + anon as dashboard)
let _public: SupabaseClient | null = null;
export function getSupabase(): SupabaseClient {
  if (!_public) {
    _public = createClient(requirePublicSupabaseUrl(), requireSupabaseAnonKey());
  }
  return _public;
}

// Server-side admin client — new instance per call (used in API routes only)
export function getSupabaseAdmin(): SupabaseClient {
  return createClient(requirePublicSupabaseUrl(), requireServiceRoleKey());
}

/*
  Required Supabase tables:

  score_results (
    id              uuid default gen_random_uuid() primary key,
    session_id      text not null,
    business_name   text,
    industry        text,
    city            text,
    answers         jsonb,
    dimension_scores jsonb,
    total_score     int,
    grade           text,
    report          jsonb,
    created_at      timestamptz default now()
  )

  lead_captures (
    id              uuid default gen_random_uuid() primary key,
    phone_hash      text not null,  -- sha256 of phone — never store raw
    phone_encrypted text not null,  -- encrypted phone for WhatsApp follow-ups
    business_name   text,
    industry        text,
    city            text,
    score           int,
    grade           text,
    tool_id         text default 'W1',
    session_id      text,           -- links to score_results.session_id
    hubspot_synced  boolean default false,
    created_at      timestamptz default now()
  )

  otp_verifications (
    id          uuid default gen_random_uuid() primary key,
    phone_hash  text not null,
    otp_code    text not null,
    expires_at  timestamptz not null,
    verified    boolean default false,
    created_at  timestamptz default now()
  )

  usage_events (
    id          uuid default gen_random_uuid() primary key,
    phone_hash  text,
    session_id  text,
    tool_id     text default 'W1',
    event_type  text,  -- 'assessment_start','assessment_complete','gate_hit','gate_pass','cta_click','share'
    metadata    jsonb,
    created_at  timestamptz default now()
  )
*/
