'use strict';

import $ from 'jquery';

export default class BasisHamburgerBtn {
  constructor() {
    this.hamburgerBtn = $('[data-c="hamburger-btn"]');
    this.setListener();
  }

  setListener() {
    this.hamburgerBtn.each((i, e) => {
      const hamburgerBtn = $(e);
      const target = $('#' + hamburgerBtn.attr('aria-controls'));

      hamburgerBtn.click((event) => {
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
