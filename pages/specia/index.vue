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
				moduleid:21,
				keywords:"",
				cateid:""
			}
		},
		onLoad: function(event) {
			//this.moduleid = event.moduleid;
			//this.keywords = event.keywords;
			this.loadNavList();
			// 初始化列表信息
		},
		methods: {
			getList(action = 1) {  
				let activeTab = this.newsList[this.tabIndex];
				if (action === 1) {
					activeTab.page = 0;
				}	
				activeTab.page==0?activeTab.page=1:activeTab.page=activeTab.page;
				this.$Request.post(this.$api.home.newsmoduledata,{moduleid:this.moduleid,cateid:activeTab.cateid,minId:activeTab.minId,page:activeTab.page,isSpecia:1,forom:"H5"}).then(res => {				
					if (res.code == "0000") {
						const data = res.data.map((news,index) => {
							var type = "";
							if(news.imgList.length>2){
								type = 3;
							}else{
								if(news.thumb!=""){
									index % 4==0? type = 2:type=1;
									if(index % 5==0)type =0;
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
								source: news.editor,
								comment_count: news.hits,
								post_id: news.catid,
								linkurl: news.linkurl,
								catname: news.catname
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
						if(data.length<10){
							this.activeTab.loadingText  =  'noMore';								
						}
					}
				})	
				
			},
			loadNavList: function(Refresh) {				
				this.$Request.post(this.$api.home.newscatedata,{moduleid:this.moduleid,isSpecia:1}).then(res => {
					if (res.code == "0000") {
						//console.log(res);
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
								loadingText: 'loading'
							});
						});
						console.log(this.newsList);
						this.getList();
					}
				})	
			},
			goDetail(e) {
				console.log(e);
				uni.setStorageSync('urlSpecia',  e.linkurl);
				uni.navigateTo({
					// url: '/pages/detail/detail?query=' + encodeURIComponent(JSON.stringify(detail))
					url: '/pages/specia/detail?catid=' + e.post_id +'&itemid='+e.id
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
