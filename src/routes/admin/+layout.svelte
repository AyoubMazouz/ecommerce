<script lang="ts">
	import { page } from '$app/stores';
	import Logo from '$lib/Logo.svelte';
	import Alert from '$lib/components/Alert.svelte';
	import Icon from '@iconify/svelte';
	import alertStore from '../../lib/stores/alterStore.js';

	export let data;
	let currPath: string, pathList: string[];
	$: {
		currPath = $page.url.pathname.replace('/admin/', '');
		pathList = currPath.split('/');
	}

	// Set alert coming from URL.
	$: {
		const type = $page.url.searchParams.get('alertType');
		const body = $page.url.searchParams.get('alertBody');
		if (type && body) alertStore.set(type, body);
		$page.url.searchParams.delete('alertType');
		$page.url.searchParams.delete('alertBody');
	}
</script>

<Alert />

<div class="flex w-full min-w-[960px]">
	<!-- Nav -->
	<div
		class="flex flex-col justify-between h-screen border-r border-shading bg-semi-light lg:w-[15rem] xl:w-[20rem] p-2 lg:p-4"
	>
		<div>
			<div class="text-center">
				<Logo />
			</div>
			<!-- Links -->
			<div class="flex flex-col gap-y-2">
				<a
					href="/admin/orders"
					class="text-semi-dark font-semibold p-3 hover:bg-shading hover:text-semi-dark rounded-xl trans flex justify-center lg:justify-start items-center gap-x-4 {currPath.startsWith(
						'orders'
					) && 'bg-secondary/25'}"
				>
					{#if currPath.startsWith('orders')}
						<Icon icon="solar:reorder-line-duotone" width="24px" />
					{:else}
						<Icon icon="solar:reorder-line-duotone" width="24px" />
					{/if}
					<span class="hidden lg:block">Orders</span>
				</a>
				<a
					href="/admin/products"
					class="text-semi-dark font-semibold p-3 hover:bg-shading hover:text-semi-dark rounded-xl trans flex justify-center lg:justify-start items-center gap-x-4 {currPath.startsWith(
						'products'
					) && 'bg-secondary/25'}"
				>
					{#if currPath.startsWith('products')}
						<Icon icon="solar:box-bold" width="24px" />
					{:else}
						<Icon icon="solar:box-linear" width="24px" />
					{/if}
					<span class="hidden lg:block">Products</span>
				</a>
				<a
					href="/admin/messages"
					class="text-semi-dark font-semibold p-3 hover:bg-shading hover:text-semi-dark rounded-lg trans flex justify-center lg:justify-start items-center gap-x-4 {currPath.startsWith(
						'messages'
					) && 'bg-secondary/25'}"
				>
					{#if currPath.startsWith('messages')}
						<Icon icon="solar:letter-bold" width="24px" />
					{:else}
						<Icon icon="solar:letter-linear" width="24px" />
					{/if}
					<span class="hidden lg:block">Messages</span>
				</a>
			</div>
		</div>

		<div class="flex flex-col gap-y-2">
			<a
				href="/admin/support"
				class="text-semi-dark font-semibold p-3 hover:bg-shading hover:text-semi-dark rounded-xl trans flex items-center justify-center lg:justify-start gap-x-4 {currPath.startsWith(
					'support'
				) && 'bg-secondary/25'}"
			>
				{#if currPath.startsWith('support')}
					<Icon icon="solar:chat-square-code-bold" width="24px" />
				{:else}
					<Icon icon="solar:chat-square-code-linear" width="24px" />
				{/if}
				<span class="hidden lg:block">Support</span>
			</a>
			<a
				href="/admin/settings"
				class="text-semi-dark font-semibold p-3 hover:bg-shading hover:text-semi-dark rounded-xl trans flex items-center justify-center lg:justify-start gap-x-4 {currPath.startsWith(
					'settings'
				) && 'bg-secondary/25'}"
			>
				{#if currPath.startsWith('settings')}
					<Icon icon="solar:settings-bold" width="24px" />
				{:else}
					<Icon icon="solar:settings-linear" width="24px" />
				{/if}
				<span class="hidden lg:block">Settings</span>
			</a>
			<a
				href=""
				class="flex gap-x-4 items-center lg:px-4 p-2 rounded-xl border border-shading bg-light hover:opacity-75 trans"
			>
				<div class="overflow-hidden aspect-square h-8 rounded-full border border-shading">
					<img
						src="https://miro.medium.com/v2/resize:fill:32:32/1*dmbNkD5D-u45r44go_cf0g.png"
						alt=""
						class="object-cover w-full h-full"
					/>
				</div>
				<p
					class="hidden lg:block text-sm xl:text-base capitalize font-semibold text-semi-dark whitespace-nowrap"
				>
					{data.currUser.firstName}
					{data.currUser.lastName}
				</p>
			</a>
		</div>
	</div>
	<div class="w-full h-screen overflow-y-scroll">
		<!-- PaTH -->
		<div class="flex items-center gap-x-4 capitalize padding mt-2">
			<button class="btn-flat mr-4">
				<a href="/admin/{pathList.slice(0, pathList.length - 1).join('/')}">
					<Icon icon="solar:arrow-left-outline" width="24px" class="text-semi-dark" />
				</a>
			</button>
			<a href="/admin" class="hover:underline text-semi-dark trans">Home</a>
			<Icon icon="solar:alt-arrow-right-outline" width="16px" class="text-semi-dark" />
			{#each pathList as path, i (path)}
				{#if i < pathList.length - 1}
					<a
						href="/admin/{pathList.slice(0, i + 1).join('/')}"
						class="hover:underline text-semi-dark trans">{path}</a
					>
					<Icon icon="solar:alt-arrow-right-outline" width="16px" class="text-semi-dark" />
				{:else}
					<p class="text-dark underline">
						{path}
					</p>
				{/if}
			{/each}
		</div>
		<slot />
	</div>
</div>
