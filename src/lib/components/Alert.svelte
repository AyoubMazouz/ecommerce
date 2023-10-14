<script>
	import Icon from '@iconify/svelte';
	import alertStore from '../stores/alterStore';

	let _ = `text-danger border-danger-dark bg-danger text-warn border-warn-dark bg-warn 
		text-info border-info-dark bg-info text-success border-success-dark bg-success`;
</script>

{#if $alertStore.length !== 0}
	<div class="space-y-4 absolute z-20 bottom-4 left-4 text-sm">
		<button
			on:click={() => alertStore.clear()}
			class="btn-flat -mb-4 font-semibold text-sm flex gap-x-1 items-end justify-start"
			><Icon icon="solar:trash-bin-minimalistic-line-duotone" width="24" />Clear</button
		>
		{#each $alertStore as alert, i (`${i}${alert.body}`)}
			<div
				class="bg-{alert.type} text-{alert.type}-dark border-{alert.type}-dark rounded-xl border relative font-semibold p-2 gap-x-2 flex items-start"
			>
				{#if alert.type === 'danger'}
					<Icon icon="solar:danger-triangle-line-duotone" width="24" class="" />
				{:else if alert.type === 'warn'}
					<Icon icon="solar:shield-warning-line-duotone" width="24" class="" />
				{:else if alert.type === 'info'}
					<Icon icon="solar:info-circle-line-duotone" width="24" class="" />
				{:else}
					<Icon icon="solar:verified-check-line-duotone" width="24" class="" />
				{/if}
				<p class="max-w-[50ch]">
					{alert.body}
				</p>
				<button on:click={() => alertStore.clearById(alert.id)}
					><Icon icon="solar:close-circle-line-duotone" width="24" /></button
				>
			</div>
		{/each}
	</div>
{/if}
