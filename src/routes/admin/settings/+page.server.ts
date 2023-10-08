export const load = async () => {
	const categories = await prisma.category.findMany();
	return { categories };
};
