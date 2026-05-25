interface CTABlockProps {
  businessName: string;
  score:        number;
}

export default function CTABlock({ businessName, score }: CTABlockProps) {
  const improvement = Math.min(100 - score, 30);

  return (
    <div className="border-t border-border pt-8 mt-8">
      <div className="bg-navy rounded-xl p-6 text-white">
        <p className="text-xs font-medium text-teal mb-2 uppercase tracking-wide">
          Next step for {businessName}
        </p>
        <h3 className="text-xl font-semibold leading-display mb-3">
          Your score could reach {score + improvement} in 90 days.
        </h3>
        <p className="text-sm text-gray-300 leading-body mb-5">
          BVM Digital has taken businesses from a score like yours to page one on Google,
          consistent digital payments, and a full brand presence in three months.
          The 20-minute call is free. No pressure. We will show you exactly what to fix first.
        </p>
        <a
          href="https://b-vm.com/consultation"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full min-h-[44px] bg-teal text-white font-medium rounded-lg px-6 py-3 hover:bg-teal-dark transition-colors"
        >
          Book my free 20-minute consultation
        </a>
        <p className="text-xs text-gray-400 mt-3 text-center">
          Free. No obligation. Booked in under a minute.
        </p>
      </div>
    </div>
  );
}
