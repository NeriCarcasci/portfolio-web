import { projects as allProjectsRaw, type Project } from '$generated/projects';

export type { Project };

const publishedProjects = allProjectsRaw.filter((p) => !p.draft);

export function getProject(slug: string): Project | undefined {
  return publishedProjects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return publishedProjects.filter((p) => p.featured);
}

export function getAllProjects(): Project[] {
  return publishedProjects;
}
