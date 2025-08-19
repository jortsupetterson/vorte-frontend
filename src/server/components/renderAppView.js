/**
 * @param {String} lang
 * @param {{fi:string,sv:string,en:string}} viewHeadline
 * @param {string|Promise<string>} viewContentHtml
 * @param {string} footerButtons
 */
export default async function renderAppView(lang, viewId, viewHeadline, viewContentHtml = 'Add some content', footerButtons = '') {
	const json = await viewContentHtml; // string
	return `
  <view id="${viewId}" class="toggled" role="main">
    <header>
      <layout-button role="button" title="${{ fi: 'Mukauta näkymää', sv: 'Anpassa vy', en: 'Adjust layout' }[lang]}"></layout-button>

      <h2>${viewHeadline[lang]}</h2>

      <chat-button
        role="button"
        title="${
					{
						fi: 'Kommunikaatiosovellus',
						sv: 'Kommunikationsapp',
						en: 'Communications app',
					}[lang]
				}"
      >
        <profile-button>
          <div></div>
          <div></div>
        </profile-button>

        <profile-button>
          <div></div>
          <div></div>
        </profile-button>
        
      </chat-button>
    </header>
    <main>${json.body}</main>
	<footer>${footerButtons}</footer>
  </view>`;
}
