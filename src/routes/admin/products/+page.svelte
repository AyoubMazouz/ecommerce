<script lang="ts">
	import menuStore from '$lib/stores/menuStore';
	import { fade, fly } from 'svelte/transition';
	import { getRelativeTime } from '$lib/helper/time';
	import Icon from '$lib/components/Icon.svelte';
	import { page } from '$app/stores';
	import type { Product } from '@prisma/client';

	export let data;
	let listMode = false;
	$: cat = $page.url.searchParams.get('cat') ?? 'all';
	$: sortBy = $page.url.searchParams.get('sortBy') ?? 'title';
	$: sortDir = $page.url.searchParams.get('sortDir') ?? 'asc';
	$: rating = $page.url.searchParams.get('rating') ?? '0';
	let categoryUrls = [['all', 'all']];
	$: {
		categoryUrls = [['all', 'all']];
		if (cat !== 'all') {
			for (let i = 0; i < data.categories.length; i++) {
				const category = data.categories[i];
				if (category.id === cat) {
					categoryUrls = [
						['all', 'all'],
						[category.id, category.name]
					];
					break;
				}
				for (let j = 0; j < data.categories[i].subCategories.length; j++) {
					const subCategory = data.categories[i].subCategories[j];
					if (subCategory.id === cat) {
						categoryUrls = [
							['all', 'all'],
							[category.id, category.name],
							[subCategory.id, subCategory.name]
						];
						break;
					}
				}
			}
		}
	}
	function getQueryUrl(options: {}) {
		const opt = { cat, sortBy, sortDir, rating, ...options };
		const params = new URLSearchParams();
		Object.entries(opt).forEach(([key, value]: string[]) => params.append(key, value));
		return '/admin/products?' + params.toString();
	}

	let selected: string[] = [];
	let selectedMemo: any = {};
	function handleSelect(id: string) {
		if (selectedMemo[id] === true) {
			selectedMemo[id] = undefined;
			selected = selected.filter((i: string) => i !== id);
		} else {
			selectedMemo[id] = true;
			selected = [...selected, id];
		}
	}
	function handleSelectAll() {
		if (selected.length === data.products.length) {
			selected = [];
			selectedMemo = {};
		} else {
			selected = data.products.map((prod) => {
				selectedMemo[prod.id] = true;
				return prod.id;
			});
		}
	}
</script>

