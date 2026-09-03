export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#08080c] text-white pt-36 pb-24 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-xs font-mono tracking-widest uppercase text-neutral-400 mb-6">
          Engagement & Scope
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 font-display">
          Bespoke Production Scopes
        </h1>
        <p className="text-neutral-400 text-base sm:text-lg leading-relaxed mb-12">
          Every production is custom-scoped based on technical complexity, computing infrastructure, timeline, and commercial IP rights.
        </p>

        <div className="p-8 sm:p-12 rounded-3xl bg-[#0e0e14] border border-white/10 max-w-xl mx-auto text-left mb-12">
          <h3 className="text-xl font-bold text-white mb-4">Standard Engagement Model</h3>
          <ul className="space-y-3 font-mono text-xs sm:text-sm text-neutral-300 mb-8">
            <li className="flex items-center gap-2">✓ Direct 1-on-1 Creative Direction</li>
            <li className="flex items-center gap-2">✓ Full Commercial IP & Source Code Transfer</li>
            <li className="flex items-center gap-2">✓ Milestone-Based Escrow or Retainer</li>
            <li className="flex items-center gap-2">✓ Strict Non-Disclosure (NDA) Protocol</li>
          </ul>

          <a
            href="https://cal.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center w-full py-4 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all"
          >
            Schedule Scoping Session
          </a>
        </div>
      </div>
    </main>
  );
}


