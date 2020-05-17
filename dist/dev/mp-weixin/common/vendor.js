(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApp = createApp;
exports.createComponent = createComponent;
exports.createPage = createPage;
exports.default = void 0;

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}
/**
 * Create a cached version of a pure function.
 */


function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
/**
 * Camelize a hyphen-delimited string.
 */


var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
var HOOKS = ['invoke', 'success', 'fail', 'complete', 'returnValue'];
var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}

function dedupeHooks(hooks) {
  var res = [];

  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }

  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);

  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }

  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (_typeof(obj) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;

  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];

    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);

      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }

      if (res === false) {
        return {
          then: function then() {}
        };
      }
    }
  }

  return promise || {
    then: function then(callback) {
      return callback(data);
    }
  };
}

function wrapperOptions(interceptor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];

      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];

  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }

  var interceptor = scopedInterceptors[method];

  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }

  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];

  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }

  return interceptor;
}

function invokeApi(method, api, options) {
  for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    params[_key - 3] = arguments[_key];
  }

  var interceptor = getApiInterceptorHooks(method);

  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }

  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }

    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  }
};
var SYNC_API_RE = /^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;
var CONTEXT_API_RE = /^create|Manager$/; // Context例外情况

var CONTEXT_API_RE_EXC = ['createBLEConnection']; // 同步例外情况

var ASYNC_API = ['createBLEConnection'];
var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}

function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).catch(function (err) {
    return [err];
  });
}

function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }

  return true;
}
/* eslint-disable no-extend-native */


if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(function (value) {
      return promise.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return promise.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }

  return function promiseApi() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      params[_key2 - 1] = arguments[_key2];
    }

    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }

    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject
      })].concat(params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {
  var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
      platform = _wx$getSystemInfoSync.platform,
      pixelRatio = _wx$getSystemInfoSync.pixelRatio,
      windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni


  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);

  if (number === 0) {
    return 0;
  }

  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);

  if (result < 0) {
    result = -result;
  }

  result = Math.floor(result + EPS);

  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }

  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor
};
var baseApi =
/*#__PURE__*/
Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors
});
var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);

    if (isNaN(currentIndex)) {
      return;
    }

    var urls = fromArgs.urls;

    if (!Array.isArray(urls)) {
      return;
    }

    var len = urls.length;

    if (!len) {
      return;
    }

    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }

    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(function (item, index) {
        return index < currentIndex ? item !== urls[currentIndex] : true;
      });
    } else {
      fromArgs.current = urls[0];
    }

    return {
      indicator: false,
      loop: false
    };
  }
};

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom
    };
  }
}

var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets
  },
  getSystemInfoSync: {
    returnValue: addSafeAreaInsets
  }
};
var todos = ['vibrate'];
var canIUses = [];
var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {
  var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  if (isPlainObject(fromArgs)) {
    // 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值

    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }

    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];

        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }

        if (!keyOption) {
          // 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {
          // 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {
          // {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }

    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }

  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {
  var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (isFn(protocols.returnValue)) {
    // 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }

  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];

    if (!protocol) {
      // 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }

    return function (arg1, arg2) {
      // 目前 api 最多两个参数
      var options = protocol;

      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      var args = [arg1];

      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }

      var returnValue = wx[options.name || methodName].apply(wx, args);

      if (isSyncApi(methodName)) {
        // 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }

      return returnValue;
    };
  }

  return method;
}

var todoApis = Object.create(null);
var TODOS = ['onTabBarMidButtonTap', 'subscribePush', 'unsubscribePush', 'onPush', 'offPush', 'share'];

function createTodoApi(name) {
  return function todoApi(_ref) {
    var fail = _ref.fail,
        complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5")
    };
    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});
var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin']
};

function getProvider(_ref2) {
  var service = _ref2.service,
      success = _ref2.success,
      fail = _ref2.fail,
      complete = _ref2.complete;
  var res = false;

  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service]
    };
    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在'
    };
    isFn(fail) && fail(res);
  }

  isFn(complete) && complete(res);
}

var extraApi =
/*#__PURE__*/
Object.freeze({
  __proto__: null,
  getProvider: getProvider
});

var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }

  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }

    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}

function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}

function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}

function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi =
/*#__PURE__*/
Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit
});
var api =
/*#__PURE__*/
Object.freeze({
  __proto__: null
});
var MPPage = Page;
var MPComponent = Component;
var customizeRE = /:/g;
var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;

  mpInstance.triggerEvent = function (event) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }

    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];

  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);

      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = ['onPullDownRefresh', 'onReachBottom', 'onShareAppMessage', 'onPageScroll', 'onResize', 'onTabItemTap'];

function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }

    if (vueOptions.super && vueOptions.super.options && Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }

    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }

  var mixins = vueOptions.mixins;

  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {
      return hasHook(hook, mixin);
    });
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;

  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }

  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });
  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;
  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];

  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));

      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: ''
          };
          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ''
          };
        }
      }
    });
  }

  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(initBehavior({
      properties: initProperties(vueExtends.props, true)
    }));
  }

  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(initBehavior({
          properties: initProperties(vueMixin.props, true)
        }));
      }
    });
  }

  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }

  return type;
}

function initProperties(props) {
  var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};

  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: ''
    };
    properties.vueSlots = {
      // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots
        });
      }
    };
  }

  if (Array.isArray(props)) {
    // ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key)
      };
    });
  } else if (isPlainObject(props)) {
    // {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];

      if (isPlainObject(opts)) {
        // title:{type:String,default:''}
        var value = opts.default;

        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);
        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key)
        };
      } else {
        // content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key)
        };
      }
    });
  }

  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;
  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = _typeof(event.detail) === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];

    if (dataPath || typeof value !== 'undefined') {
      // ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];
      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *'test'
     */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {
          // model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {
            // $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {
            // $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};

  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }

  return obj;
}

function processEventArgs(vm, event) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var isCustom = arguments.length > 4 ? arguments[4] : undefined;
  var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象

  if (isCustom) {
    // 自定义事件
    isCustomMPEvent = event.currentTarget && event.currentTarget.dataset && event.currentTarget.dataset.comType === 'wx';

    if (!args.length) {
      // 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }

      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);
  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {
        // input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {
          // wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });
  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType || optType === 'regionchange' && (eventType === 'begin' || eventType === 'end');
}

function handleEvent(event) {
  var _this = this;

  event = wrapper$1(event); // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]

  var dataset = (event.currentTarget || event.target).dataset;

  if (!dataset) {
    return console.warn('事件信息不存在');
  }

  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰

  if (!eventOpts) {
    return console.warn('事件信息不存在');
  } // [['handle',[1,2,a]],['handle1',[1,2,a]]]


  var eventType = event.type;
  var ret = [];
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];
    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];

        if (methodName) {
          var handlerCtx = _this.$vm;

          if (handlerCtx.$options.generic && handlerCtx.$parent && handlerCtx.$parent.$parent) {
            // mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }

          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx, processEventArgs(_this.$vm, event, eventArray[1], eventArray[2], isCustom, methodName));
            return;
          }

          var handler = handlerCtx[methodName];

          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }

          if (isOnce) {
            if (handler.once) {
              return;
            }

            handler.once = true;
          }

          ret.push(handler.apply(handlerCtx, processEventArgs(_this.$vm, event, eventArray[1], eventArray[2], isCustom, methodName)));
        }
      });
    }
  });

  if (eventType === 'input' && ret.length === 1 && typeof ret[0] !== 'undefined') {
    return ret[0];
  }
}

var hooks = ['onShow', 'onHide', 'onError', 'onPageNotFound'];

function parseBaseApp(vm, _ref3) {
  var mocks = _ref3.mocks,
      initRefs = _ref3.initRefs;

  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;
      this.$mp = _defineProperty({
        data: {}
      }, this.mpType, this.$options.mpInstance);
      this.$scope = this.$options.mpInstance;
      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    }
  });

  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {
        // 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }

      {
        if (!wx.canIUse('nextTick')) {
          // 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }
      this.$vm = vm;
      this.$vm.$mp = {
        app: this
      };
      this.$vm.$scope = this; // vm 上也挂载 globalData

      this.$vm.globalData = this.globalData;
      this.$vm._isMounted = true;

      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    }
  }; // 兼容旧版本 globalData

  appOptions.globalData = vm.$options.globalData || {}; // 将 methods 中的方法挂在 getApp() 中

  var methods = vm.$options.methods;

  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);
  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children; // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)

  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];

    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  } // 反向递归查找


  var parentVm;

  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);

    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;

        if (!$refs[ref]) {
          $refs[ref] = [];
        }

        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    }
  });
}

function handleLink(event) {
  var _ref4 = event.detail || event.value,
      vuePid = _ref4.vuePid,
      vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)


  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs
  });
}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      isPage = _ref5.isPage,
      initRelation = _ref5.initRelation;

  var _initVueComponent = initVueComponent(_vue.default, vueComponentOptions),
      _initVueComponent2 = _slicedToArray(_initVueComponent, 2),
      VueComponent = _initVueComponent2[0],
      vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true
  }, vueOptions.options || {});

  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }
  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;
        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties
        };
        initVueIds(properties.vueId, this); // 处理父子关系

        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options
        }); // 初始化 vue 实例

        this.$vm = new VueComponent(options); // 处理$slots,$scopedSlots（暂不支持动态变化$slots）

        initSlots(this.$vm, properties.vueSlots); // 触发首次 setData

        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;

          this.$vm.__call_hook('mounted');

          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      }
    },
    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      }
    },
    methods: {
      __l: handleLink,
      __e: handleEvent
    }
  };

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }

  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation
  });
}

var hooks$1 = ['onShow', 'onHide', 'onUnload'];
hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6) {
  var isPage = _ref6.isPage,
      initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);
  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue

    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation
  });
}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});
canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name : canIUseApi;

  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});
var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }

      if (baseApi[name]) {
        return baseApi[name];
      }

      if (api[name]) {
        return promisify(name, api[name]);
      }

      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }

        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }

      if (eventApi[name]) {
        return eventApi[name];
      }

      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }

      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    }
  });
} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });
  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }
  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });
  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });
  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
var uni$1 = uni;
var _default = uni$1;
exports.default = _default;

/***/ }),

/***/ 12:
/*!*********************************!*\
  !*** ./src/modules/passport.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _api = _interopRequireDefault(__webpack_require__(/*! @/modules/api */ 13));

var _store = _interopRequireDefault(__webpack_require__(/*! @/store */ 17));

var _userInfo = _interopRequireDefault(__webpack_require__(/*! @/modules/userInfo */ 15));

var _WXBizDataCrypt = _interopRequireDefault(__webpack_require__(/*! @/modules/WXBizDataCrypt */ 20));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  /**
    * 检查登录态是否过期
    */
  checkSession: function checkSession(func) {
    var that = this; //获取用户信息

    var userInfo = _userInfo.default.methods.getUser(); //检查登录


    wx.checkSession({
      //未过期
      success: function success() {
        wx.getSetting({
          success: function success(res) {
            if (!wx.getStorageSync('session_key') || !userInfo.openid) {
              that.wxLogin(func);
            } else {
              func(userInfo.openid);
            }
          },
          fail: function fail(res) {
            console.log(res, "失败回调");
          }
        });
      },
      //已经过期
      fail: function fail() {
        that.wxLogin(func);
      }
    });
  },

  /**
   * 用户数据初始化
   */
  wxLogin: function wxLogin(func) {
    var wxuser = _userInfo.default.methods.getUser();

    wx.login({
      //调用接口获取登录凭证（code），包含openid，session_key
      success: function success(res) {
        if (res.code) {
          _api.default.post(_api.default.api_103, _api.default.getSign({
            Code: res.code
          }), function (app, res) {
            if (res.data.Basis.State == _api.default.state.state_200) {
              //session_key 写入缓存 
              uni.setStorageSync('session_key', res.data.Result.session_key);
              wxuser.openid = res.data.Result.openid;

              _userInfo.default.methods.login(wxuser);

              func(res.data.Result.openid);
            } else {
              wx.showToast({
                title: '网络错误',
                icon: 'none',
                duration: 3000
              });
            }
          });
        }
      }
    });
  },

  /**
    * 绑定手机号码
    */
  bindMobile: function bindMobile(e, func) {
    var this_ = this;

    var userInfo = _userInfo.default.methods.getUser();

    if (e.detail.errMsg === "getPhoneNumber:ok") {
      //小程序appId
      var appId = wx.getAccountInfoSync().miniProgram.appId; //解密数据

      var pc = new _WXBizDataCrypt.default(appId, wx.getStorageSync('session_key')); //获取手机号码数据包

      var wx_result = pc.decryptData(e.detail.encryptedData, e.detail.iv); //获取手机号码

      var mobile = wx_result.phoneNumber; //请求服务器

      _api.default.post(_api.default.api_104, _api.default.getSign({
        OpenID: userInfo.openid,
        Mobile: mobile
      }), function (app, res) {
        if (res.data.Basis.State == _api.default.state.state_200) {
          userInfo = res.data.Result;

          _userInfo.default.methods.login(userInfo);

          wx.showToast({
            title: res.data.Basis.Msg,
            duration: 2000
          });
        } else {
          wx.showToast({
            title: res.data.Basis.Msg,
            icon: 'none',
            duration: 3000
          });
        }

        func(res.data.Basis.State, userInfo);
      });
    }
  },

  /**
   * 获取小程序用户信息
   */
  getWxUser: function getWxUser(e, func) {
    var that = this;

    var userInfo = _userInfo.default.methods.getUser();

    if (e.detail.errMsg == 'getUserInfo:ok') {
      var wxuser = {};
      wxuser.openid = userInfo.openid;
      wxuser.headimgurl = e.detail.userInfo.avatarUrl;
      wxuser.nickname = e.detail.userInfo.nickName; //wxuser.nickname = encodeURI(wxuser.nickname)

      wxuser.language = e.detail.userInfo.language;
      wxuser.country = e.detail.userInfo.country;
      wxuser.province = e.detail.userInfo.province;
      wxuser.city = e.detail.userInfo.city;
      wxuser.sex = e.detail.userInfo.gender;

      _api.default.post(_api.default.api_105, _api.default.getSign({
        WeChatUser: wxuser
      }), function (app, res) {
        if (res.data.Basis.State == _api.default.state.state_200) {
          userInfo.img = wxuser.headimgurl;
          userInfo.nickname = decodeURI(wxuser.nickname);

          _userInfo.default.methods.login(userInfo);

          wx.showToast({
            title: res.data.Basis.Msg,
            duration: 2000
          });
        } else {
          wx.showToast({
            title: res.data.Basis.Msg,
            icon: 'none',
            duration: 3000
          });
        }

        func(res.data.Basis.State, e.detail.userInfo);
      });
    }
  },

  /**
   * 用户授权页面
   */
  toAuth: function toAuth() {
    wx.redirectTo({
      url: '../../passport/authorize/authorize'
    });
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 13:
/*!****************************!*\
  !*** ./src/modules/api.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _appGlobal = _interopRequireDefault(__webpack_require__(/*! @/modules/appGlobal */ 14));

var _userInfo = _interopRequireDefault(__webpack_require__(/*! @/modules/userInfo */ 15));

var _blueimpMd = _interopRequireDefault(__webpack_require__(/*! blueimp-md5 */ 16));

var _store = _interopRequireDefault(__webpack_require__(/*! ../store */ 17));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//测试环境
// let domain = "http://yy.api.youyi.com/"
// let res_domain = "http://yy.res.youyi.com/"
// //测试环境配置
// if (process.env.NODE_ENV !== 'production') {
//     domain = "http://yy.api.youyi.com/"
//     res_domain = "http://yy.res.youyi.com/"
// }
var domain = "http://api66.yoyibook.com:20182/";
var res_domain = "http://yy.res.youyi.com:20182/"; //正式环境配置

if (true) {
  domain = "http://api66.yoyibook.com:20182/";
  res_domain = "http://res66.yoyibook.com:20182/";
} /// <summary>
/// 全局配置类
/// @author   叶委
/// @date     2014-05-23
/// </summary>


module.exports = {
  //资源站点
  res: res_domain,
  //微信授权
  api_100: domain + "100",
  //根据openid自动登录
  api_101: domain + "101",
  //获取微信wxconfig
  api_102: domain + "102",
  // 103 注册，小程序初始化微信用户 第一步
  api_103: domain + "103",
  //注册，第二步绑定手机号码
  api_104: domain + "104",
  //第三步，小程序注册，授权完善微信用户数据
  api_105: domain + "105",
  //加载用户数据
  api_106: domain + "106",
  //发送验证码
  api_110: domain + "110",
  //用户登录
  api_120: domain + "120",
  //用户注册
  api_121: domain + "121",
  //找回密码
  api_122: domain + "122",
  //更新密码
  api_123: domain + "123",
  //绑定新手机号
  api_124: domain + "124",
  //首页接口
  api_200: domain + "200",
  //分类列表页-获取分类
  api_201: domain + "201",
  //分类列表页-获取商品列表
  api_202: domain + "202",
  //加载商品详情
  api_203: domain + "203",
  // 扫码点单
  api_204: domain + "204",
  // 课堂页数据
  api_205: domain + "205",
  //
  api_206: domain + "206",
  //
  api_207: domain + "207",
  //
  api_208: domain + "208",
  //
  api_209: domain + "209",
  //
  api_210: domain + "210",
  //
  api_211: domain + "211",
  //
  api_212: domain + "212",
  //
  api_213: domain + "213",
  //
  api_300: domain + "300",
  //保存用户信息
  api_301: domain + "301",
  //获取购物车
  api_302: domain + "302",
  //更新购物车
  api_303: domain + "303",
  //删除购物车
  api_304: domain + "304",
  //
  api_305: domain + "305",
  //加入购物车
  api_306: domain + "306",
  //加载默认收货地址
  api_307: domain + "307",
  //
  api_308: domain + "308",
  //保存收货地址
  api_309: domain + "309",
  //设置默认收货地址
  api_310: domain + "310",
  //
  api_311: domain + "311",
  //
  api_312: domain + "312",
  //
  api_313: domain + "313",
  //创建咖啡订单
  api_314: domain + "314",
  //根据ID获取收货地址
  api_316: domain + "316",
  //微信小程序预支付订单
  api_317: domain + "317",
  //订单列表
  api_318: domain + "318",
  //获取签名
  getSign: function getSign() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _user$methods$getUser = _userInfo.default.methods.getUser(),
        token = _user$methods$getUser.token;

    function sort(obj) {
      if (obj instanceof Array) {
        //如果数组里面存放的为对象,通过map更改数组结构，排序
        obj = obj.map(function (ele, index) {
          if (ele instanceof Object) {
            var newObj = {};
            Object.keys(ele).sort().forEach(function (key) {
              var o = ele[key];

              if (o instanceof Object) {
                o = sort(o);
              }

              newObj[key] = o;
            });
            ele = newObj;
          }

          return ele;
        });
        return obj;
      }

      var newObj = {}; //默认情况下，对字符串排序，是按照ASCII的大小比较的，现在，我们提出排序应该忽略大小写，按照字母序排序。要实现这个算法，
      //不必对现有代码大加改动，只要我们能定义出忽略大小写的比较算法就可以

      Object.keys(obj).sort(function (s1, s2) {
        var x1 = s1.toUpperCase();
        var x2 = s2.toUpperCase();

        if (x1 < x2) {
          return -1;
        }

        if (x1 > x2) {
          return 1;
        }

        return 0;
      }).forEach(function (key) {
        var o = obj[key];

        if (o instanceof Object) {
          o = sort(o);
        }

        newObj[key] = o;
      });
      return newObj;
    }

    var sign_data = {
      Data: obj,
      Global: {
        IMEI: "",
        IMSI: "",
        IP: "",
        OS: 3,
        Sign: "",
        Token: token
      }
    };
    return {
      Data: obj,
      Global: {
        IMEI: "",
        IMSI: "",
        IP: "",
        OS: 3,
        Sign: (0, _blueimpMd.default)(JSON.stringify(sort(sign_data)) + ')(4AzEdr5J6a`@#$*%'),
        Token: token
      }
    };
  },
  //请求对象
  post: function post(url, data, cb, ch) {
    var _this = this;

    uni.showLoading({
      title: '加载中'
    });
    uni.request({
      url: url,
      method: "post",
      data: data,
      header: {//'custom-header': 'hello'
      },
      //请求成功回调
      success: function success(res) {
        //如果登录失效
        if (res.data.Basis != undefined && res.data.Basis.State == 205 || res.data.Basis.State == 211) {
          //主动注销用户信息
          _userInfo.default.methods.loginOut(); //弹出登录失效错误信息


          uni.showToast({
            title: res.data.Basis.Msg,
            duration: 2000
          }); //当前页面路径

          var returl = getCurrentPages()[0].route; //存储到缓存

          uni.setStorage({
            key: 'returl',
            data: returl,
            success: function success() {}
          }); //重新跳转到用户中心

          uni.switchTab({
            url: "/pages/user/index?backUrl=" + returl
          });
        } else {
          cb(_this, res);
        }
      },
      //请求失败的回调
      fail: function fail(res) {
        console.log("错误来自于err" + res);
      },
      //接口调用结束的回调函数（调用成功、失败都会执行）
      complete: function complete(res) {
        uni.hideLoading();
      }
    });
  },
  //状态码
  state: {
    // 系统错误
    state_500: 500,
    // 响应成功
    state_200: 200,
    // 验证通过
    state_0: 0,
    // 验证未通过
    state_1: 1,
    // 用户未登陆
    state_30045: 30045
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 14:
/*!**********************************!*\
  !*** ./src/modules/appGlobal.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/// <summary>
/// 全局配置类
/// @author   叶委  
/// @date     2014-05-23         
/// </summary>
var _default = {
  config: {
    domain: function domain() {
      var dms = window.location.host.split(".");

      if (window.location.host.indexOf('com.cn') != -1) {
        return document.domain.split('.').slice(-3).join('.');
      }

      return document.domain.split('.').slice(-2).join('.');
    }
  },
  verifyStr: {
    // 没有验证  
    normal: function normal() {
      return true;
    },
    // 匹配任意字符
    anyCharacter: function anyCharacter(str) {
      return $.trim(str).length >= 1;
    },
    // 编号验证
    isNo: function isNo(serialNumber) {
      return /^[a-zA-Z0-9_-]{1,100}$/.test(serialNumber);
    },
    // 英文名称验证
    isEnglishName: function isEnglishName(englishName) {
      return /^[a-zA-Z_-]{1,100}$/.test(englishName);
    },
    // 货币英文简写验证
    isEnglishAbbreviation: function isEnglishAbbreviation(abbreviation) {
      return /^[A-Z]{3}$/.test(abbreviation);
    },
    // 价格格式验证，验证小数点后2位
    isPrice: function isPrice(price) {
      return /(^[1-9]\d*(\.\d{1,2})?$)|(^[-+]?[0]{1}(\.\d{1,2})?$)/.test(price);
    },
    // 价格格式验证，验证小数点后2位
    isLGZeroPrice: function isLGZeroPrice(price) {
      return /(^[-+]?[1-9]\d*(\.\d{1,2})?$)|(^[-+]?[0]{1}(\.\d{1,2})?$)/.test(price) && price > 0;
    },
    // 金额格式验证，小数点后位不做验证
    isAmount: function isAmount(amount) {
      return /^-?\d+\.{0,}\d{0,}$/.test(amount);
    },
    /// 金额格式 验证大于等于0，验证小数点后2位
    isShipments: function isShipments(amount) {
      // return /^\d+\.{0,}\d{0,}$/.test(amount);
      return /^\d+\.*(\.\d{1,2})?$/.test(amount);
    },
    /// 金额格式验证，小数点后位不做验证
    isProfitRatio: function isProfitRatio(amount) {
      var profit = /(^[-+]?[1-9]\d*(\.\d{1,2})?$)|(^[-+]?[0]{1}(\.\d{1,2})?$)/.test(amount); //数字

      if (profit) {
        if (amount < 0) {
          return false;
        }

        if (amount.indexOf('.') > -1) {
          if (amount.substring(0, amount.indexOf('.')).length > 2) {
            return false;
          }

          if (amount.length > 5) {
            return false;
          }
        } else {
          if (amount.length > 2) {
            if (amount == 100) {} else {
              return false;
            }
          }
        }

        return true;
      }

      return false;
    },
    /// 大于0金额格式验证 
    isLGZeroAmount: function isLGZeroAmount(amount) {
      return /^-?\d+\.{0,}\d{0,}$/.test(amount) && amount > 0;
    },
    /// 邮箱格式验证
    isEmail: function isEmail(email) {
      return /^\s*\w+(?:\.{0,1}[\w-]+)*@[a-zA-Z0-9]+(?:[-.][a-zA-Z0-9]+)*\.[a-zA-Z]+\s*$/i.test(email);
    },
    /// QQ号码格式验证
    isQQNumber: function isQQNumber(qq) {
      return /^[1-9]\d{4,10}$/.test(qq);
    },
    /// 登录名格式验证
    isLoginName: function isLoginName(loginName) {
      return /^[a-zA-Z0-9_-]{6,16}$/.test(loginName);
    },
    /// 密码格式验证 验证用户密码(正确格式为：长度在6~16 之间，任意字符)  
    isPsw: function isPsw(psw) {
      return /^[a-zA-Z0-9_-]{6,16}$/.test(psw);
    },
    /// 手机号码格式验证  
    isMoblie: function isMoblie(mobile) {
      return /^1[345678]\d{9}$/.test(mobile);
    },
    /// 电话号码格式验证  
    isPhone: function isPhone(phone) {
      return /(^[0-9]{3,4}[\-|\s][0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}1[345678]\d{9}$)/.test(phone);
    },
    /// 邮编格式验证  
    isPostCode: function isPostCode(postCode) {
      return /^[0-9]{6}$/.test(postCode);
    },
    /// 验证码基本格式验证  
    code4: function code4(validateCode) {
      return /^[a-zA-Z0-9]{4,4}$/.test(validateCode);
    },
    /// 验证码基本格式验证  
    code5: function code5(validateCode) {
      return /^[a-zA-Z0-9]{5,5}$/.test(validateCode);
    },
    // 验证汉字数字字母 
    isNumberlatterCcter: function isNumberlatterCcter(userName) {
      return /^[\u0391-\uFFE5A-Za-z0-9]+$/.test(userName);
    },
    // 验证汉字逗号 
    isHanZiDouHao: function isHanZiDouHao(economyCity) {
      return /^[\u4e00-\u9fff,]+$/.test(economyCity);
    },
    // 日期格式验证 
    isDate: function isDate(date) {
      return /((^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(10|12|0?[13578])([-\/\._])(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(11|0?[469])([-\/\._])(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(0?2)([-\/\._])(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([3579][26]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][13579][26])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][13579][26])([-\/\._])(0?2)([-\/\._])(29)$))/.test(date);
    },
    /// 网络地址验证 
    isUrl: function isUrl(url) {
      return /^((http|https|ftp):\/\/)?(\w(\:\w)?@)?([0-9a-z_-]+\.)*?([a-z0-9-]+\.[a-z]{2,6}(\.[a-z]{2})?(\:[0-9]{2,6})?)((\/[^?#<>\/\\*":]*)+(\?[^#]*)?(#.*)?)?$/i.test(url);
    },
    /// IP地址 
    isIpAddress: function isIpAddress(ip) {
      return /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/i.test(ip);
    },
    /// 正整数格式验证 ~
    isNumber: function isNumber(number) {
      return /^\d+$/g.test(number);
    },
    /// 浮点数格式验证 
    isFloat: function isFloat(number) {
      return /^\d+(\.\d+)?$/.test(number);
    },
    /// 大于0的正整数格式验证 
    isLGZeroNumber: function isLGZeroNumber(number) {
      return /^([1-9]\d{0,15})$/g.test(number);
    },
    // 是否是身份证号码  
    isIdCard: function isIdCard(idCard) {
      idCard = $.trim(idCard);

      if (idCard.length == 15) {
        return this.isValidityBrithBy15IdCard(idCard);
      } else if (idCard.length == 18) {
        var a_idCard = idCard.split(""); // 得到身份证数组   

        if (this.isValidityBrithBy18IdCard(idCard) && this.isTrueValidateCodeBy18IdCard(a_idCard)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    // 验证15位数身份证号码中的生日是否是有效生日   
    isValidityBrithBy15IdCard: function isValidityBrithBy15IdCard(idCard) {
      var year = idCard15.substring(6, 8);
      var month = idCard15.substring(8, 10);
      var day = idCard15.substring(10, 12);
      var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day)); // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法   

      if (temp_date.getYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
        return false;
      } else {
        return true;
      }
    },
    // 验证18位数身份证号码中的生日是否是有效生日   
    isValidityBrithBy18IdCard: function isValidityBrithBy18IdCard(idCard18) {
      var year = idCard18.substring(6, 10);
      var month = idCard18.substring(10, 12);
      var day = idCard18.substring(12, 14);
      var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day)); // 这里用getFullYear()获取年份，避免千年虫问题   

      if (temp_date.getFullYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
        return false;
      } else {
        return true;
      }
    },
    // 判断身份证号码为18位时最后的验证位是否正确   
    isTrueValidateCodeBy18IdCard: function isTrueValidateCodeBy18IdCard(a_idCard) {
      var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 身份证验证位值.10代表X

      var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 声明加权求和变量   

      var sum = 0;

      if (a_idCard[17].toLowerCase() == 'x') {
        a_idCard[17] = 10; // 将最后位为x的验证码替换为10方便后续操作   
      }

      for (var _i = 0; _i < 17; _i++) {
        sum += Wi[_i] * a_idCard[_i]; // 加权求和   
      }

      var valCodePosition = sum % 11; // 得到验证码所位置   

      if (a_idCard[17] == ValideCode[valCodePosition]) {
        return true;
      } else {
        return false;
      }
    },
    // 银行卡号验证 
    isBankCardNo: function isBankCardNo(bankno) {
      if ($.trim(bankno).length == 0) return false;
      var lastNum = bankno.substr(bankno.length - 1, 1); //取出最后一位（与luhm进行比较）

      var first15Num = bankno.substr(0, bankno.length - 1); //前15或18位

      var newArr = new Array();

      for (var _i2 = first15Num.length - 1; _i2 > -1; _i2--) {
        //前15或18位倒序存进数组
        newArr.push(first15Num.substr(_i2, 1));
      }

      var arrJiShu = new Array(); //奇数位*2的积 <9

      var arrJiShu2 = new Array(); //奇数位*2的积 >9

      var arrOuShu = new Array(); //偶数位数组

      for (var j = 0; j < newArr.length; j++) {
        if ((j + 1) % 2 == 1) {
          //奇数位
          if (parseInt(newArr[j]) * 2 < 9) arrJiShu.push(parseInt(newArr[j]) * 2);else arrJiShu2.push(parseInt(newArr[j]) * 2);
        } else //偶数位
          arrOuShu.push(newArr[j]);
      }

      var jishu_child1 = new Array(); //奇数位*2 >9 的分割之后的数组个位数

      var jishu_child2 = new Array(); //奇数位*2 >9 的分割之后的数组十位数

      for (var h = 0; h < arrJiShu2.length; h++) {
        jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
        jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
      }

      var sumJiShu = 0; //奇数位*2 < 9 的数组之和

      var sumOuShu = 0; //偶数位数组之和

      var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和

      var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和

      var sumTotal = 0;

      for (var m = 0; m < arrJiShu.length; m++) {
        sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
      }

      for (var n = 0; n < arrOuShu.length; n++) {
        sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
      }

      for (var p = 0; p < jishu_child1.length; p++) {
        sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
        sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
      } //计算总和


      sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2); //计算Luhm值

      var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
      var luhm = 10 - k;

      if (lastNum == luhm) {
        //$("#banknoInfo").html("Luhm验证通过");
        return true;
      } else {
        //$("#banknoInfo").html("银行卡号必须符合Luhm校验");
        return false;
      }
    },
    // 验证营业执照是否合法 
    isBusinessLicense: function isBusinessLicense(busCode) {
      var ret = false;

      if (busCode.length == 15) {
        var sum = 0;
        var s = [],
            p = [],
            a = [],
            m = 10;
        p[0] = m;

        for (var _i3 = 0; _i3 < busCode.length; _i3++) {
          a[_i3] = parseInt(busCode.substring(_i3, _i3 + 1), m);
          s[_i3] = p[_i3] % (m + 1) + a[_i3];

          if (0 == s[_i3] % m) {
            p[_i3 + 1] = 10 * 2;
          } else {
            p[_i3 + 1] = s[_i3] % m * 2;
          }
        }

        if (1 == s[14] % m) {
          ret = true;
        } else {
          ret = false;
        }
      } else {
        ret = false;
      }

      return ret;
    },
    /// 验证营业执照是否合法 三证合一
    isBizLicense: function isBizLicense(busCode) {
      this.firstarray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
      this.firstkeys = [3, 7, 9, 10, 5, 8, 4, 2];
      this.secondarray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'T', 'U', 'W', 'X', 'Y'];
      this.secondkeys = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28];

      this.calc = function (code, array1, array2, b) {
        var count = 0;

        for (var _i4 = 0; _i4 < array2.length; _i4++) {
          var a = code[_i4];
          count += array2[_i4] * array1.indexOf(a);
        }

        return b - count % b;
      };

      var code = busCode.toUpperCase();

      if (code.length != 18) {
        return false;
      }

      var reg = /^\w\w\d{6}\w{9}\w$/;

      if (!reg.test(code)) {
        return false;
      }

      reg = /^[1,5,9,Y]\w\d{6}\w{9}\w$/;

      if (!reg.test(code)) {
        return false;
      }

      reg = /^(11|12|13|19|51|52|53|59|91|92|93|Y1)\d{6}\w{9}\w$/;

      if (!reg.test(code)) {
        return false;
      }

      reg = /^(11|12|13|19|51|52|53|59|91|92|93|Y1)\d{6}\w{9}\w$/;

      if (!reg.test(code)) {
        return false;
      }

      var firstkey = this.calc(code.substr(8), this.firstarray, this.firstkeys, 11);
      var firstword;

      if (firstkey < 10) {
        firstword = firstkey;
      }

      if (firstkey == 10) {
        firstword = 'X';
      } else if (firstkey == 11) {
        firstword = '0';
      }

      if (firstword != code.substr(16, 1)) {
        return false;
      }

      var secondkey = this.calc(code, this.secondarray, this.secondkeys, 31);
      var secondword = this.secondarray[secondkey];

      if (secondword == undefined || secondword != code.substr(17, 1)) {
        return false;
      }

      var word = code.substr(0, 16) + firstword + secondword;

      if (code != word) {// return false;
      }

      return true;
    }
  },
  util: {
    //日期对象
    date: {
      //获取当前日期
      getDate: function getDate(days) {
        var d = new Date();

        if (days != undefined) {
          var milliseconds = days * 24 * 60 * 60 * 1000;
          var timestamp = Date.parse(d);
          return new Date(timestamp + milliseconds);
        }

        return d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
      },
      //获取当前时间
      getDateTimeNow: function getDateTimeNow(days) {
        var d = new Date();

        if (days != undefined) {
          d.setDate(d.getDate() + days);
        }

        return d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
      },
      //日期格式化
      DateFormat: function DateFormat(date, format) {
        var d = new Date(date.replace(/-/g, '/'));
        var o = {
          "M+": d.getMonth() + 1,
          "d+": d.getDate(),
          "h+": d.getHours(),
          "m+": d.getMinutes(),
          "s+": d.getSeconds(),
          "q+": Math.floor((d.getMonth() + 3) / 3),
          "S": d.getMilliseconds()
        };

        if (/(y+)/.test(format)) {
          format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
          if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
          }
        }

        return format;
      },
      //json格式日期处理
      ChangeDateFormat: function ChangeDateFormat(time) {
        if (time != null) {
          if (time.indexOf('T') != -1) {
            return time.substr(0, time.indexOf('T'));
          }

          var date = new Date(parseInt(time.replace("/Date(", "").replace(")/", ""), 10));
          var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
          var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
          return date.getFullYear() + "-" + month + "-" + currentDate;
        }

        return "";
      },
      //json格式日期处理（时分秒）
      ChangeCompleteDateFormat: function ChangeCompleteDateFormat(time) {
        if (time != null) {
          if (time.indexOf('T') != -1) {
            if (time.indexOf('.') != -1) {
              time = time.substr(0, time.indexOf('.'));
            }

            return time.replace('T', ' ');
          }

          var date = new Date(parseInt(time.replace("/Date(", "").replace(")/", ""), 10));
          var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
          var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
          return date.getFullYear() + "-" + month + "-" + currentDate + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        }

        return "";
      },
      //json格式日期处理（时分秒）
      ChangeComDateFormat: function ChangeComDateFormat(time) {
        if (time != null) {
          if (time.indexOf('T') != -1) {
            if (time.indexOf('.') != -1) {
              time = time.substr(0, time.indexOf('.'));
            }

            return time.replace('T', ' ');
          }

          var date = new Date(parseInt(time.replace("/Date(", "").replace(")/", ""), 10));
          var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
          var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
          return date.getFullYear() + "-" + month + "-" + currentDate + " " + date.getHours() + ":" + date.getMinutes();
        }

        return "";
      },
      //时间比较
      CompareDate: function CompareDate(t1, t2) {
        t1 = new Date(this.ChangeDateFormat(t1));
        t2 = new Date(this.ChangeDateFormat(t2));
        return t1 > t2;
      },
      //时间比较
      CompareDateNow: function CompareDateNow(t1) {
        return new Date(t1.replace(new RegExp(/-/gm), "/")) > new Date(this.getDateTimeNow().replace(new RegExp(/-/gm), "/"));
      }
    },
    //判断环境
    getEnv: function getEnv() {
      if (window != undefined) {
        var ua = window.navigator.userAgent.toLowerCase();

        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          //微信公众号
          return 'wxweb';
        } else {
          return 'web';
        }
      } else {
        //小程序环境下逻辑 
        if (wx.request != undefined) {
          return 'wxmini';
        }
      }
    },
    //生成流水号
    getSerialNum: function getSerialNum(prefix, len) {
      var now = new Date();
      var year = now.getFullYear().toString().substr(2, 2);
      var month = now.getMonth() + 1;
      var day = now.getDate();
      var hour = now.getHours();
      var minutes = now.getMinutes();
      var seconds = now.getSeconds();
      var milliSeconds = now.getMilliseconds();
      month = String(month).length < 2 ? "0" + month.toString() : month;
      day = String(day).length < 2 ? "0" + day.toString() : day;
      hour = String(hour).length < 2 ? "0" + hour.toString() : hour;
      minutes = String(minutes).length < 2 ? "0" + minutes.toString() : minutes;
      seconds = String(seconds).length < 2 ? "0" + seconds.toString() : seconds;

      if (String(milliSeconds).length == 1) {
        milliSeconds = "00" + milliSeconds.toString();
      } else if (String(milliSeconds).length == 2) {
        milliSeconds = "0" + milliSeconds.toString();
      }

      var str_random = '';

      if (len > 15) {
        var chars = '0123456789';
        var maxPos = chars.length;

        for (var _i5 = 0; _i5 < len - 15; _i5++) {
          str_random += chars.charAt(Math.floor(Math.random() * maxPos));
        }
      }

      var str = "".concat(year).concat(month).concat(day).concat(hour).concat(minutes).concat(seconds).concat(milliSeconds) + str_random;

      if (prefix != undefined && prefix != null) {
        return prefix + str;
      }

      return str;
    },
    //获取最小值到最大值之前的整数随机数
    getRandom: function getRandom(Min, Max) {
      var Range = Max - Min;
      var Rand = Math.random();
      return Min + Math.round(Rand * Range);
    },
    //比对sku字符串
    compareSku: function compareSku(sku1, sku2) {
      var exist = 0;
      var arr = sku1.split(',');
      var arr1 = sku2.split(','); //sku集合是否一致

      if (arr.length != arr1.length) {
        return false;
      }

      arr.forEach(function (o, i) {
        arr1.forEach(function (oo, ii) {
          if (oo == o) {
            exist++;
          }
        });
      });
      return arr.length == exist;
    },
    //获取SKU信息
    getCustomName: function getCustomName(specCustoms, name_id, val_id, val) {
      var custom_name = val;
      specCustoms.forEach(function (item, index) {
        if (name_id == item.specname_id && val_id == item.specvalue_id && item.custom_value != '') {
          custom_name = item.custom_value;
          return;
        }
      });
      return custom_name;
    },
    //本地文件转成base64
    fileToBase64: function fileToBase64() {
      return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function () {
          // 图片转base64完成后返回reader对象
          resolve(reader);
        };

        reader.onerror = reject;
      });
    },
    //隐藏手机
    getHideMobile: function getHideMobile(tel) {
      if (tel == null || tel == undefined) return;
      var reg = /^(\d{3})\d{4}(\d{4})$/;
      return tel.replace(reg, "$1****$2");
    },
    //字符串截取
    cutSubString: function cutSubString(str, len) {
      if (!str || !len) {
        return '';
      }

      var l = 0;
      var temp = '';

      for (var _i6 = 0, m = str.length; _i6 < m; _i6++) {
        l++;

        if (str.charCodeAt(_i6) > 255) {
          l++;
        }

        if (l > len) {
          return temp + '...';
        }

        temp += str.charAt(_i6);
      }

      return str;
    },
    //金额格式
    formaToMoney: function formaToMoney(s, n) {
      n = n > 0 && n <= 20 ? n : 2;
      f = s < 0 ? "-" : ""; //判断是否为负数  

      s = parseFloat((Math.abs(s) + "").replace(/[^\d\.-]/g, "")).toFixed(n) + ""; //取绝对值处理, 更改这里n数也可确定要保留的小数位  

      var l = s.split(".")[0].split("").reverse(),
          r = s.split(".")[1];
      t = "";

      for (i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "," : "");
      }

      return f + t.split("").reverse().join("") + "." + r.substring(0, 2); //保留2位小数  如果要改动 把substring 最后一位数改动就可  
    },
    //获取原图地址
    getImgUrl: function getImgUrl(url) {
      if (undefined == url || $.trim(url).length == 0) return this.getResDomain() + "/Content/DefaultRes/Images/default_book.jpg";

      if (url.indexOf("http://") != -1) {
        return url;
      } else {
        return this.getResDomain() + url;
      }
    },
    //获取小图地址
    getImgUrl_s: function getImgUrl_s(url) {
      if (undefined == url || $.trim(url).length == 0) return this.getResDomain() + "/Content/DefaultRes/Images/default_book.jpg";

      if (url.indexOf("http://") != -1) {
        return url.replace("/Image/", /Thm_Image/);
      } else {
        return this.getResDomain() + url.replace("/Image/", /Thm_Image/);
      }
    },
    //获取中图地址
    getImgUrl_m: function getImgUrl_m(url) {
      if (undefined == url || $.trim(url).length == 0) return this.getResDomain() + "/Content/DefaultRes/Images/default_book.jpg";

      if (url.indexOf("http://") != -1) {
        return url.replace("/Image/", /Med_Image/);
      } else {
        return this.getResDomain() + url.replace("/Image/", /Med_Image/);
      }
    },
    //获取Oss图片地址
    getOssImgUrl: function getOssImgUrl(filename, param) {
      if (undefined == filename || filename == null || $.trim(filename).length == 0) {
        return this.getDomain() + "/Content/DefaultRes/Image/NoProduct.jpg";
      }

      if (undefined == param || param == null || $.trim(param).length == 0) {
        if (filename.indexOf("http://") != -1) {
          return filename;
        }

        return App_Config.getOssDomain() + filename;
      }

      if (filename.indexOf("http://") != -1) {
        return filename + param;
      } else {
        return App_Config.getOssDomain() + filename + param;
      }
    },
    //获取页面请求参数
    getUrlParam: function getUrlParam(name) {
      var search = window.location.search;
      var hash = window.location.hash;

      if (search.length) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");

        var _r = search.substr(1).match(reg);

        if (_r != null) return unescape(decodeURI(_r[2]));
        return null;
      } else if (hash.length) {
        var _reg = new RegExp(name + '=([^&]+)');

        var match = _reg.exec(hash);

        if (match) {
          return match[1];
        }

        return match;
      }

      return null;
    },
    //获取页面请求参数中的ID
    getRequestId: function getRequestId(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(decodeURI(r[2]));
      return 0;
    },
    //获取Html前缀参数
    getHtmlId: function getHtmlId() {
      var url = window.location.href;
      var s_index = url.lastIndexOf('/');
      var e_index = url.lastIndexOf('.html');
      return url.substring(s_index + 1, e_index);
    },
    //获取网站域名
    getDomain: function getDomain() {
      return window.location.protocol + '//' + window.location.host;
    },
    //获取资源站点域名
    getResDomain: function getResDomain() {
      return "http://libres.crrcelectric.com:9080/";
    },
    //获取原始URL
    getRawUrl: function getRawUrl() {
      return window.document.location.href;
    },
    //获取自定义json字符串 
    getJsonString: function getJsonString(attr, datas) {
      return JSON.stringify(app_g.Util.getJson(attr, datas));
    },
    //判断是否是数组
    isArray: function isArray(object) {
      return _typeof(object) == 'object' && object.constructor == Array;
    },
    //判断是否为函数
    isFunction: function isFunction(object) {
      return typeof object == 'function' && object.constructor == Function;
    },
    //判断是否为字符串类型
    isString: function isString(object) {
      return object != null && object != undefined && typeof object == 'string' && object.constructor == String;
    },
    //判断是否是对象
    isJQuery: function isJQuery(object) {
      return object instanceof jQuery;
    },
    //判断是否是对象
    isObject: function isObject(object) {
      return _typeof(object) == 'object' && object.constructor == Object;
    },
    //判断是否为数值类型
    isNum: function isNum(object) {
      return !isNaN(object);
    },
    parseInt: function parseInt(value) {
      return Number(value);
    }
  }
};
exports.default = _default;

/***/ }),

/***/ 15:
/*!*********************************!*\
  !*** ./src/modules/userInfo.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _api = _interopRequireDefault(__webpack_require__(/*! @/modules/api */ 13));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  data: {
    user: {
      token: ''
    },
    //购物车信息
    sCartOrder: {},
    //立即购买临时数据
    buyNowOrder: {},
    historyKeyWord: [],
    hisCourseKeyWord: [],
    historyProduct: [],
    pdtListLayout: 1
  },
  methods: {
    //获取用户信息
    getUser: function getUser() {
      //同步获取token
      var user1 = uni.getStorageSync('user_info');

      if (user1) {
        return JSON.parse(user1);
      }

      return {
        token: ''
      };
    },
    //登录设置本地数据
    login: function login(result) {
      this.user = result; //同步步设置用户信息

      uni.setStorageSync('user_info', JSON.stringify(result));
    },
    //登录设置本地数据
    loginOut: function loginOut() {
      this.user = {
        token: ''
      };
      uni.removeStorage({
        key: 'token',
        success: function success(res) {}
      });
      uni.removeStorage({
        key: 'user_info',
        success: function success(res) {}
      });
    },
    //刷新登录
    refreshLogin: function refreshLogin(cb) {
      var $this = this;
      this.post(_api.default.api_300, this.GetSign(), function (vue, res) {
        console.log(res.data.Result);

        if (res.data.Basis.State == _api.default.state.state_200) {
          $this.login(res.data.Result);
          cb(res.data.Result);
        } else {
          vue.$vux.toast.text(res.data.Basis.Msg, 'default');
        }
      });
    },
    //清空购物
    clearShoppingCart: function clearShoppingCart(result) {
      this.sCartOrder = []; //同步清空购物

      uni.removeStorageSync({
        key: 'sCartOrder',
        data: result.token,
        success: function success() {}
      });
    },
    //设置购物车
    setShoppingCart: function setShoppingCart(result) {
      this.sCartOrder = result; //异步设置购物车

      uni.setStorageSync({
        key: 'sCartOrder',
        data: JSON.stringify(result),
        success: function success() {}
      });
    },
    //设置立即购买
    setBuyNow: function setBuyNow(result) {
      this.buyNowOrder = result; //同步设置提交立即购买

      uni.setStorageSync('buyNowOrder', JSON.stringify(result));
    },
    //获取立即购买
    getBuyNow: function getBuyNow(result) {
      var entity = uni.getStorageSync('buyNowOrder');

      if (entity) {
        return JSON.parse(entity);
      }

      return null;
    },
    //设置历史查看商品
    setHistoryProduct: function setHistoryProduct(result) {
      if (result == undefined || result == '') return;
      var products = window.localStorage.getItem("historyProduct");

      if (products == null) {
        products = [];
        products.push(result);
      } else {
        products = JSON.parse(products);

        if (!products.some(function (ele) {
          return ele.id == result.id;
        })) {
          products.splice(0, 0, result);

          if (products.length > 10) {
            products.splice(products.length - 1, 1);
          }
        }
      }

      window.localStorage.setItem("historyProduct", JSON.stringify(products));
      this.historyProduct = products;
    },
    //设置商品列表页布局
    setPdtListLayout: function setPdtListLayout(result) {
      if (result == undefined || result == '') return;
      window.localStorage.setItem("pdtListLayout", result);
      this.pdtListLayout = result;
    },
    //设置历史查询关键词
    setHistoryKeyWord: function setHistoryKeyWord(result) {
      if (result == undefined || result == '') return;
      var keyWords = window.localStorage.getItem("historyKeyWord");

      if (keyWords == null) {
        keyWords = [];
        keyWords.push(result);
      } else {
        keyWords = JSON.parse(keyWords);

        if (!keyWords.some(function (ele) {
          return ele == result;
        })) {
          keyWords.splice(0, 0, result);

          if (keyWords.length > 10) {
            keyWords.splice(keyWords.length - 1, 1);
          }
        }
      }

      window.localStorage.setItem("historyKeyWord", JSON.stringify(keyWords));
      this.historyKeyWord = keyWords;
    },
    //设置课程查询历史关键词
    setHisCourseKeyWord: function setHisCourseKeyWord(result) {
      if (result == undefined || result == '') return;
      var keyWords = window.localStorage.getItem("hisCourseKeyWord");

      if (keyWords == null) {
        keyWords = [];
        keyWords.push(result);
      } else {
        keyWords = JSON.parse(keyWords);

        if (!keyWords.some(function (ele) {
          return ele == result;
        })) {
          keyWords.splice(0, 0, result);

          if (keyWords.length > 10) {
            keyWords.splice(keyWords.length - 1, 1);
          }
        }
      }

      window.localStorage.setItem("hisCourseKeyWord", JSON.stringify(keyWords));
      this.hisCourseKeyWord = keyWords;
    },
    //删除单个历史查询关键词
    delHistoryKeyWord: function delHistoryKeyWord(keyword) {
      var _this = this;

      if (this.historyKeyWord.length == 0) return;
      this.historyKeyWord.forEach(function (ele, index) {
        if (ele == keyword) {
          _this.historyKeyWord.splice(index, 1);
        }
      });
      window.localStorage.setItem("historyKeyWord", JSON.stringify(this.historyKeyWord));
      this.historyKeyWord = this.historyKeyWord;
    },
    //删除课程单个历史查询关键词
    delHisCourseKeyWord: function delHisCourseKeyWord(keyword) {
      var _this2 = this;

      if (this.hisCourseKeyWord.length == 0) return;
      this.hisCourseKeyWord.forEach(function (ele, index) {
        if (ele == keyword) {
          _this2.hisCourseKeyWord.splice(index, 1);
        }
      });
      window.localStorage.setItem("hisCourseKeyWord", JSON.stringify(this.hisCourseKeyWord));
      this.hisCourseKeyWord = this.hisCourseKeyWord;
    },
    //清空历史查询关键词
    clearHistoryKeyWord: function clearHistoryKeyWord() {
      if (this.historyKeyWord.length == 0) return;
      window.localStorage.setItem("historyKeyWord", JSON.stringify([]));
      this.historyKeyWord = [];
    },
    //清空历史查询关键词
    clearHisCourseKeyWord: function clearHisCourseKeyWord() {
      if (this.hisCourseKeyWord.length == 0) return;
      this.$vux.confirm.show({
        title: '确认清空吗',
        onCancel: function onCancel() {},
        onConfirm: function onConfirm() {
          window.localStorage.setItem("hisCourseKeyWord", JSON.stringify([]));
          this.hisCourseKeyWord = [];
        }
      });
    },
    //是否登录
    isLogin: function isLogin() {
      var user = this.getUser();

      if (user.token.length) {
        return true;
      }

      return false;
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 16:
/*!********************************************!*\
  !*** ./node_modules/blueimp-md5/js/md5.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
 * JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/* global define */

/* eslint-disable strict */

;(function ($) {
  'use strict'

  /**
   * Add integers, wrapping at 2^32.
   * This uses 16-bit operations internally to work around bugs in interpreters.
   *
   * @param {number} x First integer
   * @param {number} y Second integer
   * @returns {number} Sum
   */
  function safeAdd(x, y) {
    var lsw = (x & 0xffff) + (y & 0xffff)
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
    return (msw << 16) | (lsw & 0xffff)
  }

  /**
   * Bitwise rotate a 32-bit number to the left.
   *
   * @param {number} num 32-bit number
   * @param {number} cnt Rotation count
   * @returns {number} Rotated number
   */
  function bitRotateLeft(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt))
  }

  /**
   * Basic operation the algorithm uses.
   *
   * @param {number} q q
   * @param {number} a a
   * @param {number} b b
   * @param {number} x x
   * @param {number} s s
   * @param {number} t t
   * @returns {number} Result
   */
  function md5cmn(q, a, b, x, s, t) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b)
  }
  /**
   * Basic operation the algorithm uses.
   *
   * @param {number} a a
   * @param {number} b b
   * @param {number} c c
   * @param {number} d d
   * @param {number} x x
   * @param {number} s s
   * @param {number} t t
   * @returns {number} Result
   */
  function md5ff(a, b, c, d, x, s, t) {
    return md5cmn((b & c) | (~b & d), a, b, x, s, t)
  }
  /**
   * Basic operation the algorithm uses.
   *
   * @param {number} a a
   * @param {number} b b
   * @param {number} c c
   * @param {number} d d
   * @param {number} x x
   * @param {number} s s
   * @param {number} t t
   * @returns {number} Result
   */
  function md5gg(a, b, c, d, x, s, t) {
    return md5cmn((b & d) | (c & ~d), a, b, x, s, t)
  }
  /**
   * Basic operation the algorithm uses.
   *
   * @param {number} a a
   * @param {number} b b
   * @param {number} c c
   * @param {number} d d
   * @param {number} x x
   * @param {number} s s
   * @param {number} t t
   * @returns {number} Result
   */
  function md5hh(a, b, c, d, x, s, t) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t)
  }
  /**
   * Basic operation the algorithm uses.
   *
   * @param {number} a a
   * @param {number} b b
   * @param {number} c c
   * @param {number} d d
   * @param {number} x x
   * @param {number} s s
   * @param {number} t t
   * @returns {number} Result
   */
  function md5ii(a, b, c, d, x, s, t) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t)
  }

  /**
   * Calculate the MD5 of an array of little-endian words, and a bit length.
   *
   * @param {Array} x Array of little-endian words
   * @param {number} len Bit length
   * @returns {Array<number>} MD5 Array
   */
  function binlMD5(x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << len % 32
    x[(((len + 64) >>> 9) << 4) + 14] = len

    var i
    var olda
    var oldb
    var oldc
    var oldd
    var a = 1732584193
    var b = -271733879
    var c = -1732584194
    var d = 271733878

    for (i = 0; i < x.length; i += 16) {
      olda = a
      oldb = b
      oldc = c
      oldd = d

      a = md5ff(a, b, c, d, x[i], 7, -680876936)
      d = md5ff(d, a, b, c, x[i + 1], 12, -389564586)
      c = md5ff(c, d, a, b, x[i + 2], 17, 606105819)
      b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330)
      a = md5ff(a, b, c, d, x[i + 4], 7, -176418897)
      d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426)
      c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341)
      b = md5ff(b, c, d, a, x[i + 7], 22, -45705983)
      a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416)
      d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417)
      c = md5ff(c, d, a, b, x[i + 10], 17, -42063)
      b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162)
      a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682)
      d = md5ff(d, a, b, c, x[i + 13], 12, -40341101)
      c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290)
      b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329)

      a = md5gg(a, b, c, d, x[i + 1], 5, -165796510)
      d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632)
      c = md5gg(c, d, a, b, x[i + 11], 14, 643717713)
      b = md5gg(b, c, d, a, x[i], 20, -373897302)
      a = md5gg(a, b, c, d, x[i + 5], 5, -701558691)
      d = md5gg(d, a, b, c, x[i + 10], 9, 38016083)
      c = md5gg(c, d, a, b, x[i + 15], 14, -660478335)
      b = md5gg(b, c, d, a, x[i + 4], 20, -405537848)
      a = md5gg(a, b, c, d, x[i + 9], 5, 568446438)
      d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690)
      c = md5gg(c, d, a, b, x[i + 3], 14, -187363961)
      b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501)
      a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467)
      d = md5gg(d, a, b, c, x[i + 2], 9, -51403784)
      c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473)
      b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734)

      a = md5hh(a, b, c, d, x[i + 5], 4, -378558)
      d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463)
      c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562)
      b = md5hh(b, c, d, a, x[i + 14], 23, -35309556)
      a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060)
      d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353)
      c = md5hh(c, d, a, b, x[i + 7], 16, -155497632)
      b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640)
      a = md5hh(a, b, c, d, x[i + 13], 4, 681279174)
      d = md5hh(d, a, b, c, x[i], 11, -358537222)
      c = md5hh(c, d, a, b, x[i + 3], 16, -722521979)
      b = md5hh(b, c, d, a, x[i + 6], 23, 76029189)
      a = md5hh(a, b, c, d, x[i + 9], 4, -640364487)
      d = md5hh(d, a, b, c, x[i + 12], 11, -421815835)
      c = md5hh(c, d, a, b, x[i + 15], 16, 530742520)
      b = md5hh(b, c, d, a, x[i + 2], 23, -995338651)

      a = md5ii(a, b, c, d, x[i], 6, -198630844)
      d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415)
      c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905)
      b = md5ii(b, c, d, a, x[i + 5], 21, -57434055)
      a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571)
      d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606)
      c = md5ii(c, d, a, b, x[i + 10], 15, -1051523)
      b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799)
      a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359)
      d = md5ii(d, a, b, c, x[i + 15], 10, -30611744)
      c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380)
      b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649)
      a = md5ii(a, b, c, d, x[i + 4], 6, -145523070)
      d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379)
      c = md5ii(c, d, a, b, x[i + 2], 15, 718787259)
      b = md5ii(b, c, d, a, x[i + 9], 21, -343485551)

      a = safeAdd(a, olda)
      b = safeAdd(b, oldb)
      c = safeAdd(c, oldc)
      d = safeAdd(d, oldd)
    }
    return [a, b, c, d]
  }

  /**
   * Convert an array of little-endian words to a string
   *
   * @param {Array<number>} input MD5 Array
   * @returns {string} MD5 string
   */
  function binl2rstr(input) {
    var i
    var output = ''
    var length32 = input.length * 32
    for (i = 0; i < length32; i += 8) {
      output += String.fromCharCode((input[i >> 5] >>> i % 32) & 0xff)
    }
    return output
  }

  /**
   * Convert a raw string to an array of little-endian words
   * Characters >255 have their high-byte silently ignored.
   *
   * @param {string} input Raw input string
   * @returns {Array<number>} Array of little-endian words
   */
  function rstr2binl(input) {
    var i
    var output = []
    output[(input.length >> 2) - 1] = undefined
    for (i = 0; i < output.length; i += 1) {
      output[i] = 0
    }
    var length8 = input.length * 8
    for (i = 0; i < length8; i += 8) {
      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << i % 32
    }
    return output
  }

  /**
   * Calculate the MD5 of a raw string
   *
   * @param {string} s Input string
   * @returns {string} Raw MD5 string
   */
  function rstrMD5(s) {
    return binl2rstr(binlMD5(rstr2binl(s), s.length * 8))
  }

  /**
   * Calculates the HMAC-MD5 of a key and some data (raw strings)
   *
   * @param {string} key HMAC key
   * @param {string} data Raw input string
   * @returns {string} Raw MD5 string
   */
  function rstrHMACMD5(key, data) {
    var i
    var bkey = rstr2binl(key)
    var ipad = []
    var opad = []
    var hash
    ipad[15] = opad[15] = undefined
    if (bkey.length > 16) {
      bkey = binlMD5(bkey, key.length * 8)
    }
    for (i = 0; i < 16; i += 1) {
      ipad[i] = bkey[i] ^ 0x36363636
      opad[i] = bkey[i] ^ 0x5c5c5c5c
    }
    hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8)
    return binl2rstr(binlMD5(opad.concat(hash), 512 + 128))
  }

  /**
   * Convert a raw string to a hex string
   *
   * @param {string} input Raw input string
   * @returns {string} Hex encoded string
   */
  function rstr2hex(input) {
    var hexTab = '0123456789abcdef'
    var output = ''
    var x
    var i
    for (i = 0; i < input.length; i += 1) {
      x = input.charCodeAt(i)
      output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f)
    }
    return output
  }

  /**
   * Encode a string as UTF-8
   *
   * @param {string} input Input string
   * @returns {string} UTF8 string
   */
  function str2rstrUTF8(input) {
    return unescape(encodeURIComponent(input))
  }

  /**
   * Encodes input string as raw MD5 string
   *
   * @param {string} s Input string
   * @returns {string} Raw MD5 string
   */
  function rawMD5(s) {
    return rstrMD5(str2rstrUTF8(s))
  }
  /**
   * Encodes input string as Hex encoded string
   *
   * @param {string} s Input string
   * @returns {string} Hex encoded string
   */
  function hexMD5(s) {
    return rstr2hex(rawMD5(s))
  }
  /**
   * Calculates the raw HMAC-MD5 for the given key and data
   *
   * @param {string} k HMAC key
   * @param {string} d Input string
   * @returns {string} Raw MD5 string
   */
  function rawHMACMD5(k, d) {
    return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d))
  }
  /**
   * Calculates the Hex encoded HMAC-MD5 for the given key and data
   *
   * @param {string} k HMAC key
   * @param {string} d Input string
   * @returns {string} Raw MD5 string
   */
  function hexHMACMD5(k, d) {
    return rstr2hex(rawHMACMD5(k, d))
  }

  /**
   * Calculates MD5 value for a given string.
   * If a key is provided, calculates the HMAC-MD5 value.
   * Returns a Hex encoded string unless the raw argument is given.
   *
   * @param {string} string Input string
   * @param {string} [key] HMAC key
   * @param {boolean} [raw] Raw output switch
   * @returns {string} MD5 output
   */
  function md5(string, key, raw) {
    if (!key) {
      if (!raw) {
        return hexMD5(string)
      }
      return rawMD5(string)
    }
    if (!raw) {
      return hexHMACMD5(key, string)
    }
    return rawHMACMD5(key, string)
  }

  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return md5
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
  } else {}
})(this)


/***/ }),

/***/ 17:
/*!****************************!*\
  !*** ./src/store/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));

var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 18));

var _storeG = _interopRequireDefault(__webpack_require__(/*! ./storeG */ 19));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue.default.use(_vuex.default);

var store = new _vuex.default.Store({
  modules: {
    storeG: _storeG.default
  },
  state: {
    textColor: '#FFFFFF',
    bgColor: '#004EA2'
  },
  mutations: {},
  actions: {},
  getters: {
    textColor: function textColor(state) {
      return state.textColor;
    },
    bgColor: function bgColor(state) {
      return state.bgColor;
    }
  }
});
var _default = store;
exports.default = _default;

/***/ }),

/***/ 18:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: default, Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.1.1
 * (c) 2019 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if (true) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
     true &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if (true) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return result.then(function (res) {
    try {
      this$1._actionSubscribers
        .filter(function (sub) { return sub.after; })
        .forEach(function (sub) { return sub.after(action, this$1.state); });
    } catch (e) {
      if (true) {
        console.warn("[vuex] error in after action subscribers: ");
        console.error(e);
      }
    }
    return res
  })
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure enviroment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ( true && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.1.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};

/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 19:
/*!*****************************!*\
  !*** ./src/store/storeG.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _appGlobal = _interopRequireDefault(__webpack_require__(/*! @/modules/appGlobal */ 14));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var global = {
  dialog: {
    title: '请求中',
    //上中下 1，2，3
    layout: 3,
    //显示时间
    times: 2500,
    //加载状态
    loading: false
  },
  //底部导航图片索引
  bottomNav: {
    index: 0
  } // mutations

};
var mutations = {
  showLoading: function showLoading(state) {
    var item = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (item.title) {
      global.dialog.title = item.title;
    }

    if (item.layout) {
      global.dialog.layout = item.layout;
    } //加载状态


    global.dialog.loading = item.loading == undefined ? true : item.loading;

    var env = _appGlobal.default.util.getEnv();

    switch (env) {
      case 'wxweb':
        global.dialog.loading = item.loading == undefined ? true : item.loading;

      case 'wxmini':
        if (global.dialog.loading) {
          if (item.times == undefined) {
            wx.showLoading({
              title: global.dialog.title,
              mask: global.dialog.loading
            });
          } else {
            wx.showToast({
              title: global.dialog.title,
              icon: 'none',
              duration: item.times
            });
          }
        } else {
          wx.hideLoading();
        }

      default:
        break;
    }
  },
  setBottomNav: function setBottomNav() {
    var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    global.dialog.index = item.index == undefined ? 0 : item.index;
  }
};
var _default = {
  global: global,
  mutations: mutations
};
exports.default = _default;

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!***************************************!*\
  !*** ./src/modules/WXBizDataCrypt.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Crypto = __webpack_require__(/*! ./cryptojs/cryptojs.js */ 21).Crypto;

function WXBizDataCrypt(appId, sessionKey) {
  this.appId = appId;
  this.sessionKey = sessionKey;
}

WXBizDataCrypt.prototype.decryptData = function (encryptedData, iv) {
  // base64 decode ：使用 CryptoJS 中 Crypto.util.base64ToBytes()进行 base64解码
  var encryptedData = Crypto.util.base64ToBytes(encryptedData);
  var key = Crypto.util.base64ToBytes(this.sessionKey);
  var iv = Crypto.util.base64ToBytes(iv); // 对称解密使用的算法为 AES-128-CBC，数据采用PKCS#7填充

  var mode = new Crypto.mode.CBC(Crypto.pad.pkcs7);

  try {
    // 解密
    var bytes = Crypto.AES.decrypt(encryptedData, key, {
      asBpytes: true,
      iv: iv,
      mode: mode
    });
    var decryptResult = JSON.parse(bytes);
  } catch (err) {
    console.log(err);
  }

  if (decryptResult.watermark.appid !== this.appId) {
    console.log(err);
  }

  return decryptResult;
};

module.exports = WXBizDataCrypt;

/***/ }),

/***/ 21:
/*!******************************************!*\
  !*** ./src/modules/cryptojs/cryptojs.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Crypto = exports.Crypto = __webpack_require__(/*! ./lib/Crypto */ 22).Crypto;

__webpack_require__(/*! ./lib/CryptoMath */ 23);

__webpack_require__(/*! ./lib/BlockModes */ 24);

__webpack_require__(/*! ./lib/DES */ 25);

__webpack_require__(/*! ./lib/AES */ 26);

__webpack_require__(/*! ./lib/HMAC */ 27);

__webpack_require__(/*! ./lib/MARC4 */ 28);

__webpack_require__(/*! ./lib/MD5 */ 29);

__webpack_require__(/*! ./lib/PBKDF2 */ 30);

__webpack_require__(/*! ./lib/PBKDF2Async */ 31);

__webpack_require__(/*! ./lib/Rabbit */ 33);

__webpack_require__(/*! ./lib/SHA1 */ 34);

__webpack_require__(/*! ./lib/SHA256 */ 35); //二傻的微信不支持动态引用 我凸
// [ 'CryptoMath'
// , 'BlockModes'
// , 'DES'
// , 'AES'
// , 'HMAC'
// , 'MARC4'
// , 'MD5'
// , 'PBKDF2'
// , 'PBKDF2Async'
// , 'Rabbit'
// , 'SHA1'
// , 'SHA256'
// ].forEach( function (path) { 
// 	require('./lib/' + path);
// });

/***/ }),

/***/ 22:
/*!********************************************!*\
  !*** ./src/modules/cryptojs/lib/Crypto.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (typeof Crypto == "undefined" || !Crypto.util) {
  (function () {
    var base64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"; // Global Crypto object
    // with browser window or with node module

    var Crypto = typeof window === 'undefined' ? exports.Crypto = {} : window.Crypto = {}; // Crypto utilities

    var util = Crypto.util = {
      // Bit-wise rotate left
      rotl: function rotl(n, b) {
        return n << b | n >>> 32 - b;
      },
      // Bit-wise rotate right
      rotr: function rotr(n, b) {
        return n << 32 - b | n >>> b;
      },
      // Swap big-endian to little-endian and vice versa
      endian: function endian(n) {
        // If number given, swap endian
        if (n.constructor == Number) {
          return util.rotl(n, 8) & 0x00FF00FF | util.rotl(n, 24) & 0xFF00FF00;
        } // Else, assume array and swap all items


        for (var i = 0; i < n.length; i++) {
          n[i] = util.endian(n[i]);
        }

        return n;
      },
      // Generate an array of any length of random bytes
      randomBytes: function randomBytes(n) {
        for (var bytes = []; n > 0; n--) {
          bytes.push(Math.floor(Math.random() * 256));
        }

        return bytes;
      },
      // Convert a byte array to big-endian 32-bit words
      bytesToWords: function bytesToWords(bytes) {
        for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8) {
          words[b >>> 5] |= (bytes[i] & 0xFF) << 24 - b % 32;
        }

        return words;
      },
      // Convert big-endian 32-bit words to a byte array
      wordsToBytes: function wordsToBytes(words) {
        for (var bytes = [], b = 0; b < words.length * 32; b += 8) {
          bytes.push(words[b >>> 5] >>> 24 - b % 32 & 0xFF);
        }

        return bytes;
      },
      // Convert a byte array to a hex string
      bytesToHex: function bytesToHex(bytes) {
        for (var hex = [], i = 0; i < bytes.length; i++) {
          hex.push((bytes[i] >>> 4).toString(16));
          hex.push((bytes[i] & 0xF).toString(16));
        }

        return hex.join("");
      },
      // Convert a hex string to a byte array
      hexToBytes: function hexToBytes(hex) {
        for (var bytes = [], c = 0; c < hex.length; c += 2) {
          bytes.push(parseInt(hex.substr(c, 2), 16));
        }

        return bytes;
      },
      // Convert a byte array to a base-64 string
      bytesToBase64: function bytesToBase64(bytes) {
        // Use browser-native function if it exists
        if (typeof btoa == "function") return btoa(Binary.bytesToString(bytes));

        for (var base64 = [], i = 0; i < bytes.length; i += 3) {
          var triplet = bytes[i] << 16 | bytes[i + 1] << 8 | bytes[i + 2];

          for (var j = 0; j < 4; j++) {
            if (i * 8 + j * 6 <= bytes.length * 8) base64.push(base64map.charAt(triplet >>> 6 * (3 - j) & 0x3F));else base64.push("=");
          }
        }

        return base64.join("");
      },
      // Convert a base-64 string to a byte array
      base64ToBytes: function base64ToBytes(base64) {
        // Use browser-native function if it exists
        if (typeof atob == "function") return Binary.stringToBytes(atob(base64)); // Remove non-base-64 characters

        base64 = base64.replace(/[^A-Z0-9+\/]/ig, "");

        for (var bytes = [], i = 0, imod4 = 0; i < base64.length; imod4 = ++i % 4) {
          if (imod4 == 0) continue;
          bytes.push((base64map.indexOf(base64.charAt(i - 1)) & Math.pow(2, -2 * imod4 + 8) - 1) << imod4 * 2 | base64map.indexOf(base64.charAt(i)) >>> 6 - imod4 * 2);
        }

        return bytes;
      }
    }; // Crypto character encodings

    var charenc = Crypto.charenc = {}; // UTF-8 encoding

    var UTF8 = charenc.UTF8 = {
      // Convert a string to a byte array
      stringToBytes: function stringToBytes(str) {
        return Binary.stringToBytes(unescape(encodeURIComponent(str)));
      },
      // Convert a byte array to a string
      bytesToString: function bytesToString(bytes) {
        return decodeURIComponent(escape(Binary.bytesToString(bytes)));
      }
    }; // Binary encoding

    var Binary = charenc.Binary = {
      // Convert a string to a byte array
      stringToBytes: function stringToBytes(str) {
        for (var bytes = [], i = 0; i < str.length; i++) {
          bytes.push(str.charCodeAt(i) & 0xFF);
        }

        return bytes;
      },
      // Convert a byte array to a string
      bytesToString: function bytesToString(bytes) {
        for (var str = [], i = 0; i < bytes.length; i++) {
          str.push(String.fromCharCode(bytes[i]));
        }

        return str.join("");
      }
    };
  })();
}

/***/ }),

/***/ 229:
/*!*******************************************!*\
  !*** ./src/components/evan-form/utils.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _asyncValidator = _interopRequireDefault(__webpack_require__(/*! async-validator */ 230));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var utils = {
  validate: function validate(model, rules, callback, options) {
    var initOptions = {
      showMessage: true
    };
    options = Object.assign({}, initOptions, options || {}); // 如果需要验证的fields为空，调用验证时立刻返回callback

    if ((!rules || rules.length === 0) && callback) {
      callback(true, null);
    }

    var errors = [];
    var props = Object.keys(rules);

    for (var i in props) {
      var prop = props[i];
      var value = utils.getValueByProp(model, prop);
      utils.validateItem(rules, prop, value, function (err) {
        if (err && err.length > 0) {
          errors = errors.concat(err);
        }
      });
    }

    if (errors.length > 0) {
      if (options.showMessage) {
        utils.showToast(errors[0].message);
      }

      callback(false, errors);
    } else {
      callback(true, null);
    }
  },
  validateField: function validateField(model, rules, props, callback, options) {
    var initOptions = {
      showMessage: true
    };
    options = Object.assign({}, initOptions, options || {});
    props = [].concat(props);

    if (props.length === 0) {
      return;
    }

    var errors = [];

    for (var i in props) {
      var prop = props[i];
      var value = utils.getValueByProp(model, prop);
      utils.validateItem(rules, prop, value, function (err) {
        if (err && err.length > 0) {
          errors = errors.concat(err);
        }
      });
    }

    if (errors.length > 0) {
      if (options.showMessage) {
        utils.showToast(errors[0].message);
      }

      callback(false, errors);
    } else {
      callback(true, null);
    }
  },
  validateItem: function validateItem(rules, prop, value, callback) {
    if (!rules || JSON.stringify(rules) === '{}') {
      if (callback instanceof Function) {
        callback();
      }

      return true;
    }

    var propRules = [].concat(rules[prop] || []);

    var descriptor = _defineProperty({}, prop, propRules);

    var validator = new _asyncValidator.default(descriptor);

    var model = _defineProperty({}, prop, value);

    validator.validate(model, {
      firstFields: true
    }, function (errors) {
      callback(errors);
    });
  },
  getValueByProp: function getValueByProp(obj, prop) {
    var tempObj = obj;
    prop = prop.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '');
    var keyArr = prop.split('.');
    var i = 0;

    for (var len = keyArr.length; i < len - 1; ++i) {
      if (!tempObj) break;
      var key = keyArr[i];

      if (key in tempObj) {
        tempObj = tempObj[key];
      } else {
        break;
      }
    }

    return tempObj ? typeof tempObj[keyArr[i]] === 'string' ? tempObj[keyArr[i]].trim() : tempObj[keyArr[i]] : null;
  },
  showToast: function showToast(message) {
    uni.showToast({
      title: message,
      icon: 'none'
    });
  }
};
var _default = utils;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 23:
/*!************************************************!*\
  !*** ./src/modules/cryptojs/lib/CryptoMath.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var C = typeof window === 'undefined' ? __webpack_require__(/*! ./Crypto */ 22).Crypto : window.Crypto; // Shortcut

  var util = C.util; // Convert n to unsigned 32-bit integer

  util.u32 = function (n) {
    return n >>> 0;
  }; // Unsigned 32-bit addition


  util.add = function () {
    var result = this.u32(arguments[0]);

    for (var i = 1; i < arguments.length; i++) {
      result = this.u32(result + this.u32(arguments[i]));
    }

    return result;
  }; // Unsigned 32-bit multiplication


  util.mult = function (m, n) {
    return this.add((n & 0xFFFF0000) * m, (n & 0x0000FFFF) * m);
  }; // Unsigned 32-bit greater than (>) comparison


  util.gt = function (m, n) {
    return this.u32(m) > this.u32(n);
  }; // Unsigned 32-bit less than (<) comparison


  util.lt = function (m, n) {
    return this.u32(m) < this.u32(n);
  };
})();

/***/ }),

/***/ 230:
/*!********************************************************!*\
  !*** ./node_modules/async-validator/dist-web/index.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

/* eslint no-console:0 */
var formatRegExp = /%[sdj%]/g;
var warning = function warning() {}; // don't print warning message when in production env or node runtime

if (typeof process !== 'undefined' && Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}) && "development" !== 'production' && typeof window !== 'undefined' && typeof document !== 'undefined') {
  warning = function warning(type, errors) {
    if (typeof console !== 'undefined' && console.warn) {
      if (errors.every(function (e) {
        return typeof e === 'string';
      })) {
        console.warn(type, errors);
      }
    }
  };
}

function convertFieldsError(errors) {
  if (!errors || !errors.length) return null;
  var fields = {};
  errors.forEach(function (error) {
    var field = error.field;
    fields[field] = fields[field] || [];
    fields[field].push(error);
  });
  return fields;
}
function format() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var i = 1;
  var f = args[0];
  var len = args.length;

  if (typeof f === 'function') {
    return f.apply(null, args.slice(1));
  }

  if (typeof f === 'string') {
    var str = String(f).replace(formatRegExp, function (x) {
      if (x === '%%') {
        return '%';
      }

      if (i >= len) {
        return x;
      }

      switch (x) {
        case '%s':
          return String(args[i++]);

        case '%d':
          return Number(args[i++]);

        case '%j':
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return '[Circular]';
          }

          break;

        default:
          return x;
      }
    });

    for (var arg = args[i]; i < len; arg = args[++i]) {
      str += " " + arg;
    }

    return str;
  }

  return f;
}

function isNativeStringType(type) {
  return type === 'string' || type === 'url' || type === 'hex' || type === 'email' || type === 'pattern';
}

function isEmptyValue(value, type) {
  if (value === undefined || value === null) {
    return true;
  }

  if (type === 'array' && Array.isArray(value) && !value.length) {
    return true;
  }

  if (isNativeStringType(type) && typeof value === 'string' && !value) {
    return true;
  }

  return false;
}

function asyncParallelArray(arr, func, callback) {
  var results = [];
  var total = 0;
  var arrLength = arr.length;

  function count(errors) {
    results.push.apply(results, errors);
    total++;

    if (total === arrLength) {
      callback(results);
    }
  }

  arr.forEach(function (a) {
    func(a, count);
  });
}

function asyncSerialArray(arr, func, callback) {
  var index = 0;
  var arrLength = arr.length;

  function next(errors) {
    if (errors && errors.length) {
      callback(errors);
      return;
    }

    var original = index;
    index = index + 1;

    if (original < arrLength) {
      func(arr[original], next);
    } else {
      callback([]);
    }
  }

  next([]);
}

function flattenObjArr(objArr) {
  var ret = [];
  Object.keys(objArr).forEach(function (k) {
    ret.push.apply(ret, objArr[k]);
  });
  return ret;
}

var AsyncValidationError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(AsyncValidationError, _Error);

  function AsyncValidationError(errors, fields) {
    var _this;

    _this = _Error.call(this, 'Async Validation Error') || this;
    _this.errors = errors;
    _this.fields = fields;
    return _this;
  }

  return AsyncValidationError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
function asyncMap(objArr, option, func, callback) {
  if (option.first) {
    var _pending = new Promise(function (resolve, reject) {
      var next = function next(errors) {
        callback(errors);
        return errors.length ? reject(new AsyncValidationError(errors, convertFieldsError(errors))) : resolve();
      };

      var flattenArr = flattenObjArr(objArr);
      asyncSerialArray(flattenArr, func, next);
    });

    _pending["catch"](function (e) {
      return e;
    });

    return _pending;
  }

  var firstFields = option.firstFields || [];

  if (firstFields === true) {
    firstFields = Object.keys(objArr);
  }

  var objArrKeys = Object.keys(objArr);
  var objArrLength = objArrKeys.length;
  var total = 0;
  var results = [];
  var pending = new Promise(function (resolve, reject) {
    var next = function next(errors) {
      results.push.apply(results, errors);
      total++;

      if (total === objArrLength) {
        callback(results);
        return results.length ? reject(new AsyncValidationError(results, convertFieldsError(results))) : resolve();
      }
    };

    if (!objArrKeys.length) {
      callback(results);
      resolve();
    }

    objArrKeys.forEach(function (key) {
      var arr = objArr[key];

      if (firstFields.indexOf(key) !== -1) {
        asyncSerialArray(arr, func, next);
      } else {
        asyncParallelArray(arr, func, next);
      }
    });
  });
  pending["catch"](function (e) {
    return e;
  });
  return pending;
}
function complementError(rule) {
  return function (oe) {
    if (oe && oe.message) {
      oe.field = oe.field || rule.fullField;
      return oe;
    }

    return {
      message: typeof oe === 'function' ? oe() : oe,
      field: oe.field || rule.fullField
    };
  };
}
function deepMerge(target, source) {
  if (source) {
    for (var s in source) {
      if (source.hasOwnProperty(s)) {
        var value = source[s];

        if (typeof value === 'object' && typeof target[s] === 'object') {
          target[s] = _extends(_extends({}, target[s]), value);
        } else {
          target[s] = value;
        }
      }
    }
  }

  return target;
}

/**
 *  Rule for validating required fields.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function required(rule, value, source, errors, options, type) {
  if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type || rule.type))) {
    errors.push(format(options.messages.required, rule.fullField));
  }
}

/**
 *  Rule for validating whitespace.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function whitespace(rule, value, source, errors, options) {
  if (/^\s+$/.test(value) || value === '') {
    errors.push(format(options.messages.whitespace, rule.fullField));
  }
}

/* eslint max-len:0 */

var pattern = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  url: new RegExp("^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$", 'i'),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
};
var types = {
  integer: function integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  "float": function float(value) {
    return types.number(value) && !types.integer(value);
  },
  array: function array(value) {
    return Array.isArray(value);
  },
  regexp: function regexp(value) {
    if (value instanceof RegExp) {
      return true;
    }

    try {
      return !!new RegExp(value);
    } catch (e) {
      return false;
    }
  },
  date: function date(value) {
    return typeof value.getTime === 'function' && typeof value.getMonth === 'function' && typeof value.getYear === 'function';
  },
  number: function number(value) {
    if (isNaN(value)) {
      return false;
    }

    return typeof value === 'number';
  },
  object: function object(value) {
    return typeof value === 'object' && !types.array(value);
  },
  method: function method(value) {
    return typeof value === 'function';
  },
  email: function email(value) {
    return typeof value === 'string' && !!value.match(pattern.email) && value.length < 255;
  },
  url: function url(value) {
    return typeof value === 'string' && !!value.match(pattern.url);
  },
  hex: function hex(value) {
    return typeof value === 'string' && !!value.match(pattern.hex);
  }
};
/**
 *  Rule for validating the type of a value.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function type(rule, value, source, errors, options) {
  if (rule.required && value === undefined) {
    required(rule, value, source, errors, options);
    return;
  }

  var custom = ['integer', 'float', 'array', 'regexp', 'object', 'method', 'email', 'number', 'date', 'url', 'hex'];
  var ruleType = rule.type;

  if (custom.indexOf(ruleType) > -1) {
    if (!types[ruleType](value)) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
    } // straight typeof check

  } else if (ruleType && typeof value !== rule.type) {
    errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
  }
}

/**
 *  Rule for validating minimum and maximum allowed values.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function range(rule, value, source, errors, options) {
  var len = typeof rule.len === 'number';
  var min = typeof rule.min === 'number';
  var max = typeof rule.max === 'number'; // 正则匹配码点范围从U+010000一直到U+10FFFF的文字（补充平面Supplementary Plane）

  var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  var val = value;
  var key = null;
  var num = typeof value === 'number';
  var str = typeof value === 'string';
  var arr = Array.isArray(value);

  if (num) {
    key = 'number';
  } else if (str) {
    key = 'string';
  } else if (arr) {
    key = 'array';
  } // if the value is not of a supported type for range validation
  // the validation rule rule should use the
  // type property to also test for a particular type


  if (!key) {
    return false;
  }

  if (arr) {
    val = value.length;
  }

  if (str) {
    // 处理码点大于U+010000的文字length属性不准确的bug，如"𠮷𠮷𠮷".lenght !== 3
    val = value.replace(spRegexp, '_').length;
  }

  if (len) {
    if (val !== rule.len) {
      errors.push(format(options.messages[key].len, rule.fullField, rule.len));
    }
  } else if (min && !max && val < rule.min) {
    errors.push(format(options.messages[key].min, rule.fullField, rule.min));
  } else if (max && !min && val > rule.max) {
    errors.push(format(options.messages[key].max, rule.fullField, rule.max));
  } else if (min && max && (val < rule.min || val > rule.max)) {
    errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
  }
}

var ENUM = 'enum';
/**
 *  Rule for validating a value exists in an enumerable list.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function enumerable(rule, value, source, errors, options) {
  rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : [];

  if (rule[ENUM].indexOf(value) === -1) {
    errors.push(format(options.messages[ENUM], rule.fullField, rule[ENUM].join(', ')));
  }
}

/**
 *  Rule for validating a regular expression pattern.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function pattern$1(rule, value, source, errors, options) {
  if (rule.pattern) {
    if (rule.pattern instanceof RegExp) {
      // if a RegExp instance is passed, reset `lastIndex` in case its `global`
      // flag is accidentally set to `true`, which in a validation scenario
      // is not necessary and the result might be misleading
      rule.pattern.lastIndex = 0;

      if (!rule.pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    } else if (typeof rule.pattern === 'string') {
      var _pattern = new RegExp(rule.pattern);

      if (!_pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    }
  }
}

var rules = {
  required: required,
  whitespace: whitespace,
  type: type,
  range: range,
  "enum": enumerable,
  pattern: pattern$1
};

/**
 *  Performs validation for string types.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function string(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, 'string');

    if (!isEmptyValue(value, 'string')) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
      rules.pattern(rule, value, source, errors, options);

      if (rule.whitespace === true) {
        rules.whitespace(rule, value, source, errors, options);
      }
    }
  }

  callback(errors);
}

/**
 *  Validates a function.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function method(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
 *  Validates a number.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function number(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (value === '') {
      value = undefined;
    }

    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
 *  Validates a boolean.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function _boolean(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
 *  Validates the regular expression type.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function regexp(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value)) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
 *  Validates a number is an integer.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function integer(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
 *  Validates a number is a floating point number.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function floatFn(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
 *  Validates an array.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function array(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'array') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, 'array');

    if (!isEmptyValue(value, 'array')) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
 *  Validates an object.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function object(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

var ENUM$1 = 'enum';
/**
 *  Validates an enumerable list.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function enumerable$1(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules[ENUM$1](rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
 *  Validates a regular expression pattern.
 *
 *  Performs validation when a rule only contains
 *  a pattern property but is not declared as a string type.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function pattern$2(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value, 'string')) {
      rules.pattern(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

function date(rule, value, callback, source, options) {
  // console.log('integer rule called %j', rule);
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field); // console.log('validate on %s value', value);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value)) {
      var dateObject;

      if (typeof value === 'number') {
        dateObject = new Date(value);
      } else {
        dateObject = value;
      }

      rules.type(rule, dateObject, source, errors, options);

      if (dateObject) {
        rules.range(rule, dateObject.getTime(), source, errors, options);
      }
    }
  }

  callback(errors);
}

function required$1(rule, value, callback, source, options) {
  var errors = [];
  var type = Array.isArray(value) ? 'array' : typeof value;
  rules.required(rule, value, source, errors, options, type);
  callback(errors);
}

function type$1(rule, value, callback, source, options) {
  var ruleType = rule.type;
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, ruleType) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, ruleType);

    if (!isEmptyValue(value, ruleType)) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
}

/**
 *  Performs validation for any type.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param callback The callback function.
 *  @param source The source object being validated.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

function any(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);
  }

  callback(errors);
}

var validators = {
  string: string,
  method: method,
  number: number,
  "boolean": _boolean,
  regexp: regexp,
  integer: integer,
  "float": floatFn,
  array: array,
  object: object,
  "enum": enumerable$1,
  pattern: pattern$2,
  date: date,
  url: type$1,
  hex: type$1,
  email: type$1,
  required: required$1,
  any: any
};

function newMessages() {
  return {
    "default": 'Validation error on field %s',
    required: '%s is required',
    "enum": '%s must be one of %s',
    whitespace: '%s cannot be empty',
    date: {
      format: '%s date %s is invalid for format %s',
      parse: '%s date could not be parsed, %s is invalid ',
      invalid: '%s date %s is invalid'
    },
    types: {
      string: '%s is not a %s',
      method: '%s is not a %s (function)',
      array: '%s is not an %s',
      object: '%s is not an %s',
      number: '%s is not a %s',
      date: '%s is not a %s',
      "boolean": '%s is not a %s',
      integer: '%s is not an %s',
      "float": '%s is not a %s',
      regexp: '%s is not a valid %s',
      email: '%s is not a valid %s',
      url: '%s is not a valid %s',
      hex: '%s is not a valid %s'
    },
    string: {
      len: '%s must be exactly %s characters',
      min: '%s must be at least %s characters',
      max: '%s cannot be longer than %s characters',
      range: '%s must be between %s and %s characters'
    },
    number: {
      len: '%s must equal %s',
      min: '%s cannot be less than %s',
      max: '%s cannot be greater than %s',
      range: '%s must be between %s and %s'
    },
    array: {
      len: '%s must be exactly %s in length',
      min: '%s cannot be less than %s in length',
      max: '%s cannot be greater than %s in length',
      range: '%s must be between %s and %s in length'
    },
    pattern: {
      mismatch: '%s value %s does not match pattern %s'
    },
    clone: function clone() {
      var cloned = JSON.parse(JSON.stringify(this));
      cloned.clone = this.clone;
      return cloned;
    }
  };
}
var messages = newMessages();

/**
 *  Encapsulates a validation schema.
 *
 *  @param descriptor An object declaring validation rules
 *  for this schema.
 */

function Schema(descriptor) {
  this.rules = null;
  this._messages = messages;
  this.define(descriptor);
}

Schema.prototype = {
  messages: function messages(_messages) {
    if (_messages) {
      this._messages = deepMerge(newMessages(), _messages);
    }

    return this._messages;
  },
  define: function define(rules) {
    if (!rules) {
      throw new Error('Cannot configure a schema with no rules');
    }

    if (typeof rules !== 'object' || Array.isArray(rules)) {
      throw new Error('Rules must be an object');
    }

    this.rules = {};
    var z;
    var item;

    for (z in rules) {
      if (rules.hasOwnProperty(z)) {
        item = rules[z];
        this.rules[z] = Array.isArray(item) ? item : [item];
      }
    }
  },
  validate: function validate(source_, o, oc) {
    var _this = this;

    if (o === void 0) {
      o = {};
    }

    if (oc === void 0) {
      oc = function oc() {};
    }

    var source = source_;
    var options = o;
    var callback = oc;

    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    if (!this.rules || Object.keys(this.rules).length === 0) {
      if (callback) {
        callback();
      }

      return Promise.resolve();
    }

    function complete(results) {
      var i;
      var errors = [];
      var fields = {};

      function add(e) {
        if (Array.isArray(e)) {
          var _errors;

          errors = (_errors = errors).concat.apply(_errors, e);
        } else {
          errors.push(e);
        }
      }

      for (i = 0; i < results.length; i++) {
        add(results[i]);
      }

      if (!errors.length) {
        errors = null;
        fields = null;
      } else {
        fields = convertFieldsError(errors);
      }

      callback(errors, fields);
    }

    if (options.messages) {
      var messages$1 = this.messages();

      if (messages$1 === messages) {
        messages$1 = newMessages();
      }

      deepMerge(messages$1, options.messages);
      options.messages = messages$1;
    } else {
      options.messages = this.messages();
    }

    var arr;
    var value;
    var series = {};
    var keys = options.keys || Object.keys(this.rules);
    keys.forEach(function (z) {
      arr = _this.rules[z];
      value = source[z];
      arr.forEach(function (r) {
        var rule = r;

        if (typeof rule.transform === 'function') {
          if (source === source_) {
            source = _extends({}, source);
          }

          value = source[z] = rule.transform(value);
        }

        if (typeof rule === 'function') {
          rule = {
            validator: rule
          };
        } else {
          rule = _extends({}, rule);
        }

        rule.validator = _this.getValidationMethod(rule);
        rule.field = z;
        rule.fullField = rule.fullField || z;
        rule.type = _this.getType(rule);

        if (!rule.validator) {
          return;
        }

        series[z] = series[z] || [];
        series[z].push({
          rule: rule,
          value: value,
          source: source,
          field: z
        });
      });
    });
    var errorFields = {};
    return asyncMap(series, options, function (data, doIt) {
      var rule = data.rule;
      var deep = (rule.type === 'object' || rule.type === 'array') && (typeof rule.fields === 'object' || typeof rule.defaultField === 'object');
      deep = deep && (rule.required || !rule.required && data.value);
      rule.field = data.field;

      function addFullfield(key, schema) {
        return _extends(_extends({}, schema), {}, {
          fullField: rule.fullField + "." + key
        });
      }

      function cb(e) {
        if (e === void 0) {
          e = [];
        }

        var errors = e;

        if (!Array.isArray(errors)) {
          errors = [errors];
        }

        if (!options.suppressWarning && errors.length) {
          Schema.warning('async-validator:', errors);
        }

        if (errors.length && rule.message) {
          errors = [].concat(rule.message);
        }

        errors = errors.map(complementError(rule));

        if (options.first && errors.length) {
          errorFields[rule.field] = 1;
          return doIt(errors);
        }

        if (!deep) {
          doIt(errors);
        } else {
          // if rule is required but the target object
          // does not exist fail at the rule level and don't
          // go deeper
          if (rule.required && !data.value) {
            if (rule.message) {
              errors = [].concat(rule.message).map(complementError(rule));
            } else if (options.error) {
              errors = [options.error(rule, format(options.messages.required, rule.field))];
            }

            return doIt(errors);
          }

          var fieldsSchema = {};

          if (rule.defaultField) {
            for (var k in data.value) {
              if (data.value.hasOwnProperty(k)) {
                fieldsSchema[k] = rule.defaultField;
              }
            }
          }

          fieldsSchema = _extends(_extends({}, fieldsSchema), data.rule.fields);

          for (var f in fieldsSchema) {
            if (fieldsSchema.hasOwnProperty(f)) {
              var fieldSchema = Array.isArray(fieldsSchema[f]) ? fieldsSchema[f] : [fieldsSchema[f]];
              fieldsSchema[f] = fieldSchema.map(addFullfield.bind(null, f));
            }
          }

          var schema = new Schema(fieldsSchema);
          schema.messages(options.messages);

          if (data.rule.options) {
            data.rule.options.messages = options.messages;
            data.rule.options.error = options.error;
          }

          schema.validate(data.value, data.rule.options || options, function (errs) {
            var finalErrors = [];

            if (errors && errors.length) {
              finalErrors.push.apply(finalErrors, errors);
            }

            if (errs && errs.length) {
              finalErrors.push.apply(finalErrors, errs);
            }

            doIt(finalErrors.length ? finalErrors : null);
          });
        }
      }

      var res;

      if (rule.asyncValidator) {
        res = rule.asyncValidator(rule, data.value, cb, data.source, options);
      } else if (rule.validator) {
        res = rule.validator(rule, data.value, cb, data.source, options);

        if (res === true) {
          cb();
        } else if (res === false) {
          cb(rule.message || rule.field + " fails");
        } else if (res instanceof Array) {
          cb(res);
        } else if (res instanceof Error) {
          cb(res.message);
        }
      }

      if (res && res.then) {
        res.then(function () {
          return cb();
        }, function (e) {
          return cb(e);
        });
      }
    }, function (results) {
      complete(results);
    });
  },
  getType: function getType(rule) {
    if (rule.type === undefined && rule.pattern instanceof RegExp) {
      rule.type = 'pattern';
    }

    if (typeof rule.validator !== 'function' && rule.type && !validators.hasOwnProperty(rule.type)) {
      throw new Error(format('Unknown rule type %s', rule.type));
    }

    return rule.type || 'string';
  },
  getValidationMethod: function getValidationMethod(rule) {
    if (typeof rule.validator === 'function') {
      return rule.validator;
    }

    var keys = Object.keys(rule);
    var messageIndex = keys.indexOf('message');

    if (messageIndex !== -1) {
      keys.splice(messageIndex, 1);
    }

    if (keys.length === 1 && keys[0] === 'required') {
      return validators.required;
    }

    return validators[this.getType(rule)] || false;
  }
};

Schema.register = function register(type, validator) {
  if (typeof validator !== 'function') {
    throw new Error('Cannot register a validator by type, validator is not a function');
  }

  validators[type] = validator;
};

Schema.warning = warning;
Schema.messages = messages;
Schema.validators = validators;

/* harmony default export */ __webpack_exports__["default"] = (Schema);
//# sourceMappingURL=index.js.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ 32)))

/***/ }),

/***/ 24:
/*!************************************************!*\
  !*** ./src/modules/cryptojs/lib/BlockModes.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*!
 * Crypto-JS contribution from Simon Greatrix
 */
(function () {
  var C = typeof window === 'undefined' ? __webpack_require__(/*! ./Crypto */ 22).Crypto : window.Crypto; // Create pad namespace

  var C_pad = C.pad = {}; // Calculate the number of padding bytes required.

  function _requiredPadding(cipher, message) {
    var blockSizeInBytes = cipher._blocksize * 4;
    var reqd = blockSizeInBytes - message.length % blockSizeInBytes;
    return reqd;
  }

  ; // Remove padding when the final byte gives the number of padding bytes.

  var _unpadLength = function _unpadLength(message) {
    var pad = message.pop();

    for (var i = 1; i < pad; i++) {
      message.pop();
    }
  }; // No-operation padding, used for stream ciphers


  C_pad.NoPadding = {
    pad: function pad(cipher, message) {},
    unpad: function unpad(message) {}
  }; // Zero Padding.
  //
  // If the message is not an exact number of blocks, the final block is
  // completed with 0x00 bytes. There is no unpadding.

  C_pad.ZeroPadding = {
    pad: function pad(cipher, message) {
      var blockSizeInBytes = cipher._blocksize * 4;
      var reqd = message.length % blockSizeInBytes;

      if (reqd != 0) {
        for (reqd = blockSizeInBytes - reqd; reqd > 0; reqd--) {
          message.push(0x00);
        }
      }
    },
    unpad: function unpad(message) {}
  }; // ISO/IEC 7816-4 padding.
  //
  // Pads the plain text with an 0x80 byte followed by as many 0x00
  // bytes are required to complete the block.

  C_pad.iso7816 = {
    pad: function pad(cipher, message) {
      var reqd = _requiredPadding(cipher, message);

      message.push(0x80);

      for (; reqd > 1; reqd--) {
        message.push(0x00);
      }
    },
    unpad: function unpad(message) {
      while (message.pop() != 0x80) {}
    }
  }; // ANSI X.923 padding
  //
  // The final block is padded with zeros except for the last byte of the
  // last block which contains the number of padding bytes.

  C_pad.ansix923 = {
    pad: function pad(cipher, message) {
      var reqd = _requiredPadding(cipher, message);

      for (var i = 1; i < reqd; i++) {
        message.push(0x00);
      }

      message.push(reqd);
    },
    unpad: _unpadLength
  }; // ISO 10126
  //
  // The final block is padded with random bytes except for the last
  // byte of the last block which contains the number of padding bytes.

  C_pad.iso10126 = {
    pad: function pad(cipher, message) {
      var reqd = _requiredPadding(cipher, message);

      for (var i = 1; i < reqd; i++) {
        message.push(Math.floor(Math.random() * 256));
      }

      message.push(reqd);
    },
    unpad: _unpadLength
  }; // PKCS7 padding
  //
  // PKCS7 is described in RFC 5652. Padding is in whole bytes. The
  // value of each added byte is the number of bytes that are added,
  // i.e. N bytes, each of value N are added.

  C_pad.pkcs7 = {
    pad: function pad(cipher, message) {
      var reqd = _requiredPadding(cipher, message);

      for (var i = 0; i < reqd; i++) {
        message.push(reqd);
      }
    },
    unpad: _unpadLength
  }; // Create mode namespace

  var C_mode = C.mode = {};
  /**
   * Mode base "class".
   */

  var Mode = C_mode.Mode = function (padding) {
    if (padding) {
      this._padding = padding;
    }
  };

  Mode.prototype = {
    encrypt: function encrypt(cipher, m, iv) {
      this._padding.pad(cipher, m);

      this._doEncrypt(cipher, m, iv);
    },
    decrypt: function decrypt(cipher, m, iv) {
      this._doDecrypt(cipher, m, iv);

      this._padding.unpad(m);
    },
    // Default padding
    _padding: C_pad.iso7816
  };
  /**
   * Electronic Code Book mode.
   * 
   * ECB applies the cipher directly against each block of the input.
   * 
   * ECB does not require an initialization vector.
   */

  var ECB = C_mode.ECB = function () {
    // Call parent constructor
    Mode.apply(this, arguments);
  }; // Inherit from Mode


  var ECB_prototype = ECB.prototype = new Mode(); // Concrete steps for Mode template

  ECB_prototype._doEncrypt = function (cipher, m, iv) {
    var blockSizeInBytes = cipher._blocksize * 4; // Encrypt each block

    for (var offset = 0; offset < m.length; offset += blockSizeInBytes) {
      cipher._encryptblock(m, offset);
    }
  };

  ECB_prototype._doDecrypt = function (cipher, c, iv) {
    var blockSizeInBytes = cipher._blocksize * 4; // Decrypt each block

    for (var offset = 0; offset < c.length; offset += blockSizeInBytes) {
      cipher._decryptblock(c, offset);
    }
  }; // ECB never uses an IV


  ECB_prototype.fixOptions = function (options) {
    options.iv = [];
  };
  /**
   * Cipher block chaining
   * 
   * The first block is XORed with the IV. Subsequent blocks are XOR with the
   * previous cipher output.
   */


  var CBC = C_mode.CBC = function () {
    // Call parent constructor
    Mode.apply(this, arguments);
  }; // Inherit from Mode


  var CBC_prototype = CBC.prototype = new Mode(); // Concrete steps for Mode template

  CBC_prototype._doEncrypt = function (cipher, m, iv) {
    var blockSizeInBytes = cipher._blocksize * 4; // Encrypt each block

    for (var offset = 0; offset < m.length; offset += blockSizeInBytes) {
      if (offset == 0) {
        // XOR first block using IV
        for (var i = 0; i < blockSizeInBytes; i++) {
          m[i] ^= iv[i];
        }
      } else {
        // XOR this block using previous crypted block
        for (var i = 0; i < blockSizeInBytes; i++) {
          m[offset + i] ^= m[offset + i - blockSizeInBytes];
        }
      } // Encrypt block


      cipher._encryptblock(m, offset);
    }
  };

  CBC_prototype._doDecrypt = function (cipher, c, iv) {
    var blockSizeInBytes = cipher._blocksize * 4; // At the start, the previously crypted block is the IV

    var prevCryptedBlock = iv; // Decrypt each block

    for (var offset = 0; offset < c.length; offset += blockSizeInBytes) {
      // Save this crypted block
      var thisCryptedBlock = c.slice(offset, offset + blockSizeInBytes); // Decrypt block

      cipher._decryptblock(c, offset); // XOR decrypted block using previous crypted block


      for (var i = 0; i < blockSizeInBytes; i++) {
        c[offset + i] ^= prevCryptedBlock[i];
      }

      prevCryptedBlock = thisCryptedBlock;
    }
  };
  /**
   * Cipher feed back
   * 
   * The cipher output is XORed with the plain text to produce the cipher output,
   * which is then fed back into the cipher to produce a bit pattern to XOR the
   * next block with.
   * 
   * This is a stream cipher mode and does not require padding.
   */


  var CFB = C_mode.CFB = function () {
    // Call parent constructor
    Mode.apply(this, arguments);
  }; // Inherit from Mode


  var CFB_prototype = CFB.prototype = new Mode(); // Override padding

  CFB_prototype._padding = C_pad.NoPadding; // Concrete steps for Mode template

  CFB_prototype._doEncrypt = function (cipher, m, iv) {
    var blockSizeInBytes = cipher._blocksize * 4,
        keystream = iv.slice(0); // Encrypt each byte

    for (var i = 0; i < m.length; i++) {
      var j = i % blockSizeInBytes;
      if (j == 0) cipher._encryptblock(keystream, 0);
      m[i] ^= keystream[j];
      keystream[j] = m[i];
    }
  };

  CFB_prototype._doDecrypt = function (cipher, c, iv) {
    var blockSizeInBytes = cipher._blocksize * 4,
        keystream = iv.slice(0); // Encrypt each byte

    for (var i = 0; i < c.length; i++) {
      var j = i % blockSizeInBytes;
      if (j == 0) cipher._encryptblock(keystream, 0);
      var b = c[i];
      c[i] ^= keystream[j];
      keystream[j] = b;
    }
  };
  /**
   * Output feed back
   * 
   * The cipher repeatedly encrypts its own output. The output is XORed with the
   * plain text to produce the cipher text.
   * 
   * This is a stream cipher mode and does not require padding.
   */


  var OFB = C_mode.OFB = function () {
    // Call parent constructor
    Mode.apply(this, arguments);
  }; // Inherit from Mode


  var OFB_prototype = OFB.prototype = new Mode(); // Override padding

  OFB_prototype._padding = C_pad.NoPadding; // Concrete steps for Mode template

  OFB_prototype._doEncrypt = function (cipher, m, iv) {
    var blockSizeInBytes = cipher._blocksize * 4,
        keystream = iv.slice(0); // Encrypt each byte

    for (var i = 0; i < m.length; i++) {
      // Generate keystream
      if (i % blockSizeInBytes == 0) cipher._encryptblock(keystream, 0); // Encrypt byte

      m[i] ^= keystream[i % blockSizeInBytes];
    }
  };

  OFB_prototype._doDecrypt = OFB_prototype._doEncrypt;
  /**
   * Counter
   * @author Gergely Risko
   *
   * After every block the last 4 bytes of the IV is increased by one
   * with carry and that IV is used for the next block.
   *
   * This is a stream cipher mode and does not require padding.
   */

  var CTR = C_mode.CTR = function () {
    // Call parent constructor
    Mode.apply(this, arguments);
  }; // Inherit from Mode


  var CTR_prototype = CTR.prototype = new Mode(); // Override padding

  CTR_prototype._padding = C_pad.NoPadding;

  CTR_prototype._doEncrypt = function (cipher, m, iv) {
    var blockSizeInBytes = cipher._blocksize * 4;
    var counter = iv.slice(0);

    for (var i = 0; i < m.length;) {
      // do not lose iv
      var keystream = counter.slice(0); // Generate keystream for next block

      cipher._encryptblock(keystream, 0); // XOR keystream with block


      for (var j = 0; i < m.length && j < blockSizeInBytes; j++, i++) {
        m[i] ^= keystream[j];
      } // Increase counter


      if (++counter[blockSizeInBytes - 1] == 256) {
        counter[blockSizeInBytes - 1] = 0;

        if (++counter[blockSizeInBytes - 2] == 256) {
          counter[blockSizeInBytes - 2] = 0;

          if (++counter[blockSizeInBytes - 3] == 256) {
            counter[blockSizeInBytes - 3] = 0;
            ++counter[blockSizeInBytes - 4];
          }
        }
      }
    }
  };

  CTR_prototype._doDecrypt = CTR_prototype._doEncrypt;
})();

/***/ }),

/***/ 245:
/*!****************************************************!*\
  !*** ./src/static/images/wallet-recharge-card.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/images/wallet-recharge-card.png";

/***/ }),

/***/ 25:
/*!*****************************************!*\
  !*** ./src/modules/cryptojs/lib/DES.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Definition of Data Encryption Standard (DES) taken from:
 * http://www.itl.nist.gov/fipspubs/fip46-2.htm
 */
(function () {
  var C = typeof window === 'undefined' ? __webpack_require__(/*! ./Crypto */ 22).Crypto : window.Crypto; // Shortcuts

  var util = C.util,
      charenc = C.charenc,
      UTF8 = charenc.UTF8;
  /***************************************************************************
   * 
   * DES Key Schedule.
   * 
   * The Key consists of 16 sub-keys of 48 bits each. As each sub-key is
   * applied to an expanded 32-bit value where each 4 bits of input is
   * expanded into 6 bits of output the sub-key can be broken down into 8
   * 32-bit values which allows the key to be used without expansion.
   * 
   * To create the 16 sub-keys, 56 bits are selected from the input 64 bit key
   * according to <i>PC1</i>. Each sub-key is generated by left rotating the
   * bits a different amount and then selecting 48 bits according to <i>PC2</i>.
   * 
   **************************************************************************/

  var KeySchedule;
  /**
   * Representation of a DES key schedule.
   * 
   * @param {Array
   *            of 8 bytes} key The cipher key
   * 
   * @constructor
   */

  KeySchedule = function KeySchedule(key) {
    /**
     * The schedule of 16 keys
     */
    this.keys = new Array(16);

    this._initialiseKeys(key);
  };
  /**
   * Permuted Choice 1 (PC1) byte offsets into the key. Each of the 56 entries
   * selects one bit of DES's 56 bit key.
   * <p>
   * 
   * <pre>
   * The PC1 is defined as:
   * 
   * 57,   49,    41,   33,    25,    17,    9,
   *  1,   58,    50,   42,    34,    26,   18,
   * 10,    2,    59,   51,    43,    35,   27,
   * 19,   11,     3,   60,    52,    44,   36,
   * 63,   55,    47,   39,    31,    23,   15,
   *  7,   62,    54,   46,    38,    30,   22,
   * 14,    6,    61,   53,    45,    37,   29,
   * 21,   13,     5,   28,    20,    12,    4
   * </pre>
   * 
   * We represent this as an offset into an 8-byte array and a bit mask upon
   * that byte. For example 57=(7*8)+1 so is the first (MSB) of the 7th byte.
   * 
   * @constant
   */


  KeySchedule.PC1_offsets = [7, 6, 5, 4, 3, 2, 1, 0, 7, 6, 5, 4, 3, 2, 1, 0, 7, 6, 5, 4, 3, 2, 1, 0, 7, 6, 5, 4, 7, 6, 5, 4, 3, 2, 1, 0, 7, 6, 5, 4, 3, 2, 1, 0, 7, 6, 5, 4, 3, 2, 1, 0, 3, 2, 1, 0];
  /**
   * Permuted Choice 1 (PC1) bit masks. Each of the 56 entries selects one bit
   * of DES's 56 bit key.
   * 
   * @constant
   */

  KeySchedule.PC1_masks = [128, 128, 128, 128, 128, 128, 128, 128, 64, 64, 64, 64, 64, 64, 64, 64, 32, 32, 32, 32, 32, 32, 32, 32, 16, 16, 16, 16, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 8, 8, 8, 8, 8, 8, 8, 8, 16, 16, 16, 16];
  /**
   * Permuted Choice 2 (PC2) selects the active 48 bits from the 56 bits of
   * the key.
   * <p>
   * 
   * <pre>
   * The PC2 is defined as:
   * 
   * 14,   17,   11,   24,    1,    5,
   *  3,   28,   15,    6,   21,   10,
   * 23,   19,   12,    4,   26,    8,
   * 16,    7,   27,   20,   13,    2,
   * 41,   52,   31,   37,   47,   55,
   * 30,   40,   51,   45,   33,   48,
   * 44,   49,   39,   56,   34,   53,
   * 46,   42,   50,   36,   29,   32
   * </pre>
   * 
   * We invert the choice to specify what each bit adds to each 6-bit value of
   * the key. For example, bit 1 is the 5th bit selected so this add 2 to the
   * first 6-bit value.
   * 
   * @constant
   */

  KeySchedule.PC2_offsets1 = [0, 3, 1, 2, 0, 1, 3, 2, 0, 1, 0, 2, 3, 0, 1, 3, 0, 0, 2, 3, 1, 0, 2, 0, 0, 2, 3, 1];
  /**
   * PC2 offsets for 2nd block.
   * 
   * @constant
   */

  KeySchedule.PC2_offsets2 = [7, 5, 4, 7, 5, 6, 0, 7, 4, 0, 6, 5, 4, 7, 0, 6, 5, 7, 4, 5, 6, 7, 5, 4, 6, 0, 4, 6];
  /**
   * Permuted Choice 2 (PC2) masks for 1st block.
   * 
   * @constant
   */

  KeySchedule.PC2_masks1 = [2, 1, 32, 4, 1, 4, 16, 1, 0, 1, 8, 8, 2, 32, 8, 32, 16, 0, 16, 4, 2, 0, 32, 4, 0, 2, 8, 16];
  /**
   * PC2 masks for 2nd block.
   * 
   * @constant
   */

  KeySchedule.PC2_masks2 = [2, 32, 8, 1, 2, 2, 0, 4, 4, 0, 8, 16, 32, 16, 0, 32, 4, 32, 2, 1, 16, 8, 8, 16, 1, 0, 1, 4];
  /**
   * Cumulative key shifts.
   * 
   * @constant
   */

  KeySchedule.keyShifts = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];

  KeySchedule.prototype._initialiseKeys = function (key) {
    var i; // extract 56 key bits in order determined by PC1

    var bits = new Array(56);

    for (i = 0; i < 56; i++) {
      bits[i] = (key[KeySchedule.PC1_offsets[i]] & KeySchedule.PC1_masks[i]) != 0;
    } // split 56 bits into two 28-bit chunks


    var bits1 = bits.slice(0, 28);
    var bits2 = bits.slice(28, 56); // duplicate each half to allow for easy bit shifts

    bits1 = bits1.concat(bits1);
    bits2 = bits2.concat(bits2); // assemble the 16 keys

    for (i = 0; i < 16; i++) {
      var k = [0, 0, 0, 0, 0, 0, 0, 0]; // select the bits of the key according to PC2

      var s = KeySchedule.keyShifts[i];

      for (var j = 0; j < 28; j++) {
        if (bits1[j + s]) {
          k[KeySchedule.PC2_offsets1[j]] += KeySchedule.PC2_masks1[j];
        }

        if (bits2[j + s]) {
          k[KeySchedule.PC2_offsets2[j]] += KeySchedule.PC2_masks2[j];
        }
      } // Scale each of the 8 blocks to a 32-bit mask.


      k[0] = ((k[0] & 0x1f) << 27) + ((k[0] & 0x20) >> 5);

      for (var j = 1; j <= 6; j++) {
        k[j] = k[j] << 27 - 4 * j;
      }

      k[7] = ((k[7] & 0x3e) >> 1) + ((k[7] & 0x1) << 31);
      this.keys[i] = k;
    }
  };
  /**
   * Retrieve the key for a specified round
   * 
   * @param i
   *            the round
   * @returns the key
   */


  KeySchedule.prototype.getKey = function (i) {
    return this.keys[i];
  };
  /***************************************************************************
   * 
   * DES Engine State
   * 
   **************************************************************************/


  var State;
  /**
   * The algorithm's state. DES operates on two sets of 32-bits, with each
   * block of 32-bits treated as a single number.
   * 
   * @class
   */

  State = function State() {
    /** The LHS of the Feistel scheme */
    this.lhs = 0;
    /** The RHS of the Feistel scheme */

    this.rhs = 0;
  };
  /**
   * The masks that select the SBOX input. Each SBOX accepts 6 bits from the
   * input.
   * 
   * @constant
   */


  State.SBOX_MASK = [0xf8000001, 0x1f800000, 0x01f80000, 0x001f8000, 0x0001f800, 0x00001f80, 0x000001f8, 0x8000001f];
  /**
   * The SBOXes. The 8 SBOXes each map 6 bit masked bit of the input to 4 bits
   * of output. These SBOXes include the post SBOX permutation and benefit
   * from JavaScript's sparse arrays to make specifying the input match
   * simple.
   * 
   * @constant
   */

  State.SBOX = new Array(8);
  var SBOX = State.SBOX;
  SBOX[0] = new Array();
  SBOX[0][0] = 0x808200; // 0 (0, 0) = 14

  SBOX[0][268435456] = 0x8000; // 10000000 (0, 1) = 4

  SBOX[0][536870912] = 0x808002; // 20000000 (0, 2) = 13

  SBOX[0][805306368] = 0x2; // 30000000 (0, 3) = 1

  SBOX[0][1073741824] = 0x200; // 40000000 (0, 4) = 2

  SBOX[0][1342177280] = 0x808202; // 50000000 (0, 5) = 15

  SBOX[0][1610612736] = 0x800202; // 60000000 (0, 6) = 11

  SBOX[0][1879048192] = 0x800000; // 70000000 (0, 7) = 8

  SBOX[0][-2147483648] = 0x202; // 80000000 (0, 8) = 3

  SBOX[0][-1879048192] = 0x800200; // 90000000 (0, 9) = 10

  SBOX[0][-1610612736] = 0x8200; // a0000000 (0, 10) = 6

  SBOX[0][-1342177280] = 0x808000; // b0000000 (0, 11) = 12

  SBOX[0][-1073741824] = 0x8002; // c0000000 (0, 12) = 5

  SBOX[0][-805306368] = 0x800002; // d0000000 (0, 13) = 9

  SBOX[0][-536870912] = 0x0; // e0000000 (0, 14) = 0

  SBOX[0][-268435456] = 0x8202; // f0000000 (0, 15) = 7

  SBOX[0][134217728] = 0x0; // 8000000 (1, 0) = 0

  SBOX[0][402653184] = 0x808202; // 18000000 (1, 1) = 15

  SBOX[0][671088640] = 0x8202; // 28000000 (1, 2) = 7

  SBOX[0][939524096] = 0x8000; // 38000000 (1, 3) = 4

  SBOX[0][1207959552] = 0x808200; // 48000000 (1, 4) = 14

  SBOX[0][1476395008] = 0x200; // 58000000 (1, 5) = 2

  SBOX[0][1744830464] = 0x808002; // 68000000 (1, 6) = 13

  SBOX[0][2013265920] = 0x2; // 78000000 (1, 7) = 1

  SBOX[0][-2013265920] = 0x800200; // 88000000 (1, 8) = 10

  SBOX[0][-1744830464] = 0x8200; // 98000000 (1, 9) = 6

  SBOX[0][-1476395008] = 0x808000; // a8000000 (1, 10) = 12

  SBOX[0][-1207959552] = 0x800202; // b8000000 (1, 11) = 11

  SBOX[0][-939524096] = 0x800002; // c8000000 (1, 12) = 9

  SBOX[0][-671088640] = 0x8002; // d8000000 (1, 13) = 5

  SBOX[0][-402653184] = 0x202; // e8000000 (1, 14) = 3

  SBOX[0][-134217728] = 0x800000; // f8000000 (1, 15) = 8

  SBOX[0][1] = 0x8000; // 1 (2, 0) = 4

  SBOX[0][268435457] = 0x2; // 10000001 (2, 1) = 1

  SBOX[0][536870913] = 0x808200; // 20000001 (2, 2) = 14

  SBOX[0][805306369] = 0x800000; // 30000001 (2, 3) = 8

  SBOX[0][1073741825] = 0x808002; // 40000001 (2, 4) = 13

  SBOX[0][1342177281] = 0x8200; // 50000001 (2, 5) = 6

  SBOX[0][1610612737] = 0x200; // 60000001 (2, 6) = 2

  SBOX[0][1879048193] = 0x800202; // 70000001 (2, 7) = 11

  SBOX[0][-2147483647] = 0x808202; // 80000001 (2, 8) = 15

  SBOX[0][-1879048191] = 0x808000; // 90000001 (2, 9) = 12

  SBOX[0][-1610612735] = 0x800002; // a0000001 (2, 10) = 9

  SBOX[0][-1342177279] = 0x8202; // b0000001 (2, 11) = 7

  SBOX[0][-1073741823] = 0x202; // c0000001 (2, 12) = 3

  SBOX[0][-805306367] = 0x800200; // d0000001 (2, 13) = 10

  SBOX[0][-536870911] = 0x8002; // e0000001 (2, 14) = 5

  SBOX[0][-268435455] = 0x0; // f0000001 (2, 15) = 0

  SBOX[0][134217729] = 0x808202; // 8000001 (3, 0) = 15

  SBOX[0][402653185] = 0x808000; // 18000001 (3, 1) = 12

  SBOX[0][671088641] = 0x800000; // 28000001 (3, 2) = 8

  SBOX[0][939524097] = 0x200; // 38000001 (3, 3) = 2

  SBOX[0][1207959553] = 0x8000; // 48000001 (3, 4) = 4

  SBOX[0][1476395009] = 0x800002; // 58000001 (3, 5) = 9

  SBOX[0][1744830465] = 0x2; // 68000001 (3, 6) = 1

  SBOX[0][2013265921] = 0x8202; // 78000001 (3, 7) = 7

  SBOX[0][-2013265919] = 0x8002; // 88000001 (3, 8) = 5

  SBOX[0][-1744830463] = 0x800202; // 98000001 (3, 9) = 11

  SBOX[0][-1476395007] = 0x202; // a8000001 (3, 10) = 3

  SBOX[0][-1207959551] = 0x808200; // b8000001 (3, 11) = 14

  SBOX[0][-939524095] = 0x800200; // c8000001 (3, 12) = 10

  SBOX[0][-671088639] = 0x0; // d8000001 (3, 13) = 0

  SBOX[0][-402653183] = 0x8200; // e8000001 (3, 14) = 6

  SBOX[0][-134217727] = 0x808002; // f8000001 (3, 15) = 13

  SBOX[1] = new Array();
  SBOX[1][0] = 0x40084010; // 0 (0, 0) = 15

  SBOX[1][16777216] = 0x4000; // 1000000 (0, 1) = 1

  SBOX[1][33554432] = 0x80000; // 2000000 (0, 2) = 8

  SBOX[1][50331648] = 0x40080010; // 3000000 (0, 3) = 14

  SBOX[1][67108864] = 0x40000010; // 4000000 (0, 4) = 6

  SBOX[1][83886080] = 0x40084000; // 5000000 (0, 5) = 11

  SBOX[1][100663296] = 0x40004000; // 6000000 (0, 6) = 3

  SBOX[1][117440512] = 0x10; // 7000000 (0, 7) = 4

  SBOX[1][134217728] = 0x84000; // 8000000 (0, 8) = 9

  SBOX[1][150994944] = 0x40004010; // 9000000 (0, 9) = 7

  SBOX[1][167772160] = 0x40000000; // a000000 (0, 10) = 2

  SBOX[1][184549376] = 0x84010; // b000000 (0, 11) = 13

  SBOX[1][201326592] = 0x80010; // c000000 (0, 12) = 12

  SBOX[1][218103808] = 0x0; // d000000 (0, 13) = 0

  SBOX[1][234881024] = 0x4010; // e000000 (0, 14) = 5

  SBOX[1][251658240] = 0x40080000; // f000000 (0, 15) = 10

  SBOX[1][8388608] = 0x40004000; // 800000 (1, 0) = 3

  SBOX[1][25165824] = 0x84010; // 1800000 (1, 1) = 13

  SBOX[1][41943040] = 0x10; // 2800000 (1, 2) = 4

  SBOX[1][58720256] = 0x40004010; // 3800000 (1, 3) = 7

  SBOX[1][75497472] = 0x40084010; // 4800000 (1, 4) = 15

  SBOX[1][92274688] = 0x40000000; // 5800000 (1, 5) = 2

  SBOX[1][109051904] = 0x80000; // 6800000 (1, 6) = 8

  SBOX[1][125829120] = 0x40080010; // 7800000 (1, 7) = 14

  SBOX[1][142606336] = 0x80010; // 8800000 (1, 8) = 12

  SBOX[1][159383552] = 0x0; // 9800000 (1, 9) = 0

  SBOX[1][176160768] = 0x4000; // a800000 (1, 10) = 1

  SBOX[1][192937984] = 0x40080000; // b800000 (1, 11) = 10

  SBOX[1][209715200] = 0x40000010; // c800000 (1, 12) = 6

  SBOX[1][226492416] = 0x84000; // d800000 (1, 13) = 9

  SBOX[1][243269632] = 0x40084000; // e800000 (1, 14) = 11

  SBOX[1][260046848] = 0x4010; // f800000 (1, 15) = 5

  SBOX[1][268435456] = 0x0; // 10000000 (2, 0) = 0

  SBOX[1][285212672] = 0x40080010; // 11000000 (2, 1) = 14

  SBOX[1][301989888] = 0x40004010; // 12000000 (2, 2) = 7

  SBOX[1][318767104] = 0x40084000; // 13000000 (2, 3) = 11

  SBOX[1][335544320] = 0x40080000; // 14000000 (2, 4) = 10

  SBOX[1][352321536] = 0x10; // 15000000 (2, 5) = 4

  SBOX[1][369098752] = 0x84010; // 16000000 (2, 6) = 13

  SBOX[1][385875968] = 0x4000; // 17000000 (2, 7) = 1

  SBOX[1][402653184] = 0x4010; // 18000000 (2, 8) = 5

  SBOX[1][419430400] = 0x80000; // 19000000 (2, 9) = 8

  SBOX[1][436207616] = 0x80010; // 1a000000 (2, 10) = 12

  SBOX[1][452984832] = 0x40000010; // 1b000000 (2, 11) = 6

  SBOX[1][469762048] = 0x84000; // 1c000000 (2, 12) = 9

  SBOX[1][486539264] = 0x40004000; // 1d000000 (2, 13) = 3

  SBOX[1][503316480] = 0x40000000; // 1e000000 (2, 14) = 2

  SBOX[1][520093696] = 0x40084010; // 1f000000 (2, 15) = 15

  SBOX[1][276824064] = 0x84010; // 10800000 (3, 0) = 13

  SBOX[1][293601280] = 0x80000; // 11800000 (3, 1) = 8

  SBOX[1][310378496] = 0x40080000; // 12800000 (3, 2) = 10

  SBOX[1][327155712] = 0x4000; // 13800000 (3, 3) = 1

  SBOX[1][343932928] = 0x40004000; // 14800000 (3, 4) = 3

  SBOX[1][360710144] = 0x40084010; // 15800000 (3, 5) = 15

  SBOX[1][377487360] = 0x10; // 16800000 (3, 6) = 4

  SBOX[1][394264576] = 0x40000000; // 17800000 (3, 7) = 2

  SBOX[1][411041792] = 0x40084000; // 18800000 (3, 8) = 11

  SBOX[1][427819008] = 0x40000010; // 19800000 (3, 9) = 6

  SBOX[1][444596224] = 0x40004010; // 1a800000 (3, 10) = 7

  SBOX[1][461373440] = 0x80010; // 1b800000 (3, 11) = 12

  SBOX[1][478150656] = 0x0; // 1c800000 (3, 12) = 0

  SBOX[1][494927872] = 0x4010; // 1d800000 (3, 13) = 5

  SBOX[1][511705088] = 0x40080010; // 1e800000 (3, 14) = 14

  SBOX[1][528482304] = 0x84000; // 1f800000 (3, 15) = 9

  SBOX[2] = new Array();
  SBOX[2][0] = 0x104; // 0 (0, 0) = 10

  SBOX[2][1048576] = 0x0; // 100000 (0, 1) = 0

  SBOX[2][2097152] = 0x4000100; // 200000 (0, 2) = 9

  SBOX[2][3145728] = 0x10104; // 300000 (0, 3) = 14

  SBOX[2][4194304] = 0x10004; // 400000 (0, 4) = 6

  SBOX[2][5242880] = 0x4000004; // 500000 (0, 5) = 3

  SBOX[2][6291456] = 0x4010104; // 600000 (0, 6) = 15

  SBOX[2][7340032] = 0x4010000; // 700000 (0, 7) = 5

  SBOX[2][8388608] = 0x4000000; // 800000 (0, 8) = 1

  SBOX[2][9437184] = 0x4010100; // 900000 (0, 9) = 13

  SBOX[2][10485760] = 0x10100; // a00000 (0, 10) = 12

  SBOX[2][11534336] = 0x4010004; // b00000 (0, 11) = 7

  SBOX[2][12582912] = 0x4000104; // c00000 (0, 12) = 11

  SBOX[2][13631488] = 0x10000; // d00000 (0, 13) = 4

  SBOX[2][14680064] = 0x4; // e00000 (0, 14) = 2

  SBOX[2][15728640] = 0x100; // f00000 (0, 15) = 8

  SBOX[2][524288] = 0x4010100; // 80000 (1, 0) = 13

  SBOX[2][1572864] = 0x4010004; // 180000 (1, 1) = 7

  SBOX[2][2621440] = 0x0; // 280000 (1, 2) = 0

  SBOX[2][3670016] = 0x4000100; // 380000 (1, 3) = 9

  SBOX[2][4718592] = 0x4000004; // 480000 (1, 4) = 3

  SBOX[2][5767168] = 0x10000; // 580000 (1, 5) = 4

  SBOX[2][6815744] = 0x10004; // 680000 (1, 6) = 6

  SBOX[2][7864320] = 0x104; // 780000 (1, 7) = 10

  SBOX[2][8912896] = 0x4; // 880000 (1, 8) = 2

  SBOX[2][9961472] = 0x100; // 980000 (1, 9) = 8

  SBOX[2][11010048] = 0x4010000; // a80000 (1, 10) = 5

  SBOX[2][12058624] = 0x10104; // b80000 (1, 11) = 14

  SBOX[2][13107200] = 0x10100; // c80000 (1, 12) = 12

  SBOX[2][14155776] = 0x4000104; // d80000 (1, 13) = 11

  SBOX[2][15204352] = 0x4010104; // e80000 (1, 14) = 15

  SBOX[2][16252928] = 0x4000000; // f80000 (1, 15) = 1

  SBOX[2][16777216] = 0x4010100; // 1000000 (2, 0) = 13

  SBOX[2][17825792] = 0x10004; // 1100000 (2, 1) = 6

  SBOX[2][18874368] = 0x10000; // 1200000 (2, 2) = 4

  SBOX[2][19922944] = 0x4000100; // 1300000 (2, 3) = 9

  SBOX[2][20971520] = 0x100; // 1400000 (2, 4) = 8

  SBOX[2][22020096] = 0x4010104; // 1500000 (2, 5) = 15

  SBOX[2][23068672] = 0x4000004; // 1600000 (2, 6) = 3

  SBOX[2][24117248] = 0x0; // 1700000 (2, 7) = 0

  SBOX[2][25165824] = 0x4000104; // 1800000 (2, 8) = 11

  SBOX[2][26214400] = 0x4000000; // 1900000 (2, 9) = 1

  SBOX[2][27262976] = 0x4; // 1a00000 (2, 10) = 2

  SBOX[2][28311552] = 0x10100; // 1b00000 (2, 11) = 12

  SBOX[2][29360128] = 0x4010000; // 1c00000 (2, 12) = 5

  SBOX[2][30408704] = 0x104; // 1d00000 (2, 13) = 10

  SBOX[2][31457280] = 0x10104; // 1e00000 (2, 14) = 14

  SBOX[2][32505856] = 0x4010004; // 1f00000 (2, 15) = 7

  SBOX[2][17301504] = 0x4000000; // 1080000 (3, 0) = 1

  SBOX[2][18350080] = 0x104; // 1180000 (3, 1) = 10

  SBOX[2][19398656] = 0x4010100; // 1280000 (3, 2) = 13

  SBOX[2][20447232] = 0x0; // 1380000 (3, 3) = 0

  SBOX[2][21495808] = 0x10004; // 1480000 (3, 4) = 6

  SBOX[2][22544384] = 0x4000100; // 1580000 (3, 5) = 9

  SBOX[2][23592960] = 0x100; // 1680000 (3, 6) = 8

  SBOX[2][24641536] = 0x4010004; // 1780000 (3, 7) = 7

  SBOX[2][25690112] = 0x10000; // 1880000 (3, 8) = 4

  SBOX[2][26738688] = 0x4010104; // 1980000 (3, 9) = 15

  SBOX[2][27787264] = 0x10104; // 1a80000 (3, 10) = 14

  SBOX[2][28835840] = 0x4000004; // 1b80000 (3, 11) = 3

  SBOX[2][29884416] = 0x4000104; // 1c80000 (3, 12) = 11

  SBOX[2][30932992] = 0x4010000; // 1d80000 (3, 13) = 5

  SBOX[2][31981568] = 0x4; // 1e80000 (3, 14) = 2

  SBOX[2][33030144] = 0x10100; // 1f80000 (3, 15) = 12

  SBOX[3] = new Array();
  SBOX[3][0] = 0x80401000; // 0 (0, 0) = 7

  SBOX[3][65536] = 0x80001040; // 10000 (0, 1) = 13

  SBOX[3][131072] = 0x401040; // 20000 (0, 2) = 14

  SBOX[3][196608] = 0x80400000; // 30000 (0, 3) = 3

  SBOX[3][262144] = 0x0; // 40000 (0, 4) = 0

  SBOX[3][327680] = 0x401000; // 50000 (0, 5) = 6

  SBOX[3][393216] = 0x80000040; // 60000 (0, 6) = 9

  SBOX[3][458752] = 0x400040; // 70000 (0, 7) = 10

  SBOX[3][524288] = 0x80000000; // 80000 (0, 8) = 1

  SBOX[3][589824] = 0x400000; // 90000 (0, 9) = 2

  SBOX[3][655360] = 0x40; // a0000 (0, 10) = 8

  SBOX[3][720896] = 0x80001000; // b0000 (0, 11) = 5

  SBOX[3][786432] = 0x80400040; // c0000 (0, 12) = 11

  SBOX[3][851968] = 0x1040; // d0000 (0, 13) = 12

  SBOX[3][917504] = 0x1000; // e0000 (0, 14) = 4

  SBOX[3][983040] = 0x80401040; // f0000 (0, 15) = 15

  SBOX[3][32768] = 0x80001040; // 8000 (1, 0) = 13

  SBOX[3][98304] = 0x40; // 18000 (1, 1) = 8

  SBOX[3][163840] = 0x80400040; // 28000 (1, 2) = 11

  SBOX[3][229376] = 0x80001000; // 38000 (1, 3) = 5

  SBOX[3][294912] = 0x401000; // 48000 (1, 4) = 6

  SBOX[3][360448] = 0x80401040; // 58000 (1, 5) = 15

  SBOX[3][425984] = 0x0; // 68000 (1, 6) = 0

  SBOX[3][491520] = 0x80400000; // 78000 (1, 7) = 3

  SBOX[3][557056] = 0x1000; // 88000 (1, 8) = 4

  SBOX[3][622592] = 0x80401000; // 98000 (1, 9) = 7

  SBOX[3][688128] = 0x400000; // a8000 (1, 10) = 2

  SBOX[3][753664] = 0x1040; // b8000 (1, 11) = 12

  SBOX[3][819200] = 0x80000000; // c8000 (1, 12) = 1

  SBOX[3][884736] = 0x400040; // d8000 (1, 13) = 10

  SBOX[3][950272] = 0x401040; // e8000 (1, 14) = 14

  SBOX[3][1015808] = 0x80000040; // f8000 (1, 15) = 9

  SBOX[3][1048576] = 0x400040; // 100000 (2, 0) = 10

  SBOX[3][1114112] = 0x401000; // 110000 (2, 1) = 6

  SBOX[3][1179648] = 0x80000040; // 120000 (2, 2) = 9

  SBOX[3][1245184] = 0x0; // 130000 (2, 3) = 0

  SBOX[3][1310720] = 0x1040; // 140000 (2, 4) = 12

  SBOX[3][1376256] = 0x80400040; // 150000 (2, 5) = 11

  SBOX[3][1441792] = 0x80401000; // 160000 (2, 6) = 7

  SBOX[3][1507328] = 0x80001040; // 170000 (2, 7) = 13

  SBOX[3][1572864] = 0x80401040; // 180000 (2, 8) = 15

  SBOX[3][1638400] = 0x80000000; // 190000 (2, 9) = 1

  SBOX[3][1703936] = 0x80400000; // 1a0000 (2, 10) = 3

  SBOX[3][1769472] = 0x401040; // 1b0000 (2, 11) = 14

  SBOX[3][1835008] = 0x80001000; // 1c0000 (2, 12) = 5

  SBOX[3][1900544] = 0x400000; // 1d0000 (2, 13) = 2

  SBOX[3][1966080] = 0x40; // 1e0000 (2, 14) = 8

  SBOX[3][2031616] = 0x1000; // 1f0000 (2, 15) = 4

  SBOX[3][1081344] = 0x80400000; // 108000 (3, 0) = 3

  SBOX[3][1146880] = 0x80401040; // 118000 (3, 1) = 15

  SBOX[3][1212416] = 0x0; // 128000 (3, 2) = 0

  SBOX[3][1277952] = 0x401000; // 138000 (3, 3) = 6

  SBOX[3][1343488] = 0x400040; // 148000 (3, 4) = 10

  SBOX[3][1409024] = 0x80000000; // 158000 (3, 5) = 1

  SBOX[3][1474560] = 0x80001040; // 168000 (3, 6) = 13

  SBOX[3][1540096] = 0x40; // 178000 (3, 7) = 8

  SBOX[3][1605632] = 0x80000040; // 188000 (3, 8) = 9

  SBOX[3][1671168] = 0x1000; // 198000 (3, 9) = 4

  SBOX[3][1736704] = 0x80001000; // 1a8000 (3, 10) = 5

  SBOX[3][1802240] = 0x80400040; // 1b8000 (3, 11) = 11

  SBOX[3][1867776] = 0x1040; // 1c8000 (3, 12) = 12

  SBOX[3][1933312] = 0x80401000; // 1d8000 (3, 13) = 7

  SBOX[3][1998848] = 0x400000; // 1e8000 (3, 14) = 2

  SBOX[3][2064384] = 0x401040; // 1f8000 (3, 15) = 14

  SBOX[4] = new Array();
  SBOX[4][0] = 0x80; // 0 (0, 0) = 2

  SBOX[4][4096] = 0x1040000; // 1000 (0, 1) = 12

  SBOX[4][8192] = 0x40000; // 2000 (0, 2) = 4

  SBOX[4][12288] = 0x20000000; // 3000 (0, 3) = 1

  SBOX[4][16384] = 0x20040080; // 4000 (0, 4) = 7

  SBOX[4][20480] = 0x1000080; // 5000 (0, 5) = 10

  SBOX[4][24576] = 0x21000080; // 6000 (0, 6) = 11

  SBOX[4][28672] = 0x40080; // 7000 (0, 7) = 6

  SBOX[4][32768] = 0x1000000; // 8000 (0, 8) = 8

  SBOX[4][36864] = 0x20040000; // 9000 (0, 9) = 5

  SBOX[4][40960] = 0x20000080; // a000 (0, 10) = 3

  SBOX[4][45056] = 0x21040080; // b000 (0, 11) = 15

  SBOX[4][49152] = 0x21040000; // c000 (0, 12) = 13

  SBOX[4][53248] = 0x0; // d000 (0, 13) = 0

  SBOX[4][57344] = 0x1040080; // e000 (0, 14) = 14

  SBOX[4][61440] = 0x21000000; // f000 (0, 15) = 9

  SBOX[4][2048] = 0x1040080; // 800 (1, 0) = 14

  SBOX[4][6144] = 0x21000080; // 1800 (1, 1) = 11

  SBOX[4][10240] = 0x80; // 2800 (1, 2) = 2

  SBOX[4][14336] = 0x1040000; // 3800 (1, 3) = 12

  SBOX[4][18432] = 0x40000; // 4800 (1, 4) = 4

  SBOX[4][22528] = 0x20040080; // 5800 (1, 5) = 7

  SBOX[4][26624] = 0x21040000; // 6800 (1, 6) = 13

  SBOX[4][30720] = 0x20000000; // 7800 (1, 7) = 1

  SBOX[4][34816] = 0x20040000; // 8800 (1, 8) = 5

  SBOX[4][38912] = 0x0; // 9800 (1, 9) = 0

  SBOX[4][43008] = 0x21040080; // a800 (1, 10) = 15

  SBOX[4][47104] = 0x1000080; // b800 (1, 11) = 10

  SBOX[4][51200] = 0x20000080; // c800 (1, 12) = 3

  SBOX[4][55296] = 0x21000000; // d800 (1, 13) = 9

  SBOX[4][59392] = 0x1000000; // e800 (1, 14) = 8

  SBOX[4][63488] = 0x40080; // f800 (1, 15) = 6

  SBOX[4][65536] = 0x40000; // 10000 (2, 0) = 4

  SBOX[4][69632] = 0x80; // 11000 (2, 1) = 2

  SBOX[4][73728] = 0x20000000; // 12000 (2, 2) = 1

  SBOX[4][77824] = 0x21000080; // 13000 (2, 3) = 11

  SBOX[4][81920] = 0x1000080; // 14000 (2, 4) = 10

  SBOX[4][86016] = 0x21040000; // 15000 (2, 5) = 13

  SBOX[4][90112] = 0x20040080; // 16000 (2, 6) = 7

  SBOX[4][94208] = 0x1000000; // 17000 (2, 7) = 8

  SBOX[4][98304] = 0x21040080; // 18000 (2, 8) = 15

  SBOX[4][102400] = 0x21000000; // 19000 (2, 9) = 9

  SBOX[4][106496] = 0x1040000; // 1a000 (2, 10) = 12

  SBOX[4][110592] = 0x20040000; // 1b000 (2, 11) = 5

  SBOX[4][114688] = 0x40080; // 1c000 (2, 12) = 6

  SBOX[4][118784] = 0x20000080; // 1d000 (2, 13) = 3

  SBOX[4][122880] = 0x0; // 1e000 (2, 14) = 0

  SBOX[4][126976] = 0x1040080; // 1f000 (2, 15) = 14

  SBOX[4][67584] = 0x21000080; // 10800 (3, 0) = 11

  SBOX[4][71680] = 0x1000000; // 11800 (3, 1) = 8

  SBOX[4][75776] = 0x1040000; // 12800 (3, 2) = 12

  SBOX[4][79872] = 0x20040080; // 13800 (3, 3) = 7

  SBOX[4][83968] = 0x20000000; // 14800 (3, 4) = 1

  SBOX[4][88064] = 0x1040080; // 15800 (3, 5) = 14

  SBOX[4][92160] = 0x80; // 16800 (3, 6) = 2

  SBOX[4][96256] = 0x21040000; // 17800 (3, 7) = 13

  SBOX[4][100352] = 0x40080; // 18800 (3, 8) = 6

  SBOX[4][104448] = 0x21040080; // 19800 (3, 9) = 15

  SBOX[4][108544] = 0x0; // 1a800 (3, 10) = 0

  SBOX[4][112640] = 0x21000000; // 1b800 (3, 11) = 9

  SBOX[4][116736] = 0x1000080; // 1c800 (3, 12) = 10

  SBOX[4][120832] = 0x40000; // 1d800 (3, 13) = 4

  SBOX[4][124928] = 0x20040000; // 1e800 (3, 14) = 5

  SBOX[4][129024] = 0x20000080; // 1f800 (3, 15) = 3

  SBOX[5] = new Array();
  SBOX[5][0] = 0x10000008; // 0 (0, 0) = 12

  SBOX[5][256] = 0x2000; // 100 (0, 1) = 1

  SBOX[5][512] = 0x10200000; // 200 (0, 2) = 10

  SBOX[5][768] = 0x10202008; // 300 (0, 3) = 15

  SBOX[5][1024] = 0x10002000; // 400 (0, 4) = 9

  SBOX[5][1280] = 0x200000; // 500 (0, 5) = 2

  SBOX[5][1536] = 0x200008; // 600 (0, 6) = 6

  SBOX[5][1792] = 0x10000000; // 700 (0, 7) = 8

  SBOX[5][2048] = 0x0; // 800 (0, 8) = 0

  SBOX[5][2304] = 0x10002008; // 900 (0, 9) = 13

  SBOX[5][2560] = 0x202000; // a00 (0, 10) = 3

  SBOX[5][2816] = 0x8; // b00 (0, 11) = 4

  SBOX[5][3072] = 0x10200008; // c00 (0, 12) = 14

  SBOX[5][3328] = 0x202008; // d00 (0, 13) = 7

  SBOX[5][3584] = 0x2008; // e00 (0, 14) = 5

  SBOX[5][3840] = 0x10202000; // f00 (0, 15) = 11

  SBOX[5][128] = 0x10200000; // 80 (1, 0) = 10

  SBOX[5][384] = 0x10202008; // 180 (1, 1) = 15

  SBOX[5][640] = 0x8; // 280 (1, 2) = 4

  SBOX[5][896] = 0x200000; // 380 (1, 3) = 2

  SBOX[5][1152] = 0x202008; // 480 (1, 4) = 7

  SBOX[5][1408] = 0x10000008; // 580 (1, 5) = 12

  SBOX[5][1664] = 0x10002000; // 680 (1, 6) = 9

  SBOX[5][1920] = 0x2008; // 780 (1, 7) = 5

  SBOX[5][2176] = 0x200008; // 880 (1, 8) = 6

  SBOX[5][2432] = 0x2000; // 980 (1, 9) = 1

  SBOX[5][2688] = 0x10002008; // a80 (1, 10) = 13

  SBOX[5][2944] = 0x10200008; // b80 (1, 11) = 14

  SBOX[5][3200] = 0x0; // c80 (1, 12) = 0

  SBOX[5][3456] = 0x10202000; // d80 (1, 13) = 11

  SBOX[5][3712] = 0x202000; // e80 (1, 14) = 3

  SBOX[5][3968] = 0x10000000; // f80 (1, 15) = 8

  SBOX[5][4096] = 0x10002000; // 1000 (2, 0) = 9

  SBOX[5][4352] = 0x10200008; // 1100 (2, 1) = 14

  SBOX[5][4608] = 0x10202008; // 1200 (2, 2) = 15

  SBOX[5][4864] = 0x2008; // 1300 (2, 3) = 5

  SBOX[5][5120] = 0x200000; // 1400 (2, 4) = 2

  SBOX[5][5376] = 0x10000000; // 1500 (2, 5) = 8

  SBOX[5][5632] = 0x10000008; // 1600 (2, 6) = 12

  SBOX[5][5888] = 0x202000; // 1700 (2, 7) = 3

  SBOX[5][6144] = 0x202008; // 1800 (2, 8) = 7

  SBOX[5][6400] = 0x0; // 1900 (2, 9) = 0

  SBOX[5][6656] = 0x8; // 1a00 (2, 10) = 4

  SBOX[5][6912] = 0x10200000; // 1b00 (2, 11) = 10

  SBOX[5][7168] = 0x2000; // 1c00 (2, 12) = 1

  SBOX[5][7424] = 0x10002008; // 1d00 (2, 13) = 13

  SBOX[5][7680] = 0x10202000; // 1e00 (2, 14) = 11

  SBOX[5][7936] = 0x200008; // 1f00 (2, 15) = 6

  SBOX[5][4224] = 0x8; // 1080 (3, 0) = 4

  SBOX[5][4480] = 0x202000; // 1180 (3, 1) = 3

  SBOX[5][4736] = 0x200000; // 1280 (3, 2) = 2

  SBOX[5][4992] = 0x10000008; // 1380 (3, 3) = 12

  SBOX[5][5248] = 0x10002000; // 1480 (3, 4) = 9

  SBOX[5][5504] = 0x2008; // 1580 (3, 5) = 5

  SBOX[5][5760] = 0x10202008; // 1680 (3, 6) = 15

  SBOX[5][6016] = 0x10200000; // 1780 (3, 7) = 10

  SBOX[5][6272] = 0x10202000; // 1880 (3, 8) = 11

  SBOX[5][6528] = 0x10200008; // 1980 (3, 9) = 14

  SBOX[5][6784] = 0x2000; // 1a80 (3, 10) = 1

  SBOX[5][7040] = 0x202008; // 1b80 (3, 11) = 7

  SBOX[5][7296] = 0x200008; // 1c80 (3, 12) = 6

  SBOX[5][7552] = 0x0; // 1d80 (3, 13) = 0

  SBOX[5][7808] = 0x10000000; // 1e80 (3, 14) = 8

  SBOX[5][8064] = 0x10002008; // 1f80 (3, 15) = 13

  SBOX[6] = new Array();
  SBOX[6][0] = 0x100000; // 0 (0, 0) = 4

  SBOX[6][16] = 0x2000401; // 10 (0, 1) = 11

  SBOX[6][32] = 0x400; // 20 (0, 2) = 2

  SBOX[6][48] = 0x100401; // 30 (0, 3) = 14

  SBOX[6][64] = 0x2100401; // 40 (0, 4) = 15

  SBOX[6][80] = 0x0; // 50 (0, 5) = 0

  SBOX[6][96] = 0x1; // 60 (0, 6) = 8

  SBOX[6][112] = 0x2100001; // 70 (0, 7) = 13

  SBOX[6][128] = 0x2000400; // 80 (0, 8) = 3

  SBOX[6][144] = 0x100001; // 90 (0, 9) = 12

  SBOX[6][160] = 0x2000001; // a0 (0, 10) = 9

  SBOX[6][176] = 0x2100400; // b0 (0, 11) = 7

  SBOX[6][192] = 0x2100000; // c0 (0, 12) = 5

  SBOX[6][208] = 0x401; // d0 (0, 13) = 10

  SBOX[6][224] = 0x100400; // e0 (0, 14) = 6

  SBOX[6][240] = 0x2000000; // f0 (0, 15) = 1

  SBOX[6][8] = 0x2100001; // 8 (1, 0) = 13

  SBOX[6][24] = 0x0; // 18 (1, 1) = 0

  SBOX[6][40] = 0x2000401; // 28 (1, 2) = 11

  SBOX[6][56] = 0x2100400; // 38 (1, 3) = 7

  SBOX[6][72] = 0x100000; // 48 (1, 4) = 4

  SBOX[6][88] = 0x2000001; // 58 (1, 5) = 9

  SBOX[6][104] = 0x2000000; // 68 (1, 6) = 1

  SBOX[6][120] = 0x401; // 78 (1, 7) = 10

  SBOX[6][136] = 0x100401; // 88 (1, 8) = 14

  SBOX[6][152] = 0x2000400; // 98 (1, 9) = 3

  SBOX[6][168] = 0x2100000; // a8 (1, 10) = 5

  SBOX[6][184] = 0x100001; // b8 (1, 11) = 12

  SBOX[6][200] = 0x400; // c8 (1, 12) = 2

  SBOX[6][216] = 0x2100401; // d8 (1, 13) = 15

  SBOX[6][232] = 0x1; // e8 (1, 14) = 8

  SBOX[6][248] = 0x100400; // f8 (1, 15) = 6

  SBOX[6][256] = 0x2000000; // 100 (2, 0) = 1

  SBOX[6][272] = 0x100000; // 110 (2, 1) = 4

  SBOX[6][288] = 0x2000401; // 120 (2, 2) = 11

  SBOX[6][304] = 0x2100001; // 130 (2, 3) = 13

  SBOX[6][320] = 0x100001; // 140 (2, 4) = 12

  SBOX[6][336] = 0x2000400; // 150 (2, 5) = 3

  SBOX[6][352] = 0x2100400; // 160 (2, 6) = 7

  SBOX[6][368] = 0x100401; // 170 (2, 7) = 14

  SBOX[6][384] = 0x401; // 180 (2, 8) = 10

  SBOX[6][400] = 0x2100401; // 190 (2, 9) = 15

  SBOX[6][416] = 0x100400; // 1a0 (2, 10) = 6

  SBOX[6][432] = 0x1; // 1b0 (2, 11) = 8

  SBOX[6][448] = 0x0; // 1c0 (2, 12) = 0

  SBOX[6][464] = 0x2100000; // 1d0 (2, 13) = 5

  SBOX[6][480] = 0x2000001; // 1e0 (2, 14) = 9

  SBOX[6][496] = 0x400; // 1f0 (2, 15) = 2

  SBOX[6][264] = 0x100400; // 108 (3, 0) = 6

  SBOX[6][280] = 0x2000401; // 118 (3, 1) = 11

  SBOX[6][296] = 0x2100001; // 128 (3, 2) = 13

  SBOX[6][312] = 0x1; // 138 (3, 3) = 8

  SBOX[6][328] = 0x2000000; // 148 (3, 4) = 1

  SBOX[6][344] = 0x100000; // 158 (3, 5) = 4

  SBOX[6][360] = 0x401; // 168 (3, 6) = 10

  SBOX[6][376] = 0x2100400; // 178 (3, 7) = 7

  SBOX[6][392] = 0x2000001; // 188 (3, 8) = 9

  SBOX[6][408] = 0x2100000; // 198 (3, 9) = 5

  SBOX[6][424] = 0x0; // 1a8 (3, 10) = 0

  SBOX[6][440] = 0x2100401; // 1b8 (3, 11) = 15

  SBOX[6][456] = 0x100401; // 1c8 (3, 12) = 14

  SBOX[6][472] = 0x400; // 1d8 (3, 13) = 2

  SBOX[6][488] = 0x2000400; // 1e8 (3, 14) = 3

  SBOX[6][504] = 0x100001; // 1f8 (3, 15) = 12

  SBOX[7] = new Array();
  SBOX[7][0] = 0x8000820; // 0 (0, 0) = 13

  SBOX[7][1] = 0x20000; // 1 (0, 1) = 2

  SBOX[7][2] = 0x8000000; // 2 (0, 2) = 8

  SBOX[7][3] = 0x20; // 3 (0, 3) = 4

  SBOX[7][4] = 0x20020; // 4 (0, 4) = 6

  SBOX[7][5] = 0x8020820; // 5 (0, 5) = 15

  SBOX[7][6] = 0x8020800; // 6 (0, 6) = 11

  SBOX[7][7] = 0x800; // 7 (0, 7) = 1

  SBOX[7][8] = 0x8020000; // 8 (0, 8) = 10

  SBOX[7][9] = 0x8000800; // 9 (0, 9) = 9

  SBOX[7][10] = 0x20800; // a (0, 10) = 3

  SBOX[7][11] = 0x8020020; // b (0, 11) = 14

  SBOX[7][12] = 0x820; // c (0, 12) = 5

  SBOX[7][13] = 0x0; // d (0, 13) = 0

  SBOX[7][14] = 0x8000020; // e (0, 14) = 12

  SBOX[7][15] = 0x20820; // f (0, 15) = 7

  SBOX[7][-2147483648] = 0x800; // 80000000 (1, 0) = 1

  SBOX[7][-2147483647] = 0x8020820; // 80000001 (1, 1) = 15

  SBOX[7][-2147483646] = 0x8000820; // 80000002 (1, 2) = 13

  SBOX[7][-2147483645] = 0x8000000; // 80000003 (1, 3) = 8

  SBOX[7][-2147483644] = 0x8020000; // 80000004 (1, 4) = 10

  SBOX[7][-2147483643] = 0x20800; // 80000005 (1, 5) = 3

  SBOX[7][-2147483642] = 0x20820; // 80000006 (1, 6) = 7

  SBOX[7][-2147483641] = 0x20; // 80000007 (1, 7) = 4

  SBOX[7][-2147483640] = 0x8000020; // 80000008 (1, 8) = 12

  SBOX[7][-2147483639] = 0x820; // 80000009 (1, 9) = 5

  SBOX[7][-2147483638] = 0x20020; // 8000000a (1, 10) = 6

  SBOX[7][-2147483637] = 0x8020800; // 8000000b (1, 11) = 11

  SBOX[7][-2147483636] = 0x0; // 8000000c (1, 12) = 0

  SBOX[7][-2147483635] = 0x8020020; // 8000000d (1, 13) = 14

  SBOX[7][-2147483634] = 0x8000800; // 8000000e (1, 14) = 9

  SBOX[7][-2147483633] = 0x20000; // 8000000f (1, 15) = 2

  SBOX[7][16] = 0x20820; // 10 (2, 0) = 7

  SBOX[7][17] = 0x8020800; // 11 (2, 1) = 11

  SBOX[7][18] = 0x20; // 12 (2, 2) = 4

  SBOX[7][19] = 0x800; // 13 (2, 3) = 1

  SBOX[7][20] = 0x8000800; // 14 (2, 4) = 9

  SBOX[7][21] = 0x8000020; // 15 (2, 5) = 12

  SBOX[7][22] = 0x8020020; // 16 (2, 6) = 14

  SBOX[7][23] = 0x20000; // 17 (2, 7) = 2

  SBOX[7][24] = 0x0; // 18 (2, 8) = 0

  SBOX[7][25] = 0x20020; // 19 (2, 9) = 6

  SBOX[7][26] = 0x8020000; // 1a (2, 10) = 10

  SBOX[7][27] = 0x8000820; // 1b (2, 11) = 13

  SBOX[7][28] = 0x8020820; // 1c (2, 12) = 15

  SBOX[7][29] = 0x20800; // 1d (2, 13) = 3

  SBOX[7][30] = 0x820; // 1e (2, 14) = 5

  SBOX[7][31] = 0x8000000; // 1f (2, 15) = 8

  SBOX[7][-2147483632] = 0x20000; // 80000010 (3, 0) = 2

  SBOX[7][-2147483631] = 0x800; // 80000011 (3, 1) = 1

  SBOX[7][-2147483630] = 0x8020020; // 80000012 (3, 2) = 14

  SBOX[7][-2147483629] = 0x20820; // 80000013 (3, 3) = 7

  SBOX[7][-2147483628] = 0x20; // 80000014 (3, 4) = 4

  SBOX[7][-2147483627] = 0x8020000; // 80000015 (3, 5) = 10

  SBOX[7][-2147483626] = 0x8000000; // 80000016 (3, 6) = 8

  SBOX[7][-2147483625] = 0x8000820; // 80000017 (3, 7) = 13

  SBOX[7][-2147483624] = 0x8020820; // 80000018 (3, 8) = 15

  SBOX[7][-2147483623] = 0x8000020; // 80000019 (3, 9) = 12

  SBOX[7][-2147483622] = 0x8000800; // 8000001a (3, 10) = 9

  SBOX[7][-2147483621] = 0x0; // 8000001b (3, 11) = 0

  SBOX[7][-2147483620] = 0x20800; // 8000001c (3, 12) = 3

  SBOX[7][-2147483619] = 0x820; // 8000001d (3, 13) = 5

  SBOX[7][-2147483618] = 0x20020; // 8000001e (3, 14) = 6

  SBOX[7][-2147483617] = 0x8020800; // 8000001f (3, 15) = 11

  State.prototype._exchangeLR = function (v, m) {
    var t = (this.lhs >> v ^ this.rhs) & m;
    this.rhs ^= t;
    this.lhs ^= t << v;
  };

  State.prototype._exchangeRL = function (v, m) {
    var t = (this.rhs >> v ^ this.lhs) & m;
    this.lhs ^= t;
    this.rhs ^= t << v;
  };
  /**
   * Perform the initial permutation of the input to create the starting state
   * of the algorithm. The initial permutation maps each consecutive bit of
   * the input into a different byte of the state.
   * 
   * <pre>
   * The initial permutation is defined to be:
   * 
   *      58    50   42    34    26   18    10    2  
   *      60    52   44    36    28   20    12    4
   *      62    54   46    38    30   22    14    6
   *      64    56   48    40    32   24    16    8
   *      57    49   41    33    25   17     9    1
   *      59    51   43    35    27   19    11    3
   *      61    53   45    37    29   21    13    5
   *      63    55   47    39    31   23    15    7
   * </pre>
   * 
   * 
   * @param message
   *            The message as an array of unsigned bytes.
   * @param offset
   *            The offset into the message that the current 64-bit block
   *            begins.
   * @returns the initial engine state
   */


  State.prototype.initialPerm = function (message, offset) {
    var input = message.slice(offset, offset + 8);
    this.lhs = (input[0] << 24) + (input[1] << 16) + (input[2] << 8) + input[3];
    this.rhs = (input[4] << 24) + (input[5] << 16) + (input[6] << 8) + input[7];

    this._exchangeLR(4, 0x0f0f0f0f);

    this._exchangeLR(16, 0x0000ffff);

    this._exchangeRL(2, 0x33333333);

    this._exchangeRL(8, 0x00ff00ff);

    this._exchangeLR(1, 0x55555555);
  };
  /**
   * Perform one round of the DES algorithm using the given key. A round is
   * defined as:
   * 
   * <pre>
   * L&amp;rsquo = R
   * R&amp;rsquo = L &circ; f(R, k)
   * </pre>
   * 
   * where f consists of expanding, XORing with the key and contracting back
   * with the SBOXes.
   * 
   * Note that the final round is defined slightly differently as:
   * 
   * <pre>
   * L&amp;rsquo = L &circ; f(R, k)
   * R&amp;rsquo = R
   * </pre>
   * 
   * Therefore in the final round this function produces LHS and RHS the wrong
   * way around.
   * 
   * @param k
   *            the key
   */


  State.prototype.round = function (k) {
    var r = this.rhs,
        l = this.lhs;
    var f = 0;

    for (var i = 0; i < 8; i++) {
      var v = (r ^ k[i]) & State.SBOX_MASK[i];
      f += State.SBOX[i][v];
    }

    this.lhs = r;
    this.rhs = l ^ f;
  };
  /**
   * Apply the inverse of the initial permutation.
   * 
   * <pre>
   * The inverse is defined to be:
   * 
   *      40     8   48    16    56   24    64   32
   *      39     7   47    15    55   23    63   31
   *      38     6   46    14    54   22    62   30
   *      37     5   45    13    53   21    61   29
   *      36     4   44    12    52   20    60   28
   *      35     3   43    11    51   19    59   27
   *      34     2   42    10    50   18    58   26
   *      33     1   41     9    49   17    57   25
   * </pre>
   * 
   * @param cipherText
   * @param offset
   */


  State.prototype.finalPerm = function (cipherText, offset) {
    var t = this.lhs;
    this.lhs = this.rhs;
    this.rhs = t;

    this._exchangeLR(1, 0x55555555);

    this._exchangeRL(8, 0x00ff00ff);

    this._exchangeRL(2, 0x33333333);

    this._exchangeLR(16, 0x0000ffff);

    this._exchangeLR(4, 0x0f0f0f0f);

    cipherText[offset] = this.lhs >> 24 & 0xff;
    cipherText[offset + 1] = this.lhs >> 16 & 0xff;
    cipherText[offset + 2] = this.lhs >> 8 & 0xff;
    cipherText[offset + 3] = this.lhs & 0xff;
    cipherText[offset + 4] = this.rhs >> 24 & 0xff;
    cipherText[offset + 5] = this.rhs >> 16 & 0xff;
    cipherText[offset + 6] = this.rhs >> 8 & 0xff;
    cipherText[offset + 7] = this.rhs & 0xff;
  };
  /**
   * DES cipher
   */


  var DES = C.DES = {
    _blocksize: 2,
    _keyschedule: null,
    _state: new State(),
    _init: function _init(k) {
      this._keyschedule = new KeySchedule(k);
    },
    encrypt: function encrypt(message, password, options) {
      options = options || {}; // Determine mode

      var mode = options.mode || new C.mode.OFB(); // Allow mode to override options

      if (mode.fixOptions) mode.fixOptions(options);
      var // Convert to bytes if message is a string
      m = message.constructor == String ? UTF8.stringToBytes(message) : message,
          // Generate random IV
      iv = options.iv || util.randomBytes(8),
          // Generate key
      k = password.constructor == String ? // Derive key from passphrase
      C.PBKDF2(password, iv, 8, {
        asBytes: true
      }) : // else, assume byte array representing cryptographic key
      password; // Create key schedule

      this._keyschedule = new KeySchedule(k); // Encrypt

      mode.encrypt(DES, m, iv); // Return ciphertext

      m = options.iv ? m : iv.concat(m);
      return options && options.asBytes ? m : util.bytesToBase64(m);
    },
    _encryptblock: function _encryptblock(message, offset) {
      this._state.initialPerm(message, offset);

      for (var i = 0; i <= 15; i++) {
        this._state.round(this._keyschedule.getKey(i));
      }

      this._state.finalPerm(message, offset);
    },
    decrypt: function decrypt(ciphertext, password, options) {
      options = options || {}; // Determine mode

      var mode = options.mode || new C.mode.OFB(); // Allow mode to override options

      if (mode.fixOptions) mode.fixOptions(options);
      var // Convert to bytes if ciphertext is a string
      c = ciphertext.constructor == String ? util.base64ToBytes(ciphertext) : ciphertext,
          // Separate IV and message
      iv = options.iv || c.splice(0, 8),
          // Generate key
      k = password.constructor == String ? // Derive key from passphrase
      C.PBKDF2(password, iv, 32, {
        asBytes: true
      }) : // else, assume byte array representing cryptographic key
      password; // Create key schedule

      this._keyschedule = new KeySchedule(k);
      mode.decrypt(DES, c, iv); // Return plaintext

      return options && options.asBytes ? c : UTF8.bytesToString(c);
    },
    _decryptblock: function _decryptblock(message, offset) {
      this._state.initialPerm(message, offset);

      for (var i = 15; i >= 0; i--) {
        this._state.round(this._keyschedule.getKey(i));
      }

      this._state.finalPerm(message, offset);
    }
  };
})();

/***/ }),

/***/ 26:
/*!*****************************************!*\
  !*** ./src/modules/cryptojs/lib/AES.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var C = typeof window === 'undefined' ? __webpack_require__(/*! ./Crypto */ 22).Crypto : window.Crypto; // Shortcuts

  var util = C.util,
      charenc = C.charenc,
      UTF8 = charenc.UTF8; // Precomputed SBOX

  var SBOX = [0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76, 0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0, 0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15, 0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75, 0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84, 0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf, 0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8, 0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2, 0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73, 0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb, 0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79, 0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08, 0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a, 0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e, 0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf, 0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16]; // Compute inverse SBOX lookup table

  for (var INVSBOX = [], i = 0; i < 256; i++) {
    INVSBOX[SBOX[i]] = i;
  } // Compute mulitplication in GF(2^8) lookup tables


  var MULT2 = [],
      MULT3 = [],
      MULT9 = [],
      MULTB = [],
      MULTD = [],
      MULTE = [];

  function xtime(a, b) {
    for (var result = 0, i = 0; i < 8; i++) {
      if (b & 1) result ^= a;
      var hiBitSet = a & 0x80;
      a = a << 1 & 0xFF;
      if (hiBitSet) a ^= 0x1b;
      b >>>= 1;
    }

    return result;
  }

  for (var i = 0; i < 256; i++) {
    MULT2[i] = xtime(i, 2);
    MULT3[i] = xtime(i, 3);
    MULT9[i] = xtime(i, 9);
    MULTB[i] = xtime(i, 0xB);
    MULTD[i] = xtime(i, 0xD);
    MULTE[i] = xtime(i, 0xE);
  } // Precomputed RCon lookup


  var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36]; // Inner state

  var state = [[], [], [], []],
      keylength,
      nrounds,
      keyschedule;
  var AES = C.AES = {
    /**
     * Public API
     */
    encrypt: function encrypt(message, password, options) {
      options = options || {}; // Determine mode

      var mode = options.mode || new C.mode.OFB(); // Allow mode to override options

      if (mode.fixOptions) mode.fixOptions(options);
      var // Convert to bytes if message is a string
      m = message.constructor == String ? UTF8.stringToBytes(message) : message,
          // Generate random IV
      iv = options.iv || util.randomBytes(AES._blocksize * 4),
          // Generate key
      k = password.constructor == String ? // Derive key from passphrase
      C.PBKDF2(password, iv, 32, {
        asBytes: true
      }) : // else, assume byte array representing cryptographic key
      password; // Encrypt

      AES._init(k);

      mode.encrypt(AES, m, iv); // Return ciphertext

      m = options.iv ? m : iv.concat(m);
      return options && options.asBytes ? m : util.bytesToBase64(m);
    },
    decrypt: function decrypt(ciphertext, password, options) {
      options = options || {}; // Determine mode

      var mode = options.mode || new C.mode.OFB(); // Allow mode to override options

      if (mode.fixOptions) mode.fixOptions(options);
      var // Convert to bytes if ciphertext is a string
      c = ciphertext.constructor == String ? util.base64ToBytes(ciphertext) : ciphertext,
          // Separate IV and message
      iv = options.iv || c.splice(0, AES._blocksize * 4),
          // Generate key
      k = password.constructor == String ? // Derive key from passphrase
      C.PBKDF2(password, iv, 32, {
        asBytes: true
      }) : // else, assume byte array representing cryptographic key
      password; // Decrypt

      AES._init(k);

      mode.decrypt(AES, c, iv); // Return plaintext

      return options && options.asBytes ? c : UTF8.bytesToString(c);
    },

    /**
     * Package private methods and properties
     */
    _blocksize: 4,
    _encryptblock: function _encryptblock(m, offset) {
      // Set input
      for (var row = 0; row < AES._blocksize; row++) {
        for (var col = 0; col < 4; col++) {
          state[row][col] = m[offset + col * 4 + row];
        }
      } // Add round key


      for (var row = 0; row < 4; row++) {
        for (var col = 0; col < 4; col++) {
          state[row][col] ^= keyschedule[col][row];
        }
      }

      for (var round = 1; round < nrounds; round++) {
        // Sub bytes
        for (var row = 0; row < 4; row++) {
          for (var col = 0; col < 4; col++) {
            state[row][col] = SBOX[state[row][col]];
          }
        } // Shift rows


        state[1].push(state[1].shift());
        state[2].push(state[2].shift());
        state[2].push(state[2].shift());
        state[3].unshift(state[3].pop()); // Mix columns

        for (var col = 0; col < 4; col++) {
          var s0 = state[0][col],
              s1 = state[1][col],
              s2 = state[2][col],
              s3 = state[3][col];
          state[0][col] = MULT2[s0] ^ MULT3[s1] ^ s2 ^ s3;
          state[1][col] = s0 ^ MULT2[s1] ^ MULT3[s2] ^ s3;
          state[2][col] = s0 ^ s1 ^ MULT2[s2] ^ MULT3[s3];
          state[3][col] = MULT3[s0] ^ s1 ^ s2 ^ MULT2[s3];
        } // Add round key


        for (var row = 0; row < 4; row++) {
          for (var col = 0; col < 4; col++) {
            state[row][col] ^= keyschedule[round * 4 + col][row];
          }
        }
      } // Sub bytes


      for (var row = 0; row < 4; row++) {
        for (var col = 0; col < 4; col++) {
          state[row][col] = SBOX[state[row][col]];
        }
      } // Shift rows


      state[1].push(state[1].shift());
      state[2].push(state[2].shift());
      state[2].push(state[2].shift());
      state[3].unshift(state[3].pop()); // Add round key

      for (var row = 0; row < 4; row++) {
        for (var col = 0; col < 4; col++) {
          state[row][col] ^= keyschedule[nrounds * 4 + col][row];
        }
      } // Set output


      for (var row = 0; row < AES._blocksize; row++) {
        for (var col = 0; col < 4; col++) {
          m[offset + col * 4 + row] = state[row][col];
        }
      }
    },
    _decryptblock: function _decryptblock(c, offset) {
      // Set input
      for (var row = 0; row < AES._blocksize; row++) {
        for (var col = 0; col < 4; col++) {
          state[row][col] = c[offset + col * 4 + row];
        }
      } // Add round key


      for (var row = 0; row < 4; row++) {
        for (var col = 0; col < 4; col++) {
          state[row][col] ^= keyschedule[nrounds * 4 + col][row];
        }
      }

      for (var round = 1; round < nrounds; round++) {
        // Inv shift rows
        state[1].unshift(state[1].pop());
        state[2].push(state[2].shift());
        state[2].push(state[2].shift());
        state[3].push(state[3].shift()); // Inv sub bytes

        for (var row = 0; row < 4; row++) {
          for (var col = 0; col < 4; col++) {
            state[row][col] = INVSBOX[state[row][col]];
          }
        } // Add round key


        for (var row = 0; row < 4; row++) {
          for (var col = 0; col < 4; col++) {
            state[row][col] ^= keyschedule[(nrounds - round) * 4 + col][row];
          }
        } // Inv mix columns


        for (var col = 0; col < 4; col++) {
          var s0 = state[0][col],
              s1 = state[1][col],
              s2 = state[2][col],
              s3 = state[3][col];
          state[0][col] = MULTE[s0] ^ MULTB[s1] ^ MULTD[s2] ^ MULT9[s3];
          state[1][col] = MULT9[s0] ^ MULTE[s1] ^ MULTB[s2] ^ MULTD[s3];
          state[2][col] = MULTD[s0] ^ MULT9[s1] ^ MULTE[s2] ^ MULTB[s3];
          state[3][col] = MULTB[s0] ^ MULTD[s1] ^ MULT9[s2] ^ MULTE[s3];
        }
      } // Inv shift rows


      state[1].unshift(state[1].pop());
      state[2].push(state[2].shift());
      state[2].push(state[2].shift());
      state[3].push(state[3].shift()); // Inv sub bytes

      for (var row = 0; row < 4; row++) {
        for (var col = 0; col < 4; col++) {
          state[row][col] = INVSBOX[state[row][col]];
        }
      } // Add round key


      for (var row = 0; row < 4; row++) {
        for (var col = 0; col < 4; col++) {
          state[row][col] ^= keyschedule[col][row];
        }
      } // Set output


      for (var row = 0; row < AES._blocksize; row++) {
        for (var col = 0; col < 4; col++) {
          c[offset + col * 4 + row] = state[row][col];
        }
      }
    },

    /**
     * Private methods
     */
    _init: function _init(k) {
      keylength = k.length / 4;
      nrounds = keylength + 6;

      AES._keyexpansion(k);
    },
    // Generate a key schedule
    _keyexpansion: function _keyexpansion(k) {
      keyschedule = [];

      for (var row = 0; row < keylength; row++) {
        keyschedule[row] = [k[row * 4], k[row * 4 + 1], k[row * 4 + 2], k[row * 4 + 3]];
      }

      for (var row = keylength; row < AES._blocksize * (nrounds + 1); row++) {
        var temp = [keyschedule[row - 1][0], keyschedule[row - 1][1], keyschedule[row - 1][2], keyschedule[row - 1][3]];

        if (row % keylength == 0) {
          // Rot word
          temp.push(temp.shift()); // Sub word

          temp[0] = SBOX[temp[0]];
          temp[1] = SBOX[temp[1]];
          temp[2] = SBOX[temp[2]];
          temp[3] = SBOX[temp[3]];
          temp[0] ^= RCON[row / keylength];
        } else if (keylength > 6 && row % keylength == 4) {
          // Sub word
          temp[0] = SBOX[temp[0]];
          temp[1] = SBOX[temp[1]];
          temp[2] = SBOX[temp[2]];
          temp[3] = SBOX[temp[3]];
        }

        keyschedule[row] = [keyschedule[row - keylength][0] ^ temp[0], keyschedule[row - keylength][1] ^ temp[1], keyschedule[row - keylength][2] ^ temp[2], keyschedule[row - keylength][3] ^ temp[3]];
      }
    }
  };
})();

/***/ }),

/***/ 27:
/*!******************************************!*\
  !*** ./src/modules/cryptojs/lib/HMAC.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var C = typeof window === 'undefined' ? __webpack_require__(/*! ./Crypto */ 22).Crypto : window.Crypto; // Shortcuts

  var util = C.util,
      charenc = C.charenc,
      UTF8 = charenc.UTF8,
      Binary = charenc.Binary;

  C.HMAC = function (hasher, message, key, options) {
    // Convert to byte arrays
    if (message.constructor == String) message = UTF8.stringToBytes(message);
    if (key.constructor == String) key = UTF8.stringToBytes(key);
    /* else, assume byte arrays already */
    // Allow arbitrary length keys

    if (key.length > hasher._blocksize * 4) key = hasher(key, {
      asBytes: true
    }); // XOR keys with pad constants

    var okey = key.slice(0),
        ikey = key.slice(0);

    for (var i = 0; i < hasher._blocksize * 4; i++) {
      okey[i] ^= 0x5C;
      ikey[i] ^= 0x36;
    }

    var hmacbytes = hasher(okey.concat(hasher(ikey.concat(message), {
      asBytes: true
    })), {
      asBytes: true
    });
    return options && options.asBytes ? hmacbytes : options && options.asString ? Binary.bytesToString(hmacbytes) : util.bytesToHex(hmacbytes);
  };
})();

/***/ }),

/***/ 28:
/*!*******************************************!*\
  !*** ./src/modules/cryptojs/lib/MARC4.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var C = typeof window === 'undefined' ? __webpack_require__(/*! ./Crypto */ 22).Crypto : window.Crypto; // Shortcuts

  var util = C.util,
      charenc = C.charenc,
      UTF8 = charenc.UTF8,
      Binary = charenc.Binary;
  var MARC4 = C.MARC4 = {
    /**
     * Public API
     */
    encrypt: function encrypt(message, password) {
      var // Convert to bytes
      m = UTF8.stringToBytes(message),
          // Generate random IV
      iv = util.randomBytes(16),
          // Generate key
      k = password.constructor == String ? // Derive key from passphrase
      C.PBKDF2(password, iv, 32, {
        asBytes: true
      }) : // else, assume byte array representing cryptographic key
      password; // Encrypt

      MARC4._marc4(m, k, 1536); // Return ciphertext


      return util.bytesToBase64(iv.concat(m));
    },
    decrypt: function decrypt(ciphertext, password) {
      var // Convert to bytes
      c = util.base64ToBytes(ciphertext),
          // Separate IV and message
      iv = c.splice(0, 16),
          // Generate key
      k = password.constructor == String ? // Derive key from passphrase
      C.PBKDF2(password, iv, 32, {
        asBytes: true
      }) : // else, assume byte array representing cryptographic key
      password; // Decrypt

      MARC4._marc4(c, k, 1536); // Return plaintext


      return UTF8.bytesToString(c);
    },

    /**
     * Internal methods
     */
    // The core
    _marc4: function _marc4(m, k, drop) {
      // State variables
      var i, j, s, temp; // Key setup

      for (i = 0, s = []; i < 256; i++) {
        s[i] = i;
      }

      for (i = 0, j = 0; i < 256; i++) {
        j = (j + s[i] + k[i % k.length]) % 256; // Swap

        temp = s[i];
        s[i] = s[j];
        s[j] = temp;
      } // Clear counters


      i = j = 0; // Encryption

      for (var k = -drop; k < m.length; k++) {
        i = (i + 1) % 256;
        j = (j + s[i]) % 256; // Swap

        temp = s[i];
        s[i] = s[j];
        s[j] = temp; // Stop here if we're still dropping keystream

        if (k < 0) continue; // Encrypt

        m[k] ^= s[(s[i] + s[j]) % 256];
      }
    }
  };
})();

/***/ }),

/***/ 29:
/*!*****************************************!*\
  !*** ./src/modules/cryptojs/lib/MD5.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var C = typeof window === 'undefined' ? __webpack_require__(/*! ./Crypto */ 22).Crypto : window.Crypto; // Shortcuts

  var util = C.util,
      charenc = C.charenc,
      UTF8 = charenc.UTF8,
      Binary = charenc.Binary; // Public API

  var MD5 = C.MD5 = function (message, options) {
    var digestbytes = util.wordsToBytes(MD5._md5(message));
    return options && options.asBytes ? digestbytes : options && options.asString ? Binary.bytesToString(digestbytes) : util.bytesToHex(digestbytes);
  }; // The core


  MD5._md5 = function (message) {
    // Convert to byte array
    if (message.constructor == String) message = UTF8.stringToBytes(message);
    /* else, assume byte array already */

    var m = util.bytesToWords(message),
        l = message.length * 8,
        a = 1732584193,
        b = -271733879,
        c = -1732584194,
        d = 271733878; // Swap endian

    for (var i = 0; i < m.length; i++) {
      m[i] = (m[i] << 8 | m[i] >>> 24) & 0x00FF00FF | (m[i] << 24 | m[i] >>> 8) & 0xFF00FF00;
    } // Padding


    m[l >>> 5] |= 0x80 << l % 32;
    m[(l + 64 >>> 9 << 4) + 14] = l; // Method shortcuts

    var FF = MD5._ff,
        GG = MD5._gg,
        HH = MD5._hh,
        II = MD5._ii;

    for (var i = 0; i < m.length; i += 16) {
      var aa = a,
          bb = b,
          cc = c,
          dd = d;
      a = FF(a, b, c, d, m[i + 0], 7, -680876936);
      d = FF(d, a, b, c, m[i + 1], 12, -389564586);
      c = FF(c, d, a, b, m[i + 2], 17, 606105819);
      b = FF(b, c, d, a, m[i + 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i + 4], 7, -176418897);
      d = FF(d, a, b, c, m[i + 5], 12, 1200080426);
      c = FF(c, d, a, b, m[i + 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i + 7], 22, -45705983);
      a = FF(a, b, c, d, m[i + 8], 7, 1770035416);
      d = FF(d, a, b, c, m[i + 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i + 10], 17, -42063);
      b = FF(b, c, d, a, m[i + 11], 22, -1990404162);
      a = FF(a, b, c, d, m[i + 12], 7, 1804603682);
      d = FF(d, a, b, c, m[i + 13], 12, -40341101);
      c = FF(c, d, a, b, m[i + 14], 17, -1502002290);
      b = FF(b, c, d, a, m[i + 15], 22, 1236535329);
      a = GG(a, b, c, d, m[i + 1], 5, -165796510);
      d = GG(d, a, b, c, m[i + 6], 9, -1069501632);
      c = GG(c, d, a, b, m[i + 11], 14, 643717713);
      b = GG(b, c, d, a, m[i + 0], 20, -373897302);
      a = GG(a, b, c, d, m[i + 5], 5, -701558691);
      d = GG(d, a, b, c, m[i + 10], 9, 38016083);
      c = GG(c, d, a, b, m[i + 15], 14, -660478335);
      b = GG(b, c, d, a, m[i + 4], 20, -405537848);
      a = GG(a, b, c, d, m[i + 9], 5, 568446438);
      d = GG(d, a, b, c, m[i + 14], 9, -1019803690);
      c = GG(c, d, a, b, m[i + 3], 14, -187363961);
      b = GG(b, c, d, a, m[i + 8], 20, 1163531501);
      a = GG(a, b, c, d, m[i + 13], 5, -1444681467);
      d = GG(d, a, b, c, m[i + 2], 9, -51403784);
      c = GG(c, d, a, b, m[i + 7], 14, 1735328473);
      b = GG(b, c, d, a, m[i + 12], 20, -1926607734);
      a = HH(a, b, c, d, m[i + 5], 4, -378558);
      d = HH(d, a, b, c, m[i + 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i + 11], 16, 1839030562);
      b = HH(b, c, d, a, m[i + 14], 23, -35309556);
      a = HH(a, b, c, d, m[i + 1], 4, -1530992060);
      d = HH(d, a, b, c, m[i + 4], 11, 1272893353);
      c = HH(c, d, a, b, m[i + 7], 16, -155497632);
      b = HH(b, c, d, a, m[i + 10], 23, -1094730640);
      a = HH(a, b, c, d, m[i + 13], 4, 681279174);
      d = HH(d, a, b, c, m[i + 0], 11, -358537222);
      c = HH(c, d, a, b, m[i + 3], 16, -722521979);
      b = HH(b, c, d, a, m[i + 6], 23, 76029189);
      a = HH(a, b, c, d, m[i + 9], 4, -640364487);
      d = HH(d, a, b, c, m[i + 12], 11, -421815835);
      c = HH(c, d, a, b, m[i + 15], 16, 530742520);
      b = HH(b, c, d, a, m[i + 2], 23, -995338651);
      a = II(a, b, c, d, m[i + 0], 6, -198630844);
      d = II(d, a, b, c, m[i + 7], 10, 1126891415);
      c = II(c, d, a, b, m[i + 14], 15, -1416354905);
      b = II(b, c, d, a, m[i + 5], 21, -57434055);
      a = II(a, b, c, d, m[i + 12], 6, 1700485571);
      d = II(d, a, b, c, m[i + 3], 10, -1894986606);
      c = II(c, d, a, b, m[i + 10], 15, -1051523);
      b = II(b, c, d, a, m[i + 1], 21, -2054922799);
      a = II(a, b, c, d, m[i + 8], 6, 1873313359);
      d = II(d, a, b, c, m[i + 15], 10, -30611744);
      c = II(c, d, a, b, m[i + 6], 15, -1560198380);
      b = II(b, c, d, a, m[i + 13], 21, 1309151649);
      a = II(a, b, c, d, m[i + 4], 6, -145523070);
      d = II(d, a, b, c, m[i + 11], 10, -1120210379);
      c = II(c, d, a, b, m[i + 2], 15, 718787259);
      b = II(b, c, d, a, m[i + 9], 21, -343485551);
      a = a + aa >>> 0;
      b = b + bb >>> 0;
      c = c + cc >>> 0;
      d = d + dd >>> 0;
    }

    return util.endian([a, b, c, d]);
  }; // Auxiliary functions


  MD5._ff = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return (n << s | n >>> 32 - s) + b;
  };

  MD5._gg = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return (n << s | n >>> 32 - s) + b;
  };

  MD5._hh = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return (n << s | n >>> 32 - s) + b;
  };

  MD5._ii = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return (n << s | n >>> 32 - s) + b;
  }; // Package private blocksize


  MD5._blocksize = 16;
  MD5._digestsize = 16;
})();

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 30:
/*!********************************************!*\
  !*** ./src/modules/cryptojs/lib/PBKDF2.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var C = typeof window === 'undefined' ? __webpack_require__(/*! ./Crypto */ 22).Crypto : window.Crypto; // Shortcuts

  var util = C.util,
      charenc = C.charenc,
      UTF8 = charenc.UTF8,
      Binary = charenc.Binary;

  C.PBKDF2 = function (password, salt, keylen, options) {
    // Convert to byte arrays
    if (password.constructor == String) password = UTF8.stringToBytes(password);
    if (salt.constructor == String) salt = UTF8.stringToBytes(salt);
    /* else, assume byte arrays already */
    // Defaults

    var hasher = options && options.hasher || C.SHA1,
        iterations = options && options.iterations || 1; // Pseudo-random function

    function PRF(password, salt) {
      return C.HMAC(hasher, salt, password, {
        asBytes: true
      });
    } // Generate key


    var derivedKeyBytes = [],
        blockindex = 1;

    while (derivedKeyBytes.length < keylen) {
      var block = PRF(password, salt.concat(util.wordsToBytes([blockindex])));

      for (var u = block, i = 1; i < iterations; i++) {
        u = PRF(password, u);

        for (var j = 0; j < block.length; j++) {
          block[j] ^= u[j];
        }
      }

      derivedKeyBytes = derivedKeyBytes.concat(block);
      blockindex++;
    } // Truncate excess bytes


    derivedKeyBytes.length = keylen;
    return options && options.asBytes ? derivedKeyBytes : options && options.asString ? Binary.bytesToString(derivedKeyBytes) : util.bytesToHex(derivedKeyBytes);
  };
})();

/***/ }),

/***/ 31:
/*!*************************************************!*\
  !*** ./src/modules/cryptojs/lib/PBKDF2Async.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

(function () {
  var C = typeof window === 'undefined' ? __webpack_require__(/*! ./Crypto */ 22).Crypto : window.Crypto; // Shortcuts

  var util = C.util,
      charenc = C.charenc,
      UTF8 = charenc.UTF8,
      Binary = charenc.Binary;

  if (!C.nextTick) {
    // node.js has setTime out but prefer process.nextTick
    if (typeof process != 'undefined' && typeof process.nextTick !== 'undefined') {
      C.nextTick = process.nextTick;
    } else if (typeof setTimeout !== 'undefined') {
      C.nextTick = function (callback) {
        setTimeout(callback, 0);
      };
    }
  }

  C.PBKDF2Async = function (password, salt, keylen, callback, options) {
    // Convert to byte arrays
    if (password.constructor == String) password = UTF8.stringToBytes(password);
    if (salt.constructor == String) salt = UTF8.stringToBytes(salt);
    /* else, assume byte arrays already */
    // Defaults

    var hasher = options && options.hasher || C.SHA1,
        iterations = options && options.iterations || 1; // Progress callback option

    var progressChangeHandler = options && options.onProgressChange;
    var totalIterations = Math.ceil(keylen / hasher._digestsize) * iterations;

    function fireProgressChange(currentIteration) {
      if (progressChangeHandler) {
        var iterationsSoFar = derivedKeyBytes.length / hasher._digestsize * iterations + currentIteration;
        setTimeout(function () {
          progressChangeHandler(Math.round(iterationsSoFar / totalIterations * 100));
        }, 0);
      }
    } // Pseudo-random function


    function PRF(password, salt) {
      return C.HMAC(hasher, salt, password, {
        asBytes: true
      });
    }

    var nextTick = C.nextTick; // Generate key

    var derivedKeyBytes = [],
        blockindex = 1;

    var _outer, _inner;

    nextTick(_outer = function outer() {
      if (derivedKeyBytes.length < keylen) {
        var block = PRF(password, salt.concat(util.wordsToBytes([blockindex])));
        fireProgressChange(1);
        var u = block,
            i = 1;
        nextTick(_inner = function inner() {
          if (i < iterations) {
            u = PRF(password, u);

            for (var j = 0; j < block.length; j++) {
              block[j] ^= u[j];
            }

            i++;
            fireProgressChange(i);
            nextTick(_inner);
          } else {
            derivedKeyBytes = derivedKeyBytes.concat(block);
            blockindex++;
            nextTick(_outer);
          }
        });
      } else {
        // Truncate excess bytes
        derivedKeyBytes.length = keylen;
        callback(options && options.asBytes ? derivedKeyBytes : options && options.asString ? Binary.bytesToString(derivedKeyBytes) : util.bytesToHex(derivedKeyBytes));
      }
    });
  };
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/process/browser.js */ 32)))

/***/ }),

/***/ 32:
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ 33:
/*!********************************************!*\
  !*** ./src/modules/cryptojs/lib/Rabbit.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var C = typeof window === 'undefined' ? __webpack_require__(/*! ./Crypto */ 22).Crypto : window.Crypto; // Shortcuts

  var util = C.util,
      charenc = C.charenc,
      UTF8 = charenc.UTF8,
      Binary = charenc.Binary; // Inner state

  var x = [],
      c = [],
      b;
  var Rabbit = C.Rabbit = {
    /**
     * Public API
     */
    encrypt: function encrypt(message, password) {
      var // Convert to bytes
      m = UTF8.stringToBytes(message),
          // Generate random IV
      iv = util.randomBytes(8),
          // Generate key
      k = password.constructor == String ? // Derive key from passphrase
      C.PBKDF2(password, iv, 32, {
        asBytes: true
      }) : // else, assume byte array representing cryptographic key
      password; // Encrypt

      Rabbit._rabbit(m, k, util.bytesToWords(iv)); // Return ciphertext


      return util.bytesToBase64(iv.concat(m));
    },
    decrypt: function decrypt(ciphertext, password) {
      var // Convert to bytes
      c = util.base64ToBytes(ciphertext),
          // Separate IV and message
      iv = c.splice(0, 8),
          // Generate key
      k = password.constructor == String ? // Derive key from passphrase
      C.PBKDF2(password, iv, 32, {
        asBytes: true
      }) : // else, assume byte array representing cryptographic key
      password; // Decrypt

      Rabbit._rabbit(c, k, util.bytesToWords(iv)); // Return plaintext


      return UTF8.bytesToString(c);
    },

    /**
     * Internal methods
     */
    // Encryption/decryption scheme
    _rabbit: function _rabbit(m, k, iv) {
      Rabbit._keysetup(k);

      if (iv) Rabbit._ivsetup(iv);

      for (var s = [], i = 0; i < m.length; i++) {
        if (i % 16 == 0) {
          // Iterate the system
          Rabbit._nextstate(); // Generate 16 bytes of pseudo-random data


          s[0] = x[0] ^ x[5] >>> 16 ^ x[3] << 16;
          s[1] = x[2] ^ x[7] >>> 16 ^ x[5] << 16;
          s[2] = x[4] ^ x[1] >>> 16 ^ x[7] << 16;
          s[3] = x[6] ^ x[3] >>> 16 ^ x[1] << 16; // Swap endian

          for (var j = 0; j < 4; j++) {
            s[j] = (s[j] << 8 | s[j] >>> 24) & 0x00FF00FF | (s[j] << 24 | s[j] >>> 8) & 0xFF00FF00;
          } // Convert words to bytes


          for (var b = 120; b >= 0; b -= 8) {
            s[b / 8] = s[b >>> 5] >>> 24 - b % 32 & 0xFF;
          }
        }

        m[i] ^= s[i % 16];
      }
    },
    // Key setup scheme
    _keysetup: function _keysetup(k) {
      // Generate initial state values
      x[0] = k[0];
      x[2] = k[1];
      x[4] = k[2];
      x[6] = k[3];
      x[1] = k[3] << 16 | k[2] >>> 16;
      x[3] = k[0] << 16 | k[3] >>> 16;
      x[5] = k[1] << 16 | k[0] >>> 16;
      x[7] = k[2] << 16 | k[1] >>> 16; // Generate initial counter values

      c[0] = util.rotl(k[2], 16);
      c[2] = util.rotl(k[3], 16);
      c[4] = util.rotl(k[0], 16);
      c[6] = util.rotl(k[1], 16);
      c[1] = k[0] & 0xFFFF0000 | k[1] & 0xFFFF;
      c[3] = k[1] & 0xFFFF0000 | k[2] & 0xFFFF;
      c[5] = k[2] & 0xFFFF0000 | k[3] & 0xFFFF;
      c[7] = k[3] & 0xFFFF0000 | k[0] & 0xFFFF; // Clear carry bit

      b = 0; // Iterate the system four times

      for (var i = 0; i < 4; i++) {
        Rabbit._nextstate();
      } // Modify the counters


      for (var i = 0; i < 8; i++) {
        c[i] ^= x[i + 4 & 7];
      }
    },
    // IV setup scheme
    _ivsetup: function _ivsetup(iv) {
      // Generate four subvectors
      var i0 = util.endian(iv[0]),
          i2 = util.endian(iv[1]),
          i1 = i0 >>> 16 | i2 & 0xFFFF0000,
          i3 = i2 << 16 | i0 & 0x0000FFFF; // Modify counter values

      c[0] ^= i0;
      c[1] ^= i1;
      c[2] ^= i2;
      c[3] ^= i3;
      c[4] ^= i0;
      c[5] ^= i1;
      c[6] ^= i2;
      c[7] ^= i3; // Iterate the system four times

      for (var i = 0; i < 4; i++) {
        Rabbit._nextstate();
      }
    },
    // Next-state function
    _nextstate: function _nextstate() {
      // Save old counter values
      for (var c_old = [], i = 0; i < 8; i++) {
        c_old[i] = c[i];
      } // Calculate new counter values


      c[0] = c[0] + 0x4D34D34D + b >>> 0;
      c[1] = c[1] + 0xD34D34D3 + (c[0] >>> 0 < c_old[0] >>> 0 ? 1 : 0) >>> 0;
      c[2] = c[2] + 0x34D34D34 + (c[1] >>> 0 < c_old[1] >>> 0 ? 1 : 0) >>> 0;
      c[3] = c[3] + 0x4D34D34D + (c[2] >>> 0 < c_old[2] >>> 0 ? 1 : 0) >>> 0;
      c[4] = c[4] + 0xD34D34D3 + (c[3] >>> 0 < c_old[3] >>> 0 ? 1 : 0) >>> 0;
      c[5] = c[5] + 0x34D34D34 + (c[4] >>> 0 < c_old[4] >>> 0 ? 1 : 0) >>> 0;
      c[6] = c[6] + 0x4D34D34D + (c[5] >>> 0 < c_old[5] >>> 0 ? 1 : 0) >>> 0;
      c[7] = c[7] + 0xD34D34D3 + (c[6] >>> 0 < c_old[6] >>> 0 ? 1 : 0) >>> 0;
      b = c[7] >>> 0 < c_old[7] >>> 0 ? 1 : 0; // Calculate the g-values

      for (var g = [], i = 0; i < 8; i++) {
        var gx = x[i] + c[i] >>> 0; // Construct high and low argument for squaring

        var ga = gx & 0xFFFF,
            gb = gx >>> 16; // Calculate high and low result of squaring

        var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb,
            gl = ((gx & 0xFFFF0000) * gx >>> 0) + ((gx & 0x0000FFFF) * gx >>> 0) >>> 0; // High XOR low

        g[i] = gh ^ gl;
      } // Calculate new state values


      x[0] = g[0] + (g[7] << 16 | g[7] >>> 16) + (g[6] << 16 | g[6] >>> 16);
      x[1] = g[1] + (g[0] << 8 | g[0] >>> 24) + g[7];
      x[2] = g[2] + (g[1] << 16 | g[1] >>> 16) + (g[0] << 16 | g[0] >>> 16);
      x[3] = g[3] + (g[2] << 8 | g[2] >>> 24) + g[1];
      x[4] = g[4] + (g[3] << 16 | g[3] >>> 16) + (g[2] << 16 | g[2] >>> 16);
      x[5] = g[5] + (g[4] << 8 | g[4] >>> 24) + g[3];
      x[6] = g[6] + (g[5] << 16 | g[5] >>> 16) + (g[4] << 16 | g[4] >>> 16);
      x[7] = g[7] + (g[6] << 8 | g[6] >>> 24) + g[5];
    }
  };
})();

/***/ }),

/***/ 34:
/*!******************************************!*\
  !*** ./src/modules/cryptojs/lib/SHA1.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var C = typeof window === 'undefined' ? __webpack_require__(/*! ./Crypto */ 22).Crypto : window.Crypto; // Shortcuts

  var util = C.util,
      charenc = C.charenc,
      UTF8 = charenc.UTF8,
      Binary = charenc.Binary; // Public API

  var SHA1 = C.SHA1 = function (message, options) {
    var digestbytes = util.wordsToBytes(SHA1._sha1(message));
    return options && options.asBytes ? digestbytes : options && options.asString ? Binary.bytesToString(digestbytes) : util.bytesToHex(digestbytes);
  }; // The core


  SHA1._sha1 = function (message) {
    // Convert to byte array
    if (message.constructor == String) message = UTF8.stringToBytes(message);
    /* else, assume byte array already */

    var m = util.bytesToWords(message),
        l = message.length * 8,
        w = [],
        H0 = 1732584193,
        H1 = -271733879,
        H2 = -1732584194,
        H3 = 271733878,
        H4 = -1009589776; // Padding

    m[l >> 5] |= 0x80 << 24 - l % 32;
    m[(l + 64 >>> 9 << 4) + 15] = l;

    for (var i = 0; i < m.length; i += 16) {
      var a = H0,
          b = H1,
          c = H2,
          d = H3,
          e = H4;

      for (var j = 0; j < 80; j++) {
        if (j < 16) w[j] = m[i + j];else {
          var n = w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16];
          w[j] = n << 1 | n >>> 31;
        }
        var t = (H0 << 5 | H0 >>> 27) + H4 + (w[j] >>> 0) + (j < 20 ? (H1 & H2 | ~H1 & H3) + 1518500249 : j < 40 ? (H1 ^ H2 ^ H3) + 1859775393 : j < 60 ? (H1 & H2 | H1 & H3 | H2 & H3) - 1894007588 : (H1 ^ H2 ^ H3) - 899497514);
        H4 = H3;
        H3 = H2;
        H2 = H1 << 30 | H1 >>> 2;
        H1 = H0;
        H0 = t;
      }

      H0 += a;
      H1 += b;
      H2 += c;
      H3 += d;
      H4 += e;
    }

    return [H0, H1, H2, H3, H4];
  }; // Package private blocksize


  SHA1._blocksize = 16;
  SHA1._digestsize = 20;
})();

/***/ }),

/***/ 35:
/*!********************************************!*\
  !*** ./src/modules/cryptojs/lib/SHA256.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
  var C = typeof window === 'undefined' ? __webpack_require__(/*! ./Crypto */ 22).Crypto : window.Crypto; // Shortcuts

  var util = C.util,
      charenc = C.charenc,
      UTF8 = charenc.UTF8,
      Binary = charenc.Binary; // Constants

  var K = [0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2]; // Public API

  var SHA256 = C.SHA256 = function (message, options) {
    var digestbytes = util.wordsToBytes(SHA256._sha256(message));
    return options && options.asBytes ? digestbytes : options && options.asString ? Binary.bytesToString(digestbytes) : util.bytesToHex(digestbytes);
  }; // The core


  SHA256._sha256 = function (message) {
    // Convert to byte array
    if (message.constructor == String) message = UTF8.stringToBytes(message);
    /* else, assume byte array already */

    var m = util.bytesToWords(message),
        l = message.length * 8,
        H = [0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19],
        w = [],
        a,
        b,
        c,
        d,
        e,
        f,
        g,
        h,
        i,
        j,
        t1,
        t2; // Padding

    m[l >> 5] |= 0x80 << 24 - l % 32;
    m[(l + 64 >> 9 << 4) + 15] = l;

    for (var i = 0; i < m.length; i += 16) {
      a = H[0];
      b = H[1];
      c = H[2];
      d = H[3];
      e = H[4];
      f = H[5];
      g = H[6];
      h = H[7];

      for (var j = 0; j < 64; j++) {
        if (j < 16) w[j] = m[j + i];else {
          var gamma0x = w[j - 15],
              gamma1x = w[j - 2],
              gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3,
              gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
          w[j] = gamma0 + (w[j - 7] >>> 0) + gamma1 + (w[j - 16] >>> 0);
        }
        var ch = e & f ^ ~e & g,
            maj = a & b ^ a & c ^ b & c,
            sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22),
            sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
        t1 = (h >>> 0) + sigma1 + ch + K[j] + (w[j] >>> 0);
        t2 = sigma0 + maj;
        h = g;
        g = f;
        f = e;
        e = d + t1 >>> 0;
        d = c;
        c = b;
        b = a;
        a = t1 + t2 >>> 0;
      }

      H[0] += a;
      H[1] += b;
      H[2] += c;
      H[3] += d;
      H[4] += e;
      H[5] += f;
      H[6] += g;
      H[7] += h;
    }

    return H;
  }; // Package private blocksize


  SHA256._blocksize = 16;
  SHA256._digestsize = 32;
})();

/***/ }),

/***/ 38:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 4:
/*!************************!*\
  !*** ./src/pages.json ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ 5:
/*!*************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/node_modules/@dcloudio/uni-stat/dist/index.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _package = __webpack_require__(/*! ../package.json */ 6);

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var STAT_VERSION = _package.version;
var STAT_URL = 'https://tongji.dcloud.io/uni/stat';
var STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
var PAGE_PVER_TIME = 1800;
var APP_PVER_TIME = 300;
var OPERATING_TIME = 10;
var UUID_KEY = '__DC_STAT_UUID';
var UUID_VALUE = '__DC_UUID_VALUE';

function getUuid() {
  var uuid = '';

  if (getPlatformName() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }

    return uuid;
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);

    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }

  return uuid;
}

var getSgin = function getSgin(statData) {
  var arr = Object.keys(statData);
  var sortArr = arr.sort();
  var sgin = {};
  var sginStr = '';

  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  } // const options = sginStr.substr(0, sginStr.length - 1)
  // sginStr = sginStr.substr(0, sginStr.length - 1) + '&key=' + STAT_KEY;
  // const si = crypto.createHash('md5').update(sginStr).digest('hex');


  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1)
  };
};

var getSplicing = function getSplicing(data) {
  var str = '';

  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }

  return str.substr(0, str.length - 1);
};

var getTime = function getTime() {
  return parseInt(new Date().getTime() / 1000);
};

var getPlatformName = function getPlatformName() {
  var platformList = {
    'app-plus': 'n',
    'h5': 'h5',
    'mp-weixin': 'wx',
    'mp-alipay': 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq'
  };
  return platformList["mp-weixin"];
};

var getPackName = function getPackName() {
  var packName = '';

  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }

  return packName;
};

var getVersion = function getVersion() {
  return getPlatformName() === 'n' ? plus.runtime.version : '';
};

var getChannel = function getChannel() {
  var platformName = getPlatformName();
  var channel = '';

  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }

  return channel;
};

var getScene = function getScene(options) {
  var platformName = getPlatformName();
  var scene = '';

  if (options) {
    return options;
  }

  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }

  return scene;
};

var First__Visit__Time__KEY = 'First__Visit__Time';
var Last__Visit__Time__KEY = 'Last__Visit__Time';

var getFirstVisitTime = function getFirstVisitTime() {
  var timeStorge = uni.getStorageSync(First__Visit__Time__KEY);
  var time = 0;

  if (timeStorge) {
    time = timeStorge;
  } else {
    time = getTime();
    uni.setStorageSync(First__Visit__Time__KEY, time);
    uni.removeStorageSync(Last__Visit__Time__KEY);
  }

  return time;
};

var getLastVisitTime = function getLastVisitTime() {
  var timeStorge = uni.getStorageSync(Last__Visit__Time__KEY);
  var time = 0;

  if (timeStorge) {
    time = timeStorge;
  } else {
    time = '';
  }

  uni.setStorageSync(Last__Visit__Time__KEY, getTime());
  return time;
};

var PAGE_RESIDENCE_TIME = '__page__residence__time';
var First_Page_residence_time = 0;
var Last_Page_residence_time = 0;

var setPageResidenceTime = function setPageResidenceTime() {
  First_Page_residence_time = getTime();

  if (getPlatformName() === 'n') {
    uni.setStorageSync(PAGE_RESIDENCE_TIME, getTime());
  }

  return First_Page_residence_time;
};

var getPageResidenceTime = function getPageResidenceTime() {
  Last_Page_residence_time = getTime();

  if (getPlatformName() === 'n') {
    First_Page_residence_time = uni.getStorageSync(PAGE_RESIDENCE_TIME);
  }

  return Last_Page_residence_time - First_Page_residence_time;
};

var TOTAL__VISIT__COUNT = 'Total__Visit__Count';

var getTotalVisitCount = function getTotalVisitCount() {
  var timeStorge = uni.getStorageSync(TOTAL__VISIT__COUNT);
  var count = 1;

  if (timeStorge) {
    count = timeStorge;
    count++;
  }

  uni.setStorageSync(TOTAL__VISIT__COUNT, count);
  return count;
};

var GetEncodeURIComponentOptions = function GetEncodeURIComponentOptions(statData) {
  var data = {};

  for (var prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }

  return data;
};

var Set__First__Time = 0;
var Set__Last__Time = 0;

var getFirstTime = function getFirstTime() {
  var time = new Date().getTime();
  Set__First__Time = time;
  Set__Last__Time = 0;
  return time;
};

var getLastTime = function getLastTime() {
  var time = new Date().getTime();
  Set__Last__Time = time;
  return time;
};

var getResidenceTime = function getResidenceTime(type) {
  var residenceTime = 0;

  if (Set__First__Time !== 0) {
    residenceTime = Set__Last__Time - Set__First__Time;
  }

  residenceTime = parseInt(residenceTime / 1000);
  residenceTime = residenceTime < 1 ? 1 : residenceTime;

  if (type === 'app') {
    var overtime = residenceTime > APP_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: overtime
    };
  }

  if (type === 'page') {
    var _overtime = residenceTime > PAGE_PVER_TIME ? true : false;

    return {
      residenceTime: residenceTime,
      overtime: _overtime
    };
  }

  return {
    residenceTime: residenceTime
  };
};

var getRoute = function getRoute() {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is;
  } else {
    return _self.$scope && _self.$scope.route || _self.$mp && _self.$mp.page.route;
  }
};

var getPageRoute = function getPageRoute(self) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;
  var query = self._query;
  var str = query && JSON.stringify(query) !== '{}' ? '?' + JSON.stringify(query) : ''; // clear

  self._query = '';

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is + str;
  } else {
    return _self.$scope && _self.$scope.route + str || _self.$mp && _self.$mp.page.route + str;
  }
};

var getPageTypes = function getPageTypes(self) {
  if (self.mpType === 'page' || self.$mp && self.$mp.mpType === 'page' || self.$options.mpType === 'page') {
    return true;
  }

  return false;
};

var calibration = function calibration(eventName, options) {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error("uni.report \u7F3A\u5C11 [eventName] \u53C2\u6570");
    return true;
  }

  if (typeof eventName !== 'string') {
    console.error("uni.report [eventName] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u7C7B\u578B");
    return true;
  }

  if (eventName.length > 255) {
    console.error("uni.report [eventName] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (typeof options !== 'string' && _typeof(options) !== 'object') {
    console.error("uni.report [options] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u6216 Object \u7C7B\u578B");
    return true;
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error("uni.report [options] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error('uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型');
    return true;
  }
};

var PagesJson = __webpack_require__(/*! uni-pages?{"type":"style"} */ 7).default;

var statConfig = __webpack_require__(/*! uni-stat-config */ 8).default || __webpack_require__(/*! uni-stat-config */ 8);

var resultOptions = uni.getSystemInfoSync();

var Util =
/*#__PURE__*/
function () {
  function Util() {
    _classCallCheck(this, Util);

    this.self = '';
    this._retry = 0;
    this._platform = '';
    this._query = {};
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: ''
    };
    this._operatingTime = 0;
    this._reportingRequestData = {
      '1': [],
      '11': []
    };
    this.__prevent_triggering = false;
    this.__licationHide = false;
    this.__licationShow = false;
    this._lastPageRoute = '';
    this.statData = {
      uuid: getUuid(),
      ut: getPlatformName(),
      mpn: getPackName(),
      ak: statConfig.appid,
      usv: STAT_VERSION,
      v: getVersion(),
      ch: getChannel(),
      cn: '',
      pn: '',
      ct: '',
      t: getTime(),
      tt: '',
      p: resultOptions.platform === 'android' ? 'a' : 'i',
      brand: resultOptions.brand || '',
      md: resultOptions.model,
      sv: resultOptions.system.replace(/(Android|iOS)\s/, ''),
      mpsdk: resultOptions.SDKVersion || '',
      mpv: resultOptions.version || '',
      lang: resultOptions.language,
      pr: resultOptions.pixelRatio,
      ww: resultOptions.windowWidth,
      wh: resultOptions.windowHeight,
      sw: resultOptions.screenWidth,
      sh: resultOptions.screenHeight
    };
  }

  _createClass(Util, [{
    key: "_applicationShow",
    value: function _applicationShow() {
      if (this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('app');

        if (time.overtime) {
          var options = {
            path: this._lastPageRoute,
            scene: this.statData.sc
          };

          this._sendReportRequest(options);
        }

        this.__licationHide = false;
      }
    }
  }, {
    key: "_applicationHide",
    value: function _applicationHide(self, type) {
      this.__licationHide = true;
      getLastTime();
      var time = getResidenceTime();
      getFirstTime();
      var route = getPageRoute(this);

      this._sendHideRequest({
        urlref: route,
        urlref_ts: time.residenceTime
      }, type);
    }
  }, {
    key: "_pageShow",
    value: function _pageShow() {
      var route = getPageRoute(this);
      var routepath = getRoute();
      this._navigationBarTitle.config = PagesJson && PagesJson.pages[routepath] && PagesJson.pages[routepath].titleNView && PagesJson.pages[routepath].titleNView.titleText || PagesJson && PagesJson.pages[routepath] && PagesJson.pages[routepath].navigationBarTitleText || '';

      if (this.__licationShow) {
        getFirstTime();
        this.__licationShow = false; // console.log('这是 onLauch 之后执行的第一次 pageShow ，为下次记录时间做准备');

        this._lastPageRoute = route;
        return;
      }

      getLastTime();
      this._lastPageRoute = route;
      var time = getResidenceTime('page');

      if (time.overtime) {
        var options = {
          path: this._lastPageRoute,
          scene: this.statData.sc
        };

        this._sendReportRequest(options);
      }

      getFirstTime();
    }
  }, {
    key: "_pageHide",
    value: function _pageHide() {
      if (!this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('page');

        this._sendPageRequest({
          url: this._lastPageRoute,
          urlref: this._lastPageRoute,
          urlref_ts: time.residenceTime
        });

        this._navigationBarTitle = {
          config: '',
          page: '',
          report: '',
          lt: ''
        };
        return;
      }
    }
  }, {
    key: "_login",
    value: function _login() {
      this._sendEventRequest({
        key: 'login'
      }, 0);
    }
  }, {
    key: "_share",
    value: function _share() {
      this._sendEventRequest({
        key: 'share'
      }, 0);
    }
  }, {
    key: "_payment",
    value: function _payment(key) {
      this._sendEventRequest({
        key: key
      }, 0);
    }
  }, {
    key: "_sendReportRequest",
    value: function _sendReportRequest(options) {
      this._navigationBarTitle.lt = '1';
      var query = options.query && JSON.stringify(options.query) !== '{}' ? '?' + JSON.stringify(options.query) : '';
      this.statData.lt = '1';
      this.statData.url = options.path + query || '';
      this.statData.t = getTime();
      this.statData.sc = getScene(options.scene);
      this.statData.fvts = getFirstVisitTime();
      this.statData.lvts = getLastVisitTime();
      this.statData.tvc = getTotalVisitCount();

      if (getPlatformName() === 'n') {
        this.getProperty();
      } else {
        this.getNetworkInfo();
      }
    }
  }, {
    key: "_sendPageRequest",
    value: function _sendPageRequest(opt) {
      var url = opt.url,
          urlref = opt.urlref,
          urlref_ts = opt.urlref_ts;
      this._navigationBarTitle.lt = '11';
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '11',
        ut: this.statData.ut,
        url: url,
        tt: this.statData.tt,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p
      };
      this.request(options);
    }
  }, {
    key: "_sendHideRequest",
    value: function _sendHideRequest(opt, type) {
      var urlref = opt.urlref,
          urlref_ts = opt.urlref_ts;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '3',
        ut: this.statData.ut,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p
      };
      this.request(options, type);
    }
  }, {
    key: "_sendEventRequest",
    value: function _sendEventRequest() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$key = _ref.key,
          key = _ref$key === void 0 ? '' : _ref$key,
          _ref$value = _ref.value,
          value = _ref$value === void 0 ? "" : _ref$value;

      var route = this._lastPageRoute;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '21',
        ut: this.statData.ut,
        url: route,
        ch: this.statData.ch,
        e_n: key,
        e_v: _typeof(value) === 'object' ? JSON.stringify(value) : value.toString(),
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p
      };
      this.request(options);
    }
  }, {
    key: "getNetworkInfo",
    value: function getNetworkInfo() {
      var _this = this;

      uni.getNetworkType({
        success: function success(result) {
          _this.statData.net = result.networkType;

          _this.getLocation();
        }
      });
    }
  }, {
    key: "getProperty",
    value: function getProperty() {
      var _this2 = this;

      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        _this2.statData.v = wgtinfo.version || '';

        _this2.getNetworkInfo();
      });
    }
  }, {
    key: "getLocation",
    value: function getLocation() {
      var _this3 = this;

      if (statConfig.getLocation) {
        uni.getLocation({
          type: 'wgs84',
          geocode: true,
          success: function success(result) {
            if (result.address) {
              _this3.statData.cn = result.address.country;
              _this3.statData.pn = result.address.province;
              _this3.statData.ct = result.address.city;
            }

            _this3.statData.lat = result.latitude;
            _this3.statData.lng = result.longitude;

            _this3.request(_this3.statData);
          }
        });
      } else {
        this.statData.lat = 0;
        this.statData.lng = 0;
        this.request(this.statData);
      }
    }
  }, {
    key: "request",
    value: function request(data, type) {
      var _this4 = this;

      var time = getTime();
      var title = this._navigationBarTitle;
      data.ttn = title.page;
      data.ttpj = title.config;
      data.ttc = title.report;
      var requestData = this._reportingRequestData;

      if (getPlatformName() === 'n') {
        requestData = uni.getStorageSync('__UNI__STAT__DATA') || {};
      }

      if (!requestData[data.lt]) {
        requestData[data.lt] = [];
      }

      requestData[data.lt].push(data);

      if (getPlatformName() === 'n') {
        uni.setStorageSync('__UNI__STAT__DATA', requestData);
      }

      if (getPageResidenceTime() < OPERATING_TIME && !type) {
        return;
      }

      var uniStatData = this._reportingRequestData;

      if (getPlatformName() === 'n') {
        uniStatData = uni.getStorageSync('__UNI__STAT__DATA');
      } // 时间超过，重新获取时间戳


      setPageResidenceTime();
      var firstArr = [];
      var contentArr = [];
      var lastArr = [];

      var _loop = function _loop(i) {
        var rd = uniStatData[i];
        rd.forEach(function (elm) {
          var newData = getSplicing(elm);

          if (i === 0) {
            firstArr.push(newData);
          } else if (i === 3) {
            lastArr.push(newData);
          } else {
            contentArr.push(newData);
          }
        });
      };

      for (var i in uniStatData) {
        _loop(i);
      }

      firstArr.push.apply(firstArr, contentArr.concat(lastArr));
      var optionsData = {
        usv: STAT_VERSION,
        //统计 SDK 版本号
        t: time,
        //发送请求时的时间戮
        requests: JSON.stringify(firstArr)
      };
      this._reportingRequestData = {};

      if (getPlatformName() === 'n') {
        uni.removeStorageSync('__UNI__STAT__DATA');
      }

      if (data.ut === 'h5') {
        this.imageRequest(optionsData);
        return;
      }

      if (getPlatformName() === 'n' && this.statData.p === 'a') {
        setTimeout(function () {
          _this4._sendRequest(optionsData);
        }, 200);
        return;
      }

      this._sendRequest(optionsData);
    }
  }, {
    key: "_sendRequest",
    value: function _sendRequest(optionsData) {
      var _this5 = this;

      uni.request({
        url: STAT_URL,
        method: 'POST',
        // header: {
        //   'content-type': 'application/json' // 默认值
        // },
        data: optionsData,
        success: function success() {// if (process.env.NODE_ENV === 'development') {
          //   console.log('stat request success');
          // }
        },
        fail: function fail(e) {
          if (++_this5._retry < 3) {
            setTimeout(function () {
              _this5._sendRequest(optionsData);
            }, 1000);
          }
        }
      });
    }
    /**
     * h5 请求
     */

  }, {
    key: "imageRequest",
    value: function imageRequest(data) {
      var image = new Image();
      var options = getSgin(GetEncodeURIComponentOptions(data)).options;
      image.src = STAT_H5_URL + '?' + options;
    }
  }, {
    key: "sendEvent",
    value: function sendEvent(key, value) {
      // 校验 type 参数
      if (calibration(key, value)) return;

      if (key === 'title') {
        this._navigationBarTitle.report = value;
        return;
      }

      this._sendEventRequest({
        key: key,
        value: _typeof(value) === 'object' ? JSON.stringify(value) : value
      }, 1);
    }
  }]);

  return Util;
}();

var Stat =
/*#__PURE__*/
function (_Util) {
  _inherits(Stat, _Util);

  _createClass(Stat, null, [{
    key: "getInstance",
    value: function getInstance() {
      if (!this.instance) {
        this.instance = new Stat();
      }

      return this.instance;
    }
  }]);

  function Stat() {
    var _this6;

    _classCallCheck(this, Stat);

    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(Stat).call(this));
    _this6.instance = null; // 注册拦截器

    if (typeof uni.addInterceptor === 'function' && "development" !== 'development') {
      _this6.addInterceptorInit();

      _this6.interceptLogin();

      _this6.interceptShare(true);

      _this6.interceptRequestPayment();
    }

    return _this6;
  }

  _createClass(Stat, [{
    key: "addInterceptorInit",
    value: function addInterceptorInit() {
      var self = this;
      uni.addInterceptor('setNavigationBarTitle', {
        invoke: function invoke(args) {
          self._navigationBarTitle.page = args.title;
        }
      });
    }
  }, {
    key: "interceptLogin",
    value: function interceptLogin() {
      var self = this;
      uni.addInterceptor('login', {
        complete: function complete() {
          self._login();
        }
      });
    }
  }, {
    key: "interceptShare",
    value: function interceptShare(type) {
      var self = this;

      if (!type) {
        self._share();

        return;
      }

      uni.addInterceptor('share', {
        success: function success() {
          self._share();
        },
        fail: function fail() {
          self._share();
        }
      });
    }
  }, {
    key: "interceptRequestPayment",
    value: function interceptRequestPayment() {
      var self = this;
      uni.addInterceptor('requestPayment', {
        success: function success() {
          self._payment('pay_success');
        },
        fail: function fail() {
          self._payment('pay_fail');
        }
      });
    }
  }, {
    key: "report",
    value: function report(options, self) {
      this.self = self; // if (process.env.NODE_ENV === 'development') {
      //   console.log('report init');
      // }

      setPageResidenceTime();
      this.__licationShow = true;

      this._sendReportRequest(options, true);
    }
  }, {
    key: "load",
    value: function load(options, self) {
      if (!self.$scope && !self.$mp) {
        var page = getCurrentPages();
        self.$scope = page[page.length - 1];
      }

      this.self = self;
      this._query = options;
    }
  }, {
    key: "show",
    value: function show(self) {
      this.self = self;

      if (getPageTypes(self)) {
        this._pageShow(self);
      } else {
        this._applicationShow(self);
      }
    }
  }, {
    key: "ready",
    value: function ready(self) {// this.self = self;
      // if (getPageTypes(self)) {
      //   this._pageShow(self);
      // }
    }
  }, {
    key: "hide",
    value: function hide(self) {
      this.self = self;

      if (getPageTypes(self)) {
        this._pageHide(self);
      } else {
        this._applicationHide(self, true);
      }
    }
  }, {
    key: "error",
    value: function error(em) {
      if (this._platform === 'devtools') {
        if (true) {
          console.info('当前运行环境为开发者工具，不上报数据。');
        } // return;

      }

      var emVal = '';

      if (!em.message) {
        emVal = JSON.stringify(em);
      } else {
        emVal = em.stack;
      }

      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '31',
        ut: this.statData.ut,
        ch: this.statData.ch,
        mpsdk: this.statData.mpsdk,
        mpv: this.statData.mpv,
        v: this.statData.v,
        em: emVal,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p
      };
      this.request(options);
    }
  }]);

  return Stat;
}(Util);

var stat = Stat.getInstance();
var isHide = false;
var lifecycle = {
  onLaunch: function onLaunch(options) {
    stat.report(options, this);
  },
  onReady: function onReady() {
    stat.ready(this);
  },
  onLoad: function onLoad(options) {
    stat.load(options, this); // 重写分享，获取分享上报事件

    if (this.$scope && this.$scope.onShareAppMessage) {
      var oldShareAppMessage = this.$scope.onShareAppMessage;

      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false);
        return oldShareAppMessage.call(this, options);
      };
    }
  },
  onShow: function onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide: function onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload: function onUnload() {
    if (isHide) {
      isHide = false;
      return;
    }

    stat.hide(this);
  },
  onError: function onError(e) {
    stat.error(e);
  }
};

function main() {
  if (true) {
    uni.report = function (type, options) {};
  } else { var Vue; }
}

main();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 522:
/*!**************************************************!*\
  !*** ./src/components/pick-regions/regions.json ***!
  \**************************************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, default */
/***/ (function(module) {

module.exports = [{"code":"11","name":"北京市","childs":[{"code":"1101","name":"市辖区","childs":[{"code":"110101","name":"东城区"},{"code":"110102","name":"西城区"},{"code":"110105","name":"朝阳区"},{"code":"110106","name":"丰台区"},{"code":"110107","name":"石景山区"},{"code":"110108","name":"海淀区"},{"code":"110109","name":"门头沟区"},{"code":"110111","name":"房山区"},{"code":"110112","name":"通州区"},{"code":"110113","name":"顺义区"},{"code":"110114","name":"昌平区"},{"code":"110115","name":"大兴区"},{"code":"110116","name":"怀柔区"},{"code":"110117","name":"平谷区"},{"code":"110118","name":"密云区"},{"code":"110119","name":"延庆区"}]}]},{"code":"12","name":"天津市","childs":[{"code":"1201","name":"市辖区","childs":[{"code":"120101","name":"和平区"},{"code":"120102","name":"河东区"},{"code":"120103","name":"河西区"},{"code":"120104","name":"南开区"},{"code":"120105","name":"河北区"},{"code":"120106","name":"红桥区"},{"code":"120110","name":"东丽区"},{"code":"120111","name":"西青区"},{"code":"120112","name":"津南区"},{"code":"120113","name":"北辰区"},{"code":"120114","name":"武清区"},{"code":"120115","name":"宝坻区"},{"code":"120116","name":"滨海新区"},{"code":"120117","name":"宁河区"},{"code":"120118","name":"静海区"},{"code":"120119","name":"蓟州区"}]}]},{"code":"13","name":"河北省","childs":[{"code":"1301","name":"石家庄市","childs":[{"code":"130102","name":"长安区"},{"code":"130104","name":"桥西区"},{"code":"130105","name":"新华区"},{"code":"130107","name":"井陉矿区"},{"code":"130108","name":"裕华区"},{"code":"130109","name":"藁城区"},{"code":"130110","name":"鹿泉区"},{"code":"130111","name":"栾城区"},{"code":"130121","name":"井陉县"},{"code":"130123","name":"正定县"},{"code":"130125","name":"行唐县"},{"code":"130126","name":"灵寿县"},{"code":"130127","name":"高邑县"},{"code":"130128","name":"深泽县"},{"code":"130129","name":"赞皇县"},{"code":"130130","name":"无极县"},{"code":"130131","name":"平山县"},{"code":"130132","name":"元氏县"},{"code":"130133","name":"赵县"},{"code":"130183","name":"晋州市"},{"code":"130184","name":"新乐市"}]},{"code":"1302","name":"唐山市","childs":[{"code":"130202","name":"路南区"},{"code":"130203","name":"路北区"},{"code":"130204","name":"古冶区"},{"code":"130205","name":"开平区"},{"code":"130207","name":"丰南区"},{"code":"130208","name":"丰润区"},{"code":"130209","name":"曹妃甸区"},{"code":"130223","name":"滦县"},{"code":"130224","name":"滦南县"},{"code":"130225","name":"乐亭县"},{"code":"130227","name":"迁西县"},{"code":"130229","name":"玉田县"},{"code":"130281","name":"遵化市"},{"code":"130283","name":"迁安市"}]},{"code":"1303","name":"秦皇岛市","childs":[{"code":"130302","name":"海港区"},{"code":"130303","name":"山海关区"},{"code":"130304","name":"北戴河区"},{"code":"130306","name":"抚宁区"},{"code":"130321","name":"青龙满族自治县"},{"code":"130322","name":"昌黎县"},{"code":"130324","name":"卢龙县"}]},{"code":"1304","name":"邯郸市","childs":[{"code":"130402","name":"邯山区"},{"code":"130403","name":"丛台区"},{"code":"130404","name":"复兴区"},{"code":"130406","name":"峰峰矿区"},{"code":"130421","name":"邯郸县"},{"code":"130423","name":"临漳县"},{"code":"130424","name":"成安县"},{"code":"130425","name":"大名县"},{"code":"130426","name":"涉县"},{"code":"130427","name":"磁县"},{"code":"130428","name":"肥乡县"},{"code":"130429","name":"永年县"},{"code":"130430","name":"邱县"},{"code":"130431","name":"鸡泽县"},{"code":"130432","name":"广平县"},{"code":"130433","name":"馆陶县"},{"code":"130434","name":"魏县"},{"code":"130435","name":"曲周县"},{"code":"130481","name":"武安市"}]},{"code":"1305","name":"邢台市","childs":[{"code":"130502","name":"桥东区"},{"code":"130503","name":"桥西区"},{"code":"130521","name":"邢台县"},{"code":"130522","name":"临城县"},{"code":"130523","name":"内丘县"},{"code":"130524","name":"柏乡县"},{"code":"130525","name":"隆尧县"},{"code":"130526","name":"任县"},{"code":"130527","name":"南和县"},{"code":"130528","name":"宁晋县"},{"code":"130529","name":"巨鹿县"},{"code":"130530","name":"新河县"},{"code":"130531","name":"广宗县"},{"code":"130532","name":"平乡县"},{"code":"130533","name":"威县"},{"code":"130534","name":"清河县"},{"code":"130535","name":"临西县"},{"code":"130581","name":"南宫市"},{"code":"130582","name":"沙河市"}]},{"code":"1306","name":"保定市","childs":[{"code":"130602","name":"竞秀区"},{"code":"130606","name":"莲池区"},{"code":"130607","name":"满城区"},{"code":"130608","name":"清苑区"},{"code":"130609","name":"徐水区"},{"code":"130623","name":"涞水县"},{"code":"130624","name":"阜平县"},{"code":"130626","name":"定兴县"},{"code":"130627","name":"唐县"},{"code":"130628","name":"高阳县"},{"code":"130629","name":"容城县"},{"code":"130630","name":"涞源县"},{"code":"130631","name":"望都县"},{"code":"130632","name":"安新县"},{"code":"130633","name":"易县"},{"code":"130634","name":"曲阳县"},{"code":"130635","name":"蠡县"},{"code":"130636","name":"顺平县"},{"code":"130637","name":"博野县"},{"code":"130638","name":"雄县"},{"code":"130681","name":"涿州市"},{"code":"130683","name":"安国市"},{"code":"130684","name":"高碑店市"}]},{"code":"1307","name":"张家口市","childs":[{"code":"130702","name":"桥东区"},{"code":"130703","name":"桥西区"},{"code":"130705","name":"宣化区"},{"code":"130706","name":"下花园区"},{"code":"130708","name":"万全区"},{"code":"130709","name":"崇礼区"},{"code":"130722","name":"张北县"},{"code":"130723","name":"康保县"},{"code":"130724","name":"沽源县"},{"code":"130725","name":"尚义县"},{"code":"130726","name":"蔚县"},{"code":"130727","name":"阳原县"},{"code":"130728","name":"怀安县"},{"code":"130730","name":"怀来县"},{"code":"130731","name":"涿鹿县"},{"code":"130732","name":"赤城县"}]},{"code":"1308","name":"承德市","childs":[{"code":"130802","name":"双桥区"},{"code":"130803","name":"双滦区"},{"code":"130804","name":"鹰手营子矿区"},{"code":"130821","name":"承德县"},{"code":"130822","name":"兴隆县"},{"code":"130823","name":"平泉县"},{"code":"130824","name":"滦平县"},{"code":"130825","name":"隆化县"},{"code":"130826","name":"丰宁满族自治县"},{"code":"130827","name":"宽城满族自治县"},{"code":"130828","name":"围场满族蒙古族自治县"}]},{"code":"1309","name":"沧州市","childs":[{"code":"130902","name":"新华区"},{"code":"130903","name":"运河区"},{"code":"130921","name":"沧县"},{"code":"130922","name":"青县"},{"code":"130923","name":"东光县"},{"code":"130924","name":"海兴县"},{"code":"130925","name":"盐山县"},{"code":"130926","name":"肃宁县"},{"code":"130927","name":"南皮县"},{"code":"130928","name":"吴桥县"},{"code":"130929","name":"献县"},{"code":"130930","name":"孟村回族自治县"},{"code":"130981","name":"泊头市"},{"code":"130982","name":"任丘市"},{"code":"130983","name":"黄骅市"},{"code":"130984","name":"河间市"}]},{"code":"1310","name":"廊坊市","childs":[{"code":"131002","name":"安次区"},{"code":"131003","name":"广阳区"},{"code":"131022","name":"固安县"},{"code":"131023","name":"永清县"},{"code":"131024","name":"香河县"},{"code":"131025","name":"大城县"},{"code":"131026","name":"文安县"},{"code":"131028","name":"大厂回族自治县"},{"code":"131081","name":"霸州市"},{"code":"131082","name":"三河市"}]},{"code":"1311","name":"衡水市","childs":[{"code":"131102","name":"桃城区"},{"code":"131103","name":"冀州区"},{"code":"131121","name":"枣强县"},{"code":"131122","name":"武邑县"},{"code":"131123","name":"武强县"},{"code":"131124","name":"饶阳县"},{"code":"131125","name":"安平县"},{"code":"131126","name":"故城县"},{"code":"131127","name":"景县"},{"code":"131128","name":"阜城县"},{"code":"131182","name":"深州市"}]},{"code":"1390","name":"省直辖县级行政区划","childs":[{"code":"139001","name":"定州市"},{"code":"139002","name":"辛集市"}]}]},{"code":"14","name":"山西省","childs":[{"code":"1401","name":"太原市","childs":[{"code":"140105","name":"小店区"},{"code":"140106","name":"迎泽区"},{"code":"140107","name":"杏花岭区"},{"code":"140108","name":"尖草坪区"},{"code":"140109","name":"万柏林区"},{"code":"140110","name":"晋源区"},{"code":"140121","name":"清徐县"},{"code":"140122","name":"阳曲县"},{"code":"140123","name":"娄烦县"},{"code":"140181","name":"古交市"}]},{"code":"1402","name":"大同市","childs":[{"code":"140202","name":"城区"},{"code":"140203","name":"矿区"},{"code":"140211","name":"南郊区"},{"code":"140212","name":"新荣区"},{"code":"140221","name":"阳高县"},{"code":"140222","name":"天镇县"},{"code":"140223","name":"广灵县"},{"code":"140224","name":"灵丘县"},{"code":"140225","name":"浑源县"},{"code":"140226","name":"左云县"},{"code":"140227","name":"大同县"}]},{"code":"1403","name":"阳泉市","childs":[{"code":"140302","name":"城区"},{"code":"140303","name":"矿区"},{"code":"140311","name":"郊区"},{"code":"140321","name":"平定县"},{"code":"140322","name":"盂县"}]},{"code":"1404","name":"长治市","childs":[{"code":"140402","name":"城区"},{"code":"140411","name":"郊区"},{"code":"140421","name":"长治县"},{"code":"140423","name":"襄垣县"},{"code":"140424","name":"屯留县"},{"code":"140425","name":"平顺县"},{"code":"140426","name":"黎城县"},{"code":"140427","name":"壶关县"},{"code":"140428","name":"长子县"},{"code":"140429","name":"武乡县"},{"code":"140430","name":"沁县"},{"code":"140431","name":"沁源县"},{"code":"140481","name":"潞城市"}]},{"code":"1405","name":"晋城市","childs":[{"code":"140502","name":"城区"},{"code":"140521","name":"沁水县"},{"code":"140522","name":"阳城县"},{"code":"140524","name":"陵川县"},{"code":"140525","name":"泽州县"},{"code":"140581","name":"高平市"}]},{"code":"1406","name":"朔州市","childs":[{"code":"140602","name":"朔城区"},{"code":"140603","name":"平鲁区"},{"code":"140621","name":"山阴县"},{"code":"140622","name":"应县"},{"code":"140623","name":"右玉县"},{"code":"140624","name":"怀仁县"}]},{"code":"1407","name":"晋中市","childs":[{"code":"140702","name":"榆次区"},{"code":"140721","name":"榆社县"},{"code":"140722","name":"左权县"},{"code":"140723","name":"和顺县"},{"code":"140724","name":"昔阳县"},{"code":"140725","name":"寿阳县"},{"code":"140726","name":"太谷县"},{"code":"140727","name":"祁县"},{"code":"140728","name":"平遥县"},{"code":"140729","name":"灵石县"},{"code":"140781","name":"介休市"}]},{"code":"1408","name":"运城市","childs":[{"code":"140802","name":"盐湖区"},{"code":"140821","name":"临猗县"},{"code":"140822","name":"万荣县"},{"code":"140823","name":"闻喜县"},{"code":"140824","name":"稷山县"},{"code":"140825","name":"新绛县"},{"code":"140826","name":"绛县"},{"code":"140827","name":"垣曲县"},{"code":"140828","name":"夏县"},{"code":"140829","name":"平陆县"},{"code":"140830","name":"芮城县"},{"code":"140881","name":"永济市"},{"code":"140882","name":"河津市"}]},{"code":"1409","name":"忻州市","childs":[{"code":"140902","name":"忻府区"},{"code":"140921","name":"定襄县"},{"code":"140922","name":"五台县"},{"code":"140923","name":"代县"},{"code":"140924","name":"繁峙县"},{"code":"140925","name":"宁武县"},{"code":"140926","name":"静乐县"},{"code":"140927","name":"神池县"},{"code":"140928","name":"五寨县"},{"code":"140929","name":"岢岚县"},{"code":"140930","name":"河曲县"},{"code":"140931","name":"保德县"},{"code":"140932","name":"偏关县"},{"code":"140981","name":"原平市"}]},{"code":"1410","name":"临汾市","childs":[{"code":"141002","name":"尧都区"},{"code":"141021","name":"曲沃县"},{"code":"141022","name":"翼城县"},{"code":"141023","name":"襄汾县"},{"code":"141024","name":"洪洞县"},{"code":"141025","name":"古县"},{"code":"141026","name":"安泽县"},{"code":"141027","name":"浮山县"},{"code":"141028","name":"吉县"},{"code":"141029","name":"乡宁县"},{"code":"141030","name":"大宁县"},{"code":"141031","name":"隰县"},{"code":"141032","name":"永和县"},{"code":"141033","name":"蒲县"},{"code":"141034","name":"汾西县"},{"code":"141081","name":"侯马市"},{"code":"141082","name":"霍州市"}]},{"code":"1411","name":"吕梁市","childs":[{"code":"141102","name":"离石区"},{"code":"141121","name":"文水县"},{"code":"141122","name":"交城县"},{"code":"141123","name":"兴县"},{"code":"141124","name":"临县"},{"code":"141125","name":"柳林县"},{"code":"141126","name":"石楼县"},{"code":"141127","name":"岚县"},{"code":"141128","name":"方山县"},{"code":"141129","name":"中阳县"},{"code":"141130","name":"交口县"},{"code":"141181","name":"孝义市"},{"code":"141182","name":"汾阳市"}]}]},{"code":"15","name":"内蒙古自治区","childs":[{"code":"1501","name":"呼和浩特市","childs":[{"code":"150102","name":"新城区"},{"code":"150103","name":"回民区"},{"code":"150104","name":"玉泉区"},{"code":"150105","name":"赛罕区"},{"code":"150121","name":"土默特左旗"},{"code":"150122","name":"托克托县"},{"code":"150123","name":"和林格尔县"},{"code":"150124","name":"清水河县"},{"code":"150125","name":"武川县"}]},{"code":"1502","name":"包头市","childs":[{"code":"150202","name":"东河区"},{"code":"150203","name":"昆都仑区"},{"code":"150204","name":"青山区"},{"code":"150205","name":"石拐区"},{"code":"150206","name":"白云鄂博矿区"},{"code":"150207","name":"九原区"},{"code":"150221","name":"土默特右旗"},{"code":"150222","name":"固阳县"},{"code":"150223","name":"达尔罕茂明安联合旗"}]},{"code":"1503","name":"乌海市","childs":[{"code":"150302","name":"海勃湾区"},{"code":"150303","name":"海南区"},{"code":"150304","name":"乌达区"}]},{"code":"1504","name":"赤峰市","childs":[{"code":"150402","name":"红山区"},{"code":"150403","name":"元宝山区"},{"code":"150404","name":"松山区"},{"code":"150421","name":"阿鲁科尔沁旗"},{"code":"150422","name":"巴林左旗"},{"code":"150423","name":"巴林右旗"},{"code":"150424","name":"林西县"},{"code":"150425","name":"克什克腾旗"},{"code":"150426","name":"翁牛特旗"},{"code":"150428","name":"喀喇沁旗"},{"code":"150429","name":"宁城县"},{"code":"150430","name":"敖汉旗"}]},{"code":"1505","name":"通辽市","childs":[{"code":"150502","name":"科尔沁区"},{"code":"150521","name":"科尔沁左翼中旗"},{"code":"150522","name":"科尔沁左翼后旗"},{"code":"150523","name":"开鲁县"},{"code":"150524","name":"库伦旗"},{"code":"150525","name":"奈曼旗"},{"code":"150526","name":"扎鲁特旗"},{"code":"150581","name":"霍林郭勒市"}]},{"code":"1506","name":"鄂尔多斯市","childs":[{"code":"150602","name":"东胜区"},{"code":"150603","name":"康巴什区"},{"code":"150621","name":"达拉特旗"},{"code":"150622","name":"准格尔旗"},{"code":"150623","name":"鄂托克前旗"},{"code":"150624","name":"鄂托克旗"},{"code":"150625","name":"杭锦旗"},{"code":"150626","name":"乌审旗"},{"code":"150627","name":"伊金霍洛旗"}]},{"code":"1507","name":"呼伦贝尔市","childs":[{"code":"150702","name":"海拉尔区"},{"code":"150703","name":"扎赉诺尔区"},{"code":"150721","name":"阿荣旗"},{"code":"150722","name":"莫力达瓦达斡尔族自治旗"},{"code":"150723","name":"鄂伦春自治旗"},{"code":"150724","name":"鄂温克族自治旗"},{"code":"150725","name":"陈巴尔虎旗"},{"code":"150726","name":"新巴尔虎左旗"},{"code":"150727","name":"新巴尔虎右旗"},{"code":"150781","name":"满洲里市"},{"code":"150782","name":"牙克石市"},{"code":"150783","name":"扎兰屯市"},{"code":"150784","name":"额尔古纳市"},{"code":"150785","name":"根河市"}]},{"code":"1508","name":"巴彦淖尔市","childs":[{"code":"150802","name":"临河区"},{"code":"150821","name":"五原县"},{"code":"150822","name":"磴口县"},{"code":"150823","name":"乌拉特前旗"},{"code":"150824","name":"乌拉特中旗"},{"code":"150825","name":"乌拉特后旗"},{"code":"150826","name":"杭锦后旗"}]},{"code":"1509","name":"乌兰察布市","childs":[{"code":"150902","name":"集宁区"},{"code":"150921","name":"卓资县"},{"code":"150922","name":"化德县"},{"code":"150923","name":"商都县"},{"code":"150924","name":"兴和县"},{"code":"150925","name":"凉城县"},{"code":"150926","name":"察哈尔右翼前旗"},{"code":"150927","name":"察哈尔右翼中旗"},{"code":"150928","name":"察哈尔右翼后旗"},{"code":"150929","name":"四子王旗"},{"code":"150981","name":"丰镇市"}]},{"code":"1522","name":"兴安盟","childs":[{"code":"152201","name":"乌兰浩特市"},{"code":"152202","name":"阿尔山市"},{"code":"152221","name":"科尔沁右翼前旗"},{"code":"152222","name":"科尔沁右翼中旗"},{"code":"152223","name":"扎赉特旗"},{"code":"152224","name":"突泉县"}]},{"code":"1525","name":"锡林郭勒盟","childs":[{"code":"152501","name":"二连浩特市"},{"code":"152502","name":"锡林浩特市"},{"code":"152522","name":"阿巴嘎旗"},{"code":"152523","name":"苏尼特左旗"},{"code":"152524","name":"苏尼特右旗"},{"code":"152525","name":"东乌珠穆沁旗"},{"code":"152526","name":"西乌珠穆沁旗"},{"code":"152527","name":"太仆寺旗"},{"code":"152528","name":"镶黄旗"},{"code":"152529","name":"正镶白旗"},{"code":"152530","name":"正蓝旗"},{"code":"152531","name":"多伦县"}]},{"code":"1529","name":"阿拉善盟","childs":[{"code":"152921","name":"阿拉善左旗"},{"code":"152922","name":"阿拉善右旗"},{"code":"152923","name":"额济纳旗"}]}]},{"code":"21","name":"辽宁省","childs":[{"code":"2101","name":"沈阳市","childs":[{"code":"210102","name":"和平区"},{"code":"210103","name":"沈河区"},{"code":"210104","name":"大东区"},{"code":"210105","name":"皇姑区"},{"code":"210106","name":"铁西区"},{"code":"210111","name":"苏家屯区"},{"code":"210112","name":"浑南区"},{"code":"210113","name":"沈北新区"},{"code":"210114","name":"于洪区"},{"code":"210115","name":"辽中区"},{"code":"210123","name":"康平县"},{"code":"210124","name":"法库县"},{"code":"210181","name":"新民市"}]},{"code":"2102","name":"大连市","childs":[{"code":"210202","name":"中山区"},{"code":"210203","name":"西岗区"},{"code":"210204","name":"沙河口区"},{"code":"210211","name":"甘井子区"},{"code":"210212","name":"旅顺口区"},{"code":"210213","name":"金州区"},{"code":"210214","name":"普兰店区"},{"code":"210224","name":"长海县"},{"code":"210281","name":"瓦房店市"},{"code":"210283","name":"庄河市"}]},{"code":"2103","name":"鞍山市","childs":[{"code":"210302","name":"铁东区"},{"code":"210303","name":"铁西区"},{"code":"210304","name":"立山区"},{"code":"210311","name":"千山区"},{"code":"210321","name":"台安县"},{"code":"210323","name":"岫岩满族自治县"},{"code":"210381","name":"海城市"}]},{"code":"2104","name":"抚顺市","childs":[{"code":"210402","name":"新抚区"},{"code":"210403","name":"东洲区"},{"code":"210404","name":"望花区"},{"code":"210411","name":"顺城区"},{"code":"210421","name":"抚顺县"},{"code":"210422","name":"新宾满族自治县"},{"code":"210423","name":"清原满族自治县"}]},{"code":"2105","name":"本溪市","childs":[{"code":"210502","name":"平山区"},{"code":"210503","name":"溪湖区"},{"code":"210504","name":"明山区"},{"code":"210505","name":"南芬区"},{"code":"210521","name":"本溪满族自治县"},{"code":"210522","name":"桓仁满族自治县"}]},{"code":"2106","name":"丹东市","childs":[{"code":"210602","name":"元宝区"},{"code":"210603","name":"振兴区"},{"code":"210604","name":"振安区"},{"code":"210624","name":"宽甸满族自治县"},{"code":"210681","name":"东港市"},{"code":"210682","name":"凤城市"}]},{"code":"2107","name":"锦州市","childs":[{"code":"210702","name":"古塔区"},{"code":"210703","name":"凌河区"},{"code":"210711","name":"太和区"},{"code":"210726","name":"黑山县"},{"code":"210727","name":"义县"},{"code":"210781","name":"凌海市"},{"code":"210782","name":"北镇市"}]},{"code":"2108","name":"营口市","childs":[{"code":"210802","name":"站前区"},{"code":"210803","name":"西市区"},{"code":"210804","name":"鲅鱼圈区"},{"code":"210811","name":"老边区"},{"code":"210881","name":"盖州市"},{"code":"210882","name":"大石桥市"}]},{"code":"2109","name":"阜新市","childs":[{"code":"210902","name":"海州区"},{"code":"210903","name":"新邱区"},{"code":"210904","name":"太平区"},{"code":"210905","name":"清河门区"},{"code":"210911","name":"细河区"},{"code":"210921","name":"阜新蒙古族自治县"},{"code":"210922","name":"彰武县"}]},{"code":"2110","name":"辽阳市","childs":[{"code":"211002","name":"白塔区"},{"code":"211003","name":"文圣区"},{"code":"211004","name":"宏伟区"},{"code":"211005","name":"弓长岭区"},{"code":"211011","name":"太子河区"},{"code":"211021","name":"辽阳县"},{"code":"211081","name":"灯塔市"}]},{"code":"2111","name":"盘锦市","childs":[{"code":"211102","name":"双台子区"},{"code":"211103","name":"兴隆台区"},{"code":"211104","name":"大洼区"},{"code":"211122","name":"盘山县"}]},{"code":"2112","name":"铁岭市","childs":[{"code":"211202","name":"银州区"},{"code":"211204","name":"清河区"},{"code":"211221","name":"铁岭县"},{"code":"211223","name":"西丰县"},{"code":"211224","name":"昌图县"},{"code":"211281","name":"调兵山市"},{"code":"211282","name":"开原市"}]},{"code":"2113","name":"朝阳市","childs":[{"code":"211302","name":"双塔区"},{"code":"211303","name":"龙城区"},{"code":"211321","name":"朝阳县"},{"code":"211322","name":"建平县"},{"code":"211324","name":"喀喇沁左翼蒙古族自治县"},{"code":"211381","name":"北票市"},{"code":"211382","name":"凌源市"}]},{"code":"2114","name":"葫芦岛市","childs":[{"code":"211402","name":"连山区"},{"code":"211403","name":"龙港区"},{"code":"211404","name":"南票区"},{"code":"211421","name":"绥中县"},{"code":"211422","name":"建昌县"},{"code":"211481","name":"兴城市"}]}]},{"code":"22","name":"吉林省","childs":[{"code":"2201","name":"长春市","childs":[{"code":"220102","name":"南关区"},{"code":"220103","name":"宽城区"},{"code":"220104","name":"朝阳区"},{"code":"220105","name":"二道区"},{"code":"220106","name":"绿园区"},{"code":"220112","name":"双阳区"},{"code":"220113","name":"九台区"},{"code":"220122","name":"农安县"},{"code":"220182","name":"榆树市"},{"code":"220183","name":"德惠市"}]},{"code":"2202","name":"吉林市","childs":[{"code":"220202","name":"昌邑区"},{"code":"220203","name":"龙潭区"},{"code":"220204","name":"船营区"},{"code":"220211","name":"丰满区"},{"code":"220221","name":"永吉县"},{"code":"220281","name":"蛟河市"},{"code":"220282","name":"桦甸市"},{"code":"220283","name":"舒兰市"},{"code":"220284","name":"磐石市"}]},{"code":"2203","name":"四平市","childs":[{"code":"220302","name":"铁西区"},{"code":"220303","name":"铁东区"},{"code":"220322","name":"梨树县"},{"code":"220323","name":"伊通满族自治县"},{"code":"220381","name":"公主岭市"},{"code":"220382","name":"双辽市"}]},{"code":"2204","name":"辽源市","childs":[{"code":"220402","name":"龙山区"},{"code":"220403","name":"西安区"},{"code":"220421","name":"东丰县"},{"code":"220422","name":"东辽县"}]},{"code":"2205","name":"通化市","childs":[{"code":"220502","name":"东昌区"},{"code":"220503","name":"二道江区"},{"code":"220521","name":"通化县"},{"code":"220523","name":"辉南县"},{"code":"220524","name":"柳河县"},{"code":"220581","name":"梅河口市"},{"code":"220582","name":"集安市"}]},{"code":"2206","name":"白山市","childs":[{"code":"220602","name":"浑江区"},{"code":"220605","name":"江源区"},{"code":"220621","name":"抚松县"},{"code":"220622","name":"靖宇县"},{"code":"220623","name":"长白朝鲜族自治县"},{"code":"220681","name":"临江市"}]},{"code":"2207","name":"松原市","childs":[{"code":"220702","name":"宁江区"},{"code":"220721","name":"前郭尔罗斯蒙古族自治县"},{"code":"220722","name":"长岭县"},{"code":"220723","name":"乾安县"},{"code":"220781","name":"扶余市"}]},{"code":"2208","name":"白城市","childs":[{"code":"220802","name":"洮北区"},{"code":"220821","name":"镇赉县"},{"code":"220822","name":"通榆县"},{"code":"220881","name":"洮南市"},{"code":"220882","name":"大安市"}]},{"code":"2224","name":"延边朝鲜族自治州","childs":[{"code":"222401","name":"延吉市"},{"code":"222402","name":"图们市"},{"code":"222403","name":"敦化市"},{"code":"222404","name":"珲春市"},{"code":"222405","name":"龙井市"},{"code":"222406","name":"和龙市"},{"code":"222424","name":"汪清县"},{"code":"222426","name":"安图县"}]}]},{"code":"23","name":"黑龙江省","childs":[{"code":"2301","name":"哈尔滨市","childs":[{"code":"230102","name":"道里区"},{"code":"230103","name":"南岗区"},{"code":"230104","name":"道外区"},{"code":"230108","name":"平房区"},{"code":"230109","name":"松北区"},{"code":"230110","name":"香坊区"},{"code":"230111","name":"呼兰区"},{"code":"230112","name":"阿城区"},{"code":"230113","name":"双城区"},{"code":"230123","name":"依兰县"},{"code":"230124","name":"方正县"},{"code":"230125","name":"宾县"},{"code":"230126","name":"巴彦县"},{"code":"230127","name":"木兰县"},{"code":"230128","name":"通河县"},{"code":"230129","name":"延寿县"},{"code":"230183","name":"尚志市"},{"code":"230184","name":"五常市"}]},{"code":"2302","name":"齐齐哈尔市","childs":[{"code":"230202","name":"龙沙区"},{"code":"230203","name":"建华区"},{"code":"230204","name":"铁锋区"},{"code":"230205","name":"昂昂溪区"},{"code":"230206","name":"富拉尔基区"},{"code":"230207","name":"碾子山区"},{"code":"230208","name":"梅里斯达斡尔族区"},{"code":"230221","name":"龙江县"},{"code":"230223","name":"依安县"},{"code":"230224","name":"泰来县"},{"code":"230225","name":"甘南县"},{"code":"230227","name":"富裕县"},{"code":"230229","name":"克山县"},{"code":"230230","name":"克东县"},{"code":"230231","name":"拜泉县"},{"code":"230281","name":"讷河市"}]},{"code":"2303","name":"鸡西市","childs":[{"code":"230302","name":"鸡冠区"},{"code":"230303","name":"恒山区"},{"code":"230304","name":"滴道区"},{"code":"230305","name":"梨树区"},{"code":"230306","name":"城子河区"},{"code":"230307","name":"麻山区"},{"code":"230321","name":"鸡东县"},{"code":"230381","name":"虎林市"},{"code":"230382","name":"密山市"}]},{"code":"2304","name":"鹤岗市","childs":[{"code":"230402","name":"向阳区"},{"code":"230403","name":"工农区"},{"code":"230404","name":"南山区"},{"code":"230405","name":"兴安区"},{"code":"230406","name":"东山区"},{"code":"230407","name":"兴山区"},{"code":"230421","name":"萝北县"},{"code":"230422","name":"绥滨县"}]},{"code":"2305","name":"双鸭山市","childs":[{"code":"230502","name":"尖山区"},{"code":"230503","name":"岭东区"},{"code":"230505","name":"四方台区"},{"code":"230506","name":"宝山区"},{"code":"230521","name":"集贤县"},{"code":"230522","name":"友谊县"},{"code":"230523","name":"宝清县"},{"code":"230524","name":"饶河县"}]},{"code":"2306","name":"大庆市","childs":[{"code":"230602","name":"萨尔图区"},{"code":"230603","name":"龙凤区"},{"code":"230604","name":"让胡路区"},{"code":"230605","name":"红岗区"},{"code":"230606","name":"大同区"},{"code":"230621","name":"肇州县"},{"code":"230622","name":"肇源县"},{"code":"230623","name":"林甸县"},{"code":"230624","name":"杜尔伯特蒙古族自治县"}]},{"code":"2307","name":"伊春市","childs":[{"code":"230702","name":"伊春区"},{"code":"230703","name":"南岔区"},{"code":"230704","name":"友好区"},{"code":"230705","name":"西林区"},{"code":"230706","name":"翠峦区"},{"code":"230707","name":"新青区"},{"code":"230708","name":"美溪区"},{"code":"230709","name":"金山屯区"},{"code":"230710","name":"五营区"},{"code":"230711","name":"乌马河区"},{"code":"230712","name":"汤旺河区"},{"code":"230713","name":"带岭区"},{"code":"230714","name":"乌伊岭区"},{"code":"230715","name":"红星区"},{"code":"230716","name":"上甘岭区"},{"code":"230722","name":"嘉荫县"},{"code":"230781","name":"铁力市"}]},{"code":"2308","name":"佳木斯市","childs":[{"code":"230803","name":"向阳区"},{"code":"230804","name":"前进区"},{"code":"230805","name":"东风区"},{"code":"230811","name":"郊区"},{"code":"230822","name":"桦南县"},{"code":"230826","name":"桦川县"},{"code":"230828","name":"汤原县"},{"code":"230881","name":"同江市"},{"code":"230882","name":"富锦市"},{"code":"230883","name":"抚远市"}]},{"code":"2309","name":"七台河市","childs":[{"code":"230902","name":"新兴区"},{"code":"230903","name":"桃山区"},{"code":"230904","name":"茄子河区"},{"code":"230921","name":"勃利县"}]},{"code":"2310","name":"牡丹江市","childs":[{"code":"231002","name":"东安区"},{"code":"231003","name":"阳明区"},{"code":"231004","name":"爱民区"},{"code":"231005","name":"西安区"},{"code":"231025","name":"林口县"},{"code":"231081","name":"绥芬河市"},{"code":"231083","name":"海林市"},{"code":"231084","name":"宁安市"},{"code":"231085","name":"穆棱市"},{"code":"231086","name":"东宁市"}]},{"code":"2311","name":"黑河市","childs":[{"code":"231102","name":"爱辉区"},{"code":"231121","name":"嫩江县"},{"code":"231123","name":"逊克县"},{"code":"231124","name":"孙吴县"},{"code":"231181","name":"北安市"},{"code":"231182","name":"五大连池市"}]},{"code":"2312","name":"绥化市","childs":[{"code":"231202","name":"北林区"},{"code":"231221","name":"望奎县"},{"code":"231222","name":"兰西县"},{"code":"231223","name":"青冈县"},{"code":"231224","name":"庆安县"},{"code":"231225","name":"明水县"},{"code":"231226","name":"绥棱县"},{"code":"231281","name":"安达市"},{"code":"231282","name":"肇东市"},{"code":"231283","name":"海伦市"}]},{"code":"2327","name":"大兴安岭地区","childs":[{"code":"232721","name":"呼玛县"},{"code":"232722","name":"塔河县"},{"code":"232723","name":"漠河县"}]}]},{"code":"31","name":"上海市","childs":[{"code":"3101","name":"市辖区","childs":[{"code":"310101","name":"黄浦区"},{"code":"310104","name":"徐汇区"},{"code":"310105","name":"长宁区"},{"code":"310106","name":"静安区"},{"code":"310107","name":"普陀区"},{"code":"310109","name":"虹口区"},{"code":"310110","name":"杨浦区"},{"code":"310112","name":"闵行区"},{"code":"310113","name":"宝山区"},{"code":"310114","name":"嘉定区"},{"code":"310115","name":"浦东新区"},{"code":"310116","name":"金山区"},{"code":"310117","name":"松江区"},{"code":"310118","name":"青浦区"},{"code":"310120","name":"奉贤区"},{"code":"310151","name":"崇明区"}]}]},{"code":"32","name":"江苏省","childs":[{"code":"3201","name":"南京市","childs":[{"code":"320102","name":"玄武区"},{"code":"320104","name":"秦淮区"},{"code":"320105","name":"建邺区"},{"code":"320106","name":"鼓楼区"},{"code":"320111","name":"浦口区"},{"code":"320113","name":"栖霞区"},{"code":"320114","name":"雨花台区"},{"code":"320115","name":"江宁区"},{"code":"320116","name":"六合区"},{"code":"320117","name":"溧水区"},{"code":"320118","name":"高淳区"}]},{"code":"3202","name":"无锡市","childs":[{"code":"320205","name":"锡山区"},{"code":"320206","name":"惠山区"},{"code":"320211","name":"滨湖区"},{"code":"320213","name":"梁溪区"},{"code":"320214","name":"新吴区"},{"code":"320281","name":"江阴市"},{"code":"320282","name":"宜兴市"}]},{"code":"3203","name":"徐州市","childs":[{"code":"320302","name":"鼓楼区"},{"code":"320303","name":"云龙区"},{"code":"320305","name":"贾汪区"},{"code":"320311","name":"泉山区"},{"code":"320312","name":"铜山区"},{"code":"320321","name":"丰县"},{"code":"320322","name":"沛县"},{"code":"320324","name":"睢宁县"},{"code":"320381","name":"新沂市"},{"code":"320382","name":"邳州市"}]},{"code":"3204","name":"常州市","childs":[{"code":"320402","name":"天宁区"},{"code":"320404","name":"钟楼区"},{"code":"320411","name":"新北区"},{"code":"320412","name":"武进区"},{"code":"320413","name":"金坛区"},{"code":"320481","name":"溧阳市"}]},{"code":"3205","name":"苏州市","childs":[{"code":"320505","name":"虎丘区"},{"code":"320506","name":"吴中区"},{"code":"320507","name":"相城区"},{"code":"320508","name":"姑苏区"},{"code":"320509","name":"吴江区"},{"code":"320581","name":"常熟市"},{"code":"320582","name":"张家港市"},{"code":"320583","name":"昆山市"},{"code":"320585","name":"太仓市"}]},{"code":"3206","name":"南通市","childs":[{"code":"320602","name":"崇川区"},{"code":"320611","name":"港闸区"},{"code":"320612","name":"通州区"},{"code":"320621","name":"海安县"},{"code":"320623","name":"如东县"},{"code":"320681","name":"启东市"},{"code":"320682","name":"如皋市"},{"code":"320684","name":"海门市"}]},{"code":"3207","name":"连云港市","childs":[{"code":"320703","name":"连云区"},{"code":"320706","name":"海州区"},{"code":"320707","name":"赣榆区"},{"code":"320722","name":"东海县"},{"code":"320723","name":"灌云县"},{"code":"320724","name":"灌南县"}]},{"code":"3208","name":"淮安市","childs":[{"code":"320803","name":"淮安区"},{"code":"320804","name":"淮阴区"},{"code":"320812","name":"清江浦区"},{"code":"320813","name":"洪泽区"},{"code":"320826","name":"涟水县"},{"code":"320830","name":"盱眙县"},{"code":"320831","name":"金湖县"}]},{"code":"3209","name":"盐城市","childs":[{"code":"320902","name":"亭湖区"},{"code":"320903","name":"盐都区"},{"code":"320904","name":"大丰区"},{"code":"320921","name":"响水县"},{"code":"320922","name":"滨海县"},{"code":"320923","name":"阜宁县"},{"code":"320924","name":"射阳县"},{"code":"320925","name":"建湖县"},{"code":"320981","name":"东台市"}]},{"code":"3210","name":"扬州市","childs":[{"code":"321002","name":"广陵区"},{"code":"321003","name":"邗江区"},{"code":"321012","name":"江都区"},{"code":"321023","name":"宝应县"},{"code":"321081","name":"仪征市"},{"code":"321084","name":"高邮市"}]},{"code":"3211","name":"镇江市","childs":[{"code":"321102","name":"京口区"},{"code":"321111","name":"润州区"},{"code":"321112","name":"丹徒区"},{"code":"321181","name":"丹阳市"},{"code":"321182","name":"扬中市"},{"code":"321183","name":"句容市"}]},{"code":"3212","name":"泰州市","childs":[{"code":"321202","name":"海陵区"},{"code":"321203","name":"高港区"},{"code":"321204","name":"姜堰区"},{"code":"321281","name":"兴化市"},{"code":"321282","name":"靖江市"},{"code":"321283","name":"泰兴市"}]},{"code":"3213","name":"宿迁市","childs":[{"code":"321302","name":"宿城区"},{"code":"321311","name":"宿豫区"},{"code":"321322","name":"沭阳县"},{"code":"321323","name":"泗阳县"},{"code":"321324","name":"泗洪县"}]}]},{"code":"33","name":"浙江省","childs":[{"code":"3301","name":"杭州市","childs":[{"code":"330102","name":"上城区"},{"code":"330103","name":"下城区"},{"code":"330104","name":"江干区"},{"code":"330105","name":"拱墅区"},{"code":"330106","name":"西湖区"},{"code":"330108","name":"滨江区"},{"code":"330109","name":"萧山区"},{"code":"330110","name":"余杭区"},{"code":"330111","name":"富阳区"},{"code":"330122","name":"桐庐县"},{"code":"330127","name":"淳安县"},{"code":"330182","name":"建德市"},{"code":"330185","name":"临安市"}]},{"code":"3302","name":"宁波市","childs":[{"code":"330203","name":"海曙区"},{"code":"330204","name":"江东区"},{"code":"330205","name":"江北区"},{"code":"330206","name":"北仑区"},{"code":"330211","name":"镇海区"},{"code":"330212","name":"鄞州区"},{"code":"330225","name":"象山县"},{"code":"330226","name":"宁海县"},{"code":"330281","name":"余姚市"},{"code":"330282","name":"慈溪市"},{"code":"330283","name":"奉化市"}]},{"code":"3303","name":"温州市","childs":[{"code":"330302","name":"鹿城区"},{"code":"330303","name":"龙湾区"},{"code":"330304","name":"瓯海区"},{"code":"330305","name":"洞头区"},{"code":"330324","name":"永嘉县"},{"code":"330326","name":"平阳县"},{"code":"330327","name":"苍南县"},{"code":"330328","name":"文成县"},{"code":"330329","name":"泰顺县"},{"code":"330381","name":"瑞安市"},{"code":"330382","name":"乐清市"}]},{"code":"3304","name":"嘉兴市","childs":[{"code":"330402","name":"南湖区"},{"code":"330411","name":"秀洲区"},{"code":"330421","name":"嘉善县"},{"code":"330424","name":"海盐县"},{"code":"330481","name":"海宁市"},{"code":"330482","name":"平湖市"},{"code":"330483","name":"桐乡市"}]},{"code":"3305","name":"湖州市","childs":[{"code":"330502","name":"吴兴区"},{"code":"330503","name":"南浔区"},{"code":"330521","name":"德清县"},{"code":"330522","name":"长兴县"},{"code":"330523","name":"安吉县"}]},{"code":"3306","name":"绍兴市","childs":[{"code":"330602","name":"越城区"},{"code":"330603","name":"柯桥区"},{"code":"330604","name":"上虞区"},{"code":"330624","name":"新昌县"},{"code":"330681","name":"诸暨市"},{"code":"330683","name":"嵊州市"}]},{"code":"3307","name":"金华市","childs":[{"code":"330702","name":"婺城区"},{"code":"330703","name":"金东区"},{"code":"330723","name":"武义县"},{"code":"330726","name":"浦江县"},{"code":"330727","name":"磐安县"},{"code":"330781","name":"兰溪市"},{"code":"330782","name":"义乌市"},{"code":"330783","name":"东阳市"},{"code":"330784","name":"永康市"}]},{"code":"3308","name":"衢州市","childs":[{"code":"330802","name":"柯城区"},{"code":"330803","name":"衢江区"},{"code":"330822","name":"常山县"},{"code":"330824","name":"开化县"},{"code":"330825","name":"龙游县"},{"code":"330881","name":"江山市"}]},{"code":"3309","name":"舟山市","childs":[{"code":"330902","name":"定海区"},{"code":"330903","name":"普陀区"},{"code":"330921","name":"岱山县"},{"code":"330922","name":"嵊泗县"}]},{"code":"3310","name":"台州市","childs":[{"code":"331002","name":"椒江区"},{"code":"331003","name":"黄岩区"},{"code":"331004","name":"路桥区"},{"code":"331021","name":"玉环县"},{"code":"331022","name":"三门县"},{"code":"331023","name":"天台县"},{"code":"331024","name":"仙居县"},{"code":"331081","name":"温岭市"},{"code":"331082","name":"临海市"}]},{"code":"3311","name":"丽水市","childs":[{"code":"331102","name":"莲都区"},{"code":"331121","name":"青田县"},{"code":"331122","name":"缙云县"},{"code":"331123","name":"遂昌县"},{"code":"331124","name":"松阳县"},{"code":"331125","name":"云和县"},{"code":"331126","name":"庆元县"},{"code":"331127","name":"景宁畲族自治县"},{"code":"331181","name":"龙泉市"}]}]},{"code":"34","name":"安徽省","childs":[{"code":"3401","name":"合肥市","childs":[{"code":"340102","name":"瑶海区"},{"code":"340103","name":"庐阳区"},{"code":"340104","name":"蜀山区"},{"code":"340111","name":"包河区"},{"code":"340121","name":"长丰县"},{"code":"340122","name":"肥东县"},{"code":"340123","name":"肥西县"},{"code":"340124","name":"庐江县"},{"code":"340181","name":"巢湖市"}]},{"code":"3402","name":"芜湖市","childs":[{"code":"340202","name":"镜湖区"},{"code":"340203","name":"弋江区"},{"code":"340207","name":"鸠江区"},{"code":"340208","name":"三山区"},{"code":"340221","name":"芜湖县"},{"code":"340222","name":"繁昌县"},{"code":"340223","name":"南陵县"},{"code":"340225","name":"无为县"}]},{"code":"3403","name":"蚌埠市","childs":[{"code":"340302","name":"龙子湖区"},{"code":"340303","name":"蚌山区"},{"code":"340304","name":"禹会区"},{"code":"340311","name":"淮上区"},{"code":"340321","name":"怀远县"},{"code":"340322","name":"五河县"},{"code":"340323","name":"固镇县"}]},{"code":"3404","name":"淮南市","childs":[{"code":"340402","name":"大通区"},{"code":"340403","name":"田家庵区"},{"code":"340404","name":"谢家集区"},{"code":"340405","name":"八公山区"},{"code":"340406","name":"潘集区"},{"code":"340421","name":"凤台县"},{"code":"340422","name":"寿县"}]},{"code":"3405","name":"马鞍山市","childs":[{"code":"340503","name":"花山区"},{"code":"340504","name":"雨山区"},{"code":"340506","name":"博望区"},{"code":"340521","name":"当涂县"},{"code":"340522","name":"含山县"},{"code":"340523","name":"和县"}]},{"code":"3406","name":"淮北市","childs":[{"code":"340602","name":"杜集区"},{"code":"340603","name":"相山区"},{"code":"340604","name":"烈山区"},{"code":"340621","name":"濉溪县"}]},{"code":"3407","name":"铜陵市","childs":[{"code":"340705","name":"铜官区"},{"code":"340706","name":"义安区"},{"code":"340711","name":"郊区"},{"code":"340722","name":"枞阳县"}]},{"code":"3408","name":"安庆市","childs":[{"code":"340802","name":"迎江区"},{"code":"340803","name":"大观区"},{"code":"340811","name":"宜秀区"},{"code":"340822","name":"怀宁县"},{"code":"340824","name":"潜山县"},{"code":"340825","name":"太湖县"},{"code":"340826","name":"宿松县"},{"code":"340827","name":"望江县"},{"code":"340828","name":"岳西县"},{"code":"340881","name":"桐城市"}]},{"code":"3410","name":"黄山市","childs":[{"code":"341002","name":"屯溪区"},{"code":"341003","name":"黄山区"},{"code":"341004","name":"徽州区"},{"code":"341021","name":"歙县"},{"code":"341022","name":"休宁县"},{"code":"341023","name":"黟县"},{"code":"341024","name":"祁门县"}]},{"code":"3411","name":"滁州市","childs":[{"code":"341102","name":"琅琊区"},{"code":"341103","name":"南谯区"},{"code":"341122","name":"来安县"},{"code":"341124","name":"全椒县"},{"code":"341125","name":"定远县"},{"code":"341126","name":"凤阳县"},{"code":"341181","name":"天长市"},{"code":"341182","name":"明光市"}]},{"code":"3412","name":"阜阳市","childs":[{"code":"341202","name":"颍州区"},{"code":"341203","name":"颍东区"},{"code":"341204","name":"颍泉区"},{"code":"341221","name":"临泉县"},{"code":"341222","name":"太和县"},{"code":"341225","name":"阜南县"},{"code":"341226","name":"颍上县"},{"code":"341282","name":"界首市"}]},{"code":"3413","name":"宿州市","childs":[{"code":"341302","name":"埇桥区"},{"code":"341321","name":"砀山县"},{"code":"341322","name":"萧县"},{"code":"341323","name":"灵璧县"},{"code":"341324","name":"泗县"}]},{"code":"3415","name":"六安市","childs":[{"code":"341502","name":"金安区"},{"code":"341503","name":"裕安区"},{"code":"341504","name":"叶集区"},{"code":"341522","name":"霍邱县"},{"code":"341523","name":"舒城县"},{"code":"341524","name":"金寨县"},{"code":"341525","name":"霍山县"}]},{"code":"3416","name":"亳州市","childs":[{"code":"341602","name":"谯城区"},{"code":"341621","name":"涡阳县"},{"code":"341622","name":"蒙城县"},{"code":"341623","name":"利辛县"}]},{"code":"3417","name":"池州市","childs":[{"code":"341702","name":"贵池区"},{"code":"341721","name":"东至县"},{"code":"341722","name":"石台县"},{"code":"341723","name":"青阳县"}]},{"code":"3418","name":"宣城市","childs":[{"code":"341802","name":"宣州区"},{"code":"341821","name":"郎溪县"},{"code":"341822","name":"广德县"},{"code":"341823","name":"泾县"},{"code":"341824","name":"绩溪县"},{"code":"341825","name":"旌德县"},{"code":"341881","name":"宁国市"}]}]},{"code":"35","name":"福建省","childs":[{"code":"3501","name":"福州市","childs":[{"code":"350102","name":"鼓楼区"},{"code":"350103","name":"台江区"},{"code":"350104","name":"仓山区"},{"code":"350105","name":"马尾区"},{"code":"350111","name":"晋安区"},{"code":"350121","name":"闽侯县"},{"code":"350122","name":"连江县"},{"code":"350123","name":"罗源县"},{"code":"350124","name":"闽清县"},{"code":"350125","name":"永泰县"},{"code":"350128","name":"平潭县"},{"code":"350181","name":"福清市"},{"code":"350182","name":"长乐市"}]},{"code":"3502","name":"厦门市","childs":[{"code":"350203","name":"思明区"},{"code":"350205","name":"海沧区"},{"code":"350206","name":"湖里区"},{"code":"350211","name":"集美区"},{"code":"350212","name":"同安区"},{"code":"350213","name":"翔安区"}]},{"code":"3503","name":"莆田市","childs":[{"code":"350302","name":"城厢区"},{"code":"350303","name":"涵江区"},{"code":"350304","name":"荔城区"},{"code":"350305","name":"秀屿区"},{"code":"350322","name":"仙游县"}]},{"code":"3504","name":"三明市","childs":[{"code":"350402","name":"梅列区"},{"code":"350403","name":"三元区"},{"code":"350421","name":"明溪县"},{"code":"350423","name":"清流县"},{"code":"350424","name":"宁化县"},{"code":"350425","name":"大田县"},{"code":"350426","name":"尤溪县"},{"code":"350427","name":"沙县"},{"code":"350428","name":"将乐县"},{"code":"350429","name":"泰宁县"},{"code":"350430","name":"建宁县"},{"code":"350481","name":"永安市"}]},{"code":"3505","name":"泉州市","childs":[{"code":"350502","name":"鲤城区"},{"code":"350503","name":"丰泽区"},{"code":"350504","name":"洛江区"},{"code":"350505","name":"泉港区"},{"code":"350521","name":"惠安县"},{"code":"350524","name":"安溪县"},{"code":"350525","name":"永春县"},{"code":"350526","name":"德化县"},{"code":"350527","name":"金门县"},{"code":"350581","name":"石狮市"},{"code":"350582","name":"晋江市"},{"code":"350583","name":"南安市"}]},{"code":"3506","name":"漳州市","childs":[{"code":"350602","name":"芗城区"},{"code":"350603","name":"龙文区"},{"code":"350622","name":"云霄县"},{"code":"350623","name":"漳浦县"},{"code":"350624","name":"诏安县"},{"code":"350625","name":"长泰县"},{"code":"350626","name":"东山县"},{"code":"350627","name":"南靖县"},{"code":"350628","name":"平和县"},{"code":"350629","name":"华安县"},{"code":"350681","name":"龙海市"}]},{"code":"3507","name":"南平市","childs":[{"code":"350702","name":"延平区"},{"code":"350703","name":"建阳区"},{"code":"350721","name":"顺昌县"},{"code":"350722","name":"浦城县"},{"code":"350723","name":"光泽县"},{"code":"350724","name":"松溪县"},{"code":"350725","name":"政和县"},{"code":"350781","name":"邵武市"},{"code":"350782","name":"武夷山市"},{"code":"350783","name":"建瓯市"}]},{"code":"3508","name":"龙岩市","childs":[{"code":"350802","name":"新罗区"},{"code":"350803","name":"永定区"},{"code":"350821","name":"长汀县"},{"code":"350823","name":"上杭县"},{"code":"350824","name":"武平县"},{"code":"350825","name":"连城县"},{"code":"350881","name":"漳平市"}]},{"code":"3509","name":"宁德市","childs":[{"code":"350902","name":"蕉城区"},{"code":"350921","name":"霞浦县"},{"code":"350922","name":"古田县"},{"code":"350923","name":"屏南县"},{"code":"350924","name":"寿宁县"},{"code":"350925","name":"周宁县"},{"code":"350926","name":"柘荣县"},{"code":"350981","name":"福安市"},{"code":"350982","name":"福鼎市"}]}]},{"code":"36","name":"江西省","childs":[{"code":"3601","name":"南昌市","childs":[{"code":"360102","name":"东湖区"},{"code":"360103","name":"西湖区"},{"code":"360104","name":"青云谱区"},{"code":"360105","name":"湾里区"},{"code":"360111","name":"青山湖区"},{"code":"360112","name":"新建区"},{"code":"360121","name":"南昌县"},{"code":"360123","name":"安义县"},{"code":"360124","name":"进贤县"}]},{"code":"3602","name":"景德镇市","childs":[{"code":"360202","name":"昌江区"},{"code":"360203","name":"珠山区"},{"code":"360222","name":"浮梁县"},{"code":"360281","name":"乐平市"}]},{"code":"3603","name":"萍乡市","childs":[{"code":"360302","name":"安源区"},{"code":"360313","name":"湘东区"},{"code":"360321","name":"莲花县"},{"code":"360322","name":"上栗县"},{"code":"360323","name":"芦溪县"}]},{"code":"3604","name":"九江市","childs":[{"code":"360402","name":"濂溪区"},{"code":"360403","name":"浔阳区"},{"code":"360421","name":"九江县"},{"code":"360423","name":"武宁县"},{"code":"360424","name":"修水县"},{"code":"360425","name":"永修县"},{"code":"360426","name":"德安县"},{"code":"360428","name":"都昌县"},{"code":"360429","name":"湖口县"},{"code":"360430","name":"彭泽县"},{"code":"360481","name":"瑞昌市"},{"code":"360482","name":"共青城市"},{"code":"360483","name":"庐山市"}]},{"code":"3605","name":"新余市","childs":[{"code":"360502","name":"渝水区"},{"code":"360521","name":"分宜县"}]},{"code":"3606","name":"鹰潭市","childs":[{"code":"360602","name":"月湖区"},{"code":"360622","name":"余江县"},{"code":"360681","name":"贵溪市"}]},{"code":"3607","name":"赣州市","childs":[{"code":"360702","name":"章贡区"},{"code":"360703","name":"南康区"},{"code":"360721","name":"赣县"},{"code":"360722","name":"信丰县"},{"code":"360723","name":"大余县"},{"code":"360724","name":"上犹县"},{"code":"360725","name":"崇义县"},{"code":"360726","name":"安远县"},{"code":"360727","name":"龙南县"},{"code":"360728","name":"定南县"},{"code":"360729","name":"全南县"},{"code":"360730","name":"宁都县"},{"code":"360731","name":"于都县"},{"code":"360732","name":"兴国县"},{"code":"360733","name":"会昌县"},{"code":"360734","name":"寻乌县"},{"code":"360735","name":"石城县"},{"code":"360781","name":"瑞金市"}]},{"code":"3608","name":"吉安市","childs":[{"code":"360802","name":"吉州区"},{"code":"360803","name":"青原区"},{"code":"360821","name":"吉安县"},{"code":"360822","name":"吉水县"},{"code":"360823","name":"峡江县"},{"code":"360824","name":"新干县"},{"code":"360825","name":"永丰县"},{"code":"360826","name":"泰和县"},{"code":"360827","name":"遂川县"},{"code":"360828","name":"万安县"},{"code":"360829","name":"安福县"},{"code":"360830","name":"永新县"},{"code":"360881","name":"井冈山市"}]},{"code":"3609","name":"宜春市","childs":[{"code":"360902","name":"袁州区"},{"code":"360921","name":"奉新县"},{"code":"360922","name":"万载县"},{"code":"360923","name":"上高县"},{"code":"360924","name":"宜丰县"},{"code":"360925","name":"靖安县"},{"code":"360926","name":"铜鼓县"},{"code":"360981","name":"丰城市"},{"code":"360982","name":"樟树市"},{"code":"360983","name":"高安市"}]},{"code":"3610","name":"抚州市","childs":[{"code":"361002","name":"临川区"},{"code":"361021","name":"南城县"},{"code":"361022","name":"黎川县"},{"code":"361023","name":"南丰县"},{"code":"361024","name":"崇仁县"},{"code":"361025","name":"乐安县"},{"code":"361026","name":"宜黄县"},{"code":"361027","name":"金溪县"},{"code":"361028","name":"资溪县"},{"code":"361029","name":"东乡县"},{"code":"361030","name":"广昌县"}]},{"code":"3611","name":"上饶市","childs":[{"code":"361102","name":"信州区"},{"code":"361103","name":"广丰区"},{"code":"361121","name":"上饶县"},{"code":"361123","name":"玉山县"},{"code":"361124","name":"铅山县"},{"code":"361125","name":"横峰县"},{"code":"361126","name":"弋阳县"},{"code":"361127","name":"余干县"},{"code":"361128","name":"鄱阳县"},{"code":"361129","name":"万年县"},{"code":"361130","name":"婺源县"},{"code":"361181","name":"德兴市"}]}]},{"code":"37","name":"山东省","childs":[{"code":"3701","name":"济南市","childs":[{"code":"370102","name":"历下区"},{"code":"370103","name":"市中区"},{"code":"370104","name":"槐荫区"},{"code":"370105","name":"天桥区"},{"code":"370112","name":"历城区"},{"code":"370113","name":"长清区"},{"code":"370124","name":"平阴县"},{"code":"370125","name":"济阳县"},{"code":"370126","name":"商河县"},{"code":"370181","name":"章丘市"}]},{"code":"3702","name":"青岛市","childs":[{"code":"370202","name":"市南区"},{"code":"370203","name":"市北区"},{"code":"370211","name":"黄岛区"},{"code":"370212","name":"崂山区"},{"code":"370213","name":"李沧区"},{"code":"370214","name":"城阳区"},{"code":"370281","name":"胶州市"},{"code":"370282","name":"即墨市"},{"code":"370283","name":"平度市"},{"code":"370285","name":"莱西市"}]},{"code":"3703","name":"淄博市","childs":[{"code":"370302","name":"淄川区"},{"code":"370303","name":"张店区"},{"code":"370304","name":"博山区"},{"code":"370305","name":"临淄区"},{"code":"370306","name":"周村区"},{"code":"370321","name":"桓台县"},{"code":"370322","name":"高青县"},{"code":"370323","name":"沂源县"}]},{"code":"3704","name":"枣庄市","childs":[{"code":"370402","name":"市中区"},{"code":"370403","name":"薛城区"},{"code":"370404","name":"峄城区"},{"code":"370405","name":"台儿庄区"},{"code":"370406","name":"山亭区"},{"code":"370481","name":"滕州市"}]},{"code":"3705","name":"东营市","childs":[{"code":"370502","name":"东营区"},{"code":"370503","name":"河口区"},{"code":"370505","name":"垦利区"},{"code":"370522","name":"利津县"},{"code":"370523","name":"广饶县"}]},{"code":"3706","name":"烟台市","childs":[{"code":"370602","name":"芝罘区"},{"code":"370611","name":"福山区"},{"code":"370612","name":"牟平区"},{"code":"370613","name":"莱山区"},{"code":"370634","name":"长岛县"},{"code":"370681","name":"龙口市"},{"code":"370682","name":"莱阳市"},{"code":"370683","name":"莱州市"},{"code":"370684","name":"蓬莱市"},{"code":"370685","name":"招远市"},{"code":"370686","name":"栖霞市"},{"code":"370687","name":"海阳市"}]},{"code":"3707","name":"潍坊市","childs":[{"code":"370702","name":"潍城区"},{"code":"370703","name":"寒亭区"},{"code":"370704","name":"坊子区"},{"code":"370705","name":"奎文区"},{"code":"370724","name":"临朐县"},{"code":"370725","name":"昌乐县"},{"code":"370781","name":"青州市"},{"code":"370782","name":"诸城市"},{"code":"370783","name":"寿光市"},{"code":"370784","name":"安丘市"},{"code":"370785","name":"高密市"},{"code":"370786","name":"昌邑市"}]},{"code":"3708","name":"济宁市","childs":[{"code":"370811","name":"任城区"},{"code":"370812","name":"兖州区"},{"code":"370826","name":"微山县"},{"code":"370827","name":"鱼台县"},{"code":"370828","name":"金乡县"},{"code":"370829","name":"嘉祥县"},{"code":"370830","name":"汶上县"},{"code":"370831","name":"泗水县"},{"code":"370832","name":"梁山县"},{"code":"370881","name":"曲阜市"},{"code":"370883","name":"邹城市"}]},{"code":"3709","name":"泰安市","childs":[{"code":"370902","name":"泰山区"},{"code":"370911","name":"岱岳区"},{"code":"370921","name":"宁阳县"},{"code":"370923","name":"东平县"},{"code":"370982","name":"新泰市"},{"code":"370983","name":"肥城市"}]},{"code":"3710","name":"威海市","childs":[{"code":"371002","name":"环翠区"},{"code":"371003","name":"文登区"},{"code":"371082","name":"荣成市"},{"code":"371083","name":"乳山市"}]},{"code":"3711","name":"日照市","childs":[{"code":"371102","name":"东港区"},{"code":"371103","name":"岚山区"},{"code":"371121","name":"五莲县"},{"code":"371122","name":"莒县"}]},{"code":"3712","name":"莱芜市","childs":[{"code":"371202","name":"莱城区"},{"code":"371203","name":"钢城区"}]},{"code":"3713","name":"临沂市","childs":[{"code":"371302","name":"兰山区"},{"code":"371311","name":"罗庄区"},{"code":"371312","name":"河东区"},{"code":"371321","name":"沂南县"},{"code":"371322","name":"郯城县"},{"code":"371323","name":"沂水县"},{"code":"371324","name":"兰陵县"},{"code":"371325","name":"费县"},{"code":"371326","name":"平邑县"},{"code":"371327","name":"莒南县"},{"code":"371328","name":"蒙阴县"},{"code":"371329","name":"临沭县"}]},{"code":"3714","name":"德州市","childs":[{"code":"371402","name":"德城区"},{"code":"371403","name":"陵城区"},{"code":"371422","name":"宁津县"},{"code":"371423","name":"庆云县"},{"code":"371424","name":"临邑县"},{"code":"371425","name":"齐河县"},{"code":"371426","name":"平原县"},{"code":"371427","name":"夏津县"},{"code":"371428","name":"武城县"},{"code":"371481","name":"乐陵市"},{"code":"371482","name":"禹城市"}]},{"code":"3715","name":"聊城市","childs":[{"code":"371502","name":"东昌府区"},{"code":"371521","name":"阳谷县"},{"code":"371522","name":"莘县"},{"code":"371523","name":"茌平县"},{"code":"371524","name":"东阿县"},{"code":"371525","name":"冠县"},{"code":"371526","name":"高唐县"},{"code":"371581","name":"临清市"}]},{"code":"3716","name":"滨州市","childs":[{"code":"371602","name":"滨城区"},{"code":"371603","name":"沾化区"},{"code":"371621","name":"惠民县"},{"code":"371622","name":"阳信县"},{"code":"371623","name":"无棣县"},{"code":"371625","name":"博兴县"},{"code":"371626","name":"邹平县"}]},{"code":"3717","name":"菏泽市","childs":[{"code":"371702","name":"牡丹区"},{"code":"371703","name":"定陶区"},{"code":"371721","name":"曹县"},{"code":"371722","name":"单县"},{"code":"371723","name":"成武县"},{"code":"371724","name":"巨野县"},{"code":"371725","name":"郓城县"},{"code":"371726","name":"鄄城县"},{"code":"371728","name":"东明县"}]}]},{"code":"41","name":"河南省","childs":[{"code":"4101","name":"郑州市","childs":[{"code":"410102","name":"中原区"},{"code":"410103","name":"二七区"},{"code":"410104","name":"管城回族区"},{"code":"410105","name":"金水区"},{"code":"410106","name":"上街区"},{"code":"410108","name":"惠济区"},{"code":"410122","name":"中牟县"},{"code":"410181","name":"巩义市"},{"code":"410182","name":"荥阳市"},{"code":"410183","name":"新密市"},{"code":"410184","name":"新郑市"},{"code":"410185","name":"登封市"}]},{"code":"4102","name":"开封市","childs":[{"code":"410202","name":"龙亭区"},{"code":"410203","name":"顺河回族区"},{"code":"410204","name":"鼓楼区"},{"code":"410205","name":"禹王台区"},{"code":"410211","name":"金明区"},{"code":"410212","name":"祥符区"},{"code":"410221","name":"杞县"},{"code":"410222","name":"通许县"},{"code":"410223","name":"尉氏县"},{"code":"410225","name":"兰考县"}]},{"code":"4103","name":"洛阳市","childs":[{"code":"410302","name":"老城区"},{"code":"410303","name":"西工区"},{"code":"410304","name":"瀍河回族区"},{"code":"410305","name":"涧西区"},{"code":"410306","name":"吉利区"},{"code":"410311","name":"洛龙区"},{"code":"410322","name":"孟津县"},{"code":"410323","name":"新安县"},{"code":"410324","name":"栾川县"},{"code":"410325","name":"嵩县"},{"code":"410326","name":"汝阳县"},{"code":"410327","name":"宜阳县"},{"code":"410328","name":"洛宁县"},{"code":"410329","name":"伊川县"},{"code":"410381","name":"偃师市"}]},{"code":"4104","name":"平顶山市","childs":[{"code":"410402","name":"新华区"},{"code":"410403","name":"卫东区"},{"code":"410404","name":"石龙区"},{"code":"410411","name":"湛河区"},{"code":"410421","name":"宝丰县"},{"code":"410422","name":"叶县"},{"code":"410423","name":"鲁山县"},{"code":"410425","name":"郏县"},{"code":"410481","name":"舞钢市"},{"code":"410482","name":"汝州市"}]},{"code":"4105","name":"安阳市","childs":[{"code":"410502","name":"文峰区"},{"code":"410503","name":"北关区"},{"code":"410505","name":"殷都区"},{"code":"410506","name":"龙安区"},{"code":"410522","name":"安阳县"},{"code":"410523","name":"汤阴县"},{"code":"410526","name":"滑县"},{"code":"410527","name":"内黄县"},{"code":"410581","name":"林州市"}]},{"code":"4106","name":"鹤壁市","childs":[{"code":"410602","name":"鹤山区"},{"code":"410603","name":"山城区"},{"code":"410611","name":"淇滨区"},{"code":"410621","name":"浚县"},{"code":"410622","name":"淇县"}]},{"code":"4107","name":"新乡市","childs":[{"code":"410702","name":"红旗区"},{"code":"410703","name":"卫滨区"},{"code":"410704","name":"凤泉区"},{"code":"410711","name":"牧野区"},{"code":"410721","name":"新乡县"},{"code":"410724","name":"获嘉县"},{"code":"410725","name":"原阳县"},{"code":"410726","name":"延津县"},{"code":"410727","name":"封丘县"},{"code":"410728","name":"长垣县"},{"code":"410781","name":"卫辉市"},{"code":"410782","name":"辉县市"}]},{"code":"4108","name":"焦作市","childs":[{"code":"410802","name":"解放区"},{"code":"410803","name":"中站区"},{"code":"410804","name":"马村区"},{"code":"410811","name":"山阳区"},{"code":"410821","name":"修武县"},{"code":"410822","name":"博爱县"},{"code":"410823","name":"武陟县"},{"code":"410825","name":"温县"},{"code":"410882","name":"沁阳市"},{"code":"410883","name":"孟州市"}]},{"code":"4109","name":"濮阳市","childs":[{"code":"410902","name":"华龙区"},{"code":"410922","name":"清丰县"},{"code":"410923","name":"南乐县"},{"code":"410926","name":"范县"},{"code":"410927","name":"台前县"},{"code":"410928","name":"濮阳县"}]},{"code":"4110","name":"许昌市","childs":[{"code":"411002","name":"魏都区"},{"code":"411023","name":"许昌县"},{"code":"411024","name":"鄢陵县"},{"code":"411025","name":"襄城县"},{"code":"411081","name":"禹州市"},{"code":"411082","name":"长葛市"}]},{"code":"4111","name":"漯河市","childs":[{"code":"411102","name":"源汇区"},{"code":"411103","name":"郾城区"},{"code":"411104","name":"召陵区"},{"code":"411121","name":"舞阳县"},{"code":"411122","name":"临颍县"}]},{"code":"4112","name":"三门峡市","childs":[{"code":"411202","name":"湖滨区"},{"code":"411203","name":"陕州区"},{"code":"411221","name":"渑池县"},{"code":"411224","name":"卢氏县"},{"code":"411281","name":"义马市"},{"code":"411282","name":"灵宝市"}]},{"code":"4113","name":"南阳市","childs":[{"code":"411302","name":"宛城区"},{"code":"411303","name":"卧龙区"},{"code":"411321","name":"南召县"},{"code":"411322","name":"方城县"},{"code":"411323","name":"西峡县"},{"code":"411324","name":"镇平县"},{"code":"411325","name":"内乡县"},{"code":"411326","name":"淅川县"},{"code":"411327","name":"社旗县"},{"code":"411328","name":"唐河县"},{"code":"411329","name":"新野县"},{"code":"411330","name":"桐柏县"},{"code":"411381","name":"邓州市"}]},{"code":"4114","name":"商丘市","childs":[{"code":"411402","name":"梁园区"},{"code":"411403","name":"睢阳区"},{"code":"411421","name":"民权县"},{"code":"411422","name":"睢县"},{"code":"411423","name":"宁陵县"},{"code":"411424","name":"柘城县"},{"code":"411425","name":"虞城县"},{"code":"411426","name":"夏邑县"},{"code":"411481","name":"永城市"}]},{"code":"4115","name":"信阳市","childs":[{"code":"411502","name":"浉河区"},{"code":"411503","name":"平桥区"},{"code":"411521","name":"罗山县"},{"code":"411522","name":"光山县"},{"code":"411523","name":"新县"},{"code":"411524","name":"商城县"},{"code":"411525","name":"固始县"},{"code":"411526","name":"潢川县"},{"code":"411527","name":"淮滨县"},{"code":"411528","name":"息县"}]},{"code":"4116","name":"周口市","childs":[{"code":"411602","name":"川汇区"},{"code":"411621","name":"扶沟县"},{"code":"411622","name":"西华县"},{"code":"411623","name":"商水县"},{"code":"411624","name":"沈丘县"},{"code":"411625","name":"郸城县"},{"code":"411626","name":"淮阳县"},{"code":"411627","name":"太康县"},{"code":"411628","name":"鹿邑县"},{"code":"411681","name":"项城市"}]},{"code":"4117","name":"驻马店市","childs":[{"code":"411702","name":"驿城区"},{"code":"411721","name":"西平县"},{"code":"411722","name":"上蔡县"},{"code":"411723","name":"平舆县"},{"code":"411724","name":"正阳县"},{"code":"411725","name":"确山县"},{"code":"411726","name":"泌阳县"},{"code":"411727","name":"汝南县"},{"code":"411728","name":"遂平县"},{"code":"411729","name":"新蔡县"}]},{"code":"4190","name":"省直辖县级行政区划","childs":[{"code":"419001","name":"济源市"}]}]},{"code":"42","name":"湖北省","childs":[{"code":"4201","name":"武汉市","childs":[{"code":"420102","name":"江岸区"},{"code":"420103","name":"江汉区"},{"code":"420104","name":"硚口区"},{"code":"420105","name":"汉阳区"},{"code":"420106","name":"武昌区"},{"code":"420107","name":"青山区"},{"code":"420111","name":"洪山区"},{"code":"420112","name":"东西湖区"},{"code":"420113","name":"汉南区"},{"code":"420114","name":"蔡甸区"},{"code":"420115","name":"江夏区"},{"code":"420116","name":"黄陂区"},{"code":"420117","name":"新洲区"}]},{"code":"4202","name":"黄石市","childs":[{"code":"420202","name":"黄石港区"},{"code":"420203","name":"西塞山区"},{"code":"420204","name":"下陆区"},{"code":"420205","name":"铁山区"},{"code":"420222","name":"阳新县"},{"code":"420281","name":"大冶市"}]},{"code":"4203","name":"十堰市","childs":[{"code":"420302","name":"茅箭区"},{"code":"420303","name":"张湾区"},{"code":"420304","name":"郧阳区"},{"code":"420322","name":"郧西县"},{"code":"420323","name":"竹山县"},{"code":"420324","name":"竹溪县"},{"code":"420325","name":"房县"},{"code":"420381","name":"丹江口市"}]},{"code":"4205","name":"宜昌市","childs":[{"code":"420502","name":"西陵区"},{"code":"420503","name":"伍家岗区"},{"code":"420504","name":"点军区"},{"code":"420505","name":"猇亭区"},{"code":"420506","name":"夷陵区"},{"code":"420525","name":"远安县"},{"code":"420526","name":"兴山县"},{"code":"420527","name":"秭归县"},{"code":"420528","name":"长阳土家族自治县"},{"code":"420529","name":"五峰土家族自治县"},{"code":"420581","name":"宜都市"},{"code":"420582","name":"当阳市"},{"code":"420583","name":"枝江市"}]},{"code":"4206","name":"襄阳市","childs":[{"code":"420602","name":"襄城区"},{"code":"420606","name":"樊城区"},{"code":"420607","name":"襄州区"},{"code":"420624","name":"南漳县"},{"code":"420625","name":"谷城县"},{"code":"420626","name":"保康县"},{"code":"420682","name":"老河口市"},{"code":"420683","name":"枣阳市"},{"code":"420684","name":"宜城市"}]},{"code":"4207","name":"鄂州市","childs":[{"code":"420702","name":"梁子湖区"},{"code":"420703","name":"华容区"},{"code":"420704","name":"鄂城区"}]},{"code":"4208","name":"荆门市","childs":[{"code":"420802","name":"东宝区"},{"code":"420804","name":"掇刀区"},{"code":"420821","name":"京山县"},{"code":"420822","name":"沙洋县"},{"code":"420881","name":"钟祥市"}]},{"code":"4209","name":"孝感市","childs":[{"code":"420902","name":"孝南区"},{"code":"420921","name":"孝昌县"},{"code":"420922","name":"大悟县"},{"code":"420923","name":"云梦县"},{"code":"420981","name":"应城市"},{"code":"420982","name":"安陆市"},{"code":"420984","name":"汉川市"}]},{"code":"4210","name":"荆州市","childs":[{"code":"421002","name":"沙市区"},{"code":"421003","name":"荆州区"},{"code":"421022","name":"公安县"},{"code":"421023","name":"监利县"},{"code":"421024","name":"江陵县"},{"code":"421081","name":"石首市"},{"code":"421083","name":"洪湖市"},{"code":"421087","name":"松滋市"}]},{"code":"4211","name":"黄冈市","childs":[{"code":"421102","name":"黄州区"},{"code":"421121","name":"团风县"},{"code":"421122","name":"红安县"},{"code":"421123","name":"罗田县"},{"code":"421124","name":"英山县"},{"code":"421125","name":"浠水县"},{"code":"421126","name":"蕲春县"},{"code":"421127","name":"黄梅县"},{"code":"421181","name":"麻城市"},{"code":"421182","name":"武穴市"}]},{"code":"4212","name":"咸宁市","childs":[{"code":"421202","name":"咸安区"},{"code":"421221","name":"嘉鱼县"},{"code":"421222","name":"通城县"},{"code":"421223","name":"崇阳县"},{"code":"421224","name":"通山县"},{"code":"421281","name":"赤壁市"}]},{"code":"4213","name":"随州市","childs":[{"code":"421303","name":"曾都区"},{"code":"421321","name":"随县"},{"code":"421381","name":"广水市"}]},{"code":"4228","name":"恩施土家族苗族自治州","childs":[{"code":"422801","name":"恩施市"},{"code":"422802","name":"利川市"},{"code":"422822","name":"建始县"},{"code":"422823","name":"巴东县"},{"code":"422825","name":"宣恩县"},{"code":"422826","name":"咸丰县"},{"code":"422827","name":"来凤县"},{"code":"422828","name":"鹤峰县"}]},{"code":"4290","name":"省直辖县级行政区划","childs":[{"code":"429004","name":"仙桃市"},{"code":"429005","name":"潜江市"},{"code":"429006","name":"天门市"},{"code":"429021","name":"神农架林区"}]}]},{"code":"43","name":"湖南省","childs":[{"code":"4301","name":"长沙市","childs":[{"code":"430102","name":"芙蓉区"},{"code":"430103","name":"天心区"},{"code":"430104","name":"岳麓区"},{"code":"430105","name":"开福区"},{"code":"430111","name":"雨花区"},{"code":"430112","name":"望城区"},{"code":"430121","name":"长沙县"},{"code":"430124","name":"宁乡县"},{"code":"430181","name":"浏阳市"}]},{"code":"4302","name":"株洲市","childs":[{"code":"430202","name":"荷塘区"},{"code":"430203","name":"芦淞区"},{"code":"430204","name":"石峰区"},{"code":"430211","name":"天元区"},{"code":"430221","name":"株洲县"},{"code":"430223","name":"攸县"},{"code":"430224","name":"茶陵县"},{"code":"430225","name":"炎陵县"},{"code":"430281","name":"醴陵市"}]},{"code":"4303","name":"湘潭市","childs":[{"code":"430302","name":"雨湖区"},{"code":"430304","name":"岳塘区"},{"code":"430321","name":"湘潭县"},{"code":"430381","name":"湘乡市"},{"code":"430382","name":"韶山市"}]},{"code":"4304","name":"衡阳市","childs":[{"code":"430405","name":"珠晖区"},{"code":"430406","name":"雁峰区"},{"code":"430407","name":"石鼓区"},{"code":"430408","name":"蒸湘区"},{"code":"430412","name":"南岳区"},{"code":"430421","name":"衡阳县"},{"code":"430422","name":"衡南县"},{"code":"430423","name":"衡山县"},{"code":"430424","name":"衡东县"},{"code":"430426","name":"祁东县"},{"code":"430481","name":"耒阳市"},{"code":"430482","name":"常宁市"}]},{"code":"4305","name":"邵阳市","childs":[{"code":"430502","name":"双清区"},{"code":"430503","name":"大祥区"},{"code":"430511","name":"北塔区"},{"code":"430521","name":"邵东县"},{"code":"430522","name":"新邵县"},{"code":"430523","name":"邵阳县"},{"code":"430524","name":"隆回县"},{"code":"430525","name":"洞口县"},{"code":"430527","name":"绥宁县"},{"code":"430528","name":"新宁县"},{"code":"430529","name":"城步苗族自治县"},{"code":"430581","name":"武冈市"}]},{"code":"4306","name":"岳阳市","childs":[{"code":"430602","name":"岳阳楼区"},{"code":"430603","name":"云溪区"},{"code":"430611","name":"君山区"},{"code":"430621","name":"岳阳县"},{"code":"430623","name":"华容县"},{"code":"430624","name":"湘阴县"},{"code":"430626","name":"平江县"},{"code":"430681","name":"汨罗市"},{"code":"430682","name":"临湘市"}]},{"code":"4307","name":"常德市","childs":[{"code":"430702","name":"武陵区"},{"code":"430703","name":"鼎城区"},{"code":"430721","name":"安乡县"},{"code":"430722","name":"汉寿县"},{"code":"430723","name":"澧县"},{"code":"430724","name":"临澧县"},{"code":"430725","name":"桃源县"},{"code":"430726","name":"石门县"},{"code":"430781","name":"津市市"}]},{"code":"4308","name":"张家界市","childs":[{"code":"430802","name":"永定区"},{"code":"430811","name":"武陵源区"},{"code":"430821","name":"慈利县"},{"code":"430822","name":"桑植县"}]},{"code":"4309","name":"益阳市","childs":[{"code":"430902","name":"资阳区"},{"code":"430903","name":"赫山区"},{"code":"430921","name":"南县"},{"code":"430922","name":"桃江县"},{"code":"430923","name":"安化县"},{"code":"430981","name":"沅江市"}]},{"code":"4310","name":"郴州市","childs":[{"code":"431002","name":"北湖区"},{"code":"431003","name":"苏仙区"},{"code":"431021","name":"桂阳县"},{"code":"431022","name":"宜章县"},{"code":"431023","name":"永兴县"},{"code":"431024","name":"嘉禾县"},{"code":"431025","name":"临武县"},{"code":"431026","name":"汝城县"},{"code":"431027","name":"桂东县"},{"code":"431028","name":"安仁县"},{"code":"431081","name":"资兴市"}]},{"code":"4311","name":"永州市","childs":[{"code":"431102","name":"零陵区"},{"code":"431103","name":"冷水滩区"},{"code":"431121","name":"祁阳县"},{"code":"431122","name":"东安县"},{"code":"431123","name":"双牌县"},{"code":"431124","name":"道县"},{"code":"431125","name":"江永县"},{"code":"431126","name":"宁远县"},{"code":"431127","name":"蓝山县"},{"code":"431128","name":"新田县"},{"code":"431129","name":"江华瑶族自治县"}]},{"code":"4312","name":"怀化市","childs":[{"code":"431202","name":"鹤城区"},{"code":"431221","name":"中方县"},{"code":"431222","name":"沅陵县"},{"code":"431223","name":"辰溪县"},{"code":"431224","name":"溆浦县"},{"code":"431225","name":"会同县"},{"code":"431226","name":"麻阳苗族自治县"},{"code":"431227","name":"新晃侗族自治县"},{"code":"431228","name":"芷江侗族自治县"},{"code":"431229","name":"靖州苗族侗族自治县"},{"code":"431230","name":"通道侗族自治县"},{"code":"431281","name":"洪江市"}]},{"code":"4313","name":"娄底市","childs":[{"code":"431302","name":"娄星区"},{"code":"431321","name":"双峰县"},{"code":"431322","name":"新化县"},{"code":"431381","name":"冷水江市"},{"code":"431382","name":"涟源市"}]},{"code":"4331","name":"湘西土家族苗族自治州","childs":[{"code":"433101","name":"吉首市"},{"code":"433122","name":"泸溪县"},{"code":"433123","name":"凤凰县"},{"code":"433124","name":"花垣县"},{"code":"433125","name":"保靖县"},{"code":"433126","name":"古丈县"},{"code":"433127","name":"永顺县"},{"code":"433130","name":"龙山县"}]}]},{"code":"44","name":"广东省","childs":[{"code":"4401","name":"广州市","childs":[{"code":"440103","name":"荔湾区"},{"code":"440104","name":"越秀区"},{"code":"440105","name":"海珠区"},{"code":"440106","name":"天河区"},{"code":"440111","name":"白云区"},{"code":"440112","name":"黄埔区"},{"code":"440113","name":"番禺区"},{"code":"440114","name":"花都区"},{"code":"440115","name":"南沙区"},{"code":"440117","name":"从化区"},{"code":"440118","name":"增城区"}]},{"code":"4402","name":"韶关市","childs":[{"code":"440203","name":"武江区"},{"code":"440204","name":"浈江区"},{"code":"440205","name":"曲江区"},{"code":"440222","name":"始兴县"},{"code":"440224","name":"仁化县"},{"code":"440229","name":"翁源县"},{"code":"440232","name":"乳源瑶族自治县"},{"code":"440233","name":"新丰县"},{"code":"440281","name":"乐昌市"},{"code":"440282","name":"南雄市"}]},{"code":"4403","name":"深圳市","childs":[{"code":"440303","name":"罗湖区"},{"code":"440304","name":"福田区"},{"code":"440305","name":"南山区"},{"code":"440306","name":"宝安区"},{"code":"440307","name":"龙岗区"},{"code":"440308","name":"盐田区"}]},{"code":"4404","name":"珠海市","childs":[{"code":"440402","name":"香洲区"},{"code":"440403","name":"斗门区"},{"code":"440404","name":"金湾区"}]},{"code":"4405","name":"汕头市","childs":[{"code":"440507","name":"龙湖区"},{"code":"440511","name":"金平区"},{"code":"440512","name":"濠江区"},{"code":"440513","name":"潮阳区"},{"code":"440514","name":"潮南区"},{"code":"440515","name":"澄海区"},{"code":"440523","name":"南澳县"}]},{"code":"4406","name":"佛山市","childs":[{"code":"440604","name":"禅城区"},{"code":"440605","name":"南海区"},{"code":"440606","name":"顺德区"},{"code":"440607","name":"三水区"},{"code":"440608","name":"高明区"}]},{"code":"4407","name":"江门市","childs":[{"code":"440703","name":"蓬江区"},{"code":"440704","name":"江海区"},{"code":"440705","name":"新会区"},{"code":"440781","name":"台山市"},{"code":"440783","name":"开平市"},{"code":"440784","name":"鹤山市"},{"code":"440785","name":"恩平市"}]},{"code":"4408","name":"湛江市","childs":[{"code":"440802","name":"赤坎区"},{"code":"440803","name":"霞山区"},{"code":"440804","name":"坡头区"},{"code":"440811","name":"麻章区"},{"code":"440823","name":"遂溪县"},{"code":"440825","name":"徐闻县"},{"code":"440881","name":"廉江市"},{"code":"440882","name":"雷州市"},{"code":"440883","name":"吴川市"}]},{"code":"4409","name":"茂名市","childs":[{"code":"440902","name":"茂南区"},{"code":"440904","name":"电白区"},{"code":"440981","name":"高州市"},{"code":"440982","name":"化州市"},{"code":"440983","name":"信宜市"}]},{"code":"4412","name":"肇庆市","childs":[{"code":"441202","name":"端州区"},{"code":"441203","name":"鼎湖区"},{"code":"441204","name":"高要区"},{"code":"441223","name":"广宁县"},{"code":"441224","name":"怀集县"},{"code":"441225","name":"封开县"},{"code":"441226","name":"德庆县"},{"code":"441284","name":"四会市"}]},{"code":"4413","name":"惠州市","childs":[{"code":"441302","name":"惠城区"},{"code":"441303","name":"惠阳区"},{"code":"441322","name":"博罗县"},{"code":"441323","name":"惠东县"},{"code":"441324","name":"龙门县"}]},{"code":"4414","name":"梅州市","childs":[{"code":"441402","name":"梅江区"},{"code":"441403","name":"梅县区"},{"code":"441422","name":"大埔县"},{"code":"441423","name":"丰顺县"},{"code":"441424","name":"五华县"},{"code":"441426","name":"平远县"},{"code":"441427","name":"蕉岭县"},{"code":"441481","name":"兴宁市"}]},{"code":"4415","name":"汕尾市","childs":[{"code":"441502","name":"城区"},{"code":"441521","name":"海丰县"},{"code":"441523","name":"陆河县"},{"code":"441581","name":"陆丰市"}]},{"code":"4416","name":"河源市","childs":[{"code":"441602","name":"源城区"},{"code":"441621","name":"紫金县"},{"code":"441622","name":"龙川县"},{"code":"441623","name":"连平县"},{"code":"441624","name":"和平县"},{"code":"441625","name":"东源县"}]},{"code":"4417","name":"阳江市","childs":[{"code":"441702","name":"江城区"},{"code":"441704","name":"阳东区"},{"code":"441721","name":"阳西县"},{"code":"441781","name":"阳春市"}]},{"code":"4418","name":"清远市","childs":[{"code":"441802","name":"清城区"},{"code":"441803","name":"清新区"},{"code":"441821","name":"佛冈县"},{"code":"441823","name":"阳山县"},{"code":"441825","name":"连山壮族瑶族自治县"},{"code":"441826","name":"连南瑶族自治县"},{"code":"441881","name":"英德市"},{"code":"441882","name":"连州市"}]},{"code":"441900","name":"东莞市","childs":[{"code":"441900003","name":"东城街道办事处"},{"code":"441900004","name":"南城街道办事处"},{"code":"441900005","name":"万江街道办事处"},{"code":"441900006","name":"莞城街道办事处"},{"code":"441900101","name":"石碣镇"},{"code":"441900102","name":"石龙镇"},{"code":"441900103","name":"茶山镇"},{"code":"441900104","name":"石排镇"},{"code":"441900105","name":"企石镇"},{"code":"441900106","name":"横沥镇"},{"code":"441900107","name":"桥头镇"},{"code":"441900108","name":"谢岗镇"},{"code":"441900109","name":"东坑镇"},{"code":"441900110","name":"常平镇"},{"code":"441900111","name":"寮步镇"},{"code":"441900112","name":"樟木头镇"},{"code":"441900113","name":"大朗镇"},{"code":"441900114","name":"黄江镇"},{"code":"441900115","name":"清溪镇"},{"code":"441900116","name":"塘厦镇"},{"code":"441900117","name":"凤岗镇"},{"code":"441900118","name":"大岭山镇"},{"code":"441900119","name":"长安镇"},{"code":"441900121","name":"虎门镇"},{"code":"441900122","name":"厚街镇"},{"code":"441900123","name":"沙田镇"},{"code":"441900124","name":"道滘镇"},{"code":"441900125","name":"洪梅镇"},{"code":"441900126","name":"麻涌镇"},{"code":"441900127","name":"望牛墩镇"},{"code":"441900128","name":"中堂镇"},{"code":"441900129","name":"高埗镇"},{"code":"441900401","name":"松山湖管委会"},{"code":"441900402","name":"虎门港管委会"},{"code":"441900403","name":"东莞生态园"}]},{"code":"442000","name":"中山市","childs":[{"code":"442000001","name":"石岐区街道办事处"},{"code":"442000002","name":"东区街道办事处"},{"code":"442000003","name":"火炬开发区街道办事处"},{"code":"442000004","name":"西区街道办事处"},{"code":"442000005","name":"南区街道办事处"},{"code":"442000006","name":"五桂山街道办事处"},{"code":"442000100","name":"小榄镇"},{"code":"442000101","name":"黄圃镇"},{"code":"442000102","name":"民众镇"},{"code":"442000103","name":"东凤镇"},{"code":"442000104","name":"东升镇"},{"code":"442000105","name":"古镇镇"},{"code":"442000106","name":"沙溪镇"},{"code":"442000107","name":"坦洲镇"},{"code":"442000108","name":"港口镇"},{"code":"442000109","name":"三角镇"},{"code":"442000110","name":"横栏镇"},{"code":"442000111","name":"南头镇"},{"code":"442000112","name":"阜沙镇"},{"code":"442000113","name":"南朗镇"},{"code":"442000114","name":"三乡镇"},{"code":"442000115","name":"板芙镇"},{"code":"442000116","name":"大涌镇"},{"code":"442000117","name":"神湾镇"}]},{"code":"4451","name":"潮州市","childs":[{"code":"445102","name":"湘桥区"},{"code":"445103","name":"潮安区"},{"code":"445122","name":"饶平县"}]},{"code":"4452","name":"揭阳市","childs":[{"code":"445202","name":"榕城区"},{"code":"445203","name":"揭东区"},{"code":"445222","name":"揭西县"},{"code":"445224","name":"惠来县"},{"code":"445281","name":"普宁市"}]},{"code":"4453","name":"云浮市","childs":[{"code":"445302","name":"云城区"},{"code":"445303","name":"云安区"},{"code":"445321","name":"新兴县"},{"code":"445322","name":"郁南县"},{"code":"445381","name":"罗定市"}]}]},{"code":"45","name":"广西壮族自治区","childs":[{"code":"4501","name":"南宁市","childs":[{"code":"450102","name":"兴宁区"},{"code":"450103","name":"青秀区"},{"code":"450105","name":"江南区"},{"code":"450107","name":"西乡塘区"},{"code":"450108","name":"良庆区"},{"code":"450109","name":"邕宁区"},{"code":"450110","name":"武鸣区"},{"code":"450123","name":"隆安县"},{"code":"450124","name":"马山县"},{"code":"450125","name":"上林县"},{"code":"450126","name":"宾阳县"},{"code":"450127","name":"横县"}]},{"code":"4502","name":"柳州市","childs":[{"code":"450202","name":"城中区"},{"code":"450203","name":"鱼峰区"},{"code":"450204","name":"柳南区"},{"code":"450205","name":"柳北区"},{"code":"450206","name":"柳江区"},{"code":"450222","name":"柳城县"},{"code":"450223","name":"鹿寨县"},{"code":"450224","name":"融安县"},{"code":"450225","name":"融水苗族自治县"},{"code":"450226","name":"三江侗族自治县"}]},{"code":"4503","name":"桂林市","childs":[{"code":"450302","name":"秀峰区"},{"code":"450303","name":"叠彩区"},{"code":"450304","name":"象山区"},{"code":"450305","name":"七星区"},{"code":"450311","name":"雁山区"},{"code":"450312","name":"临桂区"},{"code":"450321","name":"阳朔县"},{"code":"450323","name":"灵川县"},{"code":"450324","name":"全州县"},{"code":"450325","name":"兴安县"},{"code":"450326","name":"永福县"},{"code":"450327","name":"灌阳县"},{"code":"450328","name":"龙胜各族自治县"},{"code":"450329","name":"资源县"},{"code":"450330","name":"平乐县"},{"code":"450331","name":"荔浦县"},{"code":"450332","name":"恭城瑶族自治县"}]},{"code":"4504","name":"梧州市","childs":[{"code":"450403","name":"万秀区"},{"code":"450405","name":"长洲区"},{"code":"450406","name":"龙圩区"},{"code":"450421","name":"苍梧县"},{"code":"450422","name":"藤县"},{"code":"450423","name":"蒙山县"},{"code":"450481","name":"岑溪市"}]},{"code":"4505","name":"北海市","childs":[{"code":"450502","name":"海城区"},{"code":"450503","name":"银海区"},{"code":"450512","name":"铁山港区"},{"code":"450521","name":"合浦县"}]},{"code":"4506","name":"防城港市","childs":[{"code":"450602","name":"港口区"},{"code":"450603","name":"防城区"},{"code":"450621","name":"上思县"},{"code":"450681","name":"东兴市"}]},{"code":"4507","name":"钦州市","childs":[{"code":"450702","name":"钦南区"},{"code":"450703","name":"钦北区"},{"code":"450721","name":"灵山县"},{"code":"450722","name":"浦北县"}]},{"code":"4508","name":"贵港市","childs":[{"code":"450802","name":"港北区"},{"code":"450803","name":"港南区"},{"code":"450804","name":"覃塘区"},{"code":"450821","name":"平南县"},{"code":"450881","name":"桂平市"}]},{"code":"4509","name":"玉林市","childs":[{"code":"450902","name":"玉州区"},{"code":"450903","name":"福绵区"},{"code":"450921","name":"容县"},{"code":"450922","name":"陆川县"},{"code":"450923","name":"博白县"},{"code":"450924","name":"兴业县"},{"code":"450981","name":"北流市"}]},{"code":"4510","name":"百色市","childs":[{"code":"451002","name":"右江区"},{"code":"451021","name":"田阳县"},{"code":"451022","name":"田东县"},{"code":"451023","name":"平果县"},{"code":"451024","name":"德保县"},{"code":"451026","name":"那坡县"},{"code":"451027","name":"凌云县"},{"code":"451028","name":"乐业县"},{"code":"451029","name":"田林县"},{"code":"451030","name":"西林县"},{"code":"451031","name":"隆林各族自治县"},{"code":"451081","name":"靖西市"}]},{"code":"4511","name":"贺州市","childs":[{"code":"451102","name":"八步区"},{"code":"451103","name":"平桂区"},{"code":"451121","name":"昭平县"},{"code":"451122","name":"钟山县"},{"code":"451123","name":"富川瑶族自治县"}]},{"code":"4512","name":"河池市","childs":[{"code":"451202","name":"金城江区"},{"code":"451221","name":"南丹县"},{"code":"451222","name":"天峨县"},{"code":"451223","name":"凤山县"},{"code":"451224","name":"东兰县"},{"code":"451225","name":"罗城仫佬族自治县"},{"code":"451226","name":"环江毛南族自治县"},{"code":"451227","name":"巴马瑶族自治县"},{"code":"451228","name":"都安瑶族自治县"},{"code":"451229","name":"大化瑶族自治县"},{"code":"451281","name":"宜州市"}]},{"code":"4513","name":"来宾市","childs":[{"code":"451302","name":"兴宾区"},{"code":"451321","name":"忻城县"},{"code":"451322","name":"象州县"},{"code":"451323","name":"武宣县"},{"code":"451324","name":"金秀瑶族自治县"},{"code":"451381","name":"合山市"}]},{"code":"4514","name":"崇左市","childs":[{"code":"451402","name":"江州区"},{"code":"451421","name":"扶绥县"},{"code":"451422","name":"宁明县"},{"code":"451423","name":"龙州县"},{"code":"451424","name":"大新县"},{"code":"451425","name":"天等县"},{"code":"451481","name":"凭祥市"}]}]},{"code":"46","name":"海南省","childs":[{"code":"4601","name":"海口市","childs":[{"code":"460105","name":"秀英区"},{"code":"460106","name":"龙华区"},{"code":"460107","name":"琼山区"},{"code":"460108","name":"美兰区"}]},{"code":"4602","name":"三亚市","childs":[{"code":"460202","name":"海棠区"},{"code":"460203","name":"吉阳区"},{"code":"460204","name":"天涯区"},{"code":"460205","name":"崖州区"}]},{"code":"4603","name":"三沙市","childs":[{"code":"460321","name":"西沙群岛"},{"code":"460322","name":"南沙群岛"},{"code":"460323","name":"中沙群岛的岛礁及其海域"}]},{"code":"460400","name":"儋州市","childs":[{"code":"460400100","name":"那大镇"},{"code":"460400101","name":"和庆镇"},{"code":"460400102","name":"南丰镇"},{"code":"460400103","name":"大成镇"},{"code":"460400104","name":"雅星镇"},{"code":"460400105","name":"兰洋镇"},{"code":"460400106","name":"光村镇"},{"code":"460400107","name":"木棠镇"},{"code":"460400108","name":"海头镇"},{"code":"460400109","name":"峨蔓镇"},{"code":"460400110","name":"三都镇"},{"code":"460400111","name":"王五镇"},{"code":"460400112","name":"白马井镇"},{"code":"460400113","name":"中和镇"},{"code":"460400114","name":"排浦镇"},{"code":"460400115","name":"东成镇"},{"code":"460400116","name":"新州镇"},{"code":"460400400","name":"国营西培农场"},{"code":"460400404","name":"国营西联农场"},{"code":"460400405","name":"国营蓝洋农场"},{"code":"460400407","name":"国营八一农场"},{"code":"460400499","name":"洋浦经济开发区"},{"code":"460400500","name":"华南热作学院"}]},{"code":"4690","name":"省直辖县级行政区划","childs":[{"code":"469001","name":"五指山市"},{"code":"469002","name":"琼海市"},{"code":"469005","name":"文昌市"},{"code":"469006","name":"万宁市"},{"code":"469007","name":"东方市"},{"code":"469021","name":"定安县"},{"code":"469022","name":"屯昌县"},{"code":"469023","name":"澄迈县"},{"code":"469024","name":"临高县"},{"code":"469025","name":"白沙黎族自治县"},{"code":"469026","name":"昌江黎族自治县"},{"code":"469027","name":"乐东黎族自治县"},{"code":"469028","name":"陵水黎族自治县"},{"code":"469029","name":"保亭黎族苗族自治县"},{"code":"469030","name":"琼中黎族苗族自治县"}]}]},{"code":"50","name":"重庆市","childs":[{"code":"5001","name":"市辖区","childs":[{"code":"500101","name":"万州区"},{"code":"500102","name":"涪陵区"},{"code":"500103","name":"渝中区"},{"code":"500104","name":"大渡口区"},{"code":"500105","name":"江北区"},{"code":"500106","name":"沙坪坝区"},{"code":"500107","name":"九龙坡区"},{"code":"500108","name":"南岸区"},{"code":"500109","name":"北碚区"},{"code":"500110","name":"綦江区"},{"code":"500111","name":"大足区"},{"code":"500112","name":"渝北区"},{"code":"500113","name":"巴南区"},{"code":"500114","name":"黔江区"},{"code":"500115","name":"长寿区"},{"code":"500116","name":"江津区"},{"code":"500117","name":"合川区"},{"code":"500118","name":"永川区"},{"code":"500119","name":"南川区"},{"code":"500120","name":"璧山区"},{"code":"500151","name":"铜梁区"},{"code":"500152","name":"潼南区"},{"code":"500153","name":"荣昌区"},{"code":"500154","name":"开州区"}]},{"code":"5002","name":"县","childs":[{"code":"500228","name":"梁平县"},{"code":"500229","name":"城口县"},{"code":"500230","name":"丰都县"},{"code":"500231","name":"垫江县"},{"code":"500232","name":"武隆县"},{"code":"500233","name":"忠县"},{"code":"500235","name":"云阳县"},{"code":"500236","name":"奉节县"},{"code":"500237","name":"巫山县"},{"code":"500238","name":"巫溪县"},{"code":"500240","name":"石柱土家族自治县"},{"code":"500241","name":"秀山土家族苗族自治县"},{"code":"500242","name":"酉阳土家族苗族自治县"},{"code":"500243","name":"彭水苗族土家族自治县"}]}]},{"code":"51","name":"四川省","childs":[{"code":"5101","name":"成都市","childs":[{"code":"510104","name":"锦江区"},{"code":"510105","name":"青羊区"},{"code":"510106","name":"金牛区"},{"code":"510107","name":"武侯区"},{"code":"510108","name":"成华区"},{"code":"510112","name":"龙泉驿区"},{"code":"510113","name":"青白江区"},{"code":"510114","name":"新都区"},{"code":"510115","name":"温江区"},{"code":"510116","name":"双流区"},{"code":"510121","name":"金堂县"},{"code":"510124","name":"郫县"},{"code":"510129","name":"大邑县"},{"code":"510131","name":"蒲江县"},{"code":"510132","name":"新津县"},{"code":"510181","name":"都江堰市"},{"code":"510182","name":"彭州市"},{"code":"510183","name":"邛崃市"},{"code":"510184","name":"崇州市"},{"code":"510185","name":"简阳市"}]},{"code":"5103","name":"自贡市","childs":[{"code":"510302","name":"自流井区"},{"code":"510303","name":"贡井区"},{"code":"510304","name":"大安区"},{"code":"510311","name":"沿滩区"},{"code":"510321","name":"荣县"},{"code":"510322","name":"富顺县"}]},{"code":"5104","name":"攀枝花市","childs":[{"code":"510402","name":"东区"},{"code":"510403","name":"西区"},{"code":"510411","name":"仁和区"},{"code":"510421","name":"米易县"},{"code":"510422","name":"盐边县"}]},{"code":"5105","name":"泸州市","childs":[{"code":"510502","name":"江阳区"},{"code":"510503","name":"纳溪区"},{"code":"510504","name":"龙马潭区"},{"code":"510521","name":"泸县"},{"code":"510522","name":"合江县"},{"code":"510524","name":"叙永县"},{"code":"510525","name":"古蔺县"}]},{"code":"5106","name":"德阳市","childs":[{"code":"510603","name":"旌阳区"},{"code":"510623","name":"中江县"},{"code":"510626","name":"罗江县"},{"code":"510681","name":"广汉市"},{"code":"510682","name":"什邡市"},{"code":"510683","name":"绵竹市"}]},{"code":"5107","name":"绵阳市","childs":[{"code":"510703","name":"涪城区"},{"code":"510704","name":"游仙区"},{"code":"510705","name":"安州区"},{"code":"510722","name":"三台县"},{"code":"510723","name":"盐亭县"},{"code":"510725","name":"梓潼县"},{"code":"510726","name":"北川羌族自治县"},{"code":"510727","name":"平武县"},{"code":"510781","name":"江油市"}]},{"code":"5108","name":"广元市","childs":[{"code":"510802","name":"利州区"},{"code":"510811","name":"昭化区"},{"code":"510812","name":"朝天区"},{"code":"510821","name":"旺苍县"},{"code":"510822","name":"青川县"},{"code":"510823","name":"剑阁县"},{"code":"510824","name":"苍溪县"}]},{"code":"5109","name":"遂宁市","childs":[{"code":"510903","name":"船山区"},{"code":"510904","name":"安居区"},{"code":"510921","name":"蓬溪县"},{"code":"510922","name":"射洪县"},{"code":"510923","name":"大英县"}]},{"code":"5110","name":"内江市","childs":[{"code":"511002","name":"市中区"},{"code":"511011","name":"东兴区"},{"code":"511024","name":"威远县"},{"code":"511025","name":"资中县"},{"code":"511028","name":"隆昌县"}]},{"code":"5111","name":"乐山市","childs":[{"code":"511102","name":"市中区"},{"code":"511111","name":"沙湾区"},{"code":"511112","name":"五通桥区"},{"code":"511113","name":"金口河区"},{"code":"511123","name":"犍为县"},{"code":"511124","name":"井研县"},{"code":"511126","name":"夹江县"},{"code":"511129","name":"沐川县"},{"code":"511132","name":"峨边彝族自治县"},{"code":"511133","name":"马边彝族自治县"},{"code":"511181","name":"峨眉山市"}]},{"code":"5113","name":"南充市","childs":[{"code":"511302","name":"顺庆区"},{"code":"511303","name":"高坪区"},{"code":"511304","name":"嘉陵区"},{"code":"511321","name":"南部县"},{"code":"511322","name":"营山县"},{"code":"511323","name":"蓬安县"},{"code":"511324","name":"仪陇县"},{"code":"511325","name":"西充县"},{"code":"511381","name":"阆中市"}]},{"code":"5114","name":"眉山市","childs":[{"code":"511402","name":"东坡区"},{"code":"511403","name":"彭山区"},{"code":"511421","name":"仁寿县"},{"code":"511423","name":"洪雅县"},{"code":"511424","name":"丹棱县"},{"code":"511425","name":"青神县"}]},{"code":"5115","name":"宜宾市","childs":[{"code":"511502","name":"翠屏区"},{"code":"511503","name":"南溪区"},{"code":"511521","name":"宜宾县"},{"code":"511523","name":"江安县"},{"code":"511524","name":"长宁县"},{"code":"511525","name":"高县"},{"code":"511526","name":"珙县"},{"code":"511527","name":"筠连县"},{"code":"511528","name":"兴文县"},{"code":"511529","name":"屏山县"}]},{"code":"5116","name":"广安市","childs":[{"code":"511602","name":"广安区"},{"code":"511603","name":"前锋区"},{"code":"511621","name":"岳池县"},{"code":"511622","name":"武胜县"},{"code":"511623","name":"邻水县"},{"code":"511681","name":"华蓥市"}]},{"code":"5117","name":"达州市","childs":[{"code":"511702","name":"通川区"},{"code":"511703","name":"达川区"},{"code":"511722","name":"宣汉县"},{"code":"511723","name":"开江县"},{"code":"511724","name":"大竹县"},{"code":"511725","name":"渠县"},{"code":"511781","name":"万源市"}]},{"code":"5118","name":"雅安市","childs":[{"code":"511802","name":"雨城区"},{"code":"511803","name":"名山区"},{"code":"511822","name":"荥经县"},{"code":"511823","name":"汉源县"},{"code":"511824","name":"石棉县"},{"code":"511825","name":"天全县"},{"code":"511826","name":"芦山县"},{"code":"511827","name":"宝兴县"}]},{"code":"5119","name":"巴中市","childs":[{"code":"511902","name":"巴州区"},{"code":"511903","name":"恩阳区"},{"code":"511921","name":"通江县"},{"code":"511922","name":"南江县"},{"code":"511923","name":"平昌县"}]},{"code":"5120","name":"资阳市","childs":[{"code":"512002","name":"雁江区"},{"code":"512021","name":"安岳县"},{"code":"512022","name":"乐至县"}]},{"code":"5132","name":"阿坝藏族羌族自治州","childs":[{"code":"513201","name":"马尔康市"},{"code":"513221","name":"汶川县"},{"code":"513222","name":"理县"},{"code":"513223","name":"茂县"},{"code":"513224","name":"松潘县"},{"code":"513225","name":"九寨沟县"},{"code":"513226","name":"金川县"},{"code":"513227","name":"小金县"},{"code":"513228","name":"黑水县"},{"code":"513230","name":"壤塘县"},{"code":"513231","name":"阿坝县"},{"code":"513232","name":"若尔盖县"},{"code":"513233","name":"红原县"}]},{"code":"5133","name":"甘孜藏族自治州","childs":[{"code":"513301","name":"康定市"},{"code":"513322","name":"泸定县"},{"code":"513323","name":"丹巴县"},{"code":"513324","name":"九龙县"},{"code":"513325","name":"雅江县"},{"code":"513326","name":"道孚县"},{"code":"513327","name":"炉霍县"},{"code":"513328","name":"甘孜县"},{"code":"513329","name":"新龙县"},{"code":"513330","name":"德格县"},{"code":"513331","name":"白玉县"},{"code":"513332","name":"石渠县"},{"code":"513333","name":"色达县"},{"code":"513334","name":"理塘县"},{"code":"513335","name":"巴塘县"},{"code":"513336","name":"乡城县"},{"code":"513337","name":"稻城县"},{"code":"513338","name":"得荣县"}]},{"code":"5134","name":"凉山彝族自治州","childs":[{"code":"513401","name":"西昌市"},{"code":"513422","name":"木里藏族自治县"},{"code":"513423","name":"盐源县"},{"code":"513424","name":"德昌县"},{"code":"513425","name":"会理县"},{"code":"513426","name":"会东县"},{"code":"513427","name":"宁南县"},{"code":"513428","name":"普格县"},{"code":"513429","name":"布拖县"},{"code":"513430","name":"金阳县"},{"code":"513431","name":"昭觉县"},{"code":"513432","name":"喜德县"},{"code":"513433","name":"冕宁县"},{"code":"513434","name":"越西县"},{"code":"513435","name":"甘洛县"},{"code":"513436","name":"美姑县"},{"code":"513437","name":"雷波县"}]}]},{"code":"52","name":"贵州省","childs":[{"code":"5201","name":"贵阳市","childs":[{"code":"520102","name":"南明区"},{"code":"520103","name":"云岩区"},{"code":"520111","name":"花溪区"},{"code":"520112","name":"乌当区"},{"code":"520113","name":"白云区"},{"code":"520115","name":"观山湖区"},{"code":"520121","name":"开阳县"},{"code":"520122","name":"息烽县"},{"code":"520123","name":"修文县"},{"code":"520181","name":"清镇市"}]},{"code":"5202","name":"六盘水市","childs":[{"code":"520201","name":"钟山区"},{"code":"520203","name":"六枝特区"},{"code":"520221","name":"水城县"},{"code":"520222","name":"盘县"}]},{"code":"5203","name":"遵义市","childs":[{"code":"520302","name":"红花岗区"},{"code":"520303","name":"汇川区"},{"code":"520304","name":"播州区"},{"code":"520322","name":"桐梓县"},{"code":"520323","name":"绥阳县"},{"code":"520324","name":"正安县"},{"code":"520325","name":"道真仡佬族苗族自治县"},{"code":"520326","name":"务川仡佬族苗族自治县"},{"code":"520327","name":"凤冈县"},{"code":"520328","name":"湄潭县"},{"code":"520329","name":"余庆县"},{"code":"520330","name":"习水县"},{"code":"520381","name":"赤水市"},{"code":"520382","name":"仁怀市"}]},{"code":"5204","name":"安顺市","childs":[{"code":"520402","name":"西秀区"},{"code":"520403","name":"平坝区"},{"code":"520422","name":"普定县"},{"code":"520423","name":"镇宁布依族苗族自治县"},{"code":"520424","name":"关岭布依族苗族自治县"},{"code":"520425","name":"紫云苗族布依族自治县"}]},{"code":"5205","name":"毕节市","childs":[{"code":"520502","name":"七星关区"},{"code":"520521","name":"大方县"},{"code":"520522","name":"黔西县"},{"code":"520523","name":"金沙县"},{"code":"520524","name":"织金县"},{"code":"520525","name":"纳雍县"},{"code":"520526","name":"威宁彝族回族苗族自治县"},{"code":"520527","name":"赫章县"}]},{"code":"5206","name":"铜仁市","childs":[{"code":"520602","name":"碧江区"},{"code":"520603","name":"万山区"},{"code":"520621","name":"江口县"},{"code":"520622","name":"玉屏侗族自治县"},{"code":"520623","name":"石阡县"},{"code":"520624","name":"思南县"},{"code":"520625","name":"印江土家族苗族自治县"},{"code":"520626","name":"德江县"},{"code":"520627","name":"沿河土家族自治县"},{"code":"520628","name":"松桃苗族自治县"}]},{"code":"5223","name":"黔西南布依族苗族自治州","childs":[{"code":"522301","name":"兴义市"},{"code":"522322","name":"兴仁县"},{"code":"522323","name":"普安县"},{"code":"522324","name":"晴隆县"},{"code":"522325","name":"贞丰县"},{"code":"522326","name":"望谟县"},{"code":"522327","name":"册亨县"},{"code":"522328","name":"安龙县"}]},{"code":"5226","name":"黔东南苗族侗族自治州","childs":[{"code":"522601","name":"凯里市"},{"code":"522622","name":"黄平县"},{"code":"522623","name":"施秉县"},{"code":"522624","name":"三穗县"},{"code":"522625","name":"镇远县"},{"code":"522626","name":"岑巩县"},{"code":"522627","name":"天柱县"},{"code":"522628","name":"锦屏县"},{"code":"522629","name":"剑河县"},{"code":"522630","name":"台江县"},{"code":"522631","name":"黎平县"},{"code":"522632","name":"榕江县"},{"code":"522633","name":"从江县"},{"code":"522634","name":"雷山县"},{"code":"522635","name":"麻江县"},{"code":"522636","name":"丹寨县"}]},{"code":"5227","name":"黔南布依族苗族自治州","childs":[{"code":"522701","name":"都匀市"},{"code":"522702","name":"福泉市"},{"code":"522722","name":"荔波县"},{"code":"522723","name":"贵定县"},{"code":"522725","name":"瓮安县"},{"code":"522726","name":"独山县"},{"code":"522727","name":"平塘县"},{"code":"522728","name":"罗甸县"},{"code":"522729","name":"长顺县"},{"code":"522730","name":"龙里县"},{"code":"522731","name":"惠水县"},{"code":"522732","name":"三都水族自治县"}]}]},{"code":"53","name":"云南省","childs":[{"code":"5301","name":"昆明市","childs":[{"code":"530102","name":"五华区"},{"code":"530103","name":"盘龙区"},{"code":"530111","name":"官渡区"},{"code":"530112","name":"西山区"},{"code":"530113","name":"东川区"},{"code":"530114","name":"呈贡区"},{"code":"530122","name":"晋宁县"},{"code":"530124","name":"富民县"},{"code":"530125","name":"宜良县"},{"code":"530126","name":"石林彝族自治县"},{"code":"530127","name":"嵩明县"},{"code":"530128","name":"禄劝彝族苗族自治县"},{"code":"530129","name":"寻甸回族彝族自治县"},{"code":"530181","name":"安宁市"}]},{"code":"5303","name":"曲靖市","childs":[{"code":"530302","name":"麒麟区"},{"code":"530303","name":"沾益区"},{"code":"530321","name":"马龙县"},{"code":"530322","name":"陆良县"},{"code":"530323","name":"师宗县"},{"code":"530324","name":"罗平县"},{"code":"530325","name":"富源县"},{"code":"530326","name":"会泽县"},{"code":"530381","name":"宣威市"}]},{"code":"5304","name":"玉溪市","childs":[{"code":"530402","name":"红塔区"},{"code":"530403","name":"江川区"},{"code":"530422","name":"澄江县"},{"code":"530423","name":"通海县"},{"code":"530424","name":"华宁县"},{"code":"530425","name":"易门县"},{"code":"530426","name":"峨山彝族自治县"},{"code":"530427","name":"新平彝族傣族自治县"},{"code":"530428","name":"元江哈尼族彝族傣族自治县"}]},{"code":"5305","name":"保山市","childs":[{"code":"530502","name":"隆阳区"},{"code":"530521","name":"施甸县"},{"code":"530523","name":"龙陵县"},{"code":"530524","name":"昌宁县"},{"code":"530581","name":"腾冲市"}]},{"code":"5306","name":"昭通市","childs":[{"code":"530602","name":"昭阳区"},{"code":"530621","name":"鲁甸县"},{"code":"530622","name":"巧家县"},{"code":"530623","name":"盐津县"},{"code":"530624","name":"大关县"},{"code":"530625","name":"永善县"},{"code":"530626","name":"绥江县"},{"code":"530627","name":"镇雄县"},{"code":"530628","name":"彝良县"},{"code":"530629","name":"威信县"},{"code":"530630","name":"水富县"}]},{"code":"5307","name":"丽江市","childs":[{"code":"530702","name":"古城区"},{"code":"530721","name":"玉龙纳西族自治县"},{"code":"530722","name":"永胜县"},{"code":"530723","name":"华坪县"},{"code":"530724","name":"宁蒗彝族自治县"}]},{"code":"5308","name":"普洱市","childs":[{"code":"530802","name":"思茅区"},{"code":"530821","name":"宁洱哈尼族彝族自治县"},{"code":"530822","name":"墨江哈尼族自治县"},{"code":"530823","name":"景东彝族自治县"},{"code":"530824","name":"景谷傣族彝族自治县"},{"code":"530825","name":"镇沅彝族哈尼族拉祜族自治县"},{"code":"530826","name":"江城哈尼族彝族自治县"},{"code":"530827","name":"孟连傣族拉祜族佤族自治县"},{"code":"530828","name":"澜沧拉祜族自治县"},{"code":"530829","name":"西盟佤族自治县"}]},{"code":"5309","name":"临沧市","childs":[{"code":"530902","name":"临翔区"},{"code":"530921","name":"凤庆县"},{"code":"530922","name":"云县"},{"code":"530923","name":"永德县"},{"code":"530924","name":"镇康县"},{"code":"530925","name":"双江拉祜族佤族布朗族傣族自治县"},{"code":"530926","name":"耿马傣族佤族自治县"},{"code":"530927","name":"沧源佤族自治县"}]},{"code":"5323","name":"楚雄彝族自治州","childs":[{"code":"532301","name":"楚雄市"},{"code":"532322","name":"双柏县"},{"code":"532323","name":"牟定县"},{"code":"532324","name":"南华县"},{"code":"532325","name":"姚安县"},{"code":"532326","name":"大姚县"},{"code":"532327","name":"永仁县"},{"code":"532328","name":"元谋县"},{"code":"532329","name":"武定县"},{"code":"532331","name":"禄丰县"}]},{"code":"5325","name":"红河哈尼族彝族自治州","childs":[{"code":"532501","name":"个旧市"},{"code":"532502","name":"开远市"},{"code":"532503","name":"蒙自市"},{"code":"532504","name":"弥勒市"},{"code":"532523","name":"屏边苗族自治县"},{"code":"532524","name":"建水县"},{"code":"532525","name":"石屏县"},{"code":"532527","name":"泸西县"},{"code":"532528","name":"元阳县"},{"code":"532529","name":"红河县"},{"code":"532530","name":"金平苗族瑶族傣族自治县"},{"code":"532531","name":"绿春县"},{"code":"532532","name":"河口瑶族自治县"}]},{"code":"5326","name":"文山壮族苗族自治州","childs":[{"code":"532601","name":"文山市"},{"code":"532622","name":"砚山县"},{"code":"532623","name":"西畴县"},{"code":"532624","name":"麻栗坡县"},{"code":"532625","name":"马关县"},{"code":"532626","name":"丘北县"},{"code":"532627","name":"广南县"},{"code":"532628","name":"富宁县"}]},{"code":"5328","name":"西双版纳傣族自治州","childs":[{"code":"532801","name":"景洪市"},{"code":"532822","name":"勐海县"},{"code":"532823","name":"勐腊县"}]},{"code":"5329","name":"大理白族自治州","childs":[{"code":"532901","name":"大理市"},{"code":"532922","name":"漾濞彝族自治县"},{"code":"532923","name":"祥云县"},{"code":"532924","name":"宾川县"},{"code":"532925","name":"弥渡县"},{"code":"532926","name":"南涧彝族自治县"},{"code":"532927","name":"巍山彝族回族自治县"},{"code":"532928","name":"永平县"},{"code":"532929","name":"云龙县"},{"code":"532930","name":"洱源县"},{"code":"532931","name":"剑川县"},{"code":"532932","name":"鹤庆县"}]},{"code":"5331","name":"德宏傣族景颇族自治州","childs":[{"code":"533102","name":"瑞丽市"},{"code":"533103","name":"芒市"},{"code":"533122","name":"梁河县"},{"code":"533123","name":"盈江县"},{"code":"533124","name":"陇川县"}]},{"code":"5333","name":"怒江傈僳族自治州","childs":[{"code":"533301","name":"泸水市"},{"code":"533323","name":"福贡县"},{"code":"533324","name":"贡山独龙族怒族自治县"},{"code":"533325","name":"兰坪白族普米族自治县"}]},{"code":"5334","name":"迪庆藏族自治州","childs":[{"code":"533401","name":"香格里拉市"},{"code":"533422","name":"德钦县"},{"code":"533423","name":"维西傈僳族自治县"}]}]},{"code":"54","name":"西藏自治区","childs":[{"code":"5401","name":"拉萨市","childs":[{"code":"540102","name":"城关区"},{"code":"540103","name":"堆龙德庆区"},{"code":"540121","name":"林周县"},{"code":"540122","name":"当雄县"},{"code":"540123","name":"尼木县"},{"code":"540124","name":"曲水县"},{"code":"540126","name":"达孜县"},{"code":"540127","name":"墨竹工卡县"}]},{"code":"5402","name":"日喀则市","childs":[{"code":"540202","name":"桑珠孜区"},{"code":"540221","name":"南木林县"},{"code":"540222","name":"江孜县"},{"code":"540223","name":"定日县"},{"code":"540224","name":"萨迦县"},{"code":"540225","name":"拉孜县"},{"code":"540226","name":"昂仁县"},{"code":"540227","name":"谢通门县"},{"code":"540228","name":"白朗县"},{"code":"540229","name":"仁布县"},{"code":"540230","name":"康马县"},{"code":"540231","name":"定结县"},{"code":"540232","name":"仲巴县"},{"code":"540233","name":"亚东县"},{"code":"540234","name":"吉隆县"},{"code":"540235","name":"聂拉木县"},{"code":"540236","name":"萨嘎县"},{"code":"540237","name":"岗巴县"}]},{"code":"5403","name":"昌都市","childs":[{"code":"540302","name":"卡若区"},{"code":"540321","name":"江达县"},{"code":"540322","name":"贡觉县"},{"code":"540323","name":"类乌齐县"},{"code":"540324","name":"丁青县"},{"code":"540325","name":"察雅县"},{"code":"540326","name":"八宿县"},{"code":"540327","name":"左贡县"},{"code":"540328","name":"芒康县"},{"code":"540329","name":"洛隆县"},{"code":"540330","name":"边坝县"}]},{"code":"5404","name":"林芝市","childs":[{"code":"540402","name":"巴宜区"},{"code":"540421","name":"工布江达县"},{"code":"540422","name":"米林县"},{"code":"540423","name":"墨脱县"},{"code":"540424","name":"波密县"},{"code":"540425","name":"察隅县"},{"code":"540426","name":"朗县"}]},{"code":"5405","name":"山南市","childs":[{"code":"540502","name":"乃东区"},{"code":"540521","name":"扎囊县"},{"code":"540522","name":"贡嘎县"},{"code":"540523","name":"桑日县"},{"code":"540524","name":"琼结县"},{"code":"540525","name":"曲松县"},{"code":"540526","name":"措美县"},{"code":"540527","name":"洛扎县"},{"code":"540528","name":"加查县"},{"code":"540529","name":"隆子县"},{"code":"540530","name":"错那县"},{"code":"540531","name":"浪卡子县"}]},{"code":"5424","name":"那曲地区","childs":[{"code":"542421","name":"那曲县"},{"code":"542422","name":"嘉黎县"},{"code":"542423","name":"比如县"},{"code":"542424","name":"聂荣县"},{"code":"542425","name":"安多县"},{"code":"542426","name":"申扎县"},{"code":"542427","name":"索县"},{"code":"542428","name":"班戈县"},{"code":"542429","name":"巴青县"},{"code":"542430","name":"尼玛县"},{"code":"542431","name":"双湖县"}]},{"code":"5425","name":"阿里地区","childs":[{"code":"542521","name":"普兰县"},{"code":"542522","name":"札达县"},{"code":"542523","name":"噶尔县"},{"code":"542524","name":"日土县"},{"code":"542525","name":"革吉县"},{"code":"542526","name":"改则县"},{"code":"542527","name":"措勤县"}]}]},{"code":"61","name":"陕西省","childs":[{"code":"6101","name":"西安市","childs":[{"code":"610102","name":"新城区"},{"code":"610103","name":"碑林区"},{"code":"610104","name":"莲湖区"},{"code":"610111","name":"灞桥区"},{"code":"610112","name":"未央区"},{"code":"610113","name":"雁塔区"},{"code":"610114","name":"阎良区"},{"code":"610115","name":"临潼区"},{"code":"610116","name":"长安区"},{"code":"610117","name":"高陵区"},{"code":"610122","name":"蓝田县"},{"code":"610124","name":"周至县"},{"code":"610125","name":"户县"}]},{"code":"6102","name":"铜川市","childs":[{"code":"610202","name":"王益区"},{"code":"610203","name":"印台区"},{"code":"610204","name":"耀州区"},{"code":"610222","name":"宜君县"}]},{"code":"6103","name":"宝鸡市","childs":[{"code":"610302","name":"渭滨区"},{"code":"610303","name":"金台区"},{"code":"610304","name":"陈仓区"},{"code":"610322","name":"凤翔县"},{"code":"610323","name":"岐山县"},{"code":"610324","name":"扶风县"},{"code":"610326","name":"眉县"},{"code":"610327","name":"陇县"},{"code":"610328","name":"千阳县"},{"code":"610329","name":"麟游县"},{"code":"610330","name":"凤县"},{"code":"610331","name":"太白县"}]},{"code":"6104","name":"咸阳市","childs":[{"code":"610402","name":"秦都区"},{"code":"610403","name":"杨陵区"},{"code":"610404","name":"渭城区"},{"code":"610422","name":"三原县"},{"code":"610423","name":"泾阳县"},{"code":"610424","name":"乾县"},{"code":"610425","name":"礼泉县"},{"code":"610426","name":"永寿县"},{"code":"610427","name":"彬县"},{"code":"610428","name":"长武县"},{"code":"610429","name":"旬邑县"},{"code":"610430","name":"淳化县"},{"code":"610431","name":"武功县"},{"code":"610481","name":"兴平市"}]},{"code":"6105","name":"渭南市","childs":[{"code":"610502","name":"临渭区"},{"code":"610503","name":"华州区"},{"code":"610522","name":"潼关县"},{"code":"610523","name":"大荔县"},{"code":"610524","name":"合阳县"},{"code":"610525","name":"澄城县"},{"code":"610526","name":"蒲城县"},{"code":"610527","name":"白水县"},{"code":"610528","name":"富平县"},{"code":"610581","name":"韩城市"},{"code":"610582","name":"华阴市"}]},{"code":"6106","name":"延安市","childs":[{"code":"610602","name":"宝塔区"},{"code":"610603","name":"安塞区"},{"code":"610621","name":"延长县"},{"code":"610622","name":"延川县"},{"code":"610623","name":"子长县"},{"code":"610625","name":"志丹县"},{"code":"610626","name":"吴起县"},{"code":"610627","name":"甘泉县"},{"code":"610628","name":"富县"},{"code":"610629","name":"洛川县"},{"code":"610630","name":"宜川县"},{"code":"610631","name":"黄龙县"},{"code":"610632","name":"黄陵县"}]},{"code":"6107","name":"汉中市","childs":[{"code":"610702","name":"汉台区"},{"code":"610721","name":"南郑县"},{"code":"610722","name":"城固县"},{"code":"610723","name":"洋县"},{"code":"610724","name":"西乡县"},{"code":"610725","name":"勉县"},{"code":"610726","name":"宁强县"},{"code":"610727","name":"略阳县"},{"code":"610728","name":"镇巴县"},{"code":"610729","name":"留坝县"},{"code":"610730","name":"佛坪县"}]},{"code":"6108","name":"榆林市","childs":[{"code":"610802","name":"榆阳区"},{"code":"610803","name":"横山区"},{"code":"610821","name":"神木县"},{"code":"610822","name":"府谷县"},{"code":"610824","name":"靖边县"},{"code":"610825","name":"定边县"},{"code":"610826","name":"绥德县"},{"code":"610827","name":"米脂县"},{"code":"610828","name":"佳县"},{"code":"610829","name":"吴堡县"},{"code":"610830","name":"清涧县"},{"code":"610831","name":"子洲县"}]},{"code":"6109","name":"安康市","childs":[{"code":"610902","name":"汉滨区"},{"code":"610921","name":"汉阴县"},{"code":"610922","name":"石泉县"},{"code":"610923","name":"宁陕县"},{"code":"610924","name":"紫阳县"},{"code":"610925","name":"岚皋县"},{"code":"610926","name":"平利县"},{"code":"610927","name":"镇坪县"},{"code":"610928","name":"旬阳县"},{"code":"610929","name":"白河县"}]},{"code":"6110","name":"商洛市","childs":[{"code":"611002","name":"商州区"},{"code":"611021","name":"洛南县"},{"code":"611022","name":"丹凤县"},{"code":"611023","name":"商南县"},{"code":"611024","name":"山阳县"},{"code":"611025","name":"镇安县"},{"code":"611026","name":"柞水县"}]}]},{"code":"62","name":"甘肃省","childs":[{"code":"6201","name":"兰州市","childs":[{"code":"620102","name":"城关区"},{"code":"620103","name":"七里河区"},{"code":"620104","name":"西固区"},{"code":"620105","name":"安宁区"},{"code":"620111","name":"红古区"},{"code":"620121","name":"永登县"},{"code":"620122","name":"皋兰县"},{"code":"620123","name":"榆中县"}]},{"code":"620201","name":"嘉峪关市","childs":[{"code":"620201100","name":"新城镇"},{"code":"620201101","name":"峪泉镇"},{"code":"620201102","name":"文殊镇"},{"code":"620201401","name":"雄关区"},{"code":"620201402","name":"镜铁区"},{"code":"620201403","name":"长城区"}]},{"code":"6203","name":"金昌市","childs":[{"code":"620302","name":"金川区"},{"code":"620321","name":"永昌县"}]},{"code":"6204","name":"白银市","childs":[{"code":"620402","name":"白银区"},{"code":"620403","name":"平川区"},{"code":"620421","name":"靖远县"},{"code":"620422","name":"会宁县"},{"code":"620423","name":"景泰县"}]},{"code":"6205","name":"天水市","childs":[{"code":"620502","name":"秦州区"},{"code":"620503","name":"麦积区"},{"code":"620521","name":"清水县"},{"code":"620522","name":"秦安县"},{"code":"620523","name":"甘谷县"},{"code":"620524","name":"武山县"},{"code":"620525","name":"张家川回族自治县"}]},{"code":"6206","name":"武威市","childs":[{"code":"620602","name":"凉州区"},{"code":"620621","name":"民勤县"},{"code":"620622","name":"古浪县"},{"code":"620623","name":"天祝藏族自治县"}]},{"code":"6207","name":"张掖市","childs":[{"code":"620702","name":"甘州区"},{"code":"620721","name":"肃南裕固族自治县"},{"code":"620722","name":"民乐县"},{"code":"620723","name":"临泽县"},{"code":"620724","name":"高台县"},{"code":"620725","name":"山丹县"}]},{"code":"6208","name":"平凉市","childs":[{"code":"620802","name":"崆峒区"},{"code":"620821","name":"泾川县"},{"code":"620822","name":"灵台县"},{"code":"620823","name":"崇信县"},{"code":"620824","name":"华亭县"},{"code":"620825","name":"庄浪县"},{"code":"620826","name":"静宁县"}]},{"code":"6209","name":"酒泉市","childs":[{"code":"620902","name":"肃州区"},{"code":"620921","name":"金塔县"},{"code":"620922","name":"瓜州县"},{"code":"620923","name":"肃北蒙古族自治县"},{"code":"620924","name":"阿克塞哈萨克族自治县"},{"code":"620981","name":"玉门市"},{"code":"620982","name":"敦煌市"}]},{"code":"6210","name":"庆阳市","childs":[{"code":"621002","name":"西峰区"},{"code":"621021","name":"庆城县"},{"code":"621022","name":"环县"},{"code":"621023","name":"华池县"},{"code":"621024","name":"合水县"},{"code":"621025","name":"正宁县"},{"code":"621026","name":"宁县"},{"code":"621027","name":"镇原县"}]},{"code":"6211","name":"定西市","childs":[{"code":"621102","name":"安定区"},{"code":"621121","name":"通渭县"},{"code":"621122","name":"陇西县"},{"code":"621123","name":"渭源县"},{"code":"621124","name":"临洮县"},{"code":"621125","name":"漳县"},{"code":"621126","name":"岷县"}]},{"code":"6212","name":"陇南市","childs":[{"code":"621202","name":"武都区"},{"code":"621221","name":"成县"},{"code":"621222","name":"文县"},{"code":"621223","name":"宕昌县"},{"code":"621224","name":"康县"},{"code":"621225","name":"西和县"},{"code":"621226","name":"礼县"},{"code":"621227","name":"徽县"},{"code":"621228","name":"两当县"}]},{"code":"6229","name":"临夏回族自治州","childs":[{"code":"622901","name":"临夏市"},{"code":"622921","name":"临夏县"},{"code":"622922","name":"康乐县"},{"code":"622923","name":"永靖县"},{"code":"622924","name":"广河县"},{"code":"622925","name":"和政县"},{"code":"622926","name":"东乡族自治县"},{"code":"622927","name":"积石山保安族东乡族撒拉族自治县"}]},{"code":"6230","name":"甘南藏族自治州","childs":[{"code":"623001","name":"合作市"},{"code":"623021","name":"临潭县"},{"code":"623022","name":"卓尼县"},{"code":"623023","name":"舟曲县"},{"code":"623024","name":"迭部县"},{"code":"623025","name":"玛曲县"},{"code":"623026","name":"碌曲县"},{"code":"623027","name":"夏河县"}]}]},{"code":"63","name":"青海省","childs":[{"code":"6301","name":"西宁市","childs":[{"code":"630102","name":"城东区"},{"code":"630103","name":"城中区"},{"code":"630104","name":"城西区"},{"code":"630105","name":"城北区"},{"code":"630121","name":"大通回族土族自治县"},{"code":"630122","name":"湟中县"},{"code":"630123","name":"湟源县"}]},{"code":"6302","name":"海东市","childs":[{"code":"630202","name":"乐都区"},{"code":"630203","name":"平安区"},{"code":"630222","name":"民和回族土族自治县"},{"code":"630223","name":"互助土族自治县"},{"code":"630224","name":"化隆回族自治县"},{"code":"630225","name":"循化撒拉族自治县"}]},{"code":"6322","name":"海北藏族自治州","childs":[{"code":"632221","name":"门源回族自治县"},{"code":"632222","name":"祁连县"},{"code":"632223","name":"海晏县"},{"code":"632224","name":"刚察县"}]},{"code":"6323","name":"黄南藏族自治州","childs":[{"code":"632321","name":"同仁县"},{"code":"632322","name":"尖扎县"},{"code":"632323","name":"泽库县"},{"code":"632324","name":"河南蒙古族自治县"}]},{"code":"6325","name":"海南藏族自治州","childs":[{"code":"632521","name":"共和县"},{"code":"632522","name":"同德县"},{"code":"632523","name":"贵德县"},{"code":"632524","name":"兴海县"},{"code":"632525","name":"贵南县"}]},{"code":"6326","name":"果洛藏族自治州","childs":[{"code":"632621","name":"玛沁县"},{"code":"632622","name":"班玛县"},{"code":"632623","name":"甘德县"},{"code":"632624","name":"达日县"},{"code":"632625","name":"久治县"},{"code":"632626","name":"玛多县"}]},{"code":"6327","name":"玉树藏族自治州","childs":[{"code":"632701","name":"玉树市"},{"code":"632722","name":"杂多县"},{"code":"632723","name":"称多县"},{"code":"632724","name":"治多县"},{"code":"632725","name":"囊谦县"},{"code":"632726","name":"曲麻莱县"}]},{"code":"6328","name":"海西蒙古族藏族自治州","childs":[{"code":"632801","name":"格尔木市"},{"code":"632802","name":"德令哈市"},{"code":"632821","name":"乌兰县"},{"code":"632822","name":"都兰县"},{"code":"632823","name":"天峻县"}]}]},{"code":"64","name":"宁夏回族自治区","childs":[{"code":"6401","name":"银川市","childs":[{"code":"640104","name":"兴庆区"},{"code":"640105","name":"西夏区"},{"code":"640106","name":"金凤区"},{"code":"640121","name":"永宁县"},{"code":"640122","name":"贺兰县"},{"code":"640181","name":"灵武市"}]},{"code":"6402","name":"石嘴山市","childs":[{"code":"640202","name":"大武口区"},{"code":"640205","name":"惠农区"},{"code":"640221","name":"平罗县"}]},{"code":"6403","name":"吴忠市","childs":[{"code":"640302","name":"利通区"},{"code":"640303","name":"红寺堡区"},{"code":"640323","name":"盐池县"},{"code":"640324","name":"同心县"},{"code":"640381","name":"青铜峡市"}]},{"code":"6404","name":"固原市","childs":[{"code":"640402","name":"原州区"},{"code":"640422","name":"西吉县"},{"code":"640423","name":"隆德县"},{"code":"640424","name":"泾源县"},{"code":"640425","name":"彭阳县"}]},{"code":"6405","name":"中卫市","childs":[{"code":"640502","name":"沙坡头区"},{"code":"640521","name":"中宁县"},{"code":"640522","name":"海原县"}]}]},{"code":"65","name":"新疆维吾尔自治区","childs":[{"code":"6501","name":"乌鲁木齐市","childs":[{"code":"650102","name":"天山区"},{"code":"650103","name":"沙依巴克区"},{"code":"650104","name":"新市区"},{"code":"650105","name":"水磨沟区"},{"code":"650106","name":"头屯河区"},{"code":"650107","name":"达坂城区"},{"code":"650109","name":"米东区"},{"code":"650121","name":"乌鲁木齐县"}]},{"code":"6502","name":"克拉玛依市","childs":[{"code":"650202","name":"独山子区"},{"code":"650203","name":"克拉玛依区"},{"code":"650204","name":"白碱滩区"},{"code":"650205","name":"乌尔禾区"}]},{"code":"6504","name":"吐鲁番市","childs":[{"code":"650402","name":"高昌区"},{"code":"650421","name":"鄯善县"},{"code":"650422","name":"托克逊县"}]},{"code":"6505","name":"哈密市","childs":[{"code":"650502","name":"伊州区"},{"code":"650521","name":"巴里坤哈萨克自治县"},{"code":"650522","name":"伊吾县"}]},{"code":"6523","name":"昌吉回族自治州","childs":[{"code":"652301","name":"昌吉市"},{"code":"652302","name":"阜康市"},{"code":"652323","name":"呼图壁县"},{"code":"652324","name":"玛纳斯县"},{"code":"652325","name":"奇台县"},{"code":"652327","name":"吉木萨尔县"},{"code":"652328","name":"木垒哈萨克自治县"}]},{"code":"6527","name":"博尔塔拉蒙古自治州","childs":[{"code":"652701","name":"博乐市"},{"code":"652702","name":"阿拉山口市"},{"code":"652722","name":"精河县"},{"code":"652723","name":"温泉县"}]},{"code":"6528","name":"巴音郭楞蒙古自治州","childs":[{"code":"652801","name":"库尔勒市"},{"code":"652822","name":"轮台县"},{"code":"652823","name":"尉犁县"},{"code":"652824","name":"若羌县"},{"code":"652825","name":"且末县"},{"code":"652826","name":"焉耆回族自治县"},{"code":"652827","name":"和静县"},{"code":"652828","name":"和硕县"},{"code":"652829","name":"博湖县"}]},{"code":"6529","name":"阿克苏地区","childs":[{"code":"652901","name":"阿克苏市"},{"code":"652922","name":"温宿县"},{"code":"652923","name":"库车县"},{"code":"652924","name":"沙雅县"},{"code":"652925","name":"新和县"},{"code":"652926","name":"拜城县"},{"code":"652927","name":"乌什县"},{"code":"652928","name":"阿瓦提县"},{"code":"652929","name":"柯坪县"}]},{"code":"6530","name":"克孜勒苏柯尔克孜自治州","childs":[{"code":"653001","name":"阿图什市"},{"code":"653022","name":"阿克陶县"},{"code":"653023","name":"阿合奇县"},{"code":"653024","name":"乌恰县"}]},{"code":"6531","name":"喀什地区","childs":[{"code":"653101","name":"喀什市"},{"code":"653121","name":"疏附县"},{"code":"653122","name":"疏勒县"},{"code":"653123","name":"英吉沙县"},{"code":"653124","name":"泽普县"},{"code":"653125","name":"莎车县"},{"code":"653126","name":"叶城县"},{"code":"653127","name":"麦盖提县"},{"code":"653128","name":"岳普湖县"},{"code":"653129","name":"伽师县"},{"code":"653130","name":"巴楚县"},{"code":"653131","name":"塔什库尔干塔吉克自治县"}]},{"code":"6532","name":"和田地区","childs":[{"code":"653201","name":"和田市"},{"code":"653221","name":"和田县"},{"code":"653222","name":"墨玉县"},{"code":"653223","name":"皮山县"},{"code":"653224","name":"洛浦县"},{"code":"653225","name":"策勒县"},{"code":"653226","name":"于田县"},{"code":"653227","name":"民丰县"}]},{"code":"6540","name":"伊犁哈萨克自治州","childs":[{"code":"654002","name":"伊宁市"},{"code":"654003","name":"奎屯市"},{"code":"654004","name":"霍尔果斯市"},{"code":"654021","name":"伊宁县"},{"code":"654022","name":"察布查尔锡伯自治县"},{"code":"654023","name":"霍城县"},{"code":"654024","name":"巩留县"},{"code":"654025","name":"新源县"},{"code":"654026","name":"昭苏县"},{"code":"654027","name":"特克斯县"},{"code":"654028","name":"尼勒克县"}]},{"code":"6542","name":"塔城地区","childs":[{"code":"654201","name":"塔城市"},{"code":"654202","name":"乌苏市"},{"code":"654221","name":"额敏县"},{"code":"654223","name":"沙湾县"},{"code":"654224","name":"托里县"},{"code":"654225","name":"裕民县"},{"code":"654226","name":"和布克赛尔蒙古自治县"}]},{"code":"6543","name":"阿勒泰地区","childs":[{"code":"654301","name":"阿勒泰市"},{"code":"654321","name":"布尔津县"},{"code":"654322","name":"富蕴县"},{"code":"654323","name":"福海县"},{"code":"654324","name":"哈巴河县"},{"code":"654325","name":"青河县"},{"code":"654326","name":"吉木乃县"}]},{"code":"6590","name":"自治区直辖县级行政区划","childs":[{"code":"659001","name":"石河子市"},{"code":"659002","name":"阿拉尔市"},{"code":"659003","name":"图木舒克市"},{"code":"659004","name":"五家渠市"},{"code":"659006","name":"铁门关市"}]}]},{"code":"71","name":"台湾省","childs":[]},{"code":"81","name":"香港特别行政区","childs":[]},{"code":"82","name":"澳门特别行政区","childs":[]}];

/***/ }),

/***/ 561:
/*!************************************************!*\
  !*** ./src/static/images/user/user-avatar.png ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAMAAABOo35HAAAAaVBMVEUAAABveoZxdYJwd4Fwd4Fwd4Jwd4Fwd4FweIJxeIFxd4Jwd4Fxd4Fxd4Jwd4Fwd4JxeIJweIJwd4Jwd4FweIFweIFweIJweIJwd4Fwd4Jwd4JveYNweIJwd4JweIFweIFxd4JxeIFxeILK8Hq3AAAAInRSTlMAChPqx5AhM0j5PW/v9a944pnQttynoGi9V9YbgGKFK1Fdud2rGQAAEdtJREFUeNrsnNmyojAQhjshYQmEVVBBRfP+Dzk1NTWVE1lUTEtw5rs/nNjp5U+nAZygE9dzfOJNxVi5yz2plPTyXclY1fBTfAsFhf+AH8a8aiP1ENmmPA59+Dfxw6wppXoRyZos7OBfQmRVot7AS+MA/gXE6aBsIKtMwDfj71OpLJKk5y8NyZC3CoGSf5uDkWMtFRpeExL4EugtjRQysr5+g71E/YKLtOyQ1k3BLxdeNHV6YK33vL2KjVdIGrePLcRSnt1E4BMYhfiBOGdFWj62G9tv170eOZV34LeXvCE480PywL162CJHNusEPKSwiC7kpZqh2lx1JPFurtqHFN6CXud0SHmEDUEvk8GyK47UVpGtJ7NYHm8leVEeTdX3sw9W6SePBF62BXNRLicshaMcyTGNNmquCVNF6RFx5eRWRRs0VzZqqhJf/tBstKDk7qZ6Mbbg5FPCWtRj7sXc1F1dPeZUZwIfg47qFe5gLI5FYCrgw4QHNcBzLRbFUCNK7sMK9M0wGplLFx20GZpqvUpEuRpwAVfYJwOpwCmsiD/cvJ0bJ0afqXua1TvjfaXuqR24qN0P07oT1VqUg0QvYF1IOhALAhzhuHMrc4ncZclM4sShsnhSJkkMbkGL+xWutZn0oEwqB1LoPUGrTDisQZArg+QGLkJOkTJgK2zpMXLfrf7QM2WQB/BhuCO54CkyZXIGXObTFVtdhT5KGeslrq5VBidwHVIrg5TAhwg8Mwds4tr8LFdJ86EySJ3N7CZ+aW6xDx/gbPYXXNOh05DCrEkC0DltMAT/cpXGPoeADDdD0MH+9hx+a1jrCqiYnpzB1ririqjqsL5z4w1yUT+5ARqpkSCdaVy9xhldzA9tlbt0Y/ISoXGq3QMKjdEQ3Yi6GiNIsPOWmdvZxsqgiW8cQULQYCTGw6ZtBeDnShMJsEz8Tba6s5YMAACrhKSwfbqd0iQ9ANLZuYZvwLCW14E1gujL/Oo3dKc0LbUW4MkX2kpby2p57zylqeB76HLrTkDaL7XVXU3ktg85B/guDHV6tCuwdpvXV3OlK+rffprSJJs9O09ztOgL1Pth+Y32ZOa52EvyTGmcvnReTmqr9XtyZhIMD1IqjbCQsPALof4yDWvzRKkkb1n1ma/PdD80d04W2zw3noKLyCo58WWQAHARSlNYaPfJHjA5plLNINMrYBIrTfh+qwFzsaJI1EM8julf9Y9/RGEBNPnIiM61VE/CQsCClG+e6KofywQNhqnWN5cvzdux5dJWdoCDKNWLMJRgNFvBCX0nCG+AQlerBRQUUEjfCMQavd2XSbWIZA8YUG9xORPYCqtjapycVXVxuRR1xfTy0QejzZ/skaVyVAACYTJmJy78e0nPczUkR1iTMU3VLPw7Dghc1ACW9TBKkJVqQAwLwPEQHzcISTWwVOzPrmdorwI0CIHYwtMw1EEAyhZ8l0gMXhRC2MVmwXDNFfVC1W+VQdXDUwQM9x0csyIm5OXYTZAWpPFeEHF7U2yUBGxzezlXZ5iTXqR9Y4i+M2OxAuv8+Ac+PAGVeu/AOkYsRfslryxhJone2IqXZEMAGoQJ3t2C5wsP4aWhxb+eRmPSDGXKi8ICuhJ1ao8ken2vtEel/jEY0zjcwgv/CBXo/IIy7RBVMtnZmRK+oN6jlM+38RrjNGmX2tZENcdMW+HTQe4jyobQ+Im2pHbkg2WYdq3VHIvkFk92FWIghk9mrS7Cc6yLzZ4+zRHHCsrntBbHcyxf70PSWS2sHsFzrR4mIRKvFKaWxVGMmOPLZ84Imd4tsIyvbGtdZnQIrHJ94oRIPLzXLmvrOrJXeKvVgpA/Fq8RhcXgSxL8BLt/bAmG13gvEDoZxEMr3SR59GjfiFSrEIkxYnKa1CL4j+Z416pH3ZYBe1CJtrs0evBoD++qsMIZBeB46qHRKWm+XrZgGYokSTrbDqsJ5pdc4Z109liVg+E1dUudZed2XyL2ZgKEXcCRWvu5DB4jXvYmWNFC8W56dAGPyIxH92CZHm2WXl9dSbBNMV2UOsSZyBjvfiHDS1rBtNfGSP0GM2X9ou7KtluFYaDMYjDgsDSFFLK0/P9H3qceY0To7YnGSeex7aHgZTSSZUkBvgj22ke2D/kujEgaHfCWhsUx7fleSu6EvHaCLKR4wr23vrcPS2B6g0beK0u5dgRIrYhNEGoX5sB0ABpwfEj19iwrhF7hq5bkUQBnQm8Hdz+Rxbdq4E4hzWQJYh/G2z72ROKonX6Xh0ITIl+2sQs4yOOKfDgZYAJzseV6ZtBE7tRFlAFokKUt7YZbU683/h8arA45z4cNkfDGhL0kzkjOouOG4oV6tXZDOPwRa0gx5yyErb1ivVGuGy0BYKAVRxvmTQ0YYcePdggAyDVuHjCx7CeGEMg3TpX+hihdklbG1xoC2db3/AnHc4OhJnAvCoWkxBLjSHPbd1hPTk4QNEAp1DpdAsFp9fwaPDl0ApY86ECqh4dLlc/vI2GQ4mYjwhZh4pw4oqtqXnD7/BNdT0GvglfwXkMZbvpTkCxxsB7hZvjqPDGMhRv3ZBAST1d9wSeHWpQYKlhsCffulRebs4RCjvqmFpdSxoVctDSGCcFgMYEHVblp50CciCTuCAOGA+ZApJzx7z55Qf44QOO9HJJVqFhiJwJmEbdWQfpJNohDmIFNAQLHBd/eQswO1avszxfPg9901t5YtAmEyMiHHq47l3cQFndkh+so9OJ3d6ZALVbrhbS6gjUwv77Rit/JmwgAHhVX1DqZBUUrfN/wEqrqc7HgqQM65sBZK44kamWiGYuHATKgJuV8LDgvCaT+xD435jTCWZJfS5tTQcJqCAu1CJnFwXqG5nLF5d9nVHWh/TydgA3hW6ma/m3Qmv6N+1e40N9+LZpaZl11BEfnNM8vDPprVDnyxspqQoH7O+9BB4vKx6tnqsMcuAmJE1dhB4vaR+tB6jFUI2vuqZ0YZ4Hx9lgzeFdmGC8NeeZi6MFS3byAqR9p9Z9QAHjec+geRFPjf/AvGLpooHVKf85cDD5YFHXzEiad6L9w85gd352ZB2QNE6V4qNPso9X0IzI3VEi/fz++QTZEaJYrJR9v+f7wXpzfHJDbeU5sxZx3PMrNwvl3LWBrZ4cnvm3FHGk4VBnf60P0dWO7b+jtnb/GDxcn+CbwYHlDxZG8X8t8OJ+HvEwPnikIPVx8sBp2QwGL4jgL4lgQElxnjQH7F0bvszD6iFDgCn5kF4WAKKtZHBVM8fDBSsLF4G/JzGD6bv4Fut5ssJwmLN6dI30I009bnQ3/9kERZW4A9mH6jEgNbnT3HUxEPCvQuWE28qZf2TeT1eyXHGMdfT+q56N+IyAcUYU5kf4ya6pJI7+xTrKrJ2rt+eKpXS8upGPbOL2w0KcwtGuFVCtuKYd+3OapS8T/uHa2Am6erPMavuCJIVPyv133VF4fuu+JNE13qAtF24jaGd6Gh9/vz70EUwCyePVVPxKM0lmm1W+bFjUg4poWCWwZ+LSysD5ZfZEYLqtHgz5gUYUtwkb/coNqTcibFtmcAHA8pYgs0pMeIMvKYbBwo3hepqV37BwPNVbJROLQ3Qw+R+wXQhQp4T/9ZlWcs8WbJZqCpJE4Ae851cIoTJAD0avHW+Is3yzDMiXq7n1md8kX5B/EmkThn+h8gnK7dYwy6/vy5BjJTrmTWZCSfLyRYaMJiiyGHVRf/JxoA4mVLiXQGBEY+og6Jkt93zlBmMM08NlxNAJsCb/JSj0glfXC1hUaU4Npe2j9uEYp70prszBPEwWBrljbQ8Dt+9zxPYDcK02BkBkAyTutkK1iEDWAsAoKhg9GW4ACHrEww+fBcxL4JJlMmN/HdYZpJXxpEp8YxD9N2Hkznh7xGF4Lz++oKCiiWHhNFyx9rRAt6KJZlnpAFFIWka8jSAX6RKCHmsiybiVz4OMNFhONYSUUHuo4S3YuiTn5XgUv0B4F+vDKRAnmE6RFRi7HihfGsKGRCmq888bRlzJiSqsR2IRiyiUR49+KSL64cinAGIKLO5cqktcD2gipSiCoJNioo5Ma9o9NbZQKLSwroHIkutcLVjjnNiwWMoUlPREnGXdL2W3yS0UsSC5Qa0FYPkwiUYz6zme2IpcJz/RUnERo5XAvZ0aiIJxm3ZefhUJiiStzLymyFeDEVGI+pWM1F4H0mSuR+D6MpUI9kh7qSYBUbkTS+zBfvODTET98ChPtxBHbhw+m+8UTno7rwyKmdtZKfl0o+xq6wRmbx1T8uEcq8YPa5ON16N2neP2gQe32e6O/VgHlf92d2ZKbMBBFAbHvu8Ew2L7//5GpVFIRGMcGCZmG8zovjNzLVXdLkt3XXSSDSvDWcJncVodpFODxuRITWe81oykltbqR9iABr0VJPlD+4e+FlNnfNRL0XCZJhXf30xWGNxkfJ5ALf+PLiAf3Y0yqZDypJKRIn2R2JbMTH978FqKy16BScHhRNChlajz253rsIG70rkaEXjwwVAuqh61oZWM6EUcE8bmzDlwzKigLj2ctqdBxWSqsr5tF9sF0wY5KrJGBCearblnDQw9FR+c8cvF9VJBqRFVQvjAohrpYMnxoZLDE0qGNhf+MEXEJIHpogwwJ/uIJpsJycb6NdKEybqeRoeUZekvD4hihQFlqcrSMDmLHv5sVY6nJaL5KKDzQgQfSu1Dvv10z2xELKBNTI4RIP6wcG9YK04Jz8MWK1kvsC1aZo84Eav01uZrD9BYZZZNwP1gvmipeNyTE+icnrNVulY/eMTn0Yplr9zs3b/UwnoPVxf6Y4NZQ04q1/0YuMIxXrR6dqwhMR8p/VS9yqqxb/aDQhSdpQvCvWuuEqVCREdUqeZJrpFj3VTnEOlTXtY54iwCA7T5rJPFVvejJPwdrHdF49P2dSBdM6KtunvCBMgsgmeCUoV8hPC2op6A0biWCsHU0MpP3IZmGjTp8cInVCfXjScpyJeilzGm2qSNetJNTCzsht0xa82nqCMYxRzrmsVOHLQecVjyb7n7U8hsYDDJjglynUZvnU0GOUSNervNGcousKLjDl6wIUWyfbkkPTi/nzulIrN20E/LATDVIhy2KNYWNlTtSfcsbf8vTCYhbhH94t21fQTPJ1WDksNnWGSzHWXeJRomttZGR4pzFLeOqwAxshjOKU91UEmAcD6A35y6JruqOXhfY/fairSmgShT9YMSgHZ+JXYUT0UDiIXZKGLnSC/d7nCgndqXapxw0CyOaQ6tTnt6VHTaqMcI88M7HDwHljb4YI9LD7qpdDxCY15NarfCgTYwLILAhlPVEj8zJQqHQq77ZnuHY8lSPRddK/oepD5YU7et3XcPCcZPiNA1GvqacAGPYgcJ8ssOX36NDBq6ncFV+Sfo4IcYUh3BFP90pftglxjD60266hQnxFzOTYWJCRdy4/BLYschkYQIjLVAHuSe65Xl4RzEup5R9Q1keh+EIkUu3AAL5yDAxJSZoXH4KgERNfMCUkNrsqZFhSrhjbPUZpuSkBH0QYkqzq+0bBZ7IyPiic8UUL9F2JgBNX+wqPFESsPrZD4h0/+XqLDyT0SgnBdF8uXb9si7z8MSVzJBnF4PQctk1Zuwerca4KZ5hwy6h3o8xoyB0m9Bv9AFz6q9vLB45ZqREbpkdYxeY07Ta9zASBuIeyLmXmMMsW/sK9wIviIl5IEfvPbzAfCgP9vbA8IKSTA78mLQ5Ye1q6jACEwAoZeSF2K+XCyxT8ysblwYHXao/y4XXMGtr++qCAq9h++8iFmJbEV7jxRdjM0U15PgP5aGOsPEsPse0Wlt6oYIqxP8wSTcEXvJzxf9hceLrgmbbWibeUBEoLgjgVnhLWgztGo2v+0FmengHG8jqqo8YfYoPeNfYurj2+1Vy2qQ2GT7R0OyZyArrOWFpFpXVJ8Hl0bq+67Y/lyCxsrjJ0whLYNZhBzenSsiDYlh2vKD+P4yfwoMyUov0rkYAva0ZFGD2x8x+H3GSbR2S1S2ZXpIKdNcysQUsDk5qUs96qW8iSJDWP2fIfMu5tX189bCS0MwC/9Su9wanTbKmXLRK1XDxjyvPN8T27z/JkFWFaV7LlEVAxNIyN5u4tpLg4To0SlO/ACi3nyaz03qWAAAAAElFTkSuQmCC"

/***/ }),

/***/ 583:
/*!**************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-ui/lib/uni-icons/icons.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
	"pulldown": "\ue588",
	"refreshempty": "\ue461",
	"back": "\ue471",
	"forward": "\ue470",
	"more": "\ue507",
	"more-filled": "\ue537",
	"scan": "\ue612",
	"qq": "\ue264",
	"weibo": "\ue260",
	"weixin": "\ue261",
	"pengyouquan": "\ue262",
	"loop": "\ue565",
	"refresh": "\ue407",
	"refresh-filled": "\ue437",
	"arrowthindown": "\ue585",
	"arrowthinleft": "\ue586",
	"arrowthinright": "\ue587",
	"arrowthinup": "\ue584",
	"undo-filled": "\ue7d6",
	"undo": "\ue406",
	"redo": "\ue405",
	"redo-filled": "\ue7d9",
	"bars": "\ue563",
	"chatboxes": "\ue203",
	"camera": "\ue301",
	"chatboxes-filled": "\ue233",
	"camera-filled": "\ue7ef",
	"cart-filled": "\ue7f4",
	"cart": "\ue7f5",
	"checkbox-filled": "\ue442",
	"checkbox": "\ue7fa",
	"arrowleft": "\ue582",
	"arrowdown": "\ue581",
	"arrowright": "\ue583",
	"smallcircle-filled": "\ue801",
	"arrowup": "\ue580",
	"circle": "\ue411",
	"eye-filled": "\ue568",
	"eye-slash-filled": "\ue822",
	"eye-slash": "\ue823",
	"eye": "\ue824",
	"flag-filled": "\ue825",
	"flag": "\ue508",
	"gear-filled": "\ue532",
	"reload": "\ue462",
	"gear": "\ue502",
	"hand-thumbsdown-filled": "\ue83b",
	"hand-thumbsdown": "\ue83c",
	"hand-thumbsup-filled": "\ue83d",
	"heart-filled": "\ue83e",
	"hand-thumbsup": "\ue83f",
	"heart": "\ue840",
	"home": "\ue500",
	"info": "\ue504",
	"home-filled": "\ue530",
	"info-filled": "\ue534",
	"circle-filled": "\ue441",
	"chat-filled": "\ue847",
	"chat": "\ue263",
	"mail-open-filled": "\ue84d",
	"email-filled": "\ue231",
	"mail-open": "\ue84e",
	"email": "\ue201",
	"checkmarkempty": "\ue472",
	"list": "\ue562",
	"locked-filled": "\ue856",
	"locked": "\ue506",
	"map-filled": "\ue85c",
	"map-pin": "\ue85e",
	"map-pin-ellipse": "\ue864",
	"map": "\ue364",
	"minus-filled": "\ue440",
	"mic-filled": "\ue332",
	"minus": "\ue410",
	"micoff": "\ue360",
	"mic": "\ue302",
	"clear": "\ue434",
	"smallcircle": "\ue868",
	"close": "\ue404",
	"closeempty": "\ue460",
	"paperclip": "\ue567",
	"paperplane": "\ue503",
	"paperplane-filled": "\ue86e",
	"person-filled": "\ue131",
	"contact-filled": "\ue130",
	"person": "\ue101",
	"contact": "\ue100",
	"images-filled": "\ue87a",
	"phone": "\ue200",
	"images": "\ue87b",
	"image": "\ue363",
	"image-filled": "\ue877",
	"location-filled": "\ue333",
	"location": "\ue303",
	"plus-filled": "\ue439",
	"plus": "\ue409",
	"plusempty": "\ue468",
	"help-filled": "\ue535",
	"help": "\ue505",
	"navigate-filled": "\ue884",
	"navigate": "\ue501",
	"mic-slash-filled": "\ue892",
	"search": "\ue466",
	"settings": "\ue560",
	"sound": "\ue590",
	"sound-filled": "\ue8a1",
	"spinner-cycle": "\ue465",
	"download-filled": "\ue8a4",
	"personadd-filled": "\ue132",
	"videocam-filled": "\ue8af",
	"personadd": "\ue102",
	"upload": "\ue402",
	"upload-filled": "\ue8b1",
	"starhalf": "\ue463",
	"star-filled": "\ue438",
	"star": "\ue408",
	"trash": "\ue401",
	"phone-filled": "\ue230",
	"compose": "\ue400",
	"videocam": "\ue300",
	"trash-filled": "\ue8dc",
	"download": "\ue403",
	"chatbubble-filled": "\ue232",
	"chatbubble": "\ue202",
	"cloud-download": "\ue8e4",
	"cloud-upload-filled": "\ue8e5",
	"cloud-upload": "\ue8e6",
	"cloud-download-filled": "\ue8e9",
	"headphones":"\ue8bf",
	"shop":"\ue609"
});


/***/ }),

/***/ 6:
/*!************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/node_modules/@dcloudio/uni-stat/package.json ***!
  \************************************************************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, bugs, bundleDependencies, deprecated, description, devDependencies, files, gitHead, homepage, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = {"_from":"@dcloudio/uni-stat@^2.0.0-26920200424005","_id":"@dcloudio/uni-stat@2.0.0-26920200424005","_inBundle":false,"_integrity":"sha512-FT8Z/C5xSmIxooqhV1v69jTkxATPz+FsRQIFOrbdlWekjGkrE73jfrdNMWm7gL5u41ALPJTVArxN1Re9by1bjQ==","_location":"/@dcloudio/vue-cli-plugin-uni/@dcloudio/uni-stat","_phantomChildren":{},"_requested":{"type":"range","registry":true,"raw":"@dcloudio/uni-stat@^2.0.0-26920200424005","name":"@dcloudio/uni-stat","escapedName":"@dcloudio%2funi-stat","scope":"@dcloudio","rawSpec":"^2.0.0-26920200424005","saveSpec":null,"fetchSpec":"^2.0.0-26920200424005"},"_requiredBy":["/@dcloudio/vue-cli-plugin-uni"],"_resolved":"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-26920200424005.tgz","_shasum":"47f4375095eda3089cf4678b4b96fc656a7ab623","_spec":"@dcloudio/uni-stat@^2.0.0-26920200424005","_where":"/Users/zhaixiaofang/Documents/weifos/youyi/20200516/youyi/node_modules/@dcloudio/vue-cli-plugin-uni","author":"","bugs":{"url":"https://github.com/dcloudio/uni-app/issues"},"bundleDependencies":false,"deprecated":false,"description":"","devDependencies":{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5","eslint":"^6.1.0","rollup":"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},"files":["dist","package.json","LICENSE"],"gitHead":"94494d54ed23e2dcf9ab8e3245b48b770b4e98a9","homepage":"https://github.com/dcloudio/uni-app#readme","license":"Apache-2.0","main":"dist/index.js","name":"@dcloudio/uni-stat","repository":{"type":"git","url":"git+https://github.com/dcloudio/uni-app.git","directory":"packages/uni-stat"},"scripts":{"build":"NODE_ENV=production rollup -c rollup.config.js","dev":"NODE_ENV=development rollup -w -c rollup.config.js"},"version":"2.0.0-26920200424005"};

/***/ }),

/***/ 7:
/*!*****************************************!*\
  !*** ./src/pages.json?{"type":"style"} ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  "pages": {
    "pages/home/index": {
      "navigationBarTitleText": "首页"
    },
    "pages/mine/after-sale": {
      "navigationBarTitleText": "售后"
    },
    "pages/mine/order-details": {
      "navigationBarTitleText": "订单详情"
    },
    "pages/mine/order": {
      "navigationBarTitleText": "我的订单"
    },
    "pages/card/index": {
      "navigationBarTitleText": "大客户领取礼品卡"
    },
    "pages/category/coupon": {
      "navigationBarTitleText": "优惠券"
    },
    "pages/category/details": {
      "navigationBarTitleText": "商品详情"
    },
    "pages/category/search-result": {
      "navigationBarTitleText": "搜索"
    },
    "pages/category/search": {
      "navigationBarTitleText": "搜索"
    },
    "pages/activity/select-shop": {
      "navigationBarTitleText": "门店选择"
    },
    "pages/home/userIndex": {
      "navigationBarTextStyle": "white",
      "navigationBarBackgroundColor": "#004EA2"
    },
    "pages/wallet/index": {
      "navigationBarTitleText": "我的钱包",
      "navigationBarTextStyle": "white",
      "navigationBarBackgroundColor": "#004EA2"
    },
    "pages/user/confirm-order": {
      "navigationBarTitleText": "确认订单"
    },
    "pages/user/activity": {
      "navigationBarTitleText": "活动中心"
    },
    "pages/wallet/coupon": {
      "navigationBarTitleText": "优惠券"
    },
    "pages/user/point": {
      "navigationBarTitleText": "我的积分",
      "navigationBarTextStyle": "white",
      "navigationBarBackgroundColor": "#004EA2"
    },
    "pages/user/about": {
      "navigationBarTitleText": "关于书城"
    },
    "pages/user/point-rule": {
      "navigationBarTitleText": "积分规则"
    },
    "pages/user/point-convert": {
      "navigationBarTitleText": "积分兑换",
      "navigationBarTextStyle": "white",
      "navigationBarBackgroundColor": "#004EA2"
    },
    "pages/user/point-detail": {
      "navigationBarTitleText": "积分明细",
      "navigationBarTextStyle": "white",
      "navigationBarBackgroundColor": "#004EA2"
    },
    "pages/user/activity-ticket": {
      "navigationBarTitleText": "活动票券"
    },
    "pages/user/activity-detail": {
      "navigationBarTitleText": "活动"
    },
    "pages/user/address/index": {
      "navigationBarTitleText": "收货地址"
    },
    "pages/user/address/form": {
      "navigationBarTitleText": "收货地址"
    },
    "pages/user/address/manage": {
      "navigationBarTitleText": "收货地址"
    },
    "pages/wallet/gift-buy": {
      "navigationBarTitleText": "购买礼品卡"
    },
    "pages/wallet/gift-accept": {
      "navigationBarTitleText": "领取礼品卡"
    },
    "pages/wallet/gift-send": {
      "navigationBarTitleText": "赠送礼品卡"
    },
    "pages/wallet/recharge": {
      "navigationBarTitleText": "储值卡充入"
    },
    "pages/wallet/detail": {
      "navigationBarTitleText": "零钱明细"
    },
    "pages/wallet/pay-coupon": {
      "navigationBarTitleText": "付款码"
    },
    "pages/wallet/pay": {
      "navigationBarTitleText": "付款码"
    },
    "pages/user/card-transfer": {
      "navigationBarTitleText": "会员卡迁移"
    },
    "pages/user/card-second": {
      "navigationBarTitleText": "授权副卡"
    },
    "pages/user/rights": {
      "navigationBarTitleText": "会员权益"
    },
    "pages/user/shopping-cart": {
      "navigationBarTitleText": "购物车"
    },
    "pages/user/card": {
      "navigationBarTitleText": "会员俱乐部"
    },
    "pages/user/open": {
      "navigationBarTitleText": "会员俱乐部"
    },
    "pages/category/index": {
      "navigationBarTitleText": "分类"
    },
    "pages/activity/index": {
      "navigationBarTitleText": "活动"
    },
    "pages/activity/details": {
      "navigationBarTitleText": "活动详情"
    }
  },
  "globalStyle": {
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "友谊书城",
    "navigationBarBackgroundColor": "#fff",
    "backgroundColor": "#EDEDED"
  }
};
exports.default = _default;

/***/ }),

/***/ 8:
/*!****************************************!*\
  !*** ./src/pages.json?{"type":"stat"} ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  "appid": "wxb14b7424a3df25fd"
};
exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map