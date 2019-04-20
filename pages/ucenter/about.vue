<template>  
    <view class="container">  
		<view class="user-section">
			<image class="bgg" src="/static/img/logoo.png"></image>
			<view class="system">for {{systems}}IOS 12.0</view>
			<image class="qrcode" src="/static/img/erweima01.png"></image>
			<view class="saomiao">扫描二维码下载中纸网APP</view>
		</view>
		
		<!-- <view 
			class="cover-container"
			:style="[{
				transform: coverTransform,
				transition: coverTransition
			}]"
			@touchstart="coverTouchstart"
			@touchmove="coverTouchmove"
			@touchend="coverTouchend"
		> -->
			<!-- <image class="arc" src="/static/arc.png"></image> -->
			<!-- 浏览历史 -->
			<view class="history-section icon"> 
				<list-cell @eventClick="navTo('/pages/ucenter/my?mid=16')" icon="icon-pinglun-copy" iconColor="#e07472" title="特别声明"></list-cell>
				<list-cell @eventClick="navTo('/pages/ucenter/my?mid=16')" icon="icon-bangzhu" iconColor="#5fcda2" title="使用帮助"></list-cell>
				<list-cell @eventClick="navTo('/pages/ucenter/my?mid=16')" icon="icon-share" iconColor="#9789f7" title="隐私政策" tips=""></list-cell>
			</view> 
			<text class="foot">Copyright © 2002-2019 中纸网版权所有</text>
		</view>
    </view>  
</template>  
<script>  
	import listCell from '@/components/mix-list-cell';
    import {  
        mapState 
    } from 'vuex';  
	let startY = 0, moveY = 0, pageAtTop = true;
    export default {
		components: {
			listCell
		},
		data(){
			return {
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				avatarUrl: '/static/logo.png',
				systems:''
			}
		},
		onLoad(){
			this.getSystems();
		},
		onShow(){
			this.getSystems();
		},
		// #ifndef MP
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.navTo('/pages/set/set');
			}
		},
		// #endif
        computed: {
			 ...mapState(['hasLogin','userInfo'])
			
		},
        methods: {
// 			getUsers(){
// 				var user = service.getUsers();
// 				if(user!=""){
// 					console.log(user);			    
// 					this.userInfo = user;
// 					this.login = true;
// 				}else{
// 					this.login = false;
// 				}
// 			},
			getSystems(){
				uni.getSystemInfo({
					success: function (res) {
						console.log(JSON.stringify(res));
						console.log(res.model);
						console.log(res.pixelRatio);
						console.log(res.windowWidth);
						console.log(res.windowHeight);
						console.log(res.language);
						console.log(res.version);
						console.log(res.platform);
						console.log(res.system);
						this.systems = res.platform + res.system;
					}
				});
			},

			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			navTo(url){
				console.log(url);
				if(!this.hasLogin){
					url = '/pages/login/login';
				}
				uni.navigateTo({  
					url
				})  
			}, 
			/**
			 *  会员卡下拉和回弹
			 *  1.关闭bounce避免ios端下拉冲突
			 *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
			 *    transition设置0.1秒延迟，让css来过渡这段空窗期
			 *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
			 */
			coverTouchstart(e){
				if(pageAtTop === false){
					return;
				}
				this.coverTransition = 'transform .1s linear';
				startY = e.touches[0].clientY;
			},
			coverTouchmove(e){
				moveY = e.touches[0].clientY;
				let moveDistance = moveY - startY;
				if(moveDistance < 0){
					this.moving = false;
					return;
				}
				this.moving = true;
				if(moveDistance >= 80 && moveDistance < 100){
					moveDistance = 80;
				}
		
				if(moveDistance > 0 && moveDistance <= 80){
					this.coverTransform = `translateY(${moveDistance}px)`;
				}
			},
			coverTouchend(){
				if(this.moving === false){
					return;
				}
				this.moving = false;
				this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
				this.coverTransform = 'translateY(0px)';
			}
        }  
    }  
