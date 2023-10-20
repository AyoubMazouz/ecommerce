import { prisma } from '$lib/server/prisma.js';

export async function load({ locals, params }) {
	const categoryId = params?.cat;
	const subCategoryId = params.subCat;
	let query: any = {};
	if (categoryId) {
		query = { where: { categoryId } };
	}
	if (subCategoryId) {
		query = { where: { subCategoryId } };
	}
	const products = await prisma.product.findMany({ ...query, include: { images: true } });
	console.log(products);
	return { currUser: locals.currUser, products };
}
