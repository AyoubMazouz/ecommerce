export const load = async () => {
	const categories = await prisma.category.findMany({ include: { subCategories: true } });
	return { categories };
};

export const actions = {
	createCategory: async ({ request }) => {
		const formValues = await request.formData();
		const errors: any = {};
		const name = formValues.get('name')?.toString()?.trim() ?? '';

		// Check if category name already exists & Validate
		let categoryFromDb = await prisma.category.findFirst({
			where: { name }
		});
		if (categoryFromDb)
			return {
				ok: false,
				alert: {
					type: 'warn',
					body: `Category name "${name}" already exists!`
				}
			};
		if (name.length <= 2)
			return {
				ok: false,
				alert: {
					type: 'warn',
					body: `Category name "${name}" must be at least 3 characters long!`
				}
			};

		// Insert
		await prisma.category.create({ data: { name } });

		// Success
		return {
			ok: true,
			alert: {
				type: 'success',
				body: `Category name "${name}" has been created successfully!`
			}
		};
	},
	updateCategory: async ({ request }) => {
		const formValues = await request.formData();
		const id = formValues.get('id')?.toString() ?? '';
		const name = formValues.get('name')?.toString() ?? '';

		// Check if Category Exists.
		const category = await prisma.category.findUnique({
			where: { id }
		});
		if (!category)
			return {
				ok: false,
				alert: {
					type: 'warn',
					body: `Category id "${id}" not found!`
				}
			};

		// Update
		await prisma.category.update({
			where: { id },
			data: {
				name
			}
		});

		// Success
		return {
			ok: true,
			alert: {
				type: 'success',
				body: `Category id "${id}" has been updated successfully`
			}
		};
	},
	deleteCategory: async ({ request }) => {
		const formValues = await request.formData();
		const id = formValues.get('id')?.toString() ?? '';

		// Get Categories.
		const category = await prisma.category.findUnique({
			where: { id },
			include: { products: true, subCategories: true }
		});

		// Check if there is any products related to this category
		if (category && category.products.length > 0)
			return {
				ok: false,
				alert: {
					type: 'danger',
					body: `Failed to delete category id "${id}" because it has product that are associated with it, make sure this category is not related to any products before deletion!"`
				}
			};

		// Delete SubCategories.
		if (category && category.subCategories.length > 0)
			await prisma.subCategory.deleteMany({
				where: { categoryId: id }
			});

		// delete
		await prisma.category.delete({
			where: { id: id.toString() }
		});

		// Success
		return {
			ok: true,
			alert: {
				type: 'success',
				body: `Category id "${id} has been deleted!"`
			}
		};
	}
};
