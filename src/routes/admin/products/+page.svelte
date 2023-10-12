<script lang="ts">
	import { getRelativeTime } from '$lib/helper/time';
	import Icon from '@iconify/svelte';

	export let data;
	let listMode = false;
</script>

<div class="padding">
	<div class="flex justify-end w-full">
		<a href="/admin/products/create" class="btn flex gap-x-2">
			<Icon icon="solar:inbox-in-bold" width="24px" />
			Add New Product</a
		>
	</div>
	<!-- Filter -->
	<div class="flex items-center justify-between flex-wrap gap-x-4 gap-y-2">
		<div class="flex rounded-xl overflow-hidden border border-shading text-semi-dark">
			<button
				on:click={() => (listMode = true)}
				class="p-2 border-r border-shading trans {listMode
					? 'bg-primary text-light'
					: 'bg-semi-light'}"><Icon icon="solar:notes-line-duotone" width="24" /></button
			>
			<button
				on:click={() => (listMode = false)}
				class="p-2 trans {!listMode ? 'bg-primary text-light' : 'bg-semi-light'}"
				><Icon icon="solar:posts-carousel-vertical-line-duotone" width="24" /></button
			>
		</div>
	</div>
	<!-- Products -->
	<div class="flex flex-wrap items-center justify-center gap-4 text-sm mt-4">
		{#each data.products as prod, i (prod.title)}
			{#if listMode}
				<a
					href="/admin/products/{prod.id}"
					class="relative w-56 rounded-xl overflow-hidden border border-shading bg-semi-light text-xs group"
				>
					<div class="relative flex justify-between">
						<div class="aspect-[4/3] overflow-hidden">
							<img
								src="/data/{prod.id}/{prod.fileNames.split(',')[0]}"
								alt="{prod.title} ({prod.id} - {i})"
								class="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
							/>
						</div>
						<div class="absolute w-full h-full bg-gradient-to-b from-transparent to-semi-dark" />
						<h1
							class="line-clamp-1 hover:underline trans absolute bottom-2 left-2 text-light font-semibold"
						>
							<div>{prod.brand}</div>
						</h1>
						<!-- <p>{prod?.category?.name ?? 'unset'}</p> -->
					</div>
					<div class="flex justify-between p-2">
						<h1 class="font-semibold text-sm mb-2 line-clamp-2">{prod.title}</h1>
						<p class="text-xs tracking-tighter text-semi-dark">{getRelativeTime(prod.createdAt)}</p>
					</div>

					<div class="flex justify-between p-2">
						<Icon
							icon="solar:global-line-duotone"
							width="22px"
							class={prod.published ? 'text-green-500' : 'text-red-500'}
						/>
						<div class="flex flex-col items-center gap-1">
							<Icon icon="solar:battery-half-line-duotone" width="22px" />
							{prod.quantity}
						</div>
						<div class="flex flex-col items-center gap-1">
							<Icon icon="solar:tag-price-line-duotone" width="22px" />
							{prod.discount}%
						</div>
						<div class="flex flex-col items-center gap-1">
							<Icon icon="solar:wallet-money-line-duotone" width="22px" />
							{prod.price}
						</div>
					</div></a
				>
			{:else}
				<a
					href="/admin/products/{prod.id}"
					class="relative w-full rounded-xl border border-shading bg-semi-light flex overflow-hidden text-xs"
				>
					<div class="flex aspect-square overflow-hidden min-w-[11rem] h-44">
						<img
							src="/data/{prod.id}/{prod.fileNames.split(',')[0]}"
							alt="{prod.title} ({prod.id} - {i})"
							class="h-full object-cover aspect-square w-full"
						/>
					</div>
					<div class="p-2 flex flex-col justify-between">
						<div>
							<h1 class="text-sm font-semibold">
								<span class="text-dark">{prod.title}</span>
							</h1>
							<h1 class="font-bold text-semi-dark">
								{prod.brand}
							</h1>
							<p class="indent-2 line-clamp-5 mt-2">
								{prod.description}
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore culpa voluptatibus debitis
								expedita iste officia beatae tempora praesentium pariatur assumenda. Doloribus earum
								eveniet reiciendis nihil aspernatur totam eligendi saepe, iste
							</p>
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
				</a>
			{/if}
		{/each}
	</div>
</div>
