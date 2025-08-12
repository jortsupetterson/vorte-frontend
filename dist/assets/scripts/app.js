import {
  state
} from "./chunk-T2QGDLIL.js";
import {
  __name
} from "./chunk-SHUYVCID.js";

// src/client/modules/initializeDOM.js
function initializeDOM() {
  const app2 = globalThis.app = globalThis.app || {};
  function ensureRoot(tag) {
    let el = document.body.querySelector(tag);
    if (!el) {
      el = document.createElement(tag);
      document.body.appendChild(el);
    }
    return el;
  }
  __name(ensureRoot, "ensureRoot");
  function ensureChild(tag, parent) {
    let el = parent.querySelector(tag);
    if (!el) {
      el = document.createElement(tag);
      parent.appendChild(el);
    }
    return el;
  }
  __name(ensureChild, "ensureChild");
  app2.banner = app2.banner || {};
  app2.banner.self = ensureRoot("banner");
  app2.banner.headline = ensureChild("h1", app2.banner.self);
  app2.banner.navButton = ensureChild("nav-button", app2.banner.self);
  app2.banner.navDropdown = ensureChild("nav-dropdown", app2.banner.self);
  app2.banner.profileButton = ensureChild("profile-button", app2.banner.self);
  app2.banner.profileDropdown = ensureChild("profile-dropdown", app2.banner.self);
  app2.sidebar = app2.sidebar || {};
  app2.sidebar.self = ensureRoot("sidebar");
  app2.sidebar.headline = ensureChild("h3", app2.sidebar.self);
  const sidebarHeader = ensureChild("header", app2.sidebar.self);
  app2.sidebar.header = {
    hideSidebarButton: ensureChild("hide-sidebar-button", sidebarHeader)
  };
  app2.sidebar.list = ensureChild("ul", app2.sidebar.self);
  app2.view = app2.view || {};
  app2.view.self = ensureRoot("view");
  const viewHeader = ensureChild("header", app2.view.self);
  app2.view.header = {
    self: viewHeader,
    headline: ensureChild("h2", viewHeader),
    layoutButton: ensureChild("layout-button", viewHeader)
  };
  app2.view.main = ensureChild("main", app2.view.self);
  app2.view.footer = ensureChild("footer", app2.view.self);
  if (!initializeDOM._handlersAttached) {
    app2.banner.navButton.addEventListener("click", () => {
      app2.banner.navButton.classList.toggle("toggled");
      app2.banner.navDropdown.classList.toggle("toggled");
      app2.banner.profileButton.classList.remove("toggled");
      app2.banner.profileDropdown.classList.remove("toggled");
    });
    app2.banner.profileButton.addEventListener("click", () => {
      app2.banner.profileButton.classList.toggle("toggled");
      app2.banner.profileDropdown.classList.toggle("toggled");
      app2.banner.navButton.classList.remove("toggled");
      app2.banner.navDropdown.classList.remove("toggled");
    });
    const closeDropdowns = /* @__PURE__ */ __name(() => {
      ["navButton", "navDropdown", "profileButton", "profileDropdown"].forEach((key) => {
        app2.banner[key].classList.remove("toggled");
      });
    }, "closeDropdowns");
    [app2.view.self, app2.sidebar.self].forEach((el) => el.addEventListener("click", closeDropdowns));
    app2.view.header.layoutButton.addEventListener("click", () => {
      app2.view.header.layoutButton.classList.toggle("toggled");
      app2.view.self.classList.toggle("toggled");
      app2.sidebar.self.classList.toggle("toggled");
    });
    app2.sidebar.header.hideSidebarButton.addEventListener("click", () => {
      app2.view.header.layoutButton.classList.toggle("toggled");
      app2.view.self.classList.toggle("toggled");
      app2.sidebar.self.classList.toggle("toggled");
    });
    initializeDOM._handlersAttached = true;
  }
}
__name(initializeDOM, "initializeDOM");

