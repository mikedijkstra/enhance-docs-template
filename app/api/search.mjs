import { dirname, join } from "node:path";
import { readFileSync } from "node:fs";

export async function post() {
  const here = dirname(url.fileURLToPath(import.meta.url));
  const base = join(here, "docs.json");
  const docs = JSON.parse(readFileSync(base, "utf-8"));

  return {
    json: {
      docs,
    },
  };
}
