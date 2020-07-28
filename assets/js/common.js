'use strict';
/************************
 * Common vars, functions
 ************************/

var d = document; //document short cut

var debug = true; // for logger

/*-------------------------------------------------
 * logger
 *-------------------------------------------------*/

function logger(str, param) {
  if (debug) {
    if (param !== undefined) {
      console.log(str, param);
    } else {
      console.log(str);
    }
  }
}
/*-------------------------------------------------
 * add Event
 *-------------------------------------------------*/


function addEvent(elm, listener, fn) {
  try {
    // IE
    elm.addEventListener(listener, fn, false);
  } catch (e) {
    elm.attachEvent('on' + listener, function () {
      fn.apply(elm, arguments);
    });
  }
}
/*-------------------------------------------------
 * remove Event
 *-------------------------------------------------*/


function removeEvent(elm, listener, fnname) {
  try {
    // IE
    elm.removeEventListener(listener, fnname, false);
  } catch (e) {
    elm.detachEvent('on' + listener, fnname);
  }
} // Mini polyfill for Array.from without optional arguments (mapFunction [second argument], thisArg [third argument]) (https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from)


if (typeof Array.from !== 'function') {
  Array.from = function (arrLikeObj) {
    return Array.prototype.slice.call(arrLikeObj, 0);
  };
}
/************************
 * Lazyload
 ************************/


