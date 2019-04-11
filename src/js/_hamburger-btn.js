'use strict';

import forEachHtmlNodes from '@inc2734/for-each-html-nodes';
import addCustomEvent from '@inc2734/add-custom-event';

export default class BasisHamburgerBtn {
  constructor(args = {}) {
    this.args = args;
    this.args.btn = this.args.btn || '.c-hamburger-btn';

    forEachHtmlNodes(
      document.querySelectorAll(this.args.btn),
      (element) => {
        element.addEventListener('openHamburgerBtn', () => BasisHamburgerBtn.open(element), false);
        element.addEventListener('closeHamburgerBtn', () => BasisHamburgerBtn.close(element), false);
        element.addEventListener('click', (event) => this._click(event), false);

        const drawer = document.getElementById(element.getAttribute('aria-controls'));
        if (null !== drawer) {
          drawer.addEventListener('closeDrawer', () => BasisHamburgerBtn.close(element), false);
          drawer.addEventListener('openDrawer', () => BasisHamburgerBtn.open(element), false);
        }
      }
    );
  }

  static open(hamburgerBtn) {
    if ('true' === hamburgerBtn.getAttribute('aria-expanded')) {
      return;
    }

    hamburgerBtn.setAttribute('aria-expanded', 'true');
  }

  static close(hamburgerBtn) {
    if ('false' === hamburgerBtn.getAttribute('aria-expanded')) {
      return;
    }

    hamburgerBtn.setAttribute('aria-expanded', 'false');
  }

  _click(event) {
    const hamburgerBtn = event.currentTarget;
    const drawer = document.getElementById(hamburgerBtn.getAttribute('aria-controls'));
    if (! drawer) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    if ('false' === hamburgerBtn.getAttribute('aria-expanded')) {
      addCustomEvent(hamburgerBtn, 'openHamburgerBtn');
    } else {
      addCustomEvent(hamburgerBtn, 'closeHamburgerBtn');
    }
  }
}
