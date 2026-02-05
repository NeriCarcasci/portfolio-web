<script lang="ts">
  import type { PromptParts } from '$terminal/filesystem';
  import { cn } from '$lib/utils';

  interface Props {
    prompt: PromptParts;
    value: string;
    onsubmit: (value: string) => void;
    onkeydown: (e: KeyboardEvent) => void;
    oninput: (value: string) => void;
    disabled?: boolean;
  }

  let {
    prompt,
    value = $bindable(),
    onsubmit,
    onkeydown,
    oninput,
    disabled = false
  }: Props = $props();
  let inputEl: HTMLInputElement | undefined = $state();

  export function focus() {
    if (!inputEl) return;
    inputEl.focus();
    const length = inputEl.value.length;
    requestAnimationFrame(() => {
      try {
        inputEl?.setSelectionRange(length, length);
      } catch {
        // Ignore selection errors for unsupported input types
      }
    });
  }

  function handleSubmit(e: Event) {
    e.preventDefault();
    if (value.trim()) {
      onsubmit(value);
    }
  }

  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    value = target.value;
    oninput(target.value);
  }

  function handleKeydown(e: KeyboardEvent) {
    onkeydown(e);
  }
</script>

<form onsubmit={handleSubmit} class="flex items-center">
  <span class="text-emerald-400" aria-hidden="true">{prompt.user}@{prompt.host}</span>
  <span class="text-muted-foreground" aria-hidden="true">:</span>
  <span class="text-sky-400" aria-hidden="true">{prompt.path}</span>
  <span class="text-muted-foreground" aria-hidden="true">{prompt.symbol}</span>
  <input
    bind:this={inputEl}
    type="text"
    {value}
    oninput={handleInput}
    onkeydown={handleKeydown}
    {disabled}
    autocomplete="off"
    autocapitalize="off"
    spellcheck="false"
    class={cn(
      'ml-2 flex-1 bg-transparent outline-none text-foreground',
      'placeholder:text-muted-foreground/50',
      'disabled:opacity-50'
    )}
    aria-label="Terminal input"
  />
</form>
