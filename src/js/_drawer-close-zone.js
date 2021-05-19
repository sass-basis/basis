import forEachHtmlNodes from '@inc2734/for-each-html-nodes';
import addCustomEvent from '@inc2734/add-custom-event';

function DrawerCloseZoneComponent(element, props) {
  element.addEventListener('click', () => addCustomEvent(element, 'closeDrawerCloseZone'), false);

  const controlsValue = element.getAttribute('aria-controls');
  if (!! controlsValue) {
    const controls = controlsValue.split(' ');
    controls.forEach(
      (control) => {
        const target = document.getElementById(control);
        target.addEventListener('closeDrawer', props.onCloseDrawer, false);
        target.addEventListener('openDrawer', props.onOpenDrawer, false);
      }
    );
  }

  this.close = () => element.setAttribute('aria-hidden', 'true');
  this.open = () => element.setAttribute('aria-hidden', 'false');
}

export default class BasisDrawerCloseZone {
  constructor() {
    this.drawerCloseZones = [];

    forEachHtmlNodes(
      document.querySelectorAll('.c-drawer-close-zone'),
      (element, index) => {
        this.drawerCloseZones[ index ] = new DrawerCloseZoneComponent(
          element,
          {
            onCloseDrawer: () => this.drawerCloseZones[ index ].close(),
            onOpenDrawer: () => this.drawerCloseZones[ index ].open(),
          }
        );
      }
    );
  }
}
