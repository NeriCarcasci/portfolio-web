<script lang="ts">
  import '../app.css';
  import { page } from '$app/stores';
  import { Button } from '$components/ui';
  import { DecryptingGutterBackground } from '$components/aceternity';
  import { about } from '$content/about';

  let { children } = $props();

  const navItems = [
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' }
  ];

  const socialLinks = [
    {
      href: about.github,
      label: 'GitHub',
      svg: `<svg viewBox="0 0 24 24" aria-hidden="true" class="h-5 w-5"><path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .08 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.6 9.6 0 0 1 12 6.8c.85 0 1.71.12 2.5.35 1.9-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.32.68.95.68 1.92v2.84c0 .26.18.58.69.48A10 10 0 0 0 12 2z"/></svg>`
    },
    {
      href: about.linkedin,
      label: 'LinkedIn',
      svg: `<svg viewBox="0 0 24 24" aria-hidden="true" class="h-5 w-5"><path fill="currentColor" d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.66-1.86 3.42-1.86 3.66 0 4.33 2.41 4.33 5.54v6.21zM5.34 7.43A2.06 2.06 0 1 1 5.34 3.3a2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z"/></svg>`
    }
  ];

  let isTerminalPage = $derived($page.url.pathname === '/terminal');
  let isHomePage = $derived($page.url.pathname === '/');
  let isBlogPost = $derived(
    $page.url.pathname.startsWith('/blog/') && $page.url.pathname !== '/blog'
  );
  let isProjectDetail = $derived(
    $page.url.pathname.startsWith('/projects/') && $page.url.pathname !== '/projects'
  );
  let maskCenterColumn = $derived(isBlogPost || isProjectDetail);
</script>

<!-- Global decrypting background -->
<DecryptingGutterBackground showHero={isHomePage} maskCenterColumn={maskCenterColumn} />

<div class="relative min-h-screen flex flex-col z-0">
  {#if !isTerminalPage}
    <header
      class={`sticky top-0 z-50 border-b border-border/30 ${
        maskCenterColumn ? 'bg-background' : 'bg-background/95'
      } backdrop-blur-md`}
    >
      <nav class="container-main py-4 flex items-center justify-between" aria-label="Primary">
        <!-- Logo/Name -->
        <a href="/" class="font-semibold text-lg tracking-tight hover:text-primary transition-colors">
          {about.name}
        </a>

        <!-- Center Navigation -->
        <ul class="hidden md:flex items-center gap-8">
          {#each navItems as item}
            <li>
              <a
                href={item.href}
                class={`text-sm font-medium transition-colors ${
                  $page.url.pathname === item.href
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
              </a>
            </li>
          {/each}
        </ul>

        <!-- Right side actions -->
        <div class="flex items-center gap-3">
          <!-- Mobile menu button for nav -->
          <button class="md:hidden p-2 hover:bg-accent rounded-md transition-colors">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <!-- CV Button -->
          <Button href={about.cvUrl} size="sm" class="hidden sm:inline-flex">CV</Button>

          <!-- Terminal Button -->
          <a
            href="/terminal"
            class={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all border ${
              $page.url.pathname === '/terminal'
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground hover:bg-accent/50'
            }`}
            title="Launch terminal"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3 8-8M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="hidden sm:inline">Terminal</span>
          </a>

          <!-- Social Links -->
          {#each socialLinks as link}
            <a
              href={link.href}
              target="_blank"
              rel="noopener"
              aria-label={link.label}
              class="h-9 w-9 inline-flex items-center justify-center rounded-md border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-accent/30 transition-all"
            >
              {@html link.svg}
              <span class="sr-only">{link.label}</span>
            </a>
          {/each}
        </div>
      </nav>
    </header>
  {/if}

  <main class="flex-1 relative z-10">
    {@render children()}
  </main>

  {#if !isTerminalPage}
    <footer class="border-t border-border/50 relative z-10">
      <div class="container-main py-6 text-center text-sm text-muted-foreground">
        <p>Built with SvelteKit. Source on GitHub.</p>
      </div>
    </footer>
  {/if}
</div>
