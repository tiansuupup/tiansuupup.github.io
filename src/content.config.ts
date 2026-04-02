import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    tags:        z.array(z.string()),   // e.g. ["Unity", "C#", "3D"]
    cover:       z.string().optional(), // /images/projects/foo.jpg
    date:        z.string(),            // "2024-03" (YYYY-MM)
    github:      z.string().url().optional(),
    demo:        z.string().url().optional(),
    featured:    z.boolean().default(false),
  }),
});

export const collections = { projects };