// src/client/classes/EarlyOffscreenPromise.js
var offscreenFetcher = new Worker("/scripts/workers/offscreenFetcher.js");
var EarlyOffscreenPromise = class {
  static {
    __name(this, "EarlyOffscreenPromise");
  }
  constructor(dataKey) {
    return new Promise((resolve) => {
      offscreenFetcher.postMessage(dataKey);
      const handler = /* @__PURE__ */ __name((event) => {
        resolve(event.data);
        console.log("Minut suoritetaan, t\xE4s data: " + event.data);
        offscreenFetcher.removeEventListener("message", handler);
      }, "handler");
      offscreenFetcher.addEventListener("message", handler);
    });
  }
};

// src/client/modules/interceptLinks.js
var staticViews = /* @__PURE__ */ new Set(["sign_in", "sign_up"]);
function interceptLinks({ onNavigate, shouldHandle }) {
  const defaultFilter = /* @__PURE__ */ __name((anchor) => {
    const href = anchor.getAttribute("href");
    if (!href || href[0] !== "/" || href.startsWith("//")) return false;
    const target = anchor.getAttribute("target");
    return !target || target === "_self";
  }, "defaultFilter");
  const filter = shouldHandle || defaultFilter;
  function handleClick(e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const anchor = e.target.closest("a");
    if (!anchor || !anchor.href || !filter(anchor)) return;
    e.preventDefault();
    const contentPromise = !staticViews.has(anchor.id) ? new EarlyOffscreenPromise(anchor.id) : "";
    document.documentElement.setAttribute("data-view", anchor.id);
    const path = anchor.pathname;
    const params = Object.fromEntries(new URLSearchParams(anchor.search).entries());
    history.pushState(null, ",path + anchor.search + anchor.hash");
    onNavigate(path, params, contentPromise);
  }
  __name(handleClick, "handleClick");
  function handlePop() {
    const loc = window.location;
    const params = Object.fromEntries(new URLSearchParams(loc.search).entries());
    onNavigate(loc.pathname, params);
  }
  __name(handlePop, "handlePop");
  document.addEventListener("click", handleClick);
  window.addEventListener("popstate", handlePop);
  return () => {
    document.removeEventListener("click", handleClick);
    window.removeEventListener("popstate", handlePop);
  };
}
__name(interceptLinks, "interceptLinks");

// src/client/modules/observeLang.js
function createLangObserver(onLangChange) {
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === "attributes" && m.attributeName === "lang") {
        onLangChange(document.documentElement.lang);
      }
    }
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"]
  });
  return observer;
}
__name(createLangObserver, "createLangObserver");

