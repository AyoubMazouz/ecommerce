import { prisma } from '$lib/server/prisma.js';

export async function load({ locals }) {
	const categories = await prisma.category.findMany({ include: { subCategories: true } });
	return { currUser: locals.currUser, categories };
}
