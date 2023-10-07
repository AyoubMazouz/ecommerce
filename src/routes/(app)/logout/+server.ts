import { redirect } from '@sveltejs/kit';
import alertStore from '../../../stores/alter.js';

/** @type {import('./$types').RequestHandler} */
export function POST({ locals, cookies }) {
	cookies.set('jwt', '');

	alertStore.set(
		'danger',
		`Welcome back ${locals.currUser.firstName} ${locals.currUser.lastName}!`
	);

	throw redirect(303, '/');
}
