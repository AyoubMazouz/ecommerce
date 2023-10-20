import { prisma } from '$lib/server/prisma';

export const load = async ({ url }) => {
	const categoryId = url.searchParams.get('cat') ?? 'all';
	const sortBy = url.searchParams.get('sortBy') ?? 'title';
	const sortDir = url.searchParams.get('sortDir') === 'asc' ? 'asc' : 'desc';
	const getRating = url.searchParams.get('rating') ?? '0';
	const rating = /^[0-5]$/.test(getRating) ? parseInt(getRating) : 0;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const options: any = { where: {}, orderBy: {} };

	// Category & SubCategory
	if (categoryId !== 'all') {
		options.where = { OR: [{ categoryId }, { subCategoryId: categoryId }] };
	}
	// Rating
	if (rating !== 0) {
		options.where = { rating: { gt: rating } };
	}
	// Sorting
	const sortOpt = ['title', 'price', 'rating', 'createdAt', 'discount', 'quantity'];
	if (sortOpt.includes(sortBy)) {
		options.orderBy[sortBy] = sortDir;
	}

	const products = async () =>
		await prisma.product.findMany({
			include: { category: true, images: true },
			...options
		});

	const categories = async () =>
		await prisma.category.findMany({
			include: { subCategories: true }
		});

	return { products: products(), categories: categories() };
};

export const actions = {
	deleteProduct: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id')?.toString() ?? '';

		// Verify PRoduct exists.
		const productFromDb = await prisma.product.findUnique({ where: { id } });
		if (!productFromDb)
			return {
				ok: false,
				alert: {
					type: 'warn',
					body: `Product id "${id}" not found!`
				}
			};

		// Delete Images then The product
		await prisma.images.deleteMany({ where: { productId: id } });
		await prisma.product.delete({ where: { id } });

		// Success
		return {
			ok: true,
			alert: {
				type: 'success',
				body: `Product id "${id}" has been deleted successfully!`
			}
		};
	},
	deleteProductMany: async ({ request }) => {
		const formData = await request.formData();
		const idsJson = formData.get('ids')?.toString() ?? '';
		const ids = JSON.parse(idsJson) as string[];

		// Delete Images then The product
		await prisma.images.deleteMany({ where: { productId: { in: ids } } });
		await prisma.product.deleteMany({ where: { id: { in: ids } } });

		// Success
		return {
			ok: true,
			alert: {
				type: 'success',
				body: `Product id "${ids.join(', ')}" has been deleted successfully!`
			}
		};
	}
};
