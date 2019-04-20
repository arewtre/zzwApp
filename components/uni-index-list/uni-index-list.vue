<template>
    <view>
        <view class="list-cell" hover-class="uni-list-cell-hover" @click="bindClick">
            <view class="media-list" v-if="data.title">
                <view :class="[isImgRight?'media-image-right':'',isImgLeft?'media-image-left':'']">
					<view :class="['media-title',isImgRight||isImgLeft?'media-title2':'']">{{data.title}}</view>
                    <view v-if="showImg" :class="['image-section',isImgRight?'image-section-right':'',isImgLeft?'image-section-left':'']">
                        <image :class="['image-list1',isImgRight||isImgLeft?'image-list2':'']" 
                            :src="data.image_url"></image>
                    </view>
                </view>
                <view class="media-foot">
                    <view class="media-info">
						<text class="info-text info-text1">{{data.catname}}</text>
                        <text class="info-text">{{data.source}}</text>
                        <text class="info-text">{{data.comment_count}}次浏览</text>
                        <!-- <text :class="[data.istoday==1?'info-textt':'info-text']">{{data.datetime}}</text>	 -->
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
	import cmdIcon from "@/components/cmd-icon/cmd-icon.vue";
    export default {
		name: 'uni-index-list',
        props: {
            data: {
                type: Object,
                default: function(e) {
                    return {}
                }
            }
        },
		components: {
			cmdIcon,
		},
        computed: {
            isImgRight() {
                return this.data.article_type === 2
            },
            isImgLeft() {
                return this.data.article_type === 1
            },
            showImg() {
                return this.data.image_url
            }
        },
        methods: {
            close(e) {
                this.$emit('close');
            },
            bindClick() {
                this.$emit('click');
            }
        }
    }
</script>

<style lang='scss'>
    view {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
    }
	.cmd-icon{
		margin-top:10upx
	}
    .list-cell {
        width: 710upx;
        padding: 0 20upx;
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
        flex-direction: row;
    }

    .media-image-left {
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
        height: 481upx;
    }

    .image-list2 {
        width: 225upx;
        height: 146upx;
    }

    .image-list3 {
        width: 225upx;
        height: 146upx;
    }

    .media-info {
        flex-direction: row;
    }

    .info-text {
        margin-right: 20upx;
        color: #999999;
        font-size: 18upx;
		height:30upx;
		line-height:30upx;
    }
	.info-textt{
		margin-right: 20upx;
		color: rgb(252, 44, 93);
		font-size: 18upx;
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
</style>
