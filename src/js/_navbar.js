'use strict';

import forEachHtmlNodes from '@inc2734/for-each-html-nodes';
import '@inc2734/dispatch-custom-resize-event';
import { show, hide, open, close, uniqueId } from './_helper';

export default class BasisNavbar {
  constructor(args = {}) {
    this.args = args;
    this.args.wrapper = this.args.wrapper || '.c-navbar';
    this.args.item = this.args.item || `${this.args.wrapper}__item`;
    this.args.submenu = this.args.submenu || `${this.args.wrapper}__submenu`;
    this.args.subitem = this.args.subitem || `${this.args.wrapper}__subitem`;
    this.args.toggle = this.args.toggle || `${this.args.wrapper}__toggle`;

    const wrappers = document.querySelectorAll(this.args.wrapper);

    forEachHtmlNodes(wrappers, (wrapper) => this.init(wrapper));
  }

  getItemsHasPopup(wrapper) {
    return wrapper.querySelectorAll(
      [
        `${this.args.item}[aria-haspopup="true"]`,
        `${this.args.subitem}[aria-haspopup="true"]`,
      ].join(',')
    );
  }

  closeSubmenu(submenu) {
    const toggleBtn = submenu.parentNode.querySelector(this.args.toggle);
    toggleBtn && close(toggleBtn);
    hide(submenu);
    forEachHtmlNodes(submenu.querySelectorAll(this.args.submenu), (element) => this.closeSubmenu(element));
  };

  closeOtherSubmenus(item) {
    forEachHtmlNodes(
      item.parentNode.children,
      (child) => {
        const submenus = child.querySelectorAll(this.args.submenu);
        child !== item && forEachHtmlNodes(submenus, (submenu) => this.closeSubmenu(submenu));
      }
    );
  }

  init(wrapper) {
    const closeAllSubmenus = (wrapper) => {
      const submenus = wrapper.querySelectorAll(this.args.submenu);
      forEachHtmlNodes(submenus, (element) => this.closeSubmenu(element));
    };

    window.addEventListener('resize:width', () => closeAllSubmenus(wrapper), false);

    const items = wrapper.querySelectorAll(
      [
        this.args.item,
        this.args.subitem,
      ].join(',')
    );

    forEachHtmlNodes(items, (item) => item.addEventListener('focusin', () => this.closeOtherSubmenus(item), false) );

    const popupMode = wrapper.getAttribute('data-popup-mode') || 'hover';
    'hover' === popupMode
      ? this.applyHoverEffect(wrapper)
      : this.applyClickEffect(wrapper);
  }

  applyHoverEffect(wrapper) {
    forEachHtmlNodes(
      this.getItemsHasPopup(wrapper),
      (item) => {
        const submenu = item.querySelector(this.args.submenu);
        const mouseover = (submenu) => {
          show(submenu);
          this.closeOtherSubmenus(item)
        };
        const mouseleave = (submenu) => hide(submenu);

        item.addEventListener('mouseover', () => mouseover(submenu), false);
        item.addEventListener('mouseleave', () => mouseleave(submenu), false);
        item.addEventListener('focusin', () => mouseover(submenu), false);
      }
    );
  }

  applyClickEffect(wrapper) {
    const setSubmenusId = (wrapper) => {
      const submenus = wrapper.querySelectorAll(`${this.args.submenu}[aria-hidden]`);

      forEachHtmlNodes(
        submenus,
        (submenu) => {
          const toggleBtn = submenu.parentNode.querySelector(this.args.toggle);
          if (!! submenu && !! toggleBtn) {
            const id = uniqueId('navbar');
            submenu.setAttribute('id', id);
            toggleBtn.setAttribute('aria-controls', `${id}`);
          }
        }
      );
    };

    const openToggleBtn = (toggleBtn) => {
      const menu = document.getElementById(toggleBtn.getAttribute('aria-controls'));
      open(toggleBtn);
      show(menu);
    };

    const closeToggleBtn = (toggleBtn) => {
      const menu = document.getElementById(toggleBtn.getAttribute('aria-controls'));
      this.closeSubmenu(menu);
    };

    const clickToggleBtn = (toggleBtn) => {
      const item = toggleBtn.parentNode;
      this.closeOtherSubmenus(item);

      'false' == toggleBtn.getAttribute('aria-expanded')
        ? openToggleBtn(toggleBtn)
        : closeToggleBtn(toggleBtn);
    };

    setSubmenusId(wrapper);

    const toggleBtns = wrapper.querySelectorAll(this.args.toggle);
    forEachHtmlNodes(
      toggleBtns,
      (element) => {
        element.addEventListener(
          'click',
          (event) => {
            event.preventDefault();
            event.stopPropagation();
            clickToggleBtn(element);
          },
          false
        );
      }
    );

    forEachHtmlNodes(
      this.getItemsHasPopup(wrapper),
      (item) => {
        const toggleBtn = item.querySelector(this.args.toggle);
        item.addEventListener('focusin', () => openToggleBtn(toggleBtn), false);
      }
    );
  }
}
