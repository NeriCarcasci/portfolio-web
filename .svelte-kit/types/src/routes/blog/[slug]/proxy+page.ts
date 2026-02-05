// @ts-nocheck
import { error } from '@sveltejs/kit';
import { getPostBySlug } from '$lib/blog';
import type { PageLoad } from './$types';

export const load = ({ params }: Parameters<PageLoad>[0]) => {
  const post = getPostBySlug(params.slug);

  if (!post) {
    throw error(404, 'Post not found');
  }

  return { post };
};
