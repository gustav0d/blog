import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { rssSchema } from '@astrojs/rss';

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object(rssSchema.shape).extend({
    title: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]).optional(),
    draft: z.boolean().optional(),
    isFeatured: z.boolean().optional().default(false),
    slug: z.string(),
  }),
});

const listsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/lists' }),
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

const tilCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/til' }),
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()).default([]).optional(),
    createdAt: z.coerce.date(),
    slug: z.string(),
  }),
});

/** A plain line, or one that ends in a list of links. */
const bullet = z.union([
  z.string(),
  z.object({
    text: z.string(),
    links: z.array(z.object({ label: z.string(), href: z.url() })).min(1),
  }),
]);

/** Mirrors the LinkedIn export: one entry per role, in its order, with its prose. */
const cvCollection = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/cv' }),
  schema: z.object({
    person: z.object({
      name: z.string(),
      headline: z.string(),
      location: z.string(),
      email: z.email(),
      linkedin: z.string(),
      github: z.string(),
    }),
    available: z.boolean(),
    experience: z.array(
      z.object({
        company: z.string(),
        location: z.string().optional(),
        title: z.string(),
        dates: z.string(),
        bullets: z.array(bullet),
      }),
    ),
    skills: z.array(z.string()).min(1),
    languages: z.array(z.object({ name: z.string(), level: z.string() })),
    certifications: z.array(
      z.object({ text: z.string(), href: z.url().optional() }),
    ),
    education: z.array(
      z.object({
        institution: z.string(),
        degree: z.string(),
        field: z.string(),
        dates: z.string(),
      }),
    ),
  }),
});

export const collections = {
  blog: blogCollection,
  lists: listsCollection,
  til: tilCollection,
  cv: cvCollection,
};
