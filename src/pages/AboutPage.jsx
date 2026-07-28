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
        description="Meet YTA.Agency — the YouTube monetization team behind 240+ channels and $4.2M+ in generated client revenue. Our story, mission, and values."
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
          <h2 className="text-gradient-hero mb-4">Ready to See What We'd Find in Your Channel?</h2>
          <p className="text-ink-secondary text-sm max-w-lg mx-auto mb-8">
            Book a free 45-minute audit — no pitch, just a specific revenue roadmap for your channel.
          </p>
          <a href={ANCHORS.APPLY} className="btn-primary text-sm px-8 py-3.5">
            Apply for Free Audit →
          </a>
        </div>
      </section>
    </>
  );
}
