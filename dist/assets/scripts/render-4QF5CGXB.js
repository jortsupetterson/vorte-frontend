import "./chunk-BYXBJQAS.js";
import "./chunk-BYXBJQAS.js";
import {
  __name
} from "./chunk-SHUYVCID.js";

// src/server/pages/dashboard.js
var content = {
  titles: {
    fi: "Ohjauspaneeli",
    sv: "Instrumentpanel",
    en: "Dashboard"
  },
  descriptions: {
    fi: "Hallinnoi yrityksesi tietoja, tavoitteita ja suunnitelmia yhdest\xE4 paikasta. Vorten ohjauspaneeli kokoaa liiketoimintasi t\xE4rkeimm\xE4t ty\xF6kalut yhteen n\xE4kym\xE4\xE4n.",
    sv: "Hantera ditt f\xF6retags data, m\xE5l och planer fr\xE5n ett och samma st\xE4lle. Vortes instrumentpanel samlar dina viktigaste verktyg i en enda vy.",
    en: "Manage your business data, goals, and plans from a single place. The Vorte dashboard brings your essential tools together in one view."
  },
  urls: {
    fi: "/fi/ohjauspaneeli",
    sv: "/sv/instrumentpanel",
    en: "/en/dashboard"
  },
  sidebarHeadlines: {
    fi: "SOVELLUKSET",
    sv: "APPAR",
    en: "APPS"
  },
  sidebarList: [
    {
      id: "road-to-entrepreneurship",
      href: {
        fi: "/fi/polku-yritt\xE4j\xE4ksi",
        sv: "/sv/vagen-till-foretagande",
        en: "/en/road-to-entrepreneurship"
      },
      title: {
        fi: "Avaa Polku yritt\xE4j\xE4ksi -sovellus",
        sv: "\xD6ppna applikationen V\xE4gen till f\xF6retagande",
        en: "Open the Road to Entrepreneurship application"
      },
      text: {
        fi: "Polku yritt\xE4j\xE4ksi",
        sv: "V\xE4gen till f\xF6retagande",
        en: "Road to Entrepreneurship"
      }
    },
    {
      id: "todo",
      href: {
        fi: "/fi/tehtavalista",
        sv: "/sv/att-gora-lista",
        en: "/en/todo-list"
      },
      title: {
        fi: "Avaa Teht\xE4v\xE4lista-sovellus",
        sv: "\xD6ppna applikationen Att g\xF6ra-lista",
        en: "Open the To-Do List application"
      },
      text: {
        fi: "Teht\xE4v\xE4lista",
        sv: "Att g\xF6ra-lista",
        en: "To-Do List"
      }
    },
    {
      id: "calendar",
      href: {
        fi: "/fi/kalenteri",
        sv: "/sv/kalender",
        en: "/en/calendar"
      },
      title: {
        fi: "Avaa Kalenteri-sovellus",
        sv: "\xD6ppna applikationen Kalender",
        en: "Open the Calendar application"
      },
      text: {
        fi: "Kalenteri",
        sv: "Kalender",
        en: "Calendar"
      }
    },
    {
      id: "coming-soon",
      href: {
        fi: "https://why.vorte.app/my-vorte",
        sv: "https://why.vorte.app/my-vorte",
        en: "https://why.vorte.app/my-vorte"
      },
      title: {
        fi: "N\xE4yt\xE4 tulossa olevat My Vorte -sovellukset",
        sv: "Visa kommande My Vorte-appar",
        en: "Navigate to a page listing upcoming My Vorte apps"
      },
      text: {
        fi: "Tulossa...",
        sv: "Kommer snart...",
        en: "Coming soon..."
      }
    }
  ],
  viewHeadlines: { fi: "T\xC4RKEIMM\xC4T", sv: "H\xD6JDPUNKTER", en: "HIGHLIGHTS" },
  footerButtons: /* @__PURE__ */ __name((lang) => {
    return `<button id="add-widget" class="function" title="${{ fi: "Lis\xE4\xE4 tilasto tai pikalinkki", sv: "L\xE4gg till en sp\xE5rare eller snabbl\xE4nk", en: "Add a tracker or quicklink" }[lang]}" > ${{ fi: "lis\xE4\xE4 widget", sv: "l\xE4gg till widget", en: "add a widget" }[lang]} </button>`;
  }, "footerButtons")
};

// src/client/views/dashboard/render.js
if (!document.getElementById("dashboard-styles")) {
  document.head.insertAdjacentHTML("beforeend", `<link id="dashboard-styles" rel="stylesheet" href="/styles/dashboard/style.css" />;`);
}
function render(lang, contentPromise) {
  return new Promise(async (resolve) => {
    if (!document.body.querySelector("sidebar")) {
      document.body.innerHTML = "";
      initializeDOM();
    }
    let list = "";
    content.sidebarList.forEach((listItem) => {
      list = list + `<li><a href="${listItem.href[lang]}" hreflang="${lang}" title="${listItem.title[lang]}" ><menu-item> ${listItem.text[lang]} </menu-item></a></li>`;
    });
    document.title = content.titles[lang] + " | Vorte";
    app.banner.headline.textContent = content.titles[lang];
    app.sidebar.headline.textContent = content.sidebarHeadlines[lang];
    app.sidebar.list.innerHTML = list;
    app.view.header.headline.textContent = content.viewHeadlines[lang];
    app.view.footer.innerHTML = typeof content.footerButtons === "function" ? content.footerButtons(lang, cookies) : "";
    hydratedHtml = await contentPromise;
    app.view.innerHTML = hydratedHtml;
    resolve();
  });
}
__name(render, "render");
async function renderDashboard(lang, contentPromise) {
  app.view.self.setAttribute("id", "dashboard");
  await render(lang, contentPromise);
}
__name(renderDashboard, "renderDashboard");
export {
  renderDashboard
};