function Lazyload(targets, options) {
  logger('Lazyload');
  /* eslint-disable */
  // Polyfills for Intersection Observer and Array.from

  function loadPolyfills() {
    'use strict';

    var isIntersectionObserverSupported = ('IntersectionObserver' in window); // Intersection Observer未サポート時にPolyfillを適用

    if (!isIntersectionObserverSupported) {
      IntersectionObserverPolyfill();
    } /// minified version of the Intersection Observer polyfill from: https://github.com/w3c/IntersectionObserver/tree/master/polyfill


    function IntersectionObserverPolyfill() {
      (function (h, f) {
        function m(a) {
          this.time = a.time;
          this.target = a.target;
          this.rootBounds = a.rootBounds;
          this.boundingClientRect = a.boundingClientRect;
          this.intersectionRect = a.intersectionRect || l();
          this.isIntersecting = !!a.intersectionRect;
          a = this.boundingClientRect;
          a = a.width * a.height;
          var b = this.intersectionRect;
          b = b.width * b.height;
          this.intersectionRatio = a ? b / a : this.isIntersecting ? 1 : 0;
        }

        function d(a, b) {
          var c = b || {};
          if ('function' != typeof a) throw Error('callback must be a function');
          if (c.root && 1 != c.root.nodeType) throw Error('root must be an Element');
          this._checkForIntersections = u(this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT);
          this._callback = a;
          this._observationTargets = [];
          this._queuedEntries = [];
          this._rootMarginValues = this._parseRootMargin(c.rootMargin);
          this.thresholds = this._initThresholds(c.threshold);
          this.root = c.root || null;
          this.rootMargin = this._rootMarginValues.map(function (a) {
            return a.value + a.unit;
          }).join(' ');
        }

        function u(a, b) {
          var c = null;
          return function () {
            c || (c = setTimeout(function () {
              a();
              c = null;
            }, b));
          };
        }

        function n(a, b, c, e) {
          'function' == typeof a.addEventListener ? a.addEventListener(b, c, e || !1) : 'function' == typeof a.attachEvent && a.attachEvent('on' + b, c);
        }

        function r(a, b, c, e) {
          'function' == typeof a.removeEventListener ? a.removeEventListener(b, c, e || !1) : 'function' == typeof a.detatchEvent && a.detatchEvent('on' + b, c);
        }

        function p(a) {
          try {
            var b = a.getBoundingClientRect();
          } catch (c) {}

          if (!b) return l();
          b.width && b.height || (b = {
            top: b.top,
            right: b.right,
            bottom: b.bottom,
            left: b.left,
            width: b.right - b.left,
            height: b.bottom - b.top
          });
          return b;
        }

        function l() {
          return {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: 0,
            height: 0
          };
        }

        function t(a, b) {
          for (var c = b; c;) {
            if (c == a) return !0;
            c = q(c);
          }

          return !1;
        }

        function q(a) {
          return (a = a.parentNode) && 11 == a.nodeType && a.host ? a.host : a;
        }

        if ('IntersectionObserver' in h && 'IntersectionObserverEntry' in h && 'intersectionRatio' in h.IntersectionObserverEntry.prototype) 'isIntersecting' in h.IntersectionObserverEntry.prototype || Object.defineProperty(h.IntersectionObserverEntry.prototype, 'isIntersecting', {
          get: function get() {
            return 0 < this.intersectionRatio;
          }
        });else {
          var k = [];
          d.prototype.THROTTLE_TIMEOUT = 100;
          d.prototype.POLL_INTERVAL = null;
          d.prototype.USE_MUTATION_OBSERVER = !0;

          d.prototype.observe = function (a) {
            if (!this._observationTargets.some(function (b) {
              return b.element == a;
            })) {
              if (!a || 1 != a.nodeType) throw Error('target must be an Element');

              this._registerInstance();

              this._observationTargets.push({
                element: a,
                entry: null
              });

              this._monitorIntersections();

              this._checkForIntersections();
            }
          };

          d.prototype.unobserve = function (a) {
            this._observationTargets = this._observationTargets.filter(function (b) {
              return b.element != a;
            });
            this._observationTargets.length || (this._unmonitorIntersections(), this._unregisterInstance());
          };

          d.prototype.disconnect = function () {
            this._observationTargets = [];

            this._unmonitorIntersections();

            this._unregisterInstance();
          };

          d.prototype.takeRecords = function () {
            var a = this._queuedEntries.slice();

            this._queuedEntries = [];
            return a;
          };

          d.prototype._initThresholds = function (a) {
            a = a || [0];
            Array.isArray(a) || (a = [a]);
            return a.sort().filter(function (a, c, e) {
              if ('number' != typeof a || isNaN(a) || 0 > a || 1 < a) throw Error('threshold must be a number between 0 and 1 inclusively');
              return a !== e[c - 1];
            });
          };

          d.prototype._parseRootMargin = function (a) {
            a = (a || '0px').split(/\s+/).map(function (a) {
              a = /^(-?\d*\.?\d+)(px|%)$/.exec(a);
              if (!a) throw Error('rootMargin must be specified in pixels or percent');
              return {
                value: parseFloat(a[1]),
                unit: a[2]
              };
            });
            a[1] = a[1] || a[0];
            a[2] = a[2] || a[0];
            a[3] = a[3] || a[1];
            return a;
          };

          d.prototype._monitorIntersections = function () {
            this._monitoringIntersections || (this._monitoringIntersections = !0, this.POLL_INTERVAL ? this._monitoringInterval = setInterval(this._checkForIntersections, this.POLL_INTERVAL) : (n(h, 'resize', this._checkForIntersections, !0), n(f, 'scroll', this._checkForIntersections, !0), this.USE_MUTATION_OBSERVER && 'MutationObserver' in h && (this._domObserver = new MutationObserver(this._checkForIntersections), this._domObserver.observe(f, {
              attributes: !0,
              childList: !0,
              characterData: !0,
              subtree: !0
            }))));
          };

          d.prototype._unmonitorIntersections = function () {
            this._monitoringIntersections && (this._monitoringIntersections = !1, clearInterval(this._monitoringInterval), this._monitoringInterval = null, r(h, 'resize', this._checkForIntersections, !0), r(f, 'scroll', this._checkForIntersections, !0), this._domObserver && (this._domObserver.disconnect(), this._domObserver = null));
          };

          d.prototype._checkForIntersections = function () {
            var a = this._rootIsInDom(),
                b = a ? this._getRootRect() : l();

            this._observationTargets.forEach(function (c) {
              var e = c.element,
                  d = p(e),
                  g = this._rootContainsTarget(e),
                  f = c.entry,
                  k = a && g && this._computeTargetAndRootIntersection(e, b);

              c = c.entry = new m({
                time: h.performance && performance.now && performance.now(),
                target: e,
                boundingClientRect: d,
                rootBounds: b,
                intersectionRect: k
              });
              f ? a && g ? this._hasCrossedThreshold(f, c) && this._queuedEntries.push(c) : f && f.isIntersecting && this._queuedEntries.push(c) : this._queuedEntries.push(c);
            }, this);

            this._queuedEntries.length && this._callback(this.takeRecords(), this);
          };

          d.prototype._computeTargetAndRootIntersection = function (a, b) {
            if ('none' != h.getComputedStyle(a).display) {
              for (var c = p(a), e = q(a), d = !1; !d;) {
                var g = null,
                    k = 1 == e.nodeType ? h.getComputedStyle(e) : {};
                if ('none' == k.display) return;
                e == this.root || e == f ? (d = !0, g = b) : e != f.body && e != f.documentElement && 'visible' != k.overflow && (g = p(e));

                if (g) {
                  k = Math.max(g.top, c.top);
                  var l = Math.min(g.bottom, c.bottom),
                      m = Math.max(g.left, c.left);
                  c = Math.min(g.right, c.right);
                  g = c - m;
                  var n = l - k;
                  c = 0 <= g && 0 <= n && {
                    top: k,
                    bottom: l,
                    left: m,
                    right: c,
                    width: g,
                    height: n
                  };
                  if (!c) break;
                }

                e = q(e);
              }

              return c;
            }
          };

          d.prototype._getRootRect = function () {
            if (this.root) var a = p(this.root);else {
              a = f.documentElement;
              var b = f.body;
              a = {
                top: 0,
                left: 0,
                right: a.clientWidth || b.clientWidth,
                width: a.clientWidth || b.clientWidth,
                bottom: a.clientHeight || b.clientHeight,
                height: a.clientHeight || b.clientHeight
              };
            }
            return this._expandRectByRootMargin(a);
          };

          d.prototype._expandRectByRootMargin = function (a) {
            var b = this._rootMarginValues.map(function (b, d) {
              return 'px' == b.unit ? b.value : b.value * (d % 2 ? a.width : a.height) / 100;
            });

            b = {
              top: a.top - b[0],
              right: a.right + b[1],
              bottom: a.bottom + b[2],
              left: a.left - b[3]
            };
            b.width = b.right - b.left;
            b.height = b.bottom - b.top;
            return b;
          };

          d.prototype._hasCrossedThreshold = function (a, b) {
            var c = a && a.isIntersecting ? a.intersectionRatio || 0 : -1,
                d = b.isIntersecting ? b.intersectionRatio || 0 : -1;
            if (c !== d) for (var f = 0; f < this.thresholds.length; f++) {
              var g = this.thresholds[f];
              if (g == c || g == d || g < c !== g < d) return !0;
            }
          };

          d.prototype._rootIsInDom = function () {
            return !this.root || t(f, this.root);
          };

          d.prototype._rootContainsTarget = function (a) {
            return t(this.root || f, a);
          };

          d.prototype._registerInstance = function () {
            0 > k.indexOf(this) && k.push(this);
          };

          d.prototype._unregisterInstance = function () {
            var a = k.indexOf(this);
            -1 != a && k.splice(a, 1);
          };

          h.IntersectionObserver = d;
          h.IntersectionObserverEntry = m;
        }
      })(window, document);
    }
  }
  /* eslint-enable */


  loadPolyfills();

  function callback(entries, object) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var img = entry.target;
      loading(img);
      object.unobserve(img);
    });
  }

  function loading(img) {
    var src_val = img.getAttribute(options.img_path);

    if (src_val) {
      if (img.parentNode !== undefined && img.parentNode.classList.contains('iframe-box')) {
        img.parentNode.classList.add('_loading');
        setTimeout(function () {
          img.src = src_val;
        }, 3000);
      } else {
        img.src = src_val;
      }

      img.onload = function () {
        this.removeAttribute(options.img_path);

        if (this.parentNode !== undefined && this.parentNode.classList.contains('iframe-box')) {
          this.parentNode.classList.add('-onload');
          this.parentNode.classList.remove('_loading');
        }
      };
    }
  }

  var observer = new IntersectionObserver(callback, options);
  targets.forEach(function (img) {
    observer.observe(img);
  });
}
/************************
 * SmoothScroll
 ************************/


