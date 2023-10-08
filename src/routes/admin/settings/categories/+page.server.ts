import { getAlertAsParams } from '$lib/helper/url.js';

export const load = async () => {
	const categories = await prisma.category.findMany();
	return { categories };
};

export const actions = {
	create: async ({ request }) => {
		const formValues = await request.formData();
		const errors: any = {};
		const category = formValues.get('category') ?? '';

		// Validation
		let dbRes = await prisma.category.findFirst({
			where: { name: category.toString() }
		});

		if (category.length < 2) {
			errors.category = 'Category should be at least 2 characters long!';
		} else if (dbRes?.name) {
			errors.category = `Category should be unique, ${category} already exists!`;
		}

		// Check for errors
		if (!!Object.entries(errors).length) {
			return { ok: false, errors };
		}

		// Insert Into db
		dbRes = await prisma.category.create({
			data: { name: category.toString() }
		});

		return {
			ok: true,
			alert: {
				type: 'success',
				body: `Category id "${dbRes.id} has been created successfully!"`
			}
		};
	},
	delete: async ({ request }) => {
		const formValues = await request.formData();
		const id = formValues.get('id') ?? '';

		// # TODO: must check if there are any product that fall into this category

		// delete
		await prisma.category.delete({
			where: { id: Number(id.toString()) }
		});

		return {
			ok: true,
			alert: {
				type: 'success',
				body: `Category id "${id} has been deleted!"`
			}
		};
	}
};
