<h1>Contrast Storybook Addon</h1>

This addon is used to show [Contrast](https://www.contrast.app) handoff tool in the addon panel.

## Demo
[Check out a demo here :)](https://contrastapp.wistia.com/medias/w71tocgxnm)

![Demo](http://contrast-prod.s3.amazonaws.com/demo.png)

- [Getting Started](#getting-started)
  - [Install using preset](#install-using-preset)
- [Support](#support)
  - [Docs](#documentation)

## Getting Started

First, install the addon

```sh
yarn add storybook-contrast
```

You can add configuration for this addon by using a preset


### Install using preset

Add the following to your `.storybook/main.js` exports:

```js
module.exports = {
  addons: ['storybook-contrast'],
};
```

### Diff Feature

Add this snippet tag to your preview-head.html file to your .storybook config folder. More info on preview-head [here]( https://storybook.js.org/docs/react/configure/story-rendering#adding-to-head)

```html
<script id="contrast-snippet" src="http://contrast-snippet.s3.amazonaws.com/contrast-snippet.js"></script>
```

If you haven't already signed into Contrast via the addon you will need to do so and then refresh for Diff to start working.

## Support
Questions or feedback? 
You can reach us at support@contrast.app or through chat in the app.

### Documentation
https://help.contrast.app/52b293cd09494a609de1848c315b5bd7
