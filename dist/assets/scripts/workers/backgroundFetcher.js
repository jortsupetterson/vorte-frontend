// src/client/workers/backgroundFetcher.js
self.addEventListener("message", async (event) => {
  const request = await fetch(`/services/data/${event.data}`);
  const response = await request.text();
  postMessage(response);
});
