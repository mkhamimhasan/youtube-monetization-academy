import HeroSection          from '@/components/sections/HeroSection';
import TrustBarSection       from '@/components/sections/TrustBarSection';
import ServicesSection       from '@/components/sections/ServicesSection';
import WhyUsSection          from '@/components/sections/WhyUsSection';
import PortfolioTeaserSection from '@/components/sections/PortfolioTeaserSection';
import ReviewsSection        from '@/components/sections/ReviewsSection';
import PricingTeaserSection  from '@/components/sections/PricingTeaserSection';
import FAQSection            from '@/components/sections/FAQSection';
import FinalCTASection       from '@/components/sections/FinalCTASection';

/**
 * HomePage — 9 content sections (Footer is in RootLayout).
 * Section order matches the locked v3 blueprint exactly:
 *   01 Hero · 02 Trust Bar · 03 Services · 04 Why Us ·
 *   05 Portfolio Teaser · 06 Reviews · 07 Pricing Teaser ·
 *   08 FAQ · 09 Final CTA
 *   (10 Footer rendered by RootLayout)
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBarSection />
      <ServicesSection />
      <WhyUsSection />
      <PortfolioTeaserSection />
      <ReviewsSection />
      <PricingTeaserSection />
      <FAQSection />
      <FinalCTASection />
    </>
  );
}
