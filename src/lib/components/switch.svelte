<script lang="ts">
	export let value: boolean;
	export let name: string;
	export let className = '';
	$: bool = value;
</script>

<button
	type="button"
	on:click={() => {
		bool = !bool;
	}}
	class="rounded-full w-[3.2rem] h-6 overflow-hidden border border-shading flex trans {className}"
>
	<div
		class="bg-primary rounded-full h-full w-6 trans border-light border {bool
			? 'translate-x-6'
			: 'translate-x-0 bg-shading'}"
	/>
</button>
<input type="checkbox" {name} hidden bind:value={bool} />
