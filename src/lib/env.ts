/**
 * PUBLIC_SITE_ENV=production enables indexing and analytics.
 * Anything else (default) is treated as staging: noindex + robots Disallow.
 * Flip the GitHub Actions variable SITE_ENV at cutover (PLAN.md §10).
 */
export const isProduction = import.meta.env.PUBLIC_SITE_ENV === 'production';

export const ga4Id: string | undefined = import.meta.env.PUBLIC_GA4_ID || undefined;
