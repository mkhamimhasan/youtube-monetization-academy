import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import useCursorTrail from '@/hooks/useCursorTrail';

/**
 * Phase 2 RootLayout — all global chrome is now wired:
 *   • Sticky Navbar (scroll-shrink, mobile hamburger)
 *   • Footer (3-col with socials + legal)
 *   • WhatsApp floating button (bottom-right, global)
 *   • Blue neon cursor trail (canvas, desktop only)
 */
export default function RootLayout() {
  useCursorTrail();

  return (
    <div className="min-h-screen bg-space text-ink-primary">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
     {/* <WhatsAppButton /> */}
    </div>
  );
}
