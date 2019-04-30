<template>
	<view>
		<!-- 顶部导航 -->
		<view class="topTabBar" :style="{position:headerPosition,top:headerTop}">
			<view class="grid" v-for="(grid,tbIndex) in orderType" :key="tbIndex" @tap="showType(tbIndex)">
				<view class="text" :class="[tbIndex==tabbarIndex?'on':'']">{{grid}}</view>
			</view>
			<!-- <view class="grid">
				<view class="text on">全部</view>
			</view> -->
			
			<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
				<!-- <view class="uni-input">{{date}}</view> -->
				<view class="grids" style="width:100%">
					<view class="text"  style="color:#5eba8f;"><text class="cell-icon yticon icon-lishijilu" style="font-size:50upx"></text>按时间查询</view>
				</view>
			</picker>
		</view>
		<!-- 考虑非APP端长列表和复杂的DOM使用scroll-view会卡顿，所以漂浮顶部选项卡使用page本身的滑动 -->
		<view class="order-list">
			<view class="list">
				<view class="onorder" v-if="list.length==0 && loadingType==0">
					<image src="../../../static/img/noorder.png"></image>
					<view class="text">
						没有相关数据
					</view>
				</view>
				<view class="row" v-for="(row,index) in list" :key="index">
					<view class="type">流水号: {{row.out_trade_no}}</view>
					<view class="order-info">
						<view class="right">
							<view class="spec">充值状态：</view>
							<view class="price-number">
								<view class="price" :class="[row.is_pay==0?'jia':'jian']">{{row.pay_status}}</view>
							</view>
							<view class="spec">支付金额：</view>
							<view class="price-number">
								<view class="price jia">￥{{row.amount}}</view>
							</view>
							<view class="spec">支付方式：</view>
							<view class="price-number">
								<view class="price">{{row.payType}}</view>
							</view>
							<view class="spec">充值时间：</view>
							<view class="price-number">
								<view class="price">{{row.add_time}}</view>
							</view>
							<!-- <view class="spec">剩余积分：</view>
							<view class="price-number">
								<view class="price">200</view>
							</view>
							<view class="spec">备注：</view>
							<view class="price-number">
								<view class="price">127.0.0.1</view>
							</view> -->
							<view class="action-box b-t" v-if="row.payable==1">
								<!-- <button class="action-btn">取消订单</button> -->
								<button class="action-btn recom" @click="toPay(row.out_trade_no)">立即支付</button>
							</view>
						</view>
						
					</view>
					<!-- <view class="detail">
						余额￥<view class="price">100</view>
					</view> -->
				</view>
			</view>
		</view>
		<view class="uni-tab-bar-loading"> 
			<uni-load-more :loadingType="loadingType" :contentText="loadingText"></uni-load-more>
		</view>
	</view>
