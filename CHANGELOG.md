#Changelog

## June 24, 2019 v9.3.2
* Fixed the bug that input group button might be hidden.

## June 11, 2019 v9.3.0
* Add `.c-navbar[data-popup-mode="click"]`

## May 23, 2019 v9.2.14
* Fix `_balloon()` bug.

## April 11, 2019 v9.2.13
* Corrected focus to return to correct position when the drawer is closed

## April 10, 2019 v9.2.12
* Update checkbox accesible
* Update radio accesible
* Update textarea default style

## April 8, 2019 v9.2.11
* Update drawer accesible
* Update checkbox styles

## March 6, 2019 v9.2.10
* Refactoring JavaScript codes

## March 1, 2019 v9.2.9
* Fixed a bug that `.c-select` not working on IE11
* Remove jQuery code

## December 5, 2018 v9.2.7
* Add `.c-form-control--has-icon`

## November 27, 2018 v9.2.6
* Refactoring drawer and hamburger button.

## November 27, 2018 v9.2.5
* Fix hamburger button bug on FireFox.

## November 22, 2018 v9.2.4
* Refactoring `.c-drawer-close-zone`

## November 22, 2018 v9.2.3
* Refactoring `.c-hamburger-btn` and `.c-drawer`

## November 12, 2018 v9.2.2
* Update `.c-input-group` for iOS Safari.

## October 31, 2018 v9.2.1
* Update npm-scripts
* Change if `$_font-path` is null, `@font-face` is not output

## September 28, 2018 v9.2.0
* Add `_responsive-container()`
* Add `.c-responsive-container-16-9`
* Add `.c-responsive-container-4-3`

## September 14, 2018 v9.1.4
* Add `_pre()`

## August 31, 2018 v9.1.3
* Close drawer when link clicked.

## August 30, 2018 v9.1.2
* Update manual
* Update babel and rolup-babel
* Close drawer when link clicked.

## July 27, 2018 v9.1.1
* Remove gulp and yarn

## July 27, 2018 v9.1.0
* Add `.c-navbar--center`
* Upgrade gulp #110

## June 14, 2018 v9.0.0
* Add `_responsive-talbe()`
* Add `.c-responsive-table`
* Remove `.c-row__col--offset-*`
* Remove `.c-copyright`
* Remove `_flex-media()`
* Remove `.c-flex-media`
* Remove `_card()`
* Remove `.c-card`
* Refactoring `_hamburger-button()`
* Refactoring `.c-hamburger-button`
* Accessibility fix for `.c-navbar`

## February 21, 2018 v8.0.5
* Fix drawer bug.
* Fix `_content()` bug.

## February 1, 2018 v8.0.4
* `max-width` of `_c-container` changed unit rem to px.

## December 27, 2017 v8.0.3
* Keyboad support for `.c-navbar`.

## December 5, 2017 v8.0.2
* Change code element color
* Fix page-effetct js bug

## October 25, 2017 v8.0.1
* Fix container width bug over lg.
* Fix background fixed hero bug over lg.

## October 24, 2017 v8.0.0
* Add function `_px2em()`
* Add `size` argument to `_hover()`
* Add `xl` break point.
* Add `.u-hidden-lg-up`
* Add `.u-hidden-xl`
* Add `.u-hidden-xl-up`
* Add `.u-visible-lg-up`
* Add `.u-visible-xl`
* Add `.u-visible-xl-up`

## October 7, 2017 v7.0.3
* Fix typo aria-labelledby

## October 6, 2017 v7.0.2
* Remove margin of `.c-entry__content > *` from `_content()`

