<template>
	<view>
		<!-- 明细 -->
		<view class="detail">
			<view class="row">
				<view class="nominal">
					购买方
				</view>
				<view class="content">
					{{userInfo.truename}}
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					联系方式
				</view>
				<view class="content">
					{{userInfo.mobile}}
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					商品名称
				</view>
				<view class="content" style="max-width:400upx">
					{{subject}}
				</view>
			</view>
		</view>
		<!-- 提示-备注 -->
		<view class="detail">
			<!-- <radio-group @change="changePrice"> -->
			<view class="row">
				<view class="nominal">
					使用积分 :
				</view>
				<view class="content">
					可用积分 : {{user.score}}
				</view>
				<view class="content">
					<!-- <label class="radio"><radio name="paycode" value="integral" /></label> -->
					<switch :checked="isintegral" name="paycode" value="integral" @change="changePrice1" />
				</view>
			</view>
			<view class="row" style="margin-top:1upx">
				<view class="nominal">
					使用余额 :
				</view>
				<view class="content">
					可用余额 : ￥{{user.balance}}
				</view>
				<view class="content">
					<uni-tag type="primary" text="充值" @click="toCharge" size="small"></uni-tag>
				</view>
				<view class="content">
					<!-- <label class="radio"><radio name="paycode" value="balance"/></label> -->
					<switch :checked="isbalance" name="paycode" value="balance" @change="changePrice2" />
				</view>
			</view>
			<!-- </radio-group> -->
		</view>
		
		<view class="detail">
			<view class="row">
				<view class="nominal">
					商品金额
				</view>
				<view class="content">
					￥{{total_amount}}
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					优惠金额
				</view>
				<view class="content">
					-￥{{cut_fee}}
				</view>
			</view>
			<view class="row">
				<view class="nominal">  
					积分抵扣
				</view>
				<view class="content">
					-￥{{integral_money}}
				</view>
			</view>
			<view class="row">
				<view class="nominal">  
					余额抵扣
				</view>
				<view class="content">
					-￥{{pay_money}}
				</view>
			</view>
			<view class="row">
				<view class="nominal">
					应付金额
				</view>
				<view class="content">
					￥{{account_payable}}
				</view>
			</view>
		</view>
		<view class="blck">
			
		</view>
		<view class="footer">
			<view class="settlement">
				<view class="sum">合计:<view class="money">￥{{account_payable}}</view></view>
				<view class="btn" @tap="toPay">提交订单</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {  
	    mapState 
	} from 'vuex'; 
	import uniTag from '@/components/uni-tag/uni-tag.vue'
	export default {
		data() {
			return {
				orderData:"",
				total_amount: 0,   	//订单总价
				order_amount: 0,   	//实际支付，扣除积分抵扣，等级优惠后剩余
				account_payable: 0,	//剩余应付款（包括余额抵扣）前端显示给用户
				goods_price: 0,		//商品总价
				cut_fee:0,//共节约多少钱(总优惠)
				pay_money:0,//使用的余额
				integral_money:0,//积分抵扣金额
				subject:"",
				user:"",
				isintegral:false,
				isbalance:false,
				paycode:"",
				out_trade_no:"",
				
			};
		},
		computed: {
			 ...mapState(['hasLogin','userInfo'])
			
		},
		onLoad(event) {
			this.id = event.id;
			this.serve= event.serve;
			this.packages = event.package;
			this.duration = event.duration;
			this.getUserInfo();
			this.getOrder();
			
		},
		onShow(event) {
			//页面显示时，加载订单信息
			this.getUserInfo();
			this.getOrder();
			if(!this.hasLogin){
				uni.navigateTo({
					url: '/pages/login/login'
				});
			}
			
		},
		components: { 
			uniTag
		},
		onHide() {
			//页面隐藏清除订单信息
			this.clearOrder();
		},
		onBackPress() {
			//页面后退时候，清除订单信息
			this.clearOrder();  
		},
		methods: {
			getOrder(){
				uni.showLoading({
					title: '价格计算中..',
					mask:true
				});
				uni.request({
					url: 'http://data.chinapaper.net/api/cart/confirm',
					data: {aid:this.id,ukeys:this.userInfo.uKeys,serve:this.serve,package:this.packages,duration:this.duration},
					method:"POST",
					success: (result) => {
						var res = result.data;
						//console.log(res);
						if (res.code == "1") {
							this.orderData = res.result;
							this.total_amount = res.result.cartList.goods_fee;
							this.account_payable = res.result.cartList.goods_fee;
							this.subject = res.result.cartList.subject;
							uni.hideLoading(); 
						}
					}
				});
			},
			getUserInfo(){
				uni.request({
					url: 'http://data.chinapaper.net/Api/User/all',
					data: {ukeys:this.userInfo.uKeys},
					method:"POST",
					success: (result) => {
						//console.log(JSON.stringify(result));
						var res = result.data;
						if (res.code == "1") {
							this.user = res.result;
						}
					}
				});
			},
			clearOrder(){
				uni.removeStorage({
					key: 'buylist',
					success: function (res) {
						this.buylist = [];
						console.log('remove buylist success');
					}
				});
			},
			toPay(){
				uni.showLoading({
					title: '加载中',
					mask:true
				});
				uni.request({
					url: 'http://data.chinapaper.net/Api/cart/submitCart',
					data: {aid:this.id,ukeys:this.userInfo.uKeys,paycode:this.paycode,serve:this.serve,package:this.packages,duration:this.duration,act:"submit_order"},
					method:"POST",
					success: (result) => {
						uni.hideLoading();
						console.log(result);
						var res = result.data;
						this.out_trade_no = res.result.out_trade_no;
						var msgg = res.msg;
						if (res.code == "1") {
							if(res.result.payable==1){
								uni.showToast({
									title: '支付成功,正在跳转..',
									icon: "none",
									duration: 2000,
									complete: function () {
										uni.navigateBack({
											delta: 1
										});
									}
								});
							}else{
								uni.navigateTo({
									url: '/pages/datas/pay?order_sn='+this.out_trade_no
								});
							}
						}else{
							console.log(msgg);	
							uni.showToast({
								title: msgg,
								icon: "none",
								duration: 2000,
								complete: function () {
									// uni.navigateBack({
									// 	delta: 1
									// });
									
								}
							});
							 
						}
						
					}
				});
			},
			changePrice1(e){
				console.log(e);
				this.paycode = "";
				this.isbalance = false;
				if(e.target.value){
					this.paycode = "integral";
					this.isintegral = true;
				};
				this.changePrice(this.paycode);
				
			},
			changePrice2(e){
				this.paycode = "";
				this.isintegral = false;
				if(e.target.value){
					this.paycode = "balance";
					this.isbalance = true;
				};
				this.changePrice();
			},
			changePrice(act="1515"){
				console.log(this.paycode);
				uni.showLoading({
					title: '价格计算中..',
					mask:true
				});
				uni.request({
					url: 'http://data.chinapaper.net/Api/cart/submitCart',
					data: {aid:this.id,ukeys:this.userInfo.uKeys,paycode:this.paycode,serve:this.serve,package:this.packages,duration:this.duration,act:act},
					method:"POST",
					success: (result) => {
						uni.hideLoading();
						console.log(result);
						var res = result.data;
						if (res.code == "1") {
							this.total_amount = res.result.total_amount;
							this.account_payable = res.result.account_payable;
							this.pay_money = res.result.pay_money;
							this.cut_fee = res.result.cut_fee;
							this.integral_money = res.result.integral_money;
						}else{
							uni.showToast({
								title: res.msg,
								icon: "none",
								duration: 2000,
								complete: function () {
									
								},
							});
							this.isintegral = false;
							this.isbalance = false;
							this.paycode = "";
						}
					}
				});
			},
			toCharge(){
				uni.navigateTo({
					url: '/pages/ucenter/wallet'
				});
			}
		}
	}