</template>
<script>
	import uniLoadMore from '@/components/uni-load-more.vue';
	import {  
	    mapState 
	} from 'vuex';
	function getDate(type) {
		const date = new Date();
	
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
	
		if (type === 'start') {
			year = year - 60;
		} else if (type === 'end') {
			year = year + 2;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;
	
		return `${year}-${month}-${day}`;
	}
	export default {
		data() {
			return {
				loadingText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				headerPosition:"fixed",
				headerTop:"0px",
				orderType: ['全部','普通','套餐'],
				type: 0,
				//订单列表 演示数据
				orderList:[],
				loadingType:0,
				list:[],
				tabbarIndex:0,
				page:0,
				isshow:false,
				start_time:"",
				date: getDate({
					format: true
				}),
				startDate:getDate('start'),
				endDate:getDate('end'),
			};
		},
		components: {
			uniLoadMore,
		},
		onLoad(option) {
			//option为object类型，会序列化上个页面传递的参数
			//console.log("option: " + JSON.stringify(option));
			// let tbIndex = this.tabbarIndex;
			// if(option.tbIndex){
			// 	let tbIndex = parseInt(option.tbIndex)+1;
			// }
			// this.list = this.orderList[tbIndex];
			// this.tabbarIndex = tbIndex;
			this.getData();
			///this.headerTop = document.getElementsByTagName('uni-page-head')[0].offsetHeight+'px';
			//兼容H5下排序栏位置
			// #ifdef H5
				this.headerTop = document.getElementsByTagName('uni-page-head')[0].offsetHeight+'px';
			// #endif
		},
		onPageScroll(e){
			return;
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop>=0?"fixed":"absolute";
		},
		computed: {
			 ...mapState(['hasLogin','userInfo'])
			
		},
		// 加载更多
		onReachBottom : function(){
			if(this.loadingType!=2){
				this.getData();
			}
		},
		methods: {
			bindDateChange: function(e) {
				this.start_time = e.target.value;
				this.list = [];
				this.loadingType = 0;
				this.page = 0;
				this.getData();
			},
			choose(){
				this.isshow = !this.isshow;
			},
			showType(tbIndex){
				this.tabbarIndex = tbIndex;
				this.type = tbIndex;
				this.list = [];
				this.loadingType = 0;
				this.page = 0;
				this.getData();
				//this.list = this.orderList[tbIndex];
			},
			getData(){
				uni.showLoading({
					title: '加载中',
					mask:true
				});
				var pageindex = this.page +1;
				this.loadingType = 1;
				uni.request({
				 	url: 'http://data.chinapaper.net/Api/order/getmall',
				 	data: {ukeys:this.userInfo.uKeys,page:pageindex,type:this.type},
					// data: {ukeys:"9060001",catid:this.catid,id:this.itemid},
				 	method:"POST",
				 	success: (result) => {
				 		console.log(result);
						var res = result.data;
						if (res.result.length == 0 || res.result.length<10) {
							this.loadingType = 2;
						}
				 		if (res.code == "1") {
							let list= res.result;
							list.forEach((tabBar,index) => {
								if(tabBar.method=="balance"){
									tabBar.payType = "余额支付";
								}else if(tabBar.method=="score"){
									tabBar.payType = "积分支付";
								}else if(tabBar.method=="wechat"){
									tabBar.payType = "微信支付";
								}else if(tabBar.method=="alipay"){
									tabBar.payType = "支付宝支付";
								}else{
									tabBar.payType = "暂未支付";
								}	
							})
							this.list = this.list.concat(list);
							this.page = pageindex;								
				 		}
						
						uni.hideLoading(); 
				 	}
				 });
			},
			toPay(out_trade_no){
				uni.navigateTo({
					url: '/pages/datas/pay?order_sn='+out_trade_no
				});
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f3f3f3;
}
.jia{
	color:#f37b1d;
}
.jian{
	color:#39b54a;
}
.topTabBar{
	width: 100%;
	position: fixed;
	top: 0;
	z-index: 10;
	// background-color: #f8f8f8;
	background-color: #ffffff;
	height: 80upx;
	display: flex;
	justify-content: space-around;
	.grid{
		width: 10%;
		height: 80upx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #444;
		font-size: 28upx;
		.text{
			height: 76upx;
			display: flex;
			align-items: center;
			&.on{
				color: #f06c7a;
				border-bottom: solid 4upx #f06c7a;
			}
		}
		
	}
	.grids{
		width: 20%;
		height: 80upx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #444;
		font-size: 28upx;
		.text{
			height: 76upx;
			display: flex;
			align-items: center;
			&.on{
				color: #f06c7a;
				border-bottom: solid 4upx #f06c7a;
			}
		}
		
	}
}
.order-list{
	margin-top: 80upx;
	padding-top: 20upx;
	width: 100%;
	.list{
		width: 94%;
		margin: 0 auto;
		.onorder{
			width: 100%;
			height: 50vw;
			display: flex;
			justify-content: center;
			align-content: center;
			flex-wrap: wrap;
			image{
				width: 20vw;
				height: 20vw;
				border-radius: 100%;
			}
			.text{
				width: 100%;
				height: 60upx;
				font-size: 28upx;
				color: #444;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
		.row{
			// width: calc(100% - 40upx);
			padding: 10upx 20upx;
			border-radius: 10upx;
			background-color: #fff;
			margin-bottom: 20upx;
			.type{
				font-size: 26upx;
				color: #ec652f;
				height: 50upx;
				display: flex;
				align-items: center;
			}
			.order-info{
				width: 100%;
				display: flex;
				.left{
					flex-shrink: 0;
					width: 25vw;
					height: 25vw;
					image{
						width: 25vw;
						height: 25vw;
						border-radius: 10upx;
					}
				}
				.right{
					width: 100%;
					// margin-left: 10upx;
					position: relative;
					.name{
						width: 100%;
						font-size: 28upx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
					.spec{
						color: #a7a7a7;
						font-size: 28upx;
						height:40upx;
						line-height:40upx;
						width: 25%;
						float:left;

					}
					.price-number{
						// position: absolute;
						// bottom: 0;
						width: 75%;
						display: flex;
						justify-content: flex-end;
						font-size: 28upx;
						height:40upx;
						line-height:40upx;
						color: #a7a7a7;
						display: flex;
						align-items: flex-end;
						float:right;
						.price{
							font-size: 28upx;
							margin-right: 5upx;
						}
						.price2{
							font-size: 26upx;
							margin-right: 5upx;
							// color:forestgreen
						}
						
					}
				}
			}
			.detail{
				display: flex;
				justify-content: flex-end;
				align-items: flex-end;
				height: 60upx;
				font-size: 26upx;
				.sum{
					padding: 0 8upx;
					display: flex;
					align-items: flex-end;
					.price{
						font-size: 30upx;
					}
				}
				
			}
			.btns{
				height: 80upx;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				view{
					min-width: 120upx;
					height: 50upx;
					padding: 0 20upx;
					border-radius: 50upx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 28upx;
					margin-left: 20upx;
				}
				.default{
					border: solid 1upx #ccc;
					color: #666;
				}
				.pay{
					border: solid 1upx #ec652f;
					color: #ec652f;
				}
			}
		}
	}
}
.tit{width:80upx}
.action-box{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 80upx;
			position: relative;
			padding-right: 2upx;
			margin-top:6upx;
		}
		.action-btn{
			width: 160upx;
			height: 60upx;
			margin: 0;
			margin-left: 24upx;
			padding: 0;
			text-align: center;
			line-height: 60upx;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
			background: #fff;
			border-radius: 100px;
			&:after{
				border-radius: 100px;
			}
			&.recom{
				background: #fff9f9;
				color: $base-color;
				&:after{
					border-color: #f7bcc8;
				}
			}
		}
</style>
