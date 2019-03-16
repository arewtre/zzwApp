<template>
	<view class="index-content">

		<!-- 搜索板块 -->
		<view class="index-header">
			<view class="icon_header">
				<view class="logo"><image src="/static/img/logo.jpg" mode="widthFix"></image></view>
				<view class="index-search" @tap="toSearchIndex">
					<view class="icon_search">
						<text class="iconfont icon-search"></text>
						<text>请输入搜索关键字</text>
					</view>
				</view>
				<view class="icon_suji" @tap="toZujiIndex">
					<text class="iconfont icon-wode"></text> 
				</view>
			</view>
		</view>
		<!-- 搜索板块 -->

		<!-- banner板块 -->
		<view class="index-banner">
			<view class="swiper" v-if="banner.length > 0">
				<swiper class="swiper-container" :autoplay="true" :interval="4000" :circular="true">
					<block v-for="(item,index) in banner" :key="index">
						<swiper-item class="swiper-wrapper swi"  @click="gpToDetail(item)">
							<image :src="item.thumb" mode="widthFix"></image>
							{{item.title}}
							<view class="tit">{{item.title}}</view>
						</swiper-item>
					</block>
				</swiper>
			</view>
		</view>
		<!-- banner -->

		<!-- 导航栏板块 -->
		<view class="index-navlist s-grids has-bg-white has-pdtb-10" v-if="navlist.length > 0">
			<view class="is-col-1-5 is-center" v-for="(nav,index) in navlist" :key="index" @tap="gpToNews(nav)">
				<view class="has-pdtb-5">
					<!-- <image :src="nav.image" mode="widthFix"></image> -->
					<view class="is-size-14">{{nav['title']}}</view>
				</view>
			</view>
		</view>
		<!-- 导航栏板块 -->

		<!-- 专题板块 -->
		<view class="home_ant_juhuasuan has-bg-white" v-if="zhuantidatalist.length > 0">
			<view class="juhuasuan-tab s-row">
				<text class="fl-jutext">热点专题</text>
				<text class="fr-jutext">查看更多热点专题</text>
			</view>
			<swiper class="imageContainer" previous-margin="60rpx" next-margin="60rpx" circular  autoplay>
				<block v-for="(item,index) in zhuantidatalist" :key="index">
					<swiper-item class="swiperitem" @click="goToSpecia(item)">
						<image class="itemImg" :src="item.thumb" lazy-load mode="scaleToFill"></image>
					</swiper-item>
				</block>
			</swiper>
		</view>
		<!-- 专题板块 -->

		<!-- 热门资讯 -->
		<view class="index-coupon has-bg-white has-pd-10">
			<view class="coupon-tab s-row">
				<text class="fl-jutext">热门资讯</text>
				<text class="fr-jutext">更多热门资讯</text>
			</view>
			<news-list :data="zixundatalist"></news-list>
		</view>
		<!-- 热门资讯 -->
		
		<!-- 视点 -->
		<view class="index-coupon has-bg-white has-pd-10">
			<view class="coupon-tab s-row">
				<text class="fl-jutext">视点</text>
				<text class="fr-jutext">更多视点资讯</text>
			</view>
			<news-list :data="shidiantidatalist"></news-list>
		</view>
		<!-- 视点 -->
		
		<!-- 加载更多提示 -->
		<!-- <view class="s-col is-col-24" v-if="couponlist.length > 0">
			<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
		</view> -->
		<!-- 加载更多提示 -->
		
	</view>
</template>

