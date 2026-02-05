import { error } from "@sveltejs/kit";
import { d as getPostBySlug } from "../../../../chunks/posts.js";
const load = ({ params }) => {
  const post = getPostBySlug(params.slug);
  if (!post) {
    throw error(404, "Post not found");
  }
  return { post };
};
export {
  load
};
