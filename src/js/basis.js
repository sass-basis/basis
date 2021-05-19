import BasisDrawerCloseZone from './_drawer-close-zone.js';
import BasisDrawer from './_drawer.js';
import BasisHamburgerBtn from './_hamburger-btn.js';
import BasisNavbar from './_navbar.js';
import BasisPageEffect from './_page-effect.js';

document.addEventListener(
  'DOMContentLoaded',
  () => {
    new BasisDrawerCloseZone();
    new BasisDrawer({drawer: '.c-drawer'});
    new BasisDrawer({drawer: '.c-dropdown'});
    new BasisHamburgerBtn();
    new BasisNavbar();
    new BasisPageEffect();
  },
  false
);
