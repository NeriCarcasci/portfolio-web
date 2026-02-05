import { z } from 'zod';

export const PersonSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  role: z.string().optional(),
  url: z.string().url().optional(),
  avatar: z.string().nullable().optional()
});

export const PostSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD format'),
  modified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  tags: z.array(z.string()).default([]),
  cover: z.string().optional(),
  people: z.array(z.string()).default([]),
  type: z.enum(['article', 'note', 'tutorial']).default('article'),
  draft: z.boolean().default(false)
});

export const PeopleFileSchema = z.array(PersonSchema);

export type Person = z.infer<typeof PersonSchema>;
export type PostMeta = z.infer<typeof PostSchema>;
