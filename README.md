![](https://raw.githubusercontent.com/storybookjs/brand/master/badge/badge-storybook.svg)

<h1>Contrast Storybook Addon</h1>

This addon is used to show [Contrast](https://www.contrast.app) handoff tool in the addon panel.

## Demo

[Check out a demo here :)](https://contrastapp.wistia.com/medias/w71tocgxnm)

![Demo](https://contrast-prod.s3.amazonaws.com/demo.png)

-   [Getting Started](#getting-started)
    -   [Install using preset](#install-using-preset)
-   [Support](#support)
    -   [Docs](#documentation)

## Getting Started

1. Install the Addon

```sh
yarn add storybook-contrast
```

2. Add the following to your `.storybook/main.js` exports:

```js
module.exports = {
    addons: ["storybook-contrast"]
};
```

3. Add script tag to your `.storybook/preview-head.html`. More info on preview-head [here](https://storybook.js.org/docs/react/configure/story-rendering#adding-to-head)

```html
<script
    id="contrast-snippet"
    src="http://contrast-snippet.s3.amazonaws.com/contrast-snippet.js"
></script>
```

4. Open Contrast Addon in Storybook

## Support

Questions or feedback?
You can reach us at support@contrast.app or through chat in the app.

### Documentation

https://help.contrast.app/52b293cd09494a609de1848c315b5bd7