## June 18, 2017 v7.0.0
* Change default prefix. `_` to blank.
* Remove class `.u-animate-size` and `.u-animate-opacity`
* Remove mixin `_transition-all()`, `_transition-size()` and `_transition-opacity()`
* Remove mixin `_media-{size}-only()`
* Add mixin `_media-only($size)`
* Remove variable `$_sizes-max`
* Add function `_min($size)`, `_max($size)`, `_prev-size-key($size)` and `_next-size-key($size)`
* Media query mixin use `calc()`
* Remove function `_has-search()`
* Remove class `.c-row__col--shrink`
* Remove class `.c-navbar--auto`
* Add class `.c-navbar--left` and `.c-navbar--right`
* Remove class `.c-content`
* Add class `.u-content`
* Add abstract `_page-header()`
* Add abstract `_section()`
* Add abstract `_breadcrumbs()`
* Add abstract `_entries()`
* Add abstract `_entry()`
* Add abstract `_meta()`
* Add abstract `_site-branding()`
* Add mixin `_hidden()`
* Add mixin `_visible()`
* Remove classes `.u-visible-{size}-{display}`
* Add classes `.u-visible-{size}`, `.u-visible` and `.u-hidden`
* Remove class `.c-drawer__body`
* Change abstract `_container-fluid()` to `_fluid-container()`
* Change class `.c-container-fluid` to `.c-fluid-container`
* Change abstract `_spinner-circle()` to `_circle-spinner()`
* Change class `.c-spinner-circle` to `.c-circle-spinner`
* Change abstract `_spinner-dots()` to `_circle-dots()`
* Change class `.c-spinner-dots` to `.c-circle-dots`
* Change abstract `_spinner-pulse()` to `_circle-pulse()`
* Change class `.c-spinner-pulse` to `.c-circle-pulse`
* Change abstract `_balloon-top()` to `_top-balloon()`
* Change class `.c-balloon-top` to `.c-top-balloon`
* Change abstract `_balloon-right()` to `_right-balloon()`
* Change class `.c-balloon-right` to `.c-right-balloon`
* Change abstract `_balloon-bottom()` to `_bottom-balloon()`
* Change class `.c-balloon-bottom` to `.c-bottom-balloon`
* Change abstract `_balloon-left()` to `_left-balloon()`
* Change class `.c-balloon-left` to `.c-left-balloon`
* Change class `.u-animate` to `.u-transition`
* Change class `.u-animate-shake-vertical` to `.u-shake-vertical`
* Change class `.u-animate-vibrate-vertical` to `.u-vibrate-vertical`
* Change class `.u-animate-shake-horizontal` to `.u-shake-horizontal`
* Change class `.u-animate-vibrate-horizontal` to `.u-vibrate-horizontal`
* Change class `.u-animate-shake-scale` to `.u-shake-scale`
* Change class `.u-animate-vibrate-scale` to `.u-vibrate-scale`
* Change class `.u-animate-extend-underline` to `.u-extend-underline`
* Remove `data-c` attribute

## June 9, 2017 v6.5.0
* Added `_content()`
* Added `._c-content`
* Added `_is-number()`
* Added `._u-hidden-md-up`
* Added `._u-visible-md-up-*`
* Fix `._c-select` bug
* Fix `_is-int()` bug
* Fix `._c-btn--block` bug
* `_space()` is able to use `calc`

## March 30, 2017 v6.4.0
* Added `_pagination()`
* Added `._c-pagination`

## March 29, 2017 v6.3.2
* Update README

## March 3, 2017 v6.3.1
* Fix typo

## March 3, 2017 v6.3.0
* Update btn, alert, balloon and card padding.
* Added `_ib-row()`. This is inline-block base abstract.

## February 25, 2017 v6.2.1
* Bug fix for npm publish

## February 25, 2017 v6.2.0
* Update for npm publish
* Update `$_font-path`

## February 22, 2017 v6.1.3
* Fix `._u-text-left` bug.
* Fix `._u-text-right` bug.
* Fix `._u-pull-left` bug.

## February 22, 2017 v6.1.2
* Fix bug that `._c-select--block` is not reflected.

## February 20, 2017 v6.1.1
* Update `._c-checkbox`
* Update `._c-radio`
* Fix bug that background-color of `_page-effect()` is not reflected.

## February 20, 2017 v6.1.0
* Added styleguide.
* Update `._c-checkbox` and `_checkbox()`
* Update `._c-radio` and `_radio()`
* Update `._c-form-control` and `_form-control()`
* Update `._c-input-group` and `_input-group()`
* Update `._c-select` and `_select()`

## February 14, 2017 v6.0.2
* Fix line-height of Form elements for normalize.css.
* Refactoring grid margin calculation.
* Fix zip task bug.
* Fix normalize.css importing bug.

## February 12, 2017 v6.0.1
* Refactoring normalize.scss importing.

## February 7, 2017 v6.0.0
* Refactoring
* Using yarn

## September 29, 2016 v5.5.2
* Refactoring `._c-flex-media` for IE9.
* Refactoring `._c-media` for IE9.

## September 28, 2016 v5.5.1
* Refactoring `._c-flex-media` for IE9.
* Refactoring `._c-row__col--fit` for IE9.

## July 26, 2016 v5.5.0
* Add `._c-row__col--fit` #96
* Fixed `._c-flex-media__figure` margin #95

## July 26, 2016 v5.4.1
* Fixed bug that double definition of `._c-row__col--auto`

## July 26, 2016 v5.4.0
* Add `._c-row__col--shrink` #94

## July 26, 2016 v5.3.0
* Add the flex-media component #92
* `._c-media`: background-image figure support #93

## July 16, 2016 v5.2.1
* Fixed column offset bug #90

## July 16, 2016 v5.2.0
* Fixed pre overflow #84
* Fixed a bug `bs-bp-md-max()` #89
* `aria-hidden="true"` should not be `display: none;` fix #85
* Refactoring `._c-row` component
* Added mixin `_space()` #86
* Added mixin `bs-padding()` #86
* Added `._c-row__col--justify` #87
* Added `._u-visible-[size]-flex` #88
* Added mixin `bs-col-width()`
* Added variables for the headings margin

