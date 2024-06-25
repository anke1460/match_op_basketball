import App from './App'
import en from './locale/en.json'
import zhHans from './locale/zh-Hans.json'
const messages = {
	en,
	'zh-Hans': zhHans
}
window.pullSet = undefined;
let i18nConfig = {
  locale: uni.getLocale(),// 获取已设置的语言
  messages
}

// #ifndef VUE3
import Vue from 'vue'

import VueI18n from 'vue-i18n'// v8.x
Vue.use(VueI18n)
const i18n = new VueI18n(i18nConfig)
// 引入全局uView
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	  i18n,
    ...App
})
app.$mount()
// #endif


uni.$u.http.setConfig((config) => {
    /* config 为默认全局配置*/
		config.withCredentials = true;
		// if (config.params == undefined) {
		// 	config.params = {}
		// }
		// config.params.key = uni.getStorageSync('match_id');
		// config.params.auth_key = uni.getStorageSync('token');
		config.header.lang = uni.getLocale();
		config.header.Authorization = uni.getStorageSync('token');
		config.baseURL = `/api`;
        // config.baseURL = `http://localhost:3003/`;
		// config.baseURL = `http://test.kospt.win/`;
    // config.baseURL = `http://20.255.63.11/`; 
		config.baseURL = `https://kospt.win/`
    return config
})
// #ifdef VUE3
import { createSSRApp } from 'vue'
import { createI18n } from 'vue-i18n'// v9.x
const i18n = createI18n(i18nConfig)
export function createApp() {
  const app = createSSRApp(App)
	 app.use(i18n)
  return {
    app
  }
}
// #endif
