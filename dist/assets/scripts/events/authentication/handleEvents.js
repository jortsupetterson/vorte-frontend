import {
  __name
} from "../../chunk-SHUYVCID.js";

// src/shared/utilities/waitForTurnstile.js
async function waitForTurnstile(interval = 100, timeout = 5e3) {
  const start = performance.now();
  let ts;
  do {
    ts = globalThis.turnstile;
    if (ts) return ts;
    if (performance.now() - start > timeout) {
      throw new Error("Turnstile ei latautunut ajoissa");
    }
    await new Promise((res) => setTimeout(res, interval));
  } while (!ts);
}
__name(waitForTurnstile, "waitForTurnstile");

// node_modules/@jortsupetterson/real-world-validator/index.js
function validateProperName(field, lang = "en") {
  const { id, value, successMessage, errorMessage } = field;
  if (typeof value !== "string") {
    throw new TypeError("Name must be a string");
  }
  const s = value.normalize("NFC").trim();
  const isValid = RE_PROPER_NAME_LATIN.test(s);
  return {
    id,
    status: isValid,
    message: isValid ? successMessage || MESSAGES.valid[lang] : errorMessage || MESSAGES.invalid[lang]
  };
}
__name(validateProperName, "validateProperName");
var RE_PROPER_NAME_LATIN = /^(?=.{1,64}$)(?:[A-Z\u00C0-\u00D6\u00D8-\u00DE\u1E00-\u1EFF][A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F\u1E00-\u1EFF]*)(?:[-\u2010\u2011'’][A-Z\u00C0-\u00D6\u00D8-\u00DE\u1E00-\u1EFF][A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F\u1E00-\u1EFF]*)?$/;
var MESSAGES = {
  valid: {
    fi: "Nimi on kelvollinen.",
    sv: "Namnet \xE4r giltigt.",
    en: "The name is valid."
  },
  invalid: {
    fi: "Nimen tulee alkaa isolla kirjaimella ja olla muodossa 'Esimerkki' tai 'Esimerkki-Esimerkki'.",
    sv: "Namnet m\xE5ste b\xF6rja med en stor bokstav och vara i formen 'Exempel' eller 'Exempel-Exempel'.",
    en: "The name must start with a capital letter and be in the form 'Example' or 'Example-Example'."
  }
};
var RE_EMAIL_ADDRESS_LATIN = /^(?=.{1,254}$)(?=^[^@]{1,64}@)(?:[A-Za-z0-9\u00C0-\u024F\u1E00-\u1EFF_%+'-]+(?:\.[A-Za-z0-9\u00C0-\u024F\u1E00-\u1EFF_%+'-]+)*)@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+(?:[A-Za-z]{2,63}|xn--[A-Za-z0-9-]{2,59})$/;
var MESSAGES2 = {
  valid: {
    fi: "S\xE4hk\xF6postiosoite on kelvollinen.",
    sv: "E-postadressen \xE4r giltig.",
    en: "The email address is valid."
  },
  invalid: {
    fi: "S\xE4hk\xF6postiosoitteen on oltava muodossa 'user@example.com'.",
    sv: "E-postadressen m\xE5ste vara i formen 'user@example.com'.",
    en: "The email address must be in the form 'user@example.com'."
  }
};
function validateEmailAddress(field, lang = "en") {
  const { id, value, successMessage, errorMessage } = field;
  if (typeof value !== "string") {
    throw new TypeError("Email address must be a string");
  }
  const s = value.trim();
  const isValid = RE_EMAIL_ADDRESS_LATIN.test(s);
  return {
    id,
    status: isValid,
    message: isValid ? successMessage || MESSAGES2.valid[lang] : errorMessage || MESSAGES2.invalid[lang]
  };
}
__name(validateEmailAddress, "validateEmailAddress");
var RE_PHONE_PLUS_3_9 = /^\+[1-9]\d{2}\d{9}$/;
var MESSAGES3 = {
  valid: {
    fi: "Puhelinnumero on kelvollinen.",
    sv: "Telefonnumret \xE4r giltigt.",
    en: "The phone number is valid."
  },
  invalid: {
    fi: "Puhelinnumeron on oltava muodossa '+123123456789' (kolme numeroa maatunnus ja yhdeks\xE4n numeroa).",
    sv: "Telefonnumret m\xE5ste vara i formen '+123123456789' (tre siffror landskod och nio siffror).",
    en: "The phone number must be in the format '+123123456789' (three-digit country code and nine digits)."
  }
};
function validatePhoneNumber(field, lang = "en") {
  const { id, value, successMessage, errorMessage } = field;
  if (typeof value !== "string") {
    throw new TypeError("Phone number must be a string");
  }
  if (value.length !== 13 || value.charCodeAt(0) !== 43) {
    return {
      id,
      status: false,
      message: errorMessage || MESSAGES3.invalid[lang]
    };
  }
  const isValid = RE_PHONE_PLUS_3_9.test(value);
  return {
    id,
    status: isValid,
    message: isValid ? successMessage || MESSAGES3.valid[lang] : errorMessage || MESSAGES3.invalid[lang]
  };
}
__name(validatePhoneNumber, "validatePhoneNumber");
var MESSAGES4 = {
  valid: {
    fi: "Valintaruutu on valittu.",
    sv: "Kryssrutan \xE4r markerad.",
    en: "The checkbox is checked."
  },
  invalid: {
    fi: "T\xE4m\xE4 valintaruutu on pakollinen ja sen on oltava valittuna.",
    sv: "Den h\xE4r kryssrutan \xE4r obligatorisk och m\xE5ste vara markerad.",
    en: "This checkbox is required and must be checked."
  }
};
function validateCheckboxInput(field, lang = "en") {
  const { id, required, value, successMessage, errorMessage } = field;
  if (typeof value !== "boolean") {
    throw new TypeError("Checkbox value must be a boolean");
  }
  let isValid = true;
  if (required === true && value === false) {
    isValid = false;
  }
  return {
    id,
    status: isValid,
    message: isValid ? successMessage || MESSAGES4.valid[lang] : errorMessage || MESSAGES4.invalid[lang]
  };
}
__name(validateCheckboxInput, "validateCheckboxInput");
function sanitizeString(input, opts = {}) {
  const {
    trim = true,
    collapseWhitespace = true,
    stripControls = true,
    maxLen = 4096
  } = opts;
  let s = String(input ?? "");
  if (trim) s = s.trim();
  if (stripControls) s = s.replace(/[\u0000-\u001F\u007F]/g, "");
  if (collapseWhitespace) s = s.replace(/\s+/g, " ");
  if (maxLen && s.length > maxLen) s = s.slice(0, maxLen);
  return s;
}
__name(sanitizeString, "sanitizeString");
function escapeHTML(input) {
  return String(input ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
__name(escapeHTML, "escapeHTML");
var handlers = {
  properName: validateProperName,
  emailAddress: validateEmailAddress,
  phoneNumber: validatePhoneNumber,
  checkboxInput: validateCheckboxInput,
  string: sanitizeString,
  html: escapeHTML
};
async function validate(fields, lang = "en") {
  if (!Array.isArray(fields)) {
    throw new TypeError("fields must be an array of rule objects");
  }
  const outcome = [];
  for (const field of fields) {
    const fn = handlers[field.type];
    const response = fn(field, lang);
    outcome.push({
      id: response.id,
      status: response.status,
      message: response.message
    });
  }
  return outcome;
}
__name(validate, "validate");

// src/client/events/authentication/signUp/validateSignUpForm.js
async function validateSignUpForm(form, lang) {
  return validate(
    [
      {
        id: "firstname",
        type: "properName",
        required: true,
        value: form.firstname,
        errorMessage: {
          fi: "Etunimi on pakollinen",
          sv: "F\xF6rnamn kr\xE4vs",
          en: "First name is required"
        }[lang]
      },
      {
        id: "lastname",
        type: "properName",
        required: true,
        value: form.lastname,
        errorMessage: {
          fi: "Sukunimi on pakollinen",
          sv: "Efternamn kr\xE4vs",
          en: "Last name is required"
        }[lang]
      },
      {
        id: "email",
        type: "emailAddress",
        required: true,
        value: form.email,
        errorMessage: {
          fi: "S\xE4hk\xF6posti on pakollinen",
          sv: "E-post kr\xE4vs",
          en: "Email is required"
        }[lang]
      },
      {
        id: "terms-acceptance",
        type: "checkboxInput",
        required: true,
        value: form.termsAcceptance,
        errorMessage: {
          fi: "Hyv\xE4ksy ehdot",
          sv: "Acceptera villkoren",
          en: "Accept terms"
        }[lang]
      },
      {
        id: "contact-permission",
        type: "checkboxInput",
        required: true,
        value: form.contactPermission,
        errorMessage: {
          fi: "Yhteydenotto\u2011lupa on pakollinen",
          sv: "Kontakt\u2011tillst\xE5nd kr\xE4vs",
          en: "Contact permission is required"
        }[lang]
      }
    ],
    lang
  );
}
__name(validateSignUpForm, "validateSignUpForm");

// src/client/events/authentication/signUp/initDialog.js
function initDialog(form, lang, btn, token) {
  return new Promise(async (resolve) => {
    const dialog = document.createElement("dialog");
    dialog.innerHTML = `<div class="loader-row"><div id="loader-text" aria-live="polite">${{ fi: "Pieni hetki", sv: "En liten stund", en: "Just a second" }[lang]}</div><div id="loader-animation"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div>`;
    document.body.appendChild(dialog);
    dialog.show();
    try {
      btn.disabled = true;
      const response = await fetch(`/services/authn/sign_up/init?token=${token}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(form) });
      if (response.status === 202) {
        const userEmail = `<strong>${form.email}</strong>`;
        dialog.innerHTML = `<h2>${{ fi: "Vahvista s\xE4hk\xF6postiosoitteesi", sv: "Bekr\xE4fta din e-postadress", en: "Confirm your email address" }[lang]}</h2><div class="row transparent" id="code-input"><input class="digit" type="text" inputmode="numeric" autocomplete="one-time-code" pattern="\\d" maxlength="8"></div><p>${{ fi: `Sy\xF6t\xE4 8-numeroinen koodi, jonka l\xE4hetimme osoitteeseen "${userEmail}" osoitteesta "DoNotReply@mail.vorte.app"`, sv: `Ange den 8-siffriga koden som vi skickade till "${userEmail}" fr\xE5n adressen "DoNotReply@mail.vorte.app"`, en: `Enter the 8-digit code we sent to "${userEmail}" from "DoNotReply@mail.vorte.app"` }[lang]}</p><button id="send-confirmation" class="action" title="${{ fi: "L\xE4het\xE4 koodi palvelimelle tarkistettavaksi ja kirjaudu sis\xE4\xE4n", sv: "Skicka koden till servern f\xF6r kontroll och logga in", en: "Send the code to the server for verification and sign in" }[lang]}" > ${{ fi: "vahvista k\xE4ytt\xE4j\xE4", sv: "bekr\xE4fta anv\xE4ndare", en: "verify account" }[lang]} </button><a hreflang="${lang}" id="sign_up" href="${{ fi: "/fi/luo-k\xE4ytt\xE4j\xE4tili", sv: "/sv/skapa-konto", en: "/en/create-an-account" }[lang]}" title="${{ fi: "Yrit\xE4 l\xE4hett\xE4\xE4 lomake uudelleen", sv: "F\xF6rs\xF6k skicka formul\xE4ret igen", en: "Try resubmitting the form" }[lang]}"><h5> ${{ fi: "Etk\xF6 saanut s\xE4hk\xF6postia? L\xE4het\xE4 lomake uudelleen.", sv: "Fick du inte e-post? Skicka formul\xE4ret igen.", en: "Didn't receive the email? Resubmit the form." }[lang]} </h5></a>`;
        resolve();
      } else {
        throw new Error(response);
      }
    } catch (error) {
      dialog.textContent = {
        fi: 'Jokin meni pieleen. Jos ongelma jatkuu, ota yhteys Vorten tukeen. "support@vorte.app"',
        sv: 'N\xE5got gick fel. Kontakta Vortes support om problemet kvarst\xE5r. "support@vorte.app"',
        en: 'Something went wrong. If the problem persists, please contact Vorte support. "support@vorte.app"'
      }[lang];
      btn.disabled = false;
      console.log(error);
    }
  });
}
__name(initDialog, "initDialog");

// src/client/events/authentication/signUp/handler.js
async function signUpHandler(widgetId) {
  const lang = document.documentElement.lang || "en";
  const btn = document.getElementById("sign-up-btn");
  if (!btn) return;
  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    let token = "";
    if (typeof turnstile !== "undefined" && widgetId) {
      token = turnstile.getResponse(widgetId);
    }
    const form = {
      firstname: document.getElementById("firstname").value,
      lastname: document.getElementById("lastname").value,
      email: document.getElementById("email").value,
      termsAcceptance: document.getElementById("terms-acceptance").checked,
      contactPermission: document.getElementById("contact-permission").checked,
      newsletterSubscription: document.getElementById("newsletter-subscription").checked
    };
    ["firstname", "lastname", "email", "terms-acceptance", "contact-permission"].forEach((id) => {
      const fb = document.getElementById(`${id}-feedback`);
      if (fb) fb.textContent = "";
    });
    const outcomes = await validateSignUpForm(form, lang);
    let allValid = true;
    for (const { id, status, message } of outcomes) {
      if (!status) {
        const fb = document.getElementById(`${id}-feedback`);
        if (fb) fb.textContent = message;
        allValid = false;
      }
    }
    if (!allValid) return;
    await initDialog(form, lang, btn, token);
    const confirmationBtn = document.getElementById("send-confirmation");
    confirmationBtn.addEventListener("click", async () => {
      const message = JSON.stringify({ code: document.querySelector("input.digit").value, form });
      try {
        const dialog = document.body.querySelector("dialog");
        dialog.innerHTML = ` <div class="loader-row"><div id="loader-text" aria-live="polite">${{ fi: "Luodaan tili\xE4", sv: "Skapar ditt konto", en: "Creating your account" }[lang]}</div><div id="loader-animation"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div>`;
        const data = await fetch("/services/authn/sign_up/callback", {
          method: "post",
          headers: {
            "content-type": "application/json"
          },
          body: message
        });
        const operationResult = await data.text();
        console.log(operationResult);
        console.log(operationResult.status);
        const viableCodes = /* @__PURE__ */ new Set([201, 409, 400]);
        const operationStatus = viableCodes.has(data.status) ? data.status : 400;
        if (operationStatus === 201) {
          cookies.HAS_ACCOUNT = "true";
        }
        const dialogReady = new Promise((resolve) => {
          document.getElementById("loader-text").textContent = {
            201: { fi: "Tilin luonti onnistui!", sv: "Kontot har skapats!", en: "Account created successfully!" },
            409: {
              fi: "T\xE4ll\xE4 s\xE4hk\xF6postiosoitteella on jo tili",
              sv: "Det finns redan ett konto med den h\xE4r e-postadressen",
              en: "An account with this email address already exists"
            },
            400: {
              fi: "Antamasi koodi oli v\xE4\xE4rin tai vanhentunut",
              sv: "Koden du angav var felaktig eller har g\xE5tt ut",
              en: "The code you entered was incorrect or has expired"
            }
          }[operationStatus][lang];
          const animation = document.getElementById("loader-animation");
          animation.classList.add("ready");
          animation.classList.add(
            {
              201: "success",
              409: "error",
              400: "error"
            }[operationStatus]
          );
          dialog.insertAdjacentHTML(
            "beforeend",
            {
              201: `<a class="action" id="install" hreflang="${lang}" href="https://why.vorte.app${{ fi: "/fi/asenna", sv: "/sv/installera", en: "/en/install" }[lang]}" >${{ fi: " lis\xE4\xE4 laitteesi aloitusn\xE4yt\xF6lle", sv: " l\xE4gg till p\xE5 din enhets startsk\xE4rm", en: " add to your device's home screen" }[lang]}</a><a class="action" id="dashboard" href="https://vorte.app${{ fi: "/fi/ohjauspaneeli", sv: "/sv/instrumentpanel", en: "/en/dashboard" }[lang]}" hreflang="${lang}"> ${{ fi: " k\xE4yt\xE4n mielummin selaimessa", sv: " jag f\xF6redrar att anv\xE4nda webbl\xE4saren", en: " I prefer to use it in the browser" }[lang]} </a>`,
              409: `<a class="action" id="sign_in" href="${{ fi: "/fi/kirjautuminen", sv: "/sv/inloggning", en: "/en/login" }[lang]}" hreflang="${lang}"> ${{ fi: " siirry kirjautumiseen", sv: " g\xE5 till inloggning", en: " go to login" }[lang]} </a>`,
              400: `<a class="action" id="sign_up" href="${{ fi: "/fi/luo-k\xE4ytt\xE4j\xE4tili", sv: "/sv/skapa-konto", en: "/en/create-an-account" }[lang]}" hreflang="${lang}"> ${{ fi: " yrit\xE4 uudelleen", sv: " f\xF6rs\xF6k igen", en: " try again" }[lang]} </a>`
            }[operationStatus]
          );
          resolve();
        });
        await dialogReady;
        const installEl = document.getElementById("install");
        installEl.addEventListener("click", (e2) => {
          e2.preventDefault();
          window.pwaInstall.prompt(lang);
        });
      } catch (err) {
        console.error(err);
      }
    });
  });
}
__name(signUpHandler, "signUpHandler");

// src/client/events/authentication/signIn/handler.js
var socials = /* @__PURE__ */ new Set(["apple", "google", "microsoft"]);
async function signInHandler(widgetId) {
  const lang = document.documentElement.lang || "en";
  document.addEventListener("click", async (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    let token = "";
    if (typeof turnstile !== "undefined" && widgetId) {
      token = turnstile.getResponse(widgetId);
    }
    const method = btn.getAttribute("data-method");
    const provider = btn.getAttribute("data-provider");
    let url = `/services/authn/sign_in/init/${method}/${provider}?token=${token}`;
    if (method === "social" && socials.has(provider)) {
      window.location.href = url;
      return;
    }
  });
}
__name(signInHandler, "signInHandler");

// src/client/events/authentication/handleEvents.js
async function handleEvents() {
  const btns = document.body.querySelectorAll("button");
  btns.forEach((btn) => {
    btn.disabled = true;
  });
  await waitForTurnstile();
  let widgetId;
  widgetId = turnstile.render("#turnstile-container", {
    sitekey: "0x4AAAAAABfpGcyoBCK_N8CO",
    theme: document.documentElement.getAttribute("data-theme"),
    size: "flexible",
    callback() {
      btns.forEach((btn) => {
        btn.disabled = false;
      });
    },
    "expired-callback"() {
      if (widgetId) {
        turnstile.reset(widgetId);
      }
      btns.forEach((btn) => {
        btn.disabled = true;
      });
    }
  });
  if (document.documentElement.getAttribute("data-view") === "sign_up") {
    signUpHandler(widgetId);
  }
  if (document.documentElement.getAttribute("data-view") === "sign_in") {
    signInHandler(widgetId, btns);
  }
}
__name(handleEvents, "handleEvents");
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", handleEvents);
} else {
  handleEvents();
}
export {
  handleEvents
};
