export default function BrandBar() {
  return (
    <header className="w-full bg-[#0B0907] border-b border-white/[0.08]">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
        <a
          href="https://b-vm.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 shrink-0 min-h-[44px] min-w-[44px] -ml-2 pl-2"
          aria-label="Bold Vision MultiTech"
        >
          <span
            className="flex items-center justify-center w-7 h-7 rounded-[8px] text-[#0B0907] font-black text-base font-heading"
            style={{ background: "linear-gradient(135deg,#FF8C1A,#FF6F00)" }}
            aria-hidden="true"
          >
            B
          </span>
          <span className="text-sm font-semibold text-white tracking-tight font-heading">
            Ghana Business Score
          </span>
        </a>

        <span className="text-xs font-semibold text-white/40 tracking-widest uppercase shrink-0">
          By BVM
        </span>
      </div>
    </header>
  );
}
