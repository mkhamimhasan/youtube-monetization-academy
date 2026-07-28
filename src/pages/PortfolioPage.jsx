import SEO from '@/components/seo/SEO';
import PortfolioHero from '@/components/portfolio/PortfolioHero';
import PortfolioShowcase from '@/components/portfolio/PortfolioShowcase';
import SuccessStoriesGrid from '@/components/portfolio/SuccessStories';
import ReviewsSection from '@/components/sections/ReviewsSection';
import { ANCHORS } from '@/config/routes';

export default function PortfolioPage() {
  return (
    <>
      <SEO
        title="Portfolio"
        description="AI video showcases, thumbnail A/B test wins, Shorts growth sprints, before & after revenue transformations, and live client projects."
        path="/portfolio"
      />
      <PortfolioHero />
      <PortfolioShowcase />

      <section className="section-padding border-t border-line">
        <div className="container-shell">
          <div className="text-center mb-12">
            <p className="kicker-green justify-center inline-flex mb-2">🏆 Client Success Stories</p>
            <h2 className="text-gradient-hero mb-4">Full Case Studies</h2>
            <p className="text-ink-secondary text-sm max-w-lg mx-auto">
              Tap any card for the full breakdown — timeframe, tactics, and the exact revenue delta.
            </p>
          </div>
          <SuccessStoriesGrid />
        </div>
      </section>

      <ReviewsSection />

      <section className="section-padding border-t border-line text-center">
        <div className="container-shell">
          <h2 className="text-gradient-hero mb-4">Want to Be Our Next Case Study?</h2>
          <p className="text-ink-secondary text-sm max-w-lg mx-auto mb-8">
            Apply for a free audit and we'll show you exactly where your revenue gaps are.
          </p>
          <a href={ANCHORS.APPLY} className="btn-primary text-sm px-8 py-3.5">
            Apply for Free Audit →
          </a>
        </div>
      </section>
    </>
  );
}
