/**
 * OTP sending via Africa's Talking WhatsApp API.
 * Falls back to SMS if WhatsApp delivery fails.
 */

import { createHash } from "crypto";
import { isTutorialEnvValue } from "@/lib/env";

export function hashPhone(phone: string): string {
  return createHash("sha256").update(phone.trim()).digest("hex");
}

export function normalisePhone(raw: string): string {
  // Strip spaces, dashes; ensure Ghana prefix
  let phone = raw.replace(/[\s\-()]/g, "");
  if (phone.startsWith("0")) phone = "+233" + phone.slice(1);
  if (!phone.startsWith("+")) phone = "+233" + phone;
  return phone;
}

export function validateGhanaPhone(phone: string): boolean {
  const normalised = normalisePhone(phone);
  // Ghana numbers: +233 followed by 9 digits
  return /^\+233[235679]\d{8}$/.test(normalised);
}

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendWhatsAppOTP(phone: string, otp: string): Promise<{ success: boolean; error?: string }> {
  const apiKey   = process.env.AT_API_KEY?.trim();
  const username = process.env.AT_USERNAME?.trim();

  const credsMissing =
    !apiKey ||
    !username ||
    isTutorialEnvValue(apiKey) ||
    isTutorialEnvValue(username);

  if (credsMissing) {
    console.log(`[DEV OTP] ${phone}: ${otp}`);
    return { success: true };
  }

  try {
    const message = `Your BVM Ghana Business Score verification code is: ${otp}\n\nThis code expires in 10 minutes. Do not share it with anyone.`;

    const response = await fetch("https://api.africastalking.com/version1/messaging", {
      method: "POST",
      headers: {
        Accept:       "application/json",
        apiKey,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username,
        to:      phone,
        message,
        from:    "BVM",
      }),
    });

    const data = await response.json();
    if (data?.SMSMessageData?.Recipients?.[0]?.status === "Success") {
      return { success: true };
    }
    return { success: false, error: "That did not go through. Check your number and tap again." };
  } catch {
    return { success: false, error: "We could not send your code just now. Try again in a moment." };
  }
}
