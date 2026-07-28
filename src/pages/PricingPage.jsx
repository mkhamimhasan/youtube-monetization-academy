import SEO from '@/components/seo/SEO';
import PricingHero from '@/components/pricing/PricingHero';
import PricingCards from '@/components/pricing/PricingCards';
import ROICalculator from '@/components/pricing/ROICalculator';
import FAQSection from '@/components/sections/FAQSection';
import { ANCHORS } from '@/config/routes';

export default function PricingPage() {
  return (
    <>
      <SEO
        title="Pricing"
        description="Starter, Growth, and Elite plans for YouTube monetization — transparent pricing, full feature comparison, and a 90-day revenue guarantee."
        path="/pricing"
      />
      <PricingHero />
      <PricingCards />
      <ROICalculator />
      <FAQSection />

      <section className="section-padding border-t border-line text-center">
        <div className="container-shell">
          <h2 className="text-gradient-hero mb-4">Not Sure Which Plan Fits?</h2>
          <p className="text-ink-secondary text-sm max-w-lg mx-auto mb-8">
            Book a free audit and we'll recommend the right starting point for your channel.
          </p>
          <a href={ANCHORS.APPLY} className="btn-primary text-sm px-8 py-3.5">
            Apply for Free Audit →
          </a>
        </div>
      </section>
    </>
  );
}
