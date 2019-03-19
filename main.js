import Vue from 'vue'
import App from './App'
import httpApi from './common/httpApi'
import HttpRequest from './common/httpRequest'
import HttpCache from './common/cache'
import Util from './common/util'
import loadMore from './components/uni-pro/load-more'
import Service from './common/service'

Vue.config.productionTip = false
Vue.prototype.$api = httpApi
Vue.prototype.$Request = HttpRequest
Vue.prototype.$Sysconf = HttpRequest.config
Vue.prototype.$SysCache = HttpCache
Vue.prototype.$Util = Util
Vue.prototype.$Service = Service
Vue.prototype.$serverUrl = 'http://47.100.48.1/api/member/'

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
