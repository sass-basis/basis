'use strict';

import forEachHtmlNodes from '@inc2734/for-each-html-nodes';
import { show, hide, open, close, uniqueId } from './_helper';

export default class BasisToggleBtn {
  constructor(btn, prefix) {
    this.btn = btn;
    this.prefix = prefix;

    this._relation();

    btn.addEventListener(
      'click',
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        BasisToggleBtn.click(event.currentTarget);
      },
      false
    );
  }

  _relation() {
    const menu = this.btn.nextElementSibling;
    if (!! menu) {
      const id = uniqueId(this.prefix);
      menu.setAttribute('id', id);
      this.btn.setAttribute('aria-controls', `${id}`);
    }
  }

  static click(btn) {
    'false' == btn.getAttribute('aria-expanded')
      ? BasisToggleBtn.open(btn)
      : BasisToggleBtn.close(btn);
  }

  static open(btn) {
    const menu = BasisToggleBtn.getMenu(btn);
    menu && show(menu);
    open(btn);
  }

  static close(btn) {
    const menu = BasisToggleBtn.getMenu(btn);
    menu && hide(menu);
    close(btn);
  }

  static getMenu(btn) {
    return document.getElementById(btn.getAttribute('aria-controls'));
  }
}
