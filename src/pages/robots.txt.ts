import type { APIRoute } from 'astro';
import { site } from '@/config/site';

const bots = ['GPTBot', 'ChatGPT-User', 'OAI-SearchBot', 'ClaudeBot', 'Claude-User', 'PerplexityBot', 'Google-Extended', 'Googlebot', 'Bingbot'];

export const GET: APIRoute = () =>
  new Response(
    [...bots.map((b) => `User-agent: ${b}\nAllow: /\n`), 'User-agent: *\nAllow: /\n', `Sitemap: ${site.url}/sitemap.xml`, ''].join('\n'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
