<script>
	import alertStore from '../../stores/alter';
</script>

<div class="space-y-4 absolute z-20 bottom-4 left-4">
	{#each $alertStore as alert, i (`${i}${alert.body}`)}
		<div class="bg-semi-light rounded-xl border-shading border">
			{alert.body}
		</div>
	{/each}
</div>
