// { "framework": "Vue"} 

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "F:\\helloUniapp\\news\\pages\\specia\\index.nvue?entry");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime-module.js");


/***/ }),

/***/ "./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/uni-app-plus-nvue/dist/index.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/uni-app-plus-nvue/dist/index.js ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var isFn = function isFn(v) {
  return typeof v === 'function';
};

var handlePromise = function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).catch(function (err) {
    return [err];
  });
};

var REGEX = /^on|^create|Sync$|Manager$|^pause/;
var API_NORMAL_LIST = ['os', 'stopRecord', 'stopVoice', 'stopBackgroundAudio', 'stopPullDownRefresh', 'hideKeyboard', 'hideToast', 'hideLoading', 'showNavigationBarLoading', 'hideNavigationBarLoading', 'canIUse', 'navigateBack', 'closeSocket', 'pageScrollTo', 'drawCanvas'];

var shouldPromise = function shouldPromise(name) {
  if (REGEX.test(name) && name !== 'createBLEConnection') {
    return false;
  }
  if (~API_NORMAL_LIST.indexOf(name)) {
    return false;
  }
  return true;
};

var promisify = function promisify(api) {
  return function () {
    for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return api.apply(undefined, [options].concat(params));
    }
    return handlePromise(new Promise(function (resolve, reject) {
      api.apply(undefined, [Object.assign({}, options, {
        success: resolve,
        fail: reject
      })].concat(params));
      /* eslint-disable no-extend-native */
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
    }));
  };
};

var UNIAPP_LAUNCH_WEBVIEW_ID = '__UNIAPP_LAUNCH_WEBVIEW_ID';

var plus = weex.requireModule('plus');
var storage = weex.requireModule('plusstorage');
var globalEvent = weex.requireModule('globalEvent');

var id = 0;
var callbacks = {};

var WEBVIEW_ID = '';

storage && storage.getItem && storage.getItem(UNIAPP_LAUNCH_WEBVIEW_ID, function (evt) {
  if (evt.result === 'success' && evt.data) {
    WEBVIEW_ID = evt.data;
  }
});

globalEvent.addEventListener('plusMessage', function (e) {
  if (e.data.type === 'UniAppJsApi') {
    invoke(e.data.id, e.data.data);
  } else if (e.data.type === 'onNavigationBarButtonTap') {
    if (typeof onNavigationBarButtonTapCallback === 'function') {
      onNavigationBarButtonTapCallback(e.data.data);
    }
  } else if (e.data.type === 'onNavigationBarSearchInputChanged') {
    if (typeof onNavigationBarSearchInputChangedCallback === 'function') {
      onNavigationBarSearchInputChangedCallback(e.data.data);
    }
  } else if (e.data.type === 'onNavigationBarSearchInputConfirmed') {
    if (typeof onNavigationBarSearchInputConfirmedCallback === 'function') {
      onNavigationBarSearchInputConfirmedCallback(e.data.data);
    }
  } else if (e.data.type === 'onNavigationBarSearchInputClicked') {
    if (typeof onNavigationBarSearchInputClickedCallback === 'function') {
      onNavigationBarSearchInputClickedCallback(e.data.data);
    }
  }
});

var createCallback = function createCallback(args, type) {
  var callback = function callback(res) {
    if (isFn(args)) {
      args(res);
    } else if (args) {
      if (~res.errMsg.indexOf(':ok')) {
        isFn(args.success) && args.success(res);
      } else if (~res.errMsg.indexOf(':fail')) {
        isFn(args.fail) && args.fail(res);
      }
      isFn(args.complete) && args.complete(res);
    }
  };
  if (isFn(args) || args && isFn(args.callback)) {
    callback.keepAlive = true;
  }
  return callback;
};

var invoke = function invoke(callbackId, data) {
  var callback = callbacks[callbackId];
  if (callback) {
    callback(data);
    if (!callback.keepAlive) {
      delete callbacks[callbackId];
    }
  } else {
    console.error('callback[' + callbackId + '] is undefined');
  }
};

var publish = function publish(_ref) {
  var id = _ref.id,
      type = _ref.type,
      params = _ref.params;

  callbacks[id] = createCallback(params, type);
  if (WEBVIEW_ID) {
    plus.postMessage({
      id: id,
      type: type,
      params: params
    }, WEBVIEW_ID);
  } else {
    console.error('launch webview id is not ready');
  }
};

function postMessage(data) {
  if (WEBVIEW_ID) {
    plus.postMessage(data, WEBVIEW_ID);
  } else {
    console.error('launch webview id is not ready');
  }
}

var createPublish = function createPublish(name) {
  return function (args) {
    publish({
      id: id++,
      type: name,
      params: args
    });
  };
};

var onNavigationBarButtonTapCallback = void 0;
var onNavigationBarSearchInputChangedCallback = void 0;
var onNavigationBarSearchInputConfirmedCallback = void 0;
var onNavigationBarSearchInputClickedCallback = void 0;
function onNavigationBarButtonTap(callback) {
  onNavigationBarButtonTapCallback = callback;
}
function onNavigationBarSearchInputChanged(callback) {
  onNavigationBarSearchInputChangedCallback = callback;
}
function onNavigationBarSearchInputConfirmed(callback) {
  onNavigationBarSearchInputConfirmedCallback = callback;
}
function onNavigationBarSearchInputClicked(callback) {
  onNavigationBarSearchInputClickedCallback = callback;
}

function requireNativePlugin(pluginName) {
  return weex.requireModule(pluginName);
}

var dom = weex.requireModule('dom');

function loadFontFace(_ref) {
  var family = _ref.family,
      source = _ref.source,
      desc = _ref.desc,
      success = _ref.success,
      fail = _ref.fail,
      complete = _ref.complete;

  dom.addRule('fontFace', {
    fontFamily: family,
    src: source.replace(/"/g, '\'')
  });
  var res = {
    errMsg: 'loadFontFace:ok',
    status: 'loaded'
  };
  isFn(success) && success(res);
  isFn(complete) && complete(res);
}

var globalEvent$1 = weex.requireModule('globalEvent');

var callbacks$1 = [];

globalEvent$1.addEventListener('plusMessage', function (e) {
  if (e.data.type === 'UniAppReady') {
    ready.isUniAppReady = true;
    if (callbacks$1.length) {
      callbacks$1.forEach(function (callback) {
        return callback();
      });
      callbacks$1 = [];
    }
  }
});

function ready(callback) {
  if (typeof callback === 'function') {
    if (this.isUniAppReady) {
      callback();
    } else {
      callbacks$1.push(callback);
    }
  }
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var stream = weex.requireModule('stream');

// let requestTaskId = 0

var METHOD_GET = 'GET';
var METHOD_POST = 'POST';
var CONTENT_TYPE_JSON = 'application/json';
var CONTENT_TYPE_FORM = 'application/x-www-form-urlencoded';

var serialize = function serialize(data) {
  var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : METHOD_GET;
  var contentType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : CONTENT_TYPE_FORM;

  if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
    if (method.toUpperCase() === METHOD_POST && contentType.toLowerCase() === CONTENT_TYPE_JSON) {
      return JSON.stringify(data);
    } else {
      return Object.keys(data).map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
      }).join('&');
    }
  }
  return data;
};

function request(_ref) {
  var url = _ref.url,
      data = _ref.data,
      header = _ref.header,
      _ref$method = _ref.method,
      method = _ref$method === undefined ? 'GET' : _ref$method,
      _ref$dataType = _ref.dataType,
      dataType = _ref$dataType === undefined ? 'json' : _ref$dataType,
      responseType = _ref.responseType,
      success = _ref.success,
      fail = _ref.fail,
      complete = _ref.complete;

  // requestTaskId++
  var aborted = false;

  var hasContentType = false;
  var headers = {};
  if (header) {
    for (var name in header) {
      if (!hasContentType && name.toLowerCase() === 'content-type') {
        hasContentType = true;
        headers['Content-Type'] = header[name];
      } else {
        headers[name] = header[name];
      }
    }
  }
  if (method === METHOD_GET && data) {
    url = url + (~url.indexOf('?') ? url.substr(-1) === '&' || url.substr(-1) === '?' ? '' : '&' : '?') + serialize(data);
  }
  stream.fetch({
    url: url,
    method: method,
    headers: headers,
    type: dataType === 'json' ? 'json' : 'text',
    body: method !== METHOD_GET ? serialize(data, method, headers['Content-Type']) : ''
  }, function (_ref2) {
    var status = _ref2.status,
        ok = _ref2.ok,
        statusText = _ref2.statusText,
        data = _ref2.data,
        headers = _ref2.headers;

    var ret = {};
    if (!status || status === -1 || aborted) {
      ret.errMsg = 'request:fail';
      isFn(fail) && fail(ret);
    } else {
      ret.data = data;
      ret.statusCode = status;
      ret.header = headers;
      isFn(success) && success(ret);
    }
    isFn(complete) && complete(ret);
  });
  return {
    abort: function abort() {
      aborted = true;
    }
  };
}

var storage$1 = weex.requireModule('plusstorage');
var UNIAPP_STORAGE_DATA_TYPE = '__TYPE';

function getStorage(_ref) {
  var key = _ref.key,
      data = _ref.data,
      success = _ref.success,
      fail = _ref.fail,
      complete = _ref.complete;

  storage$1.getItem(key + UNIAPP_STORAGE_DATA_TYPE, function (ret) {
    if (ret.result === 'success') {
      var dataType = ret.data;
      storage$1.getItem(key, function (res) {
        if (res.result === 'success') {
          var result = res.data;
          if (dataType && result) {
            if (dataType !== 'String') {
              result = JSON.parse(result);
            }
            isFn(success) && success({
              errMsg: 'getStorage:ok',
              data: result
            });
          } else {
            res.errMsg = 'setStorage:fail';
            isFn(fail) && fail(res);
          }
        } else {
          res.errMsg = 'setStorage:fail';
          isFn(fail) && fail(res);
        }
        isFn(complete) && complete(res);
      });
    } else {
      ret.errMsg = 'setStorage:fail';
      isFn(fail) && fail(ret);
      isFn(complete) && complete(ret);
    }
  });
}
function setStorage(_ref2) {
  var key = _ref2.key,
      data = _ref2.data,
      success = _ref2.success,
      fail = _ref2.fail,
      complete = _ref2.complete;

  var dataType = 'String';
  if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
    dataType = 'Object';
    data = JSON.stringify(data);
  }
  storage$1.setItem(key, data, function (res) {
    if (res.result === 'success') {
      storage$1.setItem(key + UNIAPP_STORAGE_DATA_TYPE, dataType, function (ret) {
        if (ret.result === 'success') {
          isFn(success) && success({
            errMsg: 'setStorage:ok'
          });
        } else {
          ret.errMsg = 'setStorage:fail';
          isFn(fail) && fail(ret);
        }
      });
    } else {
      res.errMsg = 'setStorage:fail';
      isFn(fail) && fail(res);
    }
    isFn(complete) && complete(res);
  });
}

function removeStorage(_ref3) {
  var key = _ref3.key,
      data = _ref3.data,
      success = _ref3.success,
      fail = _ref3.fail,
      complete = _ref3.complete;

  storage$1.removeItem(key, function (res) {
    if (res.result === 'success') {
      isFn(success) && success({
        errMsg: 'removeStorage:ok'
      });
    } else {
      res.errMsg = 'removeStorage:fail';
      isFn(fail) && fail(res);
    }
    isFn(complete) && complete(res);
  });
  storage$1.removeItem(key + UNIAPP_STORAGE_DATA_TYPE);
}

function clearStorage(_ref4) {
  var key = _ref4.key,
      data = _ref4.data,
      success = _ref4.success,
      fail = _ref4.fail,
      complete = _ref4.complete;
}

var clipboard = weex.requireModule('clipboard');

function getClipboardData(_ref) {
  var success = _ref.success,
      fail = _ref.fail,
      complete = _ref.complete;

  clipboard.getString(function (_ref2) {
    var data = _ref2.data;

    var res = {
      errMsg: 'getClipboardData:ok',
      data: data
    };
    isFn(success) && success(res);
    isFn(complete) && complete(res);
  });
}

function setClipboardData(_ref3) {
  var data = _ref3.data,
      success = _ref3.success,
      fail = _ref3.fail,
      complete = _ref3.complete;

  var res = {
    errMsg: 'setClipboardData:ok'
  };
  clipboard.setString(data);
  isFn(success) && success(res);
  isFn(complete) && complete(res);
}



var api = /*#__PURE__*/Object.freeze({
  loadFontFace: loadFontFace,
  ready: ready,
  request: request,
  getStorage: getStorage,
  setStorage: setStorage,
  removeStorage: removeStorage,
  clearStorage: clearStorage,
  getClipboardData: getClipboardData,
  setClipboardData: setClipboardData
});

var wx = {
  uploadFile: true,
  downloadFile: true,
  chooseImage: true,
  previewImage: true,
  getImageInfo: true,
  saveImageToPhotosAlbum: true,
  chooseVideo: true,
  saveVideoToPhotosAlbum: true,
  saveFile: true,
  getSavedFileList: true,
  getSavedFileInfo: true,
  removeSavedFile: true,
  openDocument: true,
  setStorage: true,
  getStorage: true,
  getStorageInfo: true,
  removeStorage: true,
  clearStorage: true,
  getLocation: true,
  chooseLocation: true,
  openLocation: true,
  getSystemInfo: true,
  getNetworkType: true,
  makePhoneCall: true,
  scanCode: true,
  setScreenBrightness: true,
  getScreenBrightness: true,
  setKeepScreenOn: true,
  vibrateLong: true,
  vibrateShort: true,
  addPhoneContact: true,
  showToast: true,
  showLoading: true,
  hideToast: true,
  hideLoading: true,
  showModal: true,
  showActionSheet: true,
  setNavigationBarTitle: true,
  setNavigationBarColor: true,
  navigateTo: true,
  redirectTo: true,
  reLaunch: true,
  switchTab: true,
  navigateBack: true,
  getProvider: true,
  login: true,
  getUserInfo: true,
  share: true,
  requestPayment: true,
  subscribePush: true,
  unsubscribePush: true,
  onPush: true,
  offPush: true
};

