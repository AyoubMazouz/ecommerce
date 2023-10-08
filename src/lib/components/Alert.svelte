<script>
	import alertStore from '../../stores/alterStore';
</script>

<div class="space-y-4 absolute z-20 bottom-4 left-4 bg-red-500">
	{#each $alertStore as alert, i (`${i}${alert.body}`)}
		<div class="bg-semi-light rounded-xl border-shading border">
			{alert.body}
		</div>
	{/each}
</div>
