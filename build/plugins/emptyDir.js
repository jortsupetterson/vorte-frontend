import { promises as fs } from "fs";
import { join } from "path";

/**
 * Empties the contents of a directory without removing the directory itself.
 *
 * @param {string} dirPath
 *   Absolute or relative path to the directory to clear.
 * @returns {Promise<void>}
 *   Resolves once all files and subdirectories have been removed.
 */

export default async function emptyDir(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  await Promise.all(
    entries.map(entry => {
      const fullPath = join(dirPath, entry.name);
      return fs.rm(fullPath, { recursive: true, force: true });
    })
  );
}
