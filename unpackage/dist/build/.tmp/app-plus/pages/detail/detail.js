(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/detail/detail"],{"02e4":function(t,e,n){"use strict";var i=n("1a22"),a=n.n(i);a.a},"1a22":function(t,e,n){},"32b6":function(t,e,n){"use strict";n.r(e);var i=n("b7d1"),a=n.n(i);for(var c in i)"default"!==c&&function(t){n.d(e,t,function(){return i[t]})}(c);e["default"]=a.a},"7baf":function(t,e,n){"use strict";n("2cda");var i=c(n("b0ce")),a=c(n("9ecc"));function c(t){return t&&t.__esModule?t:{default:t}}Page((0,i.default)(a.default))},"7e80":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("view",[t.content.thumb?n("view",{staticClass:"banner"},[n("image",{staticClass:"banner-img",attrs:{src:t.content.thumb,model:"aspectFill"}}),n("view",{staticClass:"banner-title"},[t._v(t._s(t.content.title))])]):t._e(),n("view",{class:["article-meta",""==t.content.thumb?"article-meta-top":""]},[n("cmd-icon",{attrs:{type:"user",size:"15",color:"#aaa",mpcomid:"4da756d6-0"}}),n("text",{staticClass:"article-author"},[t._v(t._s(t.content.editor))]),n("text",{staticClass:"article-text"},[t._v("发表于")]),n("cmd-icon",{attrs:{type:"clock",size:"15",color:"#aaa",mpcomid:"4da756d6-1"}}),n("text",{staticClass:"article-time"},[t._v(t._s(t.content.addtimes))])],1),n("view",{staticClass:"article-content"},[n("rich-text",{attrs:{nodes:t.content.content,mpcomid:"4da756d6-2"}})],1)])},a=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return a})},"9ecc":function(t,e,n){"use strict";n.r(e);var i=n("7e80"),a=n("32b6");for(var c in a)"default"!==c&&function(t){n.d(e,t,function(){return a[t]})}(c);n("02e4");var o=n("2877"),s=Object(o["a"])(a["default"],i["a"],i["b"],!1,null,null,null);e["default"]=s.exports},b7d1:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=a(n("3f56"));function a(t){return t&&t.__esModule?t:{default:t}}var c="<p>获取信息失败</p>",o={data:function(){return{banner:{},content:"",catid:"",itemid:""}},components:{cmdIcon:i.default},onShareAppMessage:function(){return{title:this.banner.title,path:"/pages/detail/detail?query="+JSON.stringify(this.banner)}},onLoad:function(t){this.catid=t.catid,this.itemid=t.itemid,this.getDetail()},onNavigationBarButtonTap:function(e){console.log(e);this.content;0==e.index&&t.showActionSheet({itemList:["分享到朋友圈","分享给朋友","复制链接地址"],success:function(e){var n=this.content;0==e.tapIndex?t.share({provider:"weixin",scene:"WXSenceTimeline",type:0,href:n.linkurl,title:n.title,summary:n.introduce,imageUrl:n.thumb?n.thumb:"http://www.chinapaper.net/logo.jpg",success:function(t){console.log("success:"+JSON.stringify(t))},fail:function(t){console.log("fail:"+JSON.stringify(t))}}):1==e.tapIndex&&t.share({provider:"weixin",scene:"WXSceneSession",type:0,href:this.content.linkurl,title:this.content.title,summary:this.content.introduce,imageUrl:this.content.thumb,success:function(t){console.log("success:"+JSON.stringify(t))},fail:function(t){console.log("fail:"+JSON.stringify(t))}})},fail:function(t){console.log(t.errMsg)}})},methods:{getDetail:function(){var e=this;t.showLoading({title:"加载中"}),this.$Request.post(this.$api.home.newsdata,{catid:this.catid,itemid:this.itemid}).then(function(n){"0000"==n.code?(e.content=n.data,t.setNavigationBarTitle({title:e.content.title}),t.hideLoading()):e.content=c})}}};e.default=o}).call(this,n("649d")["default"])}},[["7baf","common/runtime","common/vendor"]]]);