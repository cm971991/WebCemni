<template>
  <div class="input-contain">
    <group label-width="4em" label-margin-right="1em" label-align="right">
      <x-input title="姓名" placeholder="请输入姓名" is-type="china-name" v-model="name" :min="2" :max="6"></x-input>
      <x-input title="手机号码" v-model="mobile" placeholder="请输入手机号码" keyboard="number" :max="11"></x-input>
      <i-id-card-input v-model="idCardNumber"></i-id-card-input>
      <x-address title="常住地区" v-model="addressValue" :list="addressData" placeholder="请选择地址" raw-value
                 value-text-align="left"></x-address>
      <popup-picker title="最高学历" :data="educationData" v-model="highestEducation"
                    value-text-align="left"></popup-picker>
    </group>
    <div class="btn-div">
      <x-button type="axon" plain @click.native="next" :disabled="disabled">下一步</x-button>
    </div>
  </div>
</template>

<script>
  import {
    XInput, Group, XButton, Cell, XAddress, ChinaAddressData, Value2nameFilter as value2name, PopupPicker
  } from 'vux'
  import iIdCardInput from '../../components/iIdCardInput.vue'

  export default{
    components: {
      XInput,
      XButton,
      Group,
      Cell,
      iIdCardInput,
      XAddress,
      PopupPicker
    },
    data () {
      return {
        name: null,
        mobile: null,
        idCardNumber: '',
        showInput: false,
        addressValue: [],
        addressData: ChinaAddressData,
        educationData: [['硕士及以上', '本科', '大专', '中专/高中', '初中及以下']],
        highestEducation: []
      }
    },
    computed: {
      errMsg () {
        if (!this.$utils.Validate.chkFormat(this.name, 'chinaName')) {
          return '请输入正确的姓名'
        }
        if (!this.$utils.Validate.chkFormat(this.mobile, 'phone')) {
          return '请输入正确的手机号'
        }
        if (!this.$utils.Validate.chkFormat(this.idCardNumber, 'idcard')) {
          return '请输入正确的身份证号'
        }
        return null
      },
      disabled () {
        if (!this.name || this.name.length < 2) {
          return true
        } else if (!this.mobile || this.mobile.length !== 11) {
          return true
        } else if (!this.idCardNumber || this.idCardNumber.length !== 18) {
          return true
        } else if (this.addressValue.length !== 3) {
          return true
        } else if (this.highestEducation.length !== 1) {
          return true
        }
        return false
      },
      addressString () {
        return this.addressValue && value2name(this.addressValue, ChinaAddressData)
      }
    },
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
      next () {
        if (this.errMsg) {
          this.$vux.toast.show(this.errMsg)
          return
        }

        this.$vux.toast.show('OK')
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .input-contain {
    background-color: #fff;
    .btn-div {
      padding: 35px 15px 0;
      background-color: #eee;
    }
  }
</style>
