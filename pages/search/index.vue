<template>
	<view class="content">
		<view class="search-box">
			<!-- mSearch组件 如果使用原样式，删除组件元素-->
			<mSearch :mode="2" button="inside" :placeholder="defaultKeyword" @search="doSearch(false)" @input="inputChange" @confirm="doSearch(false)" v-model="keyword"></mSearch>
			<!-- 原样式 如果使用原样式，恢复下方注销代码 -->
			<!-- 			
			<view class="input-box">
				<input type="text" :placeholder="defaultKeyword" @input="inputChange" v-model="keyword" @confirm="doSearch(false)"
				 placeholder-class="placeholder-class" confirm-type="search">
			</view>
			<view class="search-btn" @tap="doSearch(false)">搜索</view> 
			-->
			<!-- 原样式 end -->
		</view>
		<view class="search-keyword" @touchstart="blur">
			<scroll-view class="keyword-list-box" v-show="isShowKeywordList" scroll-y>
				<view class="keyword-entry" hover-class="keyword-entry-tap" v-for="row in keywordList" :key="row.keyword">
					<view class="keyword-text" @tap="doSearch(row.keyword)">
						<rich-text :nodes="row.htmlStr"></rich-text>
					</view>
					<view class="keyword-img" @tap="setkeyword(row)">
						<image src="../../static/search/back.png"></image>
					</view>
				</view> 
			</scroll-view>
			<scroll-view class="keyword-box" v-show="!isShowKeywordList" scroll-y>
				<view class="keyword-block" v-if="oldKeywordList.length>0">
					<view class="keyword-list-header">
						<view>历史搜索</view>
						<view>
							<image @tap="oldDelete" src="../../static/search/delete.png"></image>
						</view>
					</view>
					<view class="keyword">
						<view v-for="key in oldKeywordList" @tap="doSearch(key)" :key="key">{{key}}</view>
					</view>
				</view>
				<view class="keyword-block">
					<view class="keyword-list-header">
						<view>热门搜索</view>
						<view>
							<image @tap="hotToggle" :src="'../../static/search/attention'+forbid+'.png'"></image>
						</view>
					</view>
					<view class="keyword" v-if="forbid==''">
						<view v-for="(item,key) in hotKeywordList" @tap="doSearch(item.keyword)" :key="key">{{item.keyword}}</view>
					</view>
					<view class="hide-hot-tis" v-else>
						<view>当前搜热门搜索已隐藏</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
	
</template>

