<template>
	<view>
		<view class="banner" v-if="content.thumb">
			<image class="banner-img" :src="content.thumb" model="widthFix"></image>
			<view class="banner-title">{{content.title}}</view>
		</view>
		<view :class="['article-meta',content.thumb==''?'article-meta-top':'']">
			<cmd-icon type="user" size="15" color="#aaa"></cmd-icon><text class="article-author">{{content.editor}}</text>
			<text class="article-text">发表于</text>
			<cmd-icon type="clock" size="15" color="#aaa"></cmd-icon><text class="article-time">{{content.addtimes}}</text>
			<cmd-icon type="eye" size="15" color="#aaa" class="article-hits"></cmd-icon><text class="article-time">{{content.hits}}</text>
		</view>
		<view class="article-content">
			<rich-text :nodes="content.content"></rich-text>
			<!-- <wxParse :content="content.content" @preview="preview" @navigate="navigate" /> -->
		</view>	
		<view class="Rose-End">— End —</view>
		<view class="Rose-read">阅读 {{content.hits}}
		  <view class="Rose-Right">
			  评论 {{comments.length}}
		  </view>
		</view>
		<view class="Rose-comments">
		  <view class="Rose-lines">精选评论
		    <text class="Rose-small">(点击内容回复)</text>
		    <!-- <text class="Rose-small">(共{{comments.length}}条)</text> -->
		  </view>
		  <view class="Rose-lists" v-if="comments.length>0">
		    <view class="Rose-items" v-for="(comment,index) in comments" :key="index">
		      <view class="Rose-resource">
		  		<image class="Rose-image" :src="comment.pic"></image>
		        <view class="Rose-user">
		          <view class="Rose-form">
		            <view class="Rose-names">{{comment.uuname?comment.uuname:comment.username}}<text v-if="comment.replyname" class="reply"><text class="rep">//</text><text class="replyname">@{{comment.replyname}}</text></text></view>
		            <view class="Rose-times">{{comment.addtime}}</view>
		            <view class="Rose-comment-content" :data-id="comment.itemid" :data-qid="comment.itemid" :data-from="comment.uuname" :data-username="comment.username" @click="backContent">
						<rich-text :nodes="comment.content"></rich-text>
					</view>
		          </view>
		        </view>
		      </view>
		    </view>
		  </view>
		  
		  <view class="Rose-empty" v-if="comments.length==0">
		    <icon class="iconfont icon-kafei"></icon>
		    评论还是空的，快来说两句吧~
		  </view>
		 <!-- <view class="Rose-end" v-if="comments.length!=0 && !loadMore">
		    <text class="Rose-word">没有更多评论了~</text>
		  </view> -->
		  <!-- <loading load-more="{{loadMore}}"></loading> -->
		</view>
		
		<!-- 发表评论 -->
		<form @submit="formSubmit" @reset="formReset">
		<view class="Rose-fixed">
		  <view class="Rose-flex">
			 
		   <!-- <view class="Rose-none text-left">
			   <icon class="iconfont icon-home"></icon>  
		    </view> -->
		  <!-- <view class="Rose-none text-left">
		      <icon class="iconfont icon-shoucang"></icon>
		    </view> -->
			<view class="Rose-none text-left">
				<input name="reps" class="Rose-input" type="text" :value="contents" @input="forContent" @focus="checkLogin" maxlength="-1" :placeholder="placeholder" cursor-spacing="200" confirm-type="评论"/>
			</view>
			<view class="Rose-none text-left">
				<button class="Rose-none Rose-post" :disabled="disabled" form-type="submit">评论</button>
			</view>
		  </view>
		</view>
		</form>
		<uni-popup :show="isshow" position="bottom" @hidePopup="togglePopup(isshow)">
			<view class="bottom-title">分享到</view>
			<view class="bottom-content">
				<view class="bottom-content-box" v-for="(item, index) in bottomData" :key="index">
					<view class="bottom-content-image">
						<image :src="item.icon" mode="widthFix" lazy-load="true" @click="toShare(index)" :class="[item.type?'collect':'']"></image>
					</view>
					<view class="bottom-content-text">{{ item.text }}</view>
				</view>
			</view>
			<view class="bottom-btn" @click="togglePopup(isshow)">关闭</view> 
		</uni-popup>
	</view>
