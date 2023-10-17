function List(items) {
  return `
  <ul role="list" class="list-none grid gap4 gap2-lg col-1 col-3-lg">
    ${items
      .map((item) => {
        return `
  <li class="item">
    <a href="${item.posts[0].href}" class="block p2 text-center">
      <h3 class="mbe1">
          ${item.name}
      </h3>
      ${
        item.description
          ? `<p>
          ${item.description}
      </p>`
          : ""
      }
    </a>
  </li>
          `.trim();
      })
      .join("\n")}
  </ul>
      `.trim();
}

export default function SiteLayout({ html, state }) {
  const { store } = state;
  const { docs = {} } = store;

  return html`
    <style>
      section {
        max-width: 96rem;
        margin: 0 auto;
      }
      .item {
        box-shadow: 0 2px 6px hsla(0deg 0% 0% / 0.25);
        border-radius: 10px;
      }
      .item a {
        color: var(--color-primary);
      }
      .item a p {
        color: var(--color-muted);
      }
    </style>

    <section>${List(docs)}</section>
  `;
}
