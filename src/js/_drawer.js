'use strict';

export default class BasisDrawer {
  constructor(args = {}) {
    this.args = args;
    this.args.drawer  = !! this.args.drawer ? this.args.drawer : '.c-drawer';
    this.args.toggle  = !! this.args.toggle ? this.args.toggle : '.c-drawer__toggle';
    this.args.submenu = !! this.args.submenu ? this.args.submenu : '.c-drawer__submenu';
    this.args.item    = !! this.args.item ? this.args.item : '.c-drawer__item';
    this.args.subitem = !! this.args.subitem ? this.args.subitem : '.c-drawer__subitem';

    window.addEventListener('DOMContentLoaded', () => this._DOMContentLoaded(), false);
  }

  _DOMContentLoaded() {
    this.windowWidth = window.innerWidth;

    const drawers = document.querySelectorAll(this.args.drawer);
    this._forEachHtmlNodes(drawers, (drawer) => {
      (() => {
        const submenus = drawer.querySelectorAll(`${this.args.submenu}[aria-hidden]`);
        this._forEachHtmlNodes(submenus, (submenu) => {
          const random    = Math.floor((Math.random() * (9999999 - 1000000)) + 1000000);
          const time      = new Date().getTime();
          const id        = `drawer-${time}${random}`;
          const toggleBtn = submenu.parentNode.querySelector(this.args.toggle);

          if (!! submenu && !! toggleBtn) {
            submenu.setAttribute('id', id);
            toggleBtn.setAttribute('aria-controls', `${id}`);
          }
        });
      })();

      const container  = drawer.parentNode;
      const btn        = document.getElementById(drawer.getAttribute('aria-labelledby'));
      const toggleBtns = drawer.querySelectorAll(`${this.args.toggle}`);
      const subMenus   = drawer.querySelectorAll(this.args.submenu);

      const closeDrawer = () => {
        this._close(btn);
        this._hidden(drawer);
        this._forEachHtmlNodes(toggleBtns, (element) => this._close(element));
        this._forEachHtmlNodes(subMenus, (element) => this._hidden(element));
      };

      const closeDrawerOnResize = () => {
        if (window.innerWidth !== this.windowWidth) {
          this._hidden(drawer);
          this._close(btn);
          this.windowWidth = window.innerWidth;
        }
      };

      const toggleMenu = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const toggleBtn = event.currentTarget;
        const menu = document.getElementById(toggleBtn.getAttribute('aria-controls'));

        if ('false' == toggleBtn.getAttribute('aria-expanded')) {
          this._open(toggleBtn);
          this._show(menu);
        } else {
          this._close(toggleBtn);
          this._hidden(menu);
          this._forEachHtmlNodes(menu.querySelectorAll(this.args.toggle), (element) => this._close(element));
          this._forEachHtmlNodes(menu.querySelectorAll(this.args.submenu), (element) => this._hidden(element));
        }
      }

      drawer.addEventListener('click', (event) => event.stopPropagation(), false);
      window.addEventListener('resize', closeDrawerOnResize, false);

      if (!! container) {
        container.addEventListener('click', closeDrawer, false);
      }

      const drawerItemLinks = drawer.querySelectorAll(`${this.args.item} > a`);
      this._forEachHtmlNodes(drawerItemLinks, (element) => element.addEventListener('click', closeDrawer, false));

      const drawerSubItemLinks = drawer.querySelectorAll(`${this.args.subitem} > a`);
      this._forEachHtmlNodes(drawerSubItemLinks, (element) => element.addEventListener('click', closeDrawer, false));

      this._forEachHtmlNodes(toggleBtns, (element) => element.addEventListener('click', toggleMenu, false));
    });
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

  _forEachHtmlNodes(htmlNodes, callback) {
    if (0 < htmlNodes.length) {
      [].forEach.call(htmlNodes, (htmlNode) => callback(htmlNode));
    }
  }
}
