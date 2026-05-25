"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { DIMENSION_ROWS } from "@/lib/dimensionRows";
import type { DimensionScores } from "@/types";

interface DimensionBreakdownProps {
  scores:  DimensionScores;
  variant: "grouped" | "compact";
}

export default function DimensionBreakdown({ scores, variant }: DimensionBreakdownProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const mq = typeof window.matchMedia === "function"
      ? window.matchMedia("(prefers-reduced-motion: reduce)")
      : null;
    if (mq?.matches) {
      setAnimate(true);
      return;
    }
    const id = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (variant === "compact") {
    return (
      <div className="space-y-2.5">
        {DIMENSION_ROWS.map(({ key, label, max }) => {
          const val = scores[key];
          const pct = Math.round((val / max) * 100);
          return (
            <div key={key}>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="font-medium text-white/80">{label}</span>
                <span className="tabular-nums text-white/40">{val}/{max}</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                <div
                  className="h-full rounded-full transition-[width] duration-700 ease-out"
                  style={{ width: animate ? `${pct}%` : "0%", background: "#FF7A00" }}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  const working = DIMENSION_ROWS.filter(({ key, max }) => (scores[key] as number) / max >= 0.6);
  const attention = DIMENSION_ROWS.filter(({ key, max }) => (scores[key] as number) / max < 0.6);

  return (
    <div className="space-y-0">
      {working.length > 0 && (
        <div className="mb-5">
          <p className="text-xs font-medium text-orange mb-3 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-orange inline-block shrink-0" aria-hidden />
            Working for you
          </p>
          <div className="space-y-3">
            {working.map(({ key, label, max }) => {
              const val = scores[key] as number;
              const pct = Math.round((val / max) * 100);
              const full = pct === 100;
              return (
                <div key={key}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-white/80 flex flex-wrap items-center gap-1.5">
                      {label}
                      {full && (
                        <span className="text-orange font-semibold text-[10px] uppercase tracking-wide">
                          Full marks
                        </span>
                      )}
                    </span>
                    <span className="text-orange font-semibold tabular-nums">{val}/{max}</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                    <div
                      className="h-full rounded-full transition-[width] duration-700 ease-out"
                      style={{ width: animate ? `${pct}%` : "0%", background: "#FF7A00" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {attention.length > 0 && (
        <div>
          <p className="text-xs font-medium text-white/60 mb-3 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" aria-hidden />
            Needs attention
          </p>
          <div className="space-y-3">
            {attention.map(({ key, label, max }) => {
              const val = scores[key] as number;
              const pct = Math.round((val / max) * 100);
              const isEmpty = val === 0;
              return (
                <div key={key}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-white/80 flex flex-wrap items-center gap-1.5">
                      {label}
                      {isEmpty && (
                        <span className="text-gold font-semibold text-[10px] uppercase tracking-wide">
                          Not started
                        </span>
                      )}
                    </span>
                    <span className={cn("font-medium tabular-nums", isEmpty ? "text-white/40" : "text-white/80")}>
                      {val}/{max}
                    </span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                    {val > 0 ? (
                      <div
                        className="h-full rounded-full transition-[width] duration-700 ease-out bg-gold"
                        style={{ width: animate ? `${pct}%` : "0%" }}
                      />
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