function SmoothScroll(event) {
  // TODO header fixed offset
  event.preventDefault();
  var a = this;
  var e = d.getElementById(a.href.replace(/.*#/, ''));

  if (e) {
    logger('SmoothScroll:', e);
  } else {
    return;
  } //Move point


  var end = e.offsetTop;
  var docHeight = d.documentElement.scrollHeight;
  var winHeight = window.innerHeight || d.documentElement.clientHeight;

  if (docHeight - winHeight < end) {
    end = docHeight - winHeight;
  } //Current Point


  var start = window.pageYOffset || d.documentElement.scrollTop || d.body.scrollTop || 0;
  var flag = end < start ? 'up' : 'down';

  function scrollMe(start, end, flag) {
    setTimeout(function () {
      if (flag == 'up' && start >= end) {
        start = start - (start - end) / 20 - 1;
        window.scrollTo(0, start);
        scrollMe(start, end, flag);
      } else if (flag == 'down' && start <= end) {
        start = start + (end - start) / 20 + 1;
        window.scrollTo(0, start);
        scrollMe(start, end, flag);
      } else {
        scrollTo(0, end);
      }

      return;
    }, 10);
  }

  scrollMe(start, end, flag);
}
/************************
 * TabAccSet
 ************************/


var tabAccEnum = {
  parent: 'tabacc',
  tabs: 'tabs',
  tab: 'title',
  contents: 'contents',
  content: 'content',
  modifiers: {
    pctab: '-pc-tab',
    pcacc: '-pc-accordion',
    sptab: '-sp-tab',
    spacc: '-sp-accordion'
  }
};

var TabAccSet = function TabAccSet(tabacc) {
  logger('TabAccSet:', tabacc);

  function selectTab(e) {
    var tab = this;
    e.preventDefault(); // get parents

    var tao = {
      parent: null,
      tabs: null,
      active: null,
      contents: null,
      select: function select(tab) {
        var getTabAcc = function getTabAcc(elem) {
          if (elem.parentNode && elem.parentNode.classList.contains(tabAccEnum.parent) === false) {
            logger(elem.parentNode);
            return getTabAcc(elem.parentNode);
          } else {
            logger(elem.parentNode, elem.parentNode.classList.contains(tabAccEnum.parent));
            return elem.parentNode;
          }
        };

        this.parent = getTabAcc(tab);

        if (tao.parent === undefined) {
          console.log('[error] tab parent node not found:', tab);
          return false;
        }

        this.tabs = this.parent.querySelectorAll('.' + tabAccEnum.tab);

        if (this.tabs !== null) {
          logger('tabs children:', this.tabs);

          for (var i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i] === tab) {
              var href = tab.getAttribute('href');

              if (href !== null) {
                this.active = tab.getAttribute('href').replace('#', '');
              } else {
                console.log('[error] tab has not href:', this.tabs[i]);
                return;
              } // accordion toggle


              if (this.tabs[i].classList.contains('-acc') && this.tabs[i].classList.contains('-open')) {
                this.tabs[i].classList.remove('-open');
              } else {
                this.tabs[i].classList.add('-open');
              }

              this.tabs[i].classList.add('-active');
              logger('tab active:', {
                tab: this.tabs[i],
                target: this.active
              });
            } else {
              this.tabs[i].classList.remove('-active');
              logger('tab not-active:', this.tabs[i]);
            }
          }
        }

        this.contents = this.parent.querySelectorAll('.' + tabAccEnum.content);
        logger('selected:', this.active);
        logger('contents:', this.contents);

        if (this.contents !== null) {
          logger('contents children:', this.contents);

          for (i = 0; i < this.contents.length; i++) {
            if (this.contents[i].id === this.active) {
              this.contents[i].classList.add('-active');

              if (this.contents[i].classList.contains('-open')) {
                logger("close");
                this.contents[i].classList.remove('-open');
              } else {
                logger("open");
                this.contents[i].classList.add('-open');
              }

              logger('content active:', this.contents[i]);
            } else {
              this.contents[i].classList.remove('-active');
              logger('content not-active:', this.contents[i]);
            }
          }
        }
      }
    };
    var res = tao.select(tab);
    logger('select tab:', res);
  }

  var tabs = tabacc.querySelectorAll('.' + tabAccEnum.tab); // set accordion
  // tab exist (pc or sp only accordion)

  var i = 0;

  if (tabacc.querySelector('.' + tabAccEnum.tabs) !== null && (tabacc.classList.contains(tabAccEnum.modifiers.pcacc) || tabacc.classList.contains(tabAccEnum.modifiers.spacc))) {
    logger('set accordion:', tabacc); // copy tab to contents

    var contents = tabacc.querySelectorAll('.' + tabAccEnum.content);

    if (contents !== null) {
      for (i = 0; i < contents.length; i++) {
        logger('set accordion:', tabacc);

        if (tabs[i] !== undefined) {
          logger('insertBefore:', {
            item: tabs[i],
            before: contents[i]
          });
          var node = tabs[i].cloneNode(true);
          node.classList.add('-acc');
          contents[i].parentNode.insertBefore(node, contents[i]);
          addEvent(node, 'click', selectTab);
        } else {
          console.log('[error] contents count not match tab:', tabacc);
        }
      }
    }
  }

  if (tabs !== null) {
    logger('tabs children:', tabs);

    for (i = 0; i < tabs.length; i++) {
      addEvent(tabs[i], 'click', selectTab);
    }
  }
};
/************************
 * TableScrollSet
 ************************/


