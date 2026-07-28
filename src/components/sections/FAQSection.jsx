import { useState } from 'react';

const FAQS = [
  {
    q: 'How quickly will I see revenue growth?',
    a: "Most clients see meaningful CPM improvements within 30 days. Full revenue transformation — including brand deals and content compounding — typically peaks between months 3 and 6. Our 90-day guarantee means you'll hit at least 40% growth before month four.",
  },
  {
    q: 'Do you work with small channels?',
    a: "We accept channels with 5,000+ subscribers. Below that threshold, the revenue optimization levers are limited. If you're under 5K, we recommend our free audit to map out your path to the threshold first.",
  },
  {
    q: 'What niches do you specialize in?',
    a: "We've achieved results across 28 niches. Our top-performing categories are Finance, Tech, Health & Fitness, Business, Real Estate, and Education — all high-CPM verticals. We also work in Entertainment, Gaming, and Lifestyle.",
  },
  {
    q: 'What does the 90-day revenue guarantee mean?',
    a: "Simple: if your monthly revenue hasn't grown by at least 40% within 90 days of working with us, you don't pay for month 4. We absorb the cost. 98% of clients never trigger the guarantee.",
  },
  {
    q: "Will you take over my channel's creative direction?",
    a: "No. You stay in full creative control. We provide strategy, data, systems, and distribution intelligence — you make the content. The best results come from combining your authentic voice with our growth architecture.",
  },
  {
    q: 'How do the brand deals work?',
    a: "We pitch your channel to brand partners who match your audience and niche. We handle the outreach, rate negotiation, and contract review. You approve every deal before it's signed. Growth and Elite plans include brand deal pipeline access.",
  },
  {
    q: "What's included in the free audit?",
    a: "A 45-minute strategy session where we analyse your current CPM, top videos, revenue gaps, and competitor landscape. You leave with a specific growth roadmap — whether you become a client or not.",
  },
  {
    q: 'Do you offer long-term contracts?',
    a: "No contracts. Month-to-month on all plans. We keep clients by delivering results, not by locking them in. That said, compounding growth means most clients stick with us for 12+ months.",
  },
  {
    q: 'Can I upgrade or downgrade my plan?',
    a: "Yes — plan changes take effect at the start of the next billing month. Most clients start on Growth and move to Elite once they see the ROI.",
  },
  {
    q: 'What happens to my channel data?',
    a: "Your data stays yours. We use YouTube Analytics read-only API access. We never post, modify, or delete content on your channel. Full data deletion available on request within 30 days of cancellation.",
  },
];

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border-b border-line last:border-0 overflow-hidden"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-4 text-left focus-neon rounded group"
        aria-expanded={open}
      >
        <span
          className={`font-body text-sm font-semibold transition-colors duration-200 ${
            open ? 'text-neon-blue-light' : 'text-ink-primary group-hover:text-neon-blue-light'
          }`}
        >
          {faq.q}
        </span>

        {/* Neon expand icon */}
        <span
          className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full transition-all duration-300"
          style={{
            border: `1px solid ${open ? '#4da6ff' : 'rgba(77,166,255,0.3)'}`,
            background: open ? 'rgba(0,102,255,0.15)' : 'transparent',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            boxShadow: open ? '0 0 10px rgba(0,102,255,0.35)' : 'none',
          }}
        >
          <svg
            className="h-3 w-3"
            viewBox="0 0 12 12"
            fill="none"
            style={{ color: open ? '#4da6ff' : '#475569' }}
          >
            <path
              d="M6 2v8M2 6h8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>

      {/* Answer — CSS height transition */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? '300px' : '0px' }}
      >
        <p className="text-ink-secondary text-sm leading-relaxed pb-4 pr-10">
          {faq.a}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section id="faq" className="section-padding border-t border-line">
      <div className="container-shell">
        <div className="text-center mb-12">
          <p className="kicker-purple mb-2">❓ FAQ</p>
          <h2 className="text-gradient-hero mb-4">Objection Crusher</h2>
          <p className="text-ink-secondary text-sm max-w-lg mx-auto">
            Every question we've ever heard — answered honestly.
          </p>
        </div>

        <div className="max-w-3xl mx-auto glass-panel p-6 md:p-8">
          {FAQS.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-ink-muted text-xs mb-4">
            Still have questions?
          </p>
          <a
            href="mailto:hello@yta.agency"
            className="btn-ghost text-sm px-7 py-3"
          >
            Email Us Directly →
          </a>
        </div>
      </div>
    </section>
  );
}
