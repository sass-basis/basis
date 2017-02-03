'use strict';

import $ from 'jquery';

export default class BasisNavbar {
  constructor() {
    this.items = $('[data-c="navbar__item"][aria-haspopup="true"], [data-c="navbar__subitem"][aria-haspopup="true"]');
    this.setListener();
  }

  setListener() {
    this.items.each((i, e) => {
      const item = $(e);
      item.on('mouseover focus', (event) => {
        this.show(item.children('[data-c="navbar__submenu"]'));
      });

      item.on('mouseleave', (event) => {
        this.hidden(item.children('[data-c="navbar__submenu"]'));
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
