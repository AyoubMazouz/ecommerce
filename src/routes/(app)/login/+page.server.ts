import { prisma } from '$lib/server/prisma';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';
import bcrypt from 'bcrypt';
import { redirect } from '@sveltejs/kit';
import alertStore from '../../../stores/alter.js';

/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({ request, cookies }) => {
		const { email, password } = Object.fromEntries(await request.formData()) as {
			email: string;
			password: string;
		};

		const user = await prisma.user.findFirst({ where: { email } });

		if (!user) return { ok: false, msg: 'email or password are invalid' };

		if (await bcrypt.compare(password, user.password)) {
			// Set Jwt.
			const jwtToken = jwt.sign({ id: user.id }, JWT_SECRET);
			cookies.set('jwt', jwtToken);
			alertStore.set('danger', `Welcome back ${user.firstName} ${user.lastName}!`);
			throw redirect(303, '/');
		}

		return { ok: false, msg: 'email or password are invalid' };
	}
};
