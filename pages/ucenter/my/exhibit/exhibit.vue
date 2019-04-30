<template>
	<view>
		<!-- 顶部导航 -->
		<view class="topTabBar" :style="{position:headerPosition,top:headerTop}">
			<!-- <view class="grid" v-for="(grid,tbIndex) in orderType" :key="tbIndex" @tap="showType(tbIndex)">
				<view class="text" :class="[tbIndex==tabbarIndex?'on':'']">{{.name}}</view>
			</view> -->
			<!-- <view class="grid">
				<view class="text on">全部</view>
			</view> -->
			
			<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
				<view v-for="(grid,index) in orderType" :key="index" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']"
				 :data-current="index" @click="showType(index,grid.status)">{{grid.name}}</view>
			</scroll-view>
			<picker @change="bindPickerChange" :value="index" :range="cate">
				<view class="grids">
					<view class="text"  style="color:#5eba8f;"><text class="cell-icon yticon icon-lishijilu" style="font-size:50upx"></text>分类</view>
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
				<!-- 订单列表 -->
				<view v-for="(item,index) in list" :key="index" class="order-item">
					<view class="i-top b-b">
						<text class="time">{{item.catname}}</text> 
						<text class="state">发表于: {{item.editdate}}</text>
					</view>
					<view 
						class="goods-box-single">
						<image class="goods-img" v-if="item.thumb" :src="item.thumb" mode="aspectFill"></image>
						<view class="right">
							<text class="title clamp">{{item.title}}</text>
							<text class="attr-box">{{item.introduce}}</text>
						</view>
					</view>
					<view class="action-box b-t">
						<button class="action-btn" @click="cancelOrder(item)">删除</button>
						<button class="action-btn recom">编辑</button>
					</view>
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
				orderType: [
					{name:'已发布',status:3},
					{name:'审核中',status:2},
					{name:'未通过',status:1},					
				],
				//订单列表 演示数据
				orderList:[],
				loadingType:0,
				list:[],
				tabIndex:0,
				scrollLeft:0,
				page:0,
				cate:[],
				isshow:false,
				cateList:"",
				//start_time:"",
				// date: getDate({
				// 	format: true
				// }),
				mid:"",
				index: 0,
				status:3,
				// startDate:getDate('start'),
				// endDate:getDate('end'),
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
			this.mid = option.mid;
			this.loadNavList();
			this.getData();
			// this.headerTop = document.getElementsByTagName('uni-page-head')[0].offsetHeight+'px';
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
			loadNavList: function(Refresh) {				
				this.$Request.post(this.$api.home.newscatedata,{moduleid:this.mid}).then(res => {
					if (res.code == "0000") {
						//console.log(res.data);
						this.cateList = res.data;
						 res.data.forEach((tabBar,index) => {
							this.cate.push(tabBar.catname)
						})
						console.log(this.cate);
					}
				})
			},
			
			bindPickerChange: function(e) {
				console.log(e.target.value);
				this.catid = this.cateList[e.target.value].catid;
				this.list = [];
				this.status = 3;
				this.tabIndex = 0;
				this.loadingType = 0;
				this.page = 0;
				this.getData();
			},
			choose(){
				this.isshow = !this.isshow;
			},
			showType(index,status){
				this.tabIndex = index;
				console.log(this.tabIndex);
				this.status = status;
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
				this.$Request.post(this.$api.user.getMyPushList,{userid:this.userInfo.userid,username:this.userInfo.username,catid:this.catid,mid:this.mid,status:this.status,page:pageindex}).then(res => {
					console.log(res);
					if (res.data.length == 0) {
						this.loadingType = 2;
					}
					if (res.code == "0000") {
						let list= res.data;
						this.list = this.list.concat(list);
						this.page = pageindex;								
					}
					uni.hideLoading(); 
						 
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
	color:#DF5000;
}
.jian{
	color:greenyellow;
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
	.grids{
		width: 20%;
		height: 80upx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #444;
		background:#ffffff;
		position:fixed;
		top:80upx;
		right:0;
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
.order-item{
		display: flex;
		flex-direction: column;
		padding-left: 30upx;
		background: #fff;
		margin-top: 16upx;
		.i-top{
			display: flex;
			align-items: center;
			height: 80upx;
			padding-right:30upx;
			font-size: $font-base;
			// color: $font-color-dark;
			position: relative;
			.time{
				flex: 1;
				color:$base-color;
			}
			.state{
				// color: $base-color;
				color:#303133;
			}
			.del-btn{
				padding: 10upx 0 10upx 36upx;
				font-size: $font-lg;
				color: $font-color-light;
				position: relative;
				&:after{
					content: '';
					width: 0;
					height: 30upx;
					border-left: 1px solid $border-color-dark;
					position: absolute;
					left: 20upx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
		/* 多条商品 */
		.goods-box{
			height: 160upx;
			padding: 20upx 0;
			white-space: nowrap;
			.goods-item{
				width: 120upx;
				height: 120upx;
				display: inline-block;
				margin-right: 24upx;
			}
			.goods-img{
				display: block;
				width: 100%;
				height: 100%;
			}
		}
		/* 单条商品 */
		.goods-box-single{
			display: flex;
			padding: 20upx 0;
			.goods-img{
				display: block;
				width: 120upx;
				height: 120upx;
			}
			.right{
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 30upx 0 24upx;
				overflow: hidden;
				.title{
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					line-height: 1;
				}
				.attr-box{
					font-size: $font-sm + 2upx;
					color: $font-color-light;
					// padding: 10upx 12upx;
					margin-top:20upx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box; //将元素设为盒子伸缩模型显示
					-webkit-box-orient: vertical; //伸缩方向设为垂直方向
					-webkit-line-clamp: 2;  //超出3行隐藏，并显示省略号
				}
				.price{
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					&:before{
						content: '￥';
						font-size: $font-sm;
						margin: 0 2upx 0 8upx;
					}
				}
			}
		}
		
		.price-box{
			display: flex;
			justify-content: flex-end;
			align-items: baseline;
			padding: 20upx 30upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;
			.num{
				margin: 0 8upx;
				color: $font-color-dark;
			}
			.price{
				font-size: $font-lg;
				color: $font-color-dark;
				&:before{
					content: '￥';
					font-size: $font-sm;
					margin: 0 2upx 0 8upx;
				}
			}
		}
		.action-box{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 100upx;
			position: relative;
			padding-right: 30upx;
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
	}
	.order-list{
		margin-top:100upx;
	}
	.uni-tab-bar {
		display: flex;
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		height: 100%;
	}
	
	.uni-tab-bar .list {
		width: 750upx;
		height: 100%;
	}
	
	.uni-swiper-tab {
		width: 100%;
		white-space: nowrap;
		line-height: 80upx;
		height: 80upx;
		// border-bottom: 1px solid #c8c7cc;
	}
	
	.swiper-tab-list {
		font-size: 30upx;
		width: 150upx;
		line-height: 80upx;
		display: inline-block;
		text-align: center;
		color: #555;
	}
	
	.topTabBar .active {
		color: #fc2c5d;
		
	}
	
	.uni-tab-bar .swiper-box {
		flex: 1;
		width: 100%;
		height: calc(100% - 100upx);
	}
	
	.uni-tab-bar-loading {
		padding: 20upx 0;
	}
</style>
