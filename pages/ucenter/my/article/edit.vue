<template>
	<view>
		<form @submit="formSubmit" @reset="formReset">
			<view class="cu-form-group margin-top">
				<view class="title"><text class="bixuan">*</text>所属分类</view>
				<!-- <input placeholder="选择所属分类" name="catid"></input> -->
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker" style="text-align: left">
						<input placeholder="选择所属分类" :value="catname" disabled></input>
						<input name="catid" :value="catid" style="display:none"></input>
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="bixuan">*</text>资讯标题</view>
				<input placeholder="输入资讯标题" name="title"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">是否原创</view>
				<switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
			</view>
			<view class="cu-form-group top">
				<view class="title">资讯简介</view>
				<textarea data-placeholder="输入资讯简介" maxlength="-1" :disabled="modalName!=null" placeholder-class='placeholder'
				 :class="textareaBValue?'value':''" @input="textareaBInput" name="introduce"></textarea>
			</view>
			<view class="cu-form-group">
				<view class="title">关键词</view>
				<input placeholder="输入关键词" name="tag"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">资讯作者</view>
				<input placeholder="输入资讯作者" name="author"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">资讯来源</view>
				<input placeholder="输入资讯来源" name="copyfrom"></input>
			</view>
			<view class="cu-form-group" style="border-bottom:10upx solid ##f1f1f1">
				<view class="title">来源链接</view>
				<input placeholder="输入来源链接" name="fromurl"></input>
			</view>
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					资讯图片
				</view>
				<view class="action">
					{{imgList.length}}/1
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="padding-xs bg-img" :style="'background-image:url(' + imgList[index] +')'" v-for="(item,index) in imgList"
					 :key="index" @tap="ViewImage" :data-url="imgList[index]">
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='icon-close'></text>
						</view>
					</view>
					<input name="thumb" :value="imgList[0]" style="display:none"></input>
					<view class="padding-xs solids" @tap="ChooseImage" v-if="imgList.length<1">
						<text class='icon-cameraadd'></text>
					</view>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title"><text class="bixuan">*</text>详细内容</view>
			</view>
			<view class="cu-form-group" style="border:0">
				<uni-richtext :richList.sync="richList" :uploadUrl="uploadUrl"></uni-richtext>
			</view>
			<view class="padding-xl">
				<button class="cu-btn block shadow-blur bg-orange margin-tb-sm lg" formType="submit" >立即提交</button>
				<button class="cu-btn block shadow-blur bg-grey margin-tb-sm lg" formType="reset">重置</button>
			</view>
		</form>
	</view>
</template>

<script>
	import uniRichtext from '@/components/qiyue-richtext/uni-richtext.vue'
	var  graceChecker = require("../../../../common/graceChecker.js");
	export default {
		components: {
			uniRichtext
		},
		data() {
			return {
				index: -1,
				picker: [],				
				multiIndex: [0, 0, 0],
				region: ['广东省', '广州市', '海珠区'],
				switchA: false,
				imgList: [],
				modalName:null,
				textareaAValue: '',
				textareaBValue: '',
				catid:"",
				catname:"",
				cateList: [],
				richList: [],
				uploadUrl:"http://47.100.48.1/api/member/uploadImg.php"
			};
		},
		watch:{
			richList:function (newValue,oldValue) {
				console.log(newValue)
			}
		},
		onLoad(option) {
			this.mid = option.mid;
			this.loadNavList();
		},
		methods: {
			loadNavList: function(Refresh) {				
				this.$Request.post(this.$api.home.newscatedata,{moduleid:this.mid}).then(res => {
					if (res.code == "0000") {
						this.cateList = res.data;
						 res.data.forEach((tabBar,index) => {
							this.picker.push(tabBar.catname)
						})
						//console.log(this.picker);
					}
				})
			},
			formSubmit: function (e) {
				//将下列代码加入到对应的检查位置
				//定义表单规则
				console.log(this.richList);
				var rule = [
					{name:"catid", checkType : "notnull", checkRule:"",  errorMsg:"请选择分类"},
					{name:"title", checkType : "string", checkRule:"5,30",  errorMsg:"标题应为5-30字"},
					{name:"content", checkType : "string", checkRule:"15,50000",  errorMsg:"内容应为15-50000字"}
				];
				//进行表单检查
				var formData = e.detail.value;
				//console.log(formData);
				var checkRes = graceChecker.check(formData, rule);
				if(checkRes){
					uni.showToast({title:"验证通过!", icon:"none"});
				}else{
					uni.showToast({ title: graceChecker.error, icon: "none" });
				}
			},
			formReset: function (e) {
				console.log("清空数据")
				this.chosen = ''
			},
			PickerChange(e) {
				this.catid = this.cateList[e.target.value].catid;
				this.catname = this.cateList[e.target.value].catname;
			},
			SwitchA(e) {
				this.switchA = e.detail.value
			},
			ChooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						console.log(res);
						uni.showLoading({
							mask: true,
						})
						uni.uploadFile({
							url: this.uploadUrl, //仅为示例，非真实的接口地址
							filePath: res.tempFilePaths[0],
							name: 'image',
							success: (uploadFileRes) => {
								//console.log(uploadFileRes.data);	
								if (this.imgList.length != 0) {
									this.imgList = this.imgList.concat(uploadFileRes.data)
								} else {
									this.imgList.push(uploadFileRes.data)
								}
								console.log(this.imgList);
							},
							complete: () => {
								uni.hideLoading()
							}
						});
					}
				});
			},
			ViewImage(e) {
				console.log(e)
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '提示',
					content: '确定要删除这张图片吗？',
					cancelText: '再看看',
					confirmText: '删除',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			textareaBInput(e) {
				this.textareaBValue = e.detail.value
			}
		}
	}
</script>

<style>
	.uni-textarea-compute, .uni-textarea-placeholder, .uni-textarea-textarea, .uni-textarea-wrapped{
		width:98% !important;
	}
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
	.bixuan{color:#e54d42;position:absolute;left:-20upx;top:6upx;z-index:999;font-size:40upx}
	.cu-form-group uni-picker::after {
		font-family: cuIcon;
		display: block;
		content: "";
		position: absolute;
		font-size: 18px;
		color: var(--grey);
		line-height: 55px;
		width: 45px;
		text-align: center;
		top: 0;
		bottom: 49px;
		right: -11px;
		margin: auto; 
	}
	uni-image {width:100%;height:auto;}
		
</style>
