"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import type { OTPStatus } from "@/types";

interface WhatsAppGateProps {
  onVerified: (phone: string) => void;
}

export default function WhatsAppGate({ onVerified }: WhatsAppGateProps) {
  const [phone,     setPhone]     = useState("");
  const [otp,       setOtp]       = useState("");
  const [phoneHash, setPhoneHash] = useState("");
  const [status,    setStatus]    = useState<OTPStatus>("idle");
  const [error,     setError]     = useState("");

  async function handleSendOTP() {
    setError("");
    setStatus("sending");

    const res  = await fetch("/api/send-otp", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ phone }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "That did not go through. Check your number and tap again.");
      setStatus("idle");
      return;
    }

    setPhoneHash(data.phoneHash);
    setStatus("sent");
  }

  async function handleVerifyOTP() {
    setError("");
    setStatus("verifying");

    const res  = await fetch("/api/verify-otp", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ phoneHash, otp }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "That code is not right. Check your WhatsApp and try again.");
      setStatus("sent");
      return;
    }

    setStatus("verified");
    onVerified(phone);
  }

  return (
    <div className="bg-[#141210] border border-white/[0.08] rounded-xl p-6 mx-auto max-w-sm w-full">
      {/* Icon */}
      <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: "rgba(255,122,0,0.14)" }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="#FF7A00"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.555 4.118 1.529 5.845L0 24l6.335-1.508A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.37l-.36-.213-3.76.895.951-3.658-.234-.377A9.818 9.818 0 0112 2.182c5.427 0 9.818 4.391 9.818 9.818S17.427 21.818 12 21.818z" fill="#FF7A00"/>
        </svg>
      </div>

      <h3 className="text-lg font-bold font-heading text-white mb-1">
        Your full report is ready.
      </h3>
      <p className="text-sm text-white/60 mb-5 leading-body">
        Enter your WhatsApp number to see your complete score, all gaps, and your priority action list.
        We will also send you a copy so you can refer back to it.
      </p>

      {status === "idle" || status === "sending" ? (
        <div className="flex flex-col gap-4">
          <Input
            label="Your WhatsApp number"
            type="tel"
            placeholder="+233 24 123 4567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
            error={error}
          />
          <Button
            onClick={handleSendOTP}
            loading={status === "sending"}
            size="lg"
          >
            Send my WhatsApp code
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-orange font-medium">
            Code sent to {phone}. Check your WhatsApp.
          </p>
          <Input
            label="Enter your 6-digit code"
            type="text"
            inputMode="numeric"
            placeholder="123456"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            error={error}
          />
          <Button
            onClick={handleVerifyOTP}
            loading={status === "verifying"}
            size="lg"
          >
            Unlock my full report
          </Button>
          <button
            onClick={() => { setStatus("idle"); setError(""); }}
            className="text-sm text-white/40 underline underline-offset-2 text-center"
          >
            Use a different number
          </button>
        </div>
      )}

      <p className="text-xs text-white/40 mt-4 text-center">
        We respect your privacy. Reply DELETE to any message to remove your data.
      </p>
    </div>
  );
}
