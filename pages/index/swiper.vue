<template>
	<view class="swiper">
		<view class="swiper-title">{{title}}</view>
		<swiper :style="{height:fullHeight}" class="swiper-tall" :indicator-dots="indicatorDots" :autoplay="autoplay" :previous-margin="previousMargin"
		 :next-margin="nextMargin" :circular="circular" @change="change" :current="swiperCurrentIndex">
			<swiper-item class="swiper-container" v-for="(img,index) in imgs" :key="index"
			 :item-id="index" :data-year="index">
			 
			<view class="swiper-item"
			  :style="{background:img?('url('+ img +') center no-repeat'):'',backgroundSize:'cover'}" 
			   :animation="animationData[index]">
			</view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				screenHeight: 0,
				animationData: {
					0:{},
					1:{},
					2:{}
				},
				title: '0',
				indicatorDots: false,
				autoplay: false,
				previousMargin: uni.upx2px(82)+'px',
				nextMargin: uni.upx2px(82)+'px',
				circular: true,
				zoomParam: 1.10,
				swiperCurrentIndex: 0,
				data: [],
				max: 0,
				imgs:[
					'../../static/1.jpg',
					'../../static/2.jpg',
					'../../static/3.jpg'
				]
			}
		},
		computed:{
			fullHeight() {
				const res = uni.getSystemInfoSync();
				return res.windowHeight - uni.upx2px(60) - (res.statusBarHeight+44)+'px';
			}
		},
		onLoad() {
			this.animation = uni.createAnimation();
			this.animation.scale(this.zoomParam).step();
			this.animationData[0] = this.animation.export();
		},
		methods: {
			change(e) {
				this.swiperCurrentIndex = e.detail.current;
				this.title = e.detail.currentItemId;
				for (let key in this.animationData) {
					if (e.detail.currentItemId == key) {
						this.animation.scale(this.zoomParam).step();
						this.animationData[key] = this.animation.export();
					} else {
						this.animation.scale(1.0).step();
						this.animationData[key] = this.animation.export();
					}
				}
			}
		}
	}
</script>

<style>
	page{
		display: flex;
		flex-wrap: wrap;  
	}
	.swiper-container {
		display: flex;
		align-items: center;
	}

	.swiper-item {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin-left: auto;
		margin-right: auto;
		height: 858upx;
		width: 530upx;
		line-height: 300upx;
		text-align: center;
		broder-radius: 6upx;
		margin-bottom: 50upx;
	}



	.swiper-tall {
		display: flex;
		align-items: center;
	}



	.swiper-title {
		width: 750upx;
		text-align: center;
	}

</style>
