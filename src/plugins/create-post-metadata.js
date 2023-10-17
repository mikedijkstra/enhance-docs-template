if (!process.env.ARC_ENV) {
  process.env.ARC_ENV = "testing";
}
const matter = require("gray-matter");
const { join, parse } = require("path"); // eslint-disable-line
const base = join(__dirname, "..", "..", "app", "docs");

async function generate() {
  const { readdir, readFile, writeFile } = require("fs/promises"); // eslint-disable-line

  const postPaths = await readdir(join(base, "posts"));
  const categoryPaths = await readdir(join(base, "categories"));

  async function render(path) {
    const file = await readFile(join(base, path), "utf8");
    const result = matter(file);
    return result.data;
  }

  async function getData(filePath) {
    const frontmatter = await render(filePath);
    const pathName = parse(filePath).name;
    return {
      href: `/docs/${pathName === "index" ? "" : pathName}`,
      frontmatter,
    };
  }

  const categories = [];
  for (let path of categoryPaths) {
    let category = await getData(join("categories", path));
    categories.push({
      name: category.frontmatter.name,
      description: category.frontmatter.description,
      position: category.frontmatter.position,
      posts: [],
    });
  }

  for (let path of postPaths) {
    let post = await getData(join("posts", path));
    let category = categories.find((c) => c.name === post.frontmatter.category);
    if (!category)
      throw new Error(`Category not found: ${post.frontmatter.category}`);
    category.posts.push({
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      position: post.frontmatter.position,
      ...post,
    });
  }

  const sortedCategories = categories
    .map((category) => ({
      ...category,
      posts: category.posts
        .slice()
        .sort(
          (a, b) =>
            (isNaN(a.position) ? category.posts.length : a.position) -
            (isNaN(b.position) ? category.posts.length : b.position)
        ),
    }))
    .sort(
      (a, b) =>
        (isNaN(a.position) ? posts.length : a.position) -
        (isNaN(b.position) ? posts.length : b.position)
    );

  let docsJson = join(__dirname, "..", "..", "app", "api", "docs.json");
  await writeFile(docsJson, JSON.stringify(sortedCategories, null, 2));
}

module.exports = {
  sandbox: {
    start: generate,
    watcher: async (params) => {
      let { filename } = params;
      if (!filename.includes(base) || !filename.endsWith(".md")) {
        return;
      }
      await generate(params);
    },
  },
};

if (require.main === module) {
  (async function () {
    try {
      generate();
    } catch (err) {
      console.log(err);
    }
  })();
}
