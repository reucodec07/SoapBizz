import { getCollection } from 'astro:content';

export interface Product {
  id: string;
  title: string;
  price: string;
  color: string;
  scent: string;
  desc: string;
}

export interface BundleBar {
  title: string;
  color: string;
  scent: string;
}

export interface Bundle {
  id: string;
  name: string;
  tagline: string;
  price: string;
  saving: string;
  badge: string | null;
  bars: BundleBar[];
}

export async function getAllProducts(): Promise<Product[]> {
  const entries = await getCollection('products');
  return entries
    .map((entry) => ({ id: entry.id, ...entry.data }))
    .sort((a, b) => a.title.localeCompare(b.title));
}

export async function getAllBundles(): Promise<Bundle[]> {
  const entries = await getCollection('bundles');
  return entries.map((entry) => ({ id: entry.id, ...entry.data }));
}

export async function getAllPosts() {
  const entries = await getCollection('posts');
  return entries
    .map((entry) => ({
      ...entry,
      slug: entry.id.replace(/\.md$/, ''),
    }))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function formatDisplayDate(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}