// src/client/modules/clientSideRouter.js
var NAV_DROPDOWN_TEMPLATES = {
  fi: `<menu-heading>MY VORTE</menu-heading><a href="/fi/ohjauspaneeli" hreflang="fi" title="Siirry ohjauspaneeliin"><menu-item> Ohjauspaneeli </menu-item></a><details><summary><menu-item> Sovellukset </menu-item></summary><ul><li><a href="/fi/polku-yrittajaksi" hreflang="fi" title="Siirry Polku yritt\xE4j\xE4ksi -sovellukseen"><menu-sub-item> Polku yritt\xE4j\xE4ksi </menu-sub-item></a></li><li><a href="/fi/oma-vorte/tulossa" hreflang="fi" title="N\xE4yt\xE4 tulossa olevat My Vorte -sovellukset"><menu-sub-item> Tulossa pian... </menu-sub-item></a></li></ul></details><menu-heading> VORTEPRENEUR </menu-heading><a href="/fi/vortepreneur/tulossa" hreflang="fi" title="N\xE4yt\xE4 tulossa olevat Vortepreneur-sovellukset"><menu-item> Tulossa pian... </menu-item></a>`,
  sv: `<menu-heading>MY VORTE</menu-heading><a href="/sv/instrumentpanel" hreflang="sv" title="G\xE5 till instrumentpanelen"><menu-item> Instrumentpanel </menu-item></a><details><summary><menu-item> Appar </menu-item></summary><ul><li><a href="/sv/vagen-till-foretagande" hreflang="sv" title="Navigera till V\xE4gen till f\xF6retagande-applikationen"><menu-sub-item> V\xE4gen till f\xF6retagande </menu-sub-item></a></li><li><a href="/sv/mitt-vorte/kommer-snart" hreflang="sv" title="Visa kommande My Vorte-appar"><menu-sub-item> Kommer snart... </menu-sub-item></a></li></ul></details><menu-heading>VORTEPRENEUR</menu-heading><a href="/sv/vortepreneur/kommer-snart" hreflang="sv" title="Visa kommande Vortepreneur-appar"><menu-item> Kommer snart... </menu-item></a>`,
  en: `<menu-heading>MY VORTE</menu-heading><a href="/en/dashboard" hreflang="en" title="Go to the dashboard"><menu-item> Dashboard </menu-item></a><details><summary><menu-item> Apps </menu-item></summary><ul><li><a href="/en/road-to-entrepreneurship" hreflang="en" title="Navigate to Road to Entrepreneurship application"><menu-sub-item> Road to Entrepreneurship </menu-sub-item></a></li><li><a href="/en/my-vorte/coming-soon" hreflang="en" title="Navigate to a page listing coming My Vorte apps"><menu-sub-item> Coming soon... </menu-sub-item></a></li></ul></details><menu-heading>VORTEPRENEUR</menu-heading><a href="/en/vortepreneur/coming-soon" hreflang="en" title="Navigate to a page listing coming Vortepreneur apps"><menu-item> Coming soon... </menu-item></a>`
};
var PROFILE_DROPDOWN_TEMPLATES = {
  fi: `<a href="/fi/omat-asetukset" hreflang="fi" title="Siirry omiin asetuksiin"><menu-item> Omat asetukset </menu-item></a><a href="/fi/kirjaudu-ulos" hreflang="fi" title="Poista kirjautumistiedot"><menu-item> Kirjaudu ulos </menu-item></a>`,
  sv: `<a href="/sv/mina-inst\xE4llningar" hreflang="sv" title="G\xE5 till dina inst\xE4llningar"><menu-item> Mina inst\xE4llningar </menu-item></a><a href="/sv/logga-ut" hreflang="sv" title="Ta bort autentiseringscookies"><menu-item> Logga ut </menu-item></a>`,
  en: `<a href="/en/my-settings" hreflang="en" title="Navigate to your settings"><menu-item> My settings </menu-item></a><a href="/en/sign-out" hreflang="en" title="Remove authentication cookies"><menu-item> Sign out </menu-item></a>`
};
function initializeRouter({ handlerMap, state: state2, scheduleRender: scheduleRender2 }) {
  async function loadAndRun() {
    const segments = state2.path.split("/").filter(Boolean);
    const key = segments.length > 0 ? segments[segments.length - 1] : "dashboard";
    const route = decodeURIComponent(key);
    const routeHandler = handlerMap.get(route) || handlerMap.get("dashboard");
    if (typeof routeHandler !== "function") {
      console.error(`No handler for route "${key}"`);
      return;
    }
    await routeHandler(state2.lang, state2.content);
  }
  __name(loadAndRun, "loadAndRun");
  const langObserver = createLangObserver((newLang) => {
    state2.lang = newLang;
    scheduleRender2(loadAndRun);
    app.banner.navDropdown.innerHTML = NAV_DROPDOWN_TEMPLATES[newLang];
    app.banner.profileDropdown.innerHTML = PROFILE_DROPDOWN_TEMPLATES[newLang];
  });
  const stopLinks = interceptLinks({
    onNavigate: /* @__PURE__ */ __name((path, params, contentPromise) => {
      state2.path = path;
      state2.params = params;
      state2.content = contentPromise;
      history.pushState(null, "", path);
      scheduleRender2(loadAndRun);
    }, "onNavigate")
  });
  return () => {
    langObserver.disconnect();
    stopLinks();
  };
}
__name(initializeRouter, "initializeRouter");

// src/client/modules/scheduleRender.js
var scheduled = false;
function scheduleRender(renderFn) {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => {
    renderFn();
    scheduled = false;
  });
}
__name(scheduleRender, "scheduleRender");

