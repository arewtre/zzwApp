<template>
	<view class="uni-tab-bar">
		<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
			<view v-for="(tab, index) in tabBars" :key="tab.ref" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']"
			 :id="tab.ref" :data-current="index" @click="tapTab(index)">{{tab.catname}}</view>
		</scroll-view>
		<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item v-for="(tabItem, tabIndex) in newsList" :key="tabIndex">
				<scroll-view class="list" scroll-y @scrolltolower="loadMore(tabIndex)">
					<block v-for="(newsItem, newsIndex) in tabItem.data" :key="newsIndex">
						<uni-media-list :data="newsItem" @close="dislike(tabIndex, newsIndex)" @click="goDetail(newsItem)"></uni-media-list>
					</block>
					<view class="uni-tab-bar-loading">
						<uni-load-more :status="tabItem.loadingText" :contentText="loadingText"></uni-load-more>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<view class="navBarButtonBox">
			<!-- 顶部右侧菜单 -->
			<view v-if="navBarButton" class="goods_shop_cart_bg navBarButton" @tap="showShopCartBg('nav')" @touchmove.stop.prevent="moveHandleStop"></view>
			<view class="h_newlit" v-bind:class="[navBarButton ? 'active' : '','']">
				<view class="em">
					<view class="" @tap="navBarButtontO('home')">
						<text class="iconfont icon-shouye"></text>首页
					</view>
					<view class="" @tap="navBarButtontO('search')">
						<text class="iconfont icon-sousuo"></text>搜索
					</view>
					<view class="" @tap="navBarButtontO('kefu')">
						<text class="iconfont icon-kefu-"></text>客服
					</view>
					<view class="" @tap="navBarButtontO('member')">
						<text class="iconfont icon-wode"></text>我的
					</view>
				</view>
			</view>
		</view>
		<!-- 顶部右侧菜单 -->
		<!-- 悬浮上拉 -->
		<view class="scroll_top" @tap="topScrollTap" v-bind:class="[scrollTop ? 'active' : '','']" style="bottom: 56px;">
			<text class="iconfont icon-shangla"></text>
		</view>
	</view>
