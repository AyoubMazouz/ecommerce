<script lang="ts">
	import Icon from '@iconify/svelte';

	type SizeT = 'sm' | 'md' | 'lg';
	type IconT =
		| 'dropDown'
		| 'login'
		| 'promo'
		| 'email'
		| 'location'
		| 'time'
		| 'phone'
		| 'menu'
		| 'cart'
		| 'return'
		| 'copyRight'
		| 'price'
		| 'discount'
		| 'rating'
		| 'quantity'
		| 'published'
		| 'listStyle'
		| 'cardStyle'
		| 'sort'
		| 'addItem'
		| 'popular'
		| 'favorite'
		| 'admin'
		| 'edit'
		| 'success'
		| 'danger'
		| 'delete'
		| 'delivery'
		| string;

	const ICONS: any = {
		dropDown: 'solar:alt-arrow-down-linear',
		login: 'solar:login-3-line-duotone',
		promo: 'solar:tag-line-duotone',
		email: 'solar:letter-line-duotone',
		location: 'solar:map-line-duotone',
		time: 'solar:hourglass-line-duotone',
		phone: 'solar:phone-line-duotone',
		menu: 'solar:hamburger-menu-line-duotone',
		cart: 'solar:cart-large-4-line-duotone',
		return: 'solar:undo-left-round-line-duotone',
		copyRight: 'solar:copyright-line-duotone',
		favorite: 'solar:heart-angle-line-duotone',
		price: 'solar:dollar-minimalistic-line-duotone',
		discount: 'solar:tag-price-line-duotone',
		rating: 'solar:star-line-duotone',
		quantity: 'solar:gas-station-line-duotone',
		published: 'solar:global-line-duotone',
		listStyle: 'solar:posts-carousel-vertical-line-duotone',
		cardStyle: 'solar:notes-line-duotone',
		sort: 'solar:sort-from-bottom-to-top-line-duotone',
		addItem: 'solar:inbox-in-bold',
		popular: 'solar:cup-first-line-duotone',
		box: 'solar:box-line-duotone',
		admin: 'solar:shield-user-line-duotone',
		edit: 'solar:pen-new-square-line-duotone',
		success: 'solar:check-square-line-duotone',
		danger: 'solar:close-square-line-duotone',
		delete: 'solar:trash-bin-2-line-duotone',
		delivery: 'solar:delivery-line-duotone'
	};

	export let icon: IconT;
	export let size: SizeT = 'md';
	export let className = '';

	$: width = size === 'sm' ? '16' : size === 'md' ? '22' : '28';
	$: _icon = ICONS.hasOwnProperty(icon) ? ICONS[icon] : icon;
</script>

<Icon icon={_icon} {width} class={className} />
