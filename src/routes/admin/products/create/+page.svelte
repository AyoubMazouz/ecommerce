<script lang="ts">
	import { enhance } from '$app/forms';
	import Switch from '$lib/components/switch.svelte';
	import Icon from '@iconify/svelte';
	import alertStore from '../../../../stores/alterStore.js';

	export let data;
	export let form: any;
	let inputEle: any;
	let imgsPrev: any = [];
	let tagsEle: any;
	let tags: string[] = [];

	// Set alert
	$: {
		if (form?.alert) alertStore.set(form.alert.type, form.alert.body);
		if (form?.errors) Object.entries(form.errors).forEach((e: any) => alertStore.set('danger', e));
	}

	function handleUppercase(e: any) {
		if (e?.target) e.target.value = e.target.value.toUpperCase();
	}

	function handleTags(e: any) {
		const val = e.target.value;
		if (e.key === ' ') {
			if (val.length < 4) {
				alertStore.set('warn', 'Tag must be at least 3 characters long!');
				e.target.value = '';
				return;
			}
			if (tags.includes(val)) {
				e.target.value = '';
				return;
			}
			tags = [...tags, val];
			e.target.value = '';
			tagsEle.value = tags.join(',');
		}
	}
	function handleDeleteTags(id: number) {
		tags = tags.filter((_, i) => id !== i);
	}

	// Preview Images from File Input.
	async function handleImagePrev(e?: any) {
		const images = e.target.files;
		if (images.length === 0) {
			imgsPrev = [];
		} else
			for (let image of images) {
				const reader = new FileReader();
				imgsPrev = [];
				reader.readAsDataURL(image);
				reader.onload = (e) => {
					if (e?.target?.result) {
						imgsPrev = [{ name: image.name, value: e.target.result }, ...imgsPrev];
					}
				};
			}
	}

	function handleRemoveImage(name: string) {
		const newInput = document.createElement('input');
		const data = new DataTransfer();
		newInput.type = 'file';

		Array.from(inputEle.files).forEach((file: any, i: number) => {
			if (name !== file.name) data.items.add(file);
		});

		newInput.files = data.files;
		inputEle.parentNode.replaceChild(newInput, inputEle);
		inputEle = newInput;
		handleImagePrev({ target: newInput });
	}
</script>

<div class="padding mt-12">
	<form
		method="POST"
		action="?/create"
		enctype="multipart/form-data"
		use:enhance
		class="grid grid-cols-2 gap-y-4 gap-x-6"
	>
		<!-- Images -->
		<div
			class="col-span-full w-full h-60 rounded-xl border-2 border-dotted border-shading bg-semi-light text-semi-dark relative flex flex-col justify-center items-center"
		>
			<h1 class="text-lg font-semibold text-center">Drag and Drop or Click to Open File Dialog</h1>
			<Icon icon="solar:file-smile-line-duotone" width="64" />
			<input
				bind:this={inputEle}
				type="file"
				name="imgs"
				multiple
				accept="jpeg,jpg,png"
				on:change={handleImagePrev}
				class="absolute top-[0%] right-[0%] bottom-[0%] left-[0%] opacity-0 cursor-pointer"
			/>
		</div>
		<div class="col-span-full flex flex-wrap gap-x-4 gap-y-2 items-center">
			{#each imgsPrev as img, i (`imgPrev${i}${img}`)}
				<div class="aspect-square h-20 border border-shading rounded-xl overflow-hidden relative">
					<img src={img.value} alt="image{i}" class="w-full h-full object-cover" />
					<button
						type="button"
						on:click={() => handleRemoveImage(img.name)}
						class="z-10 absolute top-1 right-1 p-1 bg-semi-light/75 rounded-xl hover:bg-semi-light trans"
						><Icon icon="solar:trash-bin-trash-line-duotone" width="18" /></button
					>
				</div>
			{/each}
		</div>

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
		<!-- Tags -->
		<div class="col-span-full">
			<label for="tagsInput">Tags</label>
			<div class="flex flex-wrap gap-2 mb-2">
				{#each tags as tag, i (tag)}
					<p class="p-2 rounded-full border-shading border flex items-center gap-x-1">
						{tag}
						<button class="text-danger hover:opacity-75 trans" on:click={() => handleDeleteTags(i)}>
							<Icon icon="solar:trash-bin-minimalistic-line-duotone" width="24" />
						</button>
					</p>
				{/each}
			</div>
			<input type="text" hidden name="tags" bind:this={tagsEle} />
			<input
				type="text"
				placeholder="Tags..."
				name="tagsInput"
				on:keyup={handleTags}
				class="input w-full"
			/>
			<p class="text-danger text-xs mt-1">{form?.errors?.tags ?? ''}</p>
		</div>

		<div class="" />
		<button type="submit" class="btn">Add New Product</button>
	</form>
</div>
