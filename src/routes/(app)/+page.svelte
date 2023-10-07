<script lang="ts">
	// @ts-nocheck

	import Logo from '$lib/Logo.svelte';
	import Icon from '@iconify/svelte';
	import { categories } from '$lib/constants.js';

	export let data;
	$: currUser = data.currUser;
	let currDropDown = '';
	let currMobileDropDown = '';
	let dropDownTimeOut;
	let search = '';
	let searchModel = false;
	let mobileMenu = false;

	function handleSearch() {
		//
	}
	function handleToggleSearchModel() {
		searchModel = !searchModel;
	}
	function handleToggleMobileMenu() {
		mobileMenu = !mobileMenu;
	}

	// document.querySelector('body')?.classList.toggle('stop-scrolling');
	function handleOpenDropDown(dropDownName) {
		if (dropDownTimeOut) {
			clearTimeout(dropDownTimeOut);
		}
		currDropDown = dropDownName;
	}
	function handleCloseDropDown() {
		dropDownTimeOut = setTimeout(() => {
			currDropDown = '';
			clearTimeout(dropDownTimeOut);
		}, 500);
	}
	function handleToggleMobileDropDown(dropDownName) {
		if (dropDownName === currMobileDropDown) {
			currMobileDropDown = '';
		} else {
			currMobileDropDown = dropDownName;
		}
	}
</script>

<nav class="flex flex-col items-center w-full border-b border-accent">
	<!-- Top Nav -->
	<div class="max-w-container flex items-center justify-between pt-3">
		<!-- Mobile Menu -->
		<div>
			<button on:click={handleToggleMobileMenu}>
				<Icon icon="carbon:menu" width="22px" />
			</button>

			<!-- Categories -->
			{#if mobileMenu}
				<div
					class="z-30 absolute top-[0%] bottom-[0%] left-[0%] right-[0%] bg-dark/75 text-light flex flex-col px-2 md:px-3 lg:px-4"
				>
					{#each categories as cat}
						<button class="relative text-left uppercase tracking-tighter">
							<div class="flex justify-between items-center">
								<a href="/categories/{cat.category}">{cat.category}</a>
								<button on:click={() => handleToggleMobileDropDown(cat.category)}>
									<Icon icon="carbon:chevron-down" width="22px" />
								</button>
							</div>
							{#if currMobileDropDown === cat.category}
								<div
									class="flex gap-y-1.5 flex-col border border-accent rounded shadow p-4 capitalize font-medium"
								>
									{#each cat.subCategories as subCat, i (`${subCat}subCat`)}
										<a href="/categories/{cat.category}/{subCat}" class="hover:text-secondary"
											>{subCat}</a
										>
										{#if i < cat.subCategories.length - 1}
											<div class="border border-accent" />
										{/if}
									{/each}
								</div>
							{/if}
						</button>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Logo -->
		<div>
			<Logo />
		</div>
		<!-- Other -->
		<div class="flex items-center gap-x-6">
			<!-- Search -->
			<button on:click={handleToggleSearchModel} class="icon-btn">
				<Icon icon="carbon:search" width="22px" />
			</button>
			<!-- Help -->
			<div class="relative">
				<button
					on:mouseenter={() => handleOpenDropDown('help')}
					on:mouseleave={handleCloseDropDown}
					class="btn-secondary flex items-center gap-x-1"
				>
					<span>Help</span>
					<Icon
						icon="carbon:chevron-down"
						width="22px"
						class="{currDropDown === 'help'
							? 'rotate-180'
							: 'rotate-0'} transition-all duration-200"
					/>
				</button>
				{#if currDropDown === 'help'}
					<div
						class="z-20 absolute top-[110%] right-[50%] translate-x-[50%] bg-light shadow rounded p-4 flex flex-col gap-y-1.5 border border-accent capitalize font-medium"
					>
						<a href="contact" class="hover:text-secondary"> Contact </a>
						<div class="border border-accent" />
						<a href="about" class="hover:text-secondary"> About </a>
					</div>
				{/if}
			</div>
			<!-- Cart -->
			<a href="/cart" class="icon-btn">
				<Icon icon="carbon:shopping-cart" width="22px" />
			</a>
			<!-- Profile / Login -->
			{#if currUser}
				<form action="/logout" method="POST">
					<button class="btn">
						LogOut
						<Icon icon="carbon:login" width="22px" />
					</button>
				</form>
			{:else}
				<a href="/login" class="btn">
					LogIn
					<Icon icon="carbon:login" width="22px" />
				</a>
			{/if}
		</div>
	</div>
	<!-- Bottom Nav Categories -->
	<div class="max-w-container flex justify-center items-center gap-x-6 py-3">
		{#each categories as cat}
			<button
				on:mouseenter={() => handleOpenDropDown(cat.category)}
				on:mouseleave={handleCloseDropDown}
				class="relative text-left uppercase tracking-tighter"
			>
				<a href="/categories/{cat.category}">{cat.category}</a>
				{#if currDropDown === cat.category}
					<div
						class="z-20 bg-light flex gap-y-1.5 flex-col border border-accent rounded shadow p-4 w-56 absolute top-[110%] right-[50%] translate-x-[50%] capitalize font-medium"
					>
						{#each cat.subCategories as subCat, i (`${subCat}subCat`)}
							<a href="/categories/{cat.category}/{subCat}" class="hover:text-secondary">{subCat}</a
							>
							{#if i < cat.subCategories.length - 1}
								<div class="border border-accent" />
							{/if}
						{/each}
					</div>
				{/if}
			</button>
		{/each}
	</div>
</nav>

<!-- Search -->
{#if searchModel}
	<div
		class="absolute top-[0%] bottom-[0%] left-[0%] right-[0%] bg-dark/75 flex justify-center py-20"
	>
		<div class="max-w-container">
			<div class="relative">
				<input
					type="text"
					bind:value={search}
					placeholder="Search..."
					class="w-full p-3 text-lg rounded shadow"
				/>
				<button on:click={handleSearch} class="absolute bottom-[50%] translate-y-[50%] right-3 btn">
					<Icon icon="carbon:search" width="22px" />
				</button>
			</div>
		</div>
		<!-- Close -->
		<button on:click={handleToggleSearchModel} class="absolute top-3 right-3 text-light btn">
			<Icon icon="carbon:close-large" width="22px" />
		</button>
	</div>
{/if}
