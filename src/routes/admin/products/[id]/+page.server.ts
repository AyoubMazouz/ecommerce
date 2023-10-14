import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const product = await prisma.product.findUnique({
		where: { id: params.id },
		include: { category: true, images: true }
	});

	if (!product) throw error(404, 'product not found');

	return { product };
};