</template>

<script>
	import {  
	    mapState 
	} from 'vuex'; 
	const FAIL_CONTENT = '<p>获取信息失败</p>';
	import cmdIcon from "@/components/cmd-icon/cmd-icon.vue";
	import uniIcon from '@/components/uni-icon/uni-icon.vue';
	import wxParse from '@/components/wxParse/wxParse';
	import service from '../../common/service.js';
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		data() {
			return {
				banner: {},
				content: '',
				contents: '',
				catid:'',
				itemid:'',
				placeholder: '点击评论内容回复...',
				comments: [],
				disabled: true,
				qid:0,
				like:false,
				list: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
				bottomData: [{
						text: '微信',
						// icon: '\ue6a4',
						icon: '/static/sharemenu/wechatfriend.png',
						name: 'wx'
					},
					{
						text: '朋友圈',
						// icon: '\ue646',
						icon: '/static/sharemenu/wechatmoments.png',
						name: 'wx'
					},
					{
						text: 'QQ',
						// icon: '\ue66b',
						icon: '/static/sharemenu/qq.png',
						name: 'qq'
					},
					{
						text: '新浪',
						// icon: '\ue600',
						icon: '/static/sharemenu/weibo.png',
						name: 'sina'
					},
					{
						text: '复制',
						// icon: '\ue632',
						icon: '/static/sharemenu/copyurl.png',
						name: 'copy'
					},
					{
						text: '收藏',
						icon: '/static/sharemenu/collect2.png',
						name: 'collect',
						type:1
					},
					{
						text: '更多',
						// icon: '\ue618',
						icon: '/static/sharemenu/more.png',
						name: 'more'
					}
				],
				isshow:false

			}
		},
		components: { 
			cmdIcon,
			wxParse,
			uniIcon,
			uniPopup
		},
		onShareAppMessage() {
			return {
				title: this.banner.title,
				path: '/pages/detail/detail?query=' + JSON.stringify(this.banner)
			}
		},
		computed: {
			 ...mapState(['hasLogin','userInfo'])
			
		},
		onLoad(event) {
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			//console.log(event);
			this.catid = event.catid;
			this.itemid = event.itemid;
			this.getDetail();
			this.getForumCommentData();
			//var user = service.getUsers();
			//this.userInfo = user;
			
		},
		onShow(){
			//var user = service.getUsers();
			//this.userInfo = user;
		},
		onBackPress() {
			//监听back键，关闭弹出菜单
			this.isshow = false;
		},
		onNavigationBarButtonTap(e) {
			if(e.index==0){
				this.isshow = true;
			}
		},
		methods: {
			toShare(e){
				console.log(e);
				var strProvider ="";
				var strScene ="";
				switch (e) {
					case 0:
						strProvider = "weixin";
						strScene = "WXSceneSession";
						break;
					case 1:
						strProvider = "weixin";
						strScene = "WXSenceTimeline";
						break;
					case 2:
						strProvider = "qq";
						break;
					case 3:
						strProvider = "sinaweibo";
						break;
					case 4:
						uni.setClipboardData({
							data: this.content.linkurl,
							complete() {
								uni.showToast({
									title: "已复制到剪贴板"
								})
							}
						})
						break;
					case 5:
						this.bottomData[5].icon = '/static/sharemenu/collect3.png';
						break;
					case 6:
						plus.share.sendWithSystem({
							content: this.content.linkurl,
						})
						break;
				}
				if (strProvider!="") { //点击了0-3序号的这4个按钮
					uni.share({
						provider: strProvider,
						scene:strScene,
						type: 0,
						href: this.content.linkurl,
						title: this.content.title,
						summary: this.content.introduce,
						imageUrl: this.content.thumb,
						success: function(res) {
							console.log("success:" + JSON.stringify(res));
						},
						fail: function(err) {
							console.log("fail:" + JSON.stringify(err));
						}
					})
				}
			},
			getDetail() {
				uni.showLoading({
					title: '加载中'
				});
				console.log(this.userInfo);
				this.$Request.post(this.$api.home.newsdata,{userid:this.userInfo.userid,catid:this.catid,itemid:this.itemid}).then(res => {
					console.log(res.data);
					//console.log(JSON.stringify(res.data));
					if (res.code == "0000") {
						this.content = res.data;
						uni.setNavigationBarTitle({
							title: this.content.title
						});
						 uni.hideLoading();
					}else {
						this.content = FAIL_CONTENT;
					}
				})	
			},
			wetherCollect: function () {
			  var that = this;
			  that.isCollect = !that.isCollect;
			  uni.request({
			  	url: this.$serverUrl + 'toCollect2',
			  	method: 'GET',
			  	data: { fid: that.fid, isCollect: that.isCollect,user_id:that.user_id},
			  	success: res => {
			  		console.log(res.data);
					  uni.showToast({
					      icon: 'none',
					      title: '感谢您的鼓励！'
					  });		
			  		
			  	},
			  	fail: () => {},
			  	complete: () => {
			  		uni.hideLoading();
			  	}
			  });
			  
			},
			/**
			 * 获取评论数据
			 */
			getForumCommentData: function () {
				this.$Request.post(this.$api.home.getComment,{itemid:this.itemid}).then(res => {
					console.log(res);
					if (res.code == "0000") {
						this.comments = res.data;
					}
				})	 
			},
			formSubmit: function(e) {
			    console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value));
			    let _this = this;
			    uni.showLoading({
			    	title: '提交中..'
			    });
				this.$Request.post(this.$api.home.addComment,{
			    		content: _this.contents,
			    		qid: _this.qid,
			    		itemid:_this.itemid,
						userid:_this.userInfo.userid,
						username:_this.userInfo.username,
						catid :_this.content.catid,
						title:_this.content.title,
						item_username:_this.content.editor,
			    	  }).then(res => {
						  console.log(res.msg);
						  if(res.code=="0000"){
							  this.getDetail();
							  this.placeholder = '点击评论回复...';
							  this.contents =  "";
							  this.qid =  "";
							  uni.showToast({
							  	icon: 'none',
							  	title: "评论成功"
							  });
							  this.getForumCommentData();
						  }else{
							uni.showToast({
								icon: 'none',
								title: res.msg
							});
							// uni.hideLoading();
						  }
					
				})		 
			},
			formReset: function(e) {
				console.log('清空数据')
				
			},
			goToTop() {
			    uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				})
			},
			checkLogin(){
// 				var user = service.getUsers();
// 				this.userInfo = user;
				// console.log(user);
				if(!this.hasLogin){ 
					uni.showModal({
						title: "友情提醒",
						content: "请您先登录后发表评论!",
						confirmText: "去登录",
						cancelText: "取消",
						success: function (res) {
							if (res.confirm) 
							uni.navigateTo({
								url: '/pages/login/login',
							})	
							
						}
					})
					return false;
				}return true;
			},
			forContent: function (e) {
			  let _content = e.detail.value;
			  console.log(e.detail.value);
			  // 禁止输入空格
			  var regu = "^[ ]+$";
			  var re = new RegExp(regu);
			  var emptyy = re.test(_content);
			  if (emptyy) return false;
			  this.contents = _content;
			  //end
			  if (this.contents) {
				 this.disabled = false;		    
			  } else {
			     this.disabled = true;
			  }
			
			},
			backContent: function (e) { //回复的评论
				//console.log(e);
				if(e.currentTarget.dataset.username == this.userInfo.username){
					uni.showModal({
						title: "友情提醒",
						content: "您不能评论自己!",
						confirmText: "知道了",
						showCancel:false,
						success: function (res) {
						}
					})
					return;
				}
				this.contents = "";
				  let _from = e.currentTarget.dataset.from;
				  let _id = e.currentTarget.dataset.id;
				 this.placeholder = '回复 ' + _from;
				 this.focus =  true;
				 this.qid =  _id;
			},
			togglePopup:function(){
				this.isshow = false;
			}
			
		}
	}
