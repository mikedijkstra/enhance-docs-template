import { getStyles } from "@enhance/arc-plugin-styles";

const { linkTag } = getStyles;

export default function Head(state) {
  const { req, store } = state;
  store.path = req.path || "";

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Enhance Starter Project</title>
      ${linkTag()}
      <link rel='stylesheet' href='/_public/css/global.css' />
      <link rel="icon" href="/_public/favicon.svg">
      <meta name="description" content="The HTML first full stack web framework.">
    </head>
`;
}
