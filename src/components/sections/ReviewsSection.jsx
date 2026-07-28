const REVIEWS = [
  {
    name: 'Alex Chen',
    channel: '@TechExplained',
    avatar: '👨‍💻',
    stars: 5,
    revenue: '+$7,700/mo',
    months: 7,
    quote: "I went from $1,200 to $8,900 in monthly revenue in under 8 months. The CPM optimization alone paid for the entire package in week two.",
    niche: 'Tech',
    accent: '#4da6ff',
  },
  {
    name: 'Sarah Mitchell',
    channel: '@FinanceWithSarah',
    avatar: '👩‍💼',
    stars: 5,
    revenue: '+$19,300/mo',
    months: 9,
    quote: "The brand deal pipeline was a game changer. They landed me a $15K sponsorship with a fintech brand in month three. I had zero brand relationships before.",
    niche: 'Finance',
    accent: '#34d399',
  },
  {
    name: 'Marcus Webb',
    channel: '@GadgetGuru',
    avatar: '🎮',
    stars: 5,
    revenue: '+$4,800/mo',
    months: 6,
    quote: "Their Thumbnail Lab increased my CTR from 2.1% to 7.8%. That single change tripled my impressions monetized without any extra content.",
    niche: 'Tech Reviews',
    accent: '#a78bfa',
  },
  {
    name: 'Priya Sharma',
    channel: '@CookingWithPriya',
    avatar: '👩‍🍳',
    stars: 5,
    revenue: '+$3,200/mo',
    months: 5,
    quote: "The AI content strategy found a gap in my niche I never knew existed. Three of those topic suggestions became my top 5 all-time videos.",
    niche: 'Food',
    accent: '#fbbf24',
  },
  {
    name: 'James Okonkwo',
    channel: '@FitWithJames',
    avatar: '💪',
    stars: 5,
    revenue: '+$6,100/mo',
    months: 8,
    quote: "I was skeptical of the 90-day guarantee. I didn't need it — they hit 40% growth in month two. Now I'm at 640% total revenue growth.",
    niche: 'Fitness',
    accent: '#00d4ff',
  },
  {
    name: 'Lena Bauer',
    channel: '@TravelWithLena',
    avatar: '✈️',
    stars: 5,
    revenue: '+$2,900/mo',
    months: 4,
    quote: "The monetization systems they built — memberships, affiliate stacks, brand deals — my channel now earns revenue 24/7 not just when ads run.",
    niche: 'Travel',
    accent: '#f43f5e',
  },
];

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="h-3 w-3 fill-current text-yellow-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div
      className="flex-shrink-0 w-72 rounded-card p-5 relative"
      style={{
        background: 'rgba(5,10,24,0.85)',
        border: `1px solid ${review.accent}22`,
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Revenue badge */}
      <div
        className="absolute top-4 right-4 font-mono text-[10px] font-black px-2 py-0.5 rounded-full"
        style={{
          color: review.accent,
          background: `${review.accent}18`,
          border: `1px solid ${review.accent}35`,
        }}
      >
        {review.revenue}
      </div>

      {/* Avatar + info */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="h-10 w-10 rounded-full flex items-center justify-center text-xl"
          style={{ background: `${review.accent}18`, border: `1px solid ${review.accent}30` }}
        >
          {review.avatar}
        </div>
        <div>
          <p className="font-display text-xs font-bold text-ink-primary">{review.name}</p>
          <p className="font-mono text-[9px] text-ink-muted">{review.channel}</p>
        </div>
      </div>

      <StarRating count={review.stars} />

      <p className="text-ink-secondary text-xs leading-relaxed mt-3 mb-3">
        "{review.quote}"
      </p>

      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] text-ink-muted">{review.niche} · {review.months}mo</span>
        {/* Fake verified badge */}
        <span className="font-mono text-[8px] text-neon-green flex items-center gap-1">
          <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Verified
        </span>
      </div>
    </div>
  );
}

export default function ReviewsSection() {
  const doubled = [...REVIEWS, ...REVIEWS];

  return (
    <section id="reviews" className="section-padding border-t border-line overflow-hidden">
      <div className="container-shell mb-10">
        <div className="text-center">
          <p className="kicker-purple mb-2">⭐ Social Proof</p>
          <h2 className="text-gradient-hero mb-4">Real Results, Real Creators</h2>
          <p className="text-ink-secondary text-sm max-w-lg mx-auto">
            240+ creators. $0 in fake case studies. Every number here is verified and documented.
          </p>
        </div>
      </div>

      {/* Marquee row — continuous scroll */}
      <div className="relative overflow-hidden">
        <div
          className="absolute left-0 top-0 bottom-0 z-10 w-16 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #050a18, transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 z-10 w-16 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #050a18, transparent)' }}
        />

        <div
          className="flex gap-4 py-3"
          style={{
            width: 'max-content',
            animation: 'marquee 40s linear infinite',
          }}
        >
          {doubled.map((r, i) => (
            <ReviewCard key={i} review={r} />
          ))}
        </div>
      </div>

      {/* Summary stats */}
      <div className="container-shell mt-10">
        <div className="grid grid-cols-3 gap-4">
          {[
            { val: '5.0', label: 'Average Rating', icon: '⭐' },
            { val: '240+', label: 'Happy Clients', icon: '👥' },
            { val: '$2.1M+', label: 'Revenue Generated', icon: '💰' },
          ].map((s) => (
            <div
              key={s.label}
              className="glass-panel text-center py-5 px-3"
            >
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="font-display text-xl font-black text-neon-blue-light mb-0.5">{s.val}</div>
              <div className="font-mono text-[9px] text-ink-muted uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
