import Vue from 'vue'
import App from './App'
import httpApi from './common/httpApi'
import HttpRequest from './common/httpRequest'
import HttpCache from './common/cache'
import Util from './common/util'
import loadMore from './components/uni-pro/load-more'
import Service from './common/service'
import store from './store'

const msg = (title, duration=1500, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
const json = type=>{
	//模拟异步请求数据
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Json[type]);
		}, 300)
	})
}

Vue.config.productionTip = false
Vue.prototype.$api = httpApi
Vue.prototype.$Request = HttpRequest
Vue.prototype.$Sysconf = HttpRequest.config
Vue.prototype.$SysCache = HttpCache
Vue.prototype.$Util = Util
Vue.prototype.$Service = Service
Vue.prototype.$serverUrl = 'http://47.100.48.1/api/member/'
Vue.prototype.$store = store
Vue.prototype.$fire = new Vue()
Vue.prototype.$msg = {msg, json};

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
