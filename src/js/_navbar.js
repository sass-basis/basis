import forEachHtmlNodes from '@inc2734/for-each-html-nodes';
import '@inc2734/dispatch-custom-resize-event';
import { uniqueId } from './_helper';

function NavbarBaseItemComponent(element, props) {
  element.addEventListener(
    'focusin',
    (event) => {
      event.stopPropagation();
      props.onFocusin(event);
    },
    false
  );

  forEachHtmlNodes(
    element.querySelectorAll(props.args.submenu),
    (submenu) => {
      const useTurnLeft = () => {
        const rect = submenu.getBoundingClientRect();
        const submenuCenter = rect.left + rect.width / 2;
        const windowCenter = window.innerWidth / 2
        return submenuCenter < windowCenter
          ? false
          : true;
      };

      new NavbarBaseSubmenuComponent(
        submenu,
        {
          useTurnLeft,
        }
      );
    }
  );
}

function NavbarBaseSubmenuComponent(element, props) {
  const init = () => {
    props.useTurnLeft()
      ? element.classList.add('c-navbar__submenu--turn-left')
      : element.classList.remove('c-navbar__submenu--turn-left');
  };

  init();
  window.addEventListener('resize:width', init, false);
}

function NavbarHoverComponent(element, props) {
  this.items = [];

  forEachHtmlNodes(
    element.querySelectorAll(`${ props.args.item }`),
    (item, index) => {
      this.items[ index ] = new NavbarHoverItemComponent(
        item,
        {
          args: props.args,
          onFocusin: () => {
            this.items[ index ].open();
            this.items.forEach((item) => item !== this.items[ index ] && item.close());
          },
          onMouseleave: () => this.items[ index ].close(),
          onMouseover: () => {
            this.items[ index ].open();
            this.items.forEach((item) => item !== this.items[ index ] && item.close());
          },
        }
      );
    }
  );
}

function NavbarHoverItemComponent(element, props) {
  new NavbarBaseItemComponent(
    element,
    {
      args: props.args,
      onFocusin: props.onFocusin,
    }
  );

  element.addEventListener(
    'mouseover',
    (event) => {
      event.stopPropagation();
      props.onMouseover(event)
    },
    false
  );

  element.addEventListener(
    'mouseleave',
    (event) => {
      event.stopPropagation();
      props.onMouseleave(event)
    },
    false
  );

  this.submenu = undefined;

  forEachHtmlNodes(
    element.children,
    (child) => {
      if (child.classList.contains(props.args.submenu.slice(1))) {
        this.submenu = new NavbarHoverSubmenuComponent(
          child,
          {
            args: props.args,
          }
        );
      }
    }
  );

  this.close = () => {
    if (!! this.submenu) {
      this.submenu.close();
      this.submenu.subitems.forEach((subitem) => subitem.close());
    }
  };

  this.open = () => {
    if (!! this.submenu) {
      this.submenu.open();
    }
  };
}

function NavbarHoverSubmenuComponent(element, props) {
  this.subitems = [];

  forEachHtmlNodes(
    element.children,
    (child, index) => {
      if (child.classList.contains(props.args.subitem.slice(1))) {
        this.subitems[ index ] = new NavbarHoverItemComponent(
          child,
          {
            args: props.args,
            onFocusin: () => {
              this.subitems[ index ].open();
              this.subitems.forEach((subitem) => subitem !== this.subitems[ index ] && subitem.close());
            },
            onMouseleave: () => this.subitems[ index ].close(),
            onMouseover: () => {
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

function NavbarClickComponent(element, props) {
  this.items = [];

  forEachHtmlNodes(
    element.querySelectorAll(props.args.item),
    (item, index) => {
      this.items[ index ] = new NavbarClickItemComponent(
        item,
        {
          args: props.args,
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
}

function NavbarClickItemComponent(element, props) {
  new NavbarBaseItemComponent(
    element,
    {
      args: props.args,
      onFocusin: props.onFocusin,
    }
  );

  this.toggleBtn = undefined;
  this.submenu = undefined;

  const id = uniqueId('navbar');

  forEachHtmlNodes(
    element.children,
    (child) => {
      // Toggle Button
      if (child.classList.contains(props.args.toggle.slice(1))) {
        this.toggleBtn = new NavbarClickToggleBtnComponent(
          child,
          {
            args: props.args,
            ariaControls: ! child.getAttribute('aria-controls') && id,
            onClick: () => {
              'false' === child.getAttribute('aria-expanded')
                ? props.onOpen()
                : props.onClose();
            },
            onResize: () => props.onClose(),
          }
        );

      // Submenu
      } else if (child.classList.contains(props.args.submenu.slice(1))) {
        this.submenu = new NavbarClickSubmenuComponent(
          child,
          {
            args: props.args,
            id: ! child.getAttribute('id') && id,
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

function NavbarClickToggleBtnComponent(element, props) {
  element.addEventListener(
    'click',
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      props.onClick(event);
    },
    false
  );

  window.addEventListener('resize:width', props.onResize, false);

  element.setAttribute('aria-controls', props.ariaControls);

  this.close = () => element.setAttribute('aria-expanded', 'false');
  this.open = () => element.setAttribute('aria-expanded', 'true');
}

function NavbarClickSubmenuComponent(element, props) {
  element.setAttribute('id', props.id);

  this.subitems = [];

  forEachHtmlNodes(
    element.children,
    (child, index) => {
      // Subitem
      if (child.classList.contains(props.args.subitem.slice(1))) {
        this.subitems[ index ] = new NavbarClickItemComponent(
          child,
          {
            args: props.args,
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

export default class BasisNavbar {
  constructor(args = {}) {
    this.args = args;
    this.args.wrapper = this.args.wrapper || '.c-navbar';
    this.args.item = this.args.item || `${this.args.wrapper}__item`;
    this.args.submenu = this.args.submenu || `${this.args.wrapper}__submenu`;
    this.args.subitem = this.args.subitem || `${this.args.wrapper}__subitem`;
    this.args.toggle = this.args.toggle || `${this.args.wrapper}__toggle`;

    forEachHtmlNodes(
      document.querySelectorAll(this.args.wrapper),
      (element) => {
        const popupMode = element.getAttribute('data-popup-mode') || 'hover';

        'hover' === popupMode
          ? new NavbarHoverComponent(
            element,
            {
              args,
            }
          )
          : new NavbarClickComponent(
            element,
            {
              args,
            }
          );
      }
    );
  }
}
