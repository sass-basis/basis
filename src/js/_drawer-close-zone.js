'use strict';

import forEachHtmlNodes from '@inc2734/for-each-html-nodes';
import addCustomEvent from '@inc2734/add-custom-event';

export default class BasisDrawerCloseZone {
  constructor(args = {}) {
    this.args = args;
    this.args.drawer = this.args.drawer || '.c-drawer';

    forEachHtmlNodes(
      document.querySelectorAll(this.args.drawer),
      (drawer) => {
        drawer.addEventListener('openDrawer', () => BasisDrawerCloseZone.createCloseZone(drawer), false);
        drawer.addEventListener('closeDrawer', () => BasisDrawerCloseZone.removeCloseZone(drawer), false);
      }
    );
  }

  static createCloseZone(drawer) {
    if (null !== BasisDrawerCloseZone.getCloseZone(drawer)) {
      return;
    }

    const closeZone = document.createElement('div');
    closeZone.classList.add('c-drawer-close-zone');

    if (drawer.classList.contains('c-drawer--fixed')) {
      closeZone.classList.add('c-drawer-close-zone--fixed');
    }

    const drawerId = drawer.getAttribute('id');
    closeZone.setAttribute('id', BasisDrawerCloseZone.generateCloseZoneId(drawerId));
    closeZone.setAttribute('aria-controls', drawerId);

    closeZone.addEventListener('click', (event) => addCustomEvent(closeZone, 'clickDrawerCloseZone'), false);

    drawer.parentNode.appendChild(closeZone);
  }

  static removeCloseZone(drawer) {
    const closeZone = BasisDrawerCloseZone.getCloseZone(drawer);
    if (null === closeZone) {
      return;
    }

    closeZone.parentNode.removeChild(closeZone);
  }

  static generateCloseZoneId(drawerId) {
    return `${drawerId}-close-zone`;
  }

  static getCloseZone(drawer) {
    const drawerId    = drawer.getAttribute('id');
    const closeZoneId = BasisDrawerCloseZone.generateCloseZoneId(drawerId);

    return document.getElementById(closeZoneId);
  }
}
