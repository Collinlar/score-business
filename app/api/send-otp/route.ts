export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { isEnvConfigurationError } from "@/lib/env";
import { validateGhanaPhone, normalisePhone, hashPhone, generateOTP, sendWhatsAppOTP } from "@/lib/otp";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json(
        { error: "Your WhatsApp number is required." },
        { status: 400 }
      );
    }

    if (!validateGhanaPhone(phone)) {
      return NextResponse.json(
        { error: "Your WhatsApp number needs a country code. Try: +233 24 123 4567" },
        { status: 400 }
      );
    }

    const normalisedPhone = normalisePhone(phone);
    const phoneHash       = hashPhone(normalisedPhone);
    const otp             = generateOTP();
    const expiresAt       = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const db = getSupabaseAdmin();
    const { error: otpDbError } = await db.from("otp_verifications").insert({
      phone_hash: phoneHash,
      otp_code:   otp,
      expires_at: expiresAt.toISOString(),
    });

    if (otpDbError) {
      console.error("[send-otp] supabase insert:", otpDbError);
      return NextResponse.json(
        {
          error:
            "We could not start verification just now. Confirm SUPABASE_SERVICE_ROLE_KEY and the otp_verifications table.",
        },
        { status: 503 }
      );
    }

    // Send via WhatsApp
    const result = await sendWhatsAppOTP(normalisedPhone, otp);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error ?? "That did not go through. Check your number and tap again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, phoneHash });
  } catch (err) {
    console.error("[send-otp]", err);
    if (isEnvConfigurationError(err)) {
      return NextResponse.json({ error: err.message }, { status: 503 });
    }
    return NextResponse.json(
      { error: "We could not send your code just now. Try again in a moment." },
      { status: 500 }
    );
  }
}
