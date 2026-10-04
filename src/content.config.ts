// Defines the shape of every content file editors can change. If a file is
// missing a field or has a typo in it, `npm run build` fails and says which
// file and field is wrong, so mistakes never reach the live site.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const url = z.string().url();
const order = z.number();

const site = defineCollection({
  loader: glob({ pattern: 'site.yaml', base: './src/content/site' }),
  schema: z.object({
    title: z.string(),
    eventDate: z.coerce.date(),
    description: z.string(),
    keywords: z.string(),
    author: z.string(),
    contactEmail: z.string().email(),
    facebookPageUrl: url,
    footer: z.object({ roundTableUrl: url, facebookUrl: url, instagramUrl: url }),
  }),
});

const sections = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/sections' }),
  schema: z.object({
    title: z.string(),
    icon: z.string(),
    inNav: z.boolean(),
    youtubeId: z.string().optional(),
  }),
});

const vendors = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/vendors' }),
  schema: z.object({
    name: z.string(),
    type: z.string(),
    order,
    logo: z.string().optional(),
    link: url.optional(),
    linkLabel: z.string().optional(),
  }).refine((v) => !v.link || v.linkLabel, { message: 'linkLabel is needed when link is set', path: ['linkLabel'] }),
});

const entertainment = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/entertainment' }),
  schema: z.object({
    name: z.string(),
    subtitle: z.string(),
    icon: z.string().regex(/^[a-z0-9-]+$/, 'use a Font Awesome icon name such as "guitar"'),
    order,
  }),
});

const timeline = defineCollection({
  loader: glob({ pattern: 'timeline.yaml', base: './src/content/timeline' }),
  schema: z.object({
    entries: z.array(
      z.object({
        time: z.string().regex(/^\d{1,2}:\d{2}$/, 'times look like 17:30'),
        text: z.string(),
      }),
    ),
  }),
});

const tickets = defineCollection({
  loader: glob({ pattern: 'tickets.yaml', base: './src/content/tickets' }),
  schema: z
    .object({
      ticketTailorUrl: url,
      note: z.string(),
      tiers: z.array(z.object({ name: z.string(), until: z.string() })).min(1),
      tickets: z.array(
        z.object({
          name: z.string(),
          prices: z.array(z.string().regex(/^\d+(\.\d{2})?$/, 'prices look like 8.00 (no £ sign)')),
        }),
      ),
    })
    .superRefine((t, ctx) => {
      t.tickets.forEach((ticket, i) => {
        if (ticket.prices.length !== t.tiers.length) {
          ctx.addIssue({
            code: 'custom',
            path: ['tickets', i, 'prices'],
            message: `"${ticket.name}" has ${ticket.prices.length} prices but there are ${t.tiers.length} pricing periods`,
          });
        }
      });
    }),
});

const faqs = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/faqs' }),
  schema: z.object({ question: z.string(), order }),
});

const zone = z.object({ name: z.string(), description: z.string() });
// One entry per place drawn on the map. The ids are fixed by the map drawing.
export const mapZoneIds = [
  'birdies', 'food-north', 'first-aid', 'info', 'novelties', 'toilets', 'bar',
  'fire-performers', 'taiko', 'band', 'food-south', 'bonfire', 'fireworks',
  'main-entrance', 'bear-lane',
] as const;

const map = defineCollection({
  loader: glob({ pattern: 'map.yaml', base: './src/content/map' }),
  schema: z.object({
    zones: z.object(Object.fromEntries(mapZoneIds.map((id) => [id, zone])) as Record<(typeof mapZoneIds)[number], typeof zone>).strict(),
    keyTimings: z.array(z.string()),
    goodToKnow: z.array(z.string()),
  }),
});

const sponsorTiers = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/sponsor-tiers' }),
  schema: z.object({
    title: z.string(),
    order,
    columns: z.union([z.literal(1), z.literal(2), z.literal(3)]),
    showInvitation: z.boolean(),
    invitationTitle: z.string(),
  }),
});

const sponsors = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/sponsors' }),
  schema: z.object({
    name: z.string(),
    tier: z.string(),
    order,
    logo: z.string().optional(),
    link: url,
  }),
});

export const collections = { site, sections, vendors, entertainment, timeline, tickets, faqs, map, sponsorTiers, sponsors };
