<template>
	<view class="serach">
		<view class="titleft" @click="chooseCate">{{defaultcate}}<text class="iconfont icon-xiajiantous"></text></view>
		<view class="content" :style="{'border-radius':radius+'px'}">
			<!-- HM修改 增加进入输入状态的点击范围 -->
			<view class="content-box" :class="{'centers':mode === 2}" @click="getFocus">
				<text class="icon icon-serach">&#xe61c;</text>
				<!-- HM修改 增加placeholder input confirm-type confirm-->
				<input  :placeholder="placeholder" @input="inputChange" confirm-type="search" @confirm="triggerConfirm" class="input" :class="{'center':!active && mode === 2}" :focus="isFocus" v-model="inputVal" @focus="focus" @blur="blur"/>
				<!-- <view v-if="!active && mode === 2" class="input sub" @click="getFocus">请输入搜索内容</view> -->
				<!-- HM修改 @click换成@click.stop阻止冒泡 -->
				<text v-if="isDelShow" class="icon icon-del"  @click.stop="clear">&#xe644;</text>
			</view>
			
		</view>
		<view v-show="(active&&show&&button === 'inside')||(isDelShow && button === 'inside')" class="serachBtn" @click="search">
			搜索
		</view>
		<view v-show="!isDelShow" class="back serachBtn" @click="back">
			取消
		</view>
		<view  v-if="button === 'outside'" class="button" :class="{'active':show||active}" @click="search">
			<view class="button-item">{{!show?searchName:'搜索'}}</view>
		</view>
		<mpvue-picker
			:themeColor="themeColor"
			ref="mpvuePicker"
			:mode="modes"
			:deepLength="deepLength"
			:pickerValueDefault="pickerValueDefault"
			@onConfirm="onConfirm"
			@onCancel="onCancel"
			:pickerValueArray="pickerValueArray"
		></mpvue-picker>
	</view>
	
</template>

<script>
import uniIcon from "@/components/uni-icon/uni-icon.vue";
import mpvuePicker from '@/components/mpvue-picker/mpvuePicker.vue';
export default {
	props: {
		mode: {
			value: Number,
			default: 1,
		},
		//HM修改 定义默认搜索关键词(水印文字)
		placeholder:{
			value: String,
			default: '请输入搜索内容'
		},
		value: {
			type: String,
			default:false
		},
		button: {
			value: String,
			default: 'outside'
		},
		show: {
			value: Boolean,
			default: true
		},
		radius: {
			value: String,
			default: 60
		}
	},
	onLoad() {
		//this.init();
		this.getcate();
	},
	components: {
		uniIcon,
		mpvuePicker
	},
	data() {
		return {
			active: false,
			inputVal: '',
			searchName: '取消',
			defaultcate:"资讯",
			isDelShow: false,
			isFocus: false,
			catid:21,
			themeColor: '#007AFF',
			modes: '',
			deepLength: 1,
			pickerValueDefault: [3],
			pickerValueArray: []
		};
	},
	methods: {
		//HM修改 触发组件confirm事件
		getcate(){			
			this.moduleid = uni.getStorageSync('newsmoduleid');
			var cateNav = this.$SysCache.get("app_cate_navlist");
			if(cateNav){
				this.pickerValueArray = cateNav;
				this.pickerValueArray.forEach((cate) => {
					if(cate.moduleid==this.moduleid ){
						this.defaultcate = cate.title;
					}
				});
			}else{
				this.$Request.post(this.$api.home.navlist).then(res => {
					if (res.code == "0000") {
						this.pickerValueArray = res.data;
						this.pickerValueArray.forEach((cate) => {
							cate.label = cate.title;
							cate.value = cate.moduleid; 
							if(cate.moduleid==this.moduleid ){
								this.defaultcate = cate.title;
								console.log(JSON.stringify(this.defaultcate));
							}
						});
						
						this.$SysCache.put("app_cate_navlist",this.pickerValueArray,86400);
					}
				})	
			}
			// console.log(this.pickerValueArray);
		},
		triggerConfirm(){
			this.$emit('confirm', false);
		},
		//HM修改 触发组件input事件
		inputChange(event){
			var keyword = event.detail.value;
			this.$emit('input', keyword);
			if (this.inputVal) {
				this.isDelShow = true;
			}
		},
		focus() {
			// this.active = true;
			//HM修改 增加获取焦点判断
			if (this.inputVal) {
				this.isDelShow = true;
			}
		},
		back(){ 
// 			uni.switchTab({
// 				url: '/pages/index/index'
// 			})
			uni.navigateBack({
				delta: 1
			});
			
		},
		blur() {
			this.isFocus = false;
			if (!this.inputVal) {
				this.active = false;
			}
		},
		clear() {
			//HM修改 收起键盘
			uni.hideKeyboard();
			this.isFocus = false;
			this.inputVal = '';
			this.active = false;
			//HM修改 清空内容时候触发组件input
			this.$emit('input', '');
			//this.$emit('search', '');//HM修改 清空内容时候不进行搜索
			
		},
		getFocus() {
			this.isFocus = true;
		},
		search() {
			//HM修改 增加点击取消时候退出输入状态，内容为空时，输入默认关键字
			if (!this.inputVal) {
				if(!this.show&&this.searchName == '取消'){
					uni.hideKeyboard();
					this.isFocus = false;
					this.active = false;
					return;
				}
			}
			//console.log(this.inputVal); 
			this.$emit('search', this.inputVal?this.inputVal:this.placeholder);
		},
		onCancel(e) {
				console.log(e);
		},
		// 单列
		showSinglePicker() {
			//this.pickerValueArray = this.navlist;
			this.getcate();
			this.modes = "selector";
			this.deepLength = 1;
			this.pickerValueDefault = [0];
			this.$refs.mpvuePicker.show();
			//console.log(this.pickerValueArray);
		},
		onConfirm(e) {
			//console.log(e);
			this.defaultcate = e.label;
			this.catid =  e.value[0];
			uni.setStorageSync('newsmoduleid',  e.value[0]);
		},
		/**
		 * 修改导航栏buttons
		 * index[number] 修改的buttons 下标索引，最右边索引为0
		 * text[string] 需要修改的text 内容
		 */
		setStyle(index, text) {
			let pages = getCurrentPages();
			let page = pages[pages.length - 1];
			if (text.length > 3) {
				text = text.substr(0, 3) + '...';
			}
			// #ifdef APP-PLUS
			let currentWebview = page.$getAppWebview();
			let titleNView = currentWebview.getStyle().titleNView;
			// 添加文字过长截取为3个字符，请根据自己业务需求更改
			titleNView.buttons[0].text = text;
			currentWebview.setStyle({
				titleNView: titleNView
			});
			// #endif
			// #ifdef H5
			// h5 临时方案
			document.getElementsByClassName('uni-btn-icon')[1].innerText = text;
			// #endif
		},
		onBackPress() {
			if (this.$refs.mpvuePicker.showPicker) {
				this.$refs.mpvuePicker.pickerCancel();
				return true;
			}
		},
		onUnload() {
			if (this.$refs.mpvuePicker.showPicker) {
				this.$refs.mpvuePicker.pickerCancel();
			}
		},
		chooseCate(e) {
			this.showSinglePicker();
			
		},
		
	},
	watch: {
		inputVal(newVal) {
			if (newVal) {
				this.searchName = '搜索';
				//this.isDelShow = true; //HM修改 直接点击页面预设关键字样式异常，注销
			} else {
				this.searchName = '取消';
				this.isDelShow = false;
			}
		},
		//HM修改 双向绑定
		value(val) {
			this.inputVal = val;
		},
	}
};
</script>

