'use strict';

import $ from 'jquery';

export default class BasisNavbar {
  constructor(args = {}) {
    this.args = $.extend({
      item   : '.c-navbar__item',
      submenu: '.c-navbar__submenu',
      subitem: '.c-navbar__subitem'
    }, args);
    this.items = $(`${this.args.item}[aria-haspopup="true"], ${this.args.subitem}[aria-haspopup="true"]`);
    this.setListener();
  }

  setListener() {
    this.items.each((i, e) => {
      const item = $(e);
      item.on('mouseover focus', (event) => {
        this.show(item.children(this.args.submenu));
      });

      item.on('mouseleave', (event) => {
        this.hidden(item.children(this.args.submenu));
      });
    });
  }

  show(submenu) {
    submenu.attr('aria-hidden', 'false');
  }

  hidden(submenu) {
    submenu.attr('aria-hidden', 'true');
  }
}
