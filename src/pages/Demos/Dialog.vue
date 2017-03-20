<template>
  <div>
    <group title="弹窗">
      <cell title="Toast" @click.native="showToast" is-link></cell>
      <cell title="Alert" @click.native="showAlert" is-link></cell>
      <cell title="Dialog" @click.native="showDialog=true" is-link></cell>
      <cell title="ScrollDialog" @click.native="showScrollDialog=true" is-link></cell>
    </group>

    <!--region Dialog-->
    <x-dialog v-model="showDialog" :scroll="false" :hide-on-blur="true">
      <div style="margin: 20px auto;color: #999">
        <div style="font-size: 12px">带上身份证凭码去联通营业厅即可购机哦！</div>
        <div class="vux-center" style="margin-top: 15px">
          <img src="http://pic1.win4000.com/wallpaper/d/525e00294ac25.jpg" style="width: 50%">
        </div>
      </div>
      <span class="vux-close" @click="showDialog=false"></span>
    </x-dialog>
    <!--endregion-->

    <!--region ScrollDialog-->
    <i-scroll-dialog v-model="showScrollDialog">
      <div>
        <p v-for="i in 100">{{i}}</p>
      </div>
    </i-scroll-dialog>
    <!--endregion-->
  </div>
</template>

<script>
  import { Group, Cell, XDialog } from 'vux'
  import iScrollDialog from '../../components/iScrollDialog.vue'

  export default{
    components: {
      Group, Cell, XDialog, iScrollDialog
    },
    data () {
      return {
        showDialog: false,
        showScrollDialog: false
      }
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
      showToast () {
        this.$vux.toast.show({text: '请输入正确的姓名'})
      },
      showAlert () {
        this.$vux.alert.show({content: 'Do you agree?'})
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
</style>
