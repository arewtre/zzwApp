<template>
	<view class="uni-tab-bar">
		<view class="uni-flex uni-row">
			<view class="text" style="width: 220upx;" @click="chooseCate">{{defaultCate}}<text class="yticon icon-xia"></text></view>
			<!-- <view class="text" style="flex: 1;"> -->
				<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft" style="flex: 1;">
					<view v-for="(tab, index) in tabBars" :key="tab.ref" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']"
					 :id="tab.ref" :data-current="index" @click="tapTab(index)">{{tab.name}}</view>
				</scroll-view>
			<!-- </view> -->
		</view>
		
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
		<mpvue-picker
			:themeColor="themeColor"
			ref="mpvuePicker"
			:mode="modes"
			:deepLength="deepLength"
			:pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirm"
			@onCancel="onCancel"
			:pickerValueArray="pickerValueArray"
		></mpvue-picker>
	</view>
</template>
<script>
	import uniMediaList from '@/components/uni-media-list/uni-media-list.vue';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
	
	import {
		friendlyDate
	} from '@/common/util.js';
  
	export default {
		components: {
			uniMediaList,
			uniLoadMore,
			mpvuePicker
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
				defaultCate:"文化用纸",
				parent_id:"16",
				keywords:"",
				pickerValueArray:[],
				themeColor: '#007AFF',
				modes: '',
				deepLength: 1,
				pickerValueDefault: [0],
			}
		},
		onLoad: function(event) {
			//this.moduleid = event.moduleid;
			if(event.parent_id!= undefined){
				this.parent_id = decodeURIComponent(event.parent_id);
			}
			this.loadNavList();
			this.loadCatesList();
			// 初始化列表信息
		},
		methods: {
			getList(action = 1) {  
				let activeTab = this.newsList[this.tabIndex];
				if (action === 1) {
					activeTab.page = 0;
					//this.newsList = [];
				}	
				//console.log(activeTab.page);
				activeTab.page==0?activeTab.page=1:activeTab.page=activeTab.page;
				this.$Request.post(this.$api.data.getDataList,{cid:activeTab.cateid,page:activeTab.page}).then(res => {				
					console.log(res);
					if (res.code == "1") {
						const data = res.result.map((news) => {
							return {
								id: news.id,
								article_type: 0,
								datetime: friendlyDate(news.published_time),
								title: news.post_title,
								source: news.username,
								comment_count: news.post_hits,
								post_id: news.category_id,
								catname: news.tag
							};
						});
						if (action === 1) {
							activeTab.data = data;
							this.refreshing = false;
						}else {
							data.forEach((news) => {
								activeTab.data.push(news);
							});
						}
						activeTab.page = activeTab.page+1;
					}
					if(res.result.length<20){
						console.log(res.result.length);
						activeTab.loadingText="noMore"
					}
					uni.hideLoading();
				})	
				
			},
			loadNavList: function(Refresh) {
				console.log(this.parent_id);
				uni.showLoading({
					title: '玩命加载中..'
				});
				this.tabBars = "";
				if (Refresh) {
					this.tabIndex = 0;
					this.newsList =[];
				}
				this.$Request.post(this.$api.data.getCategory,{parent_id:this.parent_id}).then(res => {
					if (res.code == "1") {
						this.tabBars = res.result;
						console.log(res);
						this.tabBars.forEach((tabBar) => {
							tabBar.name = tabBar.name.substr(tabBar.name.length-2,2);
							this.newsList.push({
								data: [],
								cateid: tabBar.id,
								page: 1,
								pageSize: 20,
								loadingText: 'loading'
							});
						});
						//console.log(this.newsList);
						this.getList();
					}
				})	
			},
			loadCatesList: function(Refresh) {				
				this.$Request.post(this.$api.data.getCategory,{parent_id:0}).then(res => {
					if (res.code == "1") {
						this.pickerValueArray = res.result;
						this.pickerValueArray.forEach((cate,index) => {
							cate.label = cate.name;
							cate.value = cate.id; 
							if(cate.id==this.parent_id ){
								this.defaultCate = cate.name;
								//console.log(this.defaultCate);
								this.pickerValueDefault = [index];
							}
						});
					}
				})	
			},
			goDetail(e) {
				console.log();
				uni.navigateTo({
					// url: '/pages/detail/detail?query=' + encodeURIComponent(JSON.stringify(detail))
					url: '/pages/datas/detail?catid=' + e.post_id +'&itemid='+e.id
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
			chooseCate(e) {
				this.showSinglePicker();
				
			},
			onCancel(e) {
					console.log(e);
			},
			// 单列
			showSinglePicker() {
				//this.pickerValueArray = this.navlist;
				this.modes = "selector";
				this.deepLength = 1;
				this.pickerValueDefault = [0];
				this.$refs.mpvuePicker.show();
			},
			onConfirm(e) {
				this.defaultCate = e.label;
				this.parent_id =  e.value[0];
				this.loadNavList(1);
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
	.uni-flex {
		display: flex;
		flex-direction: row;
		/* margin-bottom:24upx; */
		border-bottom: 1px solid #c8c7cc;
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
		/* width: 70%; */
		white-space: nowrap;
		line-height: 100upx;
		height: 100upx;
	}

	.swiper-tab-list {
		font-size: 30upx;
		width: 170upx;
		display: inline-block;
		text-align: center;
		color: #555;
		text-overflow: ellipsis;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
		height:80upx;
		line-height:80upx;
	}

	.uni-tab-bar .active {
		color: #fc2c5d;
		border-bottom:2px solid #fc2c5d
		
	}

	.uni-tab-bar .swiper-box {
		flex: 1;
		width: 100%;
		height: calc(100% - 100upx);
	}

	.uni-tab-bar-loading {
		padding: 20upx 0;
	}
	.flex-item {
		width: 28%;
		height: 200upx;
		text-align: center;
		line-height: 200upx;
	}
	
	.flex-item-V {
		width: 100%;
		height: 150upx;
		text-align: center;
		line-height: 150upx;
	}
	.text{
		/* margin:15upx 10upx; */
		padding: 0 20upx;
		/* background-color: #ebebeb; */
		height:80upx;
		line-height:80upx;
		text-align: center;
		color: #555;
		font-size: 30upx;
	}
	.icon-xia{font-size:38upx;margin-top:6upx;margin-left:4upx}
</style>
