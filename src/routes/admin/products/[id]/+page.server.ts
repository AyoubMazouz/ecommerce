import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	if (/^\d+$/.test(params.id) === false) throw error(404, 'product not found');

	const product = await prisma.product.findUnique({
		where: { id: Number(params.id) },
		include: { category: true }
	});
	return { product };
};
