const BVM_WHATSAPP = "233270246898";
const BOOKING_URL = "https://ascendsme.africa/b/bvm-digital/";

interface CTABlockProps {
  businessName: string;
  score:        number;
  grade:        string;
  city:         string;
  industry:     string;
}

function buildConsultationMessage(props: CTABlockProps): string {
  return [
    "Hi BVM Digital. I just got my Ghana Business Score.",
    `Business: ${props.businessName}`,
    `Score: ${props.score}/100 (Grade ${props.grade})`,
    `City: ${props.city} · Industry: ${props.industry}`,
    "",
    "I want the free 20-minute consultation to see what to fix first.",
  ].join("\n");
}

export default function CTABlock({ businessName, score, grade, city, industry }: CTABlockProps) {
  const improvement = Math.min(100 - score, 30);
  const whatsappHref = `https://wa.me/${BVM_WHATSAPP}?text=${encodeURIComponent(
    buildConsultationMessage({ businessName, score, grade, city, industry }),
  )}`;

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
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full min-h-[44px] bg-teal text-white font-medium rounded-lg px-6 py-3 hover:bg-teal-dark transition-colors"
        >
          Message BVM for my free consultation
        </a>
        <p className="text-xs text-gray-400 mt-3 text-center">
          Opens WhatsApp with your score ready to send. Free. No obligation.
        </p>
        <p className="text-xs text-gray-400 mt-4 text-center leading-body">
          Prefer to pick a time?{" "}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal font-medium hover:underline underline-offset-2"
          >
            Book on AscendSME
          </a>
        </p>
      </div>
    </div>
  );
}
