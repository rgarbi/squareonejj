/**
 * FAQ — mirrors docs/faq-draft.md. Answers are DRAFT until Josh & Heidi approve.
 * Only entries with an answer render. `audience` lets program pages show a subset.
 */
export interface Faq {
  q: string;
  a: string;
  status: 'draft' | 'approved';
  audience: ('general' | 'adult' | 'kids')[];
}

export const faqs: Faq[] = [
  {
    q: 'What should I wear to my first class?',
    a: "Comfortable athletic clothes you can move in — a fitted t-shirt or rash guard and shorts or athletic pants without zippers or pockets. Remove jewelry and trim your nails. Bring a water bottle and sandals for walking off the mat. Let us know when you schedule your free class and we'll tell you what to expect.",
    status: 'draft',
    audience: ['general', 'adult', 'kids'],
  },
  {
    q: 'What ages do you teach?',
    a: 'Our youth classes (Youth Jiu Jitsu and Youth Nogi) are for kids ages 5 to 12. Students 13 and older train in our adult classes (Adult Gi and Adult Nogi). The minimum age is 5.',
    status: 'draft',
    audience: ['general', 'kids'],
  },
  {
    q: "I've never trained and I'm not in shape. Can I still join?",
    a: 'Yes. Most of our students started with no experience. Every class welcomes beginners, and our coaches teach fundamentals from day one. You get in shape by training — you don\'t need to be in shape to start.',
    status: 'draft',
    audience: ['general', 'adult'],
  },
  {
    q: 'Do I have to sign a contract?',
    a: 'No. Memberships are month-to-month with no long-term contract and no enrollment fee. Your first class is free.',
    status: 'draft',
    audience: ['general', 'adult', 'kids'],
  },
  {
    q: 'Do you have an open mat?',
    a: 'Not currently. All training happens in our scheduled classes, Monday through Friday.',
    status: 'draft',
    audience: ['general', 'adult'],
  },
  {
    q: 'Are women welcome?',
    a: 'Absolutely. Women train at Square One and are part of our coaching team.',
    status: 'draft',
    audience: ['general', 'adult'],
  },
  {
    q: "What's the difference between gi and nogi?",
    a: 'Gi classes train in the traditional jiu-jitsu uniform (kimono), where grips on the collar and sleeves shape the game. Nogi classes train in athletic clothing — rash guard and shorts — with a faster, grip-light style. Both teach the same core grappling, and many students train both.',
    status: 'draft',
    audience: ['general', 'adult', 'kids'],
  },
];

export const faqsFor = (audience: Faq['audience'][number]) => faqs.filter((f) => f.audience.includes(audience));
