<script>
	import { page } from '$app/stores';
	import Alert from '$lib/components/Alert.svelte';
	import alertStore from '../../stores/alterStore';

	$: {
		const type = $page.url.searchParams.get('alertType');
		const body = $page.url.searchParams.get('alertBody');
		if (type && body) alertStore.set(type, body);
	}
</script>

<Alert />

<slot />
