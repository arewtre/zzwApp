<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign">LOGIN</view>
			<view class="welcome">
				欢迎回来！
			</view>
			<view class="input-content">
				<view class="input-item">
					<text class="tit">账号</text>
					<input 
						type="text" 
						:value="username" 
						placeholder="请输入账号"
						maxlength="11"
						data-key="username"
						@input="inputChange"
					/>
				</view>
				<view class="input-item">
					<text class="tit">密码</text>
					<input 
						type="text" 
						value="" 
						placeholder="请输入密码"
						placeholder-class="input-empty"
						maxlength="20"
						password 
						data-key="password"
						@input="inputChange"
						@confirm="toLogin"
					/>
				</view>
			</view>
			<button class="confirm-btn" @click="toLogin" :disabled="logining">登录</button>
			<view class="forget-section">
				忘记密码?  <text class="toRegist" @click="toRegist">马上注册</text>
			</view>
			<view class="quick_login_line">
				<view class="line" />
				<text class="text">快速登录</text>
				<view class="line" />
			</view>
			<view class="quick_login_list">
				<image @tap="thirdLogin('qq')" class="item" :src="imgInfo.qq" />
				<image @tap="thirdLogin('weixin')" class="item" :src="imgInfo.wechat" />
				<image @tap="thirdLogin('weibo')" class="item" :src="imgInfo.weibo" />
			</view>
		</view>
		<!-- <view class="register-section">
			还没有账号?
			<text @click="toRegist">马上注册</text>  
		</view> -->
		<neil-modal :show="show" @close="closeModal()" @cancel="bindBtn('cancel')" @confirm="bindBtn('confirm')" title="请选择是否绑定原有账号" confirm-text="立即绑定" cancel-text="暂不绑定">
		    <view class="input-view">
		        <view class="input-name">
		            <view>账号</view>
		            <input type="text" data-key="username" @input="inputChange" placeholder="请输入账号" />
		        </view>
		        <view class="input-password">
		            <view>密码</view>
		            <input type="text" data-key="password" @input="inputChange" placeholder="请输入密码" />
		        </view>
		    </view>
		</neil-modal>
	</view>
</template>

