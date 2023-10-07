import { prisma } from '$lib/server/prisma';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';
import bcrypt from 'bcrypt';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	signup: async ({ request, cookies }) => {
		const { firstName, lastName, email, password } = Object.fromEntries(
			await request.formData()
		) as {
			firstName: string;
			lastName: string;
			email: string;
			password: string;
		};

		if (await prisma.user.findFirst({ where: { email } })) {
			return { ok: false, msg: 'email already exists!' };
		}

		const newUser = await prisma.user.create({
			data: {
				firstName,
				lastName,
				email,
				password: await bcrypt.hash(password, 10)
			}
		});

		// Set Jwt.
		const jwtToken = jwt.sign({ id: newUser.id }, JWT_SECRET);
		cookies.set('jwt', jwtToken);

		throw redirect(303, '/');
	}
};
