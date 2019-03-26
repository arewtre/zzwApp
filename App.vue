<script>
	export default {
		onLaunch: function () {
			//console.log('App Launch')
			//#ifdef APP-PLUS  
				  /* 5+  push 消息推送 ps:使用:H5+的方式监听，实现推送*/  
// 				plus.push.addEventListener("click", function(msg) {  
// 						plus.ui.alert("click:"+JSON.stringify(msg));  
// 						plus.ui.alert(msg.payload);  
// 						// plus.ui.alert(JSON.stringify(msg));  
// 
// 					}, false);  
// 						// 监听在线消息事件    
// 					plus.push.addEventListener("receive", function(msg) {  
// 						// plus.ui.alert(2);  
// 						plus.ui.alert("recevice:"+JSON.stringify(msg))  
// 			   }, false);  

		   //#endif  
		},
		onShow: function () {
			//console.log('App Show')
		},
		onHide: function () {
			//console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./static/css/common.css";
	@import "./static/css/simplepro.css";
</style>
