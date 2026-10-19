import type { APIRoute } from 'astro';
import { isProduction } from '../lib/env';

// Explicitly welcome search and AI crawlers in production (PLAN.md §7).
const aiAndSearchBots = [
  'Googlebot',
  'Bingbot',
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'PerplexityBot',
  'Google-Extended',
  'Applebot',
];

export const GET: APIRoute = ({ site }) => {
  const body = isProduction
    ? [
        ...aiAndSearchBots.flatMap((bot) => [`User-agent: ${bot}`, 'Allow: /', '']),
        'User-agent: *',
        'Allow: /',
        '',
        `Sitemap: ${new URL('sitemap-index.xml', site).href}`,
      ].join('\n')
    : ['# Staging: do not index', 'User-agent: *', 'Disallow: /'].join('\n');

  return new Response(body + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
