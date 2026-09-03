/**
 * TEMPORARY — Phase 1 only.
 *
 * Stands in for real page components so the router can be wired up and
 * verified before page work begins. Every route below will be replaced
 * by its dedicated page component in a later phase; nothing here is
 * part of the final design.
 */
export default function RouteStub({ label }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-hero-gradient">
      <div className="glass-panel px-8 py-6 text-center">
        <p className="kicker justify-center">Phase 1 · Routing Check</p>
        <h1 className="font-display text-2xl text-ink-primary">{label}</h1>
        <p className="mt-2 font-mono text-xs text-ink-muted">
          Page component not yet built — router is wired correctly.
        </p>
      </div>
    </main>
  );
}



