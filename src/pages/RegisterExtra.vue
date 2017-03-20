<template>
  <div>
    <div class="registerExtra-content">
      <group class="cemniGroup" label-width="5em" label-margin-right="1em" label-align="left" title="基础信息">
        <x-input title="姓名" class="text-right" placeholder="请输入姓名" is-type="china-name" v-model="name" :min="2" :max="6"></x-input>
        <popup-picker title="性别" :data="sexData" v-model="sexValue" value-text-align="right" :columns="1" :show-name="true"></popup-picker>
        <datetime class="cemniDate" title="出生日期" :min-year="1900" v-model="birthday" on-change="change" confirm-text="完成" cancel-text="取消"></datetime>
        <x-input title="电子邮箱" class="text-right" is-type="email" v-model="email" name="email" placeholder="请输入邮箱地址" :max="50"></x-input>
        <x-address title="联系地址" v-model="addressValue" :list="addressData" raw-value value-text-align="right"></x-address>
        <x-input title="详细地址" class="text-right" placeholder="详细地址" v-model="addressStreet" :max="50"></x-input>
      </group>
      <group class="cemniGroup" label-width="5em" label-margin-right="1em" label-align="left" title="补充信息">
        <popup-picker title="职业" :data="occupationData" v-model="occupationValue" value-text-align="right" :columns="1" :show-name="true"></popup-picker>
        <popup-picker title="购买目的" :data="purposeData" v-model="purposeValue" value-text-align="right" :columns="1" :show-name="true"></popup-picker>
        <datetime class="cemniDate" title="结婚纪念日" :min-year="1900" format="MM-DD" v-model="weddingDay" on-change="change" confirm-text="完成" cancel-text="取消" ></datetime>
        <popup-picker title="喜欢的理由" :data="reasonsForLoveData" v-model="reasonsForLoveValue" value-text-align="right" :columns="1" :show-name="true"></popup-picker>
        <popup-picker title="获取渠道" :data="receiptChannelData" v-model="receiptChannelValue" value-text-align="right" :columns="1" :show-name="true"></popup-picker>
      </group>
    </div>
    <div class="btn-div">
      <x-button type="cemni" plain @click.native="completeRegister" :disabled="disabled">完成注册</x-button>
    </div>
    <x-dialog v-model="showDialog" class="dialog-demo" :scroll="false" :hideOnBlur="true">
      <div class="img-box">
        <img src="../assets/images/reminder.png" style="max-width:100%;height: 100%">
      </div>
      <span class="vux-close" @click="showDialog=false"></span>
    </x-dialog>
  </div>
