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
            addCustomEvent(element, 'clickHamburgerBtn');

            _this2._click(event);
          }, false);
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
          hamburgerBtn.setAttribute('aria-expanded', 'true');
        } else {
          hamburgerBtn.setAttribute('aria-expanded', 'false');
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
          (function () {
            var submenus = drawer.querySelectorAll("".concat(_this2.args.submenu, "[aria-hidden]"));

            _this2._forEachHtmlNodes(submenus, function (submenu) {
              var random = Math.floor(Math.random() * (9999999 - 1000000) + 1000000);
              var time = new Date().getTime();
              var id = "drawer-".concat(time).concat(random);
              var toggleBtn = submenu.parentNode.querySelector(_this2.args.toggle);

              if (!!submenu && !!toggleBtn) {
                submenu.setAttribute('id', id);
                toggleBtn.setAttribute('aria-controls', "".concat(id));
              }
            });
          })();

          var container = drawer.parentNode;
          var btn = document.getElementById(drawer.getAttribute('aria-labelledby'));
          var toggleBtns = drawer.querySelectorAll("".concat(_this2.args.toggle));
          var subMenus = drawer.querySelectorAll(_this2.args.submenu);

          var closeDrawer = function closeDrawer() {
            _this2._close(btn);

            _this2._hidden(drawer);

            _this2._forEachHtmlNodes(toggleBtns, function (element) {
              return _this2._close(element);
            });

            _this2._forEachHtmlNodes(subMenus, function (element) {
              return _this2._hidden(element);
            });
          };

          var closeDrawerOnResize = function closeDrawerOnResize() {
            if (window.innerWidth !== _this2.windowWidth) {
              _this2._hidden(drawer);

              _this2._close(btn);

              _this2.windowWidth = window.innerWidth;
            }
          };

          var toggleMenu = function toggleMenu(event) {
            event.preventDefault();
            event.stopPropagation();
            var toggleBtn = event.currentTarget;
            var menu = document.getElementById(toggleBtn.getAttribute('aria-controls'));

            if ('false' == toggleBtn.getAttribute('aria-expanded')) {
              _this2._open(toggleBtn);

              _this2._show(menu);
            } else {
              _this2._close(toggleBtn);

              _this2._hidden(menu);

              _this2._forEachHtmlNodes(menu.querySelectorAll(_this2.args.toggle), function (element) {
                return _this2._close(element);
              });

              _this2._forEachHtmlNodes(menu.querySelectorAll(_this2.args.submenu), function (element) {
                return _this2._hidden(element);
              });
            }
          };

          drawer.addEventListener('click', function (event) {
            return event.stopPropagation();
          }, false);
          btn.addEventListener('clickHamburgerBtn', function () {
            if ('false' === btn.getAttribute('aria-expanded')) {
              drawer.setAttribute('aria-hidden', 'false');
            } else {
              drawer.setAttribute('aria-hidden', 'true');
            }
          }, false);
          window.addEventListener('resize', function () {
            addCustomEvent(drawer, 'resizeDrawer');
            closeDrawerOnResize();
          }, false);

          if (!!container) {
            container.addEventListener('click', function () {
              addCustomEvent(container, 'clickDrawerContainer');
              closeDrawer();
            }, false);
          }

          var drawerItemLinks = drawer.querySelectorAll("".concat(_this2.args.item, " > a"));

          _this2._forEachHtmlNodes(drawerItemLinks, function (element) {
            return element.addEventListener('click', closeDrawer, false);
          });

          var drawerSubItemLinks = drawer.querySelectorAll("".concat(_this2.args.subitem, " > a"));

          _this2._forEachHtmlNodes(drawerSubItemLinks, function (element) {
            return element.addEventListener('click', closeDrawer, false);
          });

          _this2._forEachHtmlNodes(toggleBtns, function (element) {
            return element.addEventListener('click', toggleMenu, false);
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
      key: "_forEachHtmlNodes",
      value: function _forEachHtmlNodes(htmlNodes, callback) {
        if (0 < htmlNodes.length) {
          [].forEach.call(htmlNodes, function (htmlNode) {
            return callback(htmlNode);
          });
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
      this.args.btn = !!this.args.btn ? this.args.btn : '.c-hamburger-btn';
      window.addEventListener('DOMContentLoaded', function () {
        return _this._DOMContentLoaded();
      }, false);
    }

    _createClass(BasisDrawerCloseZone, [{
      key: "_DOMContentLoaded",
      value: function _DOMContentLoaded() {
        var _this2 = this;

        var hamburgerBtns = document.querySelectorAll(this.args.btn);

        this._forEachHtmlNodes(hamburgerBtns, function (element) {
          element.addEventListener('clickHamburgerBtn', function () {
            _this2._clickHamburgerBtn(element);
          }, false);
          var drawerId = element.getAttribute('aria-controls');

          var drawer = _this2._getDrawer(drawerId);

          if (null !== drawer) {
            drawer.addEventListener('resizeDrawer', function () {
              _this2._removeCloseZone(drawerId);
            }, false);
          }

          drawer.parentNode.addEventListener('clickDrawerContainer', function () {
            _this2._removeCloseZone(drawerId);
          }, false);
        });
      }
    }, {
      key: "_clickHamburgerBtn",
      value: function _clickHamburgerBtn(hamburgerBtn) {
        if ('false' === hamburgerBtn.getAttribute('aria-expanded')) {
          this._createCloseZone(hamburgerBtn.getAttribute('aria-controls'));
        } else {
          this._removeCloseZone(hamburgerBtn.getAttribute('aria-controls'));
        }
      }
    }, {
      key: "_createCloseZone",
      value: function _createCloseZone(drawerId) {
        var drawer = this._getDrawer(drawerId);

        if (!drawer) {
          return;
        }

        if (null !== this._getCloseZone(drawerId)) {
          return;
        }

        var closeZone = document.createElement('div');
        closeZone.classList.add('c-drawer-close-zone');

        if (drawer.classList.contains('c-drawer--fixed')) {
          closeZone.classList.add('c-drawer-close-zone--fixed');
        }

        closeZone.setAttribute('id', this._generateCloseZoneId(drawerId));
        drawer.parentNode.appendChild(closeZone);
      }
    }, {
      key: "_removeCloseZone",
      value: function _removeCloseZone(drawerId) {
        var closeZone = this._getCloseZone(drawerId);

        if (null === closeZone) {
          return;
        }

        closeZone.parentNode.removeChild(closeZone);
      }
    }, {
      key: "_generateCloseZoneId",
      value: function _generateCloseZoneId(drawerId) {
        return "".concat(drawerId, "-close-zone");
      }
    }, {
      key: "_getDrawer",
      value: function _getDrawer(drawerId) {
        return document.getElementById(drawerId);
      }
    }, {
      key: "_getCloseZone",
      value: function _getCloseZone(drawerId) {
        var closeZoneId = this._generateCloseZoneId(drawerId);

        var closeZone = document.getElementById(closeZoneId);
        return closeZone;
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