var TableScrollSet = function TableScrollSet() {};

TableScrollSet.prototype.init = function () {
  logger('TableScrollSet');
  this.selectors();
  this.create();
  this.events();
};

TableScrollSet.prototype.selectors = function () {
  this.box = Array.prototype.slice.call(document.querySelectorAll('.table-box'));
  this.table = Array.prototype.slice.call(document.querySelectorAll('.table-box > table'));
};

TableScrollSet.prototype.create = function () {
  var self = this;
  self.addClassSet();
};

TableScrollSet.prototype.events = function () {
  var self = this;
  window.addEventListener('resize', function () {
    self.addClassSet();
  });
  self.box.forEach(function (value) {
    value.addEventListener('scroll', function () {
      self.removeClassSet(value);
    });
  });
};

TableScrollSet.prototype.addClassSet = function () {
  var self = this;
  self.box.forEach(function (value, i) {
    if (value.classList.contains('-no-scroll')) return;
    var boxW = value.clientWidth;
    var tableW = self.table[i].clientWidth;

    if (boxW <= tableW) {
      value.classList.add('-scroll');
    } else {
      value.classList.remove('-scroll');
    }
  });
};

TableScrollSet.prototype.removeClassSet = function (el) {
  el.classList.add('-scrolled');
};
/************************
 * Navigation
 ************************/


