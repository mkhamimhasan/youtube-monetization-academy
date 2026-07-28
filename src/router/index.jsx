import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@/components/layout/RootLayout';
import HomePage     from '@/pages/HomePage';
import AboutPage    from '@/pages/AboutPage';
import ServicesPage from '@/pages/ServicesPage';
import PortfolioPage from '@/pages/PortfolioPage';
import PricingPage  from '@/pages/PricingPage';
import ContactPage  from '@/pages/ContactPage';
import { ROUTES } from '@/config/routes';

/**
 * Route tree — v3 sitemap, 6 pages.
 * Phase 2: HomePage. Phase 3-5: About, Services, Portfolio, Pricing,
 * and Contact are now fully built out, replacing the RouteStub
 * placeholders per the original Phase 2 plan.
 */
export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <RootLayout />,
    children: [
      { index: true,                     element: <HomePage /> },
      { path: ROUTES.ABOUT.slice(1),     element: <AboutPage /> },
      { path: ROUTES.SERVICES.slice(1),  element: <ServicesPage /> },
      { path: ROUTES.PORTFOLIO.slice(1), element: <PortfolioPage /> },
      { path: ROUTES.PRICING.slice(1),   element: <PricingPage /> },
      { path: ROUTES.CONTACT.slice(1),   element: <ContactPage /> },
    ],
  },
]);

export default router;
