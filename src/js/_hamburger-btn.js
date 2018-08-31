'use strict';

export default class BasisHamburgerBtn {
  constructor(args = {}) {
    this.args = args;
    this.args.btn = !! this.args.btn ? this.args.btn : '.c-hamburger-btn';

    window.addEventListener('DOMContentLoaded', () => this._DOMContentLoaded(), false);
  }

  _DOMContentLoaded() {
    const hamburgerBtns = document.querySelectorAll(this.args.btn);
    this._forEachHtmlNodes(hamburgerBtns, (element) => element.addEventListener('click', this._click, false));
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
      drawer.setAttribute('aria-hidden', 'false');
    } else {
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
    }
  }

  _forEachHtmlNodes(htmlNodes, callback) {
    if (0 < htmlNodes.length) {
      [].forEach.call(htmlNodes, (htmlNode) => callback(htmlNode));
    }
  }
}
