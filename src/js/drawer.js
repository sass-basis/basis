'use strict';

import $ from 'jquery';

export default class BasisDrawer {
  constructor(args = {}) {
    this.args = $.extend({
      drawer : '.c-drawer',
      toggle : '.c-drawer__toggle',
      submenu: '.c-drawer__submenu'
    }, args);
    this.drawer = $(this.args.drawer);
    this.setListener();
  }

  setListener() {
    this.drawer.each((i, e) => {
      const drawer = $(e);
      this.setIdForSubmenu(drawer);

      const container  = drawer.parent();
      const btn        = $(`#${drawer.attr('aria-labelledby')}`);
      const toggleBtns = drawer.find(`${this.args.toggle}[aria-controls]`);

      container.on('click', (event) => {
        this.close(btn);
        this.hidden(drawer);
        this.close(drawer.find(this.args.toggle));
        this.hidden(drawer.find(this.args.submenu));
      });

      drawer.on('click', (event) => {
        event.stopPropagation();
      });

      $(window).on('resize', (event) => {
        this.hidden(drawer);
        this.close(btn);
      });

      toggleBtns.each((i, e) => {
        const toggleBtn = $(e);
        const submenu   = $(`#${toggleBtn.attr('aria-controls')}`);
        toggleBtn.on('click', (event) => {
          event.preventDefault();
          event.stopPropagation();
          this.toggleMenu(toggleBtn);
        });
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
      this.close(menu.find(this.args.toggle));
      this.hidden(menu.find(this.args.submenu));
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

  setIdForSubmenu(drawer) {
    drawer.find(`${this.args.submenu}[aria-hidden]`).each((i, e) => {
      const random    = Math.floor((Math.random() * (9999999 - 1000000)) + 1000000);
      const time      = new Date().getTime();
      const id        = `drawer-${time}${random}`;
      const submenu   = $(e);
      const toggleBtn = submenu.siblings(this.args.toggle);
      if (submenu.length && toggleBtn.length) {
        submenu.attr('id', id);
        toggleBtn.attr('aria-controls', `${id}`);
      }
    });
  }
}
