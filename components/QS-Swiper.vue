<template>
	<view class="position_relative width100" :style="classObj.transition + 'background-color:' + swiperItems[current].bgColor + ';'">
		<swiper :indicator-dots="indicator_custom?false:indicator_dots" :indicator-color="indicator_color" :indicator-active-color="indicator_active_color"
		 :autoplay="autoplay" :interval="interval" :circular="circular" :vertical="vertical" :previous-margin="previous_margin"
		 :next-margin="next_margin" :duration="time" :display-multiple-items="display_multiple_items"
		 :skip-hidden-item-layout="skip_hidden_item_layout" class="swiperStyle" @change="swiperChange($event)"
		 @animationfinish="animationfinish($event)" :style="'height:' + (swiperHeight||height) + ';'">
			<swiper-item v-for="(items, indexs) in swiperItems" :key="indexs" class="position_relative" @tap="click(indexs)">
				<block v-for="(item, index) in items.itemArray" :key="index">
					<block v-if="item&&item.type=='image'">
						<image :src="item.value" :mode="item.mode||'widthFix'" class="position_absolute" :style="classObj.transition + (current==indexs&&onReady?item.changeAfter:item.changeBefore) + item.css "></image>
					</block>
					<block v-else-if="item&&item.type=='text'">
						<view class="position_absolute" :style="classObj.transition + (current==indexs&&onReady?item.changeAfter:item.changeBefore) + item.css">
							{{item.value}}
						</view>
					</block>
					<block v-else-if="item&&item.type=='button'">
						<button type="primary" :size="item.mode||'mini'" class="position_absolute" :style="classObj.transition + (current==indexs&&onReady?item.changeAfter:item.changeBefore) + item.css"
						 @tap="activeFc()">{{item.value}}</button>
					</block>
				</block>
			</swiper-item>
		</swiper>
		<view class="position_absolute" :style="classObj.indicator_view" v-if="indicator_custom">
			<view :style="classObj.transition + classObj.indicator_default_dots + (current==index?classObj.indicator_select_dots:classObj.indicator_unselect_dots)" v-for="(item, index) in swiperItems" :key="index">
				{{item.indicator_custom_value}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			swiperItems: {
				type: Array,
				default () {
					return [];
				}
			},
			height: {
				type: String,
				default: '250px'
			},
			duration: {
				type: Number,
				default: 1000
			},
			indicator_dots: {
				type: Boolean,
				default: false
			},
			indicator_color: {
				type: String,
				default: 'rgba(0, 0, 0, .3)'
			},
			indicator_active_color: {
				type: String,
				default: '#000000'
			},
			autoplay: {
				type: Boolean,
				default: false
			},
			interval: {
				type: Number,
				default: 5000
			},
			circular: {
				type: Boolean,
				default: false
			},
			vertical: {
				type: Boolean,
				default: false
			},
			previous_margin: {
				type: String,
				default: '0px'
			},
			next_margin: {
				type: String,
				default: '0px'
			},
			display_multiple_items: {
				type: Number,
				default: 1
			},
			skip_hidden_item_layout: {
				type: Boolean,
				default: false
			},
			indicator_custom: {
				type: Boolean,
				default: false
			},
			indicator_custom_set: {
				type: Object,
				default () {
					return {
						indicator_view: 'width:100%;height:40px;bottom:0;left:0;display:flex;flex-direction:row;justify-content: center;align-items: center;',
						indicator_default_dots: 'height:20px;width:20px;border-radius:50%;margin:0 5px;display:flex;flex-direction:row;justify-content: center;align-items: center;font-size:12px;',
						indicator_unselect_dots: 'background-color:rgba(0,0,0,.3);',
						indicator_select_dots: 'background-color:rgba(0,0,0,.7);transform:scale(1.2);'
					}
				}
			}
		},
		data() {
			let time = this.duration;
			let indicator_view = '';
			let indicator_default_dots = '';
			let indicator_select_dots = '';
			let indicator_unselect_dots = '';
			if (this.indicator_custom) {
				indicator_view = this.indicator_custom_set.indicator_view;
				indicator_default_dots = this.indicator_custom_set.indicator_default_dots;
				indicator_select_dots = this.indicator_custom_set.indicator_select_dots;
				indicator_unselect_dots = this.indicator_custom_set.indicator_unselect_dots;
			}
			return {
				current: 0, //swiper的index
				onReady: false,
				time,
				classObj: {
					transition: 'transition: all ' + (time / 1000) + 's;',
					indicator_view,
					indicator_default_dots,
					indicator_unselect_dots,
					indicator_select_dots
				}
			};
		},
		methods: {
			swiperChange(e) {
				this.current = e.detail.current;
				this.$emit('change', e);
			},
			animationfinish(e) {
				this.$emit('animationfinish', e);
			},
			click(index) {
				this.$emit('click', index);
			}
		},
		onReady() {
			this.onReady = true;
		}
	}
</script>

<style scoped>
	button::after {
		border: none;
	}

	.width100 {
		width: 100%;
	}

	.swiperStyle {
		width: 100%;
	}

	.transition {
		transition: 1s;
	}

	.position_absolute {
		position: absolute;
	}

	.position_relative {
		position: relative;
	}

	.img {
		width: 30%;
		position: absolute;
		top: 10%;
		left: 50%;
	}

	.text1 {
		font-size: 5vh;
		font-weight: bold;
		position: absolute;
		top: 30%;
		left: 50%;
	}

	.text2 {
		font-size: 3vh;
		position: absolute;
		top: 50%;
		left: 20%;
	}
</style>