var NavigationSet = function NavigationSet() {};

NavigationSet.prototype.init = function () {
  logger('Navigation');
  this.selectors();
  this.create();
  this.events();
};

NavigationSet.prototype.selectors = function () {
  // pc language
  this.langbtn = document.getElementById('js-langbtn');
  this.langmenu = document.getElementById('js-langmenu'); // sp searchbox

  this.searchbtn = document.getElementById('js-searchbtn');
  this.searchbox = document.getElementById('js-searchbox'); // sp drawer menu

  this.drawerbtn = document.getElementById('js-drawerbtn');
  this.sublink = document.getElementsByClassName('js-sublink');
  this.submenu = document.getElementsByClassName('js-submenu');
  this.mainback = document.getElementsByClassName('js-mainback');
  this.gnavmenu = document.getElementById('js-gnavmenu');
  this.gnavoverlay = document.getElementById('js-gnavoverlay');
  this.arrSublink = [].slice.call(this.sublink);
  this.arrSubmenu = [].slice.call(this.submenu);
  this.arrMainback = [].slice.call(this.mainback); // sp accordion

  this.accbtn = document.getElementsByClassName('js-accbtn');
  this.arrAccbtn = [].slice.call(this.accbtn);
};

NavigationSet.prototype.create = function () {};

