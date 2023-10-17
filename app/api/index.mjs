import { dirname, join } from "node:path";
import url from "node:url";
import { readFileSync } from "node:fs";

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get(req) {
  const here = dirname(url.fileURLToPath(import.meta.url));
  const base = join(here, "docs.json");
  const docs = JSON.parse(readFileSync(base, "utf-8"));

  return {
    json: {
      docs,
    },
  };
}
