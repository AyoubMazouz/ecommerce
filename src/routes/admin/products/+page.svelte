<script lang="ts">
	import { getRelativeTime } from '$lib/helper/time';
	import Icon from '@iconify/svelte';

	export let data;
	$: products = data.products;
</script>

<div class="padding">
	<div class="flex justify-end w-full">
		<a href="/admin/products/create" class="btn flex gap-x-2">
			<Icon icon="solar:inbox-in-bold" width="24px" />
			Add New Product</a
		>
	</div>
	<!-- Filter -->
	<div class="flex items-center justify-between flex-wrap gap-x-4 gap-y-2">some filters</div>
	<!-- Products -->
	<div class="flex flex-wrap items-center justify-center">
		{#each products as prod, i (prod.title)}
			<div
				class="relative w-full p-2 rounded-xl border border-shading {i % 2 === 0 &&
					'bg-semi-light'}"
			>
				<div class="flex justify-between">
					<div class="font-semibold w-full">{prod.id} | {prod.title}</div>
					<div class="">{prod.price}</div>
				</div>
				<div>
					{prod.brand}
				</div>
				<div class="absolute bottom-2 right-2">
					<div class="text-xs">Update At : {getRelativeTime(prod.updatedAt)}</div>
					<div class="text-xs">Created At: {getRelativeTime(prod.createdAt)}</div>
				</div>
			</div>
		{/each}
	</div>
</div>