<div class="padding bg-light mt-4">
	<!-- #1 -->
	<div class="flex justify-between w-full">
		<!-- Category Path -->
		<div class="flex items-center gap-x-2 capitalize">
			{#each categoryUrls as [id, name], i (`${id}${name}cu`)}
				{#if i !== 0}
					<Icon icon="solar:alt-arrow-right-outline" className="text-semi-dark" />
				{/if}
				<a href="/admin/products?cat={id}" class="hover:underline text-semi-dark trans">{name}</a>
			{/each}
			<!-- TOTAL Result -->
			<Icon icon="solar:alt-arrow-right-outline" className="text-semi-dark" />
			<div class="text-sm text-semi-dark font-semibold">
				Result:
				<span>{data.products.length}</span>
			</div>
		</div>
		<div class="flex gap-x-2 items-center">
			<!-- Add New Product -->
			<a href="/admin/products/create" class="btn flex gap-x-2">
				<Icon icon="addItem" />
				New</a
			>
			<!-- Right Side # Sort  -->
			<button on:click={() => menuStore.set('sort')} class="btn-flat flex gap-x-2 relative z-20">
				{#if sortDir === 'asc'}
					<Icon icon="solar:sort-from-bottom-to-top-line-duotone" />
				{:else}
					<Icon icon="solar:sort-from-top-to-bottom-line-duotone" />
				{/if}
				Sort By {sortBy}
				{#if $menuStore === 'sort'}
					<div
						in:fly={{ y: -10, duration: 200 }}
						out:fade={{ duration: 200 }}
						class="absolute top-[120%] right-[0%] bg-light rounded-xl shadow-xl border border-shading overflow-hidden text-sm"
					>
						<a
							target="_self"
							href={getQueryUrl({ sortBy: 'title', sortDir: 'asc' })}
							class="flex gap-x-2 items-center p-2 pr-6 hover:bg-primary hover:text-semi-light trans whitespace-nowrap border-b border-shading"
						>
							<Icon icon="solar:sort-by-alphabet-bold-duotone" />
							Title Asc</a
						>
						<a
							target="_self"
							href={getQueryUrl({ sortBy: 'title', sortDir: 'desc' })}
							class="flex gap-x-2 items-center p-2 pr-6 hover:bg-primary hover:text-semi-light trans whitespace-nowrap border-b border-shading"
						>
							<Icon icon="solar:sort-by-alphabet-bold-duotone" />
							Title Desc</a
						>
						<a
							target="_self"
							href={getQueryUrl({ sortBy: 'createdAt', sortDir: 'asc' })}
							class="flex gap-x-2 items-center p-2 pr-6 hover:bg-primary border-b border-shading hover:text-semi-light trans whitespace-nowrap"
						>
							<Icon icon="time" />
							Latest
						</a>
						<a
							target="_self"
							href={getQueryUrl({ sortBy: 'createdAt', sortDir: 'desc' })}
							class="flex gap-x-2 items-center p-2 pr-6 hover:bg-primary border-b border-shading hover:text-semi-light trans whitespace-nowrap"
						>
							<Icon icon="time" />
							Oldest
						</a>
						<a
							target="_self"
							href={getQueryUrl({ sortBy: 'price', sortDir: 'asc' })}
							class="flex gap-x-2 items-center p-2 pr-6 hover:bg-primary hover:text-semi-light trans border-b border-shading whitespace-nowrap"
						>
							<Icon icon="price" />
							Price Asc</a
						>
						<a
							target="_self"
							href={getQueryUrl({ sortBy: 'price', sortDir: 'desc' })}
							class="flex gap-x-2 items-center p-2 pr-6 hover:bg-primary hover:text-semi-light trans whitespace-nowrap border-b border-shading"
						>
							<Icon icon="price" />
							Price Desc</a
						>
						<a
							target="_self"
							href={getQueryUrl({ sortBy: 'rating', sortDir: 'asc' })}
							class="flex gap-x-2 items-center p-2 pr-6 hover:bg-primary hover:text-semi-light border-b border-shading trans whitespace-nowrap"
						>
							<Icon icon="rating" />
							Rating</a
						>
						<a
							target="_self"
							href={getQueryUrl({ sortBy: 'sold', sortDir: 'asc' })}
							class="flex gap-x-2 items-center p-2 pr-6 hover:bg-primary hover:text-semi-light border-b border-shading trans whitespace-nowrap"
						>
							<Icon icon="popular" />
							Popularity
						</a>
						<a
							target="_self"
							href={getQueryUrl({ sortBy: 'quantity', sortDir: 'desc' })}
							class="flex gap-x-2 items-center p-2 pr-6 hover:bg-primary border-b border-shading hover:text-semi-light trans whitespace-nowrap"
						>
							<Icon icon="quantity" />
							Quantity
						</a>
						<a
							target="_self"
							href={getQueryUrl({ sortBy: 'discount', sortDir: 'desc' })}
							class="flex gap-x-2 items-center p-2 pr-6 hover:bg-primary hover:text-semi-light trans whitespace-nowrap"
						>
							<Icon icon="discount" />
							Discount
						</a>
					</div>
				{/if}
			</button>
		</div>
	</div>

	<!-- #2 -->
	<div class="flex items-center justify-between gap-x-4 my-4">
		<!-- left Side -->
		<div class="flex items-center gap-x-4">
			<!-- ViewMode -->
			<div class="flex rounded-xl overflow-hidden border border-shading text-semi-dark">
				<button
					on:click={() => (listMode = true)}
					class="p-2 border-r border-shading trans {listMode
						? 'bg-primary text-light'
						: 'bg-semi-light'}"><Icon icon="cardStyle" /></button
				>
				<button
					on:click={() => (listMode = false)}
					class="p-2 trans {!listMode ? 'bg-primary text-light' : 'bg-semi-light'}"
					><Icon icon="listStyle" /></button
				>
			</div>
		</div>
		<div class="flex gap-x-2">
			<!-- Delete -->
			{#if selected.length > 0}
				<div>
					{#if selected.length === 1}
						<form action="?/deleteProduct" method="POST">
							<input type="hidden" name="id" value={selected[0]} />
							<button class="btn-flat"><Icon icon="delete" size="lg" /></button>
						</form>
					{:else}
						<form action="?/deleteProductMany" method="POST">
							<input type="hidden" name="ids" value={JSON.stringify(selected)} />
							<button class="btn-flat flex gap-x-2 items-center"
								><Icon icon="delete" size="lg" />{selected.length}</button
							>
						</form>
					{/if}
				</div>
			{/if}
			<!-- Select -->
			<button
				on:click={handleSelectAll}
				class="flex items-center p-1 mr-2.5 rounded-xl hover:bg-shading hover:shadow-lg active:scale-105 focus:ring focus:ring-shading trans bg-light {selected.length ===
					data.products.length && selected.length !== 0
					? 'border-success border-2'
					: 'border-shading border'}"
			>
				<Icon
					icon="solar:check-read-line-duotone"
					size="lg"
					className="hover:text-success trans {selected.length === data.products.length &&
					selected.length !== 0
						? 'text-success'
						: 'text-shading'}"
				/>
			</button>
		</div>
	</div>

	<!-- #3 -->
	<div class="flex">
		<!-- Filter -->
		<div class="min-w-[12rem] text-sm">
			<!-- Categories -->
			<div class="flex flex-col -ml-2">
				{#each data.categories as category (`mobileMenu${category.name}`)}
					<a href="/admin/products?cat={category.id}" class="w-full font-semibold flex items-center"
						><Icon icon="dropDown" className="rotate-90" /> {category.name}</a
					>
					{#if categoryUrls.length >= 2 && (category.id === cat || category.subCategories
								.map((s) => s.id)
								.includes(cat))}
						{#each category.subCategories as SubCategory (`mobileMenu${SubCategory.name}`)}
							<a href="/admin/products?cat={SubCategory.id}" class="w-full pl-4 trans"
								>{SubCategory.name}
							</a>
						{/each}
					{/if}
				{/each}
			</div>
			<!-- Reviews -->
			<div>
				<h1 class="font-bold mb-2">Customer Reviews</h1>
				<a href="/admin/products?sortBy={sortBy}&sortDir={sortDir}" class="">Clear</a>
				{#each { length: 5 } as _, i (`ratingFilter${i}`)}
					{#if i > 0}
						<a href={getQueryUrl({ rating: i })} class="flex gap-x-1 hover:text-primary trans">
							{#each { length: i } as _, j (`ratingFilter2${j}`)}
								<Icon icon="rating" size="sm" />
							{/each}
							<span>& Up</span>
						</a>
					{/if}
				{/each}
			</div>
		</div>

		<!-- Products -->
		<div
			class="flex flex-wrap items-center justify-center gap-4 text-sm bg-semi-light p-2 -mr-2 md:-mr-3 lg:-mr-4 rounded-l-xl h-full"
		>
			{#each data.products as prod, i (prod.title)}
				<!-- CardMode -->
				{#if listMode}
					<a
						href="/admin/products/{prod.id}"
						class="relative w-56 rounded-xl shadow-xl overflow-hidden border border-shading bg-light text-xs group"
					>
						<div class="relative flex justify-between">
							<div class="aspect-[4/3] overflow-hidden">
								<img
									src={prod.images[0].path}
									alt={prod.title}
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
							<p class="text-xs tracking-tighter text-semi-dark">
								{getRelativeTime(prod.createdAt)}
							</p>
						</div>

						<div class="flex justify-between p-2">
							<Icon
								icon="published"
								className={prod.published ? 'text-green-500' : 'text-red-500'}
							/>
							<div class="flex flex-col items-center gap-1">
								<Icon icon="quantity" />
								{prod.quantity}
							</div>
							<div class="flex flex-col items-center gap-1">
								<Icon icon="delivery" />
								{prod.sold}
							</div>
							<div class="flex flex-col items-end gap-1">
								<Icon icon="rating" />
								{prod.rating}
							</div>
							<div class="flex flex-col items-center gap-1">
								<Icon icon="discount" />
								{prod.discount}%
							</div>
							<div class="flex flex-col items-center gap-1">
								<Icon icon="price" />
								{prod.price}
							</div>
						</div></a
					>
					<!-- List Mode -->
				{:else}
					<div
						class="relative w-full rounded-xl border border-shading bg-light flex overflow-hidden text-xs"
					>
						<button
							on:click={() => handleSelect(prod.id)}
							class="absolute top-2 right-2 flex items-center p-1 rounded-xl hover:bg-shading hover:shadow-lg active:scale-105 focus:ring focus:ring-shading trans bg-light {selectedMemo[
								prod.id
							]
								? 'border-success border-2'
								: 'border-shading border'}"
						>
							<Icon
								icon="solar:check-read-line-duotone"
								size="lg"
								className="hover:text-success trans {selectedMemo[prod.id]
									? 'text-success'
									: 'text-shading'}"
							/>
						</button>
						<a
							href="/admin/products/{prod.id}"
							class="flex aspect-square overflow-hidden min-w-[11rem] h-44"
						>
							<img
								src={prod.images[0].path}
								alt="{prod.title} ({prod.id} - {i})"
								class="h-full object-cover aspect-square w-full"
							/>
						</a>
						<div class="p-2 flex flex-col justify-between">
							<div>
								<a
									href="/admin/products/{prod.id}"
									class="text-sm font-semibold hover:underline trans"
								>
									<span class="text-dark">{prod.title}</span>
								</a>
								<h1 class="font-bold text-semi-dark">
									{prod.brand}
								</h1>
								<p class="indent-2 line-clamp-5 mt-2">
									{prod.description}
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore culpa voluptatibus
									debitis expedita iste officia beatae tempora praesentium pariatur assumenda. Doloribus
									earum eveniet reiciendis nihil aspernatur totam eligendi saepe, iste
								</p>
							</div>

							<div class="flex justify-between items-end text-xs text-semi-dark">
								<div class="flex items-end gap-x-4">
									<Icon
										icon="published"
										className={prod.published ? 'text-green-500' : 'text-red-500'}
									/>
									<div class="flex items-end gap-x-1">
										<Icon icon="quantity" />
										{prod.quantity}
									</div>
									<div class="flex items-end gap-1">
										<Icon icon="delivery" />
										{prod.sold}
									</div>
									<div class="flex items-end gap-1">
										<Icon icon="rating" />
										{prod.rating}
									</div>
									<div class="flex items-end gap-x-1">
										<Icon icon="discount" />
										{prod.discount}%
									</div>
									<div class="flex items-end gap-x-1">
										<Icon icon="price" />
										{prod.price}
									</div>
								</div>
								<div>{getRelativeTime(prod.updatedAt)}</div>
							</div>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>
