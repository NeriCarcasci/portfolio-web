<script lang="ts">
  import '../app.css';
  import { page } from '$app/stores';
  import { DecryptingGutterBackground } from '$components/aceternity';
  import { about } from '$content/about';
  import { IconTerminal2 } from '@tabler/icons-svelte';

  let { children } = $props();

  const navItems = [
    { href: '/projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' }
  ];

  const headerLinks = [
    { href: about.cvUrl, label: 'CV', internal: true },
    { href: about.linkedin, label: 'LinkedIn' },
    { href: about.github, label: 'GitHub' }
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

          <!-- Header Links -->
          <div class="hidden sm:flex items-center gap-4">
            {#each headerLinks as link}
              <a
                href={link.href}
                class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                target={link.internal ? undefined : '_blank'}
                rel={link.internal ? undefined : 'noopener'}
              >
                {link.label}
              </a>
            {/each}
          </div>

          <div class="hidden sm:block w-8 md:w-12 lg:w-16"></div>

          <!-- Terminal Button -->
          <a
            href="/terminal"
            class={`inline-flex items-center justify-center h-9 w-9 rounded-md border transition-colors ${
              $page.url.pathname === '/terminal'
                ? 'border-primary text-primary'
                : 'border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground hover:bg-accent/30'
            }`}
            title="Launch terminal"
            aria-label="Launch terminal"
          >
            <IconTerminal2 class="h-4 w-4" />
          </a>
        </div>
      </nav>
    </header>
  {/if}

  <main class="flex-1 relative z-10">
    {@render children()}
  </main>

</div>
