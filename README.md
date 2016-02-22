# basis
The Flexible Box (flexbox) based CSS framework.

## Website

http://inc2734.github.io/basis/

## GitHub

https://github.com/inc2734/basis

## Get started

### Using npm

1. ```$ npm install sass-basis```
2. Import basis.scss your Sass/SCSS.
```scss
@import /PATH/TO/node_modules/basis/src/scss/basis;
```
or Just this link.
```html
<link rel="stylesheet" href="/PATH/TO/node_modules/basis/dist/css/basis.min.css" />
```

### Download from GitHub

1. Download the basis from https://github.com/inc2734/basis/releases
2. Build basis
```shell
$ cd /PATH/TO/basis
$ npm install
$ gulp build
```
3. Import basis.scss your Sass/SCSS.
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

## Browser support
Modern Browser and IE10+

## Third party licenses

#### normalize.css v3.0.3
* MIT License
* github.com/necolas/normalize.css

## Changelog

#### February 8, 2015 v2.0.0
* Refactoring gulpfile.js
* Refactoring the grid gutter.
* Fixed grid system bugs.
* Changed directories and files name.
* Changed the col class name.
* Changed to use normalize.css of npm.
* Added vertical mode for the media module.
* Added FLOCSS object type prefix.
* Added IE9 Support ( optional )
* Added some utility classes.
* Removed `._c-row__col--flex` and added `._c-row--fill`

#### January 14, 2016 v1.4.0
* Changed prefix of class name.
* Changed grid system classes name.
* Changed break points.
* Changed form control classes.
* Changed heading elements margin.
* Removed table classes.
* Removed button size classes.
* Removed colors classes.
* Added media object class.

#### December 27, 2015 v1.3.0
* Remove text alignment classes.
* Changed directory structure.

#### December 16, 2015 v1.2.4
* Remove .bs-item--full
* Refactoring grid system.
* Added hidden classes.
* Changed font size unit. px to rem.
* Changed base font size.

#### November 28, 2015 v1.2.3
* Changed wrapper styles.
* Added .bs-container--size-no-gutter
* Removed xs prefix.
* Added button styles.
* Updated alert style.
* Updated wrapper style.

#### November 27, 2015 v1.2.2
* Added default flags.

#### November 25, 2015 v1.2.0
* Changed heading elements font size.
* Added styles: heading secondary text, tables.
* Added text alignment classes.
* Updated code element style.

#### November 21, 2015 v1.1.0
* Added normalize.css
* Added styles: Lists, Blockquote, Forms.
* Added container-gutter style.
* Fixed button style.

#### November 20, 2015 v1.0.0
* Release

## License

GPLv2 or later