<script>
	//引用mSearch组件，如不需要删除即可
	import mSearch from '@/components/mehaotian-search-revision/mehaotian-search-revision.vue';
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue";
	export default {
		data() {
			return {
				defaultKeyword: "请输入关键字",
				keyword: "",
				oldKeywordList: [],
				hotKeywordList: [],
				keywordList: [],
				forbid: '',
				isShowKeywordList: false,
				isShow:false,
				moduleid:21
			}
		},
		onLoad(event) {
			//console.log(JSON.stringify(event));
			if(event.moduleid){
				this.moduleid = event.moduleid;
			}
			//this.init();
			uni.setStorageSync('newsmoduleid',  this.moduleid);
			this.loadDefaultKeyword();
			this.loadOldKeyword();
			this.loadHotKeyword();
		},
		onShow:function(option){
			var ntitlebar = new plus.nativeObj.View('test',
				{top:'0px',left:'0px',height:'49px',width:'100%',backgroundColor:'#3A3A3A',statusbar:{background:'#333333'}},
				[
					{tag:'rect',id:'rect',color:'#FF0000',position:{top:'12px',left:'12px',width:'24px',height:'24px'}},
					{tag:'font',id:'font',text:'原生控件',textStyles:{size:'18px'}}
				]
			);
			
		},
// 		onHide:function(option){
// 			this.global.ntitlebar.close();
// 		},
		components: {
			//引用mSearch组件，如不需要删除即可
			mSearch,
			uniNavBar,
			uniDrawer
		},
		onNavigationBarButtonTap:function(e){
			//console.log(e);
			if(e.index==0){
				this.isShow = true;
			}
			if(e.index==1){
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
		},
		onNavigationBarSearchInputConfirmed:function(e){
			
		},
		onNavigationBarSearchInputChanged:function(e){
			
		},
		props:{
            titleText:{
                type:String,
                default:""
            },
            statusColor:{
                type:String,
                default:"#8F8F94"
            },
            showLeftButton:{
                type:Boolean,
                default:true
            },
            showRightButton:{
                type:Boolean,
                default:false
            }
        },
		methods: {
			init() {
				this.loadDefaultKeyword();
				this.loadOldKeyword();
				this.loadHotKeyword();

			},
			blur(){
				uni.hideKeyboard()
			},
			//加载默认搜索关键字
			loadDefaultKeyword() {
				//定义默认搜索关键字，可以自己实现ajax请求数据再赋值,用户未输入时，以水印方式显示在输入框，直接不输入内容搜索会搜索默认关键字
				this.defaultKeyword = "请输入关键字";
			},
			//加载历史搜索,自动读取本地Storage
			loadOldKeyword() {
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						var OldKeys = JSON.parse(res.data);
						this.oldKeywordList = OldKeys;
					}
				});
			},
			//加载热门搜索
			loadHotKeyword() {
				//定义热门搜索关键字，可以自己实现ajax请求数据再赋值
				this.$Request.post(this.$api.home.getsearchdata,{}).then(res => {
					//console.log(res.data);
					if (res.code == "0000") {
						this.hotKeywordList = res.data;
					}
				})	
				
			}, 
			//监听输入
			inputChange(event) {
				//兼容引入组件时传入参数情况
				var keyword = event.detail?event.detail.value:event;
				if (!keyword) {
					this.keywordList = [];
					this.isShowKeywordList = false;
					return;
				}
				this.isShowKeywordList = true;
				//以下示例截取淘宝的关键字，请替换成你的接口
				uni.request({
					url: 'https://suggest.taobao.com/sug?code=utf-8&q=' + keyword, //仅为示例
					success: (res) => {
						this.keywordList = this.drawCorrelativeKeyword(res.data.result, keyword);
					}
				});
			},
			//高亮关键字
			drawCorrelativeKeyword(keywords, keyword) {
				var len = keywords.length,
					keywordArr = [];
				for (var i = 0; i < len; i++) {
					var row = keywords[i];
					//定义高亮#9f9f9f
					var html = row[0].replace(keyword, "<span style='color: #fd4a5f;'>" + keyword + "</span>");
					html = '<div>' + html + '</div>';
					var tmpObj = {
						keyword: row[0],
						htmlStr: html
					};
					keywordArr.push(tmpObj)
				}
				return keywordArr;
			},
			//顶置关键字
			setkeyword(data) {
				this.keyword = data.keyword;
			},
			//清除历史搜索
			oldDelete() {
				uni.showModal({
					content: '确定清除历史搜索记录？',
					success: (res) => {
						if (res.confirm) {
							//console.log('用户点击确定');
							this.oldKeywordList = [];
							uni.removeStorage({
								key: 'OldKeys'
							});
						} else if (res.cancel) {
							//console.log('用户点击取消');
						}
					}
				});
			},
			//热门搜索开关
			hotToggle() {
				this.forbid = this.forbid ? '' : '_forbid';
			},
			//执行搜索
			doSearch(key) {
				key = key ? key : this.keyword ? this.keyword : this.defaultKeyword;
				this.keyword = key;
				uni.setStorageSync('cateKeywords',  key);
				//uni.setStorageSync('newsmoduleid',  this.moduleid);
				this.saveKeyword(key); //保存为历史 
				if(!uni.getStorageSync('newsmoduleid')){
					uni.setStorageSync('newsmoduleid',  this.moduleid);
				}
				if(uni.getStorageSync('newsmoduleid') == 4){
					uni.navigateTo({
						//url: '/pages/news/index?keywords=' + key +'&moduleid='+this.moduleid,
						url:'/pages/company/index?keywords=' + encodeURIComponent(key) +'&moduleid='+uni.getStorageSync('newsmoduleid'),
						
					})
				}else{
					uni.navigateTo({
						//url: '/pages/news/index?keywords=' + key +'&moduleid='+this.moduleid,
						url:'/pages/news/index?keywords=' + encodeURIComponent(key) +'&moduleid='+uni.getStorageSync('newsmoduleid'),
					})
				}
// 				uni.showToast({ 
// 					title: key,
// 					icon: 'none',
// 					duration: 2000
// 				});

				//以下是示例跳转淘宝搜索，可自己实现搜索逻辑
				//#ifdef APP-PLUS
				//plus.runtime.openURL(encodeURI('taobao://s.taobao.com/search?q=' + key));
				
				//#endif
				//#ifdef H5 
				// window.location.href = 'taobao://s.taobao.com/search?q=' + key
				//#endif
			},
			//保存关键字到历史记录
			saveKeyword(keyword) {
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						//console.log(res.data);
						var OldKeys = JSON.parse(res.data);
						var findIndex = OldKeys.indexOf(keyword);
						if (findIndex == -1) {
							OldKeys.unshift(keyword);
						} else {
							OldKeys.splice(findIndex, 1);
							OldKeys.unshift(keyword);
						}
						//最多10个纪录
						OldKeys.length > 10 && OldKeys.pop();
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.oldKeywordList = OldKeys; //更新历史搜索
					},
					fail: (e) => {
						var OldKeys = [keyword];
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.oldKeywordList = OldKeys; //更新历史搜索
					}
				});
			}
		}
	}
