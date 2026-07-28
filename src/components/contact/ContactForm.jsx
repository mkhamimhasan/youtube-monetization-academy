import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2 } from 'lucide-react';

const NICHES = ['Finance', 'Tech', 'Health & Fitness', 'Business', 'Gaming', 'Education', 'Lifestyle', 'Other'];
const REVENUE_RANGES = ['Under $1K/mo', '$1K–$5K/mo', '$5K–$15K/mo', '$15K+/mo'];

const STEPS = ['Channel Info', 'Current Revenue', 'Contact Details'];

export default function ContactForm() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState('idle'); // idle | submitting | success
  const [form, setForm] = useState({
    channelName: '',
    channelUrl: '',
    niche: NICHES[0],
    revenue: REVENUE_RANGES[0],
    name: '',
    email: '',
    message: '',
  });

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    // No backend wired in this build — simulate submission for UX completeness.
    setTimeout(() => setStatus('success'), 1400);
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-10 text-center"
      >
        <CheckCircle2 className="h-12 w-12 text-neon-green mx-auto mb-4" />
        <h3 className="font-display text-lg font-bold text-ink-primary mb-2">Application Received</h3>
        <p className="text-ink-secondary text-sm max-w-sm mx-auto">
          We'll review {form.channelName || 'your channel'} and follow up within one business day to schedule
          your free audit call.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="glass-panel p-7 md:p-9">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((label, i) => (
          <div key={label} className="flex-1">
            <div
              className="h-1 rounded-full transition-colors duration-300"
              style={{ background: i <= step ? '#4da6ff' : 'rgba(255,255,255,0.08)' }}
            />
            <p
              className="font-mono text-[9px] uppercase tracking-widest mt-2 hidden sm:block"
              style={{ color: i <= step ? '#4da6ff' : '#475569' }}
            >
              {label}
            </p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-4"
            >
              <Field label="Channel Name">
                <input required value={form.channelName} onChange={update('channelName')} className="form-input" placeholder="e.g. Finance Flux" />
              </Field>
              <Field label="Channel URL">
                <input required type="url" value={form.channelUrl} onChange={update('channelUrl')} className="form-input" placeholder="https://youtube.com/@yourchannel" />
              </Field>
              <Field label="Niche">
                <select value={form.niche} onChange={update('niche')} className="form-input">
                  {NICHES.map((n) => <option key={n}>{n}</option>)}
                </select>
              </Field>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-4"
            >
              <Field label="Current Monthly Revenue">
                <select value={form.revenue} onChange={update('revenue')} className="form-input">
                  {REVENUE_RANGES.map((r) => <option key={r}>{r}</option>)}
                </select>
              </Field>
              <Field label="What's your biggest revenue bottleneck? (optional)">
                <textarea value={form.message} onChange={update('message')} rows={4} className="form-input resize-none" placeholder="e.g. Low CPM, no brand deals, thumbnail CTR..." />
              </Field>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-4"
            >
              <Field label="Your Name">
                <input required value={form.name} onChange={update('name')} className="form-input" placeholder="Jane Doe" />
              </Field>
              <Field label="Email">
                <input required type="email" value={form.email} onChange={update('email')} className="form-input" placeholder="jane@example.com" />
              </Field>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nav buttons */}
        <div className="flex items-center justify-between mt-8">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="font-mono text-xs text-ink-muted hover:text-ink-primary transition-colors disabled:opacity-0 disabled:pointer-events-none focus-neon rounded"
          >
            ← Back
          </button>

          {step < STEPS.length - 1 ? (
            <button type="button" onClick={next} className="btn-primary text-xs px-6 py-3">
              Continue →
            </button>
          ) : (
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="btn-primary text-xs px-6 py-3 inline-flex items-center gap-2"
            >
              {status === 'submitting' && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {status === 'submitting' ? 'Submitting...' : 'Submit Application →'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">{label}</span>
      {children}
    </label>
  );
}
