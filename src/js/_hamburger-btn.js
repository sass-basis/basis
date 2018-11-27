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

      element.addEventListener('click', (event) => {
        addCustomEvent(element, 'clickHamburgerBtn');
        this._click(event);
      }, false);
    });
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
      hamburgerBtn.setAttribute('aria-expanded', 'true');
    } else {
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
  }

  _forEachHtmlNodes(htmlNodes, callback) {
    if (0 < htmlNodes.length) {
      [].forEach.call(htmlNodes, (htmlNode) => callback(htmlNode));
    }
  }
}
