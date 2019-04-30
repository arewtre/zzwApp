<template>
	<view>
		<view class="cu-bar bg-white">
			<view class="action">
				<text class="cuIcon-title text-orange"></text>
				<text>请选择服务类型</text>
			</view>
		</view>
		<view class="grid col-3 padding-sm">
			<view v-for="(item,index) in checkbox" class="padding-xs" :key="index">
				<button class="cu-btn orange lg block" :class="item.checked?'bg-orange':'line-orange'" @tap="ChooseCheckbox1"
				 :data-value="item.value"> {{item.name}}
					<view class="cu-tag sm round" :class="item.checked?'bg-white text-orange':'bg-orange'" v-if="item.hot">HOT</view>
				</button>
			</view>
		</view>
		<view class="cu-bar bg-white">
			<view class="action">
				<text class="cuIcon-title text-orange"></text>
				<text>请选择套餐类型</text>
			</view>
		</view>
		<view class="grid col-3 padding-sm">
			<view v-for="(item,index) in taocan" class="padding-xs" :key="index">
				<button class="cu-btn orange lg block" :class="item.checked?'bg-orange':'line-orange'" @tap="ChooseCheckbox2"
				 :data-value="item.value"> {{item.name}}
					<view class="cu-tag sm round" :class="item.checked?'bg-white text-orange':'bg-orange'" v-if="item.hot">HOT</view>
				</button>
			</view>
		</view>
		<view class="cu-bar bg-white">
			<view class="action">
				<text class="cuIcon-title text-orange"></text>
				<text>请选择服务时长</text>
			</view>
		</view>
		<view class="grid col-2 padding-sm">
			<view v-for="(item,index) in shichang" class="quannian" :key="index">
				<button class="cu-btn orange lg block quannianbtn" :class="item.checked?'bg-orange':'line-orange'" @tap="ChooseCheckbox3"
				 :data-value="item.value"> {{item.name}}
					<view class="cu-tag sm round" :class="item.checked?'bg-white text-orange':'bg-orange'" v-if="item.hot">HOT</view>
				</button>
			</view>
		</view>
		<!-- <view class="mix-list-cell2 b-b" hover-class="cell-hover" style="text-align:right">
			<button type="primary" class="recharge" @click="toPay">立即支付</button>
		</view> -->
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
	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				modalName: null,
				radio: 'radio1',
				shichang: [{
					value: 0,
					name: '行情全年看一年内行情无限次查看',
					checked: false,
					hot: false,
				}],
				taocan: [{
					value: 0,
					name: '日报',
					checked: false,
					hot: false,
				},{
					value: 1,
					name: '周报',
					checked: false,
					hot: false,
				},{
					value: 2,
					name: '月报',
					checked: false,
					hot: false,
				}],
				checkbox:"",
				account_payable:0,
				fuwucheck:"",
				taocancheck:"",
				shichangcheck:"",
			};
		},
		computed: {
			 ...mapState(['hasLogin','userInfo'])
			
		},
		onLoad(event) {
			this.getTc();
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
			ChooseCheckbox1(e) {
				let items = this.checkbox;
				let values = e.currentTarget.dataset.value;
				let arr = [];
				for (let i = 0, lenI = items.length; i < lenI; ++i) {
					if (items[i].value == values) {
						items[i].checked = !items[i].checked;
						break
					}					
				}
				for (let i = 0, lenI = items.length; i < lenI; ++i) {
					if(items[i].checked){
						arr.push(items[i].id);
					}					
				}
				this.fuwucheck = this.spit(arr);
				this.getPrice();
			},
			ChooseCheckbox2(e) {
				let items = this.taocan;
				let values = e.currentTarget.dataset.value;
				let arr = [];
				for (let i = 0, lenI = items.length; i < lenI; ++i) {
					if (items[i].value == values) {
						items[i].checked = !items[i].checked;
						break
					}					
				}
				for (let i = 0, lenI = items.length; i < lenI; ++i) {
					if(items[i].checked){
						arr.push(items[i].value);
					}					
				}
				this.taocancheck = this.spit(arr);
				this.getPrice();
			},
			ChooseCheckbox3(e) {
				let items = this.shichang;
				let values = e.currentTarget.dataset.value;
				let arr = [];
				for (let i = 0, lenI = items.length; i < lenI; ++i) {
					if (items[i].value == values) {
						items[i].checked = !items[i].checked;
						break
					}					
				}
				for (let i = 0, lenI = items.length; i < lenI; ++i) {
					if(items[i].checked){
						arr.push(items[i].value);
					}					
				}
				this.shichangcheck = this.spit(arr);
				this.getPrice();
			},
			getTc(){
				uni.request({
					url: 'http://data.chinapaper.net/Api/cart/orderVip',
					data: {ukeys:this.userInfo.uKeys},
					method:"POST",
					success: (result) => {
						var res = result.data.result;
						console.log(res);
						if (result.data.code == "1") {
							const data = res.map((news,index) => {
								return {
									value: news.id,
									name: news.name,
									checked: false,
									hot: false,
								};
							});
							res.forEach((news) => {
								news.value = news.id;
								news.name = news.name;
								news.checked = false;
								news.hot = true;
							});
							this.checkbox = res;
						}
					}
				});
			},
			toPay(){
				if(this.fuwucheck==""){
					uni.showToast({
						title: "请先选择服务类型!",
						icon: "none",
						duration: 2000,
						complete: function () {
							
						},
					});
					return;
				}
				if(this.taocancheck==""){
					uni.showToast({
						title: "请先选择套餐!",
						icon: "none",
						duration: 2000,
						complete: function () {
							
						},
					});
					return;
				}
				if(this.shichangcheck==""){
					uni.showToast({
						title: "请先选择服务时长!",
						icon: "none",
						duration: 2000,
						complete: function () {
							
						},
					});
					return;
				}
				uni.navigateTo({
					url: "/pages/datas/confirm?serve="+this.fuwucheck+"&package="+this.taocancheck+"&duration="+this.shichangcheck
				});	
			},
			changePrice(){
				uni.showLoading({
					title: '价格计算中..',
					mask:true
				});
				uni.request({
					url: 'http://data.chinapaper.net/Api/cart/confirm',
					data: {ukeys:this.userInfo.uKeys,serve:this.fuwucheck,package:this.taocancheck,duration:this.shichangcheck},
					method:"POST",
					success: (result) => {
						uni.hideLoading();
						console.log(result);
						var res = result.data;
						if (res.code == "1") {
							this.account_payable = res.result.cartList.amount;
						}else{
							uni.showToast({
								title: res.msg,
								icon: "none",
								duration: 2000,
								complete: function () {
									
								},
							});
						}
					}
				});
			},
			getPrice(){
				if(this.shichang[0].checked==true && this.fuwucheck!="" && this.taocancheck!=""){
					this.changePrice();
				}else{
					this.account_payable =0;
				}
			},
			spit: function(obj) {
                var arr = [];
                if (obj != null && obj.length != 0) {
                    for (var i = 0; i < obj.length; i++) {
                        arr.push(obj[i]);
                    }
                }
                return arr.toString();
            }
		}
	}
</script>

<style lang='scss'>
	@import "../../static/colorui/icon.css";
	@import "../../static/colorui/main.css"; 
	button .cu-tag {
		position: absolute;
		top: 8upx;
		right: 8upx;
	}
	.bg-orange {
		background-color: #f37b1d;
		color: #ffffff;
	}
	.text-orange, .line-orange, .lines-orange {
		color: #f37b1d;
	}
	.quannian{
		padding:0upx 10upx
	}
	.quannianbtn{
		min-height:120upx;
		padding:0 30upx !important;
	}
	.mix-list-cell2{
		padding: 11px 16px;
		position: relative;
		text-align: right;
		margin-top: 44px;
	}
	.recharge{
		/* background: linear-gradient(to left, #fc2c5d 0, #fa436a 100%); */
		background-color: #fc2c5d;
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
</style>

