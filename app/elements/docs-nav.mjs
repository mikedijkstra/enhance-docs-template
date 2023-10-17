function List(items) {
  return `
  <ul role="list" class="list-none pis-2">
    ${items
      .map((item) => {
        return `
  <li>
    ${item.type === "doc" ? Doc(item) : ""}
    ${item.type === "link" ? Link(item) : ""}
    ${item.type === "category" ? Category(item) : ""}
    ${item.items?.length > 0 ? List(item.items) : ""}
  </li>
          `.trim();
      })
      .join("\n")}
  </ul>
      `.trim();
}

function Doc(item) {
  return `
  <a href="${item.path}" class="p-4 block${item.active ? " active" : ""}">
    <div class="${item.type}-label">${item.label}</div>
    ${Description(item, ["mbs-4"])}
  </a>
      `.trim();
}

function Link(item) {
  return `
  <a href="${item.path}" class="p-4 mbe0 block${item.active ? " active" : ""}">
    <div class="${item.type}-label">${item.label}</div>
    ${Description(item, ["mbs-4"])}
  </a>
      `.trim();
}

function Category(item) {
  return `
  <div class="mbs3">
    <div class="category-label font-medium mbe-4 uppercase">${item.label}</div>
  </div>`;
}

function Description(item, classes = []) {
  return item.description
    ? `
  <div class="${["description text-1", ...classes].join(" ")}">
    ${item.description}
  </div>
        `.trim()
    : "";
}

export default function DocsNav({ html, state }) {
  const { store } = state;
  const { docs = [] } = store;

  const sidebarData = docs.map((category) => ({
    type: "category",
    label: category.name,
    description: category.description,
    position: category.position,
    items: category.posts.map((post) => ({
      type: "doc",
      label: post.title,
      description: post.description,
      position: post.position,
      path: post.href,
      active: post.href === store.path,
    })),
  }));
  return html`
    <style>
      li a {
        color: var(--color-primary);
      }
      li a.active,
      li a:hover {
        margin-left: -5px;
        background-color: var(--color-secondary);
        border-left: 5px solid var(--color-primary);
      }
      @media (prefers-color-scheme: dark) {
        li a.active,
        li a:hover {
          background-color: var(--color-secondary--onDark);
        }
      }
    </style>
    <nav>${List(sidebarData)}</nav>
  `;
}
