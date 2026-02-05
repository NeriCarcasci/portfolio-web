// @ts-nocheck
import { error } from '@sveltejs/kit';
import { getProject } from '$content/projects';
import type { PageLoad } from './$types';

export const load = ({ params }: Parameters<PageLoad>[0]) => {
  const project = getProject(params.slug);

  if (!project) {
    throw error(404, 'Project not found');
  }

  return { project };
};
