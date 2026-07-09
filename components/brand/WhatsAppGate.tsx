"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

interface WhatsAppGateProps {
  onVerified: (phone: string, email: string) => void;
}

export default function WhatsAppGate({ onVerified }: WhatsAppGateProps) {
  const [phone,      setPhone]      = useState("");
  const [email,      setEmail]      = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading,    setLoading]    = useState(false);

  function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  async function handleSubmit() {
    let hasError = false;

    if (!phone.trim()) {
      setPhoneError("Add your WhatsApp number to continue.");
      hasError = true;
    }
    if (!isValidEmail(email)) {
      setEmailError("Add a valid email address to continue.");
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);
    onVerified(phone.trim(), email.trim());
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
        Enter your WhatsApp number and email to see your complete score, all gaps, and your priority action list.
        We will also send you a copy so you can refer back to it.
      </p>

      <div className="flex flex-col gap-4">
        {/* Phone field */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-white/80">WhatsApp number</label>
          <input
            type="tel"
            placeholder="+233 24 123 4567"
            value={phone}
            autoComplete="tel"
            onChange={(e) => {
              setPhone(e.target.value);
              if (phoneError) setPhoneError("");
            }}
            className="w-full bg-white/[0.06] border border-white/[0.12] rounded-lg px-3 text-white placeholder:text-white/30 text-base focus:outline-none focus:border-orange/60 transition-colors"
            style={{ height: "44px", fontSize: "16px" }}
          />
          {phoneError && (
            <p className="text-xs text-red-400 mt-0.5">{phoneError}</p>
          )}
        </div>

        {/* Email field */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-white/80">Email address</label>
          <input
            type="email"
            placeholder="you@yourbusiness.com"
            value={email}
            autoComplete="email"
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError("");
            }}
            className="w-full bg-white/[0.06] border border-white/[0.12] rounded-lg px-3 text-white placeholder:text-white/30 text-base focus:outline-none focus:border-orange/60 transition-colors"
            style={{ height: "44px", fontSize: "16px" }}
          />
          {emailError && (
            <p className="text-xs text-red-400 mt-0.5">{emailError}</p>
          )}
        </div>

        <Button
          onClick={handleSubmit}
          loading={loading}
          size="lg"
        >
          Show my full report
        </Button>
      </div>

      <p className="text-xs text-white/40 mt-4 text-center">
        No spam. We use your details to send you this report and relevant tips from BVM Digital.
      </p>
    </div>
  );
}
