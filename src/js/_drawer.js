import forEachHtmlNodes from '@inc2734/for-each-html-nodes';
import addCustomEvent from '@inc2734/add-custom-event';
import '@inc2734/dispatch-custom-resize-event';
import { uniqueId } from './_helper';

let lastActiveElement = document.activeElement;

const focusableSelector = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [tabindex="-1"], [contenteditable]';

function DrawerComponent(element, props) {
  window.addEventListener(
    'resize:width',
    (event) => {
      addCustomEvent(element, 'resizeDrawer');
      props.onResize(event);
    },
    false
  );
  element.addEventListener('click', (event) => event.stopPropagation(), false);
  element.addEventListener('keydown', props.onKeydown, false );

  const id = element.getAttribute('id');
  if (id) {
    const controls = document.querySelectorAll(`[aria-controls~=${ id }]`);
    forEachHtmlNodes(
      controls,
      (control) => {
        control.addEventListener('closeHamburgerBtn', props.onCloseHamburgerBtn, false);
        control.addEventListener('openHamburgerBtn', props.onOpenHamburgerBtn, false);
        control.addEventListener('closeDrawerCloseZone', props.onCloseDrawerCloseZone, false);
      }
    )
  }

  this.items = [];

  const wrapper   = element.parentNode;
  const mainClass = element.classList[0];

  const preventBodyScroll = () => {
    if (element.classList.contains(`${ mainClass }--fixed`) && 'body' === wrapper.tagName.toLowerCase()) {
      wrapper.classList.add('u-noscroll');
    }
  };

  const approvalBodyScroll = () => {
    if (element.classList.contains(`${mainClass}--fixed`) && 'body' === wrapper.tagName.toLowerCase()) {
      wrapper.classList.remove('u-noscroll');
    }
  };

  forEachHtmlNodes(
    element.querySelectorAll(props.args.item),
    (item, index) => {
      this.items[ index ] = new DrawerItemComponent(
        item,
        {
          args: props.args,
          closeDrawer: props.closeDrawer,
          onFocusin: () => {
            // this.items[ index ].open();
            this.items.forEach((item) => item !== this.items[ index ] && item.close());
          },
          onClose: () => this.items[ index ].close(),
          onOpen: () => {
            this.items[ index ].open();
            this.items.forEach((item) => item !== this.items[ index ] && item.close());
          },
        }
      );
    }
  );

  this.close = () => {
    approvalBodyScroll();

    addCustomEvent(element, 'closeDrawer');

    if (null !== lastActiveElement) {
      lastActiveElement.focus();
    }

    element.setAttribute('aria-hidden', 'true');

    this.items.forEach((item) => item.close());
  };

  this.open = () => {
    preventBodyScroll();

    addCustomEvent(element, 'openDrawer');
    element.setAttribute('aria-hidden', 'false');

    lastActiveElement = document.activeElement;
    const focusableItem = element.querySelector(focusableSelector);
    if (!! focusableItem) {
      // Addresses the fact that other drawers may be affected by the transition of this drawer.
      setTimeout(() => focusableItem.focus(), 200);
    }

    element.scrollTop = 0;
  };

  this.toggle = () => {
    'true' === element.getAttribute('aria-hidden')
      ? this.open()
      : this.close();
  };
}

