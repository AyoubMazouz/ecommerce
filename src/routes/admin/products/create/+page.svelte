<script lang="ts">
	import { enhance } from '$app/forms';
	import Switch from '$lib/components/switch.svelte';

	export let data;
	export let form: any;

	function handleUppercase(e: any) {
		if (e?.target) e.target.value = e.target.value.toUpperCase();
	}
</script>

<form action="?/test" method="POST" use:enhance enctype="multipart/form-data">
	<input type="file" name="imgs" multiple accept="" />
	<button>test</button>
</form>

<div class="padding mt-12">
	<form method="POST" action="?/create" use:enhance class="grid grid-cols-2 gap-y-4 gap-x-6">
		<!-- Title -->
		<div class="col-span-full">
			<label for="title" class="flex items-start"
				>Title <span class="text-danger text-xs">*</span></label
			>
			<input
				type="text"
				placeholder="Title..."
				name="title"
				value={form?.data?.title ?? ''}
				required
				class="input w-full"
			/>
			<p class="text-danger text-xs mt-1">{form?.errors?.title ?? ''}</p>
		</div>
		<!-- Brand -->
		<div class="">
			<label for="brand" class="flex items-start"
				>Brand <span class="text-danger text-xs">*</span></label
			>
			<input
				type="text"
				placeholder="Brand..."
				name="brand"
				value={form?.data?.brand ?? ''}
				on:keyup={handleUppercase}
				required
				class="input w-full"
			/>
			<p class="text-danger text-xs mt-1">{form?.errors?.brand ?? ''}</p>
		</div>
		<!-- Category -->
		<div class="">
			<label for="category" class="flex items-start"
				>Category <span class="text-danger text-xs">*</span></label
			>
			<select
				name="category"
				required
				value={form?.data?.category ?? ''}
				class="input w-full bg-light"
			>
				{#each data.categories as cat (cat)}
					<option value={cat.id}>{cat.name}</option>
				{/each}
			</select>
			<p class="text-danger text-xs mt-1">{form?.errors?.category ?? ''}</p>
		</div>
		<!-- Price -->
		<div class="">
			<label for="price" class="flex items-start"
				>Price <span class="text-danger text-xs">*</span></label
			>
			<input
				type="number"
				placeholder="Price..."
				name="price"
				value="{form?.data?.price ?? ''}required"
				class="input w-full"
			/>
			<p class="text-danger text-xs mt-1">{form?.errors?.price ?? ''}</p>
		</div>
		<!-- Discount -->
		<div class="">
			<label for="discount">Discount</label>
			<input
				type="number"
				min="0"
				max="100"
				placeholder="Discount..."
				name="discount"
				value={form?.data?.discount ?? '0'}
				class="input w-full"
			/>
			<p class="text-danger text-xs mt-1">{form?.errors?.discount ?? ''}</p>
		</div>
		<!-- Quantity -->
		<div class="">
			<label for="quantity">Quantity</label>
			<input
				type="number"
				min="0"
				placeholder="Quantity..."
				name="quantity"
				value={form?.data?.quantity ?? '0'}
				class="input w-full"
			/>
			<p class="text-danger text-xs mt-1">{form?.errors?.quantity ?? ''}</p>
		</div>
		<!-- Published -->
		<div class="flex flex-col justify-between">
			<label for="published">Published</label>
			<Switch name="published" value={!!form?.data?.published} />
			<p class="text-danger text-xs mt-1">{form?.errors?.published ?? ''}</p>
		</div>
		<!-- Description -->
		<div class="col-span-full">
			<label for="description">Description</label>
			<textarea
				rows="3"
				placeholder="Description..."
				name="description"
				value={form?.data?.description ?? ''}
				class="input w-full"
			/>
			<p class="text-danger text-xs mt-1">{form?.errors?.description ?? ''}</p>
		</div>

		<div class="" />
		<button type="submit" class="btn">Add New Product</button>
	</form>
</div>
