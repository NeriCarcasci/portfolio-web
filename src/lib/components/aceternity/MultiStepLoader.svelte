<script lang="ts">
	import { cn } from '$lib/utils';
	import { AnimatePresence, Motion } from 'svelte-motion';
	import LoaderCore from './LoaderCore.svelte';
	import { spring } from 'svelte/motion';
	import { tick } from 'svelte';

	export let loadingStates: {
		text: string;
	}[] = [];
	export let loading = false;
	export let duration = 2000;
	export let loop = true;
	export let className = '';

	const totalDuration = duration * loadingStates.length;
	const progress = spring(0);

	let currentState = 0;

	const updateState = async () => {
		if (!loading) return;
		currentState = 0;
		for (let i = 0; i < loadingStates.length; i++) {
			currentState = i;
			await progress.set((i + 1) / loadingStates.length);
			await new Promise((resolve) => setTimeout(resolve, duration));
		}

		if (loop) {
			updateState();
		}
	};

	$: currentState || loading, updateState();
</script>

<AnimatePresence>
	{#if loading}
		<div
			class={cn(
				'fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md',
				className
			)}
		>
			<LoaderCore {loadingStates} {currentState} {duration} />
		</div>
	{/if}
</AnimatePresence>
