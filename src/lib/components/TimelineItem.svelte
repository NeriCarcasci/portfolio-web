<script lang="ts">
  export let title: string;
  export let date: string;
  export let logo: string | undefined = undefined;
  export let highlight: boolean = false;

  let className = '';
  export { className as class };
</script>

<li class="mb-10 ms-6 {className}">
  <span class="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full {highlight ? 'bg-emerald-500 ring-8 ring-emerald-500/20' : 'bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-900'}">
    <svg class="h-2.5 w-2.5 {highlight ? 'text-white' : 'text-gray-500 dark:text-gray-400'}" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
    </svg>
  </span>
  <div class="flex flex-col md:flex-row gap-4 items-start">
    <div class="flex-1">
      <div class="flex items-center mb-1">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{date}</time>
      <div class="text-base font-normal text-gray-500 dark:text-gray-400">
        <slot />
      </div>
    </div>
    {#if logo}
      <div class="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
        <img src={logo} alt="{title} logo" class="w-full h-full object-contain" />
      </div>
    {/if}
  </div>
</li>
