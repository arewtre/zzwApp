(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"0711":function(e,t,n){"use strict";n.r(t);var o=n("2857"),a=n.n(o);for(var r in o)"default"!==r&&function(e){n.d(t,e,function(){return o[e]})}(r);t["default"]=a.a},1181:function(e,t,n){"use strict";n.r(t);var o=n("ef48"),a=n.n(o);for(var r in o)"default"!==r&&function(e){n.d(t,e,function(){return o[e]})}(r);t["default"]=a.a},2855:function(e,t,n){"use strict";var o=n("7ef5"),a=n.n(o);a.a},2857:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o={name:"load-more",props:{loadingType:{type:Number,default:0},showImage:{type:Boolean,default:!0},color:{type:String,default:"#777777"},contentText:{type:Object,default:{contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"}}},data:function(){return{}}};t.default=o},"46e8":function(e,t,n){"use strict";e.exports={home:{banner:"getBanner",navlist:"getCategory",sydata:"getSyData"},common:{couponlist:"index/couponlist",config:"config/getinfo",update:"config/update"},goods:{iteminfo:"items/goodsinfo"}}},"48d5":function(e,t,n){"use strict";var o=n("b5ea"),a=n.n(o);a.a},"49e8":function(e,t,n){"use strict";n.r(t);var o=n("a475"),a=n("0711");for(var r in a)"default"!==r&&function(e){n.d(t,e,function(){return a[e]})}(r);n("48d5");var c=n("2877"),u=Object(c["a"])(a["default"],o["a"],o["b"],!1,null,null,null);t["default"]=u.exports},"5a8e":function(e,t,n){"use strict";var o="http://47.100.48.1/api/member/";e.exports={APIHOST:o+"getData.php?ac=",ROOTPATH:o}},"7ef5":function(e,t,n){},"8fc1":function(e,t,n){"use strict";n("2cda");var o=l(n("f3d3")),a=l(n("f1f8")),r=l(n("46e8")),c=l(n("f01c")),u=l(n("a883"));l(n("49e8"));function l(e){return e&&e.__esModule?e:{default:e}}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),o.forEach(function(t){f(e,t,n[t])})}return e}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}o.default.config.productionTip=!1,o.default.prototype.$api=r.default,o.default.prototype.$Request=c.default,o.default.prototype.$Sysconf=c.default.config,o.default.prototype.$SysCache=u.default,a.default.mpType="app";var s=new o.default(i({},a.default));s.$mount()},a475:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("view",{staticClass:"load-more"},[n("view",{directives:[{name:"show",rawName:"v-show",value:1===e.loadingType&&e.showImage,expression:"loadingType === 1 && showImage"}],staticClass:"loading-img"},[n("view",{staticClass:"load1"},[n("view",{style:{background:e.color}}),n("view",{style:{background:e.color}}),n("view",{style:{background:e.color}}),n("view",{style:{background:e.color}})]),n("view",{staticClass:"load2"},[n("view",{style:{background:e.color}}),n("view",{style:{background:e.color}}),n("view",{style:{background:e.color}}),n("view",{style:{background:e.color}})]),n("view",{staticClass:"load3"},[n("view",{style:{background:e.color}}),n("view",{style:{background:e.color}}),n("view",{style:{background:e.color}}),n("view",{style:{background:e.color}})])]),n("text",{staticClass:"loading-text",style:{color:e.color}},[e._v(e._s(0===e.loadingType?e.contentText.contentdown:1===e.loadingType?e.contentText.contentrefresh:e.contentText.contentnomore))])])},a=[];n.d(t,"a",function(){return o}),n.d(t,"b",function(){return a})},a883:function(e,t,n){"use strict";(function(t){var n="_mallStore";function o(e,o,a){t.setStorageSync(e,o);var r=parseInt(a);if(r>0){var c=Date.parse(new Date);c=c/1e3+r,t.setStorageSync(e+n,c+"")}else t.removeStorageSync(e+n)}function a(e,o){var a=parseInt(t.getStorageSync(e+n));if(a&&parseInt(a)<Date.parse(new Date)/1e3)return o||!1;var r=t.getStorageSync(e);return r||(void 0!=o&&""!=o||(o=!1),o)}function r(e){t.removeStorageSync(e),t.removeStorageSync(e+n)}function c(){t.clearStorageSync()}e.exports={put:o,get:a,remove:r,clear:c}}).call(this,n("649d")["default"])},b5ea:function(e,t,n){},ef48:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o={onLaunch:function(){console.log("App Launch")},onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")}};t.default=o},f01c:function(e,t,n){"use strict";(function(t){var o=r(n("5a8e")),a=r(n("a883"));function r(e){return e&&e.__esModule?e:{default:e}}e.exports={config:function(e){var t=null;if(e){var n=e.split(".");if(t=n.length>1?o.default[n[0]][n[1]]||null:o.default[e]||null,null==t){var r=a.default.get("web_config");r&&(t=n.length>1?r[n[0]][n[1]]||null:r[e]||null)}}return t},post:function(e,n,o){return o=o||"application/x-www-form-urlencoded",e=this.config("APIHOST")+e,new Promise(function(a,r){t.request({url:e,data:n,method:"POST",header:{"content-type":o},success:function(e){a.call(self,e.data)},fail:function(e){r.call(self,e)}})})},get:function(e,n,o){return o=o||"application/x-www-form-urlencoded",e=this.config("APIHOST")+e,new Promise(function(a,r){t.request({url:e,data:n,method:"GET",header:{"content-type":o},success:function(e){a.call(self,e.data)},fail:function(e){r.call(self,e)}})})}}}).call(this,n("649d")["default"])},f1f8:function(e,t,n){"use strict";n.r(t);var o=n("1181");for(var a in o)"default"!==a&&function(e){n.d(t,e,function(){return o[e]})}(a);n("2855");var r,c,u=n("2877"),l=Object(u["a"])(o["default"],r,c,!1,null,null,null);t["default"]=l.exports}},[["8fc1","common/runtime","common/vendor"]]]);