import {
  __name
} from "../../chunk-SHUYVCID.js";

// src/client/events/dashboard/handleEvents.js
async function handleEvents() {
  let welcomeWidget = document.querySelector("#welcome.widget");
  if (welcomeWidget) {
    document.querySelector("#welcome.widget button").addEventListener("click", async () => {
      welcomeWidget.classList.add("collapsed");
    });
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
