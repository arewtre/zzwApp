<template>
    <view>
        <web-view :webview-styles="webviewStyles" :src="ssrc"></web-view>
    </view>
</template>

<script>
    export default {
        data() { 
            return {
                webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                },
				ssrc:""
            }
        },
		onLoad: function(event) { 
			// 初始化列表信息
			//setTimeout(() => {
			    uni.getStorage({
			        key:'urlSpecia',
			        success: (res) => {
					   this.ssrc=res.data;
					   //console.log( this.ssrc);
			        }
			    })
			//},200)
		}
			
    }
</script>

<style>

</style>
