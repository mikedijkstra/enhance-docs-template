import { dirname, join } from "node:path";
import url from "node:url";
import { readFileSync } from "node:fs";
import { URL } from "node:url";
import { Arcdown } from "arcdown";
import HljsLineWrapper from "../../lib/hljs-line-wrapper.mjs";
import { default as defaultClassMapping } from "../../lib/markdown-class-mappings.mjs";

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get(req) {
  // reinvoked each req so no weird regexp caching
  const arcdown = new Arcdown({
    pluginOverrides: {
      markdownItToc: {
        containerClass: "toc mb2 ml-2",
        listType: "ul",
      },
      markdownItClass: defaultClassMapping,
    },
    hljs: {
      sublanguages: { javascript: ["xml", "css"] },
      plugins: [new HljsLineWrapper({ className: "code-line" })],
    },
  });

  const { path: activePath } = req;
  let docPath = activePath.replace(/^\/?docs\//, "") || "index";
  if (docPath.endsWith("/")) {
    docPath += "index"; // trailing slash == index.md file
  }

  const docURL = new URL(`../../docs/posts/${docPath}.md`, import.meta.url);
  const filePath =
    process.platform !== "win32"
      ? docURL.pathname
      : docURL.pathname.substring(1, docURL.pathname.length);

  let docMarkdown;
  try {
    docMarkdown = readFileSync(filePath, "utf-8");
  } catch (_err) {
    console.log(_err);
    return { statusCode: 404 };
  }
  const doc = await arcdown.render(docMarkdown);

  const here = dirname(url.fileURLToPath(import.meta.url));
  const base = join(here, "../", "docs.json");
  const docs = JSON.parse(readFileSync(base, "utf-8"));

  return {
    json: {
      doc,
      docs,
    },
  };
}
