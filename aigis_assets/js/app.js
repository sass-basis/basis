(function ($) {
  'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;

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
      this.args.btn = !!this.args.btn ? this.args.btn : '.c-hamburger-btn';
      window.addEventListener('DOMContentLoaded', function () {
        return _this._DOMContentLoaded();
      }, false);
    }

    _createClass(BasisHamburgerBtn, [{
      key: "_DOMContentLoaded",
      value: function _DOMContentLoaded() {
        var _this2 = this;

        var hamburgerBtns = document.querySelectorAll(this.args.btn);

        this._forEachHtmlNodes(hamburgerBtns, function (element) {
          element.addEventListener('click', function (event) {
            return _this2._click(event);
          }, false);
          element.addEventListener('openHamburgerBtn', function (event) {
            return BasisHamburgerBtn.open(element);
          }, false);
          element.addEventListener('closeHamburgerBtn', function (event) {
            return BasisHamburgerBtn.close(element);
          }, false);
          var drawer = document.getElementById(element.getAttribute('aria-controls'));

          if (null !== drawer) {
            drawer.addEventListener('closeDrawer', function (event) {
              return BasisHamburgerBtn.close(element);
            }, false);
            drawer.addEventListener('openDrawer', function (event) {
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
    }, {
      key: "_forEachHtmlNodes",
      value: function _forEachHtmlNodes(htmlNodes, callback) {
        if (0 < htmlNodes.length) {
          [].forEach.call(htmlNodes, function (htmlNode) {
            return callback(htmlNode);
          });
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
      this.args.drawer = !!this.args.drawer ? this.args.drawer : '.c-drawer';
      this.args.toggle = !!this.args.toggle ? this.args.toggle : '.c-drawer__toggle';
      this.args.submenu = !!this.args.submenu ? this.args.submenu : '.c-drawer__submenu';
      this.args.item = !!this.args.item ? this.args.item : '.c-drawer__item';
      this.args.subitem = !!this.args.subitem ? this.args.subitem : '.c-drawer__subitem';
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

        this._forEachHtmlNodes(drawers, function (drawer) {
          _this2._setSubmenusId(drawer);

          window.addEventListener('resize', function (event) {
            return _this2._resizeWindow(drawer);
          }, false);
          drawer.addEventListener('closeDrawer', function (event) {
            return _this2._closeAllSubmenus(drawer);
          }, false);
          drawer.addEventListener('click', function (event) {
            return event.stopPropagation();
          }, false);
          var btn = document.getElementById(drawer.getAttribute('aria-labelledby'));

          if (!!btn) {
            btn.addEventListener('openHamburgerBtn', function (event) {
              return BasisDrawer.open(drawer);
            }, false);
            btn.addEventListener('closeHamburgerBtn', function (event) {
              return BasisDrawer.close(drawer);
            }, false);
          }

          var drawerItemLinks = drawer.querySelectorAll("".concat(_this2.args.item, " > a"));

          _this2._forEachHtmlNodes(drawerItemLinks, function (element) {
            element.addEventListener('click', function (event) {
              return addCustomEvent(element, 'clickDrawerItemLink');
            }, false);
          });

          var drawerSubItemLinks = drawer.querySelectorAll("".concat(_this2.args.subitem, " > a"));

          _this2._forEachHtmlNodes(drawerSubItemLinks, function (element) {
            element.addEventListener('click', function (event) {
              return addCustomEvent(element, 'clickDrawerSubItemLink');
            }, false);
          });

          var toggleBtns = drawer.querySelectorAll("".concat(_this2.args.toggle));

          _this2._forEachHtmlNodes(toggleBtns, function (element) {
            element.addEventListener('click', function (event) {
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

        this._forEachHtmlNodes(submenus, function (submenu) {
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

        this._forEachHtmlNodes(submenus, function (element) {
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

          this._forEachHtmlNodes(menu.querySelectorAll(this.args.submenu), function (element) {
            return _this5._closeSubmenu(element);
          });
        }
      }
    }, {
      key: "_forEachHtmlNodes",
      value: function _forEachHtmlNodes(htmlNodes, callback) {
        if (0 < htmlNodes.length) {
          [].forEach.call(htmlNodes, function (htmlNode) {
            return callback(htmlNode);
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
          closeZone.addEventListener('clickDrawerCloseZone', function (event) {
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
      this.args.drawer = !!this.args.drawer ? this.args.drawer : '.c-drawer';
      window.addEventListener('DOMContentLoaded', function () {
        return _this._DOMContentLoaded();
      }, false);
    }

    _createClass(BasisDrawerCloseZone, [{
      key: "_DOMContentLoaded",
      value: function _DOMContentLoaded() {
        var drawers = document.querySelectorAll(this.args.drawer);

        this._forEachHtmlNodes(drawers, function (drawer) {
          drawer.addEventListener('openDrawer', function (event) {
            BasisDrawerCloseZone.createCloseZone(drawer);
          }, false);
          drawer.addEventListener('closeDrawer', function (event) {
            BasisDrawerCloseZone.removeCloseZone(drawer);
          }, false);
        });
      }
    }, {
      key: "_forEachHtmlNodes",
      value: function _forEachHtmlNodes(htmlNodes, callback) {
        if (0 < htmlNodes.length) {
          [].forEach.call(htmlNodes, function (htmlNode) {
            return callback(htmlNode);
          });
        }
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
          addCustomEvent(closeZone, 'clickDrawerCloseZone');
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
      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, BasisNavbar);

      this.args = $.extend({
        item: '.c-navbar__item',
        submenu: '.c-navbar__submenu',
        subitem: '.c-navbar__subitem'
      }, args);
      this.items = $("".concat(this.args.item, "[aria-haspopup=\"true\"], ").concat(this.args.subitem, "[aria-haspopup=\"true\"]"));
      this.setListener();
    }

    _createClass(BasisNavbar, [{
      key: "setListener",
      value: function setListener() {
        var _this = this;

        this.items.each(function (i, e) {
          var item = $(e);
          item.on('mouseover focusin', function (event) {
            _this.show(item.children(_this.args.submenu));
          });
          item.on('mouseleave blur', function (event) {
            _this.hidden(item.children(_this.args.submenu));
          });
        });
        $(this.args.item).each(function (i, e) {
          var item = $(e);
          item.on('focusin', function (event) {
            _this.hidden(item.siblings(_this.args.item).find(_this.args.submenu));
          });
          item.find(_this.args.subitem).each(function (i, e) {
            var subitem = $(e);
            subitem.on('focusin', function (event) {
              _this.hidden(subitem.siblings(_this.args.subitem).find(_this.args.submenu));
            });
          });
        });
      }
    }, {
      key: "show",
      value: function show(submenu) {
        submenu.attr('aria-hidden', 'false');
      }
    }, {
      key: "hidden",
      value: function hidden(submenu) {
        submenu.attr('aria-hidden', 'true');
      }
    }]);

    return BasisNavbar;
  }();

  var BasisPageEffect =
  /*#__PURE__*/
  function () {
    function BasisPageEffect() {
      var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, BasisPageEffect);

      this.args = $.extend({
        pageEffect: '.c-page-effect',
        duration: 200
      }, args);
      this.container = $(this.args.pageEffect);
      this.pageOutObject = $('[data-page-effect-link="true"], a[href]:not([target="_blank"], [href^="#"], [href*="javascript"], [href*=".jpg"], [href*=".jpeg"], [href*=".gif"], [href*=".png"], [href*=".mov"], [href*=".swf"], [href*=".mp4"], [href*=".flv"], [href*=".avi"], [href*=".mp3"], [href*=".pdf"], [href*=".zip"], [href^="mailto:"], [data-page-effect-link="false"])');
      this.setListener();
    }

    _createClass(BasisPageEffect, [{
      key: "setListener",
      value: function setListener() {
        var _this = this;

        $(window).on('load', function (event) {
          _this.hide();
        });
        this.pageOutObject.each(function (i, e) {
          var link = $(e);
          link.on('click', function (event) {
            if (event.shiftKey || event.ctrlKey || event.metaKey) {
              return;
            }

            if ('true' !== link.attr('data-page-effect-link')) {
              return;
            }

            event.preventDefault();

            _this.show();

            var url = link.attr('href');

            _this.moveLocation(url);
          });
        });
      }
    }, {
      key: "moveLocation",
      value: function moveLocation(url) {
        setTimeout(function () {
          location.href = url;
        }, this.args['duration']);
      }
    }, {
      key: "hide",
      value: function hide() {
        this.container.attr('aria-hidden', 'true').attr('data-page-effect', 'fadein');
      }
    }, {
      key: "show",
      value: function show() {
        this.container.attr('aria-hidden', 'false').attr('data-page-effect', 'fadeout');
      }
    }]);

    return BasisPageEffect;
  }();

  var BasisSelect = function BasisSelect() {
    var _this = this;

    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, BasisSelect);

    this.args = $.extend({
      select: '.c-select',
      label: '.c-select__label'
    }, args);
    this.select = $(this.args.select);
    this.select.each(function (i, e) {
      var selectWrapper = $(e);
      var select = selectWrapper.find('select');
      var label = selectWrapper.find(_this.args.label);
      label.text(select.children('option:selected').text());
      select.on('change', function (event) {
        label.text($(select[0].selectedOptions).text());
      });
      select.on('focusin', function (event) {
        selectWrapper.attr('aria-selected', 'true');
      });
      select.on('focusout', function (event) {
        selectWrapper.attr('aria-selected', 'false');
      });
    });
  };

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

}(jQuery));
