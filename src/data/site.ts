/**
 * Single source of truth for business facts (NAP, hours, socials, schedule).
 * The footer, contact page, JSON-LD and llms.txt all render from this file.
 * Keep it in sync with the Google Business Profile — see PLAN.md §1.1.
 */

export const site = {
  name: 'Square One Jiu Jitsu Academy',
  shortName: 'Square One Jiu Jitsu',
  legalName: 'Square One Jiu Jitsu Academy, LLC',
  url: 'https://squareonejj.com',
  tagline:
    "Dedicated Jiu-Jitsu instruction focused on grappling for adults and youth in Lee's Summit, Missouri.",
  foundingYear: 2023,
  affiliation: {
    name: 'Zenith BJJ',
    leader: 'Robert Drysdale',
  },
  // Black belt from Renato Tavares (2023); joined Robert Drysdale / Zenith BJJ (2026).
  headCoach: { name: 'Josh Smith', rank: 'Black belt', promotedBy: 'Renato Tavares', blackBeltYear: 2023, zenithYear: 2026 },

  phone: {
    display: '(816) 287-0492',
    e164: '+18162870492',
  },
  email: 'contact@squareonejj.com',

  // Matches the Google Business Profile ("2 SW 4th St Ste d") — keep in sync.
  address: {
    street: '2 SW 4th St, Ste D',
    city: "Lee's Summit",
    region: 'MO',
    postalCode: '64063',
    country: 'US',
  },
  geo: { latitude: 38.9103924, longitude: -94.3773143 },
  mapsUrl: 'https://maps.app.goo.gl/zTGz4gndt5DXWKRH6',

  socials: {
    instagram: 'https://www.instagram.com/squareonejj/',
    facebook: 'https://www.facebook.com/squareonejj/',
    youtube: 'https://www.youtube.com/@squareonejj',
  },
} as const;

export const formattedAddress = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;

export type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export type Program = 'adult-gi' | 'adult-nogi' | 'youth-gi' | 'youth-nogi';

export const programs: Record<Program, { name: string; audience: 'Adult' | 'Youth'; style: 'Gi' | 'No-Gi' }> = {
  'adult-gi': { name: 'Adult Gi', audience: 'Adult', style: 'Gi' },
  'adult-nogi': { name: 'Adult No-Gi', audience: 'Adult', style: 'No-Gi' },
  'youth-gi': { name: 'Youth Jiu Jitsu', audience: 'Youth', style: 'Gi' },
  'youth-nogi': { name: 'Youth No-Gi', audience: 'Youth', style: 'No-Gi' },
};

/** 24h "HH:MM" times. Static fallback for the Gymdesk schedule widget. */
export const schedule: { day: Day; program: Program; start: string; end: string }[] = [
  { day: 'Monday', program: 'adult-gi', start: '06:00', end: '07:30' },
  { day: 'Monday', program: 'youth-gi', start: '17:30', end: '18:30' },
  { day: 'Monday', program: 'adult-nogi', start: '19:00', end: '20:30' },
  { day: 'Tuesday', program: 'youth-gi', start: '17:30', end: '18:30' },
  { day: 'Tuesday', program: 'adult-gi', start: '19:00', end: '20:30' },
  { day: 'Wednesday', program: 'adult-gi', start: '06:00', end: '07:30' },
  { day: 'Wednesday', program: 'adult-nogi', start: '19:00', end: '20:30' },
  { day: 'Thursday', program: 'youth-nogi', start: '17:30', end: '18:30' },
  { day: 'Thursday', program: 'adult-gi', start: '19:00', end: '20:30' },
  { day: 'Friday', program: 'adult-nogi', start: '06:00', end: '07:30' },
];

/** Opening hours follow the class schedule (no open mat). Must match the GBP. */
export const hours: { day: Day; opens: string; closes: string }[] = [
  { day: 'Monday', opens: '06:00', closes: '07:30' },
  { day: 'Monday', opens: '17:30', closes: '20:30' },
  { day: 'Tuesday', opens: '17:30', closes: '20:30' },
  { day: 'Wednesday', opens: '06:00', closes: '07:30' },
  { day: 'Wednesday', opens: '19:00', closes: '20:30' },
  { day: 'Thursday', opens: '17:30', closes: '20:30' },
  { day: 'Friday', opens: '06:00', closes: '07:30' },
];

export const days: Day[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/** "17:30" -> "5:30 PM" */
export function formatTime(t: string): string {
  const [h, m] = t.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${suffix}`;
}
