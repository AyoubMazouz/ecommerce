import fs from 'fs/promises';
import sharp from 'sharp';
import { getAlertAsParams } from '$lib/helper/url.js';
import { fail, redirect } from '@sveltejs/kit';

export const load = async () => {
	return { categories: await prisma.category.findMany({ include: { subCategories: true } }) };
};

/** @type {import('./$types').Actions} */
export const actions = {
	create: async ({ request }) => {
		const formValues = await request.formData();
		const errors: any = {};
		const images: any = formValues.getAll('imgs');
		const title = formValues.get('title') ?? '';
		const brand = formValues.get('brand') ?? '';
		const subCategory = formValues.get('subCategory') ?? '';
		const price = formValues.get('price') ?? '0';
		const discount = formValues.get('discount') ?? '0';
		const quantity = formValues.get('quantity') ?? '0';
		const published = !!formValues.get('published') ?? '';
		const description = formValues.get('description') ?? '';
		const tags = formValues.get('tags') ?? '';
		const data = {
			title,
			brand,
			subCategory,
			price,
			discount,
			quantity,
			description,
			published,
			tags
		};

		// Validation
		if (images.length === 0 || images[0].size === 0)
			errors.imgs = 'Each product should at least have one image!';

		const subCategoryFromDb = await prisma.subCategory.findUnique({
			where: { id: subCategory.toString() }
		});
		if (!subCategoryFromDb) errors.subCategory = 'Category does not exist!';

		// Check for errors
		if (!!Object.entries(errors).length) return fail(400, { data, errors });

		const dbRes = await prisma.product.create({
			data: {
				title: title.toString(),
				brand: brand.toString(),
				published: Boolean(published.toString()),
				category: { connect: { id: subCategoryFromDb?.categoryId } },
				subCategory: { connect: { id: subCategoryFromDb?.id } },
				price: Number(price.toString()),
				discount: Number(discount.toString()),
				quantity: Number(quantity.toString()),
				description: description.toString(),
				tags: tags.toString()
			}
		});

		try {
			const imagesData = images.map((img: File) => {
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
			images.forEach(async (image: any, i: number) => {
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
