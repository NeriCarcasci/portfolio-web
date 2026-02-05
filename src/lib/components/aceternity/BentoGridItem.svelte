<script lang="ts">
	import { cn } from '$lib/utils';

	export let className: string | undefined = undefined;
	export let title: string | undefined = undefined;
	export let description: string | undefined = undefined;
	export let href: string | undefined = undefined;
</script>

{#if href}
	<a
		{href}
		class={cn(
			'group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-white/[0.2] bg-black p-4 shadow-none transition duration-200 hover:shadow-xl',
			className
		)}
	>
		<slot name="header" />
		<div class="transition duration-200 group-hover/bento:translate-x-2">
			<slot name="icon" />
			{#if title}
				<div class="mb-2 mt-2 font-sans font-bold text-neutral-200">
					{title}
				</div>
			{/if}
			{#if description}
				<div class="font-sans text-xs font-normal text-neutral-300">
					{description}
				</div>
			{/if}
			<slot />
		</div>
	</a>
{:else}
	<div
		class={cn(
			'group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-white/[0.2] bg-black p-4 shadow-none transition duration-200 hover:shadow-xl',
			className
		)}
	>
		<slot name="header" />
		<div class="transition duration-200 group-hover/bento:translate-x-2">
			<slot name="icon" />
			{#if title}
				<div class="mb-2 mt-2 font-sans font-bold text-neutral-200">
					{title}
				</div>
			{/if}
			{#if description}
				<div class="font-sans text-xs font-normal text-neutral-300">
					{description}
				</div>
			{/if}
			<slot />
		</div>
	</div>
{/if}
