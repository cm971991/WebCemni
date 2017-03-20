<template>
  <div class="http-contain">
    <group title="接口">
      <cell title="调用支持跨域GET接口" @click.native="getMethod" is-link></cell>
      <cell title="调用普通GET接口" @click.native="proxyGetMethod" is-link></cell>
      <cell title="调用普通POST接口" @click.native="proxyPostMethod" is-link></cell>
      <cell title="调用同域接口" @click.native="proxyPostMethod2" is-link></cell>
    </group>
  </div>
</template>

<script>
  import { Group, Cell } from 'vux'
  
  export default{
    components: {
      Group, Cell
    },
    data () {
      return {}
    },
    computed: {},
    created () {},
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
    methods: {
      getMethod () {
        this.$api.xHttp.get('http://wx.gx10010.com/h5api/api/IPAddress/Get').then(({ipaddress}) => {
          this.$vux.toast.show(ipaddress)
        }).catch(({code, msg}) => {
          this.$vux.alert.show({content: msg})
        })
      },
      proxyGetMethod () {
        let apiurl = '/wxApi/wx_new/api/WeixinApi/GetMob?openid=ol2oWt3awDI0KzVdUoBF97sQtIbM&database=iwx_wxd944a4e7e4fbb863'
        // 设置options
        let options = {
          headers: {
            Authorization: 'Basic dXNlcjpwYXNzd29yZA='
          },
          timeout: 2000
        }

        // 设置load
        let load = {
          load: true,
          loadMsg: '哈哈哈'
        }

        this.$api.xHttp.get(apiurl, options, load).then((res) => {
          this.$vux.alert.show({content: JSON.stringify(res)})
        }).catch(({code, msg}) => {
          this.$vux.alert.show({content: msg})
        })
      },
      proxyPostMethod () {
        let apiurl = '/wxApi/wx_new/api/WeixinApi/SendWXTemplateMsg?database=iwx_wxd944a4e7e4fbb863'
        let body = {
          openid: 'ol2oWt3awDI0KzVdUoBF97sQtIbM',
          template_id: '4naV3CCylV0CfsDDK8tyfArmA1AR_n4B0N74e6kRVt8',
          topcolor: '#000000',
          url: 'https://www.baidu.com/',
          msg: '{"first": {"value": "尊敬的客户您好，您的本期的还款信息如下：","color": "#000000"},"keyword1": {"value": "2014年7月21日","color": "#000000"},"keyword2": {"value": "第5期","color": "#000000"},"keyword3": {"value": "2348元","color": "#000000"},"remark": {"value": "祝您工作顺利。","color": "#000000"}}'
        }

        this.$api.xHttp.post(apiurl, body).then((res) => {
          this.$vux.alert.show({content: JSON.stringify(res)})
        }).catch(({code, msg}) => {
          this.$vux.alert.show({content: msg})
        })
      },
      proxyPostMethod2 () {
        this.$api.xHttp.post('/dxbApi/api/Audit/GetAOrderDetail', {'orderid': '20170126020004197483n'}).then((res) => {
          this.$vux.alert.show({content: JSON.stringify(res)})
        }).catch(({code, msg}) => {
          this.$vux.alert.show({content: msg})
        })
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .http-contain {
    background-color: #fff;
  }
</style>
