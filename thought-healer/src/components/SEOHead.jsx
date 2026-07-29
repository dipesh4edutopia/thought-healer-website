import { useEffect } from 'react';

/**
 * SEOHead — Zero-dependency per-page SEO component
 * Dynamically updates document title, meta tags, canonical link, Open Graph, Twitter Cards & JSON-LD
 * Usage: <SEOHead title="..." description="..." canonical="..." schema={...} />
 */
const SEOHead = ({
  title,
  description,
  canonical,
  ogImage = 'https://thoughthealer.org/og-image.png',
  ogType = 'website',
  noindex = false,
  schema = null,
}) => {
  useEffect(() => {
    const siteName = 'ThoughtHealer';
    const defaultDescription =
      'Digital mental health monitoring and wellness platform. ThoughtPro, MiniMinds, HerMind & LES apps by ThoughtHealer, Pune, India.';

    const metaTitle = title || siteName;
    const metaDescription = description || defaultDescription;

    // Update document title
    document.title = metaTitle;

    // Helper function to update or create meta tags
    const setMetaTag = (attrName, attrValue, content) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Primary Meta Tags
    setMetaTag('name', 'description', metaDescription);
    if (noindex) {
      setMetaTag('name', 'robots', 'noindex, nofollow');
    }

    // Canonical Link Tag
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonical);
    }

    // Open Graph Meta Tags
    setMetaTag('property', 'og:title', metaTitle);
    setMetaTag('property', 'og:description', metaDescription);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:url', canonical || 'https://thoughthealer.org');
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:site_name', siteName);
    setMetaTag('property', 'og:locale', 'en_IN');

    // Twitter Card Meta Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', metaTitle);
    setMetaTag('name', 'twitter:description', metaDescription);
    setMetaTag('name', 'twitter:image', ogImage);
    setMetaTag('name', 'twitter:site', '@thoughthealer');

    // JSON-LD Structured Data Script Tag
    let schemaScript = document.getElementById('page-jsonld-schema');
    if (schema) {
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'page-jsonld-schema';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schema);
    } else if (schemaScript) {
      schemaScript.remove();
    }
  }, [title, description, canonical, ogImage, ogType, noindex, schema]);

  return null;
};

export default SEOHead;
