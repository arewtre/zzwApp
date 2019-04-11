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
	</view>
</template>
<script>
	import uniMediaList from '@/components/uni-company-list/uni-company-list.vue';
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
				keywords:""
			}
		},
		onLoad: function(event) {
			
			if(event.moduleid== undefined){
				
			}
			this.moduleid = event.moduleid;
			if(event.keywords!= undefined){
				this.keywords = decodeURIComponent(event.keywords);
			}
			this.loadNavList();
			// 初始化列表信息
		},
		onPullDownRefresh: function(Refresh) {
			//this.newsList = [];
			//this.loadNavList();
			//console.log(this.moduleid);
			var moduleid = this.moduleid;
			setTimeout(function () {
				uni.stopPullDownRefresh(Refresh);  //停止下拉刷新动画
				uni.navigateTo({
					url: '/pages/company/index?moduleid=' + moduleid,
				});
			}, 1000);
		},
		methods: {
			getList(action = 1) {  
				let activeTab = this.newsList[this.tabIndex];
				if (action === 1) {
					activeTab.page = 0;
					this.newsList
				}	
				activeTab.page = activeTab.page+1;
				this.$Request.post(this.$api.company.getCompanyList,{keywords:this.keywords,moduleid:this.moduleid,catid:activeTab.cateid,page:activeTab.page}).then(res => {				
					//console.log(res);
					if (res.code == "0000") {
						const data = res.data.map((news) => {
							return {
								id: news.userid,
								article_type: 1,
								// datetime: friendlyDate(news.addtime),
								title: news.company,
								image_url: news.thumb,
								areaid: news.areaid,
								mode: news.mode,
								business: news.business,
								vip: news.vip,
								validated:news.validated,
								catid:news.catid,
								username:news.username
							};
						});
						if (action === 1) {
							activeTab.data = data;
							this.refreshing = false;
						} else {
							data.forEach((news) => {
								activeTab.data.push(news);
							});
						}
						
						if(data.length<10){
							this.newsList.loadingText="noMore";
						}
						console.log(this.newsList);
					}
				})	
				
			},
			loadNavList: function(Refresh) {				
				this.$Request.post(this.$api.home.newscatedata,{moduleid:this.moduleid}).then(res => {
					if (res.code == "0000") {
						this.tabBars = res.data;
						// #ifndef MP
						uni.setNavigationBarTitle({
							title: res.data[0].name
						});
						// #endif
						this.tabBars.forEach((tabBar) => {
							this.newsList.push({
								data: [],
								cateid: tabBar.catid,
								page: 0,
								pageSize: 10,
								loadingText: '加载中...'
							});
							tabBar.ref = "ref_"+tabBar.catid;
						});
						this.getList();
					}
				})	
			},
			goDetail(e) {
				console.log(e);
				uni.navigateTo({
					url: '/pages/company/detail?username='+e.username
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
				this.newsList.loadingText="loading";
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
			}
		}
	}
</script>
<style>
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
