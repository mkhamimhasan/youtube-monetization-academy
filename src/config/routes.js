/**
 * Centralized route paths — matches the locked v3 sitemap exactly.
 * Import these constants instead of hardcoding path strings so nav,
 * links, and the router config never drift out of sync.
 */
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  PORTFOLIO: '/portfolio',
  PRICING: '/pricing',
  CONTACT: '/contact',
};

/** Homepage anchor sections (deep-linked, per blueprint sitemap). */
export const ANCHORS = {
  WHY_US: '/#why-us',
  REVIEWS: '/#reviews',
  FAQ: '/#faq',
  APPLY: '/#apply',
};

export default ROUTES;
