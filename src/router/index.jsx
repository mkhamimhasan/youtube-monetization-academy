import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@/components/layout/RootLayout';
import HomePage from '@/pages/HomePage';
import { ROUTES } from '@/config/routes';

/**
 * Route tree — v3 sitemap, 6 pages.
 * Only HomePage is bundled eagerly (it's the landing page and needs to
 * be fast). Every other page is code-split via React.lazy so visitors
 * who only view the homepage don't pay for About/Services/Portfolio/
 * Pricing/Contact JS on first load.
 */
const AboutPage    = lazy(() => import('@/pages/AboutPage'));
const ServicesPage = lazy(() => import('@/pages/ServicesPage'));
const PortfolioPage = lazy(() => import('@/pages/PortfolioPage'));
const PricingPage  = lazy(() => import('@/pages/PricingPage'));
const ContactPage  = lazy(() => import('@/pages/ContactPage'));

const withSuspense = (el) => <Suspense fallback={null}>{el}</Suspense>;

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <RootLayout />,
    children: [
      { index: true,                     element: <HomePage /> },
      { path: ROUTES.ABOUT.slice(1),     element: withSuspense(<AboutPage />) },
      { path: ROUTES.SERVICES.slice(1),  element: withSuspense(<ServicesPage />) },
      { path: ROUTES.PORTFOLIO.slice(1), element: withSuspense(<PortfolioPage />) },
      { path: ROUTES.PRICING.slice(1),   element: withSuspense(<PricingPage />) },
      { path: ROUTES.CONTACT.slice(1),   element: withSuspense(<ContactPage />) },
    ],
  },
]);

export default router;