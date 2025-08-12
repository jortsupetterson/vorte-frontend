import "../chunk-SHUYVCID.js";

// src/client/network/sw.js
var CACHE_VERSION = "0.0.0";
var PRE_CACHE = `pre-cache-${CACHE_VERSION}`;
var ASSETS_CACHE = `assets-cache-${CACHE_VERSION}`;
var SERVICES_CACHE = `services-cache-${CACHE_VERSION}`;
var PRECACHE_URLS = [
  "/scripts/app.js",
  "/scripts/network/sw.js",
  "/scripts/events/authentication/handleEvents.js",
  "/scripts/events/dashboard/handleEvents.js",
  "/scripts/events/settings/handleEvents.js",
  "/styles/app/style.css",
  "/styles/authentication/style.css",
  "/styles/dashboard/style.css",
  "/styles/settings/style.css"
];
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(PRE_CACHE).then((cache) => cache.addAll(PRECACHE_URLS)));
  self.skipWaiting();
});
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener("fetch", (event) => {
});
