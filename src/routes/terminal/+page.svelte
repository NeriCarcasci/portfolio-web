<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { Button } from '$components/ui';
  import {
    TerminalInput,
    TerminalOutput,
    TerminalSuggestions,
    TerminalChips
  } from '$components/terminal';
  import type { HistoryEntry } from '$terminal/types';
  import { getSuggestions, getTabCompletion, type Suggestion } from '$terminal/suggest';
  import { commands, executeCommand } from '$terminal/commands';
  import { getCwd, getPromptParts } from '$terminal/filesystem';
  import { onMount } from 'svelte';

  let historyEntries = $state<HistoryEntry[]>([]);
  let historyIndex = $state(-1);
  let inputValue = $state('');
  let suggestions = $state<Suggestion[]>([]);
  let selectedSuggestion = $state(-1);
  let isProcessing = $state(false);
  let terminalEl: HTMLDivElement | undefined = $state();
  let inputComponent: ReturnType<typeof TerminalInput> | undefined = $state();
  let isHydrated = $state(false);
  let terminalError = $state<string | null>(null);
  let currentCwd = $state(getCwd());

  const promptParts = $derived(getPromptParts(currentCwd));
  const suggestedCommands = ['ls', 'cd /projects', 'cat readme.md', 'help'];
  const skeletonLines = [0, 1, 2, 3, 4];

  function setTerminalError(err: unknown) {
    console.error('Terminal UI error', err);
    terminalError = 'Terminal failed to initialize. Please try again or return home.';
  }

  function historyAdd(command: string, output: string, cwd: string) {
    historyEntries = [
      ...historyEntries,
      { command, output, timestamp: Date.now(), cwd }
    ];
    historyIndex = historyEntries.length;
  }

  function historyClear() {
    historyEntries = [];
    historyIndex = -1;
  }

  function historyNavigateUp(): string | null {
    if (historyEntries.length === 0) return null;
    if (historyIndex > 0) {
      historyIndex = historyIndex - 1;
    } else {
      historyIndex = 0;
    }
    return historyEntries[historyIndex]?.command ?? null;
  }

  function historyNavigateDown(): string | null {
    if (historyEntries.length === 0) return null;
    if (historyIndex < historyEntries.length - 1) {
      historyIndex = historyIndex + 1;
      return historyEntries[historyIndex]?.command ?? null;
    }
    historyIndex = historyEntries.length;
    return '';
  }

  function historyReset() {
    historyIndex = historyEntries.length;
  }

  onMount(() => {
    isHydrated = true;
    try {
      inputComponent?.focus();
    } catch (err) {
      setTerminalError(err);
    }
  });

  function updateSuggestions(value: string) {
    if (terminalError) return;
    try {
      suggestions = getSuggestions(value, commands);
      selectedSuggestion = -1;
    } catch (err) {
      setTerminalError(err);
    }
  }

  async function handleSubmit(value: string) {
    if (terminalError) return;
    isProcessing = true;
    suggestions = [];
    selectedSuggestion = -1;

    try {
      const promptCwd = getCwd();
      const result = await executeCommand(value);

      if (result.html === '__CLEAR__') {
        historyClear();
      } else {
        historyAdd(value, result.html, promptCwd);
      }

      currentCwd = getCwd();
      inputValue = '';
      historyReset();
      isProcessing = false;

      setTimeout(() => {
        if (terminalEl) {
          terminalEl.scrollTop = terminalEl.scrollHeight;
        }
      }, 10);

      if (result.navigate) {
        setTimeout(() => {
          goto(result.navigate!);
        }, 100);
      }

      inputComponent?.focus();
    } catch (err) {
      isProcessing = false;
      setTerminalError(err);
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (terminalError) return;
    try {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (suggestions.length > 0 && selectedSuggestion > 0) {
          selectedSuggestion--;
        } else if (suggestions.length === 0) {
          const prev = historyNavigateUp();
          if (prev !== null) inputValue = prev;
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (suggestions.length > 0 && selectedSuggestion < suggestions.length - 1) {
          selectedSuggestion++;
        } else if (suggestions.length === 0) {
          const next = historyNavigateDown();
          if (next !== null) inputValue = next;
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        if (suggestions.length > 0 && selectedSuggestion >= 0) {
          inputValue = suggestions[selectedSuggestion].command;
          suggestions = [];
        } else {
          const completion = getTabCompletion(inputValue, commands);
          if (completion) {
            inputValue = completion;
            updateSuggestions(inputValue);
          }
        }
      } else if (e.key === 'Enter' && selectedSuggestion >= 0) {
        e.preventDefault();
        inputValue = suggestions[selectedSuggestion].command;
        suggestions = [];
        selectedSuggestion = -1;
      } else if (e.key === 'Escape') {
        suggestions = [];
        selectedSuggestion = -1;
      }
    } catch (err) {
      setTerminalError(err);
    }
  }

  function handleSuggestionSelect(suggestion: Suggestion) {
    inputValue = suggestion.command;
    suggestions = [];
    selectedSuggestion = -1;
    inputComponent?.focus();
  }

  function handleChipSelect(command: string) {
    handleSubmit(command);
  }

  function handleTerminalClick(event: MouseEvent) {
    const target = event.target as HTMLElement | null;
    if (!target) return;
    if (target.closest('a, button, input, textarea, select, [data-terminal-no-focus]')) {
      return;
    }
    inputComponent?.focus();
  }
</script>

<svelte:head>
  <title>Terminal - Portfolio</title>
  <meta name="description" content="Interactive terminal interface to explore the portfolio." />
</svelte:head>

{#if terminalError}
  <div class="container-main py-12">
    <h1 class="text-2xl font-semibold mb-3">Terminal unavailable</h1>
    <p class="text-muted-foreground mb-6">
      Something went wrong while loading the interactive terminal. You can return home or try
      reloading this page.
    </p>
    <Button href="/">Back home</Button>
  </div>
{:else if !browser || !isHydrated}
  <div class="h-screen flex flex-col bg-background font-mono" aria-busy="true">
    <header class="flex items-center justify-between px-4 py-3 border-b border-border">
      <div class="flex items-center text-sm">
        <span class="text-emerald-400">{promptParts.user}@{promptParts.host}</span>
        <span class="text-muted-foreground">:</span>
        <span class="text-sky-400">{promptParts.path}</span>
      </div>
      <Button href="/" variant="ghost" size="sm">Exit</Button>
    </header>

    <div class="flex-1 overflow-y-auto p-4 space-y-4">
      <div class="space-y-2">
        <div class="h-4 w-52 bg-muted rounded motion-safe:animate-pulse"></div>
        <div class="h-4 w-80 bg-muted rounded motion-safe:animate-pulse"></div>
      </div>
      <div class="space-y-3">
        {#each skeletonLines as _}
          <div class="h-4 w-full bg-muted rounded motion-safe:animate-pulse"></div>
        {/each}
      </div>
      <div class="h-4 w-48 bg-muted rounded motion-safe:animate-pulse"></div>
    </div>
  </div>
{:else}
  <div class="h-screen flex flex-col bg-background font-mono">
    <header class="flex items-center justify-between px-4 py-3 border-b border-border">
      <div class="flex items-center text-sm">
        <span class="text-emerald-400">{promptParts.user}@{promptParts.host}</span>
        <span class="text-muted-foreground">:</span>
        <span class="text-sky-400">{promptParts.path}</span>
      </div>
      <Button href="/" variant="ghost" size="sm">Exit</Button>
    </header>

    <div
      bind:this={terminalEl}
      on:click={handleTerminalClick}
      class="flex-1 overflow-y-auto p-4 space-y-4"
    >
      <div class="text-muted-foreground">
        <p>Welcome to the portfolio terminal.</p>
        <p>Type <code class="bg-muted px-1.5 py-0.5 rounded text-foreground">help</code> to see available commands.</p>
      </div>

      {#if historyEntries.length === 0}
        <TerminalChips commands={suggestedCommands} onselect={handleChipSelect} />
      {/if}

      <TerminalOutput entries={historyEntries} />

      <div class="relative pb-6">
        <TerminalSuggestions
          {suggestions}
          selectedIndex={selectedSuggestion}
          onselect={handleSuggestionSelect}
        />
        <TerminalInput
          bind:this={inputComponent}
          bind:value={inputValue}
          prompt={promptParts}
          onsubmit={handleSubmit}
          onkeydown={handleKeydown}
          oninput={updateSuggestions}
          disabled={isProcessing}
        />
      </div>
    </div>
  </div>
{/if}

<noscript>
  <div class="container-main py-8">
    <h1 class="text-2xl font-semibold mb-4">Terminal Mode</h1>
    <p class="text-muted-foreground mb-4">
      Terminal mode requires JavaScript for the interactive experience.
    </p>
    <p>
      <a href="/" class="link">Return to home</a> to browse the portfolio without JavaScript.
    </p>
  </div>
</noscript>
