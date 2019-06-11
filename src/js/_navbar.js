'use strict';

import forEachHtmlNodes from '@inc2734/for-each-html-nodes';

export default class BasisNavbar {
  constructor(args = {}) {
    this.args = args;
    this.args.wrapper = this.args.wrapper || '.c-navbar';
    this.args.item = this.args.item || `${this.args.wrapper}__item`;
    this.args.submenu = this.args.submenu || `${this.args.wrapper}__submenu`;
    this.args.subitem = this.args.subitem || `${this.args.wrapper}__subitem`;
    this.args.toggle = this.args.toggle || `${this.args.wrapper}__toggle`;

    this.windowWidth = window.innerWidth;

    const wrappers = document.querySelectorAll(this.args.wrapper);

    forEachHtmlNodes(wrappers, (wrapper) => this.init(wrapper));
  }

  show(submenu) {
    submenu.setAttribute('aria-hidden', 'false');
  }

  hidden(submenu) {
    submenu.setAttribute('aria-hidden', 'true');
  }

  open(submenu) {
    submenu.setAttribute('aria-expanded', 'true');
  }

  close(submenu) {
    submenu.setAttribute('aria-expanded', 'false');
  }

  init(wrapper) {
    const popupMode = wrapper.getAttribute('data-popup-mode') || 'hover';

    if ('hover' === popupMode) {
      this.applyHoverEffect(wrapper);
    } else if ('click' === popupMode) {
      this.applyClickEffect(wrapper);
    }
  }

  applyHoverEffect(wrapper) {
    const itemsHasPopup = wrapper.querySelectorAll(
      [
        `${this.args.item}[aria-haspopup="true"]`,
        `${this.args.subitem}[aria-haspopup="true"]`,
      ].join(',')
    );

    const items = wrapper.querySelectorAll(
      [
        this.args.item,
        this.args.subitem,
      ].join(',')
    );

    forEachHtmlNodes(
      itemsHasPopup,
      (item) => {
        const mouseoverEvent = () => forEachHtmlNodes(
          item.children,
          (child) => child.classList.contains(this.args.submenu.replace(/^\./, '')) && this.show(child)
        );

        const mouseleaveEvent = () => forEachHtmlNodes(
          item.querySelectorAll(this.args.submenu),
          (child) => this.hidden(child)
        );

        item.addEventListener('mouseover', () => mouseoverEvent(), false);
        item.addEventListener('focusin', () => mouseoverEvent(), false);
        item.addEventListener('mouseleave', () => mouseleaveEvent(), false);
      }
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
                child !== item && forEachHtmlNodes(submenus, (submenu) => this.hidden(submenu));
              }
            );
          },
          false
        );
      }
    );
  }

  applyClickEffect(wrapper) {
    const setSubmenusId = (wrapper) => {
      const submenus = wrapper.querySelectorAll(`${this.args.submenu}[aria-hidden]`);

      forEachHtmlNodes(
        submenus,
        (submenu) => {
          const random    = Math.floor((Math.random() * (9999999 - 1000000)) + 1000000);
          const time      = new Date().getTime();
          const id        = `navbar-${time}${random}`;
          const toggleBtn = submenu.parentNode.querySelector(this.args.toggle);

          if (!! submenu && !! toggleBtn) {
            submenu.setAttribute('id', id);
            toggleBtn.setAttribute('aria-controls', `${id}`);
          }
        }
      );
    };

    const closeSubmenu = (submenu) => {
      const toggleBtn = submenu.parentNode.querySelector(this.args.toggle);
      this.hidden(submenu);
      this.close(toggleBtn);
      forEachHtmlNodes(submenu.querySelectorAll(this.args.submenu), (element) => closeSubmenu(element));
    };

    const closeAllSubmenus = (wrapper) => {
      const submenus = wrapper.querySelectorAll(this.args.submenu);
      forEachHtmlNodes(submenus, (element) => closeSubmenu(element));
    };

    const closePreviousSubmenu = (item) => {
      const previousItem = item.previousElementSibling;

      if (null !== previousItem) {
        closePreviousSubmenu(previousItem);

        const previousSubmenu = previousItem.querySelector(this.args.submenu);
        if (null !== previousSubmenu) {
          closeSubmenu(previousSubmenu);
        }
      }
    };

    const closeNextSubmenu = (item) => {
      const nextItem = item.nextElementSibling;

      if (null !== nextItem) {
        closeNextSubmenu(nextItem);

        const nextSubmenu = nextItem.querySelector(this.args.submenu);
        if (null !== nextSubmenu) {
          closeSubmenu(nextSubmenu);
        }
      }
    };

    const clickToggleBtns = (event) => {
      event.preventDefault();
      event.stopPropagation();

      const toggleBtn = event.currentTarget;
      const menu = document.getElementById(toggleBtn.getAttribute('aria-controls'));

      closePreviousSubmenu(menu.parentNode);
      closeNextSubmenu(menu.parentNode);

      if ('false' == toggleBtn.getAttribute('aria-expanded')) {
        this.open(toggleBtn);
        this.show(menu);
      } else {
        closeSubmenu(menu);
      }
    };

    const resizeWindow = (wrapper) => {
      if (window.innerWidth !== this.windowWidth) {
        closeAllSubmenus(wrapper);
        this.windowWidth = window.innerWidth;
      }
    };

    setSubmenusId(wrapper);
    window.addEventListener('resize', () => resizeWindow(wrapper), false);
    wrapper.addEventListener('closeDrawer', () => closeAllSubmenus(wrapper), false);

    const toggleBtns = wrapper.querySelectorAll(this.args.toggle);
    forEachHtmlNodes(
      toggleBtns,
      (element) => element.addEventListener('click', () => clickToggleBtns(event), false)
    );
  }
}
