export default function SiteSearchForm({ html }) {
  return html`
      <form action=/search/ method=post>
        <input type="text">
        <button>Search</button>
      </form>
    `;
}
