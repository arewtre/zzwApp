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
/******/ 	return __webpack_require__(__webpack_require__.s = "F:\\helloUniapp\\news\\pages\\cate\\index.nvue?entry");
/******/ })
/************************************************************************/
/******/ ({

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

/***/ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\pages\\cate\\index.nvue":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:/helloUniapp/news/pages/cate/index.nvue ***!
  \********************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default =
{
  data: function data() {
    return {
      // 滚动区域高度
      scrollheight: 750,
      // 活动的左侧主分类
      activemaintitel: '',
      // 滚动到区域内的指定元素
      scrollintoid: '',
      // 主分类
      maintitels: [],
      // 子项目
      subitems: [],
      data: [] };

  },
  onLoad: function onLoad() {
    // 通过网络获取json格式数据 这里是示例数据：
    this.getCate();

    // 获取设备屏幕高度 用于设置滚动条高度
    // 项目中这里从全局变量获得
    try {
      var res = uni.getSystemInfoSync();
      this.scrollheight = res.windowHeight;
    } catch (e) {
      this.scrollheight = 750;
      // error
    }
  },
  methods: {
    // 点击左侧主分类
    clickleftitem: function clickleftitem(str, idx) {
      // 实现点击左侧项目 右侧滚动至指定分类
      this.activemaintitel = str;
      this.scrollintoid = 'scrollinto-' + idx;
      // console.log(this.scrollintoid)
    },
    // 滚动时处理主导航
    scroll: function scroll(e) {var _this = this;var _loop = function _loop(

      i) {
        var s = _this.maintitels[i];
        // 					let t = uni.createSelectorQuery().select('#');
        // 					
        // 					t.fields({dataset:true, size: true, rect: true, scrollOffset: true }, data => {
        // 							console.log(JSON.stringify(data));
        // 						}).exec();

        var g = uni.createSelectorQuery().select('#scrollinto-' + i);
        g.boundingClientRect(function (data) {
          var top;
          top = data.top;
          // 判断滚动区域内元素 top距离时 切换主分类
          if (0 < top && top < _this.scrollheight * 0.2) {
            // 设置主分类
            _this.activemaintitel = s;
          }
        }).exec();}; // 循环滚动区域内的元素项 判断top位置 设置主分类切换
      for (var i = 0; i < this.maintitels.length; i++) {_loop(i);}
    },
    // 点击图片 跳转你要的页面
    clickitemhref: function clickitemhref(imghref) {
      uni.showModal({
        content: '点击了图片，内容：' + imghref });

    },
    getCate: function getCate() {var _this2 = this;
      var catedata = this.$SysCache.get("app_cate_data");
      //console.log(indexBanner);
      if (catedata && Refresh == undefined) {
        this.data = catedata;
      } else {
        uni.request({
          url: 'http://47.100.48.1/api/member/getData.php?ac=getcate',
          data: {},
          method: "POST",
          success: function success(result) {
            var res = result.data;
            if (res.code == "0000") {
              _this2.data = res.data;
              //this.makedata();
              _this2.$SysCache.put("app_cate_data", res.data, 86400);

              // 第一个标题
              var firsttitel = '';
              _this2.data.forEach(function (item, index) {
                // 左侧主标题
                if (_this2.maintitels.indexOf(item.title) < 0) {
                  if (firsttitel == '') {
                    firsttitel = item.title;
                  }
                  _this2.maintitels.push(item.title);

                }
                _this2.subitems[index] = item.subCategoryList;

                // 右侧子项目items 
                var isexistsubitem = 0;
                var isexistitem = 0;

              });

              // 第一个活动得左侧标题
              _this2.activemaintitel = firsttitel;
              _this2.clickleftitem(firsttitel, 0);
              console.log(_this2.subitems);
            }
          } });

      }
    },
    makedata: function makedata() {

    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/uni-app-plus-nvue/dist/index.js */ "./node_modules/@dcloudio/vue-cli-plugin-hbuilderx/packages/uni-app-plus-nvue/dist/index.js")["default"]))

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/style-loader.js!./node_modules/weex-vue-loader/lib/style-rewriter.js?id=data-v-8ef2bbea!./node_modules/weex-vue-loader/lib/selector.js?type=styles&index=0!F:\\helloUniapp\\news\\pages\\cate\\index.nvue":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/style-loader.js!./node_modules/weex-vue-loader/lib/style-rewriter.js?id=data-v-8ef2bbea!./node_modules/weex-vue-loader/lib/selector.js?type=styles&index=0!F:/helloUniapp/news/pages/cate/index.nvue ***!
  \***********************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  "glance-shop-classify": {
    "width": 100,
    "backgroundColor": "#ffffff"
  },
  "glance-shop-classify-left": {
    "float": "left",
    "width": 20,
    "height": 100,
    "position": "fixed",
    "zIndex": 100,
    "borderRight": "#F5F5F5 1px solid",
    "backgroundColor": "#ffffff"
  },
  "glance-shop-classify-right": {
    "float": "left",
    "width": 20,
    "height": 100,
    "position": "fixed",
    "zIndex": 100,
    "borderRight": "#F5F5F5 1px solid",
    "backgroundColor": "#ffffff"
  },
  "glance-shop-classify-left-item": {
    "paddingTop": "10",
    "paddingRight": 0,
    "paddingBottom": "15",
    "paddingLeft": 0,
    "height": "15",
    "lineHeight": "15",
    "textAlign": "center",
    "width": 100,
    "fontSize": 0.8,
    "display": "-webkit-flex",
    "flexFlow": "row nowrap",
    "alignItems": "center",
    "justifyContent": "flex-start"
  },
  "glance-shop-classify-right-item": {
    "paddingTop": "10",
    "marginLeft": "10",
    "marginRight": "10",
    "display": "-webkit-flex",
    "zIndex": -1,
    "flexFlow": "column nowrap",
    "alignItems": "flex-start",
    "justifyContent": "flex-start"
  },
  "glance-shop-classify-right-item-titel": {
    "height": "25",
    "fontSize": 0.8,
    "textAlign": "left",
    "borderBottom": "solid 1px #F5F5F5",
    "marginBottom": "10",
    "marginTop": "10",
    "width": 100
  },
  "glance-shop-classify-right-item-subitems": {
    "display": "-webkit-flex",
    "flexFlow": "row wrap",
    "alignItems": "flex-start",
    "justifyContent": "flex-start",
    "width": 100
  },
  "glance-shop-classify-right-item-subtitel": {
    "height": "20",
    "lineHeight": "20",
    "fontSize": 0.7,
    "textAlign": "center",
    "marginBottom": "10"
  },
  "glance-shop-classify-left-item-activeborder": {
    "backgroundColor": "#ff4400"
  },
  "glance-shop-classify-left-item-activetxt": {
    "WebkitTransform": "scale(1.2)",
    "transform": "scale(1.2)",
    "color": "#ff4400"
  }
}

/***/ }),

