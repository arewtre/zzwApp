<template>
    <view>
        <web-view :webview-styles="webviewStyles" src="https://uniapp.dcloud.io/static/web-view.html"></web-view>
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
		}
			
    }
</script>

<style>

</style>
