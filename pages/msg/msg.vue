<template>
	<view>
        <view class="chat-list">
			<view class="chat" v-for="(chat,index) in chatList" :key="index">
				<view class="row" @tap="toChat(chat)">
					<view class="left">
						<image :src="chat.face"></image>
					</view>
					<view class="right">
						<view class="top">
							<view class="username">{{chat.username}}</view>
							<view class="time">{{chat.time}}</view>
						</view>
						<view class="bottom">
							<view class="msg">{{chat.msg}}</view>
							<view class="tis" v-if="chat.tisNum>0">{{chat.tisNum}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chatList:[
					{
						uid:1,
						username:"中纸网客服001",
						face:"/static/img/im/face/face_1.jpg",
						time:"13:08",
						msg:"亲，20点前下单都是当天送达的",
						tisNum:1
					},
					{
						uid:2,
						username:"中纸网客服002",
						face:"/static/img/im/face/face_2.jpg",
						time:"13:05",
						msg:"问那么多干什么？不想买就滚~",
						tisNum:0
					},
					{
						uid:3,
						username:"中纸网客服003",
						face:"/static/img/im/face/face_3.jpg",
						time:"12:15",
						msg:"推荐一个商品呗？",
						tisNum:0
					},
					{
						uid:4,
						username:"中纸网客服004",
						face:"/static/img/im/face/face_4.jpg",
						time:"12:11",
						msg:"现在卖的都是未过青的茶哦",
						tisNum:0
					},
					{
						uid:5,
						username:"中纸网客服005",
						face:"/static/img/im/face/face_5.jpg",
						time:"12:10",
						msg:"你好，发福建快递多久送到的？",
						tisNum:0
					},
					{
						uid:6,
						username:"中纸网客服006",
						face:"/static/img/im/face/face_6.jpg",
						time:"12:10",
						msg:"在吗？",
						tisNum:0
					},
					{
						uid:7,
						username:"中纸网客服007",
						face:"/static/img/im/face/face_7.jpg",
						time:"11:56",
						msg:"新品上市，欢迎选购",
						tisNum:0
					},
					{
						uid:8,
						username:"中纸网客服008",
						face:"/static/img/im/face/face_8.jpg",
						time:"11:56",
						msg:"商品七天无理由退换的",
						tisNum:0
					},
					{
						uid:9,
						username:"中纸网客服009",
						face:"/static/img/im/face/face_9.jpg",
						time:"12:15",
						msg:"星期天再发货的",
						tisNum:0
					},
					{
						uid:10,
						username:"中纸网客服010",
						face:"/static/img/im/face/face_10.jpg",
						time:"12:36",
						msg:"建议你直接先测量好尺码在选购的。",
						tisNum:0
					},
					{
						uid:11,
						username:"中纸网客服011",
						face:"/static/img/im/face/face_11.jpg",
						time:"12:40",
						msg:"新品5折，还有大量优惠券。",
						tisNum:0
					},
					{
						uid:12,
						username:"中纸网客服012",
						face:"/static/img/im/face/face_12.jpg",
						time:"12:36",
						msg:"还没有用，等我明天早上试一下",
						tisNum:0
					},
					{
						uid:13,
						username:"中纸网客服013",
						face:"/static/img/im/face/face_13.jpg",
						time:"12:36",
						msg:"适用于成年人的，小孩不适用的",
						tisNum:0
					},
					{
						uid:14,
						username:"中纸网客服014",
						face:"/static/img/im/face/face_13.jpg",
						time:"12:36",
						msg:"把上面的螺丝拆下来，把铁片撬开就能看见了",
						tisNum:0
					},
					{
						uid:15,
						username:"中纸网客服015",
						face:"/static/img/im/face/face_15.jpg",
						time:"12:36",
						msg:"这个产品是原车配件，完美装上的",
						tisNum:0
					}

				]
			}
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
		    setTimeout(function () {
		        uni.stopPullDownRefresh();
		    }, 1000);
		},
		onLoad() {

		},
		methods: {
			toChat(chat){
				uni.navigateTo({
					url:"chat/chat?name="+chat.username
				})
			}
		}
	}
</script>

<style  lang="scss">
	.chat-list{
		width: 100%;
		padding: 0 3%;
		.chat{
			width: 100%;
			height: 160upx;
			padding: 40upx 0;
			border-bottom: solid 1upx #eaeaea; 
			.row{
				display: flex;
				justify-content: flex-start;
				.left{
					flex-shrink:0;
					width: 100upx;
					height: 100upx;
					image{
						width: 100upx;
						height: 100upx;
						border-radius: 20upx;
					}
				}
				.right{
					flex-shrink:1;
					width: 98%;
					padding-left: 2%;
					.top{
						width: 100%;
						display: flex;
						justify-content: space-between;
						align-items: flex-end;
						.usernam{
							font-size: 26upx;
						}
						.time{
							font-size: 22upx;
							color: #bebebe;
						}
					}
					.bottom{
						width: 100%;
						height: 40upx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						.msg{
							font-size: 25upx;
							color: #777;
						}
						.tis{
							width: 35upx;
							height: 35upx;
							font-size: 22upx;
							display: flex;
							justify-content: center;
							align-items: center;
							background-color: #eb4d3d;
							color: #fff;
							border-radius: 100%;
						}
					}
				}
			}
		}
	}
</style>
