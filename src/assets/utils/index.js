import Common from './common.js'
import Date from './date.js'
import LocalStorage from './localStorage.js'
import Validate from './validate.js'
import WeiXin from './weixin.js'
import UserAgent from './useragent'
import Log from './log'
import Base64 from './base64'

export default function (Vue) {
  if (!Vue.$utils) {
    Vue.$utils = {
      Common,
      Date,
      LocalStorage,
      Validate,
      WeiXin,
      UserAgent,
      Log,
      Base64
    }
  } else {
    Vue.$utils.xHttp = {
      Common,
      Date,
      LocalStorage,
      Validate,
      WeiXin,
      UserAgent,
      Log,
      Base64
    }
  }
  
  Vue.mixin({
    created() {
      this.$utils = {
        Common,
        Date,
        LocalStorage,
        Validate,
        WeiXin,
        UserAgent,
        Log,
        Base64
      }
    }
  })
}
