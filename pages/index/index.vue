<template>
	<view class="index-content">
		<!-- 头部轮播 -->
		<!-- <view class="carousel-section">
			<view class="titleNview-placing"></view>
			<view class="titleNview-background" :style="{backgroundColor:titleNViewBackground}"></view>
			<swiper class="carousel" circular @change="swiperChange">
				<swiper-item v-for="(item, index) in banner" :key="index" class="carousel-item" @click="gpToDetail(item)">
					<image :src="item.thumb" />
				</swiper-item>
			</swiper>
			<view class="swiper-dots">
				<text class="num">{{swiperCurrent+1}}</text>
				<text class="sign">/</text>
				<text class="num">{{banner.length}}</text>
			</view>
		</view> -->
		<!-- 搜索板块 -->
		<!-- <view class="index-header">
			<view class="icon_header">
				<view class="logo"><image src="/static/img/logo.jpg" mode="widthFix" lazy-load="true"></image></view>
				<view class="index-search" @tap="toSearchIndex">
					<view class="icon_search">
						<text class="iconfont icon-search"></text>
						<text>请输入搜索关键字</text>
					</view>
				</view>
				<view class="icon_suji" @tap="toZujiIndex">
					<text class="iconfont icon-profile"></text> 
				</view>
			</view>
		</view> -->
		<!-- 搜索板块 -->

		<!-- banner板块 -->
		<view class="index-banner">
			<view class="swiper" v-if="banner.length > 0">
				<swiper class="swiper-container" :autoplay="true" :interval="4000" :circular="true" >
					<block v-for="(item,index) in banner" :key="index">
						<swiper-item class="swiper-wrapper swi"  @click="gpToDetail(item)">
							<image :src="item.thumb" mode="widthFix" lazy-load="true" :class="[swiperCurrent==index?'big':'']"></image>
							<!-- {{item.title}} -->
							<text class="tittt">{{item.title}}</text>
						</swiper-item>
					</block>
				</swiper>
			</view>
		</view>
		<!-- banner -->
		
		<!-- <uni-notice-bar 
			show-icon="true" 
			scrollable="true" single="true" 
			:text="gonggaodatalist.title">
		</uni-notice-bar> -->
		<view class="uni-swiper-msg">
			<view class="uni-swiper-msg-icon">
				<image src="/static/img/toutiao.png" mode="widthFix"></image>
			</view>
			<swiper vertical="true"  autoplay="true" circular="true" interval="5000">
				<swiper-item v-for="(item, index) in gonggaodatalist" :key="index"  @click="gpToDetail(item)">
					<navigator>{{item.title}}</navigator>
				</swiper-item>
			</swiper>
		</view>

		<!-- 导航栏板块 -->
		<view class="index-navlist s-grids has-bg-white has-pdtb-10" v-if="navlist.length > 0">
			<view class="is-col-1-5 is-center" v-for="(nav,index) in navlist" :key="index" @tap="gpToNews(nav)">
				<view class="has-pdtb-5">
					<image :src="nav.thumb" mode="widthFix"></image>
					<view class="is-size-14">{{nav['title']}}</view>
				</view> 
			</view>
		</view>
		<!-- 导航栏板块 -->  
 
		<!-- 专题板块 -->
		<view class="home_ant_juhuasuan has-bg-white" v-if="zhuantidatalist.length > 0">
			<view class="juhuasuan-tab s-row">
				<text class="fl-jutext">热点专题</text>
				<text class="fr-jutext">更多热点</text>           
			</view>
			<!-- <swiper class="imageContainer" previous-margin="60rpx" next-margin="60rpx" circular  autoplay @change="swiperChange">
				<block v-for="(item,index) in zhuantidatalist" :key="index">
					<swiper-item class="swiperitem" @click="goToSpecia(item)">
						<image :src="item.thumb" lazy-load mode="scaleToFill" :class="[swiperCurrent==index?'big itemImg':'itemImg']"></image>
					</swiper-item>
				</block>
			</swiper> --> 
			<!-- <swiper class="card-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="false" :circular="true"
			 :autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
			 indicator-active-color="#0081ff">
				<swiper-item v-for="(item,index) in zhuantidatalist" :key="index" :class="cardCur==index?'cur':''">
					<view class="swiper-item">
						<image :src="item.thumb" mode="widthFix"></image>
						<image :src="item.thumb" mode="aspectFill" v-if="item.type=='image'"></image>
						<video :src="item.thumb" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
					</view>
				</swiper-item>  
			</swiper> -->
		</view>
		<!-- 专题板块 -->
		
		<!-- 热门资讯 -->
		<view class="index-coupon has-bg-white has-pd-10">
			<view class="coupon-tab s-row">
				<text class="fl-jutext">热门资讯</text>
				<text class="fr-jutext" @click="toNews(21,'')">更多热门</text>
			</view>
			<view class="bbb">
			<news-list :data="dataList.zixundatalist"></news-list></view>
		</view>
		<!-- 热门资讯 -->
		
		<!-- 视点 -->
		<view class="index-coupon has-bg-white has-pd-10">
			<view class="coupon-tab s-row">
				<text class="fl-jutext">视点</text>
				<text class="fr-jutext"@click="toNews(21,12)">更多视点</text>
			</view>
			<news-list :data="dataList.shidiantidatalist"></news-list>
		</view>
		<!-- 视点 -->
		<!-- 聚焦 -->
		<view class="index-coupon has-bg-white has-pd-10">
			<view class="coupon-tab s-row">
				<text class="fl-jutext">聚焦</text>
				<text class="fr-jutext" @click="toNews(30,566)">更多聚焦</text>
			</view>
			<news-list :data="dataList.jujiaodatalist"></news-list>
		</view>
		<!-- 聚焦 -->
		<!-- 访谈 -->
		<view class="index-coupon has-bg-white has-pd-10">
			<view class="coupon-tab s-row">
				<text class="fl-jutext">访谈</text>
				<text class="fr-jutext" @click="toNews(21,11)">更多访谈</text>
			</view>
			<news-list :data="dataList.fangtandatalist"></news-list>
		</view>
		<!-- 访谈 -->
		<!-- 展会 -->
		<view class="index-coupon has-bg-white has-pd-10">
			<view class="coupon-tab s-row">
				<text class="fl-jutext">展会</text>
				<text class="fr-jutext" @click="toNews(26,'')">更多展会</text>
			</view>
			<news-list :data="dataList.zhanhuidatalist"></news-list>
		</view>
		<!-- 展会 -->
		
		
	</view>
