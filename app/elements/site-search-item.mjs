export default function SiteSearchItem({ html, state }) {
  const { attrs } = state;
  const { name = "" } = attrs;

  return html` <div class="flex flex-grow items-center">${name}</div>`;
}
