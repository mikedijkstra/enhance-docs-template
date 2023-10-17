import li from "./site-search-result.mjs";

export default function SiteSearchResults({ html, state }) {
  const { store = {} } = state;
  const { searchResults = [] } = store;
  const items = searchResults.map((t) => li(t)).join("\n");

  return html`
    <ul
      class="
        grid
        gap-1
        p0
        list-none
      "
    >
      ${items}
    </ul>
  `;
}