<script>
	// import cmdIcon from "@/components/cmd-icon/cmd-icon.vue";
	import newsList from '@/components/newslist/newslist.vue';
	export default {
		components: {
			// cmdIcon,
			newsList
		},
		data() {
			return {
				banner: [],
				navlist: [],
				zixundatalist: [],
				zhuantidatalist:[],
				shidiantidatalist:[],
				couponlist: [],
				page: 1,
				loadingType: 0,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				}
			}
		},
		methods: {
			loadBanner: function(Refresh) {
				var indexBanner = this.$SysCache.get("app_index_banner");
				//console.log(indexBanner);
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
				//console.log(indexNav);
				if(indexNav){
					this.navlist = indexNav;
				}else{
					this.$Request.post(this.$api.home.navlist).then(res => {
						//console.log(res.data);
						if (res.code == "0000") {
							this.navlist = res.data;
							this.$SysCache.put("app_index_navlist",res.data,86400);
						}
					})	
				}
			},
			zixunlist: function(Refresh) {
				var indexzixundatalist = this.$SysCache.get("app_index_zixundatalist");
				//console.log(indexBanner);
				if(indexzixundatalist && Refresh == undefined ){
					this.zixundatalist  = indexzixundatalist;
				}else{
					this.$Request.post(this.$api.home.sydata,{thumb:1}).then(res => {
						//console.log(res.data);
						if (res.code == "0000") {
							this.zixundatalist =  res.data;
							this.$SysCache.put("app_index_zixundatalist",res.data,300);
						}
						 
					})
				}
				
			},
			zhuantilist: function(Refresh) {
				var indexzhuantidatalist = this.$SysCache.get("app_index_zhuantidatalist");
				console.log(indexzhuantidatalist);
				if(indexzhuantidatalist && Refresh == undefined ){
					this.zhuantidatalist  = indexzhuantidatalist;
				}else{
					this.$Request.post(this.$api.home.sydata,{moduleid:21,catid:14,pagesize:4,thumb:1}).then(res => {
						console.log(res.data);
						if (res.code == "0000") {
							this.zhuantidatalist = res.data;
							this.$SysCache.put("app_index_zhuantidatalist",res.data,300);
						}
					})	
				}
			},
			shidianlist: function(Refresh) {
				var indexshidiantidatalist = this.$SysCache.get("app_index_shidiantidatalist");
				//console.log(indexBanner);
				if(indexshidiantidatalist && Refresh == undefined ){
					this.shidiantidatalist  = indexshidiantidatalist;
				}else{
					this.$Request.post(this.$api.home.sydata,{moduleid:21,catid:12,pagesize:4}).then(res => {
						//console.log(res.data);
						if (res.code == "0000") {
							this.shidiantidatalist = res.data;
							this.$SysCache.put("app_index_shidiantidatalist",res.data,300);
						}
						 
					})	
				}
			},
			loadCouponList: function(type) {
				this.loadingType = 1; 
				this.$Request.post(this.$api.common.couponlist, {
					page: this.page
				}).then(res => {
					this.loadingType = 0; 
					if (res.code == 200) {
						if (this.page == 1) {
							this.couponlist = [];
						}
						res.data.forEach(d => {
							this.couponlist.push(d);
						})
					}else{
						this.loadingType = 2; 
					}
					if (type == "Refresh") {
						uni.stopPullDownRefresh(); // 停止刷新
					}
					setTimeout(t=>{
						this.loadBanner("Refresh"); // 当首页数据加载完毕后 刷新banner
					},1000); 
				}).catch(err=>{
// 					this.loadingType = 2; 
// 					this.contentText.contentnomore = "网络繁忙，请稍后再试"
				})
			},
			toNavList: function(url, title) {
				uni.showToast({
					title: title,
					mask: false,
					duration: 1500,
					icon: "none"
				});
			},
			toGoodsInfo: function(itemid) {
				uni.navigateTo({
					url:"/pages/detail/goodsinfo?itemid="+itemid,
				})
			},
			toSearchIndex:function(){
				uni.navigateTo({
					url:"/pages/search/index"
				})
			},
			toZujiIndex:function(){
				uni.showToast({
					title: "去会员页面",
					mask: false,
					duration: 1500,
					icon: "none"
				});
			},
			getSydata:function(moduleid,catid,pagesize){
				this.$Request.post(this.$api.home.sydata,{moduleid:moduleid,catid:catid,pagesize:pagesize}).then(res => {
					console.log(res.data);
					if (res.code == "0000") {
						return res.data;
					}
					 
				})
			},
			gpToDetail(e) {
				console.log(e);
			    uni.navigateTo({
					url: '/pages/detail/detail?catid=' + e.catid +'&itemid='+e.itemid,
			    })
			},
			gpToNews(e) {
				console.log(e);
			    uni.navigateTo({
					url: '/pages/news/index?moduleid=' + e.moduleid,
			    })
			},
			goToSpecia(e) {
				console.log(e);
			    uni.navigateTo({
					url: '/pages/specia/detail?urlSpecia=' + e.linkurl,
			    })
			},
		},
		onReady:function(){
			this.loadCouponList();
		},
		onLoad: function(Refresh) {
			this.loadBanner(Refresh);
			this.loadNavList(Refresh);
			this.zixunlist(Refresh);
			this.zhuantilist(Refresh);
			this.shidianlist(Refresh);
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
		}
	}
</script>

<style>
	
	@import "../../static/css/index.css";
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
	.tit{
		position:absolute;
		height:48rpx;
		line-height:48rpx;
		width:710rpx;
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
		height: 255upx;
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
</style>