</script>
<style>
	.top-view{width: 100%;position: fixed;top: 0;}
	.search-box {
		width:100%;
		padding:16upx 2.5% 16upx 2.5%;
		display:flex;
		justify-content:space-between;
		position: fixed;
		z-index: 160;
		border-bottom: solid 1px #ddd;
		/* background: linear-gradient(to left, #FA4DBE 0, #FBAA58 100%); */
		background:#F2F2F2;
		/* background: rgba(255,255,255,.9); */
		border-bottom-color: transparent;
		-webkit-transition: all .4s ease 0s;
		transform-origin: center;
		/* #ifdef APP-PLUS */
		padding-top: var(--status-bar-height);
		/* #endif */
	}
	.search-box .input-box {width:85%;font-size:25upx;flex-shrink:1;display:flex;justify-content:center;align-items:center;}
	.search-box .search-btn {width:15%;margin:0 0 0 2%;display:flex;justify-content:center;align-items:center;flex-shrink:0;font-size:14px;color:#fff;background:linear-gradient(to right,#fd4a5f,#f00);border-radius:30px;}
	.search-box .input-box>input {width:100%;height:30px;font-size:16px;border:0;border-radius:30px;-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:0 3%;margin:0;background-color:#ffffff;}
	.placeholder-class {color:#9e9e9e;}
	.search-keyword {
		width:100%;background-color:rgb(242,242,242);
		padding-top:90upx;		
	}
	.keyword-list-box {height:calc(100vh - 55px);padding-top:5px;border-radius:10px 10px 0 0;background-color:#fff;}
	.keyword-entry-tap {background-color:#eee;}
	.keyword-entry {width:94%;height:40px;margin:0 3%;font-size:15px;color:#333;display:flex;justify-content:space-between;align-items:center;border-bottom:solid 1px #e7e7e7;}
	.keyword-entry image {width:30px;height:30px;}
	.keyword-entry .keyword-text,.keyword-entry .keyword-img {height:40px;display:flex;align-items:center;}
	.keyword-entry .keyword-text {width:90%;}
	.keyword-entry .keyword-img {width:10%;justify-content:center;}
	.keyword-box {height:calc(100vh - 55px);border-radius:10px 10px 0 0;background-color:#fff;}
	.keyword-box .keyword-block {padding:5px 0;}
	.keyword-box .keyword-block .keyword-list-header {width:100%;padding:5px 3%;font-size:13.5px;color:#333;display:flex;justify-content:space-between;}
	.keyword-box .keyword-block .keyword-list-header image {width:20px;height:20px;}
	.keyword-box .keyword-block .keyword {width:100%;padding:3px 3%;display:flex;flex-flow:wrap;justify-content:flex-start;}
	.keyword-box .keyword-block .hide-hot-tis {display:flex;justify-content:center;font-size:14px;color:#6b6b6b;}
	.keyword-box .keyword-block .keyword>view {display:flex;justify-content:center;align-items:center;border-radius:30px;padding:0 10px;margin:5px 10px 5px 0;height:30px;font-size:14px;background-color:rgb(242,242,242);color:#6b6b6b;}
</style>
