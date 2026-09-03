import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // No backend wired in this build — confirms the interaction locally.
    setSubscribed(true);
  };

  return (
    <section className="section-padding ">
      <div className="container-shell">
        <div className="max-w-2xl mx-auto glass-panel p-8 md:p-10 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(0,102,255,0.08) 0%, transparent 70%)' }}
          />
          <div className="relative z-10">
            <p className="kicker justify-center inline-flex mb-3">📬 Newsletter</p>
            <h2 className="font-display text-xl md:text-2xl font-bold text-ink-primary mb-3">
              Monthly Revenue Intelligence
            </h2>
            <p className="text-ink-secondary text-sm max-w-md mx-auto mb-7">
              CPM trend reports, algorithm shifts, and case studies from the channels we manage — no fluff, one
              email a month.
            </p>

            {subscribed ? (
              <div className="flex items-center justify-center gap-2 text-neon-green font-mono text-sm font-bold">
                <CheckCircle2 className="h-5 w-5" />
                You're subscribed — welcome aboard!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="form-input flex-1"
                  aria-label="Email address"
                />
                <button type="submit" className="btn-primary text-xs px-6 py-3 whitespace-nowrap inline-flex items-center justify-center gap-2">
                  Subscribe <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}