</template>

<script>
	import newsList from '@/components/newslist/newslist.vue';
	import uniNoticeBar from "@/components/uni-notice-bar/uni-notice-bar.vue";
	import {
		friendlyDate
	} from '@/common/util.js';
	var bitmap = null;
	export default {
		components: {   
			newsList,
			uniNoticeBar,
		}, 
		data() {
			return {
				banner: [],
				navlist: [],
				dataList:[],
				zixundatalist: [],
				zhuantidatalist:[],
				shidiantidatalist:[],
				couponlist: [],
				gonggaodatalist: [],
				page: 1,
				loadingType: 0,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				swiperCurrent:0,
				cardCur:0,
				dotStyle:false
				
			}
		},
		onNavigationBarSearchInputClicked: async function(e) {
			this.toSearchIndex();
		},
		computed:{

		},
		onReady:function(){
			if(!uni.getStorageSync('ifLaunch')) 
				uni.navigateTo({
				url: '../guide/guide'
			})
			uni.hideLoading();
		},
		onShow:function() {
			var icon = plus.nativeObj.View.getViewById("icon");
			if (icon) {
				setTimeout(function(){
					icon.show();
				},100)
			}
		},
		onLoad: function(Refresh) {
			uni.showLoading({
				title: '玩命加载中..'
			});
			this.loadBanner(Refresh);
			this.loadNavList(Refresh);
			this.zixunlist(Refresh);
			this.zhuantilist(Refresh);
			this.jujiaolist(Refresh);
			this.shidianlist(Refresh);
			this.fangtanlist(Refresh);
			this.zhanhuilist(Refresh);
			this.gonggaolist(Refresh);
			
		},
		onReachBottom: function() {
			this.page = this.page + 1;
			//this.loadCouponList();
		},
		onPullDownRefresh: function(Refresh) {
			this.page = 1;
			this.loadBanner(Refresh); 
			this.zixunlist(Refresh);
			this.zhuantilist(Refresh);
			this.shidianlist(Refresh);
			setTimeout(function () {
				uni.stopPullDownRefresh(Refresh);  //停止下拉刷新动画
			}, 1000);
		},
		methods: {
			loadBanner: function(Refresh) {
				var indexBanner = this.$SysCache.get("app_index_banner");
				if(indexBanner && Refresh == undefined ){ 
					this.banner  = indexBanner;
				}else{
					this.$Request.post(this.$api.home.banner).then(res => {
						if (res.code == "0000") {
							this.banner = res.data;
							this.$SysCache.put("app_index_banner",res.data,300);
						}
					})
				}
			},
			loadNavList: function(Refresh) {
				var indexNav = this.$SysCache.get("app_index_navlist");
				if(indexNav){
					this.navlist = indexNav;
				}else{
					this.$Request.post(this.$api.home.navlist).then(res => {
						if (res.code == "0000") {
							this.navlist = res.data;
							this.$SysCache.put("app_index_navlist",res.data,86400);
						}
					})	
				}
			},
			zhuantilist: function(Refresh) {
				var indexzhuantidatalist = this.$SysCache.get("app_index_zhuantidatalist");
				if(indexzhuantidatalist && Refresh == undefined ){
					this.zhuantidatalist  = indexzhuantidatalist;
				}else{
					this.$Request.post(this.$api.home.sydata,{moduleid:21,catid:14,pagesize:4,thumb:1}).then(res => {
						if (res.code == "0000") {
							this.zhuantidatalist = res.data;
							this.$SysCache.put("app_index_zhuantidatalist",res.data,300);
						}
					})	
				}
			},
			zixunlist: function(Refresh) {
				var indexzixundatalist = this.$SysCache.get("app_index_zixundatalist");
				if(indexzixundatalist && Refresh == undefined ){
					this.dataList.zixundatalist  = indexzixundatalist;
				}else{
					this.getNewsData("21",'',"zixundatalist",3);
				}	
			},
			shidianlist: function(Refresh) {
				var indexshidiantidatalist = this.$SysCache.get("app_index_shidiantidatalist");
				if(indexshidiantidatalist && Refresh == undefined ){
					this.dataList.shidiantidatalist  = indexshidiantidatalist;
				}else{
					this.getNewsData("21",'12',"shidiantidatalist",3);	
				}
			},
			jujiaolist: function(Refresh) {
				var indexjujiaodatalist = this.$SysCache.get("app_index_jujiaodatalist");
				if(indexjujiaodatalist && Refresh == undefined ){
					this.dataList.jujiaodatalist  = indexjujiaodatalist;
				}else{
					this.getNewsData("30",'566',"jujiaodatalist",3);	
				}
			},
			fangtanlist: function(Refresh) {
				var indexfangtandatalist = this.$SysCache.get("app_index_fangtandatalist");
				if(indexfangtandatalist && Refresh == undefined ){
					this.dataList.fangtandatalist  = indexfangtandatalist;
				}else{
					this.getNewsData("21",'11',"fangtandatalist",2);	
				}
			},
			zhanhuilist: function(Refresh) {
				var indexzhanhuidatalist = this.$SysCache.get("app_index_zhanhuidatalist");
				if(indexzhanhuidatalist && Refresh == undefined ){
					this.dataList.zhanhuidatalist  = indexzhanhuidatalist;
				}else{
					this.getNewsData("26",'',"zhanhuidatalist",3);	
				}
			},
			toNavList: function(url, title) {
				uni.showToast({
					title: title,
					mask: false,
					duration: 1500,
					icon: "none"
				});
			},
			gonggaolist: function(Refresh) {
				var indexgonggaodatalist = this.$SysCache.get("app_index_gonggaodatalist");
				//console.log(indexgonggaodatalist);
				if(indexgonggaodatalist && Refresh == undefined ){
					this.gonggaodatalist  = indexgonggaodatalist;
				}else{
					this.$Request.post(this.$api.home.getgonggao,{moduleid:21}).then(res => {
						// console.log(res.data);
						if (res.code == "0000") {
							// this.gonggaodatalist = res.data[0];
							this.gonggaodatalist = res.data;
							this.$SysCache.put("app_index_gonggaodatalist",res.data,300);
						} 
					})	
				}
			},
			toSearchIndex:function(){
				uni.navigateTo({
					url:"/pages/search/index",
				})
			},
			toZujiIndex:function(){
				uni.switchTab({
					url:"/pages/ucenter/ucenter",
				})
			},
			getSydata:function(moduleid,catid,pagesize){
				this.$Request.post(this.$api.home.sydata,{moduleid:moduleid,catid:catid,pagesize:pagesize}).then(res => {
					//console.log(res.data);
					if (res.code == "0000") {
						return res.data;
					}
					 
				})
			},
			gpToDetail(e) {
				//console.log(e);
			    uni.navigateTo({
					url: '/pages/detail/detail?catid=' + e.catid +'&itemid='+e.itemid,
			    })
			},
			goDetail(e) {
				console.log(e);
				uni.navigateTo({
					// url: '/pages/detail/detail?query=' + encodeURIComponent(JSON.stringify(detail))
					url: '/pages/detail/detail?catid=' + e.post_id +'&itemid='+e.id
				});
			},
			gpToNews(e) {
				//console.log(e);
				uni.setStorageSync('newsmoduleid',  e.moduleid);
				if(e.moduleid==4){
					uni.navigateTo({
						url: '/pages/company/index?moduleid=' + e.moduleid,
					})
				}else{
					uni.navigateTo({
						url: '/pages/news/index?moduleid=' + e.moduleid,
					})
				}
			},
			toNews(moduleid,cateid) {
				//console.log(e);
				uni.setStorageSync('newsmoduleid',  moduleid);
				uni.setStorageSync('newscateid',  cateid);
				if(moduleid==4){
					uni.navigateTo({
						url: '/pages/company/index?moduleid=' + moduleid,
					})
				}else{
					uni.navigateTo({
						url: '/pages/news/index?moduleid=' + moduleid,
					})
				}
			},
			goToSpecia(e) {
				//console.log(e);
				uni.setStorageSync('urlSpecia',  e.linkurl);
			    uni.navigateTo({
					url: '/pages/specia/detail',
					//url:e.linkurl,
			    })
				
			},
			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
				this.titleNViewBackground = this.banner[index].background;
			},		
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			getNewsData(moduleid,cateid,dataname,pagesize){
				this.$Request.post(this.$api.home.newsmoduledata,{moduleid:moduleid,cateid:cateid,pagesize:pagesize}).then(res => {
					console.log(res.data);
					if (res.code == "0000") {
						const datas = res.data.map((news,index) => {
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
							 if(cateid==11){
							 	type = 0;
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
								catname: news.catname
							};
						});
						this.dataList[dataname] =  datas;
						this.$SysCache.put("app_index_"+dataname,datas,300);
					}
					 
				})
			}
		},
	}
