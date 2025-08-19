/**
 * Generates SEO-friendly head tags for a search engine card, including the title,
 * meta description, canonical link, and alternate language links.
 *
 * @param {'fi'|'sv'|'en'} lang
 *   The language code to use when selecting the title and description.
 * @param {{fi: string, sv: string, en: string}} title
 *   An object mapping each supported language code to its page title.
 * @param {{fi: string, sv: string, en: string}} description
 *   An object mapping each supported language code to its meta description.
 * @param {{fi: string, sv: string, en: string}} urls
 *   An object mapping each supported language code to its URL path.
 * @returns {string}
 *   A string of HTML containing:
 *     - a <title> element
 *     - a meta description tag
 *     - a canonical link
 *     - alternate links for fi, sv, and en
 */
export default function getSearchEngineCard(lang, title, description, urls) {
	return `
  <title>
    ${title[lang]} | Vorte
  </title>

  <meta
    name="description"
    content="${description[lang]}"
  />

  <link rel="canonical" href="https://vorte.app${urls.fi}" />
  <link rel="alternate" hreflang="fi" href="${urls.fi}" />
  <link rel="alternate" hreflang="sv" href="${urls.sv}" />
  <link rel="alternate" hreflang="en" href="${urls.en}" />
  `;
}
