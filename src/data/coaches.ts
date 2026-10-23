/**
 * Coaches. TODO (PLAN.md item 2a): add assistant and youth coaches.
 * Copy is from the prototype, corrected for ranks (Heidi is a purple belt).
 */
export interface Coach {
  name: string;
  role: string;
  rank: string;
  bio: string;
  /** For Person JSON-LD. */
  jobTitle: string;
}

export const coaches: Coach[] = [
  {
    name: 'Josh Smith',
    role: 'Owner / Head Coach',
    rank: 'Black belt',
    jobTitle: 'Head Coach',
    bio: "Josh co-founded Square One Jiu Jitsu Academy in downtown Lee's Summit in 2023 and serves as its head coach. Josh received his black belt from Renato Tavares in 2023 and joined Robert Drysdale's Zenith BJJ team in 2026. He leads the academy's adult program with an emphasis on sound fundamentals, thoughtful instruction and a room where both everyday students and competitors can grow.",
  },
  {
    name: 'Heidi Smith',
    role: 'Co-owner / Youth Program Lead',
    rank: 'Purple belt',
    jobTitle: 'Youth Program Coach',
    bio: "Heidi co-founded Square One with Josh in 2023. A purple belt, she leads the academy's youth program and builds the welcoming, family-centered culture that Square One brings to adults and kids in Lee's Summit.",
  },
];

/** Values, in team voice. Prototype quotes removed until Josh confirms them (owner-questions #5). */
export const values = [
  {
    title: 'Every kind of student belongs',
    body: "Whether you want to compete or just train a few nights a week, there's a place for you here.",
  },
  {
    title: 'Train the right way from day one',
    body: 'We teach the details early so good habits come first.',
  },
  {
    title: 'Nobody does it alone',
    body: 'Training partners, families and coaches build this academy together.',
  },
];
