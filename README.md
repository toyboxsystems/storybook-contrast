<h1>Contrast Storybook Addon</h1>

This addon is used to show [Contrast](https://www.contrast.app) handoff tool in the addon panel.

## Demo
[Check out a demo here :)](https://s3.amazonaws.com/demo.contrast.app/index.html?path=/story/demo--basic)

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

### Diff Beta

Add this snippet tag to your preview-head.html file to your .storybook config folder. More info on preview-head [here]( https://storybook.js.org/docs/react/configure/story-rendering#adding-to-head)

```html
<script src="http://contrast-snippet.s3.amazonaws.com/contrast-snippet.js"></script>
```

## Support
Questions or feedback? 
You can reach us at support@contrast.app or through chat in the app.

### Documentation
https://help.contrast.app/52b293cd09494a609de1848c315b5bd7
