'use strict';

import forEachHtmlNodes from '@inc2734/for-each-html-nodes';

export default class BasisChecked {
  constructor(args = {}) {
    this.args = args;
    this.args.target = this.args.target || undefined;

    if ( ! this.args.target ) {
      return;
    }

    forEachHtmlNodes(
      document.querySelectorAll(this.args.target),
      (item, index) => this._addEventListener(item)
    );

    forEachHtmlNodes(
      document.getElementsByTagName('form'),
      (item, index) => {
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
              if (typeof node.matches === 'function' && node.matches(this.args.target)) {
                this._addEventListener(node);
              }
            });
          });
        });
        observer.observe(item, {childList: true, subtree: true});
      }
    );
  }

  _addEventListener(target) {
    const focusinEvent = () => target.setAttribute('aria-checked', 'true');
    const focusoutEvent = () => target.setAttribute('aria-checked', 'false');

    target.addEventListener('focusin', () => focusinEvent(), false);
    target.addEventListener('focusout', () => focusoutEvent(), false);
  }
}
