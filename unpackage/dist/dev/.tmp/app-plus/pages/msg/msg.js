(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/msg/msg"],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!F:\\helloUniapp\\news\\pages\\msg\\msg.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!F:/helloUniapp/news/pages/msg/msg.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, \"__esModule\", { value: true });exports.default = void 0;var _default =\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n{\n  data: function data() {\n    return {\n      chatList: [\n      {\n        uid: 1,\n        username: \"中纸网客服001\",\n        face: \"/static/img/im/face/face_1.jpg\",\n        time: \"13:08\",\n        msg: \"亲，20点前下单都是当天送达的\",\n        tisNum: 1 },\n\n      {\n        uid: 2,\n        username: \"中纸网客服002\",\n        face: \"/static/img/im/face/face_2.jpg\",\n        time: \"13:05\",\n        msg: \"问那么多干什么？不想买就滚~\",\n        tisNum: 0 },\n\n      {\n        uid: 3,\n        username: \"中纸网客服003\",\n        face: \"/static/img/im/face/face_3.jpg\",\n        time: \"12:15\",\n        msg: \"推荐一个商品呗？\",\n        tisNum: 0 },\n\n      {\n        uid: 4,\n        username: \"中纸网客服004\",\n        face: \"/static/img/im/face/face_4.jpg\",\n        time: \"12:11\",\n        msg: \"现在卖的都是未过青的茶哦\",\n        tisNum: 0 },\n\n      {\n        uid: 5,\n        username: \"中纸网客服005\",\n        face: \"/static/img/im/face/face_5.jpg\",\n        time: \"12:10\",\n        msg: \"你好，发福建快递多久送到的？\",\n        tisNum: 0 },\n\n      {\n        uid: 6,\n        username: \"中纸网客服006\",\n        face: \"/static/img/im/face/face_6.jpg\",\n        time: \"12:10\",\n        msg: \"在吗？\",\n        tisNum: 0 },\n\n      {\n        uid: 7,\n        username: \"中纸网客服007\",\n        face: \"/static/img/im/face/face_7.jpg\",\n        time: \"11:56\",\n        msg: \"新品上市，欢迎选购\",\n        tisNum: 0 },\n\n      {\n        uid: 8,\n        username: \"中纸网客服008\",\n        face: \"/static/img/im/face/face_8.jpg\",\n        time: \"11:56\",\n        msg: \"商品七天无理由退换的\",\n        tisNum: 0 },\n\n      {\n        uid: 9,\n        username: \"中纸网客服009\",\n        face: \"/static/img/im/face/face_9.jpg\",\n        time: \"12:15\",\n        msg: \"星期天再发货的\",\n        tisNum: 0 },\n\n      {\n        uid: 10,\n        username: \"中纸网客服010\",\n        face: \"/static/img/im/face/face_10.jpg\",\n        time: \"12:36\",\n        msg: \"建议你直接先测量好尺码在选购的。\",\n        tisNum: 0 },\n\n      {\n        uid: 11,\n        username: \"中纸网客服011\",\n        face: \"/static/img/im/face/face_11.jpg\",\n        time: \"12:40\",\n        msg: \"新品5折，还有大量优惠券。\",\n        tisNum: 0 },\n\n      {\n        uid: 12,\n        username: \"中纸网客服012\",\n        face: \"/static/img/im/face/face_12.jpg\",\n        time: \"12:36\",\n        msg: \"还没有用，等我明天早上试一下\",\n        tisNum: 0 },\n\n      {\n        uid: 13,\n        username: \"中纸网客服013\",\n        face: \"/static/img/im/face/face_13.jpg\",\n        time: \"12:36\",\n        msg: \"适用于成年人的，小孩不适用的\",\n        tisNum: 0 },\n\n      {\n        uid: 14,\n        username: \"中纸网客服014\",\n        face: \"/static/img/im/face/face_13.jpg\",\n        time: \"12:36\",\n        msg: \"把上面的螺丝拆下来，把铁片撬开就能看见了\",\n        tisNum: 0 },\n\n      {\n        uid: 15,\n        username: \"中纸网客服015\",\n        face: \"/static/img/im/face/face_15.jpg\",\n        time: \"12:36\",\n        msg: \"这个产品是原车配件，完美装上的\",\n        tisNum: 0 }] };\n\n\n\n\n  },\n  //下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 \"enablePullDownRefresh\": true\n  onPullDownRefresh: function onPullDownRefresh() {\n    setTimeout(function () {\n      uni.stopPullDownRefresh();\n    }, 1000);\n  },\n  onLoad: function onLoad() {\n\n  },\n  methods: {\n    toChat: function toChat(chat) {\n      uni.navigateTo({\n        url: \"chat/chat?name=\" + chat.username });\n\n    } } };exports.default = _default;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ \"./node_modules/@dcloudio/uni-app-plus/dist/index.js\")[\"default\"]))\n\n//# sourceURL=uni-app:///pages/msg/msg.vue?vue&type=script&lang=js&?af79");

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!F:\\helloUniapp\\news\\pages\\msg\\msg.vue?vue&type=style&index=0&lang=scss&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!./node_modules/css-loader??ref--8-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!./node_modules/vue-loader/lib??vue-loader-options!F:/helloUniapp/news/pages/msg/msg.vue?vue&type=style&index=0&lang=scss& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=F:/helloUniapp/news/pages/msg/msg.vue?vue&type=style&index=0&lang=scss&");

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!F:\\helloUniapp\\news\\pages\\msg\\msg.vue?vue&type=template&id=fb610616&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!F:/helloUniapp/news/pages/msg/msg.vue?vue&type=template&id=fb610616& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"view\", [\n    _c(\n      \"view\",\n      { staticClass: \"chat-list\" },\n      _vm._l(_vm.chatList, function(chat, index) {\n        return _c(\"view\", { key: index, staticClass: \"chat\" }, [\n          _c(\n            \"view\",\n            {\n              staticClass: \"row\",\n              attrs: { eventid: \"7853d139-0-\" + index },\n              on: {\n                tap: function($event) {\n                  _vm.toChat(chat)\n                }\n              }\n            },\n            [\n              _c(\"view\", { staticClass: \"left\" }, [\n                _c(\"image\", { attrs: { src: chat.face } })\n              ]),\n              _c(\"view\", { staticClass: \"right\" }, [\n                _c(\"view\", { staticClass: \"top\" }, [\n                  _c(\"view\", { staticClass: \"username\" }, [\n                    _vm._v(_vm._s(chat.username))\n                  ]),\n                  _c(\"view\", { staticClass: \"time\" }, [\n                    _vm._v(_vm._s(chat.time))\n                  ])\n                ]),\n                _c(\"view\", { staticClass: \"bottom\" }, [\n                  _c(\"view\", { staticClass: \"msg\" }, [\n                    _vm._v(_vm._s(chat.msg))\n                  ]),\n                  chat.tisNum > 0\n                    ? _c(\"view\", { staticClass: \"tis\" }, [\n                        _vm._v(_vm._s(chat.tisNum))\n                      ])\n                    : _vm._e()\n                ])\n              ])\n            ]\n          )\n        ])\n      })\n    )\n  ])\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=F:/helloUniapp/news/pages/msg/msg.vue?vue&type=template&id=fb610616&");