</script>

<style>
	.wxParse{width:100%}
	.wxParse uni-image{width:100% !important;}
	.wxParse .img {
		display: inline-block;
		width: 0;
		height: 0;
		max-width: 100%;
		overflow: hidden;
	}
	.banner {
		height: 360upx;
		overflow: hidden;
		position: relative;
		background-color: #ccc;
	}
	/* .MsoNormalTable{width:750upx !important;} */
	.banner-img {
		width: 100%;
	}

	.banner-title {
		max-height: 84upx;
		overflow: hidden;
		position: absolute;
		left: 30upx;
		bottom: 30upx;
		width: 90%;
		font-size: 32upx;
		font-weight: 400;
		line-height: 42upx;
		color: white;
		z-index: 11;
	}

	.article-meta {
		padding: 20upx 40upx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		color: gray;
	}
	.article-meta-top{
		padding: 100upx 40upx 20upx 40upx;		
	}
	.article-text {
		font-size: 30upx;
		line-height: 50upx;
		margin: 0 20upx;
	}
	.article-author,
	.article-time {
		font-size: 30upx;
		line-height: 50upx;
	}

	.article-content {
		padding: 0 30upx;
		overflow: hidden;
		font-size: 30upx;
		margin-bottom: 30upx;
		text-align: justify;
	}
	.article-hits{
		margin-left:20upx
	}
	div img{
		width:100%;
	}
	.cmd-icon{
		margin-top:12rpx;
		margin-right:4rpx;
	}
	
	
	/*改版评论*/
	
	.icon-like-fill {
	  color: #fd4a5f;
	}
	
	.Rose-fixed {
	  position: fixed;
	  left: 0;
	  bottom: 0;
	  width: 100%;
	  border-top: 1px solid #d9d9d9;
	  background: #fff;
	  z-index: 5;
	}
	
	.Rose-flex {
	  padding: 14upx 20upx 14upx 20upx;
	  display: flex;
	}
	
	.Rose-none .iconfont {
	  font-size: 52upx;
	  padding: 15upx 10upx 0 0;
	  color: #fd4a5f;
	}
	
	.Rose-input {
	  flex: 1;
	  height: 76upx;
	  line-height: 76upx;
	  padding: 0 20upx;
	  background: #f5f5f5;
	  border: 2upx solid #d9d9d9;
	  font-size: 30upx;
	  border-radius: 4upx;
	  width:618upx;
	}
	
	form uni-view {
		font-size: 15px;
		/* line-height: 86upx; */
	}
	
	button[disabled]:not([type]) {
	  background: #d9d9d9;
	  color: #999;
	  border-radius: 4upx;
	}
	
	button::after {
	  border: 1px solid #d9d9d9;
	  border-radius: 4upx;
	}
	
	.Rose-post {
	  flex: none;
	  height: 76upx;
	  background: #fd4a5f;
	  margin: 0 0 0 10upx;
	  line-height: 76upx;
	  color: #fff;
	  font-size: 26upx;
	  border-radius: 4upx;
	  padding: 1upx 14upx;
	  text-align: center;
	  box-shadow: none;
	  border-radius:8upx;
	  width:82upx;
	}
	button[disabled] {
	  border-radius:8upx;
	}
	
	.Rose-read {
	  margin: 40upx 0 0;
	  color: #999;
	  font-size: 30upx;
	  padding:20upx;
	}
	
	.Rose-Right {
	  float: right;
	  font-size: 32upx;
	  color: #999;
	}
	
	.Rose-Right .iconfont {
	  margin-top: -8upx;
	  vertical-align: middle;
	  font-size: 34upx;
	}
	/*最新*/
	
	.Rose-comments {
	  padding: 20upx 20upx 180upx 20upx ;
	  background: #fff;
	  margin-bottom:160upx;
	}
	
	.Rose-lists {
	  padding: 20upx;
	}

	.Rose-lines{
	  padding: 10upx;
	  color: #666;
	  font-size:30upx;
	  border-left:5px solid #FD575C;
	}
	.Rose-resource {
	  display: flex;
	}
	
	.Rose-image {
	  flex: none;
	  width: 70upx;
	  height: 70upx;
	  border-radius: 50% 50%;
	}
	
	.Rose-image .iconfont {
	  font-size: 60upx;
	  color: #999;
	}
	
	.Rose-user {
	  flex: 1;
	  padding: 0 0 20upx;
	  font-size: 24upx;
	  color: #a8a8a8;
	  line-height: 1;
	  border-bottom: 1upx solid #f2f2f2;
	}
	
	.Rose-items {
	  padding: 30upx 0 0;
	}
	
	.Rose-items:last-child .Rose-user {
	  border-bottom: none;
	}
	
	.Rose-form {
	  margin: 0 0 0 20upx;
	}
	
	.Rose-names {
	  font-size: 28upx;
	  color: #335AA7;
	}
	.reply{margin-left:10upx}
	.replyname{color:#335AA7;}
	.rep{color:#000000;}
	.Rose-times {
	  padding: 16upx 0;
	  color: #999;
	  font-size: 20upx;
	}
	
	.Rose-edit {
	  width: 20%;
	  float: left;
	}
	
	.Rose-edit icon {
	  font-size: 36upx;
	  margin: 0 10upx;
	  color: #999;
	}
	
	.Rose-comment-content {
	  color: #666;
	  font-size: 32upx;
	  line-height: 44upx;
	}
	
	.Rose-back {
	  margin: 20upx 0 0 20upx;
	  color: #999;
	  font-size: 28upx;
	  padding: 10upx;
	  line-height: 1.6;
	  background: #f5f5f5;
	}
	
	.Rose-back-item {
	  line-height: 1.4;
	  word-break: break-all;
	  padding: 5upx 0;
	}
	
	.Rose-tt {
	  color: #333;
	}
	
	.Rose-feeds {
	  padding: 10px;
	  border-bottom: 2upx solid #f2f2f2;
	  font-size: 32upx;
	  color: #666;
	}
	
	.Rose-empty {
	  /* padding: 60upx 0 80upx; */
	  padding: 0upx;
	  text-align: center;
	  font-size: 14px;
	  color: #999;
	}
	
	.Rose-end {
	  margin: -20upx 0 0;
	  padding: 30upx 0;
	  text-align: center;
	  line-height: 1;
	  border-top: 1upx solid #f2f2f2;
	}
	
	.Rose-word {
	  line-height: 1;
	  padding: 30upx 0;
	  font-size: 28upx;
	  color: #999;
	}
	
	.iconfont.icon-kafei {
	  display: block;
	  font-size: 90upx;
	  color: #eee;
	  margin-bottom: 10upx;
	}
	
	.modal-content {
	  padding: 59upx 0;
	}
	
	.Rose-link {
	  margin: 20upx 0 0;
	  padding: 5upx;
	  background: #f5f5f5;
	  color: #999;
	}
	
	.Rose-End {
	  margin: 40upx 0 0;
	  text-align: center;
	  color: #999;
	}
	 .wxParse video{
	  margin-top:10upx;
	  z-index:0;
	  position: relative;
	}
	.wxParse image,video{
	 width:100%;
	} 
	
	.Rose-userface{
	  width:40upx;
	  height:40upx !important;
	  border-radius:50% 50%;
	  float:left;
	  margin-right:10upx;
	}
	.Rose-date{
	  margin-left:15upx
	}
	.uni-actionsheet__cell {
		position: relative;
		padding: 10px 0;
		text-align: center;
		display:flex;
	}
	.uni-popup{
		position:fixed !important;
	}
	.bottom-title {
		line-height: 60upx;
		font-size: 24upx;
		padding: 15upx 0;
	}
	
	.bottom-content {
		display: flex;
		flex-wrap: wrap;
		padding: 0 35upx;
	}
	
	.bottom-content-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 15upx;
		width: 25%;
		box-sizing: border-box;
	}
	
	.bottom-content-image {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 90upx;
		height: 90upx;
		overflow: hidden;
		/* background: #007aff; */
		border-radius: 10upx;
	}
	
	.bottom-content-text {
		font-size: 26upx;
		color: #333;
		margin-top: 10upx;
	}
	
	.bottom-btn {
		height: 90upx;
		line-height: 90upx;
		border-top: 1px #f5f5f5 solid;
	}
	
	/* .bottom-content-image.wx {
		background: #00ce47;
	}
	
	.bottom-content-image.qq {
		background: #00b6f6;
	}
	
	.bottom-content-image.sina {
		background: #ff766a;
	}
	
	.bottom-content-image.copy {
		background: #07ccd0;
	} */
	
	@font-face {
		font-family: 'iconfont';
		/* project id 1028200 */
		src: url('https://at.alicdn.com/t/font_1028200_47ewtwy4t04.ttf') format('truetype');
	}
	
	.icon {
		font-family: 'iconfont';
		font-size: 40upx;
		color: #fff;
	}
	.collect{
		width:60upx
	}
</style>
