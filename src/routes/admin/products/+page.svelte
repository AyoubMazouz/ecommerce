<script lang="ts">
	import { getRelativeTime } from '$lib/helper/time';
	import Icon from '@iconify/svelte';

	export let data;
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
	<div class="flex flex-wrap items-center justify-center gap-4 text-sm">
		{#each data.products as prod, i (prod.title)}
			<div class="relative w-full p-2 pb-1 rounded-xl border border-shading bg-semi-light">
				<div class="flex justify-between">
					<h1 class="w-full">
						<span class="font-semibold text-semi-dark"
							><span>{prod.brand}</span> <span class="text-dark">{prod.title}</span>
						</span>
					</h1>
					<p>{prod?.category?.name ?? 'unset'}</p>
				</div>

				<div class="flex justify-between text-xs text-semi-dark">
					<div class="flex items-center gap-x-4">
						<Icon
							icon="solar:global-line-duotone"
							width="22px"
							class={prod.published ? 'text-green-500' : 'text-red-500'}
						/>
						<div class="flex items-center gap-x-1">
							<Icon icon="solar:battery-half-line-duotone" width="22px" />
							{prod.quantity}
						</div>
						<div class="flex items-center gap-x-1">
							<Icon icon="solar:tag-price-line-duotone" width="22px" />
							{prod.discount}%
						</div>
						<div class="flex items-center gap-x-1">
							<Icon icon="solar:wallet-money-line-duotone" width="22px" />
							{prod.price}
						</div>
					</div>
					<div>{getRelativeTime(prod.updatedAt)}</div>
				</div>
			</div>
		{/each}
	</div>
</div>
