import "./chunk-BYXBJQAS.js";
import "./chunk-BYXBJQAS.js";
import {
  __name
} from "./chunk-SHUYVCID.js";

// src/server/pages/settings.js
var content = {
  titles: {
    fi: "Omat asetukset",
    sv: "Mina inst\xE4llningar",
    en: "My settings"
  },
  descriptions: {
    fi: "Hallinnoi yrityksesi tietoja, tavoitteita ja suunnitelmia yhdest\xE4 paikasta. Vorten ohjauspaneeli kokoaa liiketoimintasi t\xE4rkeimm\xE4t ty\xF6kalut yhteen n\xE4kym\xE4\xE4n.",
    sv: "Hantera ditt f\xF6retags data, m\xE5l och planer fr\xE5n ett och samma st\xE4lle. Vortes instrumentpanel samlar dina viktigaste verktyg i en enda vy.",
    en: "Manage your business data, goals, and plans from a single place. The Vorte dashboard brings your essential tools together in one view."
  },
  urls: {
    fi: "/fi/omat-asetukset",
    sv: "/sv/mina-inst\xE4llningar",
    en: "/en/my-settings"
  },
  sidebarHeadlines: {
    fi: "VALIKKO",
    sv: "MENY",
    en: "MENU"
  },
  sidebarList: [
    {
      id: "user",
      href: {
        fi: "/fi/omat-asetukset/k\xE4ytt\xE4j\xE4",
        sv: "/sv/mina-inst\xE4llningar/anv\xE4ndare",
        en: "/en/my-settings/user"
      },
      title: {
        fi: "Siirry muokkaamaan tiliisi liittyvi\xE4 tietoja",
        sv: "G\xE5 till redigeringsinformation related till dit konto",
        en: "Go edit information related to your account"
      },
      text: {
        fi: "K\xE4ytt\xE4j\xE4",
        sv: "Anv\xE4ndare",
        en: "User"
      }
    },
    {
      id: "interface",
      href: {
        fi: "/fi/omat-asetukset/k\xE4ytt\xF6liittym\xE4",
        sv: "/sv/mina-inst\xE4llningar/gr\xE4ns-snittet",
        en: "/en/my-settings/interface"
      },
      title: {
        fi: "Siirry muokkaamaan k\xE4ytt\xF6liittym\xE4\xE4si (teema, korostusv\xE4rit, kontrasti, kieli)",
        sv: "G\xE5 till anpassa ditt gr\xE4nssnitt (tema, accentfr\xE4ger, kontrast, sp\xE5rk)",
        en: "Go edit your interface (theme, accentcolors, contrast, language)"
      },
      text: {
        fi: "K\xE4ytt\xF6liittym\xE4",
        sv: "Gr\xE4ns-snittet",
        en: "Interface"
      }
    }
  ],
  viewHeadlines: {
    user: {
      fi: "K\xC4YTT\xC4J\xC4N ASETUKSET",
      sv: "ANV\xC4NDARE",
      en: "USER SETTINGS"
    },
    interface: {
      fi: "KUSTOMOI K\xC4YTT\xD6LIITTYM\xC4",
      sv: "ANPASSA GR\xC4NSSNITTET",
      en: "INTERFACE CUSTOMIZATION"
    }
  },
  viewContent: {
    user: /* @__PURE__ */ __name((lang, cookies2) => {
      return ``;
    }, "user"),
    interface: /* @__PURE__ */ __name((lang, cookies2) => {
      return ` <section class="column"><h4> ${{ fi: "Teema", sv: "Tema", en: "Theme" }[lang]} </h4><div class="row"><button id="dark-theme" title="${{ fi: "Ota tumma teema k\xE4ytt\xF6\xF6n", sv: "Aktivera m\xF6rk tema", en: "Activate dark theme" }[lang]}" > ${{ fi: "tumma", sv: "m\xF6rk", en: "dark" }[lang]} </button><button id="light-theme" title="${{ fi: "Ota vaalea teema k\xE4ytt\xF6\xF6n", sv: "Aktivera ljus tema", en: "Activate light theme" }[lang]}" > ${{ fi: "vaalea", sv: "ljus", en: "light" }[lang]} </button></div></section><section class="column"><h4> ${{ fi: "Kontrasti", sv: "Kontrast", en: "Contrast" }[lang]} </h4><div class="row"><button id="low-contrast" title="${{ fi: "Ota matala kontrasti k\xE4ytt\xF6\xF6n", sv: "Aktivera l\xE5g kontrast", en: "Activate low contrast" }[lang]}" > ${{ fi: "matala", sv: "l\xE5g", en: "low" }[lang]} </button><button id="normal-contrast" title="${{ fi: "Ota normaali kontrasti k\xE4ytt\xF6\xF6n", sv: "Aktivera normal kontrast", en: "Activate normal contrast" }[lang]}" > ${{ fi: "normaali", sv: "normal", en: "normal" }[lang]} </button><button id="high-contrast" title="${{ fi: "Ota korkea kontrasti k\xE4ytt\xF6\xF6n", sv: "Aktivera h\xF6g kontrast", en: "Activate high contrast" }[lang]}" > ${{ fi: "korkea", sv: "h\xF6g", en: "high" }[lang]} </button></div></section><section class="column"><h4> ${{ fi: "Korostus", sv: "Accent", en: "Accent" }[lang]} </h4><div class="row"><input title="${{ fi: "Muuta v\xE4ri\xE4", sv: "\xC4ndra f\xE4rg", en: "Change color" }[lang]}" type="color" value="${cookies2["primary"] || "#0B4F60"}" id="primary" /><input title="${{ fi: "Muuta v\xE4ri\xE4", sv: "\xC4ndra f\xE4rg", en: "Change color" }[lang]}" type="color" value="${cookies2["secondary"] || "#199473"}" id="secondary" /><input title="${{ fi: "Muuta v\xE4ri\xE4", sv: "\xC4ndra f\xE4rg", en: "Change color" }[lang]}" type="color" value="${cookies2["primary_ghost"] || "#0B4F60"}" id="primary_ghost" class="ghost" /><input title="${{ fi: "Muuta v\xE4ri\xE4", sv: "\xC4ndra f\xE4rg", en: "Change color" }[lang]}" type="color" value="${cookies2["secondary_ghost"] || "#199473"}" id="secondary_ghost" class="ghost" /></div></section><section class="column"><h4> ${{ fi: "Kieli", sv: "Spr\xE5k", en: "Language" }[lang]} </h4><div class="row"><button id="fi-language" title="${{ fi: "Ota Suomen kieli k\xE4ytt\xF6\xF6n", sv: "Byt till finska spr\xE5ket", en: "Switch to Finnish language" }[lang]}" > FI </button><button id="sv-language" title="${{ fi: "Vaihda Ruotsin kieleen", sv: "Byt till svenska spr\xE5ket", en: "Switch to Swedish language" }[lang]}" > SV </button><button id="en-language" title="${{ fi: "Vaihda Englannin kieleen", sv: "Byt till engelska spr\xE5ket", en: "Switch to English language" }[lang]}" > EN </button></div></section>`;
    }, "interface")
  },
  footerButtons: {
    user: /* @__PURE__ */ __name((lang) => {
      return `<button id="delete-account" class="function" title="${{ fi: "Poista k\xE4ytt\xE4j\xE4tunnuksesi pysyv\xE4sti", sv: "Radera ditt konto permanent", en: "Permanently delete your account" }[lang]}" > ${{ fi: "poista", sv: "radera", en: "delete" }[lang]} </button>`;
    }, "user"),
    interface: /* @__PURE__ */ __name((lang) => {
      return `<button id="reset-styles" class="function" title="${{ fi: "Ota oletus tyylit k\xE4ytt\xF6\xF6n", sv: "Aktivera standardstilar", en: "Activate default styles" }[lang]}" > ${{ fi: "nollaa", sv: "\xE5terst\xE4lla", en: "reset" }[lang]} </button>`;
    }, "interface")
  }
};

