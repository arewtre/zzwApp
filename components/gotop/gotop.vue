<template>
	<view bindtap="goTop" class="widget-goTop" v-if="fix">
		<uni-icon size="40" type="arrowthinup" color="#8f8f94" @click="goToTop()"></uni-icon>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon.vue';
	export default {
		props: {
		    data: {
		        type: Object,
		        default: function(e) {
		            return {}
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
			uniLoadMore,
			uniIcon
		},
		methods: {
			goToTop() {
			    uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				})
			}
		}	
	}
</script>

<style>
</style>
