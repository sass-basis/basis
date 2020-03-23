'use strict';

import '../../../js/basis';

import SgBasisHamburgerBtn from '../../../js/_hamburger-btn.js';
new SgBasisHamburgerBtn({
  btn: '.sg-c-hamburger-btn'
});

import SgBasisDrawer from '../../../js/_drawer.js';
new SgBasisDrawer({
  drawer : '.sg-c-drawer',
});

import SgBasisNavbar from '../../../js/_navbar.js';
new SgBasisNavbar({
  wrapper: '.sg-c-navbar',
});

import SgBasisPageEffect from '../../../js/_page-effect.js';
new SgBasisPageEffect({
  pageEffect: '.sg-c-page-effect',
  duration: 200
});
