(function ($) {
'use strict';

$ = $ && $.hasOwnProperty('default') ? $['default'] : $;

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

'use strict';

var BasisHamburgerBtn$1 = function () {
  function BasisHamburgerBtn() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, BasisHamburgerBtn);

    this.args = $.extend({
      btn: '.c-hamburger-btn'
    }, args);
    this.hamburgerBtn = $(this.args.btn);
    this.setListener();
  }

  createClass(BasisHamburgerBtn, [{
    key: 'setListener',
    value: function setListener() {
      this.hamburgerBtn.each(function (i, e) {
        var hamburgerBtn = $(e);
        var target = $('#' + hamburgerBtn.attr('aria-controls'));

        hamburgerBtn.click(function (event) {
          event.preventDefault();
          event.stopPropagation();

          if ('false' === hamburgerBtn.attr('aria-expanded')) {
            hamburgerBtn.attr('aria-expanded', 'true');
            target.attr('aria-hidden', 'false');
          } else {
            hamburgerBtn.attr('aria-expanded', 'false');
            target.attr('aria-hidden', 'true');
          }
        });
      });
    }
  }]);
  return BasisHamburgerBtn;
}();

'use strict';

var BasisDrawer$1 = function () {
  function BasisDrawer() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, BasisDrawer);

    this.args = $.extend({
      drawer: '.c-drawer',
      toggle: '.c-drawer__toggle',
      submenu: '.c-drawer__submenu'
    }, args);
    this.drawer = $(this.args.drawer);
    this.windowWidth = $(window).width();
    this.setListener();
  }

  createClass(BasisDrawer, [{
    key: 'setListener',
    value: function setListener() {
      var _this = this;

      this.drawer.each(function (i, e) {
        var drawer = $(e);
        _this.setIdForSubmenu(drawer);

        var container = drawer.parent();
        var btn = $('#' + drawer.attr('aria-labelledby'));
        var toggleBtns = drawer.find(_this.args.toggle + '[aria-controls]');

        container.on('click', function (event) {
          _this.close(btn);
          _this.hidden(drawer);
          _this.close(drawer.find(_this.args.toggle));
          _this.hidden(drawer.find(_this.args.submenu));
        });

        drawer.on('click', function (event) {
          event.stopPropagation();
        });

        $(window).on('resize', function (event) {
          if ($(window).width() !== _this.windowWidth) {
            _this.hidden(drawer);
            _this.close(btn);
            _this.windowWidth = $(window).width();
          }
        });

        toggleBtns.each(function (i, e) {
          var toggleBtn = $(e);
          var submenu = $('#' + toggleBtn.attr('aria-controls'));
          toggleBtn.on('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            _this.toggleMenu(toggleBtn);
          });
        });
      });
    }
  }, {
    key: 'toggleMenu',
    value: function toggleMenu(btn) {
      var menu = $('#' + btn.attr('aria-controls'));
      if ('false' == btn.attr('aria-expanded')) {
        this.open(btn);
        this.show(menu);
      } else {
        this.close(btn);
        this.hidden(menu);
        this.close(menu.find(this.args.toggle));
        this.hidden(menu.find(this.args.submenu));
      }
    }
  }, {
    key: 'open',
    value: function open(target) {
      target.attr('aria-expanded', 'true');
    }
  }, {
    key: 'close',
    value: function close(target) {
      target.attr('aria-expanded', 'false');
    }
  }, {
    key: 'show',
    value: function show(target) {
      target.attr('aria-hidden', 'false');
    }
  }, {
    key: 'hidden',
    value: function hidden(target) {
      target.attr('aria-hidden', 'true');
    }
  }, {
    key: 'setIdForSubmenu',
    value: function setIdForSubmenu(drawer) {
      var _this2 = this;

      drawer.find(this.args.submenu + '[aria-hidden]').each(function (i, e) {
        var random = Math.floor(Math.random() * (9999999 - 1000000) + 1000000);
        var time = new Date().getTime();
        var id = 'drawer-' + time + random;
        var submenu = $(e);
        var toggleBtn = submenu.siblings(_this2.args.toggle);
        if (submenu.length && toggleBtn.length) {
          submenu.attr('id', id);
          toggleBtn.attr('aria-controls', '' + id);
        }
      });
    }
  }]);
  return BasisDrawer;
}();

