import { prisma } from '$lib/server/prisma';
export const load = async () => {
	const products = await prisma.product.findMany({
		include: { category: true }
	});
	return { products };
};