</script>

<style lang="scss">
.addr{
	width: 86%;
	padding: 20upx 3%;
	margin: 30upx auto 20upx auto;
	box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.1);
	border-radius: 20upx;
	display: flex;
	.icon{
		width: 80upx;
		height: 80upx;
		display: flex;
		align-items: center;
		image{
			width: 60upx;
			height: 60upx;
		}
	}
	.tel-name{
		width: 100%;
		display: flex;
		font-size: 32upx;
		.tel{
			margin-left: 40upx;
		}
	}
	.addres{
		width: 100%;
		font-size: 26upx;
		color: #999;
	}
}
.buy-list{
	width: 86%;
	padding: 10upx 3%;
	margin: 30upx auto 20upx auto;
	box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.1);
	border-radius: 20upx;
	.row{
		margin: 30upx 0;
		.goods-info{
			width: 100%;
			display: flex;
			.img{
				width: 22vw;
				height: 22vw;
				border-radius: 10upx;
				overflow: hidden;
				flex-shrink: 0;
				margin-right: 10upx;
				image{
					width: 22vw;
					height: 22vw;
				}
			}
			.info{
				width: 100%;
				height: 22vw;
				overflow: hidden;
				display: flex;
				flex-wrap: wrap;
				position: relative;
				.title{
					width: 100%;
					font-size: 28upx;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					// text-align: justify;
					overflow: hidden;
				}
				.spec{
					font-size: 22upx;
					background-color: #f3f3f3;
					color: #a7a7a7;
					height: 40upx;
					display: flex;
					align-items: center;
					padding: 0 10upx;
					border-radius: 20upx;
					margin-bottom: 20vw;
				}
				.price-number{
					position: absolute;
					width: 100%;
					bottom: 0upx;
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
					font-size: 28upx;
					height: 40upx;
					.price{
						color: #f06c7a;
					}
					.number{
						display: flex;
						justify-content: center;
						align-items: center;
						
					}
				}
			}
		}
	}
}
.order{
	width: 86%;
	padding: 10upx 3%;
	margin: 30upx auto 20upx auto;
	box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.1);
	border-radius: 20upx;
	.row{
		margin: 20upx 0;
		height: 40upx;
		display: flex;
		.left{
			font-size: 28upx;
		}
		.right{
			margin-left: 40upx;
			font-size: 26upx;
			color: #999;
			input{
				font-size: 26upx;
				color: #999;
			}
		}
	}
}
.blck{
	width: 100%;
	height: 100upx;
}
.footer{
		width: 100%;
		padding: 0 4%;
		background-color: #fbfbfb;
		height: 100upx;
		line-height:100upx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 28upx;
		position: fixed;
		bottom: 0upx;
		z-index: 5;
		
		.settlement{
			width: 80%;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			.sum{
				width: 50%;
				font-size: 28upx;
				margin-right: 30upx;
				display: flex;
				justify-content: flex-end;
				.money{
					font-weight: 600;
					font-size:38upx;
					color:#f06c7a
				}
			}
			.btn{
				padding: 0 30upx;
				height: 60upx;
				background-color: #f06c7a;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 30upx;
				border-radius: 40upx;
			}
		}
	}
.detail{
	width: 90%;
	padding: 10upx 3%;
	margin: 30upx auto 20upx auto;
	box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.1);
	border-radius: 20upx;
	.row{
		height: 78upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.nominal{
			font-size: 28upx;
		}
		.content{
			font-size: 26upx;
			color: #f06c7a;
		}
	}
}

</style>