// src/client/modules/virtualizeCookies.js
function createCookieProxy() {
  const cookieStore = {};
  function syncFromDocument() {
    Object.assign(
      cookieStore,
      Object.fromEntries(
        document.cookie.split("; ").filter(Boolean).map((pair) => {
          const [k, v] = pair.split("=");
          return [decodeURIComponent(k), decodeURIComponent(v)];
        })
      )
    );
  }
  __name(syncFromDocument, "syncFromDocument");
  function syncToDocument(key, value) {
    document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; path=/; SameSite=Strict; secure; expires=${new Date(
      Date.now() + 10 * 365 * 24 * 60 * 60 * 1e3
    ).toUTCString()};`;
  }
  __name(syncToDocument, "syncToDocument");
  syncFromDocument();
  return new Proxy(cookieStore, {
    get(_, key) {
      syncFromDocument();
      return cookieStore[key];
    },
    set(_, key, value) {
      syncToDocument(key, value);
      cookieStore[key] = value;
      return true;
    },
    deleteProperty(_, key) {
      document.cookie = `${encodeURIComponent(key)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Strict`;
      delete cookieStore[key];
      return true;
    },
    has(_, key) {
      syncFromDocument();
      return key in cookieStore;
    },
    ownKeys() {
      syncFromDocument();
      return Reflect.ownKeys(cookieStore);
    },
    getOwnPropertyDescriptor(_, key) {
      syncFromDocument();
      return {
        configurable: true,
        enumerable: true,
        value: cookieStore[key]
      };
    }
  });
}
__name(createCookieProxy, "createCookieProxy");

// src/client/app.js
window.addEventListener("DOMContentLoaded", () => {
  const routeDefinitions = [
    {
      aliases: [
        "authentication",
        "identification",
        "sign-in",
        "sign-up",
        "sign-out",
        "create-an-account",
        "login",
        "tunnistautuminen",
        "kirjaudu-sis\xE4\xE4n",
        "kirjaudu",
        "kirjaudu-ulos",
        "kirjautuminen",
        "todentaminen",
        "todennus",
        "tunnistus",
        "luo-k\xE4ytt\xE4j\xE4tili",
        "rekister\xF6ityminen",
        "rekister\xF6inti",
        "skapa-konto",
        "identifiering",
        "autentisering",
        "logga-in",
        "logga-ut",
        "inloggning"
      ],
      handler: /* @__PURE__ */ __name(async (lang) => {
        const { renderAuthentication } = await import("./render-4OJMDHNB.js");
        return renderAuthentication(lang);
      }, "handler")
    },
    {
      aliases: ["dashboard", "ohjauspaneeli", "instrument-panel"],
      handler: /* @__PURE__ */ __name(async (lang, contentPromise) => {
        const { renderDashboard } = await import("./render-4QF5CGXB.js");
        return renderDashboard(lang, contentPromise);
      }, "handler")
    },
    {
      aliases: [
        "settings",
        "my-settings",
        "user",
        "interface",
        "asetukset",
        "omat-asetukset",
        "k\xE4ytt\xE4j\xE4",
        "k\xE4ytt\xF6liittym\xE4",
        "inst\xE4llningar",
        "mina-inst\xE4llningar",
        "anv\xE4ndare",
        "gr\xE4ns-snittet"
      ],
      handler: /* @__PURE__ */ __name(async (lang, contentPromise) => {
        const { renderSettings } = await import("./render-OPB4V2J7.js");
        return renderSettings(lang, contentPromise);
      }, "handler")
    }
    // …more routes…
  ];
  const handlerMap = /* @__PURE__ */ new Map();
  for (const { aliases, handler } of routeDefinitions) {
    for (const alias of aliases) {
      handlerMap.set(alias, handler);
    }
  }
  initializeRouter({ handlerMap, state, scheduleRender });
  const viewId = document.documentElement.getAttribute("data-view");
  if (viewId !== "sign_up" && viewId !== "sign_in") {
    initializeDOM();
  }
  globalThis.cookies = createCookieProxy();
  (function() {
    let deferredPrompt = null;
    const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent) && !window.MSStream;
    const inStandalone = /* @__PURE__ */ __name(() => window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true, "inStandalone");
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;
    });
    window.addEventListener("appinstalled", () => {
    });
    const prompt = /* @__PURE__ */ __name(async (lang) => {
      let dialog = document.querySelector("dialog");
      if (!dialog) {
        dialog = document.createElement("dialog");
        document.body.appendChild(dialog);
      }
      if (inStandalone()) {
        dialog.innerHTML = `<a id="sign_in" class="action" href="${{ fi: "/fi/dashboard", sv: "/sv/instrumentpanel", en: "/en/dashboard" }[lang]}" title="${{ fi: "Avaa sovellus", sv: "\xD6ppna appen", en: "Open the app" }[lang]}" hreflang="${lang}"> ${{ fi: "Siirry sovellukseen", sv: "G\xE5 till appen", en: "Go to the app" }[lang]} </a>`;
      }
      if (isIOS) {
        dialog.innerHTML = `<ol><li>1. ${{ fi: " Paina Jaa-kuvaketta", sv: " Tryck p\xE5 Dela-ikonen", en: " Tap the Share icon" }[lang]} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Pro v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc.--><path d="M342.6 73.4C330.1 60.9 309.8 60.9 297.3 73.4L169.3 201.4C156.8 213.9 156.8 234.2 169.3 246.7C181.8 259.2 202.1 259.2 214.6 246.7L288 173.3L288 384C288 401.7 302.3 416 320 416C337.7 416 352 401.7 352 384L352 173.3L425.4 246.7C437.9 259.2 458.2 259.2 470.7 246.7C483.2 234.2 483.2 213.9 470.7 201.4L342.7 73.4zM160 416C160 398.3 145.7 384 128 384C110.3 384 96 398.3 96 416L96 480C96 533 139 576 192 576L448 576C501 576 544 533 544 480L544 416C544 398.3 529.7 384 512 384C494.3 384 480 398.3 480 416L480 480C480 497.7 465.7 512 448 512L192 512C174.3 512 160 497.7 160 480L160 416z"/></svg></li><li>2. ${{ fi: " Vierit\xE4 alas ja valitse \u201DLis\xE4\xE4 Koti-valikkoon\u201D.", sv: ' Scrolla ner och v\xE4lj "L\xE4gg till p\xE5 hemsk\xE4rmen".', en: ' Scroll down and select "Add to Home Screen".' }[lang]} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M160 144C151.2 144 144 151.2 144 160L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 160C496 151.2 488.8 144 480 144L160 144zM96 160C96 124.7 124.7 96 160 96L480 96C515.3 96 544 124.7 544 160L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 160zM296 408L296 344L232 344C218.7 344 208 333.3 208 320C208 306.7 218.7 296 232 296L296 296L296 232C296 218.7 306.7 208 320 208C333.3 208 344 218.7 344 232L344 296L408 296C421.3 296 432 306.7 432 320C432 333.3 421.3 344 408 344L344 344L344 408C344 421.3 333.3 432 320 432C306.7 432 296 421.3 296 408z"/></svg></li><li>3. ${{ fi: " Tarkista nimi ja paina \u201DLis\xE4\xE4\u201D.", sv: ' Bekr\xE4fta namnet och tryck "L\xE4gg till".', en: ' Confirm the name and tap "Add".' }[lang]}</li><li>4. ${{ fi: " Nyt Vorte n\xE4kyy kotin\xE4yt\xF6ll\xE4 ja avaa sovelluksen kuin natiivin.", sv: " Vorte visas nu p\xE5 hemsk\xE4rmen och \xF6ppnar appen som en native-app.", en: " Vorte now appears on your home screen and opens the app like a native app." }[lang]}</li><li>5. ${{ fi: " Kirjaudu sis\xE4\xE4n ja aloita natiivi Vorten k\xE4ytt\xF6kokemus", sv: " Logga in och starta den inbyggda Vorte-upplevelsen", en: " Sign in and start the native Vorte experience" }[lang]}</li></ol>`;
      }
      if (deferredPrompt) {
        deferredPrompt.prompt();
        dialog.innerHTML = `<a class="action" id="dashboard" href="https://vorte.app${{ fi: "/fi/ohjauspaneeli", sv: "/sv/instrumentpanel", en: "/en/dashboard" }[lang]}" hreflang="${lang}"> ${{ fi: "aloita k\xE4ytt\xF6", sv: "b\xF6rja anv\xE4nda", en: "start using" }[lang]} </a>`;
      }
    }, "prompt");
    window.pwaInstall = {
      prompt
    };
  })();
});
