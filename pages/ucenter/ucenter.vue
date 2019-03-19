<template>
	<view class="center">
		<view class="logo" @click="goLogin" :hover-class="!login ? 'logo-hover' : ''">
			<image class="logo-img" :src="login ? uerInfo.avatarUrl :avatarUrl"></image>
			<view class="logo-title">
				<text class="uer-name">Hi，{{login ? uerInfo.username : '您未登录'}}</text>
				<text class="go-login navigat-arrow" v-if="!login">&#xe65e;</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item border-bottom" @click="goTo()">
				<text class="list-icon">&#xe60f;</text>
				<text class="list-text">账号管理</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			<view class="center-list-item" @click="goTo()">
				<text class="list-icon">&#xe639;</text>
				<text class="list-text">新消息通知</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view>
		<view class="center-list" @click="goTo()">
			<view class="center-list-item border-bottom">
				<text class="list-icon">&#xe60b;</text>
				<text class="list-text">帮助与反馈</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			<view class="center-list-item" @click="goTo()">
				<text class="list-icon">&#xe65f;</text>
				<text class="list-text">服务条款及隐私</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item" @click="goTo()">
				<text class="list-icon">&#xe614;</text>
				<text class="list-text">关于应用</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			<view class="center-list-item" @click="clearHc()">
				<text class="list-icon">&#xe614;</text>
				<text class="list-text">清除缓存</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view>
		<view class="center-list logout" v-if="login">
				<button class="submit" type="primary" @tap="loginOut">退出登录</button>
		</view>
	</view>
</template>

<script>
	import service from '../../common/service.js';
	export default {
		data() {
			return {
				login: false,
				avatarUrl: '/static/logo.png',
				uerInfo: {}
			}
		},
		onLoad: function() {
			this.getUsers();
		},
		onShow: function(){
			this.getUsers();
		},
		methods: {
			goLogin() {
				if (!this.login) {
					console.log('点击前往登录');
					uni.navigateTo({
						// url: '/pages/detail/detail?query=' + encodeURIComponent(JSON.stringify(detail))
						url: '/pages/login/login'
					});
				}
			},
			loginOut () {
				var res = service.logOut();
				if(res){
					uni.showToast({
						icon: 'success',
						title: '退出成功!'
					});
					this.getUsers();
				}
			},
			getUsers(){
				var user = service.getUsers();
				if(user!=""){
					console.log(user);			    
					this.uerInfo = user;
					this.login = true;
				}else{
					this.login = false;
				}
			},
			goTo(){
				uni.showToast({
					icon: 'none',
					title: '功能开发中!'
				});
			},
			clearHc(){
				try {
					uni.clearStorageSync();
					uni.showToast({
						icon: 'success',
						title: '清除成功!'
					});
					this.getUsers();
				} catch (e) {
					// error
					uni.showToast({
						icon: 'none',
						title: '清除失败请重试!'
					});
				}
			}
		}
	}
</script>

<style>
	@font-face {
		font-family: texticons;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_984210_5cs13ndgqsn.ttf') format('truetype');
	}

	page,
	view {
		display: flex;
	}

	page {
		background-color: #f8f8f8;
	}
	.submit {
		margin-top: 30px;
		margin-left: 20px;
		margin-right: 20px;
		color: white;
		background-color: rgba(252, 44, 93, 1.0) !important;
		-webkit-tap-highlight-color: rgba(252, 44, 93, 1.0);
	}
	
	
	.submit :active {
		color: #B6B6B6;
		background-color: rgba(252, 44, 93, 0.8);
	}
	.logout{
		padding-bottom: 40upx;
		
	}
	.center {
		flex-direction: column;
	}

	.logo {
		width: 750upx;
		height: 240upx;
		padding: 30upx 20upx 20upx 20upx;
		box-sizing: border-box;
		/* background: linear-gradient(to left, #FA4DBE 0, #FBAA58 100%); */
		background:#fc2c5d;
		flex-direction: row;
		align-items: center;
	}

	.logo-hover {
		opacity: 0.8;
	}

	.logo-img {
		width: 150upx;
		height: 150upx;
		border-radius: 150upx;
	}

	.logo-title {
		height: 150upx;
		flex: 1;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
		margin-left: 20upx;
	}

	.uer-name {
		height: 60upx;
		line-height: 60upx;
		font-size: 38upx;
		color: #FFFFFF;
	}

	.go-login.navigat-arrow {
		font-size: 38upx;
		color: #FFFFFF;
	}

	.login-title {
		height: 150upx;
		align-items: self-start;
		justify-content: center;
		flex-direction: column;
		margin-left: 20upx;
	}

	.center-list {
		background-color: #FFFFFF;
		margin-top: 20upx;
		width: 750upx;
		flex-direction: column;
	}

	.center-list-item {
		height: 90upx;
		width: 750upx;
		box-sizing: border-box;
		flex-direction: row;
		padding: 0upx 20upx;
	}

	.border-bottom {
		border-bottom-width: 1upx;
		border-color: #c8c7cc;
		border-bottom-style: solid;
	}

	.list-icon {
		width: 40upx;
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #2F85FC;
		text-align: center;
		font-family: texticons;
		margin-right: 20upx;
	}

	.list-text {
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		flex: 1;
		text-align: left;
	}

	.navigat-arrow {
		height: 90upx;
		width: 40upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		text-align: right;
		font-family: texticons;
	}
</style>
