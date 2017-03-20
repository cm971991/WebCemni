<template>
  <div class="MyContain">
  </div>
</template>

<script>
	import VueRouter from 'vue-router'
	export default{
		components: {},
		data(){return {}},
		computed(){},
		created(){
			const router = new VueRouter({})
			let result = {}
			let url = 'http://121.40.231.28:8080/ApiCemni/isExistUserByOpenId'
			let reg = new RegExp("(^|&)code=([^&]*)(&|$)", "i");
			let r = window.location.search.substr(1).match(reg);
			if (r != null) {
				result['openid'] = unescape(r[2]);
				this.$api.xHttp.post(url, {openId: result['openid']}).then((res) => {
					if (res && res.flag == "1") {
						let skipUrl = 'http://club.cemni.com/mobile.do?from=wechat&openid=' + res.openId
						window.location.href = skipUrl
					} else {
						localStorage.setItem('openid', res.openId);
						router.push({path: 'Register', query: {code: res.openId}})
					}
				}).catch(({code, msg}) => {
					this.$vux.alert.show({content: msg})
				})
			} else {
				result['openid'] = '';
			}
		},
		beforeDestroy () {},
		mounted () {},
		beforeRouteEnter (to, from, next) {
			next(vm => {
				// 通过 `vm` 访问组件实例
			})
		},
		beforeRouteLeave (to, from, next) {
			// 导航离开该组件的对应路由时调用
			// 可以访问组件实例 `this`
			next()
		},
		methods: {}
	}
</script>

<style lang="less" rel="stylesheet/less">
  .MyContain {
    background-color: #fff;
  }
</style>
