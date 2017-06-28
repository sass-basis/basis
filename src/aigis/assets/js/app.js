'use strict';

import BasisHamburgerBtn from '../../../js/hamburger-btn.js';
new BasisHamburgerBtn({
  btn: '.sg-c-hamburger-btn'
});

import BasisDrawer from '../../../js/drawer.js';
new BasisDrawer({
  drawer : '.sg-c-drawer',
  toggle : '.sg-c-drawer__toggle',
  submenu: '.sg-c-drawer__submenu'
});

import BasisNavbar from '../../../js/navbar.js';
new BasisNavbar({
  item   : '.sg-c-navbar__item',
  submenu: '.sg-c-navbar__submenu',
  subitem: '.sg-c-navbar__subitem'
});

import BasisPageEffect from '../../../js/page-effect.js';
new BasisPageEffect({
  pageEffect: '.sg-c-page-effect',
  duration: 200
});

import BasisSelect from '../../../js/select.js';
new BasisSelect({
  select: '.sg-c-select',
  label : '.sg-c-select__label'
});
