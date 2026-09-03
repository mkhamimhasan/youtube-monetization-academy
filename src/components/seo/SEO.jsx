import { useEffect } from 'react';

const SITE_NAME = 'YTA.Agency';
const SITE_URL = 'https://ytaagency.com';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  if (!href) return;
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

/**
 * SEO — drops per-page <title>, meta description, Open Graph, Twitter Card,
 * canonical link, and JSON-LD structured data into <head>.
 *
 * No external dependency (react-helmet-async isn't installed) — this hook
 * imperatively syncs document.head on mount / whenever props change, and
 * is safe with client-side routing since it re-runs on every page mount.
 */
export default function SEO({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  structuredData = null,
}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — YouTube Monetization Agency`;
    document.title = fullTitle;

    upsertMeta('name', 'description', description);
    upsertLink('canonical', `${SITE_URL}${path}`);

    // Open Graph
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:url', `${SITE_URL}${path}`);
    upsertMeta('property', 'og:image', image);
    upsertMeta('property', 'og:site_name', SITE_NAME);

    // Twitter Card
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', image);

    if (structuredData) {
      upsertJsonLd('page-structured-data', structuredData);
    }
  }, [title, description, path, image, structuredData]);

  return null;
}

export { SITE_NAME, SITE_URL, DEFAULT_IMAGE };



