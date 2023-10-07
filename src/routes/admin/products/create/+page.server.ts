import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	create: async ({ request }) => {
		const formValues = await request.formData();
		const errors: any = {};
		const title = formValues.get('title') ?? '';
		const brand = formValues.get('brand') ?? '';
		const category = formValues.get('category') ?? '';
		const price = formValues.get('price') ?? '0';
		const discount = formValues.get('discount') ?? '0';
		const quantity = formValues.get('quantity') ?? '0';
		const description = formValues.get('description') ?? '';
		const published = !!formValues.get('published') ?? '';

		// Validation
		if (title.length < 3) {
			errors.title = 'title should be at least 3 characters long!';
		}
		// Check for errors
		if (!!Object.entries(errors).length) {
			const data = { title, brand, category, price, discount, quantity, description, published };
			return { data, errors };
		}

		await prisma.product.create({
			data: {
				title: title.toString(),
				brand: brand.toString(),
				// category: {
				// 	connect: {
				// 		id: Number(category.toString())
				// 	}
				// },
				price: Number(price.toString()),
				discount: Number(price.toString()),
				quantity: Number(quantity.toString()),
				published: Boolean(published.toString()),
				description: description.toString()
			}
		});

		throw redirect(303, '/admin/products');
	}
};