<style lang="scss" scoped>
	.titleft{
		height: 60upx;
		line-height:60upx;
		color:#999999;
		width:20%;
		text-align:center;
	}
	.icon-serach{
		margin-top:4upx;
	}
	.serachBtn {
		height: 100%;
		flex-shrink: 0;
		padding: 0 30upx;
		//HM修改 按钮背景色
		//background:linear-gradient(to right,#fd4a5f,#fd4a5f);
		// background: #fc2c5d;
		line-height: 60upx;
		color: #999999;
		//border-left: 1px #ccc solid; //HM修改 去掉边框
		transition: all 0.3s;
	}
	.serachBtn2 {
		height: 100%;
		flex-shrink: 0;
		padding: 0 30upx;
		//HM修改 按钮背景色
		// background:linear-gradient(to right,#fd4a5f,#fd4a5f);
		background: #fc2c5d;
		line-height: 60upx;
		color: #fff;
		//border-left: 1px #ccc solid; //HM修改 去掉边框
		transition: all 0.3s;
	}
.serach {
	display: flex;
	width: 100%;
	/* #ifdef APP-PLUS */
	padding-top: 16upx;
	/* #endif */
	//border-bottom: 1px #f5f5f5 solid; //HM修改 去掉边框
	box-sizing: border-box;
	font-size: $uni-font-size-base;
	.content {
		display: flex;
		align-items: center;
		width: 65%;
		height: 60upx;
		//border: 1px #ccc solid; //HM修改 去掉边框
		background: #fff;
		overflow: hidden;
		transition: all 0.2s linear;
		border-radius: 30px;

		.content-box {
			width: 100%;
			display: flex;
			align-items: center;
			&.centers {
				justify-content: center;
			}
			.icon {
				padding: 0 15upx;
				&.icon-del {
					font-size: 38upx;
				}
			}
			.input {
				flex:0 1 auto;
				width: 100%;
				max-width: 100%;
				line-height: 60upx;
				height: 60upx;
				font-size:24upx;
				transition: all 0.2s linear;
				&.center {
					width: 200upx;
				}
				&.sub {
					// position: absolute;
					width: auto;
					color: grey;
				}
			}
		}
		
	}
	.button {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		flex-shrink: 0;
		width: 0;
		transition: all 0.2s linear;
		white-space: nowrap;
		overflow: hidden;
		&.active {
			padding-left: 15upx;
			width: 100upx;
		}
	}
}
//HM修改 把字体改成本地加载
@font-face {font-family:"iconfont";src:url('data:application/x-font-woff;charset=utf-8;base64,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');}


.icon {
	font-family: iconfont;
	font-size: 32upx;
	font-style: normal;
	color: #999;
}
</style>
