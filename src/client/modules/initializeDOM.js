export default function initializeDOM() {
	const app = (globalThis.app = globalThis.app || {});
	function ensureRoot(tag) {
		let el = document.body.querySelector(tag);
		if (!el) {
			el = document.createElement(tag);
			document.body.appendChild(el);
		}
		return el;
	}

	function ensureChild(tag, parent) {
		let el = parent.querySelector(tag);
		if (!el) {
			el = document.createElement(tag);
			parent.appendChild(el);
		}
		return el;
	}

	app.banner = app.banner || {};
	app.banner.self = ensureRoot('banner');
	app.banner.headline = ensureChild('h1', app.banner.self);
	app.banner.navButton = ensureChild('nav-button', app.banner.self);
	app.banner.navDropdown = ensureChild('nav-dropdown', app.banner.self);
	app.banner.profileButton = ensureChild('profile-button', app.banner.self);
	app.banner.profileDropdown = ensureChild('profile-dropdown', app.banner.self);

	app.sidebar = app.sidebar || {};
	app.sidebar.self = ensureRoot('sidebar');
	app.sidebar.headline = ensureChild('h3', app.sidebar.self);
	const sidebarHeader = ensureChild('header', app.sidebar.self);
	app.sidebar.header = {
		hideSidebarButton: ensureChild('hide-sidebar-button', sidebarHeader),
	};
	app.sidebar.list = ensureChild('ul', app.sidebar.self);

	app.view = app.view || {};
	app.view.self = ensureRoot('view');
	const viewHeader = ensureChild('header', app.view.self);
	app.view.header = {
		self: viewHeader,
		headline: ensureChild('h2', viewHeader),
		layoutButton: ensureChild('layout-button', viewHeader),
	};
	app.view.main = ensureChild('main', app.view.self);
	app.view.footer = ensureChild('footer', app.view.self);

	if (!initializeDOM._handlersAttached) {
		app.banner.navButton.addEventListener('click', () => {
			app.banner.navButton.classList.toggle('toggled');
			app.banner.navDropdown.classList.toggle('toggled');
			app.banner.profileButton.classList.remove('toggled');
			app.banner.profileDropdown.classList.remove('toggled');
		});
		app.banner.profileButton.addEventListener('click', () => {
			app.banner.profileButton.classList.toggle('toggled');
			app.banner.profileDropdown.classList.toggle('toggled');
			app.banner.navButton.classList.remove('toggled');
			app.banner.navDropdown.classList.remove('toggled');
		});

		const closeDropdowns = () => {
			['navButton', 'navDropdown', 'profileButton', 'profileDropdown'].forEach((key) => {
				app.banner[key].classList.remove('toggled');
			});
		};
		[app.view.self, app.sidebar.self].forEach((el) => el.addEventListener('click', closeDropdowns));

		app.view.header.layoutButton.addEventListener('click', () => {
			app.view.header.layoutButton.classList.toggle('toggled');
			app.view.self.classList.toggle('toggled');
			app.sidebar.self.classList.toggle('toggled');
		});

		app.sidebar.header.hideSidebarButton.addEventListener('click', () => {
			app.view.header.layoutButton.classList.toggle('toggled');
			app.view.self.classList.toggle('toggled');
			app.sidebar.self.classList.toggle('toggled');
		});

		initializeDOM._handlersAttached = true;
	}
}
