import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    alias: {
      '@': 'src/lib',
      $components: 'src/lib/components',
      $content: 'src/lib/content',
      $terminal: 'src/lib/terminal',
      $blog: 'src/lib/blog',
      $generated: 'src/lib/generated'
    }
  }
};

export default config;
