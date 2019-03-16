<template>
    <view>
        <web-view :webview-styles="webviewStyles" src="http://www.chinapaper.net/zt/fushi/"></web-view>
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
			this.ssrc=event.urlSpecia;
			console.log(event.urlSpecia);
		}
			
    }
</script>

<style>

</style>
