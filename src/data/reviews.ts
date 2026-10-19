/**
 * Hand-picked Google reviews (PLAN.md item 10): first name + last initial, no widget JS.
 * Refresh quarterly from the Google Business Profile.
 * TODO: add more reviews and set the real GBP rating + count below.
 */
export interface Review {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** ISO month, e.g. 2026-09 */
  date: string;
  text: string;
}

export const googleReviewsUrl = 'https://maps.app.goo.gl/zTGz4gndt5DXWKRH6';

/** Real totals from the GBP (as of 2026-10-19). Update when refreshing reviews. */
export const reviewSummary: { rating: number; count: number; asOf: string } | null = { rating: 4.9, count: 79, asOf: '2026-10-19' };

export const reviews: Review[] = [
  {
    author: 'Bradley B.',
    rating: 5,
    date: '2026-09',
    text: "This gym is absolutely incredible. Walking into a Jiu-Jitsu academy for the first time can be intimidating, but the culture at Square 1 is completely welcoming and ego-free. Professor Josh is highly knowledgeable, incredibly patient, and prioritizes student safety above everything else. Everyone on the mats—from white belts up—looks out for one another. Whether you want to compete or find a great hobby, this is the place to train.",
  },
  {
    author: 'Lance T.',
    rating: 5,
    date: '2026-09',
    text: 'Excellent atmosphere, a wealth of knowledge and support from people who want to see you succeed.',
  },
  {
    author: 'N. M.',
    rating: 5,
    date: '2026-09',
    text: 'Great gym with a welcoming atmosphere. Everyone is friendly and helpful!',
  },
];
