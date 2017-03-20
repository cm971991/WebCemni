<template>
    <div class="registerSuccess weui-msg">
        <div class="weui-msg__icon-area">
            <i class="weui-icon_msg weui-icon-cemni"></i>
        </div>
        <div class="weui-msg__text-area">
            <h2 class="weui-msg__title">
                <div style="padding-bottom: 10px;">恭喜您成为千年珠宝会员，</div>
                <div>登录后尊享更多特权</div>
            </h2>
        </div>
        <div class="weui-msg__opr-area">
            <p class="weui-btn-area"><a v-bind:href="skipUrl" class="weui-btn weui-btn_cemni">马上去体验</a></p>
        </div>
    </div>
</template>

<script>
  import {Msg} from 'vux'

  export default {
    components: {
      Msg,
      skipUrl: ''
    },
    created(){
      let openId = localStorage.getItem('openid');
      if (openId) {
        this.skipUrl = 'http://club.cemni.com/mobile.do?from=wechat&openid=' + openId
      }
    },
    methods: {
      changeIcon () {}
    }
  }
</script>
<style>
    .weui-icon-cemni {
        background: url("../assets/images/success.png");
        width: 93px;
        height: 93px;
        background-size: 100%;
    }

    .registerSuccess {
        margin-top: 10%;
    }
</style>
