# Basis
A lightweight responsive Sass/CSS framework based on flexible box.

<img src="https://avatars0.githubusercontent.com/u/18589717?v=3&s=200" alt="Basis" width="100" />

* Document: https://sass-basis.github.io/
* GitHub: https://github.com/sass-basis/basis/
* Release: https://github.com/sass-basis/basis/releases/

## Why it's awesome?

* Basis isn't about a UI framework. Basis provides only basic frame of components. So you build a responsive web page quickly and easy to overwrite with your sass or css.
* CSS architecture of Basis is [FLOCSS](https://github.com/hiloki/flocss). So it is possible a modular approach.
* Basis has incorporated the concept of vertical rhythm. So you can be a good-balanced design.
* Flexible grid system. Clean because using a flexible box.

## Demo ( HTML5 Templates )
* integrity: https://sass-basis.github.io/integrity/
* improve: https://sass-basis.github.io/improve/
* affinity: https://sass-basis.github.io/affinity/

## Get started

### Using yarn

Installs Basis
```
$ yarn install sass-basis
$ yarn run gulp build
```

Imports basis.styl your Stylus.
```
@import /PATH/TO/node_modules/sass-basis/src/css/basis;
```

Imports JavaScripts ( Require jQuery )
```
import '/PATH/TO/node_modules/sass-basis/src/js/basis.js';
```

### Download from GitHub

Download the basis from https://github.com/sass-basis/basis/releases

Imports basis.scss your Sass/SCSS.
```
@import /PATH/TO/basis/src/css/basis;
```

or Just this link.
```
<link rel="stylesheet" href="/PATH/TO/basis/dist/css/basis.min.css">
```

Loads JavaScripts
```
<script
  src="https://code.jquery.com/jquery-3.1.1.min.js"
  integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
  crossorigin="anonymous"></script>
<script src="/PATH/TO/node_modules/sass-basis/dist/js/basis.min.js"></script>
```

### Option

Support IE9 ( Not perfect )

```html
<!--[if lt IE 10]>
<link rel="stylesheet" href="/PATH/TO/basis/dist/css/plugin/basis-ie9/basis-ie9.min.css" />
<![endif]-->
```

And support IE8 ( Not perfect )

```html
<!--[if lt IE 9]>
<script src="/PATH/TO/basis/vendor/html5.js"></script>
<![endif]-->
```

## Browser support
Modern Browser and IE10+

## How to contribute

Please make an issue if there is a problem and needs.
Please don't make the new issue if the issue of the same content already exists.
If you can coding, please give me a pull request.
But, please do not send in the master branch.
Pull request sent to the master branch doesn't merge.

## Third party licenses

#### Scss version of Normalize.css
* MIT License
* https://github.com/ranjandatta/node-normalize-scss

## License

MIT License
