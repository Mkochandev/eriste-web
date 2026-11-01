import { getCollection } from 'astro:content';

export async function publishedPosts() {
  return (await getCollection('blog', ({ data }) => !data.draft && data.published <= new Date()))
    .sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf() || a.id.localeCompare(b.id, 'tr'));
}
export const formatDate = (date: Date) => date.toLocaleDateString('tr-TR', { timeZone: 'Europe/Istanbul', day: 'numeric', month: 'long', year: 'numeric' });
export const jsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');