// src/client/views/settings/render.js
if (!document.getElementById("settings-styles")) {
  document.head.insertAdjacentHTML("beforeend", `<link id="settings-styles" rel="stylesheet" href="/styles/settings/style.css" />;`);
}
function render(lang, contentPromise) {
  return new Promise(async (resolve) => {
    let viewId = document.documentElement.getAttribute("data-view");
    if (!(/* @__PURE__ */ new Set(["interface", "user"])).has(viewId)) {
      viewId = sessionStorage.getItem("last-visited-settings-view") || "user";
      document.documentElement.setAttribute("data-view", viewId);
    }
    let list = "";
    content.sidebarList.forEach((listItem) => {
      list = list + `<li><a id="${listItem.id}" href="${listItem.href[lang]}" hreflang="${lang}" title="${listItem.title[lang]}" ><menu-item> ${listItem.text[lang]} </menu-item></a></li>`;
    });
    document.title = content.titles[lang] + " | Vorte";
    app.banner.headline.textContent = content.titles[lang];
    app.sidebar.headline.textContent = content.sidebarHeadlines[lang];
    app.sidebar.list.innerHTML = list;
    app.view.header.headline.textContent = content.viewHeadlines[viewId][lang];
    app.view.footer.innerHTML = typeof content.footerButtons[viewId] === "function" ? content.footerButtons[viewId](lang, cookies) : "";
    app.view.main.innerHTML = typeof content.viewContent[viewId] === "function" ? content.viewContent[viewId](lang, cookies) : "";
    resolve();
  });
}
__name(render, "render");
async function renderSettings(lang, contentPromise) {
  await render(lang, contentPromise);
  app.view.self.setAttribute("id", document.documentElement.getAttribute("data-view"));
  const { handleEvents } = await import("./events/settings/handleEvents.js");
  handleEvents();
  sessionStorage.setItem("last-visited-settings-view", document.documentElement.getAttribute("data-view"));
}
__name(renderSettings, "renderSettings");
export {
  renderSettings
};
