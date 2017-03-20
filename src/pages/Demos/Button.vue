<template>
  <div>
    <box gap="10px">
      <x-button type="axon">实心按钮</x-button>
      <x-button plain type="axon">空心按钮</x-button>
      <x-button type="axon" disabled>实心按钮（不可点击）</x-button>
      <x-button plain type="axon" disabled>空心按钮（不可点击）</x-button>
    </box>
  </div>
</template>

<script>
  import { XButton, Box } from 'vux'
  
  export default{
    components: {
      XButton, Box
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
    methods: {}
  }
</script>

<style lang="less" rel="stylesheet/less">
  .test-contain {
    background-color: #fff;
  }
</style>
