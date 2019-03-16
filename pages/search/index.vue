<template>
	<view class="s-page-wrapper">
		<view class="search-pop">
			<view class="main-title">
				<view class="search-tab">
					<view
						class="my-sub-src"
						@tap="switchTab(0)"
						v-bind:class="[current == 0 ? 'cur' : '', '']"
					>
						搜券
					</view>
					<view
						class="my-sub-src"
						@tap="switchTab(1)"
						v-bind:class="[current == 1 ? 'cur' : '', '']"
					>
						搜全网
					</view>
					<view class="close-src" @tap="navigateBack">
						<text class="iconfont icon-zuojiantou"></text>
					</view>
					<view class="search">
						<input
							type="text"
							value=""
							:placeholder="placeholder"
							class="search_area"
							@input="searchInput"
						/>
						<view class="search_submit" @tap="submitSearch">搜 索</view>
					</view>
				</view>
			</view>
		</view>
		<view class="search-cat">
			<swiper class="swiper" @change="swiperChange" :current="current">
				<swiper-item>
					<view class="search-cat-tit"><text class="up-menu">热门搜索</text></view>
					<view class="src-content">
						<view class="main-src">
							<view
								class="src-item "
								v-for="(key, index) in keywordlist"
								:key="index"
							>
								{{ key.value }}
							</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="search-default">
						<image
							src="../../static/img/goods/search-default.png"
							mode="widthFix"
							class="is-response"
						></image>
						<view class="help-tips has-mgtb-10 is-size-18">搜索方法：</view>
						<view class="help-tips color999">
							1、打开手机淘宝/天猫，长按拷贝商品标题
						</view>
						<view class="help-tips color999">2、将商品标题粘贴到搜索框中进行搜索</view>
						<view class="help-tips color999 has-mgt-10">"搜全网"功能中的商品信息均来自于互联网</view>
						<view class="help-tips color999">商品准确信息请与商品所属店铺经营者沟通确认</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			placeholder: '开学比屯速食',
			keywords: '',
			keywordlist: [
				{ value: '抽纸' },
				{ value: '洗面奶' },
				{ value: '洗衣液' },
				{ value: '卫生巾' },
				{ value: '短袜' },
				{ value: '垃圾袋' },
				{ value: '行李箱' },
				{ value: '洗发水' }
			],
			current: 0
		};
	},
	methods: {
		navigateBack: function() {
			uni.navigateBack();
		},
		searchInput: function(e) {
			this.keywords = e.detail.value;
		},
		submitSearch: function() {
			console.log(this.keywords);
		},
		swiperChange: function(e) {
			var current = e.detail.current;
			this.current = current;
		},
		switchTab: function(current) {
			this.current = current;
		}
	}
};
</script>

<style>
.swiper {
	height: 100%;
}
.help-tips {
	font-size: 13px;
	color: #999;
	line-height: 26px;
	padding: 0 0 0 30px;
	margin: 0;
	width: 80%;
	text-align: left;
}
.help-tips.color999 {
	color: #999999;
}
.search-default {
	text-align: center;
	height: 200px;
	margin: auto;
}
.search-default image {
	display: block;
	margin: auto;
	width: 80%;
}
.search-cat {
	position: fixed;
	top: 0;
	bottom: 0;
	padding-top: 130px;
	width: 100%;
	height: 100%;
	padding-bottom: 11px;
	background-color: #fff;
}
.search-cat .search-cat-tit {
	position: relative;
	width: 150px;
	height: 10px;
	margin: 13px 3% 20px;
}
.search-cat .search-cat-tit .up-menu {
	display: block;
	height: 20px;
	line-height: 20px;
	font-size: 0.9em;
	color: #999;
}
.src-content {
	margin: 20px 0 30px;
	width: 97%;
}
.main-src .src-item {
	float: left;
	border-radius: 22px;
	padding: 0 10px;
	height: 23px;
	line-height: 23px;
	background-color: #f6f6f6;
	margin: 10px;
	position: relative;
	font-size: 13px;
	color: #333;
}
.main-title {
	height: 130px;
}
.main-title {
	background: -moz-linear-gradient(left, #fa4dbe 0, #fbaa58 100%);
	background: -webkit-gradient(
		linear,
		left top,
		left right,
		color-stop(0, #fa4dbe),
		color-stop(100%, #fbaa58)
	);
	background: -webkit-linear-gradient(left, #fa4dbe 0, #fbaa58 100%);
	background: -o-linear-gradient(left, #fa4dbe 0, #fbaa58 100%);
	background: -ms-linear-gradient(left, #fa4dbe 0, #fbaa58 100%);
	background: linear-gradient(to left, #fa4dbe 0, #fbaa58 100%);
	border-bottom-color: transparent;
	padding: 8px 10px;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 120;
	display: block;
	box-sizing: border-box;
}
.search-pop .search-tab {
	margin: 5px 0 10px;
	color: #fff;
	font-size: 15px;
	text-align: center;
	/* #ifdef APP-PLUS */
	padding-top: var(--status-bar-height);
	/* #endif */
}
.search-pop .search-tab .my-sub-src {
	margin: 0 auto 0 20px;
	display: inline-block;
	color: #fff;
	line-height: 30px;
	margin-bottom: 10px !important;
}
.search-pop .search-tab .my-sub-src:nth-child(1) {
	margin-left: 0px !important;
}
.main-title .search-tab .cur {
	opacity: 1;
	border-bottom: 1px solid #fff;
}
.main-title .search-tab .close-src {
	position: absolute;
	left: 20px;
	display: block;
	float: left;
	color: #ffffff;
	margin-top: 15px;
}
.main-title .search-tab .close-src .iconfont {
	font-size: 20px;
}
.main-title .search {
	background-color: #fff;
	border-radius: 20px;
	width: 76%;
	margin-left: 12%;
	position: relative;
	padding: 0 9px;
	height: 32px;
	line-height: 32px;
	font-size: 13px;
	margin-top: 10px;
}
.search_submit {
	width: 25%;
	height: 32px;
	background: #ffb925;
	color: #fff;
	float: right;
	margin-top: -32px;
	position: relative;
	border-radius: 15px;
	margin-right: -20px;
	z-index: 30;
}
.main-title .search input {
	border: none;
	outline: 0;
	height: 32px;
	font-size: 13px;
	line-height: 30px;
	background: #fff;
	color: #666;
	border-radius: 5px;
	padding: 0 0 0 5px;
	text-align: left;
}
.main-title .search input.search_area {
	background-color: transparent;
	position: relative;
	z-index: 99;
	width: 80%;
	color: #333;
	font-size: 12px;
}
</style>
