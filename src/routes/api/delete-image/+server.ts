import { json } from '@sveltejs/kit';
import fs from 'fs/promises';
import { prisma } from '$lib/server/prisma.js';

// ## Helper
async function fileExists(path: string) {
	try {
		await fs.access(path);
		return true; // File exists
	} catch {
		return false; // File does not exist
	}
}

export async function POST({ request }) {
	try {
		const { id } = await request.json();
		if (!id) return json({ ok: false, message: 'id is required!' });

		const image = await prisma.images.findUnique({ where: { id } });

		if (!image) return json({ ok: false, message: 'image not found' });

		if (!fileExists(image.path)) return json({ ok: false, message: 'image does not exist!' });

		await prisma.images.delete({ where: { id } });

		await fs.unlink(`static` + image.path);

		return json({ ok: true, message: 'Image has been deleted successfully' });
	} catch (err) {
		console.error(err);
		return json({ ok: false, message: err });
	}
}
