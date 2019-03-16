<template>
    <view class="goods-list" v-if="data.length > 0">
    	<view class="coupon-page s-row" v-for="(item,index) in data" :key="index" @click="gpToDetail(item)">
    		<view v-if="item.thumb">
    			<view class="image">
    				<image :src="item.thumb" model="aspectFill"></image>
    			</view>
    		</view>
    		<view class="content">
    			<view class="title">{{item.title}}
					<text class="title2">{{item.introduce}}</text>
				</view>
    			<view class="num s-row">
    				<cmd-icon type="star" size="15" color="#aaa"></cmd-icon><text class="tmprice">{{item.catname}}</text>
    				<cmd-icon type="eye" size="15" color="#aaa"></cmd-icon><text class="tmprice">{{item.hits}}</text>
    				<cmd-icon type="user" size="15" color="#aaa"></cmd-icon><text class="tmprice">{{item.username}}</text>
    				<cmd-icon type="clock" size="15" color="#aaa"></cmd-icon><text class="volume">{{item.addtime}}</text>
    			</view>
    			
    		</view>
    	</view>
    </view>
</template>

<script>
	import cmdIcon from "@/components/cmd-icon/cmd-icon.vue";
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
			cmdIcon,
		},
        computed: {
            
        },
        methods: {
            gpToDetail(e) {
				console.log(e);
                uni.navigateTo({
            		url: '/pages/detail/detail?catid=' + e.catid +'&itemid='+e.itemid,
                })
            },
        }
    }
</script>

<style>
	@import "../../static/css/index.css";
</style>
