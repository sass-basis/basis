'use strict';

import forEachHtmlNodes from '@inc2734/for-each-html-nodes';
import '@inc2734/dispatch-custom-resize-event';
import { show, hide, open, close, uniqueId } from './_helper';
import BasisToggleBtn from './_toggle-btn';

class BasisNavbarBase {
  constructor(wrapper, args) {
    this.wrapper = wrapper;
    this.args = args;

    window.addEventListener(
      'resize:width',
      () => {
        this._closeAllSubmenus();
        this._setSubmenuOpenDirection();
      },
      false
    );

    forEachHtmlNodes(
      this.wrapper.querySelectorAll([this.args.item, this.args.subitem].join(',')),
      (item) => item.addEventListener('focusin', () => this._closeOtherSubmenus(item), false)
    );

    this._setSubmenuOpenDirection();
    this._init();
  }

  _setSubmenuOpenDirection() {
    forEachHtmlNodes(
      this.wrapper.querySelectorAll(`${this.args.item}[aria-haspopup="true"]`),
      (item) => {
        const allsubmenus = [].slice.call(item.querySelectorAll(this.args.submenu));
        if (1 > allsubmenus.length) {
          return;
        }

        const itemRect = item.getBoundingClientRect();
        const itemCenterX = itemRect.left + itemRect.width / 2;
        const windowCenterX = window.innerWidth / 2
        if (itemCenterX < windowCenterX) {
          return;
        }

        const firstSubmenu = allsubmenus.slice(0)[0];
        firstSubmenu.classList.remove('c-navbar__submenu--turn-left')

        const lastSubmenu = allsubmenus.slice(-1)[0];
        const rect = lastSubmenu.getBoundingClientRect();
        const overRight = window.innerWidth < rect.right;
        if (! overRight) {
          return;
        }

        firstSubmenu.classList.add('c-navbar__submenu--turn-left');
      }
    );
  }

  _getItemsHasPopup() {
    return this.wrapper.querySelectorAll(
      [
        `${this.args.item}[aria-haspopup="true"]`,
        `${this.args.subitem}[aria-haspopup="true"]`,
      ].join(',')
    );
  }
}

class BasisNavbarHover extends BasisNavbarBase {
  constructor(wrapper, args) {
    super(wrapper, args);
  }

  _init() {
    forEachHtmlNodes(
      this._getItemsHasPopup(),
      (item) => {
        const submenu = item.querySelector(this.args.submenu);
        if (! submenu) {
          return;
        }

        const mouseover = (submenu) => {
          show(submenu);
          this._closeOtherSubmenus(item);
        };
        const mouseleave = (submenu) => hide(submenu);

        item.addEventListener('mouseover', () => mouseover(submenu), false);
        item.addEventListener('mouseleave', () => mouseleave(submenu), false);
        item.addEventListener('focusin', () => mouseover(submenu), false);
      }
    );
  }

  _closeAllSubmenus() {
    forEachHtmlNodes(
      this.wrapper.querySelectorAll(this.args.submenu),
      (submenu) => this._closeSubmenu(submenu)
    );
  }

  _closeOtherSubmenus(item) {
    forEachHtmlNodes(
      item.parentNode.children,
      (child) => {
        child !== item && forEachHtmlNodes(
          child.querySelectorAll(this.args.submenu),
          (submenu) => this._closeSubmenu(submenu)
        );
      }
    );
  }

  _closeSubmenu(submenu) {
    hide(submenu);
    forEachHtmlNodes(
      submenu.querySelectorAll(this.args.submenu),
      (element) => this._closeSubmenu(element)
    );
  };
}

class BasisNavbarClick extends BasisNavbarBase {
  constructor(wrapper, args) {
    super(wrapper, args);
  }

  _init() {
    forEachHtmlNodes(
      this.wrapper.querySelectorAll(this.args.toggle),
      (toggleBtn) => {
        new BasisToggleBtn(toggleBtn, 'navbar');
        toggleBtn.addEventListener(
          'click',
          (event) => {
            event.preventDefault();
            event.stopPropagation();
            const item = event.currentTarget.parentNode;
            this._closeOtherSubmenus(item);
          },
          false
        );
      }
    );

    forEachHtmlNodes(
      this._getItemsHasPopup(),
      (item) => {
        item.addEventListener(
          'focusin',
          () => {
            const toggleBtn = item.querySelector(this.args.toggle);
            toggleBtn && BasisToggleBtn.open(toggleBtn);
            this._closeOtherSubmenus(item);
          },
          false
        );
      }
    );
  }

  _closeAllSubmenus() {
    forEachHtmlNodes(
      this.wrapper.querySelectorAll(this.args.toggle),
      (toggleBtn) => BasisToggleBtn.close(toggleBtn)
    );
  }

  _closeOtherSubmenus(item) {
    forEachHtmlNodes(
      item.parentNode.children,
      (child) => {
        child !== item && forEachHtmlNodes(
          child.querySelectorAll(this.args.toggle),
          (toggleBtn) => BasisToggleBtn.close(toggleBtn)
        );
      }
    );
  }
}

export default class BasisNavbar {
  constructor(args = {}) {
    this.args = args;
    this.args.wrapper = this.args.wrapper || '.c-navbar';
    this.args.item = this.args.item || `${this.args.wrapper}__item`;
    this.args.submenu = this.args.submenu || `${this.args.wrapper}__submenu`;
    this.args.subitem = this.args.subitem || `${this.args.wrapper}__subitem`;
    this.args.toggle = this.args.toggle || `${this.args.wrapper}__toggle`;

    forEachHtmlNodes(
      document.querySelectorAll(this.args.wrapper),
      (wrapper) => {
        const popupMode = wrapper.getAttribute('data-popup-mode') || 'hover';

        'hover' === popupMode
          ? new BasisNavbarHover(wrapper, args)
          : new BasisNavbarClick(wrapper, args);
      }
    );
  }
}
