import fs from 'fs/promises';
import sharp from 'sharp';
import { getAlertAsParams } from '$lib/helper/url.js';
import { fail, redirect } from '@sveltejs/kit';

export const load = async () => {
	return { categories: await prisma.category.findMany() };
};

/** @type {import('./$types').Actions} */
export const actions = {
	create: async ({ request }) => {
		const formValues = await request.formData();
		const errors: any = {};
		const imgs: any = formValues.getAll('imgs');
		const title = formValues.get('title') ?? '';
		const brand = formValues.get('brand') ?? '';
		const category = formValues.get('category') ?? '';
		const price = formValues.get('price') ?? '0';
		const discount = formValues.get('discount') ?? '0';
		const quantity = formValues.get('quantity') ?? '0';
		const published = !!formValues.get('published') ?? '';
		const description = formValues.get('description') ?? '';
		const tags = formValues.get('tags') ?? '';
		const data = {
			title,
			brand,
			category,
			price,
			discount,
			quantity,
			description,
			published,
			tags
		};

		// Validation
		if (imgs.length === 0 || imgs[0].size === 0)
			errors.imgs = 'Each product should at least have one image!';
		// Check for errors
		if (!!Object.entries(errors).length) return fail(400, { data, errors });

		const dbRes = await prisma.product.create({
			data: {
				title: title.toString(),
				brand: brand.toString(),
				published: Boolean(published.toString()),
				category: { connect: { id: category.toString() } },
				price: Number(price.toString()),
				discount: Number(discount.toString()),
				quantity: Number(quantity.toString()),
				description: description.toString(),
				tags: tags.toString()
			}
		});

		try {
			const imagesData = imgs.map((img: File) => {
				const name = `${img.name.split('.')[0]}-${Date.now()}.webp`;
				return {
					name,
					path: `/data/${dbRes.id}/${name}`,
					type: img.type,
					productId: dbRes.id
				};
			});

			const path = `static/data/${dbRes.id}`;
			await fs.mkdir(path, { recursive: true });
			imgs.forEach(async (image: any, i: number) => {
				await sharp(await image.arrayBuffer())
					.resize(1280)
					.webp()
					.toFile(`${path}/${imagesData[i].name}`);
			});

			await prisma.images.createMany({ data: imagesData });
		} catch (err: any) {
			console.error(err);
			return fail(400, {
				data,
				alert: { type: 'danger', body: JSON.stringify(err) }
			});
		}

		// Success.
		const alert = getAlertAsParams(
			'success',
			`Product "${dbRes.id} has been created successfully!"`
		);
		throw redirect(303, '/admin/products/' + dbRes.id + alert);
	}
};
