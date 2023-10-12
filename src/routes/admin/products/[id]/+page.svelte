<script lang="ts">
	import { onMount } from 'svelte';
	import Swiper from 'swiper';
	import 'swiper/swiper-bundle.css';

	export let data;
	let swiper: any;
	let swiperThumb;

	$: prod = data.product;

	onMount(() => {
		swiper = new Swiper('#swiper', {
			spaceBetween: 10
		});
		swiperThumb = new Swiper('#swiper-thumb', {
			spaceBetween: 10,
			slidesPerView: 8,
			freeMode: true,
			watchSlidesProgress: true,
			direction: 'vertical',
			thumbs: { swiper }
		});
	});
</script>

{#if prod}
	<div class="padding mt-6">
		<div class="flex justify-end">
			<a href="/admin/products/{prod.id}/update" class="btn">Update</a>
		</div>
		<div class="flex gap-4">
			<div class="flex gap-2">
				<div id="swiper-thumb" class="rounded-xl overflow-hidden h-96 w-12">
					<div class="swiper-wrapper">
						{#each prod.fileNames.split(',') as file, i (file)}
							<button on:click={() => swiper.slideTo(i)} class="swiper-slide">
								<img
									src="/data/{prod.id}/{file}"
									alt="{prod.title} ({prod.id} - {file})"
									class="w-full h-12 object-cover aspect-square rounded-xl overflow-hidden border border-shading"
								/>
							</button>
						{/each}
					</div>
				</div>
				<div id="swiper" class="h-96 w-96 rounded-xl overflow-hidden">
					<div class="swiper-wrapper h-full w-full">
						{#each prod.fileNames.split(',') as file (file)}
							<div class="swiper-slide w-full h-full rounded-xl overflow-hidden">
								<img
									src="/data/{prod.id}/{file}"
									alt="{prod.title} ({prod.id})"
									class="w-full h-full object-cover"
								/>
							</div>
						{/each}
					</div>
				</div>
			</div>
			<div class="">
				<p class="text-lg font-semibold">{prod.title}</p>
				<p>{prod.price}</p>
				<!-- <div class="flex gap-2">
					{#each prod.variants as vr (vr.name)}
						<div class="aspect-square h-14 w-14 overflow-hidden rounded-xl">
							<img
								src="/data/{prod.id}/{vr.fileNames.split(',')[0]}"
								alt="vr.name"
								class="w-full h-full object-cover"
							/>
						</div>
					{/each}
				</div> -->
				<p>{prod.description}</p>
			</div>
		</div>
	</div>
{/if}
