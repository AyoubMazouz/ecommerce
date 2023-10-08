<script lang="ts">
	import { enhance } from '$app/forms';
	import Icon from '@iconify/svelte';
	import alertStore from '../../../../stores/alterStore.js';

	export let data;
	export let form: any;

	// Set alert
	$: {
		if (form?.alert) alertStore.set(form.alert.type, form.alert.body);
		if (form?.errors) Object.entries(form.errors).forEach((e: any) => alertStore.set('danger', e));
	}

	function handleLowerCase(e: any) {
		if (e?.target) e.target.value = e.target.value.toLowerCase();
	}
</script>

<div class="padding w-full mt-6">
	<div class="">
		<p>
			This categorize products, Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
			officiis laudantium maiores odit quo maxime quibusdam praesentium repellendus totam!
		</p>
		<div class="flex flex-wrap gap-2 mt-2">
			{#each data.categories as cat (cat)}
				<div class="font-semibold text-sm flex gap-x-2 items-center bg-semi-light">
					{cat.name}
					<form method="POST" action="?/delete" use:enhance>
						<input type="hidden" name="id" value={cat.id} />
						<button><Icon icon="solar:trash-bin-trash-linear" width="24px" /> </button>
					</form>
				</div>
			{/each}
		</div>

		<form method="POST" action="?/create" use:enhance>
			<div class="col-span-full mt-6">
				<label for="category" class="flex items-start"
					>New Category <span class="text-danger text-xs">*</span></label
				>
				<div class="flex items-center gap-x-4">
					<input
						type="text"
						placeholder="Category..."
						name="category"
						on:keyup={handleLowerCase}
						required
						class="input w-full"
					/>
					<button class="btn">Add</button>
				</div>
				<p class="text-danger text-xs mt-1">{form?.errors?.category ?? ''}</p>
			</div>
		</form>
	</div>
</div>