</script>  
<style lang='scss'>
	%uni-page-wrapper{
		background: #f5f5f5; 
	}
	%flex-center {
	 display:flex;
	 flex-direction: column;
	 justify-content: center;
	 align-items: center;
	}
	%section {
	  display:flex;
	  justify-content: space-around;
	  align-content: center;
	  background: #fff;
	  border-radius: 10upx;
	}

	.user-section{
		height: 520upx;
		padding: 100upx 30upx 0;
		position:relative;
		.bg{
			position:absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
			opacity: .7;
		}
	}
	.user-info-box{
		height: 180upx;
		display:flex;
		align-items:center;
		position:relative;
		z-index: 1;
		.portrait{
			width: 130upx;
			height: 130upx;
			border:5upx solid #fff;
			border-radius: 50%;
		}
		.username{
			font-size: $font-lg + 6upx;
			color: $font-color-dark;
			margin-left: 20upx;
		}
	}

	.vip-card-box{
		display:flex;
		flex-direction: column;
		color: #f7d680;
		height: 240upx;
		background: linear-gradient(left, rgba(0,0,0,.7), rgba(0,0,0,.8));
		border-radius: 16upx 16upx 0 0;
		overflow: hidden;
		position: relative;
		padding: 20upx 24upx;
		.card-bg{
			position:absolute;
			top: 20upx;
			right: 0;
			width: 380upx;
			height: 260upx;
		}
		.b-btn{
			position: absolute;
			right: 20upx;
			top: 16upx;
			width: 132upx;
			height: 40upx;
			text-align: center;
			line-height: 40upx;
			font-size: 22upx;
			color: #36343c;
			border-radius: 20px;
			background: linear-gradient(left, #f9e6af, #ffd465);
			z-index: 1;
		}
		.tit{
			font-size: $font-base+2upx;
			color: #f7d680;
			margin-bottom: 28upx;
			.yticon{
				color: #f6e5a3;
				margin-right: 16upx;
			}
		}
		.e-b{
			font-size: $font-sm;
			color: #d8cba9;
			margin-top: 10upx;
		}
	}
	.cover-container{
		background: $page-color-base;
		margin-top: -150upx;
		padding: 0 30upx;
		position:relative;
		background: #f5f5f5;
		padding-bottom: 20upx;
		.arc{
			position:absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}
	}
	.tj-sction{
		@extend %section;
		.tj-item{
			@extend %flex-center;
			flex-direction: column;
			height: 140upx;
			font-size: $font-sm;
			color: #75787d;
		}
		.num{
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 8upx;
		}
	}
	.order-section{
		@extend %section;
		padding: 28upx 0;
		margin-top: 20upx;
		.order-item{
			@extend %flex-center;
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			font-size: $font-sm;
			color: $font-color-dark;
		}
		.yticon{
			font-size: 48upx;
			margin-bottom: 18upx;
			color: #fa436a;
		}
		.icon-shouhoutuikuan{
			font-size:44upx;
		}
	}
	.history-section{
		padding: 30upx 0 0;
		margin-top: 20upx;
		background: #fff;
		border-radius:10upx;
		.sec-header{
			display:flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40upx;
			margin-left: 30upx;
			.yticon{
				font-size: 44upx;
				color: #5eba8f;
				margin-right: 16upx;
				line-height: 40upx;
			}
		}
		.h-list{
			white-space: nowrap;
			padding: 30upx 30upx 0;
			image{
				display:inline-block;
				width: 160upx;
				height: 160upx;
				margin-right: 20upx;
				border-radius: 10upx;
			}
		}
	}
	/* .container{background:#f8f8f8;} */
	.bgg{width:100upx;height:100upx;margin-left:295upx;}
	.qrcode{width:200upx;height:200upx;margin-left:245upx;}
	uni-page-wrapper {
		background:#f8f8f8 !important;
	}
	.foot{font-size:26upx;color:#75787d;position:fixed;bottom:140upx;left:0;width:750upx;height:80upx;line-height:80upx;text-align: center}
	.system{color:#75787d;font-size:26upx;width:690upx;height:60upx;line-height:60upx;text-align: center}
	.saomiao{color:#75787d;font-size:26upx;width:690upx;height:80upx;line-height:80upx;text-align: center}
</style>