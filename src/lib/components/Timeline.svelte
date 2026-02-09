<script lang="ts">
  let className = '';
  export { className as class };
</script>

<ol class="relative border-s border-neutral-700/70 {className}">
  <slot />
</ol>