function DrawerItemComponent(element, props) {
  element.addEventListener('focusin', props.onFocusin, false);

  this.toggleBtn = undefined;
  this.submenu = undefined;

  const id = uniqueId('drawer');

  forEachHtmlNodes(
    element.children,
    (child) => {
      // Toggle Button
      if (child.classList.contains(props.args.toggle.slice(1))) {
        this.toggleBtn = new DrawerToggleBtnComponent(
          child,
          {
            args: props.args,
            ariaControls: ! child.getAttribute('aria-controls') && id,
            onClick: () => {
              'false' === child.getAttribute('aria-expanded')
                ? props.onOpen()
                : props.onClose();
            },
          }
        );

      // Submenu
      } else if (child.classList.contains(props.args.submenu.slice(1))) {
        this.submenu = new DrawerSubmenuComponent(
          child,
          {
            args: props.args,
            id: ! child.getAttribute('id') && id,
            closeDrawer: props.closeDrawer,
          }
        );

      // Link
      } else if ('a' === child.tagName.toLowerCase()) {
        new DrawerItemLinkComponent(
          child,
          {
            onClick: props.closeDrawer,
          }
        );
      }
    }
  );

  this.close = () => {
    if (!! this.toggleBtn && !! this.submenu) {
      this.toggleBtn.close();
      this.submenu.close();
      this.submenu.subitems.forEach((subitem) => subitem.close());
    }
  };

  this.open = () => {
    if (!! this.toggleBtn && !! this.submenu) {
      this.toggleBtn.open();
      this.submenu.open();
    }
  };
}

function DrawerToggleBtnComponent(element, props) {
  element.addEventListener(
    'click',
    (event) => {
      event.preventDefault();
      event.stopPropagation();

      props.onClick(event);
    },
    false
  );

  element.setAttribute('aria-controls', props.ariaControls);

  this.close = () => element.setAttribute('aria-expanded', 'false');
  this.open = () => element.setAttribute('aria-expanded', 'true');
}

function DrawerSubmenuComponent(element, props) {
  element.setAttribute('id', props.id);

  this.subitems = [];

  forEachHtmlNodes(
    element.children,
    (child, index) => {
      // Subitem
      if (child.classList.contains(props.args.subitem.slice(1))) {
        this.subitems[ index ] = new DrawerItemComponent(
          child,
          {
            args: props.args,
            closeDrawer: props.closeDrawer,
            onFocusin: () => {
              // this.subitems[ index ].open();
              this.subitems.forEach((subitem) => subitem !== this.subitems[ index ] && subitem.close());
            },
            onClose: () => this.subitems[ index ].close(),
            onOpen: () => {
              this.subitems[ index ].open();
              this.subitems.forEach((subitem) => subitem !== this.subitems[ index ] && subitem.close());
            },
          }
        );
      }
    }
  );

  this.close = () => element.setAttribute('aria-hidden', 'true');
  this.open = () => element.setAttribute('aria-hidden', 'false');
}

function DrawerItemLinkComponent(element, props) {
  element.addEventListener('click', props.onClick, false);
}

export default class BasisDrawer {

  constructor(args = {}) {
    this.args = args;
    this.args.drawer  = this.args.drawer || '.c-drawer';
    this.args.toggle  = this.args.toggle || `${this.args.drawer}__toggle`;
    this.args.submenu = this.args.submenu || `${this.args.drawer}__submenu`;
    this.args.item    = this.args.item || `${this.args.drawer}__item`;
    this.args.subitem = this.args.subitem || `${this.args.drawer}__subitem`;

    this.drawers = {};

    forEachHtmlNodes(
      document.querySelectorAll(this.args.drawer),
      (element, index) => {
        const id = element.getAttribute('id');
        const key = id || index;

        this.drawers[ key ] = new DrawerComponent(
          element,
          {
            args,
            closeDrawer: () => this.drawers[ key ].close(),
            onResize: () => this.drawers[ key ].close(),
            onKeydown: (event) => 27 === event.keyCode && this.drawers[ key ].close(),
            onCloseHamburgerBtn: () => this.drawers[ key ].close(),
            onOpenHamburgerBtn: () => this.drawers[ key ].open(),
            onCloseDrawerCloseZone: () => this.drawers[ key ].close(),
          }
        );
      }
    );

    const onToggleLinkClick = (event) => {
      const drawerId = event.target.getAttribute('data-basis-drawer-toggle-btn');
      if (!! drawerId && !! this.drawers[ drawerId ]) {
        this.drawers[ drawerId ].toggle();
      }
    };
    document.removeEventListener('click', onToggleLinkClick, false);
    document.addEventListener('click', onToggleLinkClick, false);
  }
}
