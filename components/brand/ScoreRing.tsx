"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { gradeLabel, scoreRingOffset } from "@/lib/scoring";

interface ScoreRingProps {
  score: number;
  grade: string;
}

export default function ScoreRing({ score, grade }: ScoreRingProps) {
  const [animated, setAnimated] = useState(false);
  const [showCentre, setShowCentre] = useState(false);

  const circumference = 565; // 2 * pi * 90
  const offset        = animated ? scoreRingOffset(score) : circumference;

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delay = reduced ? 0 : 700;
    const t = setTimeout(() => setShowCentre(true), delay);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-44 h-44">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200" aria-hidden="true">
          <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" />
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="#FF7A00"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1.2s ease-out" }}
          />
        </svg>

        <div
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center transition-all duration-[450ms] ease-out",
            showCentre ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
          )}
        >
          <span
            className="text-4xl font-black font-heading leading-none tabular-nums"
            style={{
              background: "linear-gradient(180deg,#FFFFFF 30%,#FF7A00 110%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {score}
          </span>
          <span className="text-xs text-white/40 mt-1">out of 100</span>
        </div>
      </div>

      <div
        className={cn(
          "mt-3 px-4 py-1 rounded-full text-sm font-black font-heading text-white transition-all duration-[450ms] ease-out delay-75",
          showCentre ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1",
        )}
        style={{ background: "linear-gradient(135deg,#FF8C1A,#FF6F00)" }}
      >
        Grade {grade}: {gradeLabel(grade)}
      </div>
    </div>
  );
}
