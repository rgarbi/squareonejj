import { site, hours, schedule, programs, type Program } from '../data/site';
import type { Faq } from '../data/faq';
import { reviewSummary } from '../data/reviews';
import { coaches } from '../data/coaches';

const businessId = `${site.url}/#business`;
const abs = (path: string) => new URL(path, site.url).href;

/** Cities the academy draws from — used for `areaServed` (PLAN.md §7). */
export const areaServed = [
  "Lee's Summit",
  'Blue Springs',
  'Greenwood',
  'Lake Lotawana',
  'Raymore',
  'Raytown',
  'Independence',
  'Grandview',
  'Kansas City',
];

export function faqSchema(items: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: site.name,
    alternateName: [site.shortName, 'Square One JJ', 'Square One BJJ'],
    url: site.url,
    publisher: { '@id': businessId },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

/** A program page as a Course with its weekly sessions. */
export function courseSchema(opts: { name: string; description: string; path: string; programs: Program[]; ages: string }) {
  // One CourseInstance per program + time slot, e.g. Adult Gi 6:00 AM on Mon & Wed.
  const slots = new Map<string, { program: Program; start: string; end: string; days: string[] }>();
  for (const c of schedule.filter((c) => opts.programs.includes(c.program))) {
    const key = `${c.program}|${c.start}|${c.end}`;
    const slot = slots.get(key) ?? { program: c.program, start: c.start, end: c.end, days: [] };
    slot.days.push(`https://schema.org/${c.day}`);
    slots.set(key, slot);
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: opts.name,
    description: opts.description,
    url: abs(opts.path),
    provider: { '@id': businessId },
    audience: { '@type': 'PeopleAudience', suggestedAge: opts.ages },
    offers: { '@type': 'Offer', name: 'Free trial class', price: 0, priceCurrency: 'USD', category: 'Free trial' },
    hasCourseInstance: [...slots.values()].map((s) => ({
      '@type': 'CourseInstance',
      name: programs[s.program].name,
      courseMode: 'onsite',
      location: { '@id': businessId },
      courseSchedule: {
        '@type': 'Schedule',
        repeatFrequency: 'P1W',
        byDay: s.days,
        startTime: s.start,
        endTime: s.end,
        scheduleTimezone: 'America/Chicago',
      },
    })),
  };
}

/** Base LocalBusiness entity, rendered on every page. */
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    '@id': businessId,
    name: site.name,
    alternateName: site.shortName,
    legalName: site.legalName,
    description: `${site.tagline} Brazilian Jiu-Jitsu academy offering Adult Gi, Adult No-Gi, Youth Jiu Jitsu and Youth No-Gi classes. Zenith BJJ affiliate under Robert Drysdale. First class free.`,
    url: site.url,
    telephone: site.phone.e164,
    email: site.email,
    foundingDate: String(site.foundingYear),
    image: abs('/og-default.jpg'),
    logo: abs('/icon-512.png'),
    priceRange: '$$',
    currenciesAccepted: 'USD',
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
    areaServed: areaServed.map((name) => ({ '@type': 'City', name: `${name}, MO` })),
    openingHoursSpecification: hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${h.day}`,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: [...Object.values(site.socials), site.mapsUrl],
    knowsAbout: ['Brazilian Jiu-Jitsu', 'Grappling', 'No-Gi grappling', 'Kids martial arts', 'Self-defense'],
    ...(reviewSummary && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: reviewSummary.rating,
        reviewCount: reviewSummary.count,
        bestRating: 5,
      },
    }),
    founder: coaches.filter((c) => c.founder).map((c) => ({ '@type': 'Person', name: c.name })),
    employee: coaches.map((c) => ({ '@type': 'Person', name: c.name, jobTitle: c.jobTitle })),
    memberOf: {
      '@type': 'SportsOrganization',
      name: `${site.affiliation.name} (${site.affiliation.leader})`,
    },
  };
}
