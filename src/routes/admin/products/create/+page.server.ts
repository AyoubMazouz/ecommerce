import { writeFile } from 'fs/promises';
import { getAlertAsParams } from '$lib/helper/url.js';
import { redirect } from '@sveltejs/kit';

export const load = async () => {
	return { categories: await prisma.category.findMany() };
};

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

		const dbRes = await prisma.product.create({
			data: {
				title: title.toString(),
				brand: brand.toString(),
				category: { connect: { id: Number(category.toString()) } },
				price: Number(price.toString()),
				discount: Number(price.toString()),
				quantity: Number(quantity.toString()),
				published: Boolean(published.toString()),
				description: description.toString()
			}
		});

		const alert = getAlertAsParams(
			'success',
			`Product "${dbRes.id} has been created successfully!"`
		);

		throw redirect(303, '/admin/products' + alert);
	},
	test: async ({ request }) => {
		const formValues = await request.formData();
		const imgs: any = formValues.getAll('imgs');
		if (imgs) {
			try {
				imgs.forEach(async (img: File, i: number) => {
					let ext: any = img.name.split('.');
					ext = ext[ext.length - 1];
					await writeFile(`static/data/0/${i}.${ext}`, Buffer.from(await img.arrayBuffer()));
				});
			} catch (err: any) {
				console.error(err);
				if (err.code === 'EEXIST') {
					const alert = getAlertAsParams('danger', `Directory already exists!`);
				}
			}
		}
	}
};
