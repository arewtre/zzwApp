<template>  
    <view class="container">  
		<view class="user-section">
			<image class="bg" src="/static/user-bg.jpg"></image>
			<view class="user-info-box">
				<view class="portrait-box">
					<image class="portrait" :src="userInfo.avatarUrl || '/static/missing-face.png'"></image>
				</view>
				<view class="info-box">
					<text class="username">{{hasLogin?userInfo.truename:'游客'}}</text>
				</view>
			</view>	
		</view>
		 <view class="cover-container"> 
			<image class="arc" src="/static/arc.png"></image>
			<view class="tj-sction">
				<view class="tj-item">
					<text class="num">{{hasLogin?userInfo.money:0}}</text>
					<text>余额</text>
				</view>
			</view>
			<view class="history-section icon"> 
				<view class="mix-list-cell b-b" hover-class="cell-hover">
					<text class="cell-icon yticon icon-iconfontweixin" style="color:#e07472"></text>
					<text class="cell-tit clamp">充值金额</text>
					<view class="cell-tip">
						<input @input="inputAmount" :value="money" name="money" class="uni-input money" type="digit" placeholder="请填写充值金额" />
					</view>
				</view>
				<view class="mix-list-cell b-b" hover-class="cell-hover">
					<text class="cell-icon yticon icon-share" style="color:#9789f7"></text>
					<text class="cell-tit clamp">充值方式</text> 
				</view>
				<radio-group @change="radioChange">
					<view class="mix-list-cell b-b" hover-class="cell-hover">
						<image class="yticon2"  src="/static/img/wpay.png"></image>
						<text class="cell-tit clamp2">微信支付</text>
						<view class="cell-tip"><label class="radio"><radio name="payType" value="wechat" checked="true" /></label></view>
					</view>
					<view class="mix-list-cell b-b" hover-class="cell-hover">
						<image class="yticon2"  src="/static/img/alipay.png"></image>
						<text class="cell-tit clamp2">支付宝支付</text>
						<view class="cell-tip"><label class="radio"><radio name="payType" value="alipay" /></label></view>
					</view>
					<view class="mix-list-cell2 b-b" hover-class="cell-hover" style="text-align:right">
						<button type="primary" class="recharge" @click="toRecharge">{{btvalue}}</button>
					</view>
				</radio-group>
			</view>
		</view>
    </view>  
</template>  
<script>  
    import {  
        mapState 
    } from 'vuex';  
    export default {
		components: {

		},
		data(){
			return {
				moving: false,
				avatarUrl: '/static/logo.png',
				payType:'wechat',
				money:1,
				btvalue:"立即充值"
			}
		},
		onLoad(){

		},
		onShow(){

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
			radioChange(evt){
				this.payType = evt.target.value;
				console.log(this.payType);
			},  
			toRecharge(){
				let money = this.money;
				if(money==0 || money==""){
					uni.showToast({
						icon: 'none',
						title: '请填写充值金额!'
					});
					return;
				}
				if(this.payType=="alipay"){
					this.$Request.post(this.$api.pay.getOrderInfoByAlipay,{userid:this.userInfo.userid,oid:1}).then(res => {
						if(res.code=="0000"){
							var orderinfo = res.data;    
							if(orderinfo){
								uni.requestPayment({
									provider:"alipay",
									orderInfo:orderinfo,
									success:function(res){
										uni.showToast({
											title:"支付成功",  
											icon:"success",
											duration:2000,
											complete:function(){
// 												uni.reLaunch({
// 													url:"showresult?paytype=1"
// 												});
											}
										});
									},
									fail:function(res){
										uni.showToast({
											title: '支付失败，请到订单中心重新支付',
											icon: "none",
											duration: 2000,
											complete: function () {
// 												wx.reLaunch({
// 													url: 'showresult?paytype=3',
// 												});
											}
										});
									}
								});
							}else{
								
							}
						}else{
							
						}
					},function(){},function(){});
				}
				if(this.payType=="wechat"){
					this.$Request.post(this.$api.pay.getOrderInfoByWechat,{userid:this.userInfo.userid,oid:1}).then(res => {
						var jsondata = res.data;
						console.log(res); 
						plus.ui.alert((JSON.stringify(res)));
						if(res.code=="0000"){
							var orderinfo = res.data.app_response; 
							if(orderinfo){
								uni.requestPayment({
									provider:"wxpay",
									timeStamp:orderinfo.timestamp,
									nonceStr:orderinfo.noncestr,
									package:orderinfo.package,
									signType:"MD5",
									paySign:orderinfo.paySign,
									orderInfo:{
										appid:orderinfo.appid,
										noncestr:orderinfo.noncestr,
										package:"Sign=WXPay",
										partnerid:orderinfo.partnerid,
										prepayid:orderinfo.prepayid,
										timestamp:orderinfo.timestamp,
										sign:orderinfo.paySign,
									},
									success:function(res){
										uni.showToast({
											title:"支付成功",
											icon:"success",
											duration:2000,
											complete:function(){
// 												uni.reLaunch({
// 													url:"showresult?paytype=1"
// 												});
											}
										});
									},
									fail:function(res){
										// console.log(JSON.stringify(res));
										// plus.ui.alert((JSON.stringify(res)));
										uni.showToast({
											title: '支付失败，请到订单中心重新支付',
											icon: "none",
											duration: 2000,
											complete: function () {
// 												wx.reLaunch({
// 													url: 'showresult?paytype=3',
// 												});
											}
										});
									}
								});
							}else{
								
							}
						}else{
							
						}
					},function(){},function(){});
				}
			},
			inputAmount(event){
				this.money = event.target.value;
				if(event.target.value>0){
					this.btvalue = "立即充值 ￥"+this.money;
				}else{
					this.btvalue = "立即充值";
				}
				
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
			height: 68%;
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
	

	.icon .mix-list-cell.b-b:after{
		left: 90upx;
	}
	.mix-list-cell{
		display:flex;
		align-items:baseline;
		padding: 20upx $page-row-spacing;
		line-height:60upx;
		position:relative;
		
		&.cell-hover{
			background:#fafafa;
		}
		&.b-b:after{
			left: 30upx;
		}

		.cell-icon{
			align-self:center;
			width:56upx;
			max-height:60upx;
			font-size:38upx;
		}
		.cell-more{
			align-self: center;
			font-size:30upx;
			color:$font-color-base;
			margin-left:$uni-spacing-row-sm;
		}
		.cell-tit{
			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
			margin-right:10upx;
		}
		.cell-tip{
			font-size: $font-sm+2upx;
			color: $font-color-light;
		}
	}
	.money{border-bottom:1px solid #969896;text-align:right}
	.yticon2{
		color: #f6e5a3;
		margin-right: 16upx;
		width:38upx;
		height:38upx;
		margin-top:8upx;
		line-height:40upx;
		position:absolute;
		left:80upx;
		top:25upx;
	}
	.recharge{
		/* position:absolute;
		right:10upx;
		top:25upx; */
		background: linear-gradient(to left, #FA4DBE 0, #FBAA58 100%);
	}
	.clamp2{
		margin-left:100upx;
	}
	.mix-list-cell2{
		/* display:flex;
		align-items:baseline; */
		padding: 20upx $page-row-spacing;
		/* line-height:60upx; */
		position:relative;
		text-align:right;
		margin-top:80upx;
	}
</style>