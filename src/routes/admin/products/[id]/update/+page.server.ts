import { getAlertAsParams } from '$lib/helper/url.js';
import { prisma } from '$lib/server/prisma';
import { error, redirect } from '@sveltejs/kit';
import fs from 'fs/promises';
import sharp from 'sharp';

export const load = async ({ params }) => {
	const product = await prisma.product.findUnique({
		where: { id: params.id },
		include: { category: true, images: true }
	});
	const categories = await prisma.category.findMany();

	if (!product) throw error(404, 'product not found');

	return { product, categories };
};

/** @type {import('./$types').Actions} */
export const actions = {
	create: async ({ request, params }) => {
		const formValues = await request.formData();
		const errors: any = {};
		const images: any = formValues.getAll('imgs');
		const title = formValues.get('title') ?? '';
		const brand = formValues.get('brand') ?? '';
		const category = formValues.get('category') ?? '';
		const price = formValues.get('price') ?? '';
		const discount = formValues.get('discount') ?? '';
		const quantity = formValues.get('quantity') ?? '';
		const published = !!formValues.get('published') ?? false;
		const description = formValues.get('description') ?? '';
		const tags = formValues.get('tags') ?? '';
		const data = {
			images,
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

		// Check for errors, If there is any, don't continue
		if (!!Object.entries(errors).length) {
			return { data, errors };
		}

		// Update Product.
		await prisma.product.update({
			where: { id: params.id },
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

		if (images.length !== 0 || images[0].size !== 0) {
			// Prepare Images Data.
			const imagesData = images.map((image: File) => {
				const name = `${image.name.split('.')[0]}-${Date.now()}.webp`;
				return {
					name,
					path: `/data/${params.id}/${name}`,
					type: image.type,
					productId: params.id
				};
			});
			// Optimize then store images in local file system.
			const path = `static/data/${params.id}`;
			await fs.mkdir(path, { recursive: true });
			images.forEach(async (image: any, i: number) => {
				await sharp(await image.arrayBuffer())
					.resize(1280)
					.webp()
					.toFile(`${path}/${imagesData[i].name}`);
			});
			// Store Image Data In DB.
			await prisma.images.createMany({ data: imagesData });
		}

		// Response & redirect to product page.
		const alert = getAlertAsParams(
			'success',
			`Product "${params.id} has been updated successfully!"`
		);
		throw redirect(303, '/admin/products/' + params.id + alert);
	}
};
