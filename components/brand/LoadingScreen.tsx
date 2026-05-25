"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  "Reading your business signals...",
  "Comparing against Accra and Kumasi businesses...",
  "Identifying your biggest digital gaps...",
  "Building your priority action list...",
  "Finalising your Ghana Business Score...",
];

export default function LoadingScreen() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <div className="relative w-20 h-20 mb-5">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80" aria-hidden>
          <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
          <circle
            cx="40"
            cy="40"
            r="32"
            fill="none"
            stroke="#FF7A00"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="201"
            strokeDashoffset="50"
            style={{ transformOrigin: "center", animation: "none", strokeDashoffset: 50 }}
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 40 40"
              to="360 40 40"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>

      <div
        className="flex gap-1.5 mb-6 w-full max-w-[220px]"
        role="progressbar"
        aria-valuenow={msgIndex + 1}
        aria-valuemin={1}
        aria-valuemax={MESSAGES.length}
        aria-label="Analysis steps"
      >
        {MESSAGES.map((_, i) => (
          <span
            key={i}
            className="h-1 flex-1 rounded-full transition-colors duration-300"
            style={{ background: i <= msgIndex ? "#FF7A00" : "rgba(255,255,255,0.08)" }}
          />
        ))}
      </div>

      <p className="text-base font-medium font-heading text-white transition-opacity duration-300 min-h-[28px] max-w-[20rem] mx-auto leading-body">
        {MESSAGES[msgIndex]}
      </p>
      <p className="text-sm text-white/60 mt-2">This takes 3 to 5 seconds.</p>
    </div>
  );
}
