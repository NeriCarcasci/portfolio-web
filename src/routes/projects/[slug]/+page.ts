import { error } from '@sveltejs/kit';
import { getProject } from '$content/projects';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  const project = getProject(params.slug);

  if (!project) {
    throw error(404, 'Project not found');
  }

  return { project };
};
