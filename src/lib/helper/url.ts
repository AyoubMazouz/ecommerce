export function getAlertAsParams(type: 'danger' | 'success' | 'warn' | 'info', body: string) {
	return (
		'?' +
		new URLSearchParams({
			alertType: type,
			alertBody: body
		}).toString()
	);
}
