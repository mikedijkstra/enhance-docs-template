export default function SiteHeader({ html, state }) {
  const { store } = state;
  const { path } = store;

  function createLink(route, label) {
    const isActive = path.includes(route);
    return isActive
      ? `<span class="font-medium">${label}</span>`
      : `<a href="${route}" class="global-nav-link">${label}</a>`;
  }

  const globalNavItems = `
    <ul class="list-none flex flex-col flex-row-lg gap-1 gap1-xl p-2 p-none-lg">
      <li>${createLink("/docs", "Docs")}</li>
    </ul>
  `;

  return html`
    <style>
      header {
        block-size: var(--nav-height);
      }

      .offset {
        translate: 0 -6.25%;
      }

      #logo-axol {
        inline-size: 3rem;
        aspect-ratio: 56 / 51;
      }

      figure a {
        color: unset;
      }

      #navToggle {
        border-radius: 4px;
        cursor: pointer;
      }

      #navToggle:hover {
        background: hsla(0deg 0% 0% / 0.125);
      }

      #navToggleInput {
        appearance: none;
      }

      /* Show outline on entire #navToggle when its (invisible) input is focused */
      #navToggle:has(#navToggleInput:focus-visible) {
        outline: 2px auto Highlight;
        outline: 2px auto -webkit-focus-ring-color;
        outline-offset: 2px;
      }

      #mobileNav {
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        box-shadow: 0 2px 6px hsla(0deg 0% 0% / 0.25);
        inset-block-start: var(--nav-height);
        display: none;
      }

      @media screen and (width < 48em) {
        :host:has(#navToggleInput:checked) #mobileNav {
          display: block;
        }
      }

      @media screen and (min-width: 48em) {
        #header-logo {
          inline-size: var(--docs-nav-width);
          /* Negative margin accounts for padding on header */
          margin-inline-end: calc(var(--space--2) * -1);
        }
      }

      .global-nav-link {
        transition: 0.15s color ease;
      }
    </style>

    <header class="relative z1 flex align-items-center p-2">
      <figure id="header-logo">
        <a href="/" class="flex align-items-center gap-1">
          <div class="relative offset">
            <img
              id="logo-axol"
              src="/_public/img/svg/enhance-axol.svg"
              alt=""
            />
          </div>

          <h1 class="font-medium text0 text1-lg">Enhance</h1>
        </a>
      </figure>

      <nav class="hidden block-lg text0">${globalNavItems}</nav>

      <div class="mis-auto flex align-items-center text0">
        <site-search-form></site-search-form>
        <site-search-results></site-search-results>
        <label
          id="navToggle"
          class="hidden-lg mis-auto flex align-items-center gap-5 pb-3 pi-2"
        >
          <svg
            height="24"
            width="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          Menu
          <input
            id="navToggleInput"
            type="checkbox"
            aria-label="Toggle site navigation"
          />
        </label>
      </div>
    </header>

    <nav
      id="mobileNav"
      class="hidden-lg text0 fixed inset-i-0 pb0 overflow-auto inset-be-0"
    >
      ${globalNavItems}
      <docs-nav></docs-nav>
    </nav>
    <script src="/_public/browser/search.mjs" type="module"></script>
  `;
}
