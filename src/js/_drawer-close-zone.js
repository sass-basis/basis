'use strict';

export default class BasisDrawerCloseZone {
  constructor(args = {}) {
    this.args = args;
    this.args.btn = !! this.args.btn ? this.args.btn : '.c-hamburger-btn';

    window.addEventListener('DOMContentLoaded', () => this._DOMContentLoaded(), false);
  }

  _DOMContentLoaded() {
    const hamburgerBtns = document.querySelectorAll(this.args.btn);
    this._forEachHtmlNodes(hamburgerBtns, (element) => {
      element.addEventListener('clickHamburgerBtn', () => {
        this._clickHamburgerBtn(element);
      }, false);

      const drawerId = element.getAttribute('aria-controls');
      const drawer = this._getDrawer(drawerId);
      if (null !== drawer) {
        drawer.addEventListener('resizeDrawer', () => {
          this._removeCloseZone(drawerId);
        }, false);
      }

      drawer.parentNode.addEventListener('clickDrawerContainer', () => {
        this._removeCloseZone(drawerId);
      }, false);
    });
  }

  _clickHamburgerBtn(hamburgerBtn) {
    if ('false' === hamburgerBtn.getAttribute('aria-expanded')) {
      this._createCloseZone(hamburgerBtn.getAttribute('aria-controls'));
    } else {
      this._removeCloseZone(hamburgerBtn.getAttribute('aria-controls'));
    }
  }

  _createCloseZone(drawerId) {
    const drawer = this._getDrawer(drawerId);
    if (! drawer) {
      return;
    }

    if (null !== this._getCloseZone(drawerId)) {
      return;
    }

    const closeZone = document.createElement('div');
    closeZone.classList.add('c-drawer-close-zone');

    if (drawer.classList.contains('c-drawer--fixed')) {
      closeZone.classList.add('c-drawer-close-zone--fixed');
    }

    closeZone.setAttribute('id', this._generateCloseZoneId(drawerId));
    drawer.parentNode.appendChild(closeZone);
  }

  _removeCloseZone(drawerId) {
    const closeZone = this._getCloseZone(drawerId);

    if (null === closeZone) {
      return;
    }

    closeZone.parentNode.removeChild(closeZone);
  }

  _generateCloseZoneId(drawerId) {
    return `${drawerId}-close-zone`;;
  }

  _getDrawer(drawerId) {
    return document.getElementById(drawerId);
  }

  _getCloseZone(drawerId) {
    const closeZoneId = this._generateCloseZoneId(drawerId);
    const closeZone = document.getElementById(closeZoneId);
    return closeZone;
  }

  _forEachHtmlNodes(htmlNodes, callback) {
    if (0 < htmlNodes.length) {
      [].forEach.call(htmlNodes, (htmlNode) => callback(htmlNode));
    }
  }
}
