interface ProgressIndicatorProps {
  current: number; // 1-based
  total:   number;
}

export default function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full" role="progressbar" aria-valuenow={current} aria-valuemin={1} aria-valuemax={total}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium text-white/60">
          Question {current} of {total}
        </span>
        <span className="text-xs text-white/40">{pct}%</span>
      </div>
      <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${pct}%`, background: "#FF7A00" }}
        />
      </div>
    </div>
  );
}
