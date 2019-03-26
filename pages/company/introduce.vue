<template>
	<view>
		<view class="banner" v-if="content.thumb">
			<image class="banner-img" :src="content.thumb" model="aspectFill"></image>
			<view class="banner-title">{{content.com.company}}</view>
		</view>
		<view class="article-content">
			<!-- <rich-text :nodes="content.content"></rich-text> -->
			<wxParse :content="content.content" @preview="preview" @navigate="navigate" />
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
				act: '',
				username:'',
				content:""
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
			this.act = event.act;
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
				this.$Request.post(this.$api.company.getCompanyList,{action:"introduce",username:this.username}).then(res => {
					console.log(res.data);
					if (res.code == "0000") {
						this.content = res.data;
						uni.setNavigationBarTitle({
							title: res.data.com.company
						});
						 uni.hideLoading();
						//this.$SysCache.put("app_newsdetail"+this.itemid,res.data,86400);
					}else {
						this.content = FAIL_CONTENT;
					}
				})	
			}
		}
	}
</script>

<style>
	@import url("../../components/wxParse/wxParse.css");
	.video-video{
		width: 100%;
	}
	.body-view{
		overflow-x: hidden;
		height: auto;
		width: 100%;
		padding-bottom: 140upx;
	}
	.uni-icon {
		margin-right:8upx;
		margin-top:-5upx;
	}
	.wxParse .h1>uni-view {
		font-size: 15px;
		margin: 0.67em 0;
	}
	.wxParse .img img{
		/* display: inline-block; */
		width: 100%;
		overflow: hidden;
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
		padding: 20upx 30upx;
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
</style>
