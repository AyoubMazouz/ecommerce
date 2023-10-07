<script>
	import Alert from '$lib/components/Alert.svelte';
	import alertStore from '../../stores/alter';

	$: console.log($alertStore);
</script>

<slot />
<Alert />
