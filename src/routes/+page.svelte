<script lang="ts">
  import { Button, Tag } from '$components/ui';
  import {
    CardContainer,
    CardBody,
    CardItem,
    BentoGrid,
    BentoGridItem
  } from '$components/aceternity';
  import SeoHead from '$components/SeoHead.svelte';
  import { about } from '$content/about';
  import { getFeaturedProjects } from '$content/projects';
  import { getFeaturedPosts } from '$lib/blog';

  const featuredProjects = getFeaturedProjects();
  const latestPosts = getFeaturedPosts(3);
  const SUMMARY_MAX = 150;
  const IMAGE_EXTS = ['.webp', '.png', '.jpg', '.jpeg', '.gif'];
  const VIDEO_EXTS = ['.mp4', '.webm', '.mov'];
  const pageKeywords = about.skills.flatMap((skill) =>
    skill.split(',').map((part) => part.trim()).filter(Boolean)
  );

  function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  function truncateSummary(text: string): string {
    if (text.length <= SUMMARY_MAX) return text;
    return `${text.slice(0, SUMMARY_MAX).trimEnd()}...`;
  }

  function pickMedia(project: (typeof featuredProjects)[number]) {
    const assets = project.assets ?? [];
    const image =
      project.previewImageUrl ||
      assets.find((asset) => IMAGE_EXTS.some((ext) => asset.toLowerCase().endsWith(ext)));
    const video =
      project.previewVideoUrl ||
      assets.find((asset) => VIDEO_EXTS.some((ext) => asset.toLowerCase().endsWith(ext)));
    return { image, video };
  }
</script>

<SeoHead
  title={`${about.name} - ${about.role}`}
  description={about.summary}
  canonical="/"
  keywords={pageKeywords}
/>

<div class="container-main space-y-24">
  <!-- Hero spacer - actual hero content is rendered in the background canvas -->
  <div class="h-[70vh]" aria-hidden="true"></div>

  <!-- Featured Projects with 3D Card Effect -->
  <section class="space-y-8">
    <header class="space-y-2">
      <h2 class="text-2xl md:text-3xl font-semibold text-white">Featured Projects</h2>
      <p class="text-neutral-400">Selected work in ML systems, APIs, and product development.</p>
    </header>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {#each featuredProjects as project}
        {@const media = pickMedia(project)}
        <a href={`/projects/${project.slug}`} class="block">
          <CardContainer containerClassName="py-4" let:isMouseEntered>
            <CardBody className="relative group/card bg-black border border-white/[0.2] rounded-xl p-6 h-auto w-full">
              <CardItem
                translateZ={50}
                className="text-xs uppercase tracking-widest text-emerald-400 font-medium"
                {isMouseEntered}
              >
                {project.tags[0]}
              </CardItem>
              <CardItem
                translateZ={60}
                className="text-xl font-bold mt-3 text-neutral-200"
                {isMouseEntered}
              >
                {project.title}
              </CardItem>
              <CardItem translateZ={55} className="mt-3" {isMouseEntered}>
                <div class="w-full overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]">
                  {#if media.video}
                    <video
                      src={media.video}
                      class="h-32 w-full object-cover md:h-36"
                      muted
                      autoplay
                      loop
                      playsinline
                      preload="metadata"
                    ></video>
                  {:else if media.image}
                    <img
                      src={media.image}
                      alt=""
                      class="h-32 w-full object-cover md:h-36"
                      loading="lazy"
                    />
                  {:else}
                    <div class="h-32 w-full md:h-36"></div>
                  {/if}
                </div>
              </CardItem>
              <CardItem
                translateZ={40}
                className="text-sm text-neutral-400 mt-3 max-w-sm min-h-[3.75rem]"
                {isMouseEntered}
              >
                {truncateSummary(project.summary)}
              </CardItem>
              <CardItem translateZ={20} className="mt-4 w-full" {isMouseEntered}>
                <div class="flex flex-wrap gap-2">
                  {#each project.tags.slice(0, 3) as tag}
                    <Tag class="bg-emerald-500/10 text-emerald-400 text-xs">{tag}</Tag>
                  {/each}
                </div>
              </CardItem>
              <CardItem translateZ={30} className="mt-4" {isMouseEntered}>
                <span class="text-sm text-emerald-400 group-hover/card:underline">View project &rarr;</span>
              </CardItem>
            </CardBody>
          </CardContainer>
        </a>
      {/each}
    </div>
  </section>

  <!-- Latest Writing with Bento Grid -->
  <section class="space-y-8">
    <header class="flex items-center justify-between">
      <div class="space-y-2">
        <h2 class="text-2xl md:text-3xl font-semibold text-white">Latest Writing</h2>
        <p class="text-neutral-400">Thoughts on engineering, ML, and building products.</p>
      </div>
      <Button href="/blog" variant="outline" size="sm">View all posts</Button>
    </header>

    <BentoGrid className="md:auto-rows-[16rem]">
      {#each latestPosts as post, index}
        <BentoGridItem
          href={`/blog/${post.slug}`}
          title={post.title}
          description={post.description}
          className={index === 0 ? 'md:col-span-2' : ''}
        >
          {#snippet header()}
            <div class="flex items-center gap-3 text-xs text-neutral-400">
              <time datetime={post.date}>{formatDate(post.date)}</time>
              <span>·</span>
              <span>{post.readingTime} min read</span>
            </div>
          {/snippet}
          <div class="flex flex-wrap gap-2 mt-3">
            {#each post.tags.slice(0, 2) as tag}
              <Tag class="bg-emerald-500/10 text-emerald-400 text-xs">{tag}</Tag>
            {/each}
          </div>
        </BentoGridItem>
      {/each}
    </BentoGrid>
  </section>
</div>
