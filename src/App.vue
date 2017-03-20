<template>
  <div id="app" style="height:100%;overflow: hidden;">
    <view-box ref="AppViewBox">
      <div class="page-wrap">
        <!--顶部留白-->
        <div class="clearfix span" v-show="showTopSpace"></div>
        <!--default slot-->
        <transition :name="transitionName">
          <router-view class="router-view"></router-view>
        </transition>
      </div>
      <!--底部提示-->
      <footer class="site-footer" v-show="showFoot">
        <p class="weui-footer__text">Copyright © 2017 版权归千年珠宝所有</p>
      </footer>
    </view-box>
  </div>
</template>

<script>
  import { ViewBox } from 'vux'
  import { mapState } from 'vuex'

  export default {
    components: {
      ViewBox
    },
    created () {
    },
    beforeDestroy () {},
    data () {
      return {
        routerTransition: {
          forward: 'slideRL',
          back: 'slideLR'
        },
        transition: 'go'
      }
    },
    computed: {
      ...mapState({
        isLoading: ({global}) => global.isLoading,
        direction: ({global}) => global.direction,
        showTopSpace: ({global}) => global.showTopSpace,
        showFoot: ({global}) => global.showFoot
      }),
      transitionName () {
        return 'vux-pop-' + (this.direction === 'forward' ? 'in' : 'out')
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "assets/styles/global/close";
  @import "assets/styles/App/common";
  @import "assets/styles/App/custom";
</style>
<style>

</style>
