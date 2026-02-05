<script lang="ts">
  import { Tag } from '$components/ui';
  import { CardContainer, CardBody, CardItem } from '$components/aceternity';
  import { getAllProjects } from '$content/projects';

  const projects = getAllProjects();
</script>

<svelte:head>
  <title>Projects - Portfolio</title>
  <meta name="description" content="Selected projects showcasing work in AI/ML, APIs, and full-stack development." />
</svelte:head>

<div class="container-main">
  <header class="mb-12">
    <h1 class="text-3xl md:text-4xl font-semibold text-white">Projects</h1>
    <p class="text-neutral-400 mt-2">Selected work across AI/ML, APIs, and product development.</p>
  </header>

  <div class="grid gap-6 md:grid-cols-2">
    {#each projects as project}
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
                {#each project.tags as tag}
                  <Tag class="bg-emerald-500/10 text-emerald-400 text-xs">{tag}</Tag>
                {/each}
              </div>
            </CardItem>
            <CardItem translateZ={30} className="mt-4" {isMouseEntered}>
              <span class="text-sm text-emerald-400 group-hover/card:underline">View details &rarr;</span>
            </CardItem>
          </CardBody>
        </CardContainer>
      </a>
    {/each}
  </div>
</div>
