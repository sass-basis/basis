(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function forEachHtmlNodes(htmlNodes, callback) {
    if (0 < htmlNodes.length) {
      var index = 0;
      [].forEach.call(htmlNodes, function (htmlNode) {
        callback(htmlNode, index);
        index++;
      });
    }
  }

  function addCustomEvent(element, eventName) {
    var event;

    try {
      event = new CustomEvent(eventName);
    } catch (e) {
      event = document.createEvent('CustomEvent');
      event.initCustomEvent(eventName, false, false, null);
    }

    element.dispatchEvent(event);
  }

  var BasisHamburgerBtn =
  /*#__PURE__*/
  function () {
    function BasisHamburgerBtn() {
      var _this = this;

      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, BasisHamburgerBtn);

      this.args = args;
      this.args.btn = this.args.btn || '.c-hamburger-btn';
      window.addEventListener('DOMContentLoaded', function () {
        return _this._DOMContentLoaded();
      }, false);
    }

    _createClass(BasisHamburgerBtn, [{
      key: "_DOMContentLoaded",
      value: function _DOMContentLoaded() {
        var _this2 = this;

        var hamburgerBtns = document.querySelectorAll(this.args.btn);
        forEachHtmlNodes(hamburgerBtns, function (element) {
          element.addEventListener('click', function (event) {
            return _this2._click(event);
          }, false);
          element.addEventListener('openHamburgerBtn', function () {
            return BasisHamburgerBtn.open(element);
          }, false);
          element.addEventListener('closeHamburgerBtn', function () {
            return BasisHamburgerBtn.close(element);
          }, false);
          var drawer = document.getElementById(element.getAttribute('aria-controls'));

          if (null !== drawer) {
            drawer.addEventListener('closeDrawer', function () {
              return BasisHamburgerBtn.close(element);
            }, false);
            drawer.addEventListener('openDrawer', function () {
              return BasisHamburgerBtn.open(element);
            }, false);
          }
        });
      }
    }, {
      key: "_click",
      value: function _click(event) {
        var hamburgerBtn = event.currentTarget;
        var drawer = document.getElementById(hamburgerBtn.getAttribute('aria-controls'));

        if (!drawer) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        if ('false' === hamburgerBtn.getAttribute('aria-expanded')) {
          addCustomEvent(hamburgerBtn, 'openHamburgerBtn');
        } else {
          addCustomEvent(hamburgerBtn, 'closeHamburgerBtn');
        }
      }
    }], [{
      key: "open",
      value: function open(hamburgerBtn) {
        hamburgerBtn.setAttribute('aria-expanded', 'true');
      }
    }, {
      key: "close",
      value: function close(hamburgerBtn) {
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    }]);

    return BasisHamburgerBtn;
  }();

  var BasisDrawer =
  /*#__PURE__*/
  function () {
    function BasisDrawer() {
      var _this = this;

      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, BasisDrawer);

      this.args = args;
      this.args.drawer = this.args.drawer || '.c-drawer';
      this.args.toggle = this.args.toggle || '.c-drawer__toggle';
      this.args.submenu = this.args.submenu || '.c-drawer__submenu';
      this.args.item = this.args.item || '.c-drawer__item';
      this.args.subitem = this.args.subitem || '.c-drawer__subitem';
      window.addEventListener('DOMContentLoaded', function () {
        return _this._DOMContentLoaded();
      }, false);
    }

    _createClass(BasisDrawer, [{
      key: "_DOMContentLoaded",
      value: function _DOMContentLoaded() {
        var _this2 = this;

        this.windowWidth = window.innerWidth;
        var drawers = document.querySelectorAll(this.args.drawer);
        forEachHtmlNodes(drawers, function (drawer) {
          _this2._setSubmenusId(drawer);

          window.addEventListener('resize', function () {
            return _this2._resizeWindow(drawer);
          }, false);
          drawer.addEventListener('closeDrawer', function () {
            return _this2._closeAllSubmenus(drawer);
          }, false);
          drawer.addEventListener('click', function () {
            return event.stopPropagation();
          }, false);
          var btn = document.getElementById(drawer.getAttribute('aria-labelledby'));

          if (!!btn) {
            btn.addEventListener('openHamburgerBtn', function () {
              return BasisDrawer.open(drawer);
            }, false);
            btn.addEventListener('closeHamburgerBtn', function () {
              return BasisDrawer.close(drawer);
            }, false);
          }

          var drawerItemLinks = drawer.querySelectorAll("".concat(_this2.args.item, " > a"));
          forEachHtmlNodes(drawerItemLinks, function (element) {
            return element.addEventListener('click', function () {
              return addCustomEvent(element, 'clickDrawerItemLink');
            }, false);
          });
          var drawerSubItemLinks = drawer.querySelectorAll("".concat(_this2.args.subitem, " > a"));
          forEachHtmlNodes(drawerSubItemLinks, function (element) {
            return element.addEventListener('click', function () {
              return addCustomEvent(element, 'clickDrawerSubItemLink');
            }, false);
          });
          var toggleBtns = drawer.querySelectorAll("".concat(_this2.args.toggle));
          forEachHtmlNodes(toggleBtns, function (element) {
            return element.addEventListener('click', function () {
              return _this2._clickToggleBtns(event);
            }, false);
          });
        });
      }
    }, {
      key: "_open",
      value: function _open(target) {
        target.setAttribute('aria-expanded', 'true');
      }
    }, {
      key: "_close",
      value: function _close(target) {
        target.setAttribute('aria-expanded', 'false');
      }
    }, {
      key: "_show",
      value: function _show(target) {
        target.setAttribute('aria-hidden', 'false');
      }
    }, {
      key: "_hidden",
      value: function _hidden(target) {
        target.setAttribute('aria-hidden', 'true');
      }
    }, {
      key: "_setSubmenusId",
      value: function _setSubmenusId(drawer) {
        var _this3 = this;

        var submenus = drawer.querySelectorAll("".concat(this.args.submenu, "[aria-hidden]"));
        forEachHtmlNodes(submenus, function (submenu) {
          var random = Math.floor(Math.random() * (9999999 - 1000000) + 1000000);
          var time = new Date().getTime();
          var id = "drawer-".concat(time).concat(random);
          var toggleBtn = submenu.parentNode.querySelector(_this3.args.toggle);

          if (!!submenu && !!toggleBtn) {
            submenu.setAttribute('id', id);
            toggleBtn.setAttribute('aria-controls', "".concat(id));
          }
        });
      }
    }, {
      key: "_resizeWindow",
      value: function _resizeWindow(drawer) {
        addCustomEvent(drawer, 'resizeDrawer');

        if (window.innerWidth !== this.windowWidth) {
          BasisDrawer.close(drawer);
          this.windowWidth = window.innerWidth;
        }
      }
    }, {
      key: "_closeSubmenu",
      value: function _closeSubmenu(submenu) {
        var toggleBtn = submenu.parentNode.querySelector(this.args.toggle);

        this._hidden(submenu);

        this._close(toggleBtn);
      }
    }, {
      key: "_closeAllSubmenus",
      value: function _closeAllSubmenus(drawer) {
        var _this4 = this;

        var submenus = drawer.querySelectorAll(this.args.submenu);
        forEachHtmlNodes(submenus, function (element) {
          return _this4._closeSubmenu(element);
        });
      }
    }, {
      key: "_clickToggleBtns",
      value: function _clickToggleBtns(event) {
        var _this5 = this;

        event.preventDefault();
        event.stopPropagation();
        var toggleBtn = event.currentTarget;
        var menu = document.getElementById(toggleBtn.getAttribute('aria-controls'));

        if ('false' == toggleBtn.getAttribute('aria-expanded')) {
          this._open(toggleBtn);

          this._show(menu);
        } else {
          this._closeSubmenu(menu);

          forEachHtmlNodes(menu.querySelectorAll(this.args.submenu), function (element) {
            return _this5._closeSubmenu(element);
          });
        }
      }
    }], [{
      key: "close",
      value: function close(drawer) {
        addCustomEvent(drawer, 'closeDrawer');
        drawer.setAttribute('aria-hidden', 'true');
      }
    }, {
      key: "open",
      value: function open(drawer) {
        addCustomEvent(drawer, 'openDrawer');
        drawer.setAttribute('aria-hidden', 'false');
        var drawerId = drawer.getAttribute('id');
        var closeZone = document.querySelector(".c-drawer-close-zone[aria-controls=\"".concat(drawerId, "\"]"));

        if (!!closeZone) {
          closeZone.addEventListener('clickDrawerCloseZone', function () {
            return BasisDrawer.close(drawer);
          }, false);
        }
      }
    }]);

    return BasisDrawer;
  }();

  var BasisDrawerCloseZone =
  /*#__PURE__*/
  function () {
    function BasisDrawerCloseZone() {
      var _this = this;

      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, BasisDrawerCloseZone);

      this.args = args;
      this.args.drawer = this.args.drawer || '.c-drawer';
      window.addEventListener('DOMContentLoaded', function () {
        return _this._DOMContentLoaded();
      }, false);
    }

    _createClass(BasisDrawerCloseZone, [{
      key: "_DOMContentLoaded",
      value: function _DOMContentLoaded() {
        var drawers = document.querySelectorAll(this.args.drawer);
        forEachHtmlNodes(drawers, function (drawer) {
          drawer.addEventListener('openDrawer', function () {
            return BasisDrawerCloseZone.createCloseZone(drawer);
          }, false);
          drawer.addEventListener('closeDrawer', function () {
            return BasisDrawerCloseZone.removeCloseZone(drawer);
          }, false);
        });
      }
    }], [{
      key: "createCloseZone",
      value: function createCloseZone(drawer) {
        if (null !== BasisDrawerCloseZone.getCloseZone(drawer)) {
          return;
        }

        var closeZone = document.createElement('div');
        closeZone.classList.add('c-drawer-close-zone');

        if (drawer.classList.contains('c-drawer--fixed')) {
          closeZone.classList.add('c-drawer-close-zone--fixed');
        }

        var drawerId = drawer.getAttribute('id');
        closeZone.setAttribute('id', BasisDrawerCloseZone.generateCloseZoneId(drawerId));
        closeZone.setAttribute('aria-controls', drawerId);
        closeZone.addEventListener('click', function (event) {
          return addCustomEvent(closeZone, 'clickDrawerCloseZone');
        }, false);
        drawer.parentNode.appendChild(closeZone);
      }
    }, {
      key: "removeCloseZone",
      value: function removeCloseZone(drawer) {
        var closeZone = BasisDrawerCloseZone.getCloseZone(drawer);

        if (null === closeZone) {
          return;
        }

        closeZone.parentNode.removeChild(closeZone);
      }
    }, {
      key: "generateCloseZoneId",
      value: function generateCloseZoneId(drawerId) {
        return "".concat(drawerId, "-close-zone");
      }
    }, {
      key: "getCloseZone",
      value: function getCloseZone(drawer) {
        var drawerId = drawer.getAttribute('id');
        var closeZoneId = BasisDrawerCloseZone.generateCloseZoneId(drawerId);
        return document.getElementById(closeZoneId);
      }
    }]);

    return BasisDrawerCloseZone;
  }();

  var BasisNavbar =
  /*#__PURE__*/
  function () {
    function BasisNavbar() {
      var _this = this;

      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, BasisNavbar);

      this.args = args;
      this.args.item = this.args.item || '.c-navbar__item';
      this.args.submenu = this.args.submenu || '.c-navbar__submenu';
      this.args.subitem = this.args.subitem || '.c-navbar__subitem';
      window.addEventListener('DOMContentLoaded', function () {
        return _this._DOMContentLoaded();
      }, false);
    }

    _createClass(BasisNavbar, [{
      key: "_DOMContentLoaded",
      value: function _DOMContentLoaded() {
        var _this2 = this;

        var show = function show(submenu) {
          return submenu.setAttribute('aria-hidden', 'false');
        };

        var hidden = function hidden(submenu) {
          return submenu.setAttribute('aria-hidden', 'true');
        };

        var itemsHasPopup = document.querySelectorAll(["".concat(this.args.item, "[aria-haspopup=\"true\"]"), "".concat(this.args.subitem, "[aria-haspopup=\"true\"]")].join(','));
        forEachHtmlNodes(itemsHasPopup, function (item) {
          var mouseoverEvent = function mouseoverEvent() {
            return forEachHtmlNodes(item.children, function (child) {
              return child.classList.contains(_this2.args.submenu.replace(/^\./, '')) && show(child);
            });
          };

          var mouseleaveEvent = function mouseleaveEvent() {
            return forEachHtmlNodes(item.querySelectorAll(_this2.args.submenu), function (child) {
              return hidden(child);
            });
          };

          item.addEventListener('mouseover', function () {
            return mouseoverEvent();
          }, false);
          item.addEventListener('focusin', function () {
            return mouseoverEvent();
          }, false);
          item.addEventListener('mouseleave', function () {
            return mouseleaveEvent();
          }, false);
        });
        var items = document.querySelectorAll([this.args.item, this.args.subitem].join(','));
        forEachHtmlNodes(items, function (item) {
          item.addEventListener('focusin', function () {
            forEachHtmlNodes(item.parentNode.children, function (child) {
              var submenus = child.querySelectorAll(_this2.args.submenu);
              child !== item && forEachHtmlNodes(submenus, function (submenu) {
                return hidden(submenu);
              });
            });
          }, false);
        });
      }
    }]);

    return BasisNavbar;
  }();

  var BasisPageEffect =
  /*#__PURE__*/
  function () {
    function BasisPageEffect() {
      var _this = this;

      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, BasisPageEffect);

      this.args = args;
      this.args.pageEffect = this.args.pageEffect || '.c-page-effect';
      this.args.duration = this.args.duration || 0 === this.args.duration ? this.args.duration : 200;
      window.addEventListener('DOMContentLoaded', function () {
        return _this._DOMContentLoaded();
      }, false);
    }

    _createClass(BasisPageEffect, [{
      key: "_DOMContentLoaded",
      value: function _DOMContentLoaded() {
        var _this2 = this;

        this.container = document.querySelector(this.args.pageEffect);
        this.pageOutObjects = document.querySelectorAll('[data-page-effect-link="true"], a[href]:not([target="_blank"]):not([href^="#"]):not([href*="javascript"]):not([href*=".jpg"]):not([href*=".jpeg"]):not([href*=".gif"]):not([href*=".png"]):not([href*=".mov"]):not([href*=".swf"]):not([href*=".mp4"]):not([href*=".flv"]):not([href*=".avi"]):not([href*=".mp3"]):not([href*=".pdf"]):not([href*=".zip"]):not([href^="mailto:"]):not([data-page-effect-link="false"])');

        if (!this.container) {
          return;
        }

        window.addEventListener('load', function () {
          return _this2._fadeInPage();
        }, false);
        forEachHtmlNodes(this.pageOutObjects, function (link) {
          link.addEventListener('click', function (event) {
            if (event.shiftKey || event.ctrlKey || event.metaKey) {
              return;
            }

            event.preventDefault();

            _this2._fadeOutPage();

            _this2._moveLocation(link.getAttribute('href'));
          }, false);
        });
      }
    }, {
      key: "_moveLocation",
      value: function _moveLocation(url) {
        setTimeout(function () {
          return location.href = url;
        }, this.args['duration']);
      }
    }, {
      key: "_fadeInPage",
      value: function _fadeInPage() {
        this.container.setAttribute('aria-hidden', 'true');
        this.container.setAttribute('data-page-effect', 'fadein');
      }
    }, {
      key: "_fadeOutPage",
      value: function _fadeOutPage() {
        this.container.setAttribute('aria-hidden', 'false');
        this.container.setAttribute('data-page-effect', 'fadeout');
      }
    }]);

    return BasisPageEffect;
  }();

  var BasisSelect =
  /*#__PURE__*/
  function () {
    function BasisSelect() {
      var _this = this;

      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, BasisSelect);

      this.args = args;
      this.args.select = this.args.select || '.c-select';
      this.args.label = this.args.label || '.c-select__label';
      window.addEventListener('DOMContentLoaded', function () {
        return _this._DOMContentLoaded();
      }, false);
    }

    _createClass(BasisSelect, [{
      key: "_DOMContentLoaded",
      value: function _DOMContentLoaded() {
        var _this2 = this;

        var selects = document.querySelectorAll(this.args.select);
        forEachHtmlNodes(selects, function (item, index) {
          var wrapper = item;
          var select = wrapper.querySelector('select');
          var label = wrapper.querySelector(_this2.args.label);

          var setLabel = function setLabel() {
            return label.textContent = select.options[select.selectedIndex].textContent;
          };

          var changeEvent = function changeEvent() {
            return setLabel();
          };

          var focusinEvent = function focusinEvent() {
            return wrapper.setAttribute('aria-selected', 'true');
          };

          var focusoutEvent = function focusoutEvent() {
            return wrapper.setAttribute('aria-selected', 'false');
          };

          label.textContent = setLabel();
          select.addEventListener('change', function () {
            return changeEvent();
          }, false);
          select.addEventListener('focusin', function () {
            return focusinEvent();
          }, false);
          select.addEventListener('focusout', function () {
            return focusoutEvent();
          }, false);
        });
      }
    }]);

    return BasisSelect;
  }();

  new BasisHamburgerBtn();
  new BasisDrawer();
  new BasisDrawerCloseZone();
  new BasisNavbar();
  new BasisPageEffect();
  new BasisSelect();

  new BasisHamburgerBtn({
    btn: '.sg-c-hamburger-btn'
  });
  new BasisDrawer({
    drawer: '.sg-c-drawer',
    toggle: '.sg-c-drawer__toggle',
    submenu: '.sg-c-drawer__submenu'
  });
  new BasisNavbar({
    item: '.sg-c-navbar__item',
    submenu: '.sg-c-navbar__submenu',
    subitem: '.sg-c-navbar__subitem'
  });
  new BasisPageEffect({
    pageEffect: '.sg-c-page-effect',
    duration: 200
  });
  new BasisSelect({
    select: '.sg-c-select',
    label: '.sg-c-select__label'
  });

}());