var uni = {};

var baseUni = {
  os: {
    nvue: true
  }
};

if (typeof Proxy !== 'undefined') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (name === 'os') {
        return {
          nvue: true
        };
      }
      if (name === 'postMessage') {
        return postMessage;
      }
      if (name === 'requireNativePlugin') {
        return requireNativePlugin;
      }
      if (name === 'onNavigationBarButtonTap') {
        return onNavigationBarButtonTap;
      }
      if (name === 'onNavigationBarSearchInputChanged') {
        return onNavigationBarSearchInputChanged;
      }
      if (name === 'onNavigationBarSearchInputConfirmed') {
        return onNavigationBarSearchInputConfirmed;
      }
      if (name === 'onNavigationBarSearchInputClicked') {
        return onNavigationBarSearchInputClicked;
      }
      var method = api[name];
      if (!method) {
        method = createPublish(name);
      }
      if (shouldPromise(name)) {
        return promisify(method);
      }
      return method;
    }
  });
} else {
  Object.keys(baseUni).forEach(function (key) {
    uni[key] = baseUni[key];
  });

  uni.postMessage = postMessage;

  uni.requireNativePlugin = requireNativePlugin;

  uni.onNavigationBarButtonTap = onNavigationBarButtonTap;

  uni.onNavigationBarSearchInputChanged = onNavigationBarSearchInputChanged;

  uni.onNavigationBarSearchInputConfirmed = onNavigationBarSearchInputConfirmed;

  uni.onNavigationBarSearchInputClicked = onNavigationBarSearchInputClicked;

  Object.keys(wx).forEach(function (name) {
    var method = api[name];
    if (!method) {
      method = createPublish(name);
    }
    if (shouldPromise(name)) {
      uni[name] = promisify(method);
    } else {
      uni[name] = method;
    }
  });
}

var uni$1 = uni;

/* harmony default export */ __webpack_exports__["default"] = (uni$1);


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime-module.js":
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ "./node_modules/regenerator-runtime/runtime.js");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\uni-media-list\\uni-media-list.nvue":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:/helloUniapp/news/components/uni-media-list/uni-media-list.nvue ***!
  \********************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;



































