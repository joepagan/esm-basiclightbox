# esm-basiclightbox

A Webpack suitable ES Module using dynamic imports to load the npm package basicLightbox [basicLightbox](https://github.com/electerious/basicLightbox)

This ES Module will:

- loop over all the selectors with `document.querySelectorAll(selector)`
- Add a click event to each element
- The click event will create a `Promise.all()` which will wait for both of the library files to be loaded as chunks
- Once resolved, the `basicLightbox` code is initiated to either open an image or an iframe.

If you want IE11 support you'll need too add core-js promise polyfill to your entry point, and, a wrapper around the `querySelectorAll` within this package, it's probably just worth duping this module and adding to your app's project files and making those edits yourself.

## Usage

```bash
npm i esm-basiclightbox
```

Add some markup to your template using the specific classes `.js-lightbox-image` & `.js-lightbox-video`

```html
<a class="js-lightbox-image" href="https://images.unsplash.com/photo-1538475501351-ddcf9a9333bd?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c04574d04afc0d40c36bf0e70ff99a0f&auto=format&fit=crop&w=2992&q=80">Image</a>

<a class="js-lightbox-iframe" href="https://www.youtube.com/watch?v=cytyAgu9-bA">Iframe</a>
```

In your entry point:

```js
import { linkImageLightbox, linkIframeLightbox } from 'esm-basiclightbox';
linkImageLightbox('.js-lightbox-image');
linkIframeLightbox('.js-lightbox-iframe');
```

Lastly, you will likely need to alter your webpack config. Most setups by default will not minify any ES6 code from `node_modules` so we need to make an exception for this ES6 package. Also you may as well lint it, you can't rely on a random person from the internet to make things the best way, right?

In your config where you load `.js` files:

```js
{
  test: /\.js$/,
  include: [
    path.resolve(__dirname, paths.src.js),
    path.resolve(__dirname, paths.src.entries),
  ],
  exclude: /node_modules(?!\/esm\-)/,
  loader: 'babel-loader',
  options: {
    presets: ['@babel/preset-env'],
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-runtime'
    ],
  },
},
{
  test: /\.js$/,
  exclude: /node_modules(?!\/esm\-)/,
  loader: 'eslint-loader',
},
```

Click one of the queried elements and watch the network tab in your browser and marvel at the wonder.
