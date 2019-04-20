<template>
    <view class="commm"  v-if="data.length > 0">
    	<view v-for="(item,index) in data" :key="index" @click="gpToDetail(item)">
			<view class="list-cell" hover-class="uni-list-cell-hover" @click="bindClick">
			    <view class="media-list" v-if="item.title">
			        <view :class="[item.article_type==1?'media-image-right':'',item.article_type==2?'media-image-left':'']">
						<view :class="['media-title',item.article_type==1 ||item.article_type==2?'media-title2':'']">
							{{item.title}}
							<view class="intro" v-if="item.post_id==566">{{item.introduce}}</view>
						</view>
			            <view v-if="item.image_url" :class="['image-section',item.article_type==1?'image-section-right':'',item.article_type==2?'image-section-left':'']">
			                <image :class="['image-list1',item.article_type==1 ||item.article_type==2?'image-list2':'']" 
			                    :src="item.image_url" v-if="item.article_type!=3 && item.image_url " model="widthFix"></image>
			                <image class="image-list3" v-if="item.article_type==3 && i<3" :src="source" v-for="(source, i) in item.image_list"
			                    :key="i" model="widthFix" />
			            </view>
			        </view>
			        <view class="media-foot">
			            <view class="media-info">
							<text class="info-text info-text1">{{item.catname}}</text>
			                <text class="info-text">{{item.source}}</text>
			                <text class="info-text">{{item.comment_count}}次浏览</text>
			                <text :class="[item.istoday==1?'info-textt':'info-text']">{{item.datetime}}</text>	
			            </view>
			        </view>
			    </view>
			</view>
    	</view>
    </view>
</template>

<script>
	// import cmdIcon from "@/components/cmd-icon/cmd-icon.vue";
    export default {
        props: {
            data: {
               // type: Object,
                default: function(e) {
                    return {}
                }
            }
        },
		components: {
			// cmdIcon,
		},
        computed: {
            
        },
        methods: {
			isImgRight(e) {
			    return e.article_type === 2
			},
			isImgLeft(e) {
			    return e.article_type === 1
			},
            gpToDetail(e) {
				console.log(e);
                uni.navigateTo({
            		url: '/pages/detail/detail?catid=' + e.post_id +'&itemid='+e.id,
                })
            },
        }
    }
</script>

<style>
	@import "../../static/css/index.css";

	/* view {
	   display: flex;
	   flex-direction: column;
	   box-sizing: border-box; 
	}
 */
	.cmd-icon{
		margin-top:10upx
	}
	.list-cell {
	    width: 710upx;
	    padding: 0 10upx;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}
	
	.uni-list-cell-hover {
	    background-color: #eeeeee;
	}
	
	.media-list {
	    flex: 1;
	    flex-direction: column;
	    border-bottom-width: 1upx;
	    border-bottom-style: solid;
	    border-bottom-color: #c8c7cc;
	    padding: 20upx 0;
	}
	
	.media-image-right {
		display: flex;
	    flex-direction: row;
	}
	
	.media-image-left {
		display: flex;
	    flex-direction: row-reverse;
	}
	
	.media-title {
	    flex: 1;
	}
	
	.media-title {
	    lines: 3;
	    text-overflow: ellipsis;
	    font-size: 32upx;
	    color: #555555;
	}
	
	.media-title2 {
	    flex: 1;
	    margin-top: 6upx;
	    line-height: 40upx;
	}
	
	.image-section {
	    margin-top: 20upx;
	    flex-direction: row;
	    justify-content: space-between;
		
	}
	
	.image-section-right {
	    margin-top: 0upx;
	    margin-left: 10upx;
	    width: 225upx;
	    height: 146upx;
	}
	
	.image-section-left {
	    margin-top: 0upx;
	    margin-right: 16upx;
	    width: 225upx;
	    height: 146upx;
	}
	
	.image-list1 {
	    width: 690upx;
	    height: 340upx;
	}
	
	.image-list2 {
	    width: 225upx;
	    height: 146upx;
	}
	
	.image-list3 {
	    width: 225upx;
	    height: 146upx;
		padding:0 4upx;
	}
	
	.media-info {
	    flex-direction: row;
	}
	
	.info-text {
	    margin-right: 20upx;
	    color: #999999;
	    font-size: 26upx;
		height:30upx;
		line-height:30upx;
	}
	.info-textt{
		margin-right: 20upx;
		color: rgb(252, 44, 93);
		font-size: 26upx;
	}
	.info-text1{
		max-width:340upx;
		overflow:hidden;
		lines: 1;
		text-overflow: ellipsis;
	}
	.media-foot {
	    margin-top: 20upx;
	    flex-direction: row;
	    justify-content: space-between;
	}
	
	.max-close-view {
	    align-items: center;
	    justify-content: flex-end;
	    flex-direction: row;
	    height: 40upx;
	    width: 80upx;
	}
	
	.close-view {
	    border-style: solid;
	    border-width: 1px;
	    border-color: #999999;
	    border-radius: 10upx;
	    justify-content: center;
	    height: 30upx;
	    width: 40upx;
	    line-height: 30upx;
	}
	
	.close {
	    text-align: center;
	    color: #999999;
	    font-size: 28upx;
	}
	.intro{
		font-size:26upx;
		color:#999999;
		lines: 2;
		overflow:hidden;
		line-height:40upx;
		max-height:80upx;
		text-overflow: ellipsis;
		margin-top:10upx;
		}
</style>