/***/ }),

/***/ "F:\\helloUniapp\\news\\main.js?{\"page\":\"pages%2Fmsg%2Fmsg\"}":
/*!****************************************************************!*\
  !*** F:/helloUniapp/news/main.js?{"page":"pages%2Fmsg%2Fmsg"} ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("__webpack_require__(/*! uni-pages */ \"F:\\\\helloUniapp\\\\news\\\\pages.json\");\nvar _mpvuePageFactory = _interopRequireDefault(__webpack_require__(/*! mpvue-page-factory */ \"./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mpvue-page-factory/index.js\"));\nvar _msg = _interopRequireDefault(__webpack_require__(/*! ./pages/msg/msg.vue */ \"F:\\\\helloUniapp\\\\news\\\\pages\\\\msg\\\\msg.vue\"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}\nPage((0, _mpvuePageFactory.default)(_msg.default));\n\n//# sourceURL=F:/helloUniapp/news/main.js?%7B%22page%22:%22pages%252Fmsg%252Fmsg%22%7D");

/***/ }),

/***/ "F:\\helloUniapp\\news\\pages\\msg\\msg.vue":
/*!*********************************************!*\
  !*** F:/helloUniapp/news/pages/msg/msg.vue ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _msg_vue_vue_type_template_id_fb610616___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./msg.vue?vue&type=template&id=fb610616& */ \"F:\\\\helloUniapp\\\\news\\\\pages\\\\msg\\\\msg.vue?vue&type=template&id=fb610616&\");\n/* harmony import */ var _msg_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./msg.vue?vue&type=script&lang=js& */ \"F:\\\\helloUniapp\\\\news\\\\pages\\\\msg\\\\msg.vue?vue&type=script&lang=js&\");\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _msg_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _msg_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n/* harmony import */ var _msg_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./msg.vue?vue&type=style&index=0&lang=scss& */ \"F:\\\\helloUniapp\\\\news\\\\pages\\\\msg\\\\msg.vue?vue&type=style&index=0&lang=scss&\");\n/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _msg_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _msg_vue_vue_type_template_id_fb610616___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _msg_vue_vue_type_template_id_fb610616___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"F:/helloUniapp/news/pages/msg/msg.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=F:/helloUniapp/news/pages/msg/msg.vue");

