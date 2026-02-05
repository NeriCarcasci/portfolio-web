<script lang="ts">
  import { Button, Tag } from '$components/ui';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  const project = $derived(data.project);
</script>

<svelte:head>
  <title>{project.title} - Projects</title>
  <meta name="description" content={project.summary} />
</svelte:head>

<article class="container-main">
  <header class="mb-12">
    <a href="/projects" class="text-muted-foreground hover:text-foreground text-sm mb-4 inline-block">
      ← Back to Projects
    </a>
    <h1 class="text-3xl font-semibold mt-4">{project.title}</h1>
    <p class="text-lg text-muted-foreground mt-2">{project.summary}</p>
    <div class="flex flex-wrap gap-2 mt-4">
      {#each project.tags as tag}
        <Tag>{tag}</Tag>
      {/each}
    </div>
  </header>

  <div class="space-y-10 max-w-2xl">
    <section>
      <h2 class="text-lg font-semibold text-muted-foreground mb-3">Problem</h2>
      <p class="leading-relaxed">{project.problem}</p>
    </section>

    <section>
      <h2 class="text-lg font-semibold text-muted-foreground mb-3">Approach</h2>
      <p class="leading-relaxed">{project.approach}</p>
    </section>

    <section>
      <h2 class="text-lg font-semibold text-muted-foreground mb-3">Impact</h2>
      <p class="leading-relaxed">{project.impact}</p>
    </section>

    <section>
      <h2 class="text-lg font-semibold text-muted-foreground mb-3">Technologies</h2>
      <div class="flex flex-wrap gap-2">
        {#each project.tech as tech}
          <Tag>{tech}</Tag>
        {/each}
      </div>
    </section>

    {#if project.links && project.links.length > 0}
      <section>
        <h2 class="text-lg font-semibold text-muted-foreground mb-3">Links</h2>
        <div class="flex flex-wrap gap-3">
          {#each project.links as link}
            <Button href={link.url} variant="outline" size="sm">{link.label}</Button>
          {/each}
        </div>
      </section>
    {/if}
  </div>
</article>
