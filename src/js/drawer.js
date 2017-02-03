'use strict';

import $ from 'jquery';

export default class BasisDrawer {
  constructor() {
    this.setIdForSubmenu();
    this.setListener();
  }

  setListener() {
    const btns = $('[data-c="drawer-btn"][aria-controls]');
    btns.each((i, e) => {
      const btn       = $(e);
      const drawer    = $(`#${btn.attr('aria-controls')}`);
      const container = drawer.parent('[data-c="drawer"]');

      container.on('click', (event) => {
        this.close(btn);
        this.hidden(drawer);
        this.close(drawer.find('[data-c="drawer__toggle"]'));
        this.hidden(drawer.find('[data-c="drawer__submenu"]'));
      });

      drawer.on('click', (event) => {
        event.stopPropagation();
      });

      btn.on('click', (event) => {
        event.preventDefault();
        this.toggleMenu(btn);
        event.stopPropagation();
      });

      $(window).on('resize', (event) => {
        this.hidden(drawer);
        this.close(btn);
      });
    });

    const toggleBtns = $('[data-c="drawer__toggle"][aria-controls]');
    toggleBtns.each((i, e) => {
      const toggleBtn = $(e);
      const submenu   = $(`#${toggleBtn.attr('aria-controls')}`);
      toggleBtn.on('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.toggleMenu(toggleBtn);
      });
    });
  }

  toggleMenu(btn) {
    const menu = $(`#${btn.attr('aria-controls')}`);
    if ('false' == btn.attr('aria-expanded')) {
      this.open(btn);
      this.show(menu);
    } else {
      this.close(btn);
      this.hidden(menu);
      this.close(menu.find('[data-c="drawer__toggle"]'));
      this.hidden(menu.find('[data-c="drawer__submenu"]'));
    }
  }

  open(target) {
    target.attr('aria-expanded', 'true');
  }

  close(target) {
    target.attr('aria-expanded', 'false');
  }

  show(target) {
    target.attr('aria-hidden', 'false');
  }

  hidden(target) {
    target.attr('aria-hidden', 'true');
  }

  setIdForSubmenu() {
    $('[data-c="drawer__submenu"][aria-hidden]').each((i, e) => {
      const random    = Math.floor((Math.random() * (9999999 - 1000000)) + 1000000);
      const time      = new Date().getTime();
      const id        = `drawer-${time}${random}`;
      const submenu   = $(e);
      const toggleBtn = submenu.siblings('[data-c="drawer__toggle"]');
      if (submenu.length && toggleBtn.length) {
        submenu.attr('id', id);
        toggleBtn.attr('aria-controls', `${id}`);
      }
    });
  }
}
