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

export const collections = {
  blog: blogCollection,
  lists: listsCollection,
  til: tilCollection,
};
