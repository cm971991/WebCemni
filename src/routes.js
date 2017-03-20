import Register from './pages/Register.vue'
import RegisterSuccess from './pages/RegisterSuccess.vue'
import RegisterExtra from './pages/RegisterExtra.vue'
import Button from './pages/Demos/Button.vue'
import Dialog from './pages/Demos/Dialog.vue'
import Utils from './pages/Demos/Utils.vue'
import Http from './pages/Demos/Http.vue'
import Input from './pages/Demos/Input.vue'
import SpApi from './pages/Demos/SpApi.vue'
import NearbyStores from './pages/NearbyStores.vue'
import Index from './pages/Index.vue'

module.exports = {
	defaultTitle: '千年珠宝',
	routes: [
		{path: '/', component: Index},
		{path: '/Register', component: Register},
		{path: '/registerExtra', component: RegisterExtra, meta: {title: '资料完善', noTopSpace: true}},
		{path: '/registerSuccess', component: RegisterSuccess, meta: {title: '注册成功', noTopSpace: true}},
		{path: '/button', component: Button, meta: {title: '按钮'}},
		{path: '/dialog', component: Dialog},
		{path: '/utils', component: Utils},
		// 异步加载组件方式（推荐）
		{
			path: '/load',
			component: function (resolve) {
				require(['./pages/Demos/PulldownPullup.vue'], resolve)
			}
		},
		{path: '/http', component: Http},
		{path: '/input', component: Input},
		{path: '/nearbyStores', component: NearbyStores, meta: {title: '门店查询', noFoot: true, noTopSpace: true}},
		{path: '/sp', component: SpApi}
	],
	// 默认页面头部留2%高度的余白，不需要的页面需特殊处理
	noShowTopSpacePage: ['/nearbyStores'],
	// 默认展示底部提示，不需要的页面需特殊处理
	noShowFootPage: ['/button', '/nearbyStores']
}
