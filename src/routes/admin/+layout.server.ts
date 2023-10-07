export async function load({ locals, request }) {
	return { currUser: locals.currUser, currPath: request.url };
}
