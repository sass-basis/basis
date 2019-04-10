'use strict';

import BasisDrawerCloseZone from './_drawer-close-zone.js';
import BasisDrawer from './_drawer.js';
import BasisHamburgerBtn from './_hamburger-btn.js';
import BasisNavbar from './_navbar.js';
import BasisPageEffect from './_page-effect.js';
import BasisSelect from './_select.js';
import BasisCheckbox from './_checkbox.js';
import BasisRadio from './_radio.js';

document.addEventListener(
  'DOMContentLoaded',
  () => {
    new BasisDrawerCloseZone();
    new BasisDrawer();
    new BasisHamburgerBtn();
    new BasisNavbar();
    new BasisPageEffect();
    new BasisSelect();
    new BasisCheckbox();
    new BasisRadio();
  },
  false
);
