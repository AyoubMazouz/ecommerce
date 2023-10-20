<script lang="ts">
	import { enhance } from '$app/forms';
	import Icon from '$lib/components/Icon.svelte';
	import alertStore from '$lib/stores/alterStore.js';

	export let data;
	export let form;
	let currField = '';
	// Set alert coming from Forms .
	$: {
		if (form?.alert) alertStore.set(form.alert.type, form.alert.body);
		if (form?.errors) Object.entries(form.errors).forEach((e: any) => alertStore.set('danger', e));
	}
</script>

<div class="padding w-full mt-6">
	<!-- Categories -->
	<div class="flex flex-col w-2/3">
		{#each data.categories as category (`mobileMenu${category.name}`)}
			{#if currField === category.id}
				<form method="POST" action="?/update" class="w-full flex gap-x-2">
					<div class="flex gap-x-1">
						<button type="submit" class="btn-flat"><Icon icon="success" size="lg" /></button>
						<button class="btn-flat" on:click={() => (currField = '')}
							><Icon icon="danger" size="lg" /></button
						>
					</div>
					<input
						type="text"
						name="name"
						value={category.name}
						placeholder="Category Name..."
						class="input"
					/>
					<input type="hidden" name="id" value={category.id} />
				</form>
			{:else}
				<div class="flex gap-x-2">
					<div class="flex gap-x-1">
						<button
							class="btn-flat"
							on:click={() => (currField = currField === category.id ? '' : category.id)}
							><Icon icon="edit" size="lg" /></button
						>
						<form method="POST" action="?/delete" use:enhance>
							<input type="hidden" name="id" value={category.id} />
							<button class="btn-flat"><Icon icon="delete" size="lg" /></button>
						</form>
					</div>
					<a
						href="/admin/products?cat={category.id}"
						class="w-full font-semibold flex items-center"
					>
						{category.name}
					</a>
				</div>
			{/if}
			{#each category.subCategories as SubCategory (`mobileMenu${SubCategory.name}`)}
				<a href="/admin/products?cat={SubCategory.id}" class="w-full pl-4 trans"
					>{SubCategory.name}
				</a>
			{/each}
		{/each}
	</div>
</div>
