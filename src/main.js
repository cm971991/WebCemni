// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import Resource from 'vue-resource'
import config from '../config/index'
import App from './App'
import routes from './routes'

Vue.use(VueRouter)
Vue.use(Resource)

const router = new VueRouter({
	// mode: 'history',
	// base: config.build.assetsPublicPath,
	routes: routes.routes
})

FastClick.attach(document.body)

/**
 * sync router params
 */
import {sync} from 'vuex-router-sync'
import store from './vuex/store'

let history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

/**
 * sync router loading status
 */
const commit = store.commit
router.beforeEach((to, from, next) => {
	const toIndex = history.getItem(to.path)
	const fromIndex = history.getItem(from.path)
	if (toIndex) {
		if (toIndex > fromIndex || !fromIndex || (toIndex === '0' && fromIndex === '0')) {
			commit('UPDATE_DIRECTION', 'forward')
		} else {
			commit('UPDATE_DIRECTION', 'reverse')
		}
	} else {
		++historyCount
		history.setItem('count', historyCount)
		to.path !== '/' && history.setItem(to.path, historyCount)
		commit('UPDATE_DIRECTION', 'forward')
	}
	commit('UPDATE_LOADING', true)
	commit('SHOWFOOT', false)
	setTimeout(next, 50)
})
router.afterEach((to) => {
	// 设置标题
	if (to.meta.title || routes.defaultTitle !== document.title) {
		Vue.$utils.Common.setTitle(to.meta.title || routes.defaultTitle)
	}
	commit('UPDATE_LOADING', false)
	// 默认页面头部留2%高度的余白，不需要的页面需特殊处理
	commit('SHOWTOPSPACE', !to.meta.noTopSpace)
	// 默认展示底部提示，不需要的页面需特殊处理
	setTimeout(() => {
		commit('SHOWFOOT', !to.meta.noFoot)
	}, 500)
})

sync(store, router)

// plugins
import {DevicePlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin, TitlePlugin} from 'vux'
import ToastPlugin from './plugs/toast/index'
import UtilsPlugin from './assets/utils'
import Api from './services'

Vue.use(DevicePlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(TitlePlugin)
Vue.use(UtilsPlugin)
Vue.use(ToastPlugin)
Vue.use(Api)

// polyfill
import './polyfill/index'

// global $eventHub
window.$eventHub = new Vue()

/* eslint-disable no-new */
new Vue({
	store,
	router,
	render: h => h(App)
}).$mount('#root')
