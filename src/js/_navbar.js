'use strict';

import forEachHtmlNodes from '@inc2734/for-each-html-nodes';

export default class BasisNavbar {
  constructor(args = {}) {
    this.args = args;
    this.args.item = this.args.item || '.c-navbar__item';
    this.args.submenu = this.args.submenu || '.c-navbar__submenu';
    this.args.subitem = this.args.subitem || '.c-navbar__subitem';

    window.addEventListener('DOMContentLoaded', () => this._DOMContentLoaded(), false);
  }

  _DOMContentLoaded() {
    const show = (submenu) => submenu.setAttribute('aria-hidden', 'false');
    const hidden = (submenu) => submenu.setAttribute('aria-hidden', 'true');

    const itemsHasPopup = document.querySelectorAll(
      [
        `${this.args.item}[aria-haspopup="true"]`,
        `${this.args.subitem}[aria-haspopup="true"]`,
      ].join(',')
    );

    forEachHtmlNodes(
      itemsHasPopup,
      (item) => {
        const mouseoverEvent = () => forEachHtmlNodes(
          item.children,
          (child) => child.classList.contains(this.args.submenu.replace(/^\./, '')) && show(child)
        );

        const mouseleaveEvent = () => forEachHtmlNodes(
          item.querySelectorAll(this.args.submenu),
          (child) => hidden(child)
        );

        item.addEventListener('mouseover', () => mouseoverEvent(), false);
        item.addEventListener('focusin', () => mouseoverEvent(), false);
        item.addEventListener('mouseleave', () => mouseleaveEvent(), false);
      }
    );

    const items = document.querySelectorAll(
      [
        this.args.item,
        this.args.subitem,
      ].join(',')
    );

    forEachHtmlNodes(
      items,
      (item) => {
        item.addEventListener(
          'focusin',
          () => {
            forEachHtmlNodes(
              item.parentNode.children,
              (child) => {
                const submenus = child.querySelectorAll(this.args.submenu);
                child !== item && forEachHtmlNodes(submenus, (submenu) => hidden(submenu));
              }
            );
          },
          false
        );
      }
    );
  }
}
