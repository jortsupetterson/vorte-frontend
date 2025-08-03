export default function renderAppView(lang, viewHeadline, viewContent = 'Add some content bruh :p', viewHeaderButton = '') {
	return `
	<view class="toggled" role="main">
		<header>
			<layout-button 
            role="button" 
            title="${
							{
								fi: 'Mukauta näkymää',
								sv: 'Anpassa vy',
								en: 'Adjust layout',
							}[lang]
						}">
            </layout-button>

			<h2>
				${viewHeadline[lang]}
			</h2>
			 ${viewHeaderButton}
		</header>
		<main>${viewContent}</main>
	</view>
    `;
}
