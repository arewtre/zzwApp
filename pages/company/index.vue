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
						<uni-load-more :loadingType="tabItem.loadingText" :contentText="loadingText"></uni-load-more>
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
			this.moduleid = event.moduleid;
			if(event.keywords!= undefined){
				this.keywords = decodeURIComponent(event.keywords);
			}
			this.loadNavList();
			// 初始化列表信息
		},
		methods: {
			getList(action = 1) {  
				let activeTab = this.newsList[this.tabIndex];
				if (action === 1) {
					activeTab.page = 0;
				}				
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
						//console.log(data);
						if (action === 1) {
							activeTab.data = data;
							this.refreshing = false;
						} else {
							data.forEach((news) => {
								activeTab.data.push(news);
							});
						}
						activeTab.page = activeTab.page+1;
						//console.log(data.length);
						if(data.length<10){
							//console.log(data.length);
							activeTab.loadingText="noMore"
						}
						//console.log(activeTab);
			
					}
				})	
				
			},
			loadNavList: function(Refresh) {				
				this.$Request.post(this.$api.home.newscatedata,{moduleid:this.moduleid}).then(res => {
					if (res.code == "0000") {
						this.tabBars = res.data;
						uni.setNavigationBarTitle({
							title: res.data[0].name
						});
						this.tabBars.forEach((tabBar) => {
							this.newsList.push({
								data: [],
								cateid: tabBar.catid,
								page: 0,
								pageSize: 10,
								loadingText: '加载中...'
							});
						});
						//console.log(this.newsList);
						this.getList();
					}
				})	
			},
			goDetail(e) {
				console.log(e);
				uni.navigateTo({
					// url: '/pages/detail/detail?query=' + encodeURIComponent(JSON.stringify(detail))
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
				let index = event.detail.current;
				if (this.isClickChange) {
					this.tabIndex = index;
					this.isClickChange = false;
					return;
				}
				this.isClickChange = false;
				this.tabIndex = index;

				// 首次切换后加载数据
				const activeTab = this.newsList[this.tabIndex];
				if (activeTab.data.length === 0) {
					this.getList();
				}
			},
			async tapTab(index) { //点击tab-bar
				if (this.tabIndex === index) {
					return false;
				} else {
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