<script>
	import neilModal from '@/components/neil-modal/neil-modal.vue';
	import {  
        mapMutations  
    } from 'vuex';
	
	export default{
		components: {
		    neilModal
		},
		data(){
			const isUni = typeof(uni) !== 'undefined'
			return {
				username: '',
				password: '',
				logining: false,
				imgInfo: {
					qq: isUni ? '/static/qq.png' : require('./images/qq.png'),
					wechat: isUni ? '/static/wechat.png' : require('./images/wechat.png'),
					weibo: isUni ? '/static/weibo.png' : require('./images/weibo.png')
				},
				show:false,
				infoResUserInfo:""
			}
		},
		onLoad(){
			// plus.ui.alert((JSON.stringify(uni.getStorageSync('thirdLogin'))));
		},
		methods: {
			...mapMutations(['login']),  
			inputChange(e){
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			inputChange(e){
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			navBack(){
				uni.navigateBack();
			},
			toRegist(){
				this.$api.msg('去注册');
			},
			async toLogin(){
				if(this.username==""){
					uni.showToast({
						icon: 'none',
						title: '请填写用户名'
					});
					return;
				}
				if(this.password==""){
					uni.showToast({
						icon: 'none',
						title: '请填写用户密码'
					});
					return;
				}
				this.logining = true;
				this.$Request.post(this.$api.user.checkLogin,{username:this.username,password:this.password}).then(ret => {		
					console.log(ret);
					if(ret.code=="0000"){
						this.login(ret.data);
						// uni.navigateBack(); 
						uni.showToast({
							icon: 'success',
							title: '登录成功'
						});
						setTimeout(function(){
							uni.navigateBack();								
						},1000);								
						
					}else{
						uni.showToast({
							icon: 'none',
							title: ret.msg
						});
						this.logining = false;
						return;
					}										
				})
				
			},
			thirdLogin(type){
				let that = this;
				uni.login({
				  provider: type,
				  success: function (loginRes) {  
					// plus.ui.alert((JSON.stringify(loginRes.authResult)));
					// uni.setStorageSync('thirdLogin',  loginRes);
					// 获取用户信息 
					uni.getUserInfo({
					  provider: 'weixin',
					  success: function (infoRes) {
						that.infoResUserInfo = infoRes.userInfo;
						if(!checkbd(type)){
							that.show = true;
						}
						// plus.ui.alert((JSON.stringify(this.showw)));
					  }
					});
				  }
				});
			},
			checkbd(type){
				this.$Request.post(this.$api.user.checkbd,{infoResUserInfo:this.infoResUserInfo,type:type}).then(ret => {	
					if(ret.code=="0000"){
						return true;
					}
					return false;
				})
				return false;	
			},
			bindBtn(type) {
			    if(type="cancel"){
					
				}
				if(type="confirm"){
					// plus.ui.alert((JSON.stringify(this.infoResUserInfo)));
					if(this.username==""){
						uni.showToast({
							icon: 'none',
							title: '请填写用户名'
						});
						return;
					}
					if(this.password==""){
						uni.showToast({
							icon: 'none',
							title: '请填写用户密码'
						});
						return;
					}
					this.logining = true;
					this.$Request.post(this.$api.user.bdAppOpenid,{userid:ret.data.userid,infoResUserInfo:this.infoResUserInfo}).then(ret => {	
						console.log(ret);
						if(ret.code=="0000"){
							
						}else{
							uni.showToast({
								icon: 'none',
								title: ret.msg
							});
							this.logining = false;
							return;
						}										
					})
				}
				uni.showToast({
				    title: `点击了${type==='cancel'?'取消':'确定'}按钮`,
				    icon: 'none'
				})
			}
		},

	}
</script>

<style lang='scss'>
	page{
		background: #fff;
	}
	.container{
		padding-top: 48px; 
		position:relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}
	.wrapper{
		position:relative;
		z-index: 90;
		background: #fff;
		/* padding-bottom: 40upx; */
	}
	.back-btn{
		position:absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}
	.left-top-sign{
		font-size: 120upx;
		color: $page-color-base;
		position:relative;
		left: -16upx;
	}
	.right-top-sign{
		position:absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;
		&:before, &:after{
			display:block;
			content:"";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}
		&:before{
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}
		&:after{
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}
	.left-bottom-sign{
		position:absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}
	.welcome{
		position:relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0,0,0,.3);  
	}
	.input-content{
		padding: 0 60upx;
	}
	.input-item{
		display:flex;
		flex-direction: column;
		align-items:flex-start;
		justify-content: center;
		padding: 0 30upx;
		background:$page-color-light;
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 50upx;
		&:last-child{
			margin-bottom: 0;
		}
		.tit{
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}
		input{
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}	
	}

	.confirm-btn{
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 70upx;
		background: $uni-color-primary;
		color: #fff;
		font-size: $font-lg;
		&:after{
			border-radius: 100px;
		}
	}
	.forget-section{
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
		margin-top: 40upx;
	}
	.register-section{
		position:absolute;
		left: 0;
		bottom: 50upx;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;
		text{
			color: $font-color-spec;
			margin-left: 10upx;
		}
	}
	.quick_login_line {
		margin-top: 40px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	
	.quick_login_line .line {
		height: 1px;
		width: 38%;
		background-color: rgba(211, 211, 213, 1);
	}
	
	.quick_login_line .text {
		font-size: 13px;
		color: rgba(200, 200, 200, 1);
		margin: 2px;
	}
	
	.quick_login_list {
		/* margin-top: 30px; */
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	.quick_login_list .item {
		width: 80upx;
		height: 80upx;
		margin: 36upx;
	}
	.toRegist{margin-left:30upx}
	.input-name,
	.input-password {
	    height: 80upx;
	    width: 100%;
	    display: flex;
	    flex-direction: row;
	    justify-content: center;
	    align-items: center;
	    position: relative;
	    padding-left: 30upx;
	    box-sizing: border-box;
	}
	
	.input-name::after {
	    content: " ";
	    position: absolute;
	    left: 30upx;
	    bottom: 0;
	    right: 0;
	    height: 1px;
	    border-top: 1px solid #e5e5e5;
	    transform-origin: 0 0;
	    transform: scaleY(.5);
	}
	
	.input-name view,
	.input-password view {
	    width: 120upx;
	    height: 50upx;
	    line-height: 50upx;
	    font-size: 28upx;
	    color: #333333;
	}
	
	.input-name input,
	.input-password input {
	    flex: 1;
	    height: 50upx;
	    line-height: 50upx;
	}
</style>
