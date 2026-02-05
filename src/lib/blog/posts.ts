import { posts as allPostsRaw, type BlogPost } from '$lib/generated/posts';

export type { BlogPost };

// Filter out drafts at runtime (drafts should never appear in production)
const publishedPosts = allPostsRaw.filter((p) => !p.draft);

export function getAllPosts(): BlogPost[] {
  return publishedPosts;
}

export function getFeaturedPosts(limit = 3): BlogPost[] {
  return publishedPosts.slice(0, limit);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  // Only return published posts
  return publishedPosts.find((p) => p.slug === slug);
}

export function getPostsByTag(tag: string): BlogPost[] {
  return publishedPosts.filter((p) => p.tags.includes(tag));
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  for (const post of publishedPosts) {
    for (const tag of post.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet).sort();
}

export function searchPosts(query: string): BlogPost[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const tokens = q.split(/\s+/).filter((t) => t.length > 2);
  if (tokens.length === 0) return [];

  return publishedPosts
    .map((post) => {
      const searchText = [
        post.title,
        post.description,
        ...post.tags
      ].join(' ').toLowerCase();

      let score = 0;
      for (const token of tokens) {
        if (searchText.includes(token)) {
          score += 1;
          // Boost for title matches
          if (post.title.toLowerCase().includes(token)) {
            score += 2;
          }
        }
      }
      return { post, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.post);
}

export function getAdjacentPosts(slug: string): { prev: BlogPost | null; next: BlogPost | null } {
  const index = publishedPosts.findIndex((p) => p.slug === slug);
  if (index === -1) {
    return { prev: null, next: null };
  }
  return {
    // Posts are sorted newest first, so "next" is older (higher index)
    next: index < publishedPosts.length - 1 ? publishedPosts[index + 1] : null,
    // "prev" is newer (lower index)
    prev: index > 0 ? publishedPosts[index - 1] : null
  };
}
