<template>
    <view>
        <view class="list-cell" hover-class="uni-list-cell-hover" @click="bindClick">
            <view class="media-list" v-if="data.title">
                <view :class="['media-image-left']">
                    <view :class="['media-title','media-title2']">
						<view class="media-info">
							<text class="info-text t"><image v-if="data.vip>0"class="vip" :src="vip"></image></text>
							<text class="info-text t tit">{{data.title}}</text>
						</view>
						<view class="tt2">主营: {{data.business}}</view>
					</view>
					
                    <view :class="['image-section','image-section-left']">
                        <image :class="['image-list1','image-list2']" 
                            :src="data.image_url ? data.image_url:avatarUrl"></image>
                    </view>
                </view>
                <view class="media-foot">
                    <view class="media-info">
						<text class="info-text">{{data.areaid}}</text>
                        <text class="info-text" v-if="data.mode">({{data.mode}})</text>
                        <text class="info-text">{{data.validated}}</text>	
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
	import cmdIcon from "@/components/cmd-icon/cmd-icon.vue";
    export default {
		name: 'uni-media-list',
        props: {
            data: {
                type: Object,
                default: function(e) {
                    return {
					}
                }
            }
        },
		data() {
			return {
				avatarUrl: '/static/img/company/nopic-60.png',
				vip: '/static/img/company/icon-vip.png',
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
                return this.data.image_list || this.data.image_url
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

<style>
	
    view {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
    }
	.cmd-icon{
		margin-top:10upx
	}
    .list-cell {
        width: 750upx;
        padding: 0 30upx;
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
        lines: 2;
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
        margin-right: 10upx;
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
	.vip{width:26upx;height:26upx}
	.tt2{font-size: 18upx;height:80upx;overflow:hidden;lines: 2;color: #999999;text-overflow: ellipsis;}
	.tit {
	    lines: 2;
	    text-overflow: ellipsis;
	    font-size: 30upx;
	    color: #555555;
	}
	.t{margin-right:4upx;}
</style>
