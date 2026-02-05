<script lang="ts">
  import { Button, Tag } from '$components/ui';
  import {
    CardContainer,
    CardBody,
    CardItem,
    BentoGrid,
    BentoGridItem
  } from '$components/aceternity';
  import { about } from '$content/about';
  import { getFeaturedProjects } from '$content/projects';
  import { getFeaturedPosts } from '$lib/blog';

  const featuredProjects = getFeaturedProjects();
  const latestPosts = getFeaturedPosts(3);

  function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
</script>

<svelte:head>
  <title>{about.name} - {about.role}</title>
  <meta name="description" content={about.summary} />
  <link rel="canonical" href="/" />
  {@html `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: about.name,
    jobTitle: about.role,
    description: about.summary,
    url: '/',
    sameAs: [about.github, about.linkedin]
  })}</script>`}
</svelte:head>

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
              <CardItem
                translateZ={40}
                className="text-sm text-neutral-400 mt-2 max-w-sm"
                {isMouseEntered}
              >
                {project.summary}
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
