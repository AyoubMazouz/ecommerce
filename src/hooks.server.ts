import { JWT_SECRET } from '$env/static/private';
import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	let user;
	const jwtToken = event.cookies.get('jwt');

	// Get user from db if user is logged in.
	if (jwtToken) {
		const decodedToken = jwt.verify(jwtToken, JWT_SECRET) as { id: number; iat: number };
		user = await prisma.user.findFirst({ where: { id: decodedToken.id } });
		if (user) event.locals.currUser = user;
	}

	// Prevent all users except the admin from accessing the admin... route.
	if (event.url.pathname.startsWith('/admin')) {
		if (!user || user.role !== 'ADMIN') throw redirect(303, '/');
	}
	// Prevent unauthorized users from visiting the Me (profile) page.
	if (event.url.pathname.startsWith('/me')) {
		if (!user) throw redirect(303, '/');
	}
	// Prevent logged in user from log in again or signup.
	if (event.url.pathname.startsWith('/login') || event.url.pathname.startsWith('/signup')) {
		if (user) throw redirect(303, '/');
	}

	return await resolve(event);
}
