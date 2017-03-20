<template>
  <div class="pulldown-pullup-contain">
    <divider>custom pullup pulldown</divider>
    <i-pulldown-pullup :refresh="refresh" :loadMore="loadMore" ref="iPulldownPullupDemo">
      <div class="box2">
        <p v-for="i in demo">占位 {{i}}</p>
      </div>
    </i-pulldown-pullup>
  </div>
</template>

<script>
  import { Divider } from 'vux'
  import iPulldownPullup from '../../components/iPulldownPullup.vue'

  export default {
    components: {
      iPulldownPullup, Divider
    },
    methods: {
      refresh () {
        setTimeout(() => {
          this.demo = 20
          this.$refs.iPulldownPullupDemo.refreshDone()
        }, 2000)
      },
      loadMore () {
        setTimeout(() => {
          this.demo += 10
          this.$refs.iPulldownPullupDemo.loadMoreDone(this.demo === 40)
        }, 2000)
      }
    },
    data () {
      return {
        demo: 20
      }
    },
    computed: {}
  }
</script>

<style lang="less" rel="stylesheet/less">

</style>
