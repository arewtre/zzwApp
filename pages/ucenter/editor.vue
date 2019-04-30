<template>
  <div class="components-container">
    <div class="info">UE编辑器示例<br>需要使用编辑器时，调用UE公共组件即可。可设置填充内容defaultMsg，配置信息config(宽度和高度等)，可调用组件中获取内容的方法。</div>
    <button @click="getUEContent()">获取内容</button>
    <div class="editor-container">
      <!-- <UE :defaultMsg=content.content :config=config ref="ue"></UE> -->
    </div>
  </div>
</template>
<style>
  .info{
    border-radius: 10px;
    line-height: 20px;
    padding: 10px;  
    margin: 10px;
    background-color: #ffffff;
  }
</style>
<script>
  // import UE from '@/components/ue/ue.vue';
  export default {
    // components: {UE},
    data() {
      return {
        defaultMsg: '这里是UE测试',
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        },
				itemid:36557,
				catid:5,
				content:""
      }
    },
		onLoad(){
			this.getDetail();
		},    
    methods: {
      getUEContent() {
        let content = this.$refs.ue.getUEContent();
        // this.$notify({
        //   title: '获取成功，可在控制台查看！',
        //   message: content,
        //   type: 'success'
        // });
        console.log(content)
      },
			getDetail() {
				uni.showLoading({
					title: '加载中'
				});
				console.log(this.userInfo);
				this.$Request.post(this.$api.home.newsdata,{catid:this.catid,itemid:this.itemid}).then(res => {
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
    }
  };
</script>