<template>
	<view>
		<view class="banner" v-if="list.thumb">
			<image class="banner-img" :src="list.thumb" model="aspectFill"></image>
			<view class="banner-title">{{list.company}}</view>
		</view>
		<!-- 导航栏板块 -->
		<view class="index-navlist s-grids has-bg-white has-pdtb-10">
			<view class="is-col-6 is-center" v-for="(nav,index) in navlist" :key="index" @tap="goTocom(nav)">
				<view class="has-pdtb-6">
					<image :src="nav.imgurl" mode="widthFix"></image>
					<view class="is-size-14">{{nav.name}}</view>
				</view>
			</view>
		</view>
		<!-- 导航栏板块 -->
		<view class="center-list">
			<view class="center-list-item border-bottom" v-for="(item,index) in mode" :key="index">
				<!-- <text class="list-icon">&#xe60b;</text> -->
				<text class="list-text">{{item.name}}</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			
		</view>
	</view>
</template>

<script>
	const FAIL_CONTENT = '<p>获取信息失败</p>';
	import cmdIcon from "@/components/cmd-icon/cmd-icon.vue";
	export default {
		data() {
			return {
				list: {},
				mode: '',
				username:'',
				// itemid:'',
				navlist:[{
					name: '公司介绍',
					id: 1,
					ref: 'introduce',
					imgurl:'/static/img/company/home-introduce.png'
				}, {
					name: '新闻中心',
					id: 2,
					ref: 'news',
					imgurl:'/static/img/company/home-news.png'
				}, {
					name: '诚信档案',
					id: 3,
					ref: 'credit',
					imgurl:'/static/img/company/home-credit.png'
				}, {
					name: '联系方式',
					id: 4,
					ref: 'contact',
					imgurl:'/static/img/company/home-contact.png'
				}]
			}
		},
		components: { 
			cmdIcon,
		},
		onShareAppMessage() {
			return {
				title: this.banner.title,
				path: '/pages/detail/detail?query=' + JSON.stringify(this.banner)
			}
		},
		onLoad(event) {
			this.username = event.username;
			this.getDetail();
			
		},
		onNavigationBarButtonTap:function(e){
				console.log(e);
				var content = this.content;
				if(e.index==0){
				uni.showActionSheet({
					itemList: ['分享到朋友圈', '分享给朋友', '复制链接地址'],
					success: function (res) {
						//console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						var content = this.content;
						if(res.tapIndex==0){
							uni.share({
								provider: "weixin",
								scene: "WXSenceTimeline",
								type: 0,
								href: content.linkurl,
								title: content.title,
								summary: content.introduce,
								imageUrl: content.thumb?content.thumb:"http://www.chinapaper.net/logo.jpg",
								success: function (res) {
									console.log("success:" + JSON.stringify(res));
								},
								fail: function (err) {
									console.log("fail:" + JSON.stringify(err));
								}
							});
						}else if(res.tapIndex==1){
							
							uni.share({
								provider: "weixin",
								scene: "WXSceneSession",
								type: 0,
								href: this.content.linkurl,
								title: this.content.title,
								summary: this.content.introduce,
								imageUrl: this.content.thumb,
								success: function (res) {
									console.log("success:" + JSON.stringify(res));
								},
								fail: function (err) {
									console.log("fail:" + JSON.stringify(err));
								}
							});
						}
					},
					fail: function (res) {
						console.log(res.errMsg);
					}
				});	
			}
		},
		methods: {
			getDetail() {
				uni.showLoading({
					title: '加载中'
				});
				this.$Request.post(this.$api.company.getCompanyList,{username:this.username}).then(res => {
					console.log(res.data);
					if (res.code == "0000") {
						this.mode = res.data.m;
						this.list = res.data.com;
						uni.setNavigationBarTitle({
							title: this.list.company
						});
						 uni.hideLoading();
						//this.$SysCache.put("app_newsdetail"+this.itemid,res.data,86400);
					}else {
						this.content = FAIL_CONTENT;
					}
				})	
			},
			goTocom(e){
				uni.navigateTo({
					url: '/pages/company/'+e.ref+'?username='+this.username
				});
			}
		}
	}
</script>

<style>
	@font-face {
		font-family: texticons;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_984210_5cs13ndgqsn.ttf') format('truetype');
	}

	.center-list view{
		display: flex;
	}
	.index-navlist image {
		width: 100upx;
		height: 100upx;
	}
	.banner {
		height: 360upx;
		overflow: hidden;
		position: relative;
		background-color: #ccc;
	}
	
	.banner-img {
		width: 100%;
	}

	.banner-title {
		max-height: 84upx;
		overflow: hidden;
		position: absolute;
		left: 30upx;
		bottom: 30upx;
		width: 90%;
		font-size: 32upx;
		font-weight: 400;
		line-height: 42upx;
		color: white;
		z-index: 11;
	}

	.article-meta {
		padding: 20upx 40upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		color: gray;
	}
	.article-meta-top{
		padding: 100upx 40upx 20upx 40upx;		
	}
	.article-text {
		font-size: 30upx;
		line-height: 50upx;
		margin: 0 20upx;
	}

	.article-author,
	.article-time {
		font-size: 30upx;
		line-height: 50upx;
	}

	.article-content {
		padding: 0 30upx;
		overflow: hidden;
		font-size: 30upx;
		margin-bottom: 30upx;
	}
	
	.article-content img{
		width:100%;
	}
	.cmd-icon{
		margin-top:12rpx;
		margin-right:4rpx;
	}
	.center-list {
		background-color: #FFFFFF;
		margin-top: 20upx;
		width: 750upx;
		flex-direction: column;
	}
	
	.center-list-item {
		height: 90upx;
		width: 750upx;
		box-sizing: border-box;
		flex-direction: row;
		padding: 0upx 20upx;
	}
	
	.border-bottom {
		border-bottom-width: 1upx;
		border-color: #c8c7cc;
		border-bottom-style: solid;
	}
	
	.list-icon {
		width: 40upx;
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #2F85FC;
		text-align: center;
		font-family: texticons;
		margin-right: 20upx;
	}
	
	.list-text {
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		flex: 1;
		text-align: left;
	}
	.navigat-arrow {
		height: 90upx;
		width: 40upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		text-align: right;
		font-family: texticons;
	}
</style>
