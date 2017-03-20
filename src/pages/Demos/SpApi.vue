<template>
  <div class="spapi-contain">
    <group title="有回调接口">
      <cell title="调用支付控件" @click.native="sp_paykey" is-link></cell>
    </group>
    <group title="无回调接口">
      <cell title="关闭当前页面" @click.native="sp_close" is-link></cell>
    </group>
  </div>
</template>

<script>
  import { Group, Cell } from 'vux'
  import { mapMutations } from 'vuex'

  export default{
    components: {
      Group, Cell
    },
    data () {
      return {}
    },
    computed: {},
    created () {
      window.$eventHub.$on('payCallBack', this.payCallBack)
    },
    beforeDestroy () {
      window.$eventHub.$off('payCallBack', this.payCallBack)
    },
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
      ...mapMutations([
        'sp_paykey', 'sp_close'
      ]),
      // 支付密码回调
      payCallBack (response) {
        this.$vux.alert.show({content: JSON.stringify(response)})
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .spapi-contain {
    background-color: #fff;
  }
</style>