/***/ }),

/***/ "F:\\helloUniapp\\news\\pages\\msg\\msg.vue?vue&type=script&lang=js&":
/*!**********************************************************************!*\
  !*** F:/helloUniapp/news/pages/msg/msg.vue?vue&type=script&lang=js& ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_msg_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--18-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./msg.vue?vue&type=script&lang=js& */ \"./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!F:\\\\helloUniapp\\\\news\\\\pages\\\\msg\\\\msg.vue?vue&type=script&lang=js&\");\n/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_msg_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_msg_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_msg_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_msg_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_18_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_msg_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); \n\n//# sourceURL=uni-app:///pages/msg/msg.vue?vue&type=script&lang=js&?612b");

/***/ }),

/***/ "F:\\helloUniapp\\news\\pages\\msg\\msg.vue?vue&type=style&index=0&lang=scss&":
/*!*******************************************************************************!*\
  !*** F:/helloUniapp/news/pages/msg/msg.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_msg_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-1!./node_modules/css-loader??ref--8-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/lib/loader.js??ref--8-oneOf-1-4!./node_modules/vue-loader/lib??vue-loader-options!./msg.vue?vue&type=style&index=0&lang=scss& */ \"./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!F:\\\\helloUniapp\\\\news\\\\pages\\\\msg\\\\msg.vue?vue&type=style&index=0&lang=scss&\");\n/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_msg_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_msg_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_msg_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_msg_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n /* harmony default export */ __webpack_exports__[\"default\"] = (_D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_lib_loader_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_msg_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); \n\n//# sourceURL=F:/helloUniapp/news/pages/msg/msg.vue?vue&type=style&index=0&lang=scss&");

/***/ }),

/***/ "F:\\helloUniapp\\news\\pages\\msg\\msg.vue?vue&type=template&id=fb610616&":
/*!****************************************************************************!*\
  !*** F:/helloUniapp/news/pages/msg/msg.vue?vue&type=template&id=fb610616& ***!
  \****************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_msg_vue_vue_type_template_id_fb610616___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./msg.vue?vue&type=template&id=fb610616& */ \"./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!F:\\\\helloUniapp\\\\news\\\\pages\\\\msg\\\\msg.vue?vue&type=template&id=fb610616&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_msg_vue_vue_type_template_id_fb610616___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_msg_vue_vue_type_template_id_fb610616___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=F:/helloUniapp/news/pages/msg/msg.vue?vue&type=template&id=fb610616&");

/***/ })

},[["F:\\helloUniapp\\news\\main.js?{\"page\":\"pages%2Fmsg%2Fmsg\"}","common/runtime","common/vendor"]]]);