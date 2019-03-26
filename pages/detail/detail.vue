<template>
	<view>
		<view class="banner" v-if="content.thumb">
			<image class="banner-img" :src="content.thumb" model="aspectFill"></image>
			<view class="banner-title">{{content.title}}</view>
		</view>
		<view :class="['article-meta',content.thumb==''?'article-meta-top':'']">
			<cmd-icon type="user" size="15" color="#aaa"></cmd-icon><text class="article-author">{{content.editor}}</text>
			<text class="article-text">发表于</text>
			<cmd-icon type="clock" size="15" color="#aaa"></cmd-icon><text class="article-time">{{content.addtimes}}</text>
		</view>
		<view class="article-content">
			<rich-text :nodes="content.content"></rich-text>
			<!-- <wxParse :content="content.content" @preview="preview" @navigate="navigate" /> -->
		</view>
	</view>
</template>

<script>
	const FAIL_CONTENT = '<p>获取信息失败</p>';
	import cmdIcon from "@/components/cmd-icon/cmd-icon.vue";
	import wxParse from '@/components/wxParse/wxParse';
	export default {
		data() {
			return {
				banner: {},
				content: '',
				catid:'',
				itemid:'',
			}
		},
		components: { 
			cmdIcon,
			wxParse
		},
		onShareAppMessage() {
			return {
				title: this.banner.title,
				path: '/pages/detail/detail?query=' + JSON.stringify(this.banner)
			}
		},
		onLoad(event) {
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			//console.log(event);
			this.catid = event.catid;
			this.itemid = event.itemid;
// 			try {
// 				this.banner = JSON.parse(decodeURIComponent(event.query));
// 			} catch (error) {
// 				this.banner = JSON.parse(event.query);
// 			}
			this.getDetail();
			
		},
		onNavigationBarButtonTap:function(e){
				console.log(e);
				var content = this.content;
		if(e.index==0){
// 			uni.showModal({
// 				title: '提示',
// 				content: '这是一个模态弹窗',
// 				success: function (res) {
// 					if (res.confirm) {
// 						console.log('用户点击确定');
// 					} else if (res.cancel) {
// 						console.log('用户点击取消');
// 					}
// 				}
// 			});
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
// 			var newsdetail = this.$SysCache.get("app_newsdetail"+this.itemid);
// 				if(newsdetail){
// 					this.content = newsdetail;
// 				}else{
					uni.showLoading({
						title: '加载中'
					});
					this.$Request.post(this.$api.home.newsdata,{catid:this.catid,itemid:this.itemid}).then(res => {
						// console.log(res.data);
						//console.log(JSON.stringify(res.data));
						if (res.code == "0000") {
							this.content = res.data;
							uni.setNavigationBarTitle({
								title: this.content.title
							});
							 uni.hideLoading();
							//this.$SysCache.put("app_newsdetail"+this.itemid,res.data,86400);
						}else {
							this.content = FAIL_CONTENT;
						}
					})	
				// }
			}
		}
	}
</script>

<style>
	.wxParse{width:100%}
	.wxParse uni-image{width:100% !important;}
	.wxParse .img {
		display: inline-block;
		width: 0;
		height: 0;
		max-width: 100%;
		overflow: hidden;
	}
	.banner {
		height: 360upx;
		overflow: hidden;
		position: relative;
		background-color: #ccc;
	}
	/* .MsoNormalTable{width:750upx !important;} */
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
	
	div img{
		width:100%;
	}
	.cmd-icon{
		margin-top:12rpx;
		margin-right:4rpx;
	}
</style>
