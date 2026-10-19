import { site, hours } from '../data/site';

/** Base LocalBusiness entity, rendered on every page. Expanded in M4 (PLAN.md §7). */
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    '@id': `${site.url}/#business`,
    name: site.name,
    legalName: site.legalName,
    description: site.tagline,
    url: site.url,
    telephone: site.phone.e164,
    email: site.email,
    foundingDate: String(site.foundingYear),
    image: `${site.url}/icon-512.png`,
    logo: `${site.url}/icon-512.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    hasMap: site.mapsUrl,
    openingHoursSpecification: hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${h.day}`,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: Object.values(site.socials),
    memberOf: {
      '@type': 'SportsOrganization',
      name: `${site.affiliation.name} (${site.affiliation.leader})`,
    },
  };
}
