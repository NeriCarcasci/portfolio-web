<script lang="ts">
  import { Button } from '$components/ui';
  import { about } from '$content/about';
</script>

<svelte:head>
  <title>Contact - {about.name}</title>
  <meta name="description" content="Get in touch via email or connect on GitHub and LinkedIn." />
</svelte:head>

<div class="container-main">
  <header class="mb-12">
    <h1 class="text-3xl font-semibold">Contact</h1>
    <p class="text-muted-foreground mt-2">Reach out for collaboration, opportunities, or questions.</p>
  </header>

  <div class="max-w-md space-y-8">
    <section>
      <h2 class="text-lg font-semibold text-muted-foreground mb-4">Email</h2>
      <a href="mailto:{about.email}" class="text-xl link">{about.email}</a>
    </section>

    <section>
      <h2 class="text-lg font-semibold text-muted-foreground mb-4">Links</h2>
      <div class="flex flex-col gap-3">
        <Button href={about.github} variant="outline" class="justify-start">
          GitHub
        </Button>
        <Button href={about.linkedin} variant="outline" class="justify-start">
          LinkedIn
        </Button>
        <Button href={about.cvUrl} variant="outline" class="justify-start">
          Download CV
        </Button>
      </div>
    </section>
  </div>
</div>
