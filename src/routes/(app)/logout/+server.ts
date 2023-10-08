import { redirect } from '@sveltejs/kit';
import alertStore from '../../../stores/alterStore.js';
import { getAlertAsParams } from '$lib/helper/url.js';

/** @type {import('./$types').RequestHandler} */
export function POST({ locals, cookies }) {
	cookies.set('jwt', '');

	const alert = getAlertAsParams(
		'info',
		`Goodbye ${locals.currUser.firstName} ${locals.currUser.firstName}!`
	);
	throw redirect(303, '/' + alert);
}
