<script lang="ts">
  let className = '';
  export { className as class };
</script>

<ol class="relative border-s border-gray-200 dark:border-gray-700 {className}">
  <slot />
</ol>
