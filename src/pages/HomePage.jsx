import HeroSection          from '@/components/sections/HeroSection';
import TrustBarSection      from '@/components/sections/TrustBarSection';
import YouTubeSection       from '@/components/home/YouTubeSection';
import PortfolioTeaserSection from '@/components/sections/PortfolioTeaserSection';
import ServicesSection      from '@/components/sections/ServicesSection';
import ReviewsSection       from '@/components/sections/ReviewsSection';
import FAQSection           from '@/components/sections/FAQSection';
import FinalCTASection      from '@/components/sections/FinalCTASection';

export default function HomePage() {
  return (
    <main className="relative bg-[#08080c] text-white min-h-screen overflow-x-hidden selection:bg-white/20 selection:text-white">
      {/* Background Ambient Glow (2026 Minimalist Spec) */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col gap-0">
        <HeroSection />
        <TrustBarSection />
        <YouTubeSection />
        <PortfolioTeaserSection />
        <ServicesSection />
        <ReviewsSection />
        <FAQSection />
        <FinalCTASection />
      </div>
    </main>
  );
}


