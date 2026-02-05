<script lang="ts">
  import { cn } from '$lib/utils';

  interface Props {
    value: string;
    onsubmit: (value: string) => void;
    onkeydown: (e: KeyboardEvent) => void;
    oninput: (value: string) => void;
    disabled?: boolean;
  }

  let { value = $bindable(), onsubmit, onkeydown, oninput, disabled = false }: Props = $props();
  let inputEl: HTMLInputElement | undefined = $state();

  export function focus() {
    inputEl?.focus();
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

<form onsubmit={handleSubmit} class="flex items-center gap-2">
  <span class="text-muted-foreground select-none" aria-hidden="true">&gt;</span>
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
      'flex-1 bg-transparent outline-none text-foreground',
      'placeholder:text-muted-foreground/50',
      'disabled:opacity-50'
    )}
    placeholder="Type a command..."
    aria-label="Terminal input"
  />
</form>
