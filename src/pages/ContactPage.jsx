import SEO, { SITE_URL } from '@/components/seo/SEO';
import ContactHero from '@/components/contact/ContactHero';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import NewsletterSection from '@/components/contact/NewsletterSection';

const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'MK Towfiq Studio',
  url: SITE_URL,
  email: 'contact@mktowfiq.com',
  description: 'Direct inquiry for speculative AI pipelines, sound design, and cinematic world building.
  sameAs: [],
};

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact"
        description="Direct Inquiry // Book an architectural consultation or creative production slot.
        path="/contact"
        structuredData={STRUCTURED_DATA}
      />
      <ContactHero />

      <section className="section-padding " id="apply-form">
        <div className="container-shell">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8">
            <div>
              <p className="kicker mb-3">ðŸ“ Apply Now</p>
              <h2 className="mb-4">
                <span className="text-ink-primary">Only</span>{' '}
                <span className="text-gradient-hero">5 Audit Spots</span>{' '}
                <span className="text-ink-primary">a Month</span>
              </h2>
              <p className="text-ink-secondary text-sm max-w-md mb-8">
                We keep audits deep and personal, which means limited availability. Apply below to lock in your
                slot for this month.
              </p>
              <ContactForm />
            </div>

            <div>
              <p className="kicker-green mb-3">ðŸ’¬ Reach Us Directly</p>
              <h3 className="font-display text-base font-bold text-ink-primary mb-5">
                Prefer to talk first?
              </h3>
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      <NewsletterSection />
    </>
  );
}




