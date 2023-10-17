export default function SiteLayout({ html }) {
  return html`
    <site-header></site-header>
    <main class="p2">
      <slot></slot>
    </main>
  `;
}
