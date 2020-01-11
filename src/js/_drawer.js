'use strict';

import forEachHtmlNodes from '@inc2734/for-each-html-nodes';
import addCustomEvent from '@inc2734/add-custom-event';
import '@inc2734/dispatch-custom-resize-event';
import { show, hide } from './_helper';
import BasisToggleBtn from './_toggle-btn';

let lastActiveElement = document.activeElement;

export default class BasisDrawer {
  constructor(args = {}) {
    this.args = args;
    this.args.drawer  = this.args.drawer || '.c-drawer';
    this.args.toggle  = this.args.toggle || `${this.args.drawer}__toggle`;
    this.args.submenu = this.args.submenu || `${this.args.drawer}__submenu`;
    this.args.item    = this.args.item || `${this.args.drawer}__item`;
    this.args.subitem = this.args.subitem || `${this.args.drawer}__subitem`;

    forEachHtmlNodes(
      document.querySelectorAll(this.args.drawer),
      (drawer) => {
        window.addEventListener('resize:width', () => this._resizeWindow(drawer), false);

        drawer.addEventListener('closeDrawer', () => this._closeAllSubmenus(drawer), false);
        drawer.addEventListener('click', () => event.stopPropagation(), false);
        drawer.addEventListener('keydown', (event) => 27 === event.keyCode && BasisDrawer.close(drawer));

        const drawerItemLinks = drawer.querySelectorAll(`${this.args.item} > a`);
        forEachHtmlNodes(
          drawerItemLinks,
          (element) => element.addEventListener(
            'click',
            () => {
              addCustomEvent(element, 'clickDrawerItemLink');
              BasisDrawer.close(drawer);
            },
            false
          )
        );

        const drawerSubItemLinks = drawer.querySelectorAll(`${this.args.subitem} > a`);
        forEachHtmlNodes(
          drawerSubItemLinks,
          (element) => element.addEventListener(
            'click',
            () => {
              addCustomEvent(element, 'clickDrawerSubItemLink');
              BasisDrawer.close(drawer);
            },
            false
          )
        );

        const toggleBtns = drawer.querySelectorAll(`${this.args.toggle}`);
        forEachHtmlNodes(
          toggleBtns,
          (toggleBtn) => {
            new BasisToggleBtn(toggleBtn, 'drawer');
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

        const items = drawer.querySelectorAll([this.args.item, this.args.subitem].join(','));
        forEachHtmlNodes(
          items,
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
    );
  }

  static close(drawer) {
    // Approval body scroll
    const wrapper   = drawer.parentNode;
    const mainClass = drawer.classList[0];
    if (drawer.classList.contains(`${mainClass}--fixed`) && 'body' === wrapper.tagName.toLowerCase()) {
      wrapper.classList.remove('u-noscroll');
    }

    addCustomEvent(drawer, 'closeDrawer');

    if (null !== lastActiveElement) {
      lastActiveElement.focus();
    }

    hide(drawer);
  }

  static open(drawer) {
    const wrapper   = drawer.parentNode;
    const mainClass = drawer.classList[0];

    // All sibling drawer close
    forEachHtmlNodes(
      wrapper.children,
      (child) => {
        if (child.classList.contains(mainClass)) {
          BasisDrawer.close(child);
        }
      }
    );

    // Prevent body scroll
    if (drawer.classList.contains(`${mainClass}--fixed`) && 'body' === wrapper.tagName.toLowerCase()) {
      wrapper.classList.add('u-noscroll');
    }

    addCustomEvent(drawer, 'openDrawer');
    show(drawer);

    lastActiveElement = document.activeElement;

    const focusableSelector = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
    const focusableItem = drawer.querySelector(focusableSelector);

    if (null !== focusableItem) {
      focusableItem.focus();
    }

    drawer.scrollTop = 0;

    const drawerId  = drawer.getAttribute('id');
    const closeZone = document.querySelector(`.c-drawer-close-zone[aria-controls="${drawerId}"]`);
    if (!! closeZone) {
      closeZone.addEventListener('clickDrawerCloseZone', () => BasisDrawer.close(drawer), false);
    }
  }

  _resizeWindow(drawer) {
    addCustomEvent(drawer, 'resizeDrawer');
    BasisDrawer.close(drawer);
  }

  _closeOtherSubmenus(item) {
    forEachHtmlNodes(
      item.parentNode.children,
      (child) => {
        const toggleBtns = child.querySelectorAll(this.args.toggle);
        child !== item && forEachHtmlNodes(toggleBtns, (toggleBtn) => BasisToggleBtn.close(toggleBtn));
      }
    );
  }

  _closeAllSubmenus(drawer) {
    const toggleBtns = drawer.querySelectorAll(this.args.toggle);
    forEachHtmlNodes(toggleBtns, (toggleBtn) => BasisToggleBtn.close(toggleBtn));
  }
}