NavigationSet.prototype.events = function () {
  var self = this; // pc language

  if (self.langbtn !== null) {
    self.langbtn.addEventListener('click', function () {
      self.accSwitch(self.langmenu, self.langmenu);
    });
  } // sp searchbox


  if (self.searchbtn !== null) {
    self.searchbtn.addEventListener('click', function () {
      self.accSwitch(self.searchbox, self.searchbox);
    });
  } // sp drawer menu


  if (self.drawerbtn !== null) {
    self.drawerbtn.addEventListener('click', function () {
      if (document.documentElement.classList.contains('-drawer-enter')) {
        self.drawerLeaveSet();
        self.submenuLeaveSet('sp');
      } else {
        self.drawerEnterSet();
      }
    });
  }

  if (self.arrSublink !== null) {
    self.arrSublink.forEach(function (value) {
      value.addEventListener('click', function (e) {
        if (document.documentElement.classList.contains('-drawer-enter')) {
          var index = self.arrSublink.indexOf(this);
          self.submenuEnterSet('sp', index);
          e.preventDefault();
        }
      });
    });
  }

  if (self.arrMainback !== null) {
    self.arrMainback.forEach(function (value) {
      value.addEventListener('click', function () {
        self.submenuLeaveSet('sp');
      });
    });
  }

  if (self.gnavoverlay !== null) {
    self.gnavoverlay.addEventListener('click', function () {
      self.drawerLeaveSet();
      self.submenuLeaveSet('sp');
    });
  }

  if (self.gnavmenu !== null) {
    self.gnavmenu.addEventListener('transitionend', function () {
      self.drawerEndSet();
      self.submenuEndSet();
    });
    self.gnavmenu.addEventListener('webkitTransitionEnd', function () {
      self.drawerEndSet();
      self.submenuEndSet();
    });
  } // pc dropdown


  if (self.arrSublink !== null) {
    self.arrSublink.forEach(function (value) {
      value.addEventListener('mouseenter', function () {
        if (!document.documentElement.classList.contains('-drawer-enter')) {
          var index = self.arrSublink.indexOf(this);
          self.submenuEnterSet('pc', index);

          if (self.submenu[index].classList.contains('-single')) {
            self.submenuPositionSet('pc', index);
          }
        }
      });
      value.addEventListener('mouseleave', function () {
        if (!document.documentElement.classList.contains('-drawer-enter')) {
          self.submenuLeaveSet('pc');
        }
      });
    });
  }

  if (self.arrSubmenu !== null) {
    self.arrSubmenu.forEach(function (value) {
      value.addEventListener('mouseenter', function () {
        if (!document.documentElement.classList.contains('-drawer-enter')) {
          var index = self.arrSubmenu.indexOf(this);
          self.submenuEnterSet('pc', index);
        }
      });
      value.addEventListener('mouseleave', function () {
        if (!document.documentElement.classList.contains('-drawer-enter')) {
          self.submenuLeaveSet('pc');
        }
      });
    });
  } // sp accordion fotter-global/navi


  if (self.arrAccbtn !== null) {
    self.arrAccbtn.forEach(function (value) {
      value.addEventListener('click', function () {
        var wrap = value.parentNode;
        var target = value.nextElementSibling;
        self.accSwitch(wrap, target);
      });
    });
    window.addEventListener('resize', function () {
      var timer = 0;
      if (timer > 0) clearTimeout(timer);
      timer = setTimeout(function () {
        self.arrAccbtn.forEach(function (value) {
          var target = value.nextElementSibling;

          if (target.style.height != 0) {
            target.style.height = self.targetHeightSet(target);
          }
        });
      }, 500);
    });
  }
}; // sp drawer menu


