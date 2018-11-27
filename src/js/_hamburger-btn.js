'use strict';

import addCustomEvent from './_add-custom-event.js';

export default class BasisHamburgerBtn {
  constructor(args = {}) {
    this.args = args;
    this.args.btn = !! this.args.btn ? this.args.btn : '.c-hamburger-btn';

    window.addEventListener('DOMContentLoaded', () => this._DOMContentLoaded(), false);
  }

  _DOMContentLoaded() {
    const hamburgerBtns = document.querySelectorAll(this.args.btn);
    this._forEachHtmlNodes(hamburgerBtns, (element) => {
      element.addEventListener('click', (event) => this._click(event), false);
      element.addEventListener('openHamburgerBtn', (event) => BasisHamburgerBtn.open(element), false);
      element.addEventListener('closeHamburgerBtn', (event) => BasisHamburgerBtn.close(element), false);

      const drawer = document.getElementById(element.getAttribute('aria-controls'));
      if (null !== drawer) {
        drawer.addEventListener('closeDrawer', (event) => BasisHamburgerBtn.close(element), false);
        drawer.addEventListener('openDrawer', (event) => BasisHamburgerBtn.open(element), false);
      }
    });
  }

  static open(hamburgerBtn) {
    hamburgerBtn.setAttribute('aria-expanded', 'true');
  }

  static close(hamburgerBtn) {
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

  _forEachHtmlNodes(htmlNodes, callback) {
    if (0 < htmlNodes.length) {
      [].forEach.call(htmlNodes, (htmlNode) => callback(htmlNode));
    }
  }
}