var _wxParse = _interopRequireDefault(__webpack_require__(/*! @/components/wxParse/wxParse */ "F:\\helloUniapp\\news\\components\\wxParse\\wxParse.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default2 = { props: { data: { type: Object, default: function _default(e) {return {};} } }, computed: { isImgRight: function isImgRight() {return this.data.article_type === 2;}, isImgLeft: function isImgLeft() {return this.data.article_type === 1;}, showImg: function showImg() {return this.data.image_list || this.data.image_url;} }, components: { wxParse: _wxParse.default }, methods: { close: function close(e) {this.$emit('close');e.stopPropagation();}, bindClick: function bindClick() {this.$emit('click');} } };exports.default = _default2;

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\uni-tab-bar\\uni-tab-bar.nvue":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:/helloUniapp/news/components/uni-tab-bar/uni-tab-bar.nvue ***!
  \**************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default =
{
  render: function render(createElement) {
    var vnodes = this.$slots.default;
    if (vnodes && vnodes.length) {
      for (var i = 0; i < vnodes.length; i++) {
        var vnode = vnodes[i];
        if (!vnode.data) {
          vnode.data = Object.create(null);
        }
        if (!vnode.data.on) {
          vnode.data.on = Object.create(null);
        }
        vnode.data.on.click = this._change;
      }
    }
    return createElement('div', { //如果需要左右滑动用scroller，不需要的话用div就行,添加个属性需要时将scroller添加 children
      style: {
        height: '100px',
        width: '750px',
        flexDirection: 'row',
        borderBottomWidth: "1px",
        borderColor: "#c8c7cc",
        borderBottomStyle: "solid" } },

    [
    createElement('scroller', {
      attrs: {
        scrollDirection: 'horizontal',
        showScrollbar: 'false' },

      style: {
        height: '100px',
        width: '750px',
        flexDirection: 'row' } },

    this.$slots.default)]);

  },
  methods: {
    _change: function _change(e) {
      var ret = {
        index: e.index };

      if (e.type === 'click') {
        var target = e.target;
        ret.index = target.parentNode.children.findIndex(function (node) {return node === target;});
      }
      this.$emit('_tabBarClick', ret);
    } } };exports.default = _default;

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\uni-tab-content\\uni-tab-content.nvue":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:/helloUniapp/news/components/uni-tab-content/uni-tab-content.nvue ***!
  \**********************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default =
{
  render: function render(createElement) {
    return createElement('slider', {
      style: {
        flex: 1 },

      attrs: {
        index: 0,
        infinite: false } },

    this.$slots.default);
  } };exports.default = _default;

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\uni-tabs\\uni-tabs.nvue":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:/helloUniapp/news/components/uni-tabs/uni-tabs.nvue ***!
  \********************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _uniTabContent = _interopRequireDefault(__webpack_require__(/*! ../uni-tab-content/uni-tab-content.nvue */ "F:\\helloUniapp\\news\\components\\uni-tab-content\\uni-tab-content.nvue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =
{
  props: {
    index: {
      type: Number,
      default: 0 } },


  data: function data() {
    return {
      tabIndex: this.index };

  },
  components: {
    uniTabContent: _uniTabContent.default },

  render: function render(createElement) {
    var vnodes = this.$slots.default;
    var newVNodes = [];
    if (vnodes && vnodes.length) {
      for (var i = 0; i < vnodes.length; i++) {
        var vnode = vnodes[i];
        if (!vnode || !vnode.componentOptions) {
          continue;
        }
        if (vnode.componentOptions.tag === 'uni-tab-content') {

          var newVNode = createElement('uni-tab-content', {
            staticClass: vnode.data.staticClass,
            'class': vnode.data['class'],
            style: vnode.data.style },
          vnode.componentOptions.children);

          if (!newVNode.data) {
            newVNode.data = Object.create(null);
          }
          if (!newVNode.data.attrs) {
            newVNode.data.attrs = Object.create(null);
          }
          if (!newVNode.data.props) {
            newVNode.data.props = Object.create(null);
          }
          if (!newVNode.data.on) {
            newVNode.data.on = Object.create(null);
          }
          newVNode.data.attrs.index = this.index;
          newVNode.data.on.change = this._change;
          newVNodes.push(newVNode);
        }
        if (vnode.componentOptions.tag === 'uni-tab-bar') {
          if (!vnode.componentOptions.listeners) {//监听子元素传递过来的事件
            vnode.componentOptions.listeners = Object.create(null);
          }
          vnode.componentOptions.listeners._tabBarClick = this._tabBarClick;
          newVNodes.push(vnode);
        }
      }
    }
    var newNode = createElement('div', {
      style: {
        flex: 1,
        flexDirection: 'column' },

      on: {
        change2: this._change2 } },

    newVNodes);
    return newNode;
  },
  methods: {
    _tabBarClick: function _tabBarClick(e) {
      this.tabIndex = e.index;
      this.$emit('change', e);
    },
    _change: function _change(e) {
      if (this.tabIndex === e.index) {
        return;
      }
      this.tabIndex = e.index;
      this.$emit('change', {
        index: e.index });

    } } };exports.default = _default;

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseAudio.vue":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:/helloUniapp/news/components/wxParse/components/wxParseAudio.vue ***!
  \*********************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default2 =
{
  name: 'wxParseAudio',
  props: {
    node: {
      type: Object,
      default: function _default() {
        return {};
      } } } };exports.default = _default2;

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseImg.vue":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:/helloUniapp/news/components/wxParse/components/wxParseImg.vue ***!
  \*******************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //
//
//
//
//
//
//
//
//
//
//
//
//
var _default2 =
{
  name: 'wxParseImg',
  data: function data() {
    return {
      newStyleStr: '',
      preview: true };

  },
  props: {
    node: {
      type: Object,
      default: function _default() {
        return {};
      } } },


  methods: {
    wxParseImgTap: function wxParseImgTap(e) {
      if (!this.preview) return;var
      src = e.target.dataset.src;
      if (!src) return;
      this.node.$host.preview(src, e);
    },
    // 图片视觉宽高计算函数区
    wxParseImgLoad: function wxParseImgLoad(e) {var
      src = e.target.dataset.src;
      if (!src) return;var _e$mp$detail =
      e.mp.detail,width = _e$mp$detail.width,height = _e$mp$detail.height;
      var recal = this.wxAutoImageCal(width, height);var
      imageheight = recal.imageheight,imageWidth = recal.imageWidth;var _this$node$attr =
      this.node.attr,padding = _this$node$attr.padding,mode = _this$node$attr.mode;var
      styleStr = this.node.styleStr;
      var imageHeightStyle = mode === 'widthFix' ? '' : "height: ".concat(imageheight, "px;");
      this.newStyleStr = "".concat(styleStr, "; ").concat(imageHeightStyle, "; width: ").concat(imageWidth, "px; padding: 0 ").concat(+padding, "px;");
    },
    // 计算视觉优先的图片宽高
    wxAutoImageCal: function wxAutoImageCal(originalWidth, originalHeight) {
      // 获取图片的原始长宽
      var padding = this.node.attr.padding;
      var windowWidth = this.node.$screen.width - 2 * padding;
      var results = {};

      if (originalWidth < 60 || originalHeight < 60) {var
        src = this.node.attr.src;
        this.node.$host.removeImageUrl(src);
        this.preview = false;
      }

      // 判断按照那种方式进行缩放
      if (originalWidth > windowWidth) {
        // 在图片width大于手机屏幕width时候
        results.imageWidth = windowWidth;
        results.imageheight = windowWidth * (originalHeight / originalWidth);
      } else {
        // 否则展示原来的数据
        results.imageWidth = originalWidth;
        results.imageheight = originalHeight;
      }

      return results;
    } } };exports.default = _default2;

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate0.vue":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:/helloUniapp/news/components/wxParse/components/wxParseTemplate0.vue ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;











































































var _wxParseTemplate = _interopRequireDefault(__webpack_require__(/*! ./wxParseTemplate1 */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate1.vue"));
var _wxParseImg = _interopRequireDefault(__webpack_require__(/*! ./wxParseImg */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseImg.vue"));
var _wxParseVideo = _interopRequireDefault(__webpack_require__(/*! ./wxParseVideo */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseVideo.vue"));
var _wxParseAudio = _interopRequireDefault(__webpack_require__(/*! ./wxParseAudio */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseAudio.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = { name: 'wxParseTemplate0', props: { node: {} }, components: { wxParseTemplate: _wxParseTemplate.default, wxParseImg: _wxParseImg.default, wxParseVideo: _wxParseVideo.default, wxParseAudio: _wxParseAudio.default }, methods: { wxParseATap: function wxParseATap(e) {var href = e.target.dataset.href;if (!href) return;this.node.$host.navigate(href, e);} } };exports.default = _default;

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate1.vue":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:/helloUniapp/news/components/wxParse/components/wxParseTemplate1.vue ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;


































































var _wxParseTemplate = _interopRequireDefault(__webpack_require__(/*! ./wxParseTemplate2 */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate2.vue"));
var _wxParseImg = _interopRequireDefault(__webpack_require__(/*! ./wxParseImg */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseImg.vue"));
var _wxParseVideo = _interopRequireDefault(__webpack_require__(/*! ./wxParseVideo */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseVideo.vue"));
var _wxParseAudio = _interopRequireDefault(__webpack_require__(/*! ./wxParseAudio */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseAudio.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = { name: 'wxParseTemplate1', props: { node: {} }, components: { wxParseTemplate: _wxParseTemplate.default, wxParseImg: _wxParseImg.default, wxParseVideo: _wxParseVideo.default, wxParseAudio: _wxParseAudio.default }, methods: { wxParseATap: function wxParseATap(e) {var href = e.target.dataset.href;if (!href) return;this.node.$host.navigate(href, e);} } };exports.default = _default;

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate10.vue":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:/helloUniapp/news/components/wxParse/components/wxParseTemplate10.vue ***!
  \**************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

































































var _wxParseTemplate = _interopRequireDefault(__webpack_require__(/*! ./wxParseTemplate11 */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate11.vue"));
var _wxParseImg = _interopRequireDefault(__webpack_require__(/*! ./wxParseImg */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseImg.vue"));
var _wxParseVideo = _interopRequireDefault(__webpack_require__(/*! ./wxParseVideo */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseVideo.vue"));
var _wxParseAudio = _interopRequireDefault(__webpack_require__(/*! ./wxParseAudio */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseAudio.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = { name: 'wxParseTemplate10', props: { node: {} }, components: { wxParseTemplate: _wxParseTemplate.default, wxParseImg: _wxParseImg.default, wxParseVideo: _wxParseVideo.default, wxParseAudio: _wxParseAudio.default }, methods: { wxParseATap: function wxParseATap(e) {var href = e.target.dataset.href;if (!href) return;this.node.$host.navigate(href, e);} } };exports.default = _default;

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate11.vue":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:/helloUniapp/news/components/wxParse/components/wxParseTemplate11.vue ***!
  \**************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

























































var _wxParseImg = _interopRequireDefault(__webpack_require__(/*! ./wxParseImg */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseImg.vue"));
var _wxParseVideo = _interopRequireDefault(__webpack_require__(/*! ./wxParseVideo */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseVideo.vue"));
var _wxParseAudio = _interopRequireDefault(__webpack_require__(/*! ./wxParseAudio */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseAudio.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = { name: 'wxParseTemplate11', props: { node: {} }, components: { wxParseImg: _wxParseImg.default, wxParseVideo: _wxParseVideo.default, wxParseAudio: _wxParseAudio.default }, methods: { wxParseATap: function wxParseATap(e) {var href = e.target.dataset.href;if (!href) return;this.node.$host.navigate(href, e);} } };exports.default = _default;

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate2.vue":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:/helloUniapp/news/components/wxParse/components/wxParseTemplate2.vue ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;


































































var _wxParseTemplate = _interopRequireDefault(__webpack_require__(/*! ./wxParseTemplate3 */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate3.vue"));
var _wxParseImg = _interopRequireDefault(__webpack_require__(/*! ./wxParseImg */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseImg.vue"));
var _wxParseVideo = _interopRequireDefault(__webpack_require__(/*! ./wxParseVideo */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseVideo.vue"));
var _wxParseAudio = _interopRequireDefault(__webpack_require__(/*! ./wxParseAudio */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseAudio.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = { name: 'wxParseTemplate2', props: { node: {} }, components: { wxParseTemplate: _wxParseTemplate.default, wxParseImg: _wxParseImg.default, wxParseVideo: _wxParseVideo.default, wxParseAudio: _wxParseAudio.default }, methods: { wxParseATap: function wxParseATap(e) {var href = e.target.dataset.href;if (!href) return;this.node.$host.navigate(href, e);} } };exports.default = _default;

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate3.vue":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:/helloUniapp/news/components/wxParse/components/wxParseTemplate3.vue ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;


































































var _wxParseTemplate = _interopRequireDefault(__webpack_require__(/*! ./wxParseTemplate4 */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate4.vue"));
var _wxParseImg = _interopRequireDefault(__webpack_require__(/*! ./wxParseImg */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseImg.vue"));
var _wxParseVideo = _interopRequireDefault(__webpack_require__(/*! ./wxParseVideo */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseVideo.vue"));
var _wxParseAudio = _interopRequireDefault(__webpack_require__(/*! ./wxParseAudio */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseAudio.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = { name: 'wxParseTemplate3', props: { node: {} }, components: { wxParseTemplate: _wxParseTemplate.default, wxParseImg: _wxParseImg.default, wxParseVideo: _wxParseVideo.default, wxParseAudio: _wxParseAudio.default }, methods: { wxParseATap: function wxParseATap(e) {var href = e.target.dataset.href;if (!href) return;this.node.$host.navigate(href, e);} } };exports.default = _default;

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate4.vue":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:/helloUniapp/news/components/wxParse/components/wxParseTemplate4.vue ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;


































































var _wxParseTemplate = _interopRequireDefault(__webpack_require__(/*! ./wxParseTemplate5 */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate5.vue"));
var _wxParseImg = _interopRequireDefault(__webpack_require__(/*! ./wxParseImg */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseImg.vue"));
var _wxParseVideo = _interopRequireDefault(__webpack_require__(/*! ./wxParseVideo */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseVideo.vue"));
var _wxParseAudio = _interopRequireDefault(__webpack_require__(/*! ./wxParseAudio */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseAudio.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = { name: 'wxParseTemplate4', props: { node: {} }, components: { wxParseTemplate: _wxParseTemplate.default, wxParseImg: _wxParseImg.default, wxParseVideo: _wxParseVideo.default, wxParseAudio: _wxParseAudio.default }, methods: { wxParseATap: function wxParseATap(e) {var href = e.target.dataset.href;if (!href) return;this.node.$host.navigate(href, e);} } };exports.default = _default;

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate5.vue":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:/helloUniapp/news/components/wxParse/components/wxParseTemplate5.vue ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;


































































var _wxParseTemplate = _interopRequireDefault(__webpack_require__(/*! ./wxParseTemplate6 */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate6.vue"));
var _wxParseImg = _interopRequireDefault(__webpack_require__(/*! ./wxParseImg */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseImg.vue"));
var _wxParseVideo = _interopRequireDefault(__webpack_require__(/*! ./wxParseVideo */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseVideo.vue"));
var _wxParseAudio = _interopRequireDefault(__webpack_require__(/*! ./wxParseAudio */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseAudio.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = { name: 'wxParseTemplate5', props: { node: {} }, components: { wxParseTemplate: _wxParseTemplate.default, wxParseImg: _wxParseImg.default, wxParseVideo: _wxParseVideo.default, wxParseAudio: _wxParseAudio.default }, methods: { wxParseATap: function wxParseATap(e) {var href = e.target.dataset.href;if (!href) return;this.node.$host.navigate(href, e);} } };exports.default = _default;

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate6.vue":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:/helloUniapp/news/components/wxParse/components/wxParseTemplate6.vue ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;


































































var _wxParseTemplate = _interopRequireDefault(__webpack_require__(/*! ./wxParseTemplate7 */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate7.vue"));
var _wxParseImg = _interopRequireDefault(__webpack_require__(/*! ./wxParseImg */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseImg.vue"));
var _wxParseVideo = _interopRequireDefault(__webpack_require__(/*! ./wxParseVideo */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseVideo.vue"));
var _wxParseAudio = _interopRequireDefault(__webpack_require__(/*! ./wxParseAudio */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseAudio.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = { name: 'wxParseTemplate6', props: { node: {} }, components: { wxParseTemplate: _wxParseTemplate.default, wxParseImg: _wxParseImg.default, wxParseVideo: _wxParseVideo.default, wxParseAudio: _wxParseAudio.default }, methods: { wxParseATap: function wxParseATap(e) {var href = e.target.dataset.href;if (!href) return;this.node.$host.navigate(href, e);} } };exports.default = _default;

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate7.vue":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:/helloUniapp/news/components/wxParse/components/wxParseTemplate7.vue ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;


































































var _wxParseTemplate = _interopRequireDefault(__webpack_require__(/*! ./wxParseTemplate8 */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate8.vue"));
var _wxParseImg = _interopRequireDefault(__webpack_require__(/*! ./wxParseImg */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseImg.vue"));
var _wxParseVideo = _interopRequireDefault(__webpack_require__(/*! ./wxParseVideo */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseVideo.vue"));
var _wxParseAudio = _interopRequireDefault(__webpack_require__(/*! ./wxParseAudio */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseAudio.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = { name: 'wxParseTemplate7', props: { node: {} }, components: { wxParseTemplate: _wxParseTemplate.default, wxParseImg: _wxParseImg.default, wxParseVideo: _wxParseVideo.default, wxParseAudio: _wxParseAudio.default }, methods: { wxParseATap: function wxParseATap(e) {var href = e.target.dataset.href;if (!href) return;this.node.$host.navigate(href, e);} } };exports.default = _default;

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate8.vue":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:/helloUniapp/news/components/wxParse/components/wxParseTemplate8.vue ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;


































































var _wxParseTemplate = _interopRequireDefault(__webpack_require__(/*! ./wxParseTemplate9 */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate9.vue"));
var _wxParseImg = _interopRequireDefault(__webpack_require__(/*! ./wxParseImg */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseImg.vue"));
var _wxParseVideo = _interopRequireDefault(__webpack_require__(/*! ./wxParseVideo */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseVideo.vue"));
var _wxParseAudio = _interopRequireDefault(__webpack_require__(/*! ./wxParseAudio */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseAudio.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = { name: 'wxParseTemplate8', props: { node: {} }, components: { wxParseTemplate: _wxParseTemplate.default, wxParseImg: _wxParseImg.default, wxParseVideo: _wxParseVideo.default, wxParseAudio: _wxParseAudio.default }, methods: { wxParseATap: function wxParseATap(e) {var href = e.target.dataset.href;if (!href) return;this.node.$host.navigate(href, e);} } };exports.default = _default;

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate9.vue":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:/helloUniapp/news/components/wxParse/components/wxParseTemplate9.vue ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;


































































var _wxParseTemplate = _interopRequireDefault(__webpack_require__(/*! ./wxParseTemplate10 */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate10.vue"));
var _wxParseImg = _interopRequireDefault(__webpack_require__(/*! ./wxParseImg */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseImg.vue"));
var _wxParseVideo = _interopRequireDefault(__webpack_require__(/*! ./wxParseVideo */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseVideo.vue"));
var _wxParseAudio = _interopRequireDefault(__webpack_require__(/*! ./wxParseAudio */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseAudio.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = { name: 'wxParseTemplate9', props: { node: {} }, components: { wxParseTemplate: _wxParseTemplate.default, wxParseImg: _wxParseImg.default, wxParseVideo: _wxParseVideo.default, wxParseAudio: _wxParseAudio.default }, methods: { wxParseATap: function wxParseATap(e) {var href = e.target.dataset.href;if (!href) return;this.node.$host.navigate(href, e);} } };exports.default = _default;

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseVideo.vue":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:/helloUniapp/news/components/wxParse/components/wxParseVideo.vue ***!
  \*********************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //
//
//
//
//
//
//
var _default =
{
  name: 'wxParseVideo',
  props: {
    node: {} } };exports.default = _default;

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\wxParse\\wxParse.vue":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:/helloUniapp/news/components/wxParse/wxParse.vue ***!
  \*****************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

















var _html2json = _interopRequireDefault(__webpack_require__(/*! ./libs/html2json */ "F:\\helloUniapp\\news\\components\\wxParse\\libs\\html2json.js"));
var _wxParseTemplate = _interopRequireDefault(__webpack_require__(/*! ./components/wxParseTemplate0 */ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate0.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default2 = { name: 'wxParse', props: { loading: { type: Boolean, default: false }, className: { type: String, default: '' }, content: { type: String, default: '' }, noData: {
      type: String,
      default: '<div style="color: red;">数据不能为空</div>' },

    startHandler: {
      type: Function,
      default: function _default() {
        return function (node) {
          node.attr.class = null;
          node.attr.style = null;
        };
      } },

    endHandler: {
      type: Function,
      default: null },

    charsHandler: {
      type: Function,
      default: null },

    imageProp: {
      type: Object,
      default: function _default() {
        return {
          mode: 'aspectFit',
          padding: 0,
          lazyLoad: false,
          domain: '' };

      } } },


  components: {
    wxParseTemplate: _wxParseTemplate.default },

  data: function data() {
    return {
      imageUrls: [] };

  },
  computed: {
    nodes: function nodes() {var

      content =





      this.content,noData = this.noData,imageProp = this.imageProp,startHandler = this.startHandler,endHandler = this.endHandler,charsHandler = this.charsHandler;
      var parseData = content || noData;
      var customHandler = {
        start: startHandler,
        end: endHandler,
        chars: charsHandler };

      var results = (0, _html2json.default)(parseData, customHandler, imageProp, this);
      this.imageUrls = results.imageUrls;
      console.log(results);
      return results.nodes;
    } },

  methods: {
    navigate: function navigate(href, $event) {
      this.$emit('navigate', href, $event);
    },
    preview: function preview(src, $event) {
      if (!this.imageUrls.length) return;
      wx.previewImage({
        current: src,
        urls: this.imageUrls });

      this.$emit('preview', src, $event);
    },
    removeImageUrl: function removeImageUrl(src) {var
      imageUrls = this.imageUrls;
      imageUrls.splice(imageUrls.indexOf(src), 1);
    } } };exports.default = _default2;

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\pages\\specia\\index.nvue":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:/helloUniapp/news/pages/specia/index.nvue ***!
  \**********************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js"));


























var _uniTabContent = _interopRequireDefault(__webpack_require__(/*! @/components/uni-tab-content/uni-tab-content.nvue */ "F:\\helloUniapp\\news\\components\\uni-tab-content\\uni-tab-content.nvue"));
var _uniTabBar = _interopRequireDefault(__webpack_require__(/*! @/components/uni-tab-bar/uni-tab-bar.nvue */ "F:\\helloUniapp\\news\\components\\uni-tab-bar\\uni-tab-bar.nvue"));
var _uniTabs = _interopRequireDefault(__webpack_require__(/*! @/components/uni-tabs/uni-tabs.nvue */ "F:\\helloUniapp\\news\\components\\uni-tabs\\uni-tabs.nvue"));
var _uniMediaList = _interopRequireDefault(__webpack_require__(/*! @/components/uni-media-list/uni-media-list.nvue */ "F:\\helloUniapp\\news\\components\\uni-media-list\\uni-media-list.nvue"));

var _util = __webpack_require__(/*! @/common/util.js */ "F:\\helloUniapp\\news\\common\\util.js");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}



//const dom = weex.requireModule('dom');
var _default =
{
  data: function data() {
    return {
      refreshing: false,
      refreshText: '下拉可以刷新',
      newsList: [],
      tabIndex: 0,
      tabBars: [],
      moduleid: "" };

  },
  components: {
    uniTabContent: _uniTabContent.default,
    uniTabBar: _uniTabBar.default,
    uniTabs: _uniTabs.default,
    uniMediaList: _uniMediaList.default },

  created: function created() {

    this.loadNavList();
  },
  methods: {
    loadNavList: function loadNavList() {var _this = this;
      uni.request({
        url: 'http://47.100.48.1/api/member/getData.php?ac=newscatedata',
        data: { isSpecia: 1 },
        method: "POST",
        success: function success(res) {
          var result = res.data;
          if (result.code == "0000") {
            _this.tabBars = result.data;
            uni.setNavigationBarTitle({
              title: result.data[0].name });

            _this.tabBars.forEach(function (tabBar) {
              _this.newsList.push({
                data: [],
                cateid: tabBar.catid,
                page: 0,
                loadingText: '加载中...' });

            });
            console.log(_this.newsList);
            _this.getList(_this.moduleid);
          }
        } });

    },
    getList: function getList() {var _this2 = this;var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var activeTab = this.newsList[this.tabIndex];
      //activeTab.requestParams.time = new Date().getTime() + '';
      if (action === 1) {
        activeTab.page = 0;
      }
      uni.request({
        url: 'http://47.100.48.1/api/member/getData.php?ac=newsmoduledata',
        data: { cateid: activeTab.cateid, page: activeTab.page, isSpecia: 1 },
        method: "POST",
        success: function success(res) {
          var result = res.data;
          if (result.code == "0000") {

            var data = result.data.map(function (news) {
              return {
                id: news.itemid,
                article_type: 1,
                datetime: (0, _util.friendlyDate)(news.addtime),
                title: news.title,
                image_url: news.thumb,
                source: news.editor,
                comment_count: news.hits,
                post_id: news.catid,
                linkurl: news.linkurl,
                catname: news.catname };

            });

            if (action === 1) {
              activeTab.data = data;
              _this2.refreshing = false;
            } else {
              data.forEach(function (news) {
                activeTab.data.push(news);
              });
            }
            activeTab.page = activeTab.page + 1;
            if (data.length < 10) {
              _this2.newsList.loadingText = '没有更多数据了';
            }
          }
        } });

    },
    goDetail: function goDetail(e) {
      uni.setStorage({
        key: 'urlSpecia',
        data: e.linkurl,
        success: function success() {
          console.log('success');
        } });

      uni.navigateTo({
        //url: '/pages/detail/detail?query=' + encodeURIComponent(JSON.stringify(detail))
        url: '/pages/specia/detail?catid=' + e.post_id + '&itemid=' + e.id });

    },
    dislike: function dislike(tabIndex, newsIndex) {var _this3 = this;
      uni.showModal({
        content: '不感兴趣？',
        success: function success(res) {
          if (res.confirm) {
            _this3.newsList[tabIndex].data.splice(newsIndex, 1);
          }
        } });

    },
    loadMore: function loadMore() {
      this.getList(2);
    },
    changeTab: function () {var _changeTab = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(event) {var activeNode, activeTab;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                this.tabIndex = event.index;
                activeNode = this.$refs[this.tabBars[event.index].id + event.index][0];
                // 				let nodeSize = await this.getNodeSize(activeNode);
                // 				if (nodeSize.left + nodeSize.width > 750) {
                // 					let index = event.index - 4;
                // 					let targetNode = this.$refs[this.tabBars[index].id + index][0];
                // 					dom.scrollToElement(targetNode, {});
                // 				} else if (nodeSize.left < 0) {
                // 					dom.scrollToElement(activeNode, {});
                // 				}
                // 首次切换后加载数据
                activeTab = this.newsList[this.tabIndex];
                if (activeTab.data.length === 0) {
                  this.getList();
                }case 4:case "end":return _context.stop();}}}, _callee, this);}));function changeTab(_x) {return _changeTab.apply(this, arguments);}return changeTab;}(),

    // 			getNodeSize(node) {
    // 				return new Promise((resolve, reject) => {
    // 					dom.getComponentRect(node, (result) => {
    // 						resolve(result.size);
    // 					});
    // 				});
    // 			},
    onRefresh: function onRefresh(event) {
      this.refreshText = '正在刷新...';
      this.refreshing = true;
      this.getList();
    },
    onPullingDown: function onPullingDown(event) {
      if (this.refreshing) {
        return;
      }
      if (Math.abs(event.pullingDistance) > Math.abs(event.viewHeight)) {
        this.refreshText = "释放立即刷新";
      } else {
        this.refreshText = "下拉可以刷新";
      }
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/uni-app-plus-nvue/dist/index.js */ "./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/uni-app-plus-nvue/dist/index.js")["default"]))

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/style-loader.js!./node_modules/weex-vue-loader/lib/style-rewriter.js?id=data-v-10f1c032!./node_modules/weex-vue-loader/lib/selector.js?type=styles&index=0!F:\\helloUniapp\\news\\components\\uni-media-list\\uni-media-list.nvue":
/*!***********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/style-loader.js!./node_modules/weex-vue-loader/lib/style-rewriter.js?id=data-v-10f1c032!./node_modules/weex-vue-loader/lib/selector.js?type=styles&index=0!F:/helloUniapp/news/components/uni-media-list/uni-media-list.nvue ***!
  \***********************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  "sou": {
    "fontWeight": "600",
    "color": "#FF0000"
  },
  "list-cell": {
    "width": "750",
    "paddingTop": 0,
    "paddingRight": "30",
    "paddingBottom": 0,
    "paddingLeft": "30",
    "backgroundColor:active": "#eeeeee"
  },
  "media-list": {
    "flex": 1,
    "flexDirection": "column",
    "borderBottomWidth": "1",
    "borderBottomStyle": "solid",
    "borderBottomColor": "#c8c7cc",
    "paddingTop": "20",
    "paddingRight": 0,
    "paddingBottom": "20",
    "paddingLeft": 0
  },
  "media-image-right": {
    "flexDirection": "row"
  },
  "media-image-left": {
    "flexDirection": "row-reverse"
  },
  "media-title": {
    "flex": 1,
    "lines": 3,
    "textOverflow": "ellipsis",
    "fontSize": "32",
    "color": "#555555"
  },
  "media-title2": {
    "flex": 1,
    "marginTop": "6",
    "lineHeight": "40"
  },
  "image-section": {
    "marginTop": "20",
    "flexDirection": "row",
    "justifyContent": "space-between"
  },
  "image-section-right": {
    "marginTop": "0",
    "marginLeft": "10",
    "width": "225",
    "height": "146"
  },
  "image-section-left": {
    "marginTop": "0",
    "marginRight": 16,
    "width": "225",
    "height": "146"
  },
  "image-list1": {
    "width": "690",
    "height": "481"
  },
  "image-list2": {
    "width": "225",
    "height": "146"
  },
  "image-list3": {
    "width": "225",
    "height": "146"
  },
  "media-info": {
    "flexDirection": "row"
  },
  "info-text": {
    "marginRight": "20",
    "color": "#999999",
    "fontSize": "24"
  },
  "media-foot": {
    "marginTop": "20",
    "flexDirection": "row",
    "justifyContent": "space-between"
  },
  "max-close-view": {
    "alignItems": "center",
    "justifyContent": "flex-end",
    "flexDirection": "row",
    "height": "40",
    "width": "80"
  },
  "close-view": {
    "borderStyle": "solid",
    "borderWidth": "1",
    "borderColor": "#999999",
    "borderRadius": "10",
    "justifyContent": "center",
    "height": "30",
    "width": "40",
    "lineHeight": "30"
  },
  "close": {
    "textAlign": "center",
    "color": "#999999",
    "fontSize": "28"
  },
  "swiper-tab-list": {
    "textOverflow": "ellipsis",
    "display": "-webkit-box",
    "WebkitLineClamp": 1
  }
}

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/style-loader.js!./node_modules/weex-vue-loader/lib/style-rewriter.js?id=data-v-c8677372!./node_modules/weex-vue-loader/lib/selector.js?type=styles&index=0!F:\\helloUniapp\\news\\pages\\specia\\index.nvue":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/style-loader.js!./node_modules/weex-vue-loader/lib/style-rewriter.js?id=data-v-c8677372!./node_modules/weex-vue-loader/lib/selector.js?type=styles&index=0!F:/helloUniapp/news/pages/specia/index.nvue ***!
  \*************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  "tab-bar-item": {
    "width": "150",
    "height": "100",
    "flexDirection": "column",
    "alignItems": "center",
    "justifyContent": "center"
  },
  "tab-bar-title": {
    "height": "100",
    "lineHeight": "100",
    "fontSize": "30",
    "color": "#555555"
  },
  "active": {
    "color": "#fc2c5d"
  },
  "loadmore": {
    "height": "70",
    "width": "750",
    "flexDirection": "column",
    "justifyContent": "center"
  },
  "loadmore-text": {
    "fontSize": "30",
    "textAlign": "center",
    "color": "#999999"
  },
  "refresh": {
    "width": "750",
    "height": "70",
    "flexDirection": "row",
    "alignItems": "center",
    "justifyContent": "center"
  },
  "refresh-text": {
    "textAlign": "center",
    "fontSize": "28",
    "color": "#999999"
  }
}

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-10f1c032!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:\\helloUniapp\\news\\components\\uni-media-list\\uni-media-list.nvue":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-10f1c032!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:/helloUniapp/news/components/uni-media-list/uni-media-list.nvue ***!
  \*************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: ["list-cell"],
    on: {
      "click": _vm.bindClick
    }
  }, [_c('div', {
    staticClass: ["media-list"]
  }, [_c('div', {
    class: [_vm.isImgRight ? 'media-image-right' : '', _vm.isImgLeft ? 'media-image-left' : '']
  }, [(!_vm.data.type) ? _c('text', {
    class: ['media-title', _vm.isImgRight || _vm.isImgLeft ? 'media-title2' : '']
  }, [_vm._v(_vm._s(_vm.data.title))]) : _vm._e(), (_vm.data.type) ? _c('div', {
    directives: [{
      name: "html",
      rawName: "v-html",
      value: (_vm.data.title),
      expression: "data.title"
    }],
    class: ['media-title', _vm.isImgRight || _vm.isImgLeft ? 'media-title2' : '']
  }) : _vm._e(), (_vm.showImg) ? _c('div', {
    class: ['image-section', _vm.isImgRight ? 'image-section-right' : '', _vm.isImgLeft ? 'image-section-left' : '']
  }, [(_vm.data.image_url) ? _c('image', {
    class: ['image-list1', _vm.isImgRight || _vm.isImgLeft ? 'image-list2' : ''],
    attrs: {
      "src": _vm.data.image_url
    }
  }) : _vm._e(), _vm._l((_vm.data.image_list), function(source, i) {
    return (_vm.data.image_list) ? _c('image', {
      key: i,
      staticClass: ["image-list3"],
      attrs: {
        "src": source.url
      }
    }) : _vm._e()
  })], 2) : _vm._e()]), _c('div', {
    staticClass: ["media-foot"]
  }, [_c('div', {
    staticClass: ["media-info"]
  }, [_c('text', {
    staticClass: ["info-text"]
  }, [_vm._v(_vm._s(_vm.data.catname))]), _c('text', {
    staticClass: ["info-text"]
  }, [_vm._v(_vm._s(_vm.data.source))]), _c('text', {
    staticClass: ["info-text"]
  }, [_vm._v(_vm._s(_vm.data.comment_count) + "次浏览")]), _c('text', {
    staticClass: ["info-text"]
  }, [_vm._v(_vm._s(_vm.data.datetime))])]), _c('div', {
    staticClass: ["max-close-view"],
    on: {
      "click": _vm.close
    }
  }, [_vm._m(0)])])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["close-view"]
  }, [_c('text', {
    staticClass: ["close"]
  }, [_vm._v("×")])])
}]}
module.exports.render._withStripped = true

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-169c7db0!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseAudio.vue":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-169c7db0!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:/helloUniapp/news/components/wxParse/components/wxParseAudio.vue ***!
  \**************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('audio', {
    class: _vm.node.classStr,
    style: _vm.node.styleStr,
    attrs: {
      "id": _vm.node.attr.id,
      "src": _vm.node.attr.src,
      "loop": _vm.node.attr.loop,
      "poster": _vm.node.attr.poster,
      "name": _vm.node.attr.name,
      "author": _vm.node.attr.author,
      "controls": ""
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-37de114e!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate9.vue":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-37de114e!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:/helloUniapp/news/components/wxParse/components/wxParseTemplate9.vue ***!
  \******************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('view', [(_vm.node.node == 'element') ? _c('block', [(_vm.node.tag == 'button') ? _c('block', [_c('button', {
    attrs: {
      "type": "default",
      "size": "mini"
    }
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))], 1) : (_vm.node.tag == 'li') ? _c('block', [_c('view', {
    class: _vm.node.classStr,
    style: _vm.node.styleStr
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))]) : (_vm.node.tag == 'video') ? _c('block', [_c('wx-parse-video', {
    attrs: {
      "node": _vm.node
    }
  })], 1) : (_vm.node.tag == 'audio') ? _c('block', [_c('wx-parse-audio', {
    attrs: {
      "node": _vm.node
    }
  })], 1) : (_vm.node.tag == 'img') ? _c('block', [_c('wx-parse-img', {
    attrs: {
      "node": _vm.node
    }
  })], 1) : (_vm.node.tag == 'a') ? _c('block', [_c('view', {
    class: _vm.node.classStr,
    style: _vm.node.styleStr,
    attrs: {
      "dataHref": _vm.node.attr.href
    },
    on: {
      "click": _vm.wxParseATap
    }
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))]) : (_vm.node.tag == 'br') ? _c('block', [_c('text', [_vm._v("\\n")])]) : _c('block', [_c('view', {
    class: _vm.node.classStr,
    style: _vm.node.styleStr
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))])], 1) : (_vm.node.node == 'text') ? _c('block', [_vm._v(_vm._s(_vm.node.text))]) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-37fa4050!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate8.vue":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-37fa4050!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:/helloUniapp/news/components/wxParse/components/wxParseTemplate8.vue ***!
  \******************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('view', [(_vm.node.node == 'element') ? _c('block', [(_vm.node.tag == 'button') ? _c('block', [_c('button', {
    attrs: {
      "type": "default",
      "size": "mini"
    }
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))], 1) : (_vm.node.tag == 'li') ? _c('block', [_c('view', {
    class: _vm.node.classStr,
    style: _vm.node.styleStr
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))]) : (_vm.node.tag == 'video') ? _c('block', [_c('wx-parse-video', {
    attrs: {
      "node": _vm.node
    }
  })], 1) : (_vm.node.tag == 'audio') ? _c('block', [_c('wx-parse-audio', {
    attrs: {
      "node": _vm.node
    }
  })], 1) : (_vm.node.tag == 'img') ? _c('block', [_c('wx-parse-img', {
    attrs: {
      "node": _vm.node
    }
  })], 1) : (_vm.node.tag == 'a') ? _c('block', [_c('view', {
    class: _vm.node.classStr,
    style: _vm.node.styleStr,
    attrs: {
      "dataHref": _vm.node.attr.href
    },
    on: {
      "click": _vm.wxParseATap
    }
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))]) : (_vm.node.tag == 'br') ? _c('block', [_c('text', [_vm._v("\\n")])]) : _c('block', [_c('view', {
    class: _vm.node.classStr,
    style: _vm.node.styleStr
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))])], 1) : (_vm.node.node == 'text') ? _c('block', [_vm._v(_vm._s(_vm.node.text))]) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-38166f52!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate7.vue":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-38166f52!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:/helloUniapp/news/components/wxParse/components/wxParseTemplate7.vue ***!
  \******************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('view', [(_vm.node.node == 'element') ? _c('block', [(_vm.node.tag == 'button') ? _c('block', [_c('button', {
    attrs: {
      "type": "default",
      "size": "mini"
    }
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))], 1) : (_vm.node.tag == 'li') ? _c('block', [_c('view', {
    class: _vm.node.classStr,
    style: _vm.node.styleStr
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))]) : (_vm.node.tag == 'video') ? _c('block', [_c('wx-parse-video', {
    attrs: {
      "node": _vm.node
    }
  })], 1) : (_vm.node.tag == 'audio') ? _c('block', [_c('wx-parse-audio', {
    attrs: {
      "node": _vm.node
    }
  })], 1) : (_vm.node.tag == 'img') ? _c('block', [_c('wx-parse-img', {
    attrs: {
      "node": _vm.node
    }
  })], 1) : (_vm.node.tag == 'a') ? _c('block', [_c('view', {
    class: _vm.node.classStr,
    style: _vm.node.styleStr,
    attrs: {
      "dataHref": _vm.node.attr.href
    },
    on: {
      "click": _vm.wxParseATap
    }
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))]) : (_vm.node.tag == 'br') ? _c('block', [_c('text', [_vm._v("\\n")])]) : _c('block', [_c('view', {
    class: _vm.node.classStr,
    style: _vm.node.styleStr
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))])], 1) : (_vm.node.node == 'text') ? _c('block', [_vm._v(_vm._s(_vm.node.text))]) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-38329e54!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate6.vue":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-38329e54!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:/helloUniapp/news/components/wxParse/components/wxParseTemplate6.vue ***!
  \******************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('view', [(_vm.node.node == 'element') ? _c('block', [(_vm.node.tag == 'button') ? _c('block', [_c('button', {
    attrs: {
      "type": "default",
      "size": "mini"
    }
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))], 1) : (_vm.node.tag == 'li') ? _c('block', [_c('view', {
    class: _vm.node.classStr,
    style: _vm.node.styleStr
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))]) : (_vm.node.tag == 'video') ? _c('block', [_c('wx-parse-video', {
    attrs: {
      "node": _vm.node
    }
  })], 1) : (_vm.node.tag == 'audio') ? _c('block', [_c('wx-parse-audio', {
    attrs: {
      "node": _vm.node
    }
  })], 1) : (_vm.node.tag == 'img') ? _c('block', [_c('wx-parse-img', {
    attrs: {
      "node": _vm.node
    }
  })], 1) : (_vm.node.tag == 'a') ? _c('block', [_c('view', {
    class: _vm.node.classStr,
    style: _vm.node.styleStr,
    attrs: {
      "dataHref": _vm.node.attr.href
    },
    on: {
      "click": _vm.wxParseATap
    }
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))]) : (_vm.node.tag == 'br') ? _c('block', [_c('text', [_vm._v("\\n")])]) : _c('block', [_c('view', {
    class: _vm.node.classStr,
    style: _vm.node.styleStr
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))])], 1) : (_vm.node.node == 'text') ? _c('block', [_vm._v(_vm._s(_vm.node.text))]) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-384ecd56!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate5.vue":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-384ecd56!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:/helloUniapp/news/components/wxParse/components/wxParseTemplate5.vue ***!
  \******************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('view', [(_vm.node.node == 'element') ? _c('block', [(_vm.node.tag == 'button') ? _c('block', [_c('button', {
    attrs: {
      "type": "default",
      "size": "mini"
    }
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))], 1) : (_vm.node.tag == 'li') ? _c('block', [_c('view', {
    class: _vm.node.classStr,
    style: _vm.node.styleStr
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))]) : (_vm.node.tag == 'video') ? _c('block', [_c('wx-parse-video', {
    attrs: {
      "node": _vm.node
    }
  })], 1) : (_vm.node.tag == 'audio') ? _c('block', [_c('wx-parse-audio', {
    attrs: {
      "node": _vm.node
    }
  })], 1) : (_vm.node.tag == 'img') ? _c('block', [_c('wx-parse-img', {
    attrs: {
      "node": _vm.node
    }
  })], 1) : (_vm.node.tag == 'a') ? _c('block', [_c('view', {
    class: _vm.node.classStr,
    style: _vm.node.styleStr,
    attrs: {
      "dataHref": _vm.node.attr.href
    },
    on: {
      "click": _vm.wxParseATap
    }
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))]) : (_vm.node.tag == 'br') ? _c('block', [_c('text', [_vm._v("\\n")])]) : _c('block', [_c('view', {
    class: _vm.node.classStr,
    style: _vm.node.styleStr
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))])], 1) : (_vm.node.node == 'text') ? _c('block', [_vm._v(_vm._s(_vm.node.text))]) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-386afc58!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate4.vue":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-386afc58!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:/helloUniapp/news/components/wxParse/components/wxParseTemplate4.vue ***!
  \******************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('view', [(_vm.node.node == 'element') ? _c('block', [(_vm.node.tag == 'button') ? _c('block', [_c('button', {
    attrs: {
      "type": "default",
      "size": "mini"
    }
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))], 1) : (_vm.node.tag == 'li') ? _c('block', [_c('view', {
    class: _vm.node.classStr,
    style: _vm.node.styleStr
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))]) : (_vm.node.tag == 'video') ? _c('block', [_c('wx-parse-video', {
    attrs: {
      "node": _vm.node
    }
  })], 1) : (_vm.node.tag == 'audio') ? _c('block', [_c('wx-parse-audio', {
    attrs: {
      "node": _vm.node
    }
  })], 1) : (_vm.node.tag == 'img') ? _c('block', [_c('wx-parse-img', {
    attrs: {
      "node": _vm.node
    }
  })], 1) : (_vm.node.tag == 'a') ? _c('block', [_c('view', {
    class: _vm.node.classStr,
    style: _vm.node.styleStr,
    attrs: {
      "dataHref": _vm.node.attr.href
    },
    on: {
      "click": _vm.wxParseATap
    }
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))]) : (_vm.node.tag == 'br') ? _c('block', [_c('text', [_vm._v("\\n")])]) : _c('block', [_c('view', {
    class: _vm.node.classStr,
    style: _vm.node.styleStr
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))])], 1) : (_vm.node.node == 'text') ? _c('block', [_vm._v(_vm._s(_vm.node.text))]) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-38872b5a!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate3.vue":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-38872b5a!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:/helloUniapp/news/components/wxParse/components/wxParseTemplate3.vue ***!
  \******************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('view', [(_vm.node.node == 'element') ? _c('block', [(_vm.node.tag == 'button') ? _c('block', [_c('button', {
    attrs: {
      "type": "default",
      "size": "mini"
    }
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))], 1) : (_vm.node.tag == 'li') ? _c('block', [_c('view', {
    class: _vm.node.classStr,
    style: _vm.node.styleStr
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))]) : (_vm.node.tag == 'video') ? _c('block', [_c('wx-parse-video', {
    attrs: {
      "node": _vm.node
    }
  })], 1) : (_vm.node.tag == 'audio') ? _c('block', [_c('wx-parse-audio', {
    attrs: {
      "node": _vm.node
    }
  })], 1) : (_vm.node.tag == 'img') ? _c('block', [_c('wx-parse-img', {
    attrs: {
      "node": _vm.node
    }
  })], 1) : (_vm.node.tag == 'a') ? _c('block', [_c('view', {
    class: _vm.node.classStr,
    style: _vm.node.styleStr,
    attrs: {
      "dataHref": _vm.node.attr.href
    },
    on: {
      "click": _vm.wxParseATap
    }
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))]) : (_vm.node.tag == 'br') ? _c('block', [_c('text', [_vm._v("\\n")])]) : _c('block', [_c('view', {
    class: _vm.node.classStr,
    style: _vm.node.styleStr
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))])], 1) : (_vm.node.node == 'text') ? _c('block', [_vm._v(_vm._s(_vm.node.text))]) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-38a35a5c!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate2.vue":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-38a35a5c!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:/helloUniapp/news/components/wxParse/components/wxParseTemplate2.vue ***!
  \******************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('view', [(_vm.node.node == 'element') ? _c('block', [(_vm.node.tag == 'button') ? _c('block', [_c('button', {
    attrs: {
      "type": "default",
      "size": "mini"
    }
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))], 1) : (_vm.node.tag == 'li') ? _c('block', [_c('view', {
    class: _vm.node.classStr,
    style: _vm.node.styleStr
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))]) : (_vm.node.tag == 'video') ? _c('block', [_c('wx-parse-video', {
    attrs: {
      "node": _vm.node
    }
  })], 1) : (_vm.node.tag == 'audio') ? _c('block', [_c('wx-parse-audio', {
    attrs: {
      "node": _vm.node
    }
  })], 1) : (_vm.node.tag == 'img') ? _c('block', [_c('wx-parse-img', {
    attrs: {
      "node": _vm.node
    }
  })], 1) : (_vm.node.tag == 'a') ? _c('block', [_c('view', {
    class: _vm.node.classStr,
    style: _vm.node.styleStr,
    attrs: {
      "dataHref": _vm.node.attr.href
    },
    on: {
      "click": _vm.wxParseATap
    }
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))]) : (_vm.node.tag == 'br') ? _c('block', [_c('text', [_vm._v("\\n")])]) : _c('block', [_c('view', {
    class: _vm.node.classStr,
    style: _vm.node.styleStr
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))])], 1) : (_vm.node.node == 'text') ? _c('block', [_vm._v(_vm._s(_vm.node.text))]) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-38bf895e!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate1.vue":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-38bf895e!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:/helloUniapp/news/components/wxParse/components/wxParseTemplate1.vue ***!
  \******************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('view', [(_vm.node.node == 'element') ? _c('block', [(_vm.node.tag == 'button') ? _c('block', [_c('button', {
    attrs: {
      "type": "default",
      "size": "mini"
    }
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))], 1) : (_vm.node.tag == 'li') ? _c('block', [_c('view', {
    class: _vm.node.classStr,
    style: _vm.node.styleStr
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))]) : (_vm.node.tag == 'video') ? _c('block', [_c('wx-parse-video', {
    attrs: {
      "node": _vm.node
    }
  })], 1) : (_vm.node.tag == 'audio') ? _c('block', [_c('wx-parse-audio', {
    attrs: {
      "node": _vm.node
    }
  })], 1) : (_vm.node.tag == 'img') ? _c('block', [_c('wx-parse-img', {
    attrs: {
      "node": _vm.node
    }
  })], 1) : (_vm.node.tag == 'a') ? _c('block', [_c('view', {
    class: _vm.node.classStr,
    style: _vm.node.styleStr,
    attrs: {
      "dataHref": _vm.node.attr.href
    },
    on: {
      "click": _vm.wxParseATap
    }
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))]) : (_vm.node.tag == 'br') ? _c('block', [_c('text', [_vm._v("\\n")])]) : _c('block', [_c('view', {
    class: _vm.node.classStr,
    style: _vm.node.styleStr
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))])], 1) : (_vm.node.node == 'text') ? _c('block', [_vm._v(_vm._s(_vm.node.text))]) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-38dbb860!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate0.vue":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-38dbb860!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:/helloUniapp/news/components/wxParse/components/wxParseTemplate0.vue ***!
  \******************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('view', [(_vm.node.node == 'element') ? _c('block', [(_vm.node.tag == 'button') ? _c('block', [_c('button', {
    attrs: {
      "type": "default",
      "size": "mini"
    }
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))], 1) : (_vm.node.tag == 'li') ? _c('block', [_c('view', {
    class: _vm.node.classStr,
    style: _vm.node.styleStr
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))]) : (_vm.node.tag == 'video') ? _c('block', [_c('wx-parse-video', {
    attrs: {
      "node": _vm.node
    }
  })], 1) : (_vm.node.tag == 'audio') ? _c('block', [_c('wx-parse-audio', {
    attrs: {
      "node": _vm.node
    }
  })], 1) : (_vm.node.tag == 'img') ? _c('block', [_c('wx-parse-img', {
    attrs: {
      "node": _vm.node
    }
  })], 1) : (_vm.node.tag == 'a') ? _c('block', [_c('view', {
    class: _vm.node.classStr,
    style: _vm.node.styleStr,
    attrs: {
      "dataHref": _vm.node.attr.href
    },
    on: {
      "click": _vm.wxParseATap
    }
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))]) : (_vm.node.tag == 'table') ? _c('block', [_c('view', {
    staticClass: ["table"],
    class: _vm.node.classStr,
    style: _vm.node.styleStr
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))]) : (_vm.node.tag == 'br') ? _c('block', [_c('text', [_vm._v("\\n")])]) : _c('block', [_c('view', {
    class: _vm.node.classStr,
    style: _vm.node.styleStr
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))])], 1) : (_vm.node.node == 'text') ? _c('block', [_vm._v(_vm._s(_vm.node.text))]) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-5ad81bd5!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseVideo.vue":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-5ad81bd5!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:/helloUniapp/news/components/wxParse/components/wxParseVideo.vue ***!
  \**************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('view', {
    class: _vm.node.classStr,
    style: _vm.node.styleStr
  }, [_c('video', {
    staticClass: ["video-video"],
    class: _vm.node.classStr,
    attrs: {
      "src": _vm.node.attr.src
    }
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-766f38c6!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseImg.vue":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-766f38c6!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:/helloUniapp/news/components/wxParse/components/wxParseImg.vue ***!
  \************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('image', {
    class: _vm.node.classStr,
    style: _vm.newStyleStr || _vm.node.styleStr,
    attrs: {
      "mode": _vm.node.attr.mode,
      "lazyLoad": _vm.node.attr.lazyLoad,
      "dataSrc": _vm.node.attr.src,
      "src": _vm.node.attr.src
    },
    on: {
      "tap": _vm.wxParseImgTap,
      "load": _vm.wxParseImgLoad
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-c8677372!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:\\helloUniapp\\news\\pages\\specia\\index.nvue":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-c8677372!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:/helloUniapp/news/pages/specia/index.nvue ***!
  \***************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('uni-tabs', {
    attrs: {
      "index": _vm.tabIndex
    },
    on: {
      "change": _vm.changeTab
    }
  }, [_c('uni-tab-bar', _vm._l((_vm.tabBars), function(tabBar, index) {
    return _c('div', {
      key: index,
      ref: tabBar.id + index,
      refInFor: true,
      staticClass: ["tab-bar-item"]
    }, [_c('text', {
      staticClass: ["tab-bar-title"],
      class: [_vm.tabIndex === index ? 'active' : '']
    }, [_vm._v(_vm._s(tabBar.catname))])])
  })), _c('uni-tab-content', _vm._l((_vm.newsList), function(tabItem, tabIndex) {
    return _c('list', {
      key: tabIndex,
      staticClass: ["list"],
      attrs: {
        "loadmoreoffset": "10"
      },
      on: {
        "loadmore": function($event) {
          _vm.loadMore(tabIndex)
        }
      }
    }, [_c('refresh', {
      staticClass: ["refresh"],
      attrs: {
        "display": _vm.refreshing ? 'show' : 'hide'
      },
      on: {
        "refresh": _vm.onRefresh,
        "pullingdown": _vm.onPullingDown
      }
    }, [_c('text', {
      staticClass: ["refresh-text"]
    }, [_vm._v(_vm._s(_vm.refreshText))])]), _vm._l((tabItem.data), function(newsItem, newsIndex) {
      return _c('cell', {
        key: newsIndex,
        appendAsTree: true,
        attrs: {
          "append": "tree"
        }
      }, [_c('uni-media-list', {
        attrs: {
          "data": newsItem
        },
        on: {
          "close": function($event) {
            _vm.dislike(tabIndex, newsIndex)
          },
          "click": function($event) {
            _vm.goDetail(newsItem)
          }
        }
      })], 1)
    }), _c('cell', {
      staticClass: ["loadmore"],
      appendAsTree: true,
      attrs: {
        "append": "tree"
      }
    }, [_c('text', {
      staticClass: ["loadmore-text"]
    }, [_vm._v(_vm._s(tabItem.loadingText))])])], 2)
  }))], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-df1e7ea0!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate11.vue":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-df1e7ea0!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:/helloUniapp/news/components/wxParse/components/wxParseTemplate11.vue ***!
  \*******************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('view', [(_vm.node.node == 'element') ? _c('block', [(_vm.node.tag == 'button') ? _c('block', [_c('button', {
    attrs: {
      "type": "default",
      "size": "mini"
    }
  })], 1) : (_vm.node.tag == 'li') ? _c('block', [_c('view', {
    class: _vm.node.classStr,
    style: _vm.node.styleStr
  }, [_vm._v("\n\t\t\t\t" + _vm._s(_vm.node.text) + "\n\t\t\t")])]) : (_vm.node.tag == 'video') ? _c('block', [_c('wx-parse-video', {
    attrs: {
      "node": _vm.node
    }
  })], 1) : (_vm.node.tag == 'audio') ? _c('block', [_c('wx-parse-audio', {
    attrs: {
      "node": _vm.node
    }
  })], 1) : (_vm.node.tag == 'img') ? _c('block', [_c('wx-parse-img', {
    attrs: {
      "node": _vm.node
    }
  })], 1) : (_vm.node.tag == 'a') ? _c('block', [_c('view', {
    class: _vm.node.classStr,
    style: _vm.node.styleStr,
    attrs: {
      "dataHref": _vm.node.attr.href
    },
    on: {
      "click": _vm.wxParseATap
    }
  }, [_vm._v("\n\t\t\t\t" + _vm._s(_vm.node.text) + "\n\t\t\t")])]) : (_vm.node.tag == 'br') ? _c('block', [_c('text', [_vm._v("\\n")])]) : _c('block', [_c('view', {
    class: _vm.node.classStr,
    style: _vm.node.styleStr
  }, [_vm._v("\n\t\t\t\t" + _vm._s(_vm.node.text) + "\n\t\t\t")])])], 1) : (_vm.node.node == 'text') ? _c('block', [_vm._v(_vm._s(_vm.node.text))]) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-df3aada2!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate10.vue":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-df3aada2!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:/helloUniapp/news/components/wxParse/components/wxParseTemplate10.vue ***!
  \*******************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('view', [(_vm.node.node == 'element') ? _c('block', [(_vm.node.tag == 'button') ? _c('block', [_c('button', {
    attrs: {
      "type": "default",
      "size": "mini"
    }
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))], 1) : (_vm.node.tag == 'li') ? _c('block', [_c('view', {
    class: _vm.node.classStr,
    style: _vm.node.styleStr
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))]) : (_vm.node.tag == 'video') ? _c('block', [_c('wx-parse-video', {
    attrs: {
      "node": _vm.node
    }
  })], 1) : (_vm.node.tag == 'audio') ? _c('block', [_c('wx-parse-audio', {
    attrs: {
      "node": _vm.node
    }
  })], 1) : (_vm.node.tag == 'img') ? _c('block', [_c('wx-parse-img', {
    attrs: {
      "node": _vm.node
    }
  })], 1) : (_vm.node.tag == 'a') ? _c('block', [_c('view', {
    class: _vm.node.classStr,
    style: _vm.node.styleStr,
    attrs: {
      "dataHref": _vm.node.attr.href
    },
    on: {
      "click": _vm.wxParseATap
    }
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))]) : (_vm.node.tag == 'br') ? _c('block', [_c('text', [_vm._v("\\n")])]) : _c('block', [_c('view', {
    class: _vm.node.classStr,
    style: _vm.node.styleStr
  }, _vm._l((_vm.node.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wx-parse-template', {
      attrs: {
        "node": node
      }
    })], 1)
  }))])], 1) : (_vm.node.node == 'text') ? _c('block', [_vm._v(_vm._s(_vm.node.text))]) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-f2b01f50!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:\\helloUniapp\\news\\components\\wxParse\\wxParse.vue":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-f2b01f50!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:/helloUniapp/news/components/wxParse/wxParse.vue ***!
  \**********************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (!_vm.loading) ? _c('div', {
    staticClass: ["wxParse"],
    class: _vm.className
  }, _vm._l((_vm.nodes), function(node, index) {
    return _c('block', {
      key: index
    }, [_c('wxParseTemplate', {
      attrs: {
        "node": node
      }
    })], 1)
  })) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ "F:\\helloUniapp\\news\\common\\util.js":
/*!******************************************!*\
  !*** F:/helloUniapp/news/common/util.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.friendlyDate = friendlyDate;function friendlyDate(timestamp) {
  var formats = {
    'year': '%n% 年前',
    'month': '%n% 月前',
    'day': '%n% 天前',
    'hour': '%n% 小时前',
    'minute': '%n% 分钟前',
    'second': '刚刚' };


  var now = Date.now();
  //console.log(now);
  var seconds = Math.floor(now / 1000) - timestamp;
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  var days = Math.floor(hours / 24);
  var months = Math.floor(days / 30);
  var years = Math.floor(months / 12);

  var diffType = '';
  var diffValue = 0;
  if (years > 0) {
    diffType = 'year';
    diffValue = years;
  } else {
    if (months > 0) {
      diffType = 'month';
      diffValue = months;
    } else {
      if (days > 0) {
        diffType = 'day';
        diffValue = days;
      } else {
        if (hours > 0) {
          diffType = 'hour';
          diffValue = hours;
        } else {
          if (minutes > 0) {
            diffType = 'minute';
            diffValue = minutes;
          } else {
            diffType = 'second';
            diffValue = seconds === 0 ? seconds = 1 : seconds;
          }
        }
      }
    }
  }
  return formats[diffType].replace('%n%', diffValue);
}

/***/ }),

/***/ "F:\\helloUniapp\\news\\components\\uni-media-list\\uni-media-list.nvue":
/*!*************************************************************************!*\
  !*** F:/helloUniapp/news/components/uni-media-list/uni-media-list.nvue ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(/*! !./node_modules/weex-vue-loader/lib/style-loader!./node_modules/weex-vue-loader/lib/style-rewriter?id=data-v-10f1c032!./node_modules/weex-vue-loader/lib/selector?type=styles&index=0!./uni-media-list.nvue */ "./node_modules/weex-vue-loader/lib/style-loader.js!./node_modules/weex-vue-loader/lib/style-rewriter.js?id=data-v-10f1c032!./node_modules/weex-vue-loader/lib/selector.js?type=styles&index=0!F:\\helloUniapp\\news\\components\\uni-media-list\\uni-media-list.nvue")
)

/* script */
__vue_exports__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/script-loader!babel-loader!./node_modules/weex-vue-loader/lib/selector?type=script&index=0!./uni-media-list.nvue */ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\uni-media-list\\uni-media-list.nvue")

/* template */
var __vue_template__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/template-compiler?id=data-v-10f1c032!./node_modules/weex-vue-loader/lib/selector?type=template&index=0!./uni-media-list.nvue */ "./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-10f1c032!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:\\helloUniapp\\news\\components\\uni-media-list\\uni-media-list.nvue")
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "F:\\helloUniapp\\news\\components\\uni-media-list\\uni-media-list.nvue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-10f1c032"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),

/***/ "F:\\helloUniapp\\news\\components\\uni-tab-bar\\uni-tab-bar.nvue":
/*!*******************************************************************!*\
  !*** F:/helloUniapp/news/components/uni-tab-bar/uni-tab-bar.nvue ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* script */
__vue_exports__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/script-loader!babel-loader!./node_modules/weex-vue-loader/lib/selector?type=script&index=0!./uni-tab-bar.nvue */ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\uni-tab-bar\\uni-tab-bar.nvue")
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "F:\\helloUniapp\\news\\components\\uni-tab-bar\\uni-tab-bar.nvue"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),

/***/ "F:\\helloUniapp\\news\\components\\uni-tab-content\\uni-tab-content.nvue":
/*!***************************************************************************!*\
  !*** F:/helloUniapp/news/components/uni-tab-content/uni-tab-content.nvue ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* script */
__vue_exports__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/script-loader!babel-loader!./node_modules/weex-vue-loader/lib/selector?type=script&index=0!./uni-tab-content.nvue */ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\uni-tab-content\\uni-tab-content.nvue")
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "F:\\helloUniapp\\news\\components\\uni-tab-content\\uni-tab-content.nvue"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),

/***/ "F:\\helloUniapp\\news\\components\\uni-tabs\\uni-tabs.nvue":
/*!*************************************************************!*\
  !*** F:/helloUniapp/news/components/uni-tabs/uni-tabs.nvue ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* script */
__vue_exports__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/script-loader!babel-loader!./node_modules/weex-vue-loader/lib/selector?type=script&index=0!./uni-tabs.nvue */ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\uni-tabs\\uni-tabs.nvue")
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "F:\\helloUniapp\\news\\components\\uni-tabs\\uni-tabs.nvue"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),

/***/ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseAudio.vue":
/*!**************************************************************************!*\
  !*** F:/helloUniapp/news/components/wxParse/components/wxParseAudio.vue ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* script */
__vue_exports__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/script-loader!babel-loader!./node_modules/weex-vue-loader/lib/selector?type=script&index=0!./wxParseAudio.vue */ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseAudio.vue")

/* template */
var __vue_template__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/template-compiler?id=data-v-169c7db0!./node_modules/weex-vue-loader/lib/selector?type=template&index=0!./wxParseAudio.vue */ "./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-169c7db0!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseAudio.vue")
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseAudio.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),

/***/ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseImg.vue":
/*!************************************************************************!*\
  !*** F:/helloUniapp/news/components/wxParse/components/wxParseImg.vue ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* script */
__vue_exports__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/script-loader!babel-loader!./node_modules/weex-vue-loader/lib/selector?type=script&index=0!./wxParseImg.vue */ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseImg.vue")

/* template */
var __vue_template__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/template-compiler?id=data-v-766f38c6!./node_modules/weex-vue-loader/lib/selector?type=template&index=0!./wxParseImg.vue */ "./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-766f38c6!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseImg.vue")
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseImg.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),

/***/ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate0.vue":
/*!******************************************************************************!*\
  !*** F:/helloUniapp/news/components/wxParse/components/wxParseTemplate0.vue ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* script */
__vue_exports__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/script-loader!babel-loader!./node_modules/weex-vue-loader/lib/selector?type=script&index=0!./wxParseTemplate0.vue */ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate0.vue")

/* template */
var __vue_template__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/template-compiler?id=data-v-38dbb860!./node_modules/weex-vue-loader/lib/selector?type=template&index=0!./wxParseTemplate0.vue */ "./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-38dbb860!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate0.vue")
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate0.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),

/***/ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate1.vue":
/*!******************************************************************************!*\
  !*** F:/helloUniapp/news/components/wxParse/components/wxParseTemplate1.vue ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* script */
__vue_exports__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/script-loader!babel-loader!./node_modules/weex-vue-loader/lib/selector?type=script&index=0!./wxParseTemplate1.vue */ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate1.vue")

/* template */
var __vue_template__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/template-compiler?id=data-v-38bf895e!./node_modules/weex-vue-loader/lib/selector?type=template&index=0!./wxParseTemplate1.vue */ "./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-38bf895e!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate1.vue")
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate1.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),

/***/ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate10.vue":
/*!*******************************************************************************!*\
  !*** F:/helloUniapp/news/components/wxParse/components/wxParseTemplate10.vue ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* script */
__vue_exports__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/script-loader!babel-loader!./node_modules/weex-vue-loader/lib/selector?type=script&index=0!./wxParseTemplate10.vue */ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate10.vue")

/* template */
var __vue_template__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/template-compiler?id=data-v-df3aada2!./node_modules/weex-vue-loader/lib/selector?type=template&index=0!./wxParseTemplate10.vue */ "./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-df3aada2!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate10.vue")
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate10.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),

/***/ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate11.vue":
/*!*******************************************************************************!*\
  !*** F:/helloUniapp/news/components/wxParse/components/wxParseTemplate11.vue ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* script */
__vue_exports__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/script-loader!babel-loader!./node_modules/weex-vue-loader/lib/selector?type=script&index=0!./wxParseTemplate11.vue */ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate11.vue")

/* template */
var __vue_template__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/template-compiler?id=data-v-df1e7ea0!./node_modules/weex-vue-loader/lib/selector?type=template&index=0!./wxParseTemplate11.vue */ "./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-df1e7ea0!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate11.vue")
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate11.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),

/***/ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate2.vue":
/*!******************************************************************************!*\
  !*** F:/helloUniapp/news/components/wxParse/components/wxParseTemplate2.vue ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* script */
__vue_exports__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/script-loader!babel-loader!./node_modules/weex-vue-loader/lib/selector?type=script&index=0!./wxParseTemplate2.vue */ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate2.vue")

/* template */
var __vue_template__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/template-compiler?id=data-v-38a35a5c!./node_modules/weex-vue-loader/lib/selector?type=template&index=0!./wxParseTemplate2.vue */ "./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-38a35a5c!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate2.vue")
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate2.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),

/***/ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate3.vue":
/*!******************************************************************************!*\
  !*** F:/helloUniapp/news/components/wxParse/components/wxParseTemplate3.vue ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* script */
__vue_exports__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/script-loader!babel-loader!./node_modules/weex-vue-loader/lib/selector?type=script&index=0!./wxParseTemplate3.vue */ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate3.vue")

/* template */
var __vue_template__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/template-compiler?id=data-v-38872b5a!./node_modules/weex-vue-loader/lib/selector?type=template&index=0!./wxParseTemplate3.vue */ "./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-38872b5a!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate3.vue")
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate3.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),

/***/ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate4.vue":
/*!******************************************************************************!*\
  !*** F:/helloUniapp/news/components/wxParse/components/wxParseTemplate4.vue ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* script */
__vue_exports__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/script-loader!babel-loader!./node_modules/weex-vue-loader/lib/selector?type=script&index=0!./wxParseTemplate4.vue */ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate4.vue")

/* template */
var __vue_template__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/template-compiler?id=data-v-386afc58!./node_modules/weex-vue-loader/lib/selector?type=template&index=0!./wxParseTemplate4.vue */ "./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-386afc58!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate4.vue")
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate4.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),

/***/ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate5.vue":
/*!******************************************************************************!*\
  !*** F:/helloUniapp/news/components/wxParse/components/wxParseTemplate5.vue ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* script */
__vue_exports__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/script-loader!babel-loader!./node_modules/weex-vue-loader/lib/selector?type=script&index=0!./wxParseTemplate5.vue */ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate5.vue")

/* template */
var __vue_template__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/template-compiler?id=data-v-384ecd56!./node_modules/weex-vue-loader/lib/selector?type=template&index=0!./wxParseTemplate5.vue */ "./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-384ecd56!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate5.vue")
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate5.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),

/***/ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate6.vue":
/*!******************************************************************************!*\
  !*** F:/helloUniapp/news/components/wxParse/components/wxParseTemplate6.vue ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* script */
__vue_exports__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/script-loader!babel-loader!./node_modules/weex-vue-loader/lib/selector?type=script&index=0!./wxParseTemplate6.vue */ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate6.vue")

/* template */
var __vue_template__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/template-compiler?id=data-v-38329e54!./node_modules/weex-vue-loader/lib/selector?type=template&index=0!./wxParseTemplate6.vue */ "./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-38329e54!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate6.vue")
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate6.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),

/***/ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate7.vue":
/*!******************************************************************************!*\
  !*** F:/helloUniapp/news/components/wxParse/components/wxParseTemplate7.vue ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* script */
__vue_exports__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/script-loader!babel-loader!./node_modules/weex-vue-loader/lib/selector?type=script&index=0!./wxParseTemplate7.vue */ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate7.vue")

/* template */
var __vue_template__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/template-compiler?id=data-v-38166f52!./node_modules/weex-vue-loader/lib/selector?type=template&index=0!./wxParseTemplate7.vue */ "./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-38166f52!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate7.vue")
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate7.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),

/***/ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate8.vue":
/*!******************************************************************************!*\
  !*** F:/helloUniapp/news/components/wxParse/components/wxParseTemplate8.vue ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* script */
__vue_exports__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/script-loader!babel-loader!./node_modules/weex-vue-loader/lib/selector?type=script&index=0!./wxParseTemplate8.vue */ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate8.vue")

/* template */
var __vue_template__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/template-compiler?id=data-v-37fa4050!./node_modules/weex-vue-loader/lib/selector?type=template&index=0!./wxParseTemplate8.vue */ "./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-37fa4050!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate8.vue")
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate8.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),

/***/ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate9.vue":
/*!******************************************************************************!*\
  !*** F:/helloUniapp/news/components/wxParse/components/wxParseTemplate9.vue ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* script */
__vue_exports__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/script-loader!babel-loader!./node_modules/weex-vue-loader/lib/selector?type=script&index=0!./wxParseTemplate9.vue */ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate9.vue")

/* template */
var __vue_template__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/template-compiler?id=data-v-37de114e!./node_modules/weex-vue-loader/lib/selector?type=template&index=0!./wxParseTemplate9.vue */ "./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-37de114e!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate9.vue")
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseTemplate9.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),

/***/ "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseVideo.vue":
/*!**************************************************************************!*\
  !*** F:/helloUniapp/news/components/wxParse/components/wxParseVideo.vue ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* script */
__vue_exports__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/script-loader!babel-loader!./node_modules/weex-vue-loader/lib/selector?type=script&index=0!./wxParseVideo.vue */ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseVideo.vue")

/* template */
var __vue_template__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/template-compiler?id=data-v-5ad81bd5!./node_modules/weex-vue-loader/lib/selector?type=template&index=0!./wxParseVideo.vue */ "./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-5ad81bd5!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseVideo.vue")
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "F:\\helloUniapp\\news\\components\\wxParse\\components\\wxParseVideo.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),

/***/ "F:\\helloUniapp\\news\\components\\wxParse\\libs\\html2json.js":
/*!****************************************************************!*\
  !*** F:/helloUniapp/news/components/wxParse/libs/html2json.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;













var _wxDiscode = _interopRequireDefault(__webpack_require__(/*! ./wxDiscode */ "F:\\helloUniapp\\news\\components\\wxParse\\libs\\wxDiscode.js"));
var _htmlparser = _interopRequireDefault(__webpack_require__(/*! ./htmlparser */ "F:\\helloUniapp\\news\\components\\wxParse\\libs\\htmlparser.js"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                 * html2Json 改造来自: https://github.com/Jxck/html2json
                                                                                                                                                                 *
                                                                                                                                                                 *
                                                                                                                                                                 * author: Di (微信小程序开发工程师)
                                                                                                                                                                 * organization: WeAppDev(微信小程序开发论坛)(http://weappdev.com)
                                                                                                                                                                 *               垂直微信小程序开发交流社区
                                                                                                                                                                 *
                                                                                                                                                                 * github地址: https://github.com/icindy/wxParse
                                                                                                                                                                 *
                                                                                                                                                                 * for: 微信小程序富文本解析
                                                                                                                                                                 * detail : http://weappdev.com/t/wxparse-alpha0-1-html-markdown/184
                                                                                                                                                                 */function makeMap(str) {var obj = {};var items = str.split(',');for (var i = 0; i < items.length; i += 1) {obj[items[i]] = true;}return obj;} // Block Elements - HTML 5
var block = makeMap('br,code,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video'); // Inline Elements - HTML 5
var inline = makeMap('a,abbr,acronym,applet,b,basefont,bdo,big,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var');
// Elements that you can, intentionally, leave open
// (and which close themselves)
var closeSelf = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr');

function removeDOCTYPE(html) {
  var isDocument = /<body.*>([^]*)<\/body>/.test(html);
  return isDocument ? RegExp.$1 : html;
}

function trimHtml(html) {
  return html.
  replace(/<!--.*?-->/gi, '').
  replace(/\/\*.*?\*\//gi, '').
  replace(/[ ]+</gi, '<').
  replace(/<script[^]*<\/script>/gi, '').
  replace(/<style[^]*<\/style>/gi, '');
}

function getScreenInfo() {
  var screen = {};
  wx.getSystemInfo({
    success: function success(res) {
      screen.width = res.windowWidth;
      screen.height = res.windowHeight;
    } });

  return screen;
}

function html2json(html, customHandler, imageProp, host) {
  // 处理字符串
  html = removeDOCTYPE(html);
  html = trimHtml(html);
  html = _wxDiscode.default.strDiscode(html);
  // 生成node节点
  var bufArray = [];
  var results = {
    nodes: [],
    imageUrls: [] };


  function Node(tag) {
    this.node = 'element';
    this.tag = tag;
  }
  Node.prototype.$screen = getScreenInfo();
  Node.prototype.$host = host;

  (0, _htmlparser.default)(html, {
    start: function start(tag, attrs, unary) {
      // node for this element
      var node = new Node(tag);

      if (bufArray.length !== 0) {
        var parent = bufArray[0];
        if (parent.nodes === undefined) {
          parent.nodes = [];
        }
      }

      if (block[tag]) {
        node.tagType = 'block';
      } else if (inline[tag]) {
        node.tagType = 'inline';
      } else if (closeSelf[tag]) {
        node.tagType = 'closeSelf';
      }

      node.attr = attrs.reduce(function (pre, attr) {var
        name = attr.name;var
        value = attr.value;
        if (name === 'class') {
          node.classStr = value;
        }
        // has multi attibutes
        // make it array of attribute
        if (name === 'style') {
          node.styleStr = value;
        }
        if (value.match(/ /)) {
          value = value.split(' ');
        }

        // if attr already exists
        // merge it
        if (pre[name]) {
          if (Array.isArray(pre[name])) {
            // already array, push to last
            pre[name].push(value);
          } else {
            // single value, make it array
            pre[name] = [pre[name], value];
          }
        } else {
          // not exist, put it
          pre[name] = value;
        }

        return pre;
      }, {});

      // 优化样式相关属性
      if (node.classStr) {
        node.classStr += " ".concat(node.tag);
      } else {
        node.classStr = node.tag;
      }
      if (node.tagType === 'inline') {
        node.classStr += ' inline';
      }

      // 对img添加额外数据
      if (node.tag === 'img') {
        var imgUrl = node.attr.src;
        imgUrl = _wxDiscode.default.urlToHttpUrl(imgUrl, imageProp.domain);
        Object.assign(node.attr, imageProp, {
          src: imgUrl || '' });

        if (imgUrl) {
          results.imageUrls.push(imgUrl);
        }
      }

      // 处理a标签属性
      if (node.tag === 'a') {
        node.attr.href = node.attr.href || '';
      }

      // 处理font标签样式属性
      if (node.tag === 'font') {
        var fontSize = [
        'x-small',
        'small',
        'medium',
        'large',
        'x-large',
        'xx-large',
        '-webkit-xxx-large'];

        var styleAttrs = {
          color: 'color',
          face: 'font-family',
          size: 'font-size' };

        if (!node.styleStr) node.styleStr = '';
        Object.keys(styleAttrs).forEach(function (key) {
          if (node.attr[key]) {
            var value = key === 'size' ? fontSize[node.attr[key] - 1] : node.attr[key];
            node.styleStr += "".concat(styleAttrs[key], ": ").concat(value, ";");
          }
        });
      }

      // 临时记录source资源
      if (node.tag === 'source') {
        results.source = node.attr.src;
      }

      if (customHandler.start) {
        customHandler.start(node, results);
      }

      if (unary) {
        // if this tag doesn't have end tag
        // like <img src="hoge.png"/>
        // add to parents
        var _parent = bufArray[0] || results;
        if (_parent.nodes === undefined) {
          _parent.nodes = [];
        }
        _parent.nodes.push(node);
      } else {
        bufArray.unshift(node);
      }
    },
    end: function end(tag) {
      // merge into parent tag
      var node = bufArray.shift();
      if (node.tag !== tag) {
        console.error('invalid state: mismatch end tag');
      }

      // 当有缓存source资源时于于video补上src资源
      if (node.tag === 'video' && results.source) {
        node.attr.src = results.source;
        delete results.source;
      }

      if (customHandler.end) {
        customHandler.end(node, results);
      }

      if (bufArray.length === 0) {
        results.nodes.push(node);
      } else {
        var parent = bufArray[0];
        if (!parent.nodes) {
          parent.nodes = [];
        }
        parent.nodes.push(node);
      }
    },
    chars: function chars(text) {
      if (!text.trim()) return;

      var node = {
        node: 'text',
        text: text };


      if (customHandler.chars) {
        customHandler.chars(node, results);
      }

      if (bufArray.length === 0) {
        results.nodes.push(node);
      } else {
        var parent = bufArray[0];
        if (parent.nodes === undefined) {
          parent.nodes = [];
        }
        parent.nodes.push(node);
      }
    } });


  return results;
}var _default =

html2json;exports.default = _default;

/***/ }),

/***/ "F:\\helloUniapp\\news\\components\\wxParse\\libs\\htmlparser.js":
/*!*****************************************************************!*\
  !*** F:/helloUniapp/news/components/wxParse/libs/htmlparser.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      *
                                                                                                      * htmlParser改造自: https://github.com/blowsie/Pure-JavaScript-HTML5-Parser
                                                                                                      *
                                                                                                      * author: Di (微信小程序开发工程师)
                                                                                                      * organization: WeAppDev(微信小程序开发论坛)(http://weappdev.com)
                                                                                                      *               垂直微信小程序开发交流社区
                                                                                                      *
                                                                                                      * github地址: https://github.com/icindy/wxParse
                                                                                                      *
                                                                                                      * for: 微信小程序富文本解析
                                                                                                      * detail : http://weappdev.com/t/wxparse-alpha0-1-html-markdown/184
                                                                                                      */
// Regular Expressions for parsing tags and attributes

var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z0-9_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
var endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/;
var attr = /([a-zA-Z0-9_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;

function makeMap(str) {
  var obj = {};
  var items = str.split(',');
  for (var i = 0; i < items.length; i += 1) {obj[items[i]] = true;}
  return obj;
}

// Empty Elements - HTML 5
var empty = makeMap('area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr');

// Block Elements - HTML 5
var block = makeMap('address,code,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video');

// Inline Elements - HTML 5
var inline = makeMap('a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var');

// Elements that you can, intentionally, leave open
// (and which close themselves)
var closeSelf = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr');

// Attributes that have their values filled in disabled="disabled"
var fillAttrs = makeMap('checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected');

function HTMLParser(html, handler) {
  var index;
  var chars;
  var match;
  var last = html;
  var stack = [];

  stack.last = function () {return stack[stack.length - 1];};

  function parseEndTag(tag, tagName) {
    // If no tag name is provided, clean shop
    var pos;
    if (!tagName) {
      pos = 0;
    } else {
      // Find the closest opened tag of the same type
      tagName = tagName.toLowerCase();
      for (pos = stack.length - 1; pos >= 0; pos -= 1) {
        if (stack[pos] === tagName) break;
      }
    }
    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i -= 1) {
        if (handler.end) handler.end(stack[i]);
      }

      // Remove the open elements from the stack
      stack.length = pos;
    }
  }

  function parseStartTag(tag, tagName, rest, unary) {
    tagName = tagName.toLowerCase();

    if (block[tagName]) {
      while (stack.last() && inline[stack.last()]) {
        parseEndTag('', stack.last());
      }
    }

    if (closeSelf[tagName] && stack.last() === tagName) {
      parseEndTag('', tagName);
    }

    unary = empty[tagName] || !!unary;

    if (!unary) stack.push(tagName);

    if (handler.start) {
      var attrs = [];

      rest.replace(attr, function genAttr(matches, name) {
        var value = arguments[2] || arguments[3] || arguments[4] || (fillAttrs[name] ? name : '');

        attrs.push({
          name: name,
          value: value,
          escaped: value.replace(/(^|[^\\])"/g, '$1\\"') // "
        });
      });

      if (handler.start) {
        handler.start(tagName, attrs, unary);
      }
    }
  }

  while (html) {
    chars = true;

    if (html.indexOf('</') === 0) {
      match = html.match(endTag);

      if (match) {
        html = html.substring(match[0].length);
        match[0].replace(endTag, parseEndTag);
        chars = false;
      }

      // start tag
    } else if (html.indexOf('<') === 0) {
      match = html.match(startTag);

      if (match) {
        html = html.substring(match[0].length);
        match[0].replace(startTag, parseStartTag);
        chars = false;
      }
    }

    if (chars) {
      index = html.indexOf('<');
      var text = '';
      while (index === 0) {
        text += '<';
        html = html.substring(1);
        index = html.indexOf('<');
      }
      text += index < 0 ? html : html.substring(0, index);
      html = index < 0 ? '' : html.substring(index);

      if (handler.chars) handler.chars(text);
    }

    if (html === last) throw new Error("Parse Error: ".concat(html));
    last = html;
  }

  // Clean up any remaining tags
  parseEndTag();
}var _default =

HTMLParser;exports.default = _default;

/***/ }),

/***/ "F:\\helloUniapp\\news\\components\\wxParse\\libs\\wxDiscode.js":
/*!****************************************************************!*\
  !*** F:/helloUniapp/news/components/wxParse/libs/wxDiscode.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // HTML 支持的数学符号
function strNumDiscode(str) {
  str = str.replace(/&forall;/g, '∀');
  str = str.replace(/&part;/g, '∂');
  str = str.replace(/&exist;/g, '∃');
  str = str.replace(/&empty;/g, '∅');
  str = str.replace(/&nabla;/g, '∇');
  str = str.replace(/&isin;/g, '∈');
  str = str.replace(/&notin;/g, '∉');
  str = str.replace(/&ni;/g, '∋');
  str = str.replace(/&prod;/g, '∏');
  str = str.replace(/&sum;/g, '∑');
  str = str.replace(/&minus;/g, '−');
  str = str.replace(/&lowast;/g, '∗');
  str = str.replace(/&radic;/g, '√');
  str = str.replace(/&prop;/g, '∝');
  str = str.replace(/&infin;/g, '∞');
  str = str.replace(/&ang;/g, '∠');
  str = str.replace(/&and;/g, '∧');
  str = str.replace(/&or;/g, '∨');
  str = str.replace(/&cap;/g, '∩');
  str = str.replace(/&cup;/g, '∪');
  str = str.replace(/&int;/g, '∫');
  str = str.replace(/&there4;/g, '∴');
  str = str.replace(/&sim;/g, '∼');
  str = str.replace(/&cong;/g, '≅');
  str = str.replace(/&asymp;/g, '≈');
  str = str.replace(/&ne;/g, '≠');
  str = str.replace(/&le;/g, '≤');
  str = str.replace(/&ge;/g, '≥');
  str = str.replace(/&sub;/g, '⊂');
  str = str.replace(/&sup;/g, '⊃');
  str = str.replace(/&nsub;/g, '⊄');
  str = str.replace(/&sube;/g, '⊆');
  str = str.replace(/&supe;/g, '⊇');
  str = str.replace(/&oplus;/g, '⊕');
  str = str.replace(/&otimes;/g, '⊗');
  str = str.replace(/&perp;/g, '⊥');
  str = str.replace(/&sdot;/g, '⋅');
  str = str.replace(/&plusmn;/g, "±");
  str = str.replace(/&divide;/g, "÷");
  return str;
}

// HTML 支持的希腊字母
function strGreeceDiscode(str) {
  str = str.replace(/&Alpha;/g, 'Α');
  str = str.replace(/&Beta;/g, 'Β');
  str = str.replace(/&Gamma;/g, 'Γ');
  str = str.replace(/&Delta;/g, 'Δ');
  str = str.replace(/&Epsilon;/g, 'Ε');
  str = str.replace(/&Zeta;/g, 'Ζ');
  str = str.replace(/&Eta;/g, 'Η');
  str = str.replace(/&Theta;/g, 'Θ');
  str = str.replace(/&Iota;/g, 'Ι');
  str = str.replace(/&Kappa;/g, 'Κ');
  str = str.replace(/&Lambda;/g, 'Λ');
  str = str.replace(/&Mu;/g, 'Μ');
  str = str.replace(/&Nu;/g, 'Ν');
  str = str.replace(/&Xi;/g, 'Ν');
  str = str.replace(/&Omicron;/g, 'Ο');
  str = str.replace(/&Pi;/g, 'Π');
  str = str.replace(/&Rho;/g, 'Ρ');
  str = str.replace(/&Sigma;/g, 'Σ');
  str = str.replace(/&Tau;/g, 'Τ');
  str = str.replace(/&Upsilon;/g, 'Υ');
  str = str.replace(/&Phi;/g, 'Φ');
  str = str.replace(/&Chi;/g, 'Χ');
  str = str.replace(/&Psi;/g, 'Ψ');
  str = str.replace(/&Omega;/g, 'Ω');

  str = str.replace(/&alpha;/g, 'α');
  str = str.replace(/&beta;/g, 'β');
  str = str.replace(/&gamma;/g, 'γ');
  str = str.replace(/&delta;/g, 'δ');
  str = str.replace(/&epsilon;/g, 'ε');
  str = str.replace(/&zeta;/g, 'ζ');
  str = str.replace(/&eta;/g, 'η');
  str = str.replace(/&theta;/g, 'θ');
  str = str.replace(/&iota;/g, 'ι');
  str = str.replace(/&kappa;/g, 'κ');
  str = str.replace(/&lambda;/g, 'λ');
  str = str.replace(/&mu;/g, 'μ');
  str = str.replace(/&nu;/g, 'ν');
  str = str.replace(/&xi;/g, 'ξ');
  str = str.replace(/&omicron;/g, 'ο');
  str = str.replace(/&pi;/g, 'π');
  str = str.replace(/&rho;/g, 'ρ');
  str = str.replace(/&sigmaf;/g, 'ς');
  str = str.replace(/&sigma;/g, 'σ');
  str = str.replace(/&tau;/g, 'τ');
  str = str.replace(/&upsilon;/g, 'υ');
  str = str.replace(/&phi;/g, 'φ');
  str = str.replace(/&chi;/g, 'χ');
  str = str.replace(/&psi;/g, 'ψ');
  str = str.replace(/&omega;/g, 'ω');
  str = str.replace(/&thetasym;/g, 'ϑ');
  str = str.replace(/&upsih;/g, 'ϒ');
  str = str.replace(/&piv;/g, 'ϖ');
  str = str.replace(/&middot;/g, '·');
  return str;
}

function strcharacterDiscode(str) {
  // 加入常用解析
  str = str.replace(/&nbsp;/g, ' ');
  str = str.replace(/&ensp;/g, ' ');
  str = str.replace(/&emsp;/g, '　');
  str = str.replace(/&quot;/g, "'");
  str = str.replace(/&amp;/g, '&');
  str = str.replace(/&lt;/g, '<');
  str = str.replace(/&gt;/g, '>');
  str = str.replace(/&#8226;/g, '•');

  return str;
}

// HTML 支持的其他实体
function strOtherDiscode(str) {
  str = str.replace(/&OElig;/g, 'Œ');
  str = str.replace(/&oelig;/g, 'œ');
  str = str.replace(/&Scaron;/g, 'Š');
  str = str.replace(/&scaron;/g, 'š');
  str = str.replace(/&Yuml;/g, 'Ÿ');
  str = str.replace(/&fnof;/g, 'ƒ');
  str = str.replace(/&circ;/g, 'ˆ');
  str = str.replace(/&tilde;/g, '˜');
  str = str.replace(/&ensp;/g, '');
  str = str.replace(/&emsp;/g, '');
  str = str.replace(/&thinsp;/g, '');
  str = str.replace(/&zwnj;/g, '');
  str = str.replace(/&zwj;/g, '');
  str = str.replace(/&lrm;/g, '');
  str = str.replace(/&rlm;/g, '');
  str = str.replace(/&ndash;/g, '–');
  str = str.replace(/&mdash;/g, '—');
  str = str.replace(/&lsquo;/g, '‘');
  str = str.replace(/&rsquo;/g, '’');
  str = str.replace(/&sbquo;/g, '‚');
  str = str.replace(/&ldquo;/g, '“');
  str = str.replace(/&rdquo;/g, '”');
  str = str.replace(/&bdquo;/g, '„');
  str = str.replace(/&dagger;/g, '†');
  str = str.replace(/&Dagger;/g, '‡');
  str = str.replace(/&bull;/g, '•');
  str = str.replace(/&hellip;/g, '…');
  str = str.replace(/&permil;/g, '‰');
  str = str.replace(/&prime;/g, '′');
  str = str.replace(/&Prime;/g, '″');
  str = str.replace(/&lsaquo;/g, '‹');
  str = str.replace(/&rsaquo;/g, '›');
  str = str.replace(/&oline;/g, '‾');
  str = str.replace(/&euro;/g, '€');
  str = str.replace(/&trade;/g, '™');

  str = str.replace(/&larr;/g, '←');
  str = str.replace(/&uarr;/g, '↑');
  str = str.replace(/&rarr;/g, '→');
  str = str.replace(/&darr;/g, '↓');
  str = str.replace(/&harr;/g, '↔');
  str = str.replace(/&crarr;/g, '↵');
  str = str.replace(/&lceil;/g, '⌈');
  str = str.replace(/&rceil;/g, '⌉');

  str = str.replace(/&lfloor;/g, '⌊');
  str = str.replace(/&rfloor;/g, '⌋');
  str = str.replace(/&loz;/g, '◊');
  str = str.replace(/&spades;/g, '♠');
  str = str.replace(/&clubs;/g, '♣');
  str = str.replace(/&hearts;/g, '♥');

  str = str.replace(/&diams;/g, '♦');
  str = str.replace(/&#39;/g, "'");
  return str;
}

function strDiscode(str) {
  str = strNumDiscode(str);
  str = strGreeceDiscode(str);
  str = strcharacterDiscode(str);
  str = strOtherDiscode(str);
  return str;
}

function urlToHttpUrl(url, domain) {
  if (/^\/\//.test(url)) {
    return "https:".concat(url);
  } else if (/^\//.test(url)) {
    return "https://".concat(domain).concat(url);
  }
  return url;
}var _default =

{
  strDiscode: strDiscode,
  urlToHttpUrl: urlToHttpUrl };exports.default = _default;

/***/ }),

/***/ "F:\\helloUniapp\\news\\components\\wxParse\\wxParse.vue":
/*!**********************************************************!*\
  !*** F:/helloUniapp/news/components/wxParse/wxParse.vue ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* script */
__vue_exports__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/script-loader!babel-loader!./node_modules/weex-vue-loader/lib/selector?type=script&index=0!./wxParse.vue */ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\components\\wxParse\\wxParse.vue")

/* template */
var __vue_template__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/template-compiler?id=data-v-f2b01f50!./node_modules/weex-vue-loader/lib/selector?type=template&index=0!./wxParse.vue */ "./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-f2b01f50!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:\\helloUniapp\\news\\components\\wxParse\\wxParse.vue")
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "F:\\helloUniapp\\news\\components\\wxParse\\wxParse.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),

/***/ "F:\\helloUniapp\\news\\pages\\specia\\index.nvue?entry":
/*!*********************************************************!*\
  !*** F:/helloUniapp/news/pages/specia/index.nvue?entry ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(/*! !./node_modules/weex-vue-loader/lib/style-loader!./node_modules/weex-vue-loader/lib/style-rewriter?id=data-v-c8677372!./node_modules/weex-vue-loader/lib/selector?type=styles&index=0!./index.nvue */ "./node_modules/weex-vue-loader/lib/style-loader.js!./node_modules/weex-vue-loader/lib/style-rewriter.js?id=data-v-c8677372!./node_modules/weex-vue-loader/lib/selector.js?type=styles&index=0!F:\\helloUniapp\\news\\pages\\specia\\index.nvue")
)

/* script */
__vue_exports__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/script-loader!babel-loader!./node_modules/weex-vue-loader/lib/selector?type=script&index=0!./index.nvue */ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\pages\\specia\\index.nvue")

/* template */
var __vue_template__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/template-compiler?id=data-v-c8677372!./node_modules/weex-vue-loader/lib/selector?type=template&index=0!./index.nvue */ "./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-c8677372!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:\\helloUniapp\\news\\pages\\specia\\index.nvue")
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "F:\\helloUniapp\\news\\pages\\specia\\index.nvue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-c8677372"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__
module.exports.el = 'true'
new Vue(module.exports)


/***/ })

/******/ });