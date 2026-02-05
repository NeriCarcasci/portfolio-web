<script lang="ts">
  import { about } from '$content/about';
</script>

<svelte:head>
  <title>About - {about.name}</title>
  <meta name="description" content={about.bio.slice(0, 160)} />
</svelte:head>

<div class="container-main">
  <header class="mb-12">
    <h1 class="text-3xl font-semibold">About</h1>
  </header>

  <div class="max-w-2xl space-y-10">
    <section>
      <h2 class="text-lg font-semibold text-muted-foreground mb-3">{about.name}</h2>
      <p class="text-xl text-foreground">{about.role}</p>
      <p class="mt-4 leading-relaxed whitespace-pre-line">{about.bio}</p>
    </section>

    <section>
      <h2 class="text-lg font-semibold text-muted-foreground mb-4">Timeline</h2>
      <ul class="space-y-6">
        {#each about.timeline as entry}
          <li class="flex gap-6">
            <span class="text-muted-foreground font-mono w-16 flex-shrink-0">{entry.year}</span>
            <div>
              <p class="font-medium">{entry.title}</p>
              <p class="text-muted-foreground mt-1">{entry.description}</p>
            </div>
          </li>
        {/each}
      </ul>
    </section>

    <section>
      <h2 class="text-lg font-semibold text-muted-foreground mb-4">Skills</h2>
      <ul class="space-y-2">
        {#each about.skills as skill}
          <li class="flex items-center gap-2">
            <span class="text-muted-foreground" aria-hidden="true">-</span>
            <span>{skill}</span>
          </li>
        {/each}
      </ul>
    </section>
  </div>
</div>