'use strict';

var BasisNavbar$1 = function () {
  function BasisNavbar() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, BasisNavbar);

    this.args = $.extend({
      item: '.c-navbar__item',
      submenu: '.c-navbar__submenu',
      subitem: '.c-navbar__subitem'
    }, args);
    this.items = $(this.args.item + '[aria-haspopup="true"], ' + this.args.subitem + '[aria-haspopup="true"]');
    this.setListener();
  }

  createClass(BasisNavbar, [{
    key: 'setListener',
    value: function setListener() {
      var _this = this;

      this.items.each(function (i, e) {
        var item = $(e);
        item.on('mouseover focusin', function (event) {
          _this.show(item.children(_this.args.submenu));
        });

        item.on('mouseleave', function (event) {
          _this.hidden(item.children(_this.args.submenu));
        });
      });

      $(this.args.item).each(function (i, e) {
        var item = $(e);
        item.on('focusin', function (event) {
          _this.hidden(item.siblings(_this.args.item).children(_this.args.submenu));
        });
      });
    }
  }, {
    key: 'show',
    value: function show(submenu) {
      submenu.attr('aria-hidden', 'false');
    }
  }, {
    key: 'hidden',
    value: function hidden(submenu) {
      submenu.attr('aria-hidden', 'true');
    }
  }]);
  return BasisNavbar;
}();

'use strict';

var BasisPageEffect$1 = function () {
  function BasisPageEffect() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, BasisPageEffect);

    this.args = $.extend({
      pageEffect: '.c-page-effect',
      duration: 200
    }, args);
    this.container = $(this.args.pageEffect);
    this.pageOutObject = $('[data-page-effect-link="true"], a[href]:not([target="_blank"], [href^="#"], [href*="javascript"], [href*=".jpg"], [href*=".jpeg"], [href*=".gif"], [href*=".png"], [href*=".mov"], [href*=".swf"], [href*=".mp4"], [href*=".flv"], [href*=".avi"], [href*=".mp3"], [href*=".pdf"], [href*=".zip"], [href^="mailto:"], [data-page-effect-link="false"])');
    this.setListener();
  }

  createClass(BasisPageEffect, [{
    key: 'setListener',
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
    key: 'moveLocation',
    value: function moveLocation(url) {
      setTimeout(function () {
        location.href = url;
      }, this.args['duration']);
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.container.attr('aria-hidden', 'true').attr('data-page-effect', 'fadein');
    }
  }, {
    key: 'show',
    value: function show() {
      this.container.attr('aria-hidden', 'false').attr('data-page-effect', 'fadeout');
    }
  }]);
  return BasisPageEffect;
}();

'use strict';

var BasisSelect$1 = function BasisSelect() {
  var _this = this;

  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  classCallCheck(this, BasisSelect);

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

'use strict';

new BasisHamburgerBtn$1();

new BasisDrawer$1();

new BasisNavbar$1();

new BasisPageEffect$1();

new BasisSelect$1();

'use strict';

new BasisHamburgerBtn$1({
  btn: '.sg-c-hamburger-btn'
});

new BasisDrawer$1({
  drawer: '.sg-c-drawer',
  toggle: '.sg-c-drawer__toggle',
  submenu: '.sg-c-drawer__submenu'
});

new BasisNavbar$1({
  item: '.sg-c-navbar__item',
  submenu: '.sg-c-navbar__submenu',
  subitem: '.sg-c-navbar__subitem'
});

new BasisPageEffect$1({
  pageEffect: '.sg-c-page-effect',
  duration: 200
});

new BasisSelect$1({
  select: '.sg-c-select',
  label: '.sg-c-select__label'
});

}(jQuery));
