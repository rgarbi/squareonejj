import type { APIRoute } from 'astro';
import { site, formattedAddress, schedule, programs, hours, days, formatTime } from '../data/site';
import { coaches, values } from '../data/coaches';
import { plans, pricingTerms } from '../data/pricing';
import { faqs } from '../data/faq';
import { reviewSummary } from '../data/reviews';
import { areaServed } from '../lib/schema';

// Plain-text summary for AI assistants (https://llmstxt.org). Generated from the same
// data as the site, so it can't drift from the pages (PLAN.md §7).
export const GET: APIRoute = () => {
  const url = (path: string) => new URL(path, site.url).href;

  const scheduleLines = days
    .map((day) => {
      const classes = schedule.filter((c) => c.day === day);
      if (!classes.length) return `- ${day}: no classes`;
      return `- ${day}: ${classes.map((c) => `${programs[c.program].name} ${formatTime(c.start)}–${formatTime(c.end)}`).join('; ')}`;
    })
    .join('\n');

  const hoursLines = days
    .map((day) => {
      const ranges = hours.filter((h) => h.day === day).map((h) => `${formatTime(h.opens)}–${formatTime(h.closes)}`);
      return `- ${day}: ${ranges.length ? ranges.join(', ') : 'Closed'}`;
    })
    .join('\n');

  const body = `# ${site.name}

> ${site.name} is a Brazilian Jiu-Jitsu (BJJ) academy in downtown ${site.address.city}, Missouri, in the Kansas City metro area. Founded in ${site.foundingYear} by Josh Smith (black belt under ${site.headCoach.promotedBy}) and Heidi Smith (purple belt). It is a ${site.affiliation.name} affiliate under ${site.affiliation.leader}. It offers gi and nogi classes for adults (13+) and kids (5–12). The first class is free; memberships are month-to-month with no contract and no enrollment fee.${reviewSummary ? ` Rated ${reviewSummary.rating} out of 5 from ${reviewSummary.count} Google reviews.` : ''}

## Location & contact
- Address: ${formattedAddress}
- Phone: ${site.phone.display}
- Email: ${site.email}
- Google Maps: ${site.mapsUrl}
- Serves: ${areaServed.join(', ')} and the greater Kansas City area

## Programs
- Adult Gi (ages 13+): jiu-jitsu in the traditional uniform. ${url('/programs/adult-bjj')}
- Adult Nogi (ages 13+): grappling in rash guard and shorts. ${url('/programs/adult-bjj')}
- Youth Jiu Jitsu (ages 5–12, gi). ${url('/programs/kids-bjj')}
- Youth Nogi (ages 5–12). ${url('/programs/kids-bjj')}

## Weekly class schedule
${scheduleLines}
Live schedule and booking: ${url('/schedule')}

## Hours (follow the class schedule; no open mat)
${hoursLines}

## Pricing (per month)
${plans.map((p) => `- ${p.name}: $${p.price}`).join('\n')}
${pricingTerms.map((t) => `- ${t}`).join('\n')}
Details: ${url('/pricing')}

## Coaches
${coaches.map((c) => `- ${c.name} — ${c.rank}, ${c.role}. ${c.bio}`).join('\n')}

## Values
${values.map((v) => `- ${v.title}: "${v.quote}" ${v.body}`).join('\n')}

## FAQ
${faqs.map((f) => `### ${f.q}\n${f.a}`).join('\n\n')}

## Key pages
- [Free trial class](${url('/free-trial')})
- [New here? What to expect](${url('/new-here')})
- [Adult jiu jitsu](${url('/programs/adult-bjj')})
- [Kids jiu jitsu](${url('/programs/kids-bjj')})
- [Schedule](${url('/schedule')})
- [Pricing](${url('/pricing')})
- [About & coaches](${url('/about')})
- [Contact & directions](${url('/contact')})
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
