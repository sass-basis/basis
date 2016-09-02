# Basis
A lightweight responsive CSS framework based on flexible box ( flexbox ).

*** <a href="https://getbasis.github.io">Heads up! These docs are for Sass based, which is no longer officially supported. Check out the latest version of Stylus based Basis!</a> ***

<img src="https://avatars0.githubusercontent.com/u/18589717?v=3&s=200" alt="Basis" width="100" />

* Document: http://sass-basis.github.io/
* GitHub: https://github.com/sass-basis/basis/
* Release: https://github.com/sass-basis/basis/releases/

## Why it's awesome?

* Basis isn't about a UI framework. Basis provides only basic frame of components. So you build a responsive web page quickly and easy to overwrite with your sass or css.
* CSS architecture of Basis is [FLOCSS](https://github.com/hiloki/flocss). So it is possible a modular approach.
* Basis has incorporated the concept of vertical rhythm. So you can be a good-balanced design.
* Flexible grid system. Clean because using a flexible box.
* highly extensible. The core is only the basic components, it can be extended with [add-on](https://github.com/sass-basis).

## Demo ( HTML5 Templates )
* integrity: http://sass-basis.github.io/integrity/
* improve: http://sass-basis.github.io/improve/
* affinity: http://sass-basis.github.io/affinity/

## Get started

### Using npm

1. ```$ npm install sass-basis```
2. Import basis.scss your Sass/SCSS.
```scss
@import /PATH/TO/node_modules/sass-basis/src/scss/basis;
```

IF you want to use build files, just do this.

```shell
$ cd /PATH/TO/sass-basis
$ npm install
$ gulp build
```

### Download from GitHub

1. Download the basis from https://github.com/sass-basis/basis/releases
2. Import basis.scss your Sass/SCSS.
```scss
@import /PATH/TO/basis/src/scss/basis;
```
or Just this link.
```html
<link rel="stylesheet" href="/PATH/TO/basis/dist/css/basis.min.css" />
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

#### normalize.css v4.0.0
* MIT License
* github.com/necolas/normalize.css

## License

MIT License
