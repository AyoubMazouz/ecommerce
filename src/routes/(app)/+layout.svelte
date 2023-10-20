<script lang="ts">
	import { page } from '$app/stores';
	import alertStore from '../../lib/stores/alterStore';
	import Logo from '$lib/Logo.svelte';
	import { ADDRESS, EMAIL, PHONE, WORK_HOURS } from '$lib/constants.js';
	import Alert from '$lib/components/Alert.svelte';
	import menuStore from '$lib/stores/menuStore';
	import Icon from '$lib/components/Icon.svelte';
	import { fade, fly } from 'svelte/transition';

	$: {
		const type = $page.url.searchParams.get('alertType');
		const body = $page.url.searchParams.get('alertBody');
		if (type && body) alertStore.set(type, body);
		$page.url.searchParams.delete('alertType');
		$page.url.searchParams.delete('alertBody');
	}

	export let data;
	$: currUser = data.currUser;
	let searchModel = false;
	let mobileSubMenu = [false, ''];
	$: if ($menuStore !== 'mobileMenu') mobileSubMenu = [false, ''];
</script>

<!-- Mobile Menu -->
{#if $menuStore === 'mobileMenu'}
	<div
		in:fade={{ delay: 200, duration: 600 }}
		out:fade={{ duration: 200 }}
		class="z-20 absolute bg-dark/90 w-[100vw] h-[100vh]"
	/>

	<button
		in:fade={{ delay: 600, duration: 200 }}
		out:fade={{ duration: 200 }}
		on:click={() => menuStore.clear()}
		class="z-20 btn-flat absolute top-2 right-2 text-light hover:text-dark"
	>
		<Icon icon="return" size="lg" />
	</button>
	<div
		in:fly={{ x: -750, duration: 200 }}
		out:fly={{ x: -750, duration: 200 }}
		class="z-20 absolute top-[0%] bottom-[0%] left-[0%] w-[80vw] bg-light text-semi-dark flex flex-col text-lg font-semibold"
	>
		<Logo className="my-6 px-4" />
		<a href="/" class="p-4 border-l-4 border-primary hover:bg-primary hover:text-semi-light trans"
			>Home</a
		>
		<a
			href="/event"
			class="p-4 border-l-4 border-primary hover:bg-primary hover:text-semi-light trans">Events</a
		>
		<a
			href="/products"
			class="p-4 border-l-4 border-primary group hover:bg-primary hover:text-semi-light trans flex justify-between items-center {mobileSubMenu[0] &&
				'bg-primary text-semi-light'}"
			>Products
			<button on:click={() => (mobileSubMenu = [!mobileSubMenu[0], ''])}>
				<Icon
					icon="dropDown"
					size="lg"
					className="trans group-hover:text-semi-light group-hover:rotate-180 {mobileSubMenu[0]
						? 'rotate-180 text-semi-light'
						: 'text-primary'}"
				/>
			</button>
		</a>
		{#if mobileSubMenu[0]}
			{#each data.categories as category (`mobileMenu${category.name}`)}
				<div
					class="px-4 py-2 bg-semi-light trans text-base group hover:bg-primary hover:text-semi-light flex justify-between items-center {mobileSubMenu[1] ===
						category.id && 'bg-primary/50 text-semi-light'}"
				>
					<a
						href="/"
						class="w-full border-l-[3px] border-primary/50 hover:border-semi-light trans pl-4"
						>{category.name}</a
					>
					<button on:click={() => (mobileSubMenu[1] = mobileSubMenu[1] ? '' : category.id)}>
						<Icon
							icon="dropDown"
							className="trans  group-hover:text-semi-light group-hover:rotate-180 {mobileSubMenu[1] ===
							category.id
								? 'rotate-180 text-semi-light'
								: 'text-primary'}"
						/>
					</button>
				</div>
				{#if mobileSubMenu[1] === category.id}
					{#each category.subCategories as SubCategory (`mobileMenu${SubCategory.name}`)}
						<div
							class="pr-4 pl-8 py-2 hover:bg-primary bg-shading hover:text-semi-light trans text-base font-medium cursor-pointer"
						>
							<a
								href="/"
								class="w-full pl-4 border-l-[3px] border-primary/50 hover:border-semi-light trans"
								>{SubCategory.name}
							</a>
						</div>
					{/each}
				{/if}
			{/each}
		{/if}
		<a
			href="/promo"
			class="p-4 border-l-4 border-primary hover:bg-primary hover:text-semi-light trans">Promo</a
		>
		<a
			href="/contact"
			class="p-4 border-l-4 border-primary hover:bg-primary hover:text-semi-light trans">Contact</a
		>
	</div>
{/if}

<!-- Nav -->
<nav class="flex flex-col items-center w-full border-b border-accent">
	<!-- Left -->
	<div class="main-container padding flex items-center justify-between">
		<div class="w-1/5 flex gap-x-2 items-center">
			<button class="md:hidden" on:click={() => menuStore.set('mobileMenu')}>
				<Icon icon="menu" size="lg" />
			</button>
			<div>
				<Logo />
			</div>
		</div>

		<!-- Middle -->
		<div class="hidden md:flex justify-center items-center gap-x-6 font-semibold">
			<a href="/">Home</a>
			<a href="/events">Events</a>
			<a
				href="/products"
				class="flex gap-x-1 items-end py-5 font-semibold"
				on:mouseenter={() => menuStore.set('navCat')}
				on:mouseleave={() => menuStore.clear()}
				>Categories <Icon icon="dropDown" size="sm" />
				{#if $menuStore === 'navCat'}
					<div
						class="absolute right-[0%] left-[0%] top-[6%] bg-light p-4 border-b border-shading rounded-b-xl shadow-xl flex justify-center"
					>
						<div class="main-container flex gap-x-12 gap-y-4 flex-wrap">
							{#each data.categories as category (category.name)}
								<div class="flex flex-col">
									<a
										href="/products?cat={category.id}"
										class="text-xl capitalize font-semibold hover:underline hover:opacity-75 trans mb-2"
										>{category.name}
									</a>
									{#if category?.subCategories}
										{#each category.subCategories as subCategory (subCategory.name)}
											<a
												href="/products?subCat={subCategory.id}"
												class="capitalize text-semi-dark text-sm hover:underline hover:text-primary/75 trans"
												>{subCategory.name}</a
											>
										{/each}
									{/if}
								</div>
							{/each}
						</div>
					</div>
				{/if}
			</a>
			<a href="/promo" class="flex gap-x-1 items-center font-bold text-danger"
				>Promo<Icon icon="promo" /></a
			>
			<a href="/contact">Contact</a>
		</div>

		<!-- right -->
		<div class="w-1/5 flex justify-end items-center gap-x-6 py-2">
			<!-- Cart -->
			<a href="/cart" class="btn-flat">
				<Icon icon="cart" size="lg" />
			</a>
			<!-- Profile -->
			<div class="relative">
				<button
					on:click={() => menuStore.set('profile')}
					class="relative h-10 w-10 rounded-full shadow-xl overflow-hidden"
				>
					<img
						src={currUser
							? `https://ui-avatars.com/api/?name=${currUser.firstName}+${currUser.lastName}&background=random&color=random`
							: ''}
						alt=""
						class="w-full h-full object-cover hover:scale-110 trans"
					/>
				</button>
				{#if $menuStore === 'profile'}
					<div
						class="z-10 absolute top-[100%] right-[0%] bg-semi-light rounded-xl shadow-xl border border-shading overflow-hidden font-semibold text-sm"
					>
						{#if currUser}
							<a
								href="/admin"
								class="flex gap-x-2 items-center p-2 pr-6 hover:bg-primary hover:text-semi-light trans whitespace-nowrap border-b border-shading"
							>
								<Icon icon="admin" />
								Dashboard
							</a>
							<a
								href="/favorite"
								class="flex gap-x-2 items-center p-2 pr-6 hover:bg-primary hover:text-semi-light trans whitespace-nowrap border-b border-shading"
							>
								<Icon icon="favorite" />
								Favorites
							</a>
							<form
								action="/logout"
								method="POST"
								class="w-full p-2 pr-6 hover:bg-danger hover:text-danger-dark text-danger cursor-pointer"
							>
								<button type="submit" class="flex gap-x-2 items-center trans whitespace-nowrap">
									<Icon icon="login" />
									Log Out
								</button>
							</form>
						{:else}
							<a
								href="/login"
								class="flex gap-x-2 items-center p-2 pr-6 hover:bg-primary hover:text-semi-light trans whitespace-nowrap"
							>
								<Icon icon="login" />
								Sign In
							</a>
							<a
								href="/login"
								class="flex gap-x-2 items-center p-2 pr-6 hover:bg-primary hover:text-semi-light trans whitespace-nowrap border-t border-shading"
							>
								<Icon icon="login" />
								Log In
							</a>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</div>
</nav>

<!-- Search -->
{#if searchModel}
	<div
		class="absolute top-[0%] bottom-[0%] left-[0%] right-[0%] bg-dark/75 flex justify-center py-20"
	>
		<div class="max-w-container">
			<div class="relative">
				<input type="text" placeholder="Search..." class="w-full p-3 text-lg rounded shadow" />
				<button class="absolute bottom-[50%] translate-y-[50%] right-3 btn">
					<Icon icon="promo" />
				</button>
			</div>
		</div>
		<!-- Close -->
		<button class="absolute top-3 right-3 text-light btn">
			<Icon icon="promo" />
		</button>
	</div>
{/if}

<Alert />

<!-- Main -->
<slot />

<!-- Footer -->

<footer class="bg-dark text-semi-light flex flex-col items-center pt-12 p-4 mt-24">
	<div
		class="main-container flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8 pb-12"
	>
		<!-- About us -->
		<div id="about" class="lg:max-w-[33%]">
			<h1 class="text-xl font-semibold mb-4 text-shading">About Us</h1>
			<p class="indent-2 mb-4">
				Getting dressed up and traveling with good friends makes for a shared, unforgettable
				experience.
			</p>
			<Logo />
		</div>
		<!-- Contact -->
		<div class="lg:max-w-[33%] text-sm space-y-2">
			<h1 class="text-xl font-semibold mb-4 text-shading">Contact Info</h1>
			<div class="flex items-center gap-x-2">
				<Icon icon="phone" />
				<span>{PHONE}</span>
			</div>
			<div class="flex items-center gap-x-2">
				<Icon icon="email" />
				<span>{EMAIL}</span>
			</div>
			<div class="flex items-center gap-x-2">
				<Icon icon="location" />
				<span>{ADDRESS}</span>
			</div>
			<div class="flex items-center gap-x-2">
				<Icon icon="time" />
				<span>{WORK_HOURS}</span>
			</div>
		</div>
		<!-- News Letter -->
		<div class="space-y-2 lg:max-w-[33%]">
			<h1 class="text-xl font-semibold mb-4 text-shading">Newsletter</h1>
			<p class="">Don't miss a thing! Sign up to receive daily deals.</p>
			<input type="email" name="email" placeholder="Your Email Address" class="input w-full" />
			<button class="btn w-full">Subscribe</button>
		</div>
	</div>

	<div class="border-t-2 border-t-semi-light/10 w-full" />

	<div class="main-container pt-4">
		<div class="flex flex-wrap gap-4 text-sm">
			<a href="/" class="hover:underline opacity-75 trans">Home</a>
			<a href="/categories" class="hover:underline opacity-75 trans">Categories</a>
			<a href="/events" class="hover:underline opacity-75 trans">Events</a>
			<a href="/contact" class="hover:underline opacity-75 trans">Contact</a>
		</div>
	</div>
	<div class="mt-4 text-xs text-center">
		<p>
			<Icon icon="copyRight" size="sm" className="inline-block" /> Copyright SACA | 2023 DevelopedBy
			Mazouz
		</p>
	</div>
</footer>
