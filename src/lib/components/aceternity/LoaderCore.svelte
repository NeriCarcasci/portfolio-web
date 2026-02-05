<script lang="ts">
	import { AnimatePresence, Motion } from 'svelte-motion';
	import { spring } from 'svelte/motion';
	import { fly } from 'svelte/transition';
	import { cn } from '@/utils';

	export let loadingStates: {
		text: string;
	}[] = [];
	export let currentState = 0;
	export let duration = 2000;
	export let className: string | undefined = undefined;

	const progress = spring(0);
	progress.stiffness = 50;
	progress.damping = 20;

	const startProgress = async () => {
		progress.set(0);
		for (let i = 0; i < loadingStates.length; i++) {
			await new Promise((resolve) => setTimeout(resolve, duration));
			progress.set((i + 1) / loadingStates.length);
		}
	};

	$: currentState, startProgress();
</script>

<div class={cn('relative h-full w-full', className)}>
	{#each loadingStates as state, index}
		<Motion
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: index === currentState ? 1 : 0, y: index === currentState ? 0 : 20 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.5 }}
			class="absolute inset-0 flex items-center justify-center"
		>
			<div class="flex items-center gap-2">
				<div class="h-3 w-3 rounded-full bg-lime-500"></div>
				<p class="text-sm text-zinc-200">{state.text}</p>
			</div>
		</Motion>
	{/each}

	<AnimatePresence>
		{#if currentState === loadingStates.length - 1}
			<Motion
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				class="absolute inset-0 flex items-center justify-center"
			>
				<p class="text-sm text-lime-500">Ready</p>
			</Motion>
		{/if}
	</AnimatePresence>

	<div class="absolute bottom-0 left-0 w-full">
		<Motion
			initial={{ scaleX: 0 }}
			animate={{ scaleX: progress.current }}
			transition={{ duration: 0.5 }}
			class="h-0.5 w-full bg-lime-500 origin-left"
		/>
	</div>
</div>
