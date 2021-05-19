import forEachHtmlNodes from '@inc2734/for-each-html-nodes';
import addCustomEvent from '@inc2734/add-custom-event';

function HamburgerBtnComponent(element, props) {
  element.addEventListener(
    'click',
    (event) => {
      event.preventDefault();
      event.stopPropagation();

      'false' === element.getAttribute('aria-expanded')
        ? addCustomEvent(element, 'openHamburgerBtn')
        : addCustomEvent(element, 'closeHamburgerBtn');
    },
    false
  );

  const controlsValue = element.getAttribute('aria-controls');
  if (!! controlsValue ) {
    const controls = controlsValue.split(' ');
    controls.forEach(
      (control) => {
        const target = document.getElementById(control);
        if (!! target) {
          target.addEventListener('closeDrawer', props.onCloseDrawer, false);
          target.addEventListener('openDrawer', props.onOpenDrawer, false);
        }
      }
    );
  }

  this.close = () => element.setAttribute('aria-expanded', 'false');
  this.open = () => element.setAttribute('aria-expanded', 'true');
}

export default class BasisHamburgerBtn {
  constructor(args = {}) {
    this.args = args;
    this.args.btn = this.args.btn || '.c-hamburger-btn';

    this.hamburgerBtns = [];

    forEachHtmlNodes(
      document.querySelectorAll(this.args.btn),
      (element, index) => {
        this.hamburgerBtns[ index ] = new HamburgerBtnComponent(
          element,
          {
            onCloseDrawer: () => this.hamburgerBtns[ index ].close(),
            onOpenDrawer: () => this.hamburgerBtns[ index ].open(),
          }
        );
      }
    );
  }
}