## June 23, 2016 v5.1.0
* Refactoring the auto column size class.
* Added mixin `bs-ghost()`
* Added mixin `bs-background-image-cover()`
* Added mixin `bs-background-image-fixed()`
* Added mixin `bs-overlay()`
* Refactoring mixin `bs-c-form-control()`

## May 25, 2016 v5.0.0
* The document to another repository #58
* Removed `html{ font-size: 62.5% }` #79
* `bs-font-size()`, `bs-line-height()` and `bs-font-size-line-height()` support px #79
* Refactoring `$bs-between-lines` #79
* Changed `$bs-font-size` to `$bs-base-font-size`
* Added a variable `$bs-base-font-size-px`
* Removed auto build on npm install #81
* Fixed opacity transition bug #82
* Added CHANGELOG.md
* Added .editorconfig
* Changed indent style
* Refactoring gulpfile.js

## May 10, 2016 v4.3.2
* Update README

## May 8, 2016 v4.3.1
* Fixed a bug that the Basis set incorrect breakpoint when `$bs-font-size` isn't 1.6rem.

## May 8, 2016 v4.3.0
* Added extending underline animation mixin `bs-extend-underline()`
* Added extending underline animation class `._u-animate-extend-underline`
* Added padding helper mixins.
* Added `._c-row--reverse`

## May 5, 2016 v4.2.7
* Refactoring `._c-hero--cover`
* Refactoring `bs-vertical-rhythm()`
* Changed container margin on smartphone.
* Fixed a image position of media object bug when `$bs-between-lines` changed.

## May 3, 2016 v4.2.6
* Fixed error when npm install
* Fixed media object bug on IE

## May 3, 2016 v4.2.0
* Change comments format.
* Added mixin `bs-bp-md-min`, `bs-bp-md-max`
* Refactoring around media query.

## April 24, 2016 v4.1.0
* Changed GitHub repository.
* Changed license.
* Move imports out of if statement.

## April 21, 2016 v4.0.2
* Fixed a `._c-container` bug.

## April 18, 2016 v4.0.0
* Refactoring directory structure.
* Refactoring input-group style.
* Added variable `$bs-use-mixin-only`. If you don't need classes of the Basis, set to true.
* Added mixins to make the Basis components.
* Added variables for the components of style.

## April 12, 2016 v3.2.0
* Fixed a grid margin bug.
* Added `._c-row--nowrap` class.
* Changed color settings.
* Added the coefficient variable for margin.
* Added the heading element scale variable.
* Added mixin `bs-font-size-line-height`

## April 6, 2016 v3.1.0
* Fixed hidden and visible classes bug.
* Added styles of readonly, disabled and aria-hidden.
* Changed blockquote and form-control styles.

## April 6, 2016 v3.0.1
* Fixed grid margin.

## April 6, 2016 v3.0.0
* Added the hero component.
* Added transition and animation utility classes.
* Updated normalize.css
* Changed base margin.
* Changed breakpoint unit px to em.

## March 10, 2016 v2.2.0
* Fixed a bug that characters aren't displayed on IE8
* Fixed bugs bs-bp-md-only and bs-bp-lg-only
* Added visible classes.
* Added how to contribute section in readme.md

## February 28, 2016 v2.1.2
* Fire Travis CI only master and develop.

## February 28, 2016 v2.1.1
* Added release branch from Travis CI
* Added viewport at the doc.

## February 27, 2016 v2.0.0
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
* Removed `._c-row--row`, `._c-row--column`

## January 14, 2016 v1.4.0
* Changed prefix of class name.
* Changed grid system classes name.
* Changed break points.
* Changed form control classes.
* Changed heading elements margin.
* Removed table classes.
* Removed button size classes.
* Removed colors classes.
* Added media object class.

## December 27, 2015 v1.3.0
* Remove text alignment classes.
* Changed directory structure.

## December 16, 2015 v1.2.4
* Remove .bs-item--full
* Refactoring grid system.
* Added hidden classes.
* Changed font size unit. px to rem.
* Changed base font size.

## November 28, 2015 v1.2.3
* Changed wrapper styles.
* Added .bs-container--size-no-gutter
* Removed xs prefix.
* Added button styles.
* Updated alert style.
* Updated wrapper style.

## November 27, 2015 v1.2.2
* Added default flags.

## November 25, 2015 v1.2.0
* Changed heading elements font size.
* Added styles: heading secondary text, tables.
* Added text alignment classes.
* Updated code element style.

## November 21, 2015 v1.1.0
* Added normalize.css
* Added styles: Lists, Blockquote, Forms.
* Added container-gutter style.
* Fixed button style.

## November 20, 2015 v1.0.0
* Release