</template>
<script>
	import uniMediaList from '@/components/uni-media-list/uni-media-list.vue';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';

	import {
		friendlyDate
	} from '@/common/util.js';
  
	export default {
		components: {
			uniMediaList,
			uniLoadMore
		},
		data() {
			return {
				loadingText: {
					contentdown: '上拉加载更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				scrollLeft: 0,
				refreshing: false,
				refreshText: '下拉可以刷新',
				newsList: [],
				tabIndex: 0,
				tabBars: [],
				moduleid:"",
				cateid:"",
				keywords:"",
				scrollTop:false,
				navBarButton:false,
			}
		},
		onLoad: function(event) {
			this.moduleid = event.moduleid;
			if(event.keywords!= undefined){
				this.keywords = decodeURIComponent(event.keywords);
			}
			if(event.cateid!= undefined){
				this.cateid = decodeURIComponent(event.cateid);
			}
			this.loadNavList();
			// 初始化列表信息
		},
		onNavigationBarButtonTap:function(e){
			console.log(e);
			if(e.index==0){
				this.navBarButton = !this.navBarButton; 
			}
		},
		onNavigationBarSearchInputConfirmed:function(e){
			console.log(e);
		},
		onNavigationBarSearchInputChanged:function(e){
			console.log(e);
		},
		 // 标题栏input搜索框点击 
		onNavigationBarSearchInputClicked:function(e) {
		  	 uni.navigateTo({
		  		url:"/pages/search/index"
		  	})
		},
		onPageScroll:function(e){
			console.log(e);
			if(e.scrollTop > 200 ){
				this.scrollTop = true;
			}else{
				this.scrollTop = false; 
			}
		},
		methods: {
			topScrollTap:function(){
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			},
			getList(action = 1) {  
				let activeTab = this.newsList[this.tabIndex];
				if (action === 1) {
					activeTab.page = 0;
				}	
				activeTab.page==0?activeTab.page=1:activeTab.page=activeTab.page;
				this.$Request.post(this.$api.home.newsmoduledata,{keywords:this.keywords,moduleid:this.moduleid,cateid:activeTab.cateid,minId:activeTab.minId,page:activeTab.page,forom:"H5"}).then(res => {				
					console.log(res.data);
					if (res.code == "0000") {
						const data = res.data.map((news,index) => {
							var type = "";
							if(news.imgList.length>2){
								type = 3;
							}else{
								if(news.thumb!=""){
									index % 4==0? type = 2:type=1;
								}else{
									type = 0;
								}
							}
							
							return {
								id: news.itemid,
								article_type: type,
								datetime: friendlyDate(news.addtime),
								title: news.title,
								image_url: news.thumb,
								image_list: news.imgList,
								source: news.editor,
								introduce: news.introduce,
								comment_count: news.hits,
								post_id: news.catid,
								catname: news.catname,
								istoday:news.istoday
							};
						});
						console.log(data);
						if (action === 1) {
							activeTab.data = data;
							this.refreshing = false;
						} else {
							data.forEach((news) => {
								activeTab.data.push(news);
							});
						}
						activeTab.page = activeTab.page+1;
						console.log(data.length);
						if(data.length<10){
							activeTab.loadingText="noMore"
						}
						uni.removeStorage({
							key: 'newscateid',
							success: function (res) {
								//console.log('success');
							}
						});
					}
				})	
				
			},
			loadNavList: function(Refresh) {				
				this.$Request.post(this.$api.home.newscatedata,{moduleid:this.moduleid}).then(res => {
					if (res.code == "0000") {
						this.tabBars = res.data;
// 						uni.setNavigationBarTitle({
// 							title: res.data[0].name
// 						});
						uni.getStorage({
							key: 'newscateid',
							success: (res) => {
								var OldKeys = JSON.parse(res.data);
								this.cateid = OldKeys;
							}
						});
						this.tabBars.forEach((tabBar,index) => {
							if(this.cateid==tabBar.catid){
								this.tabIndex = index;
								this.tapTab(this.tabIndex);
							}
							this.newsList.push({
								data: [],
								cateid: tabBar.catid,
								page: 0,
								pageSize: 10,
								loadingText: 'loading'
							});
							tabBar.ref = "ref_"+tabBar.catid;
						});
						// console.log(this.tabBars);
						this.getList();
					}
				})	
			},
			goDetail(e) {
				//console.log();
				uni.navigateTo({
					// url: '/pages/detail/detail?query=' + encodeURIComponent(JSON.stringify(detail))
					url: '/pages/detail/detail?catid=' + e.post_id +'&itemid='+e.id
				});
			},
			dislike(tabIndex, newsIndex) {
				uni.showModal({
					content: '不感兴趣？',
					success: (res) => {
						if (res.confirm) {
							this.newsList[tabIndex].data.splice(newsIndex, 1);
						}
					}
				})
			},
			loadMore() {
				this.getList(2);
			},
			async changeTab(event) {
				let index = event.detail.current;
				if (this.isClickChange) {
					this.tabIndex = index;
					this.isClickChange = false;
					return;
				}
				
				let tabBar = await this.getElSize('tab-bar');
				let tabBarScrollLeft = tabBar.scrollLeft;
				let width = 0;
				
				for (let i = 0; i < index; i++) {
					console.log(this.tabBars[i].ref);
					let result = await this.getElSize(this.tabBars[i].ref);
					width += result.width;
				}
				let winWidth = uni.getSystemInfoSync().windowWidth,
					nowElement = await this.getElSize(this.tabBars[index].ref),
					nowWidth = nowElement.width;
				if (width + nowWidth - tabBarScrollLeft > winWidth) {
					this.scrollLeft = width + nowWidth - winWidth;
				}
				if (width < tabBarScrollLeft) {
					this.scrollLeft = width;
				}
				
				this.isClickChange = false;
				this.tabIndex = index;
				// 首次切换后加载数据
				const activeTab = this.newsList[this.tabIndex];
				if (activeTab.data.length === 0) {
					this.getList();
				}
			},
			getNodeSize(node) {
				return new Promise((resolve, reject) => {
					dom.getComponentRect(node, (result) => {
						resolve(result.size);
					});
				});
			},
			onRefresh(event) {
				this.refreshText = '正在刷新...';
				this.refreshing = true;
				this.getList();
			},
			getElSize(id) { //得到元素的size
				return new Promise((res, rej) => {
					uni.createSelectorQuery().select('#' + id).fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						res(data);
					}).exec();
				});
			},
			async tapTab(index) { //点击tab-bar
				if (this.tabIndex === index) {
					return false;
				} else {
					let tabBar = await this.getElSize('tab-bar'),
						tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
					this.scrollLeft = tabBarScrollLeft;
					this.isClickChange = true;
					this.tabIndex = index;
					// 首次切换后加载数据
					const activeTab = this.newsList[this.tabIndex];
					if (activeTab.data.length === 0) {
						this.getList();
					}
				}
			},
			
		}
	}
</script>
<style lang='scss'>
	@import '../../static/css/index.css';
	@import "../../static/css/icon.css";
	page {
		background-color: #FFFFFF;
		height: 100%;
		font-size: 11px;
		line-height: 1.8;
	}

	.uni-tab-bar {
		display: flex;
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		height: 100%;
	}

	.uni-tab-bar .list {
		width: 750upx;
		height: 100%;
	}

	.uni-swiper-tab {
		width: 100%;
		white-space: nowrap;
		line-height: 100upx;
		height: 100upx;
		border-bottom: 1px solid #c8c7cc;
	}

	.swiper-tab-list {
		font-size: 30upx;
		width: 150upx;
		display: inline-block;
		text-align: center;
		color: #555;
	}

	.uni-tab-bar .active {
		color: #fc2c5d;
		
	}

	.uni-tab-bar .swiper-box {
		flex: 1;
		width: 100%;
		height: calc(100% - 100upx);
	}

	.uni-tab-bar-loading {
		padding: 20upx 0;
	}
</style>
