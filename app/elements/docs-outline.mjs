function FurtherReading(links) {
  const items = links.map((link) => {
    let item;
    for (const label in link) {
      item = `<li class="mbe-4"><a href="${link[label]}" target="_blank">${label}</a></li>`;
    }
    return item;
  });

  return /* html */ `
      <h3 class="mbe-2 font-semibold">Further Reading</h3>
      <ul class="mbe2 mis-2 list-none leading2">
        ${items.join("")}
      </ul>
    `;
}

export default function DocOutline({ html, state }) {
  const {
    store: { doc, gitHubLink },
  } = state;

  return html`
    <style>
      ul {
        list-style: none;
      }
      li > ul {
        list-style: none;
        padding-left: 0.7rem;
      }
      li a {
        color: var(--color-primary);
      }

      nav.toc ul li {
        margin-bottom: 0.7rem;
      }
      nav.toc li > ul {
        margin-top: 0.7rem;
      }
    </style>

    <aside>
      <slot name="toc"></slot>

      <!-- "Further Reading" -->
      ${doc?.frontmatter?.links?.length > 0
        ? FurtherReading(doc.frontmatter.links)
        : ""}
    </aside>
  `;
}
