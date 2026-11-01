import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().max(60),
    description: z.string().max(155),
    platform: z.string(),
    category: z.enum(['İptal ve iade', 'Bütçe ve tasarruf', 'Plan seçimi', 'Abonelik takibi']).default('İptal ve iade'),
    cover: z.enum(['butce', 'yillik', 'ogrenci', 'unutulan']).optional(),
    published: z.coerce.date(),
    updated: z.coerce.date(),
    draft: z.boolean().default(true),
    summary: z.string(),
    sources: z.array(z.object({ title: z.string(), url: z.string().url() })).min(1),
    related: z.array(z.string()).default([]),
  }),
});
export const collections = { blog };
