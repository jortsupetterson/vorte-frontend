export async function handleEvents() {
	let welcomeWidget = document.querySelector('#welcome.widget');
	if (welcomeWidget) {
		document.querySelector('#welcome.widget button').addEventListener('click', async () => {
			welcomeWidget.classList.add('collapsed');
		});
	}
}
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', handleEvents);
} else {
	handleEvents();
}