</script>

<style lang='scss'>
	
	@import "../../static/css/index.css";
	@import "../../static/css/uni.css";
	.icon-profile{
		font-size:44upx
	}
	.logo image{
		width:180rpx;
		height:72rpx; 
		display:flex;
		position:absolute;
		left:18rpx;
		top:16rpx;
		z-index:99;
	}
	.icon-wode{
		font-size:50rpx;
	}
	.swi{
		position:relative;
	}
	.tittt{
		position:absolute;
		height:48rpx;
		line-height:48rpx;
		width:750rpx;
		bottom:0;
		left:0;
		text-align:center;
		color:#fff;
		padding:4rpx 20rpx;
		overflow: hidden;
		z-index:99;
		font-size:26rpx;
	    background: rgba(0,0,0,.5);
		
	}
	/* 3D轮播样式 */
	.imageContainer {
		width: 100%;
		/* height: 500rpx; */
		/* background: #000; */
		height: 400upx;
		background-color: #fff;
	}
	
	.swiperitem {
		/* height: 500rpx; */
		height: 305upx;
		padding: 0 20upx;
		box-sizing: border-box;
		position: relative;
	}
	
	.swiperitem .swiperText {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		top: 56upx;
		left: 51upx;
		z-index: 998;
		width:162upx;
		height:163upx;
		background:rgba(255,255,255,1);
		border-radius:8upx;
		padding:10upx;
		
	}
	
	.swiperitem .swiperText .name {
		font-size:26upx;
		font-weight:500;
		color:rgba(253,57,91,1);
		line-height:37upx;
		margin-bottom: 10upx;
	}
	.swiperitem .swiperText .zq,.cz {
		font-size:20upx;
		color:rgba(253,57,91,1);
		line-height:35upx;
	}
	
	.swiperitem .swiperText .addNl {
		width:120upx;
		height:26upx;
		background:rgba(253,57,91,1);
		border-radius:13upx;
		font-size:20upx;
		font-weight:500;
		color:rgba(255,255,255,1);
		text-align: center;
		line-height: 26upx;
		margin-top: 10upx;
	}
	
	.itemImg {
		position: absolute;
		width: 95%;
		/* height: 380rpx; */
		height: 350upx;
		border-radius: 15rpx;
		z-index: 5;
		top: 5%;
		box-shadow:0 4upx 15upx 0 rgba(153,153,153,0.24);
	}
	
	.swiperactive {
		width: 95%;
		opacity: 1;
		z-index: 10;
		/* height: 430rpx; */
		height: 287upx;
		top: 0;
		transition: all .2s ease-in 0s;
	}
	
	.zhankai{
		text-align: center;
		
	}
	.zhankai .iconfont{
		margin-left: 10upx;
	}
	
	/* 公告 */
	.uni-swiper-msg{
		width: 90%;
		padding-left:20upx;
		padding-right:20upx;
	}
	/* .has-pdtb-10 {
		padding-left:4upx;
		padding-right:4upx;
	} */
	.has-pd-10{
		padding-left:26upx !important;
		padding-right:26upx !important;
	}
	/* .index-navlist,.uni-swiper-msg{display:block !important} */
	
	.index-navlist {
	    /* padding-left:35upx */
	}
	.bbb{
	   display: flex;
	   flex-direction: column;
	   box-sizing: border-box; 
	}
	/* #ifdef H5 */
	.index-navlist {
	    /* padding-left:0upx */
	}
	/* #endif */
</style>