</template>
<script>
  import {
    XInput, Group, XButton, XDialog, Cell, XAddress, ChinaAddressData, Value2nameFilter as value2name, PopupPicker, Datetime
  } from 'vux'

  export default{
    components: {
      XInput,
      XButton,
      Group,
      Cell,
      XAddress,
      PopupPicker,
      Datetime,
      XDialog
    },
    data () {
      return {
        name: '',
        email: '',
        birthday: '',
        weddingDay: '',
        showDialog: false,
        addressValue: [],
        addressData: ChinaAddressData,
        addressStreet: '',
        sexData: [{name:'男',value:'1'}, {name:'女',value:'2'}],
        educationData: [{name:'硕士及以上',value:'1'},{name:'本科',value:'2'},{name:'大专',value:'3'},{name:'中专/高中',value:'4'},{name:'初中及以下',value:'5'}],
        occupationData: [{name:'公务员',value:'1'}, {name:'专业人士(含医生/律师/教师等)',value:'2'},{name:'公司职员',value:'3'}, {name:'离退休',value:'4'},
                        {name:'学生',value:'5'}, {name:'私营业主',value:'6'},{name:'企业中高层管理者',value:'7'}, {name:'个体商户',value:'8'},
                        {name:'农业劳动者',value:'9'}, {name:'自由职业',value:'10'}],
        purposeData: [{name:'定情纪念',value:'1'}, {name:'订婚',value:'2'}, {name:'结婚',value:'3'},{name:'宝宝诞生奖励妈妈',value:'4'},
                      {name:'特殊纪念日',value:'5'}, {name:'收藏',value:'6'},{name:'礼物',value:'7'},{name:'其他',value:'8'}],
        reasonsForLoveData: [{name:'品牌知名度高',value:'1'}, {name:'产品设计款式时尚新颖',value:'2'}, {name:'有美好的寓意和情感内涵',value:'3'},
                            {name:'服务好',value:'4'},{name:'产品种类齐全',value:'5'}, {name:'购物环境优雅',value:'6'},
                            {name:'促销活动有吸引力',value:'7'}, {name:'价格合理',value:'8'},{name:'他人推荐',value:'9'},{name:'其他',value:'10'}],
        receiptChannelData: [{name:'报纸',value:'1'}, {name:'杂志',value:'2'}, {name:'微信',value:'3'}, {name:'微博',value:'4'},
                            {name:'网络视频',value:'5'}, {name:'电影映前',value:'6'},{name:'公交车身',value:'7'}, {name:'门店',value:'8'},
                            {name:'户外广告',value:'9'}, {name:'朋友推荐',value:'10'},{name:'广播',value:'11'}, {name:'其他',value:'12'}],
        sexValue: [],
        occupationValue: [],
        purposeValue: [],
        reasonsForLoveValue: [],
        receiptChannelValue: [],
      }
    },
    computed: {
      errMsg () {
        if (!this.$utils.Validate.chkFormat(this.name, 'chinaName')) {
          return '请输入正确的姓名'
        }
        return null
      },
      disabled () {
        if (!this.name || this.name.length < 2) {
          return true
        }
        if (this.addressValue.length !== 3) {
          return true
        }
        if (this.sexValue.length !== 1) {
          return true
        }
        if (!this.birthday || this.birthday.length < 1) {
          return true
        }
        if (!this.email || this.email.length < 1) {
          return true
        }
        return false
      },
      packParam () {
        let domain = {};
        domain["mobile"] = localStorage.getItem('mobile');
        domain["openid"] = localStorage.getItem('openid');
        domain["name"] = this.name;
        domain["gender"] = this.sexValue?this.sexValue[0]:1;
        domain["birthday"] = this.birthday;
        domain["email"] = this.email;
        domain["wedding"] = this.weddingDay;
        domain["addressId"] = this.addressValue?this.addressValue[2]:'';
        domain["address"] = this.addressStreet;
        domain["purposetype"] = this.purposeValue?this.purposeValue[0]:1;
        domain["reasontype"] = this.reasonsForLoveValue?this.reasonsForLoveValue[0]:1;
        domain["profession"] = this.occupationValue?this.occupationValue[0]:1;
        domain["channeltype"] = this.receiptChannelValue?this.receiptChannelValue[0]:1;
        return domain;
      }
    },
    created () {},
    beforeDestroy () {},
    mounted () {
        this.showDialog = true
    },
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
      completeRegister () {
        if (this.errMsg) {
          this.$vux.toast.show(this.errMsg)
          return
        }
        let apiurl = "http://121.40.231.28:8080/ApiCemni/registerUser";
        this.$api.xHttp.post(apiurl, this.packParam).then((res) => {
          if (res && res.flag) {
            this.markerListInfo = res;
            localStorage.removeItem("mobile")
            localStorage.removeItem("openid");
            localStorage.removeItem("code");
            this.$router.push({path: '/registerSuccess'})
          }else{
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
  @import "../assets/styles/global/close";
  .registerExtra-content {
    background: #fff;
  }
  .registerExtra-content .text-right input{
    text-align: right;
  }
  .cemniDate p{
    margin: 0;
  }
  .cemniGroup .weui-cells__title{
    margin: 0;
    padding-top: 8px;
    padding-bottom: 8px;
    background: #eee;
  }
  .cemniGroup .weui-cells{
    font-size: 15px;
  }
  .dialog-demo {
    .weui-dialog{
      border-radius: 8px;
      background: transparent;
      top: 40%;
    }
    .img-box {
      overflow: hidden;
    }
    .vux-close {
      margin-top: 8px;
    }
  }
</style>
