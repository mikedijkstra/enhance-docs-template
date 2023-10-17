export default function li(state) {
  const { name = "" } = state;
  return `<li class="flex">
    ${name}
  </li>`;
}
