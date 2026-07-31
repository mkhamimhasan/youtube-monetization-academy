import SEO from '@/components/seo/SEO';
import AboutHero from '@/components/about/AboutHero';
import FounderStory from '@/components/about/FounderStory';
import MissionVisionSection from '@/components/about/MissionVisionSection';
import CoreValuesSection from '@/components/about/CoreValuesSection';
import StatsSection from '@/components/about/StatsSection';
import { ANCHORS } from '@/config/routes';

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Us"
        description="Meet MK Towfiq — a small studio building websites, editing video, and crafting brand identities. Our story, mission, and values."
        path="/about"
      />
      <AboutHero />
      <FounderStory />
      <MissionVisionSection />
      <CoreValuesSection />
      <StatsSection />

      {/* Closing CTA */}
      <section className="section-padding border-t border-line text-center">
        <div className="container-shell">
          <h2 className="text-gradient-hero mb-4">Ready to Start Your Project?</h2>
          <p className="text-ink-secondary text-sm max-w-lg mx-auto mb-8">
            Book a free discovery call — no pitch, just a clear scope and quote for your project.
          </p>
          <a href={ANCHORS.APPLY} className="btn-primary text-sm px-8 py-3.5">
            Book a Free Call →
          </a>
        </div>
      </section>
    </>
  );
}