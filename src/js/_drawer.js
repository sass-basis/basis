'use strict';

import forEachHtmlNodes from '@inc2734/for-each-html-nodes';
import addCustomEvent from '@inc2734/add-custom-event';

let lastActiveElement = document.activeElement;

export default class BasisDrawer {
  constructor(args = {}) {
    this.args = args;
    this.args.drawer  = this.args.drawer || '.c-drawer';
    this.args.toggle  = this.args.toggle || `${this.args.drawer}__toggle`;
    this.args.submenu = this.args.submenu || `${this.args.drawer}__submenu`;
    this.args.item    = this.args.item || `${this.args.drawer}__item`;
    this.args.subitem = this.args.subitem || `${this.args.drawer}__subitem`;

    this.windowWidth = window.innerWidth;

    forEachHtmlNodes(
      document.querySelectorAll(this.args.drawer),
      (drawer) => {
        this._setSubmenusId(drawer);

        window.addEventListener('resize', () => this._resizeWindow(drawer), false);

        drawer.addEventListener('closeDrawer', () => this._closeAllSubmenus(drawer), false);
        drawer.addEventListener('click', () => event.stopPropagation(), false);

        const btn = document.getElementById(drawer.getAttribute('aria-labelledby'));
        if (!! btn) {
          btn.addEventListener('openHamburgerBtn', () => BasisDrawer.open(drawer), false);
          btn.addEventListener('closeHamburgerBtn', () => BasisDrawer.close(drawer), false);
        }

        const drawerItemLinks = drawer.querySelectorAll(`${this.args.item} > a`);
        forEachHtmlNodes(
          drawerItemLinks,
          (element) => element.addEventListener('click', () => addCustomEvent(element, 'clickDrawerItemLink'), false)
        );

        const drawerSubItemLinks = drawer.querySelectorAll(`${this.args.subitem} > a`);
        forEachHtmlNodes(
          drawerSubItemLinks,
          (element) => element.addEventListener('click', () => addCustomEvent(element, 'clickDrawerSubItemLink'), false)
        );

        const toggleBtns = drawer.querySelectorAll(`${this.args.toggle}`);
        forEachHtmlNodes(
          toggleBtns,
          (element) => element.addEventListener('click', () => this._clickToggleBtns(event), false)
        );

        drawer.addEventListener(
          'keydown',
          (event) => {
            if ( 27 === event.keyCode ) {
              BasisDrawer.close(drawer)
            }
          }
        );
      }
    );
  }

  static close(drawer) {
    addCustomEvent(drawer, 'closeDrawer');

    lastActiveElement.focus();

    drawer.setAttribute('aria-hidden', 'true');
  }

  static open(drawer) {
    addCustomEvent(drawer, 'openDrawer');
    drawer.setAttribute('aria-hidden', 'false');

    lastActiveElement = document.activeElement;

    const focusableSelector = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
    drawer.querySelector(focusableSelector).focus();

    const drawerId  = drawer.getAttribute('id');
    const closeZone = document.querySelector(`.c-drawer-close-zone[aria-controls="${drawerId}"]`);
    if (!! closeZone) {
      closeZone.addEventListener('clickDrawerCloseZone', () => BasisDrawer.close(drawer), false);
    }
  }

  _open(target) {
    target.setAttribute('aria-expanded', 'true');
  }

  _close(target) {
    target.setAttribute('aria-expanded', 'false');
  }

  _show(target) {
    target.setAttribute('aria-hidden', 'false');
  }

  _hidden(target) {
    target.setAttribute('aria-hidden', 'true');
  }

  _setSubmenusId(drawer) {
    const submenus = drawer.querySelectorAll(`${this.args.submenu}[aria-hidden]`);

    forEachHtmlNodes(
      submenus,
      (submenu) => {
        const random    = Math.floor((Math.random() * (9999999 - 1000000)) + 1000000);
        const time      = new Date().getTime();
        const id        = `drawer-${time}${random}`;
        const toggleBtn = submenu.parentNode.querySelector(this.args.toggle);

        if (!! submenu && !! toggleBtn) {
          submenu.setAttribute('id', id);
          toggleBtn.setAttribute('aria-controls', `${id}`);
        }
      }
    );
  }

  _resizeWindow(drawer) {
    addCustomEvent(drawer, 'resizeDrawer');

    if (window.innerWidth !== this.windowWidth) {
      BasisDrawer.close(drawer);
      this.windowWidth = window.innerWidth;
    }
  }

  _closeSubmenu(submenu) {
    const toggleBtn = submenu.parentNode.querySelector(this.args.toggle);
    this._hidden(submenu);
    this._close(toggleBtn);
  }

  _closeAllSubmenus(drawer) {
    const submenus = drawer.querySelectorAll(this.args.submenu);
    forEachHtmlNodes(submenus, (element) => this._closeSubmenu(element));
  }

  _clickToggleBtns(event) {
    event.preventDefault();
    event.stopPropagation();

    const toggleBtn = event.currentTarget;
    const menu = document.getElementById(toggleBtn.getAttribute('aria-controls'));

    if ('false' == toggleBtn.getAttribute('aria-expanded')) {
      this._open(toggleBtn);
      this._show(menu);
    } else {
      this._closeSubmenu(menu);
      forEachHtmlNodes(menu.querySelectorAll(this.args.submenu), (element) => this._closeSubmenu(element));
    }
  }
}
