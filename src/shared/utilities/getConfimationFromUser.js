export default async function getConfirmationFromUser(lang) {
	const texts = {
		fi: {
			warning: 'Kaikki tähän liittyvä tieto poistetaan pysyvästi!',
			question: 'Haluatko varmasti jatkaa?',
			yes: 'Kyllä',
			no: 'Ei',
		},
		sv: {
			warning: 'All relaterad data kommer att tas bort permanent!',
			question: 'Vill du ändå fortsätta?',
			yes: 'Ja',
			no: 'Nej',
		},
		en: {
			warning: 'All related data will be lost permanently!',
			question: 'Would you still like to continue?',
			yes: 'Yes',
			no: 'No',
		},
	}[lang];

	return new Promise((resolve) => {
		const popup = document.createElement('div');
		popup.classList.add('popup');
		document.body.appendChild(popup);

		popup.innerHTML = `
			<dialog class="are-you-sure" open>
				<h5>${texts.warning}</h5>
				<p>${texts.question}</p>
				<div>
					<button id="yes">${texts.yes}</button>
					<button id="no">${texts.no}</button>
				</div>
			</dialog>
		`;

		document.getElementById('yes').addEventListener('click', () => {
			popup.remove();
			resolve(true);
		});
		document.getElementById('no').addEventListener('click', () => {
			popup.remove();
			resolve(false);
		});
	});
}
