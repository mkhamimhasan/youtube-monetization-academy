import HeroSection          from '@/components/sections/HeroSection';
import TrustBarSection       from '@/components/sections/TrustBarSection';
import ServicesSection       from '@/components/sections/ServicesSection';
import WhyUsSection          from '@/components/sections/WhyUsSection';
import PortfolioTeaserSection from '@/components/sections/PortfolioTeaserSection';
import ReviewsSection        from '@/components/sections/ReviewsSection';
import PricingTeaserSection  from '@/components/sections/PricingTeaserSection';
import FAQSection            from '@/components/sections/FAQSection';
import FinalCTASection       from '@/components/sections/FinalCTASection';
import YouTubeSection        from '@/components/home/YouTubeSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBarSection />
      <ServicesSection />
      <WhyUsSection />
      <PortfolioTeaserSection />
      <ReviewsSection />
      <YouTubeSection />
      <PricingTeaserSection />
      <FAQSection />
      <FinalCTASection />
    </>
  );
}