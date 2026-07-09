export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { isEnvConfigurationError } from "@/lib/env";
import { hashPhone, normalisePhone } from "@/lib/otp";
import { getSupabaseAdmin } from "@/lib/supabase";
import { pushLeadToHubSpot } from "@/lib/hubspot";

export async function POST(req: NextRequest) {
  try {
    const { phone, email, businessName, industry, city, score, grade } = await req.json();

    const normalisedPhone = normalisePhone(phone);
    const phoneHash       = hashPhone(normalisedPhone);

    const db = getSupabaseAdmin();

    const { error: leadError } = await db.from("lead_captures").insert({
      phone_hash:      phoneHash,
      phone_encrypted: Buffer.from(normalisedPhone).toString("base64"), // Basic encoding; use proper encryption in prod
      email:           email ?? null,
      business_name:   businessName,
      industry,
      city,
      score,
      grade,
      tool_id:         "W1",
    });

    if (leadError) {
      console.error("[capture-lead] supabase insert:", leadError);
      return NextResponse.json({ success: false }, { status: 503 });
    }

    // Push to HubSpot (non-blocking)
    pushLeadToHubSpot({
      phone: normalisedPhone,
      email,
      businessName,
      industry,
      city,
      score,
      grade,
    }).catch(console.error);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[capture-lead]", err);
    if (isEnvConfigurationError(err)) {
      return NextResponse.json({ success: false, error: err.message }, { status: 503 });
    }
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
