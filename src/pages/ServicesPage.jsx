import SEO from '@/components/seo/SEO';
import ServicesHero from '@/components/services/ServicesHero';
import ServiceOverview from '@/components/services/ServiceOverview';
import PremiumServiceCards from '@/components/services/PremiumServiceCards';
import ProcessTimeline from '@/components/services/ProcessTimeline';
import { ANCHORS } from '@/config/routes';

export default function ServicesPage() {
  return (
    <>
      <SEO
        title="Services"
        description="CPM optimization, AI content strategy, monetization systems, thumbnail testing, analytics, and brand partnerships — six systems, one revenue engine."
        path="/services"
      />
      <ServicesHero />
      <ServiceOverview />
      <PremiumServiceCards />
      <ProcessTimeline />

      <section className="section-padding border-t border-line text-center">
        <div className="container-shell">
          <h2 className="text-gradient-hero mb-4">Which System Is Your Channel Missing?</h2>
          <p className="text-ink-secondary text-sm max-w-lg mx-auto mb-8">
            Find out in a free 45-minute audit — no obligation, just a clear roadmap.
          </p>
          <a href={ANCHORS.APPLY} className="btn-primary text-sm px-8 py-3.5">
            Apply for Free Audit →
          </a>
        </div>
      </section>
    </>
  );
}
