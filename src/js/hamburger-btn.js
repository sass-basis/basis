'use strict';

import $ from 'jquery';

export default class BasisHamburgerBtn {
  constructor(args = {}) {
    this.args = $.extend({
      btn: '.c-hamburger-btn'
    }, args);
    this.hamburgerBtn = $(this.args.btn);
    this.setListener();
  }

  setListener() {
    this.hamburgerBtn.each((i, e) => {
      const hamburgerBtn = $(e);
      const target = $('#' + hamburgerBtn.attr('aria-controls'));

      hamburgerBtn.click((event) => {
        event.preventDefault();
        event.stopPropagation();

        if ('false' === hamburgerBtn.attr('aria-expanded')) {
          hamburgerBtn.attr('aria-expanded', 'true');
          target.attr('aria-hidden', 'false');
        } else {
          hamburgerBtn.attr('aria-expanded', 'false');
          target.attr('aria-hidden', 'true');
        }
      });
    });
  }
}
