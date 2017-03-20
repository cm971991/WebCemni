<template>
    <div class="register">
        <div class="register-content">
            <h2 class="register-title">会员注册</h2>
            <!--  <x-input class="cemni-input" title="" v-model="telephone" placeholder="请输入手机号码" keyboard="number" :max="11"></x-input>-->
            <p><input class="cemni-input telephone" v-model="telephone" placeholder="请输入手机号码" maxlength="11"
                      type="number"
                      onkeyup="this.value=this.value.replace(/\D/g,'')" autocomplete="off"
                      onafterpaste="this.value=this.value.replace(/\D/g,'')"/></p>
            <!-- <p><input type="password" class="cemni-input password" v-model="password" placeholder="密码" maxlength="16" minlength="6"/></p>-->
            <div>
                <input class="cemni-input vcode" v-model="verificationCode" placeholder="验证码" maxlength="6"
                       type="number"/>
                <input type="button" class="sendVCode" @click="sendVCode" :class="vcDisabled?'':'vAble'"
                       v-model="buttonText" :disabled="vcDisabled"/>
            </div>
        </div>
        <div class="step-group">
            <x-button type="cemni" plain @click.native="goNextStep" :disabled="disabled">下一步</x-button>
        </div>
    </div>
</template>
<script>
  import {
    XInput, Group, XButton
  } from 'vux'
  export default{
    components: {
      XInput,
      XButton,
      Group
    },
    data () {
      return {
        telephone: '',
        verificationCode: '',
        buttonText: '发送验证码'
      }
    },
    computed: {
      errMsg () {
        if (!this.$utils.Validate.chkFormat(this.telephone, 'phone')) {
          return '请输入正确的号码'
        }
        if (!this.$utils.Validate.chkFormat(this.verificationCode, 'code')) {
          return '验证码格式错误'
        }
        return null
      },
      disabled () {
        if (!this.telephone || this.telephone.length != 11) {
          return true
        }
        if (!this.verificationCode || this.verificationCode.length != 6) {
          return true
        }
        return false
      },
      vcDisabled () {
        if (this.buttonText != '发送验证码' || !this.$utils.Validate.chkFormat(this.telephone, 'phone')) {
          return true
        }
        return false
      }
    },
    created () {

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
    methods: {
      sendVCode: function () {
        let apiurl = "http://121.40.231.28:8080/ApiCemni/sendVerificationCode";
        this.$api.xHttp.post(apiurl, {telephone: this.telephone}).then((res) => {
          if (res && res.flag) {
            this.markerListInfo = res;
          } else {
            this.$vux.alert.show({content: res.msg})
          }
        }).catch(({code, msg}) => {
          this.$vux.alert.show({content: msg})
        })

        //定时器：60秒后可重新获取验证码
        let time = 60;
        this.vcodeTimeOut = setInterval(() => {
          if (time == 0) {
            clearInterval(this.vcodeTimeOut);
            this.$data.buttonText = '发送验证码';
            return;
          }
          this.$data.buttonText = (time--) + '秒后重启';
        }, 1000)
      },
      goNextStep () {
        if (this.errMsg) {
          this.$vux.toast.show(this.errMsg)
          return
        }

        let apiurl = "http://121.40.231.28:8080/ApiCemni/checkVerificationCode";
        this.$api.xHttp.post(apiurl, {
          telephone: this.telephone,
          verificationCode: this.verificationCode
        }).then((res) => {
          if (res && res.flag) {
            this.markerListInfo = res;
            localStorage.setItem('mobile', this.telephone)
            this.$router.push({path: '/registerExtra'})
          } else {
            this.$vux.alert.show({content: res.msg})
          }
        }).catch(({code, msg}) => {
          this.$vux.alert.show({content: msg})
        })
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
    .btn-div {
        padding: 35px 15px 0;
    }

    .register {
        background: url("../assets/images/background.jpg") no-repeat;
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-size: 100% 100%;
    }

    .register-content {
        margin: 0px 30px;
        position: relative;
        padding: 0 1.5rem 2rem 1.5rem;
        background: #fff;
        border: 1px solid #DCCCD8;
        border-radius: 0.5rem;
        top: 10%;
    }

    .register-title {
        text-align: center;
        margin: 15px 0;
    }

    input.telephone {
        background: url("../assets/images/user.png") no-repeat left;
        background-size: auto 25px;
        text-indent: 35px;
    }

    /*  input.password {
        background: url("../assets/images/lock.png") no-repeat left;
        background-size: auto 25px;
        text-indent: 35px;
      }*/
    .cemni-input {
        /* margin: 6px 0;*/
        padding: 12px 0;
        font-size: 0.9rem;
        border: 1px solid #DCCDDE;
        border-radius: 3px;
        width: 100%;
        text-indent: 1.5rem;
    }

    .vcode {
        text-indent: 5px;
    }

    .cemni-input:focus {
        border: 1px solid #129FEA;
        outline: none;
    }

    .cemni-input.vcode {
        width: 55%;
    }

    .sendVCode {
        width: 40%;
        height: 42px;
        font-size: 14px;
        float: right;
        /* margin: 6px 0;*/
        border: 1px solid #D7C9D9;
    }

    .sendVCode.vAble {
        color: #6C3B76;
        background: #E8E1E8;
    }

    .step-group {
        top: 10%;
        position: relative;
        margin-top: 20px;
    }
</style>
