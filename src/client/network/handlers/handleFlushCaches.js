/**
 * Flushaa Cache Storagea tehokkaasti.
 *
 * Käyttö:
 *  - Ilman directoryä: poistaa kokonaiset cachet.
 *  - directory mukana: poistaa vain ne entryt, joiden URLin path alkaa annetusta hakemistosta
 *    (tulkitaan suhteessa SW:n scopeen). Tyhjät cachet poistetaan lopuksi.
 *
 * @param {Object} [opts]
 * @param {string} [opts.directory] Esim. '/assets/' tai 'static/'. Suhteellinen SW-scopeen.
 * @param {string} [opts.cacheNamePrefix] Rajaa vain tiettyihin cacheihin, esim. 'vorte-'.
 * @param {number} [opts.concurrency] Samanaikaisten työntekijöiden määrä (oletus: hardwareConcurrency tai 8).
 * @returns {Promise<{cachesScanned:number,cachesDeleted:number,entriesDeleted:number}>}
 */
export async function flushCaches(opts = {}) {
  const {
    directory,
    cacheNamePrefix,
    concurrency = (self.navigator && self.navigator.hardwareConcurrency) || 8,
  } = opts;

  const allNames = await caches.keys();
  const names = cacheNamePrefix
    ? allNames.filter(n => n.startsWith(cacheNamePrefix))
    : allNames;

  
  if (names.length === 0) {
    return { cachesScanned: 0, cachesDeleted: 0, entriesDeleted: 0 };
  }

  // Jos directorya ei annettu → poista kokonaiset cachet (nopea polku).
  if (!directory) {
    let i = 0, deleted = 0;
    const workers = Array(Math.min(concurrency, names.length)).fill(0).map(async () => {
      for (;;) {
        const idx = i++;
        if (idx >= names.length) return;
        const ok = await caches.delete(names[idx]);
        if (ok) deleted++;
      }
    });
    await Promise.all(workers);
    return { cachesScanned: names.length, cachesDeleted: deleted, entriesDeleted: 0 };
  }

  // Directory annettu → poista vain kyseiseen polkuun osuvat entryt
  const scopeBase = (self.registration && self.registration.scope) ||
                    (self.location && (self.location.origin + '/')) ||
                    '/';
  const dirURL = new URL(directory, scopeBase);
  // Normalisoi: varmista päättyvä '/' jotta '/assets' ei matchaa '/assets-old'
  if (!dirURL.pathname.endsWith('/')) dirURL.pathname += '/';
  const prefixOrigin = dirURL.origin;
  const prefixPath = dirURL.pathname; // esim. '/assets/'

  let nameIdx = 0;
  let entriesDeleted = 0;
  let cachesDeleted = 0;

  const workers = Array(Math.min(concurrency, names.length)).fill(0).map(async () => {
    for (;;) {
      const idx = nameIdx++;
      if (idx >= names.length) return;
      const name = names[idx];

      const cache = await caches.open(name);
      const reqs = await cache.keys(); // O(k) per cache (API ei tarjoa streamia)

      // Poista matching-entryt
      for (const req of reqs) {
        const u = new URL(req.url);
        if (u.origin === prefixOrigin && u.pathname.startsWith(prefixPath)) {
          // Poistetaan täsmälleen tämä request-objekti -> varmin match
          const ok = await cache.delete(req);
          if (ok) entriesDeleted++;
        }
      }

      // Jos cache tyhjeni, tuhoa koko cache
      if ((await cache.keys()).length === 0) {
        const ok = await caches.delete(name);
        if (ok) cachesDeleted++;
      }
    }
  });

  await Promise.all(workers);
  return { cachesScanned: names.length, cachesDeleted, entriesDeleted };
}
