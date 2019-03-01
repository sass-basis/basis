# Basis
A lightweight responsive Sass/CSS framework based on flexible box.

<img src="https://avatars0.githubusercontent.com/u/18589717?v=3&s=200" alt="Basis" width="100" />

* Document: https://sass-basis.github.io/
* GitHub: https://github.com/sass-basis/basis/
* Release: https://github.com/sass-basis/basis/releases/

## Why it's awesome?

* Basis isn't about a UI framework. Basis provides only basic frame of components. So you build a responsive web page quickly and easy to overwrite with your Sass or CSS.
* CSS architecture of Basis is [FLOCSS](https://github.com/hiloki/flocss). So it is possible a modular approach.
* Basis has incorporated the concept of vertical rhythm. So you can be a good-balanced design.
* Basis has many mixins. Usufule mixins and abstract mixin of compornents.

## Demo ( HTML5 Templates )
* integrity: https://sass-basis.github.io/integrity/
* improve: https://sass-basis.github.io/improve/
* affinity: https://sass-basis.github.io/affinity/

## Get started

### Using Basis Project (Starter Kit)
```
$ git clone https://github.com/sass-basis/starter-kit.git
$ cd starter-kit
$ npm install
$ npm start
```

### Using NPM

Installs Basis
```
$ npm install sass-basis
```

Imports Basis your Sass/SCSS.
```
/* If you want to use Basis classes */
@import node_modules/sass-basis/src/css/basis;

/* If you want to use Basis mixins only */
@import node_modules/sass-basis/src/css/basis-core;
```

Imports JavaScript
```
import 'node_modules/sass-basis/src/js/basis.js';
```

### Download from GitHub

Download the basis from https://github.com/sass-basis/basis/releases

Imports Basis your Sass/SCSS.
```
/* If you want to use Basis classes */
@import basis/src/css/basis;

/* If you want to use Basis mixins only */
@import basis/src/css/basis-core;
```

or Just this link.
```
<link rel="stylesheet" href="basis/dist/css/basis.min.css">
```

Loads JavaScripts
```
<script src="node_modules/sass-basis/dist/js/basis.min.js"></script>
```

### Using CDN (jsDelivr)
https://cdn.jsdelivr.net/npm/sass-basis@latest/dist/

### Sample for using classes
```
<a class="c-btn c-btn--block">Btn</a>
```

### Sample for using abstracts
```
.c-btn {
  @include _c-btn();

  &--block {
    display: block;
  }
}
```
```
<a class="c-btn c-btn--block">Btn</a>
```

### Option

Support IE9 ( Not perfect )

```html
<!--[if lt IE 10]>
<link rel="stylesheet" href="node_modules/sass-basis/dist/css/plugin/basis-ie9/basis-ie9.min.css" />
<![endif]-->
```

And support IE8 ( Not perfect )

```html
<!--[if lt IE 9]>
<script src="node_modules/html5shiv/dist/html5shiv.js"></script>
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

## License

MIT License
