import { error } from "@sveltejs/kit";
import { b as getProject } from "../../../../chunks/projects.js";
const load = ({ params }) => {
  const project = getProject(params.slug);
  if (!project) {
    throw error(404, "Project not found");
  }
  return { project };
};
export {
  load
};