NavigationSet.prototype.drawerEnterSet = function () {
  document.documentElement.classList.add('-drawer-enter');
  document.documentElement.classList.add('-drawer-active');
};

NavigationSet.prototype.drawerLeaveSet = function () {
  var self = this;
  document.documentElement.classList.remove('-drawer-enter');
  self.gnavmenu.classList.remove('-submenu-enter');
};

NavigationSet.prototype.drawerEndSet = function () {
  if (!document.documentElement.classList.contains('-drawer-enter')) {
    document.documentElement.classList.remove('-drawer-active');
  }
};

NavigationSet.prototype.submenuEnterSet = function (media, index) {
  var self = this;
  self.submenu[index].classList.add('-active');

  if (media === 'pc') {
    self.sublink[index].classList.add('-active');
  }

  if (media === 'sp') {
    self.gnavmenu.classList.add('-submenu-enter');
    self.gnavmenu.classList.add('-submenu-active');
  }
};

NavigationSet.prototype.submenuLeaveSet = function (media) {
  var self = this;
  self.arrSubmenu.forEach(function (value) {
    value.classList.remove('-active');
  });

  if (media === 'pc') {
    self.arrSublink.forEach(function (value) {
      value.classList.remove('-active');
    });
  }

  if (media === 'sp') {
    self.gnavmenu.classList.remove('-submenu-enter');
  }
};

NavigationSet.prototype.submenuEndSet = function () {
  var self = this;

  if (!self.gnavmenu.classList.contains('-submenu-enter')) {
    self.gnavmenu.classList.remove('-submenu-active');
  }
};

NavigationSet.prototype.submenuPositionSet = function (media, index) {
  var self = this;
  var linkPositon = self.sublink[index].offsetLeft;
  self.submenu[index].style.left = linkPositon - 75 + 'px';
}; // sp accordion


NavigationSet.prototype.accSwitch = function (element, target) {
  var self = this;

  if (element.classList.contains('-show')) {
    element.classList.remove('-show');
    target.style.height = '';
  } else {
    element.classList.add('-show');
    target.style.height = self.targetHeightSet(target);
  }
};

NavigationSet.prototype.targetHeightSet = function (el) {
  var copy_el = el.cloneNode(true);
  el.parentNode.appendChild(copy_el);
  copy_el.style.visibility = 'hidden';
  copy_el.style.position = 'absolute';
  copy_el.style.height = 'auto';
  var height = copy_el.offsetHeight;
  el.parentNode.removeChild(copy_el);
  return height + 'px';
};
/************************
 * RiskSet
 ************************/


var RiskSet = function RiskSet() {};