/***/ "./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-8ef2bbea!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:\\helloUniapp\\news\\pages\\cate\\index.nvue":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-8ef2bbea!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:/helloUniapp/news/pages/cate/index.nvue ***!
  \*************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('view', {
    staticClass: ["glance-shop-classify"]
  }, [_c('view', {
    staticClass: ["glance-shop-classify-left"]
  }, _vm._l((_vm.maintitels), function(item, index) {
    return _c('view', {
      key: index
    }, [_c('view', {
      staticClass: ["glance-shop-classify-left-item"],
      on: {
        "click": function($event) {
          _vm.clickleftitem(_vm.maintitels[index], index)
        }
      }
    }, [_c('view', {
      staticStyle: {
        height: "15px",
        width: "3%",
        backgroundColor: "#ffffff"
      },
      style: {
        'background-color': [_vm.activemaintitel == _vm.maintitels[index] ? '#f40' : '#ffffff']
      }
    }), _c('view', {
      class: [_vm.activemaintitel == _vm.maintitels[index] ? 'glance-shop-classify-left-item-activetxt' : ''],
      staticStyle: {
        textAlign: "center",
        lineHeight: "15px",
        width: "93%",
        fontSize: "0.8rem"
      }
    }, [_vm._v(" " + _vm._s(item))])])])
  })), _c('view', {
    staticStyle: {
      float: "right",
      width: "80%"
    }
  }, [_c('scroll-view', {
    style: {
      height: _vm.scrollheight + 'px',
      'overflow-y': 'auto'
    },
    attrs: {
      "scrollY": "true",
      "scrollLeft": "0",
      "scrollWithAnimation": "true",
      "scrollIntoView": _vm.scrollintoid
    },
    on: {
      "scroll": _vm.scroll
    }
  }, _vm._l((_vm.data), function(des, idx) {
    return _c('view', {
      key: idx,
      attrs: {
        "id": 'scrollinto-' + idx
      }
    }, _vm._l((des.subCategoryList), function(item, index) {
      return (item.moduleid == des.moduleid) ? _c('view', {
        key: index
      }, [_c('view', {
        staticClass: ["glance-shop-classify-right-item"]
      }, [_c('view', {
        staticClass: ["glance-shop-classify-right-item-titel"]
      }, [_vm._v(_vm._s(item.catname))]), _c('view', {
        staticClass: ["glance-shop-classify-right-item-subitems"]
      }, _vm._l((item.children), function(subitem, k) {
        return _c('view', {
          key: k,
          staticStyle: {
            width: "33.33%"
          }
        }, [_c('view', {
          staticClass: ["glance-shop-classify-right-item-subtitel"]
        }, [_vm._v(_vm._s(subitem.catname))])])
      }))])]) : _vm._e()
    }))
  }))], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),

/***/ "F:\\helloUniapp\\news\\pages\\cate\\index.nvue?entry":
/*!*******************************************************!*\
  !*** F:/helloUniapp/news/pages/cate/index.nvue?entry ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(/*! !./node_modules/weex-vue-loader/lib/style-loader!./node_modules/weex-vue-loader/lib/style-rewriter?id=data-v-8ef2bbea!./node_modules/weex-vue-loader/lib/selector?type=styles&index=0!./index.nvue */ "./node_modules/weex-vue-loader/lib/style-loader.js!./node_modules/weex-vue-loader/lib/style-rewriter.js?id=data-v-8ef2bbea!./node_modules/weex-vue-loader/lib/selector.js?type=styles&index=0!F:\\helloUniapp\\news\\pages\\cate\\index.nvue")
)

/* script */
__vue_exports__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/script-loader!babel-loader!./node_modules/weex-vue-loader/lib/selector?type=script&index=0!./index.nvue */ "./node_modules/weex-vue-loader/lib/script-loader.js!./node_modules/babel-loader/lib/index.js!./node_modules/weex-vue-loader/lib/selector.js?type=script&index=0!F:\\helloUniapp\\news\\pages\\cate\\index.nvue")

/* template */
var __vue_template__ = __webpack_require__(/*! !./node_modules/weex-vue-loader/lib/template-compiler?id=data-v-8ef2bbea!./node_modules/weex-vue-loader/lib/selector?type=template&index=0!./index.nvue */ "./node_modules/weex-vue-loader/lib/template-compiler.js?id=data-v-8ef2bbea!./node_modules/weex-vue-loader/lib/selector.js?type=template&index=0!F:\\helloUniapp\\news\\pages\\cate\\index.nvue")
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
__vue_options__.__file = "F:\\helloUniapp\\news\\pages\\cate\\index.nvue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-8ef2bbea"
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