export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { isEnvConfigurationError } from "@/lib/env";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { phoneHash, otp } = await req.json();

    if (!phoneHash || !otp) {
      return NextResponse.json(
        { error: "Missing verification details." },
        { status: 400 }
      );
    }

    const db = getSupabaseAdmin();

    // Find the most recent unverified OTP for this phone
    const { data, error } = await db
      .from("otp_verifications")
      .select("*")
      .eq("phone_hash", phoneHash)
      .eq("verified", false)
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Your code has expired. Tap to get a new one." },
        { status: 400 }
      );
    }

    if (data.otp_code !== otp) {
      return NextResponse.json(
        { error: "That code is not right. Check your WhatsApp and try again." },
        { status: 400 }
      );
    }

    const { error: updateError } = await db
      .from("otp_verifications")
      .update({ verified: true })
      .eq("id", data.id);

    if (updateError) {
      console.error("[verify-otp] supabase update:", updateError);
      return NextResponse.json(
        { error: "We could not finish verification. Try again in a moment." },
        { status: 503 }
      );
    }

    return NextResponse.json({ success: true, verified: true });
  } catch (err) {
    console.error("[verify-otp]", err);
    if (isEnvConfigurationError(err)) {
      return NextResponse.json({ error: err.message }, { status: 503 });
    }
    return NextResponse.json(
      { error: "Verification failed. Try again in a moment." },
      { status: 500 }
    );
  }
}
