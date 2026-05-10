import { defineCollection, z } from 'astro:content';

const products = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    price: z.string(),
    color: z.string(),
    scent: z.string(),
    desc: z.string(),
  }),
});

const bundles = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    price: z.string(),
    saving: z.string(),
    badge: z.string().nullable(),
    bars: z.array(
      z.object({
        title: z.string(),
        color: z.string(),
        scent: z.string(),
      }),
    ),
  }),
});

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.date(),
    category: z.string(),
    readTime: z.string(),
  }),
});

export const collections = { products, bundles, posts };
