<template>  
    <view class="container"> 
		 <view class="user-info-box">
				<image class="portrait" src="/static/img/ordersucc.png"></image>
				 <view class="ccc"> 订单提交成功,请您尽快付款！</view>
				 <view class="cc">订单号: {{out_trade_no}}</view>
		 </view>
		 <view class="cover-container"> 
			<!-- <image class="arc" src="/static/arc.png"></image>
			<view class="tj-sction">
				<view class="tj-item">
					<text class="num">{{hasLogin?userInfo.money:0}}</text>
					<text>余额</text>
				</view>
			</view> -->
			<view class="history-section icon"> 
				<!-- <view class="mix-list-cell b-b" hover-class="cell-hover">
					<text class="cell-icon yticon icon-share" style="color:#9789f7"></text>
					<text class="cell-tit clamp">支付方式</text> 
				</view> -->
				<!-- <view class="mix-list-cell b-b" hover-class="cell-hover"> -->
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
						<button type="primary" class="recharge bg-red" @click="toRecharge">{{btvalue}}</button>
					</view>
				</radio-group>
				<!-- </view> -->
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
				btvalue:"立即支付",
				out_trade_no:""
			}
		},
		onLoad(event){
			this.out_trade_no = event.order_sn;
			console.log(JSON.stringify(event));
			uni.hideLoading(); 
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
				let out_trade_no = this.out_trade_no;
				if(out_trade_no==""){
					uni.showToast({
						icon: 'none',
						title: '订单号不存在!'
					});
					return;
				}
				if(this.payType=="alipay"){
					this.$Request.post(this.$api.pay.getOrderInfoByCashPay,{ukeys:this.userInfo.uKeys,order_sn:this.out_trade_no,payType:"alipay"}).then(res => {
						//plus.ui.alert((JSON.stringify(res)));
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
												uni.navigateBack({
													delta: 2
												});
											}
										});
									},
									fail:function(res){
										uni.showToast({
											title: '支付失败，请到订单中心重新支付',
											icon: "none",
											duration: 2000,
											complete: function () {
 												uni.navigateBack({
 													delta: 2
 												});
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
					this.$Request.post(this.$api.pay.getOrderInfoByCashPay,{ukeys:this.userInfo.uKeys,order_sn:this.out_trade_no,payType:"wechat"}).then(res => {  
						//plus.ui.alert((JSON.stringify(res)));
						if(res.code=="0000"){
							var orderinfo = res.data.app_response; 
							//plus.ui.alert(JSON.stringify(orderinfo));
							if(orderinfo){
								uni.requestPayment({
									provider:"wxpay",
									timeStamp:orderinfo.timestamp,
									nonceStr:orderinfo.noncestr,
									package:orderinfo.package,
									signType:"MD5",
									paySign:orderinfo.sign,
									orderInfo:{
										appid:orderinfo.appid,
										noncestr:orderinfo.noncestr,
										package:"Sign=WXPay",
										partnerid:orderinfo.partnerid,
										prepayid:orderinfo.prepayid,
										timestamp:orderinfo.timestamp,
										sign:orderinfo.sign,
									},
									success:function(res){
										uni.showToast({
											title:"支付成功",
											icon:"success",
											duration:2000,
											complete:function(){
												uni.navigateBack({
													delta: 2
												});
											}
										});
									},
									fail:function(res){
										//console.log(JSON.stringify(res));
										//plus.ui.alert((JSON.stringify(res)));
										uni.showToast({
											title: '支付失败，请到订单中心重新支付',
											icon: "none",
											duration: 2000,
											complete: function () {
												uni.navigateBack({
													delta: 2
												});
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
			
			
        }  
    }  
</script>  
<style lang='scss'>
	uni-radio-group{
		width:100%;
	}
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


	.portrait{
		width: 200upx;
		height: 200upx;
		/* border:5upx solid #fff; */
		/* border-radius: 50%; */
		margin-left:275upx;
	}

	
	.cover-container{
		/* background: $page-color-base; */
		/* margin-top: -150upx; */
		padding: 0 30upx;
		position:relative;
		/* background: #f5f5f5; */
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
		margin-right: 50upx;
		width:60upx;
		height:60upx;
		margin-top:8upx;
		line-height:40upx;
		position:absolute;
		left:50upx;
		top:25upx;
	}
	.recharge{
		/* position:absolute;
		right:10upx;
		top:25upx; */
		/* background: linear-gradient(to left, #fc2c5d 0, #fa436a 100%); */
		background-color: #fc2c5d;
	}
	.clamp2{
		margin-left:110upx;
		margin-top:10upx;
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
	.ccc{text-align:center;font-size:30upx;color:#5eba8f}
	.cc{text-align:center;font-size:24upx;color:#FBAA58;margin-top:20upx}
	.user-info-box{margin-top:50upx}
</style>