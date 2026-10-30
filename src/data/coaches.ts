/**
 * Coaches. TODO (PLAN.md item 2a): add assistant and youth coaches.
 * Copy is from the prototype, corrected for ranks (Heidi is a purple belt).
 */
export interface Coach {
  name: string;
  role: string;
  /** Omitted for coaches without a BJJ rank (e.g. wrestling). */
  rank?: string;
  bio: string;
  /** Co-founders only; drives the `founder` field in LocalBusiness JSON-LD. */
  founder?: boolean;
  /** For Person JSON-LD. */
  jobTitle: string;
}

export const coaches: Coach[] = [
  {
    name: 'Josh Smith',
    role: 'Owner / Head Coach',
    rank: 'Black belt',
    jobTitle: 'Head Coach',
    founder: true,
    bio: "Josh co-founded Square One Jiu Jitsu Academy in downtown Lee's Summit in 2023 and serves as its head coach. Josh received his black belt from Renato Tavares in 2023 and joined Robert Drysdale's Zenith BJJ team in 2026. He leads the academy's adult program with an emphasis on sound fundamentals, thoughtful instruction and a room where both everyday students and competitors can grow.",
  },
  {
    name: 'Heidi Smith',
    role: 'Co-owner / Youth Program Lead',
    rank: 'Purple belt',
    jobTitle: 'Youth Program Coach',
    founder: true,
    bio: "Heidi co-founded Square One with Josh in 2023. A purple belt, she leads the academy's youth program and builds the welcoming, family-centered culture that Square One brings to adults and kids in Lee's Summit.",
  },
  {
    name: 'Eric Ohler',
    role: 'Coach',
    rank: 'Purple belt',
    jobTitle: 'Jiu-Jitsu Coach',
    bio: 'Coach Eric is an accomplished grappler and purple belt with seven years of jiu-jitsu experience. He helps coach the adult team, both in class and at tournaments.',
  },
  {
    name: 'Bradley Brattin',
    role: 'Wrestling Coach',
    jobTitle: 'Wrestling Coach',
    bio: 'Coach Brad is a longtime wrestler with prior MMA experience who coaches wrestling at the middle and high school levels. At Square One, he helps everyone sharpen their stand-up game.',
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
