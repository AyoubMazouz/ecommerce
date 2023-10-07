import { writable } from 'svelte/store';

interface Alert {
	id: number;
	type: string;
	body: string;
}

const ALERT_DISPLAY_TIME = 10000;

const createStore = () => {
	const { subscribe, update, set: _set } = writable<Alert[]>([]);

	const set = (type: string, body: string) => {
		const id = Math.random();
		update((alerts: Alert[]) => {
			return [{ type, body, id }, ...alerts];
		});
		setTimeout(() => {
			update((alerts: Alert[]) => {
				return alerts.filter((alter: Alert) => alter.id !== id);
			});
		}, ALERT_DISPLAY_TIME);
	};

	const clear = () => _set([]);

	return { subscribe, set, clear };
};

const alertStore = createStore();
export default alertStore;
