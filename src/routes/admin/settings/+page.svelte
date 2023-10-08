<script lang="ts">
	export let data;
</script>

<div class="padding w-full mt-6">
	<div class="">
		<h1 class="text-2xl font-bold mb-2">Categories:</h1>
		<p>
			This categorize products, Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
			officiis laudantium maiores odit quo maxime quibusdam praesentium repellendus totam!
		</p>
		<div class="flex flex-wrap gap-2 mt-2">
			{#each data.categories as cat (cat)}
				<div class="font-semibold text-sm">
					{cat.name}
				</div>
			{/each}
		</div>
		<button class="btn">
			<a href="/admin/settings/categories">Edit List</a>
		</button>
	</div>
</div>
