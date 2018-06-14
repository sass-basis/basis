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
      item.on('mouseover focusin', (event) => {
        this.show(item.children(this.args.submenu));
      });

      item.on('mouseleave blur', (event) => {
        this.hidden(item.children(this.args.submenu));
      });
    });

    $(this.args.item).each((i, e) => {
      const item = $(e);
      item.on('focusin', (event) => {
        this.hidden(item.siblings(this.args.item).find(this.args.submenu));
      });

      item.find(this.args.subitem).each((i, e) => {
        const subitem = $(e);
        subitem.on('focusin', (event) => {
          this.hidden(subitem.siblings(this.args.subitem).find(this.args.submenu));
        });
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