RiskSet.prototype.init = function () {
  logger('RiskSet');
  this.risks = Array.prototype.slice.call(document.querySelectorAll('.mhlw-risk'));
  logger('.mhlw-risk', this.risks);

  if (this.risks !== null) {
    this.risks.forEach(function (r) {
      var category = r.getAttribute('data-category');
      var template = r.getAttribute('data-template');

      if (category !== undefined && category !== '') {
        var query = 'category=' + category;

        if (template !== undefined) {
          query = query + '&template=' + template;
        }

        if (location.href.match(/s\-b\-c\.net/)) {
          query = query + '&dummy=.';
        } else {
          query = query + '&dummy=';
        }

        (function (query, r) {
          var xhr = new XMLHttpRequest();

          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
              var data = JSON.parse(xhr.responseText);

              if (data.html !== undefined && data.html instanceof Array) {
                logger('risk init:', data.html);
                r.innerHTML = '';
                data.html.forEach(function (html) {
                  var inner = '';
                  html.forEach(function (block) {
                    inner = inner + block.replace('class="mhlw-risk-fixed-contents" style="display:none;"', 'class="mhlw-risk-fixed-contents modal-show"');
                  });
                  r.innerHTML = inner;
                });
                r.parentNode.classList.add('-close');
                var p = r.parentNode;

                if (p.classList.contains('mhlw-risk-fixed')) {
                  var closes = p.getElementsByClassName('mhlw-risk-fixed-close');

                  if (closes[0]) {
                    addEvent(closes[0], 'click', function () {
                      p.classList.add('-close');
                    });
                  }
                }

                r.classList.add('-loaded');
              }
            }
          };

          xhr.open("GET", "https://www.s-b-c.net/risk/?" + query, true);
          xhr.send(null);
        })(query, r);
      } else {
        r.classList.add('-category_not_setted');
      }
    });
    var riskbtns = Array.prototype.slice.call(d.querySelectorAll('[rel="risk:open"]'));
    logger('RiskButton init:', riskbtns);
    var i = 0,
        len = null;

    for (i = 0, len = riskbtns.length; i < len; i++) {
      // faster than jquery modal
      riskbtns[i].rel = 'modal:inited';
      addEvent(riskbtns[i], 'click', function (e) {
        e.preventDefault();
        var target = d.getElementById(e.target.href.replace(/.*#/, ''));
        logger('RiskLink:', e, target);

        if (target.classList.contains('-close')) {
          e.target.classList.add('-open');
          target.classList.remove('-close');
        } else {
          e.target.classList.remove('-open');
          target.classList.add('-close');
        }
      });
    }
  }
};
/**
 * Init common on load
 */


addEvent(window, 'load', function () {
  // 1. Lazyload
  Lazyload(Array.prototype.slice.call(document.querySelectorAll('img[data-src]')), {
    img_path: 'data-src',
    rootMargin: '100px 0px'
  });
  var iframes = Array.prototype.slice.call(document.querySelectorAll('iframe[data-src]'));
  Lazyload(iframes, {
    img_path: 'data-src',
    rootMargin: '100px 0px'
  }); // 2. Add SmoothScroll need class ss

  var ss_anchors = document.querySelectorAll('a.ss');
  var i = 0,
      len = null;

  for (i = 0, len = ss_anchors.length; i < len; i++) {
    addEvent(ss_anchors[i], 'click', SmoothScroll);
  } // 3. Tab


  var tabaccs = Array.prototype.slice.call(document.querySelectorAll('.tabacc'));

  for (i = 0, len = tabaccs.length; i < len; i++) {
    // remove SmoothScroll
    var tabs = tabaccs[i].querySelectorAll('.' + tabAccEnum.tab);
    TabAccSet(tabaccs[i]);
  } // 4. Table


  var tss = new TableScrollSet();
  tss.init(); // 5. Navigation

  if (document.getElementById('navi-global') != null) {
    var navigation = new NavigationSet();
    navigation.init();
  } // 6. SetRisk


  var risk = new RiskSet();
  risk.init();
});