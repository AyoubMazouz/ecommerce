<script lang="ts">
	import { page } from '$app/stores';
	import Logo from '$lib/Logo.svelte';
	import Icon from '@iconify/svelte';

	// export let data;
	let currPath: string, pathList: string[];
	$: {
		currPath = $page.url.pathname.replace('/admin/', '');
		pathList = currPath.split('/');
	}
</script>

<div class="flex w-full">
	<!-- Nav -->
	<div
		class="flex flex-col justify-between w-[28rem] h-screen border-r border-shading bg-semi-light"
	>
		<div class="">
			<div class="p-4 text-center">
				<Logo />
			</div>
			<!-- Links -->
			<div class="flex flex-col gap-y-2 p-4">
				<a
					href="/admin/orders"
					class="text-semi-dark font-semibold p-3 hover:bg-shading hover:text-semi-dark rounded-xl trans flex items-center gap-x-4 {currPath.startsWith(
						'orders'
					) && 'bg-secondary/25'}"
				>
					{#if currPath.startsWith('orders')}
						<Icon icon="solar:reorder-line-duotone" width="24px" />
					{:else}
						<Icon icon="solar:reorder-line-duotone" width="24px" />
					{/if}
					Orders
				</a>
				<a
					href="/admin/products"
					class="text-semi-dark font-semibold p-3 hover:bg-shading hover:text-semi-dark rounded-xl trans flex items-center gap-x-4 {currPath.startsWith(
						'products'
					) && 'bg-secondary/25'}"
				>
					{#if currPath.startsWith('products')}
						<Icon icon="solar:box-bold" width="24px" />
					{:else}
						<Icon icon="solar:box-linear" width="24px" />
					{/if}
					Products
				</a>
				<a
					href="/admin/messages"
					class="text-semi-dark font-semibold p-3 hover:bg-shading hover:text-semi-dark rounded-xl trans flex items-center gap-x-4 {currPath.startsWith(
						'messages'
					) && 'bg-secondary/25'}"
				>
					{#if currPath.startsWith('messages')}
						<Icon icon="solar:letter-bold" width="24px" />
					{:else}
						<Icon icon="solar:letter-linear" width="24px" />
					{/if}
					Messages
				</a>
			</div>
		</div>

		<div class="p-4 flex flex-col gap-y-2">
			<a
				href="/admin/support"
				class="text-semi-dark font-semibold p-3 hover:bg-shading hover:text-semi-dark rounded-xl trans flex items-center gap-x-4 {currPath.startsWith(
					'support'
				) && 'bg-secondary/25'}"
			>
				{#if currPath.startsWith('support')}
					<Icon icon="solar:chat-square-code-bold" width="24px" />
				{:else}
					<Icon icon="solar:chat-square-code-linear" width="24px" />
				{/if}
				Support
			</a>
			<a
				href="/admin/settings"
				class="text-semi-dark font-semibold p-3 hover:bg-shading hover:text-semi-dark rounded-xl trans flex items-center gap-x-4 {currPath.startsWith(
					'settings'
				) && 'bg-secondary/25'}"
			>
				{#if currPath.startsWith('settings')}
					<Icon icon="solar:settings-bold" width="24px" />
				{:else}
					<Icon icon="solar:settings-linear" width="24px" />
				{/if}
				Settings
			</a>
			<div
				class="flex gap-x-4 items-center font-semibold text-semi-dark px-4 py-2 rounded-2xl border border-shading bg-light"
			>
				<div class="overflow-hidden aspect-square h-[3.1rem] rounded-full border border-shading">
					<img
						src="https://miro.medium.com/v2/resize:fill:32:32/1*dmbNkD5D-u45r44go_cf0g.png"
						alt=""
						class="object-cover w-full h-full"
					/>
				</div>
				<div>My Username</div>
			</div>
		</div>
	</div>
	<div class="w-full">
		<div class="flex items-center gap-x-4 capitalize p-4">
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