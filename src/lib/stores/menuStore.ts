import { writable } from 'svelte/store';

const createStore = () => {
	const { subscribe, update, set: _set } = writable<string | null>();

	const set = (menu: string) => update((oldMenu) => (oldMenu === menu ? null : menu));

	const clear = () => _set(null);

	return { subscribe, set, clear };
};

const menuStore = createStore();
export default menuStore;
