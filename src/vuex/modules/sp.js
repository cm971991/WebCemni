// region SpApi Init
function connectWebViewJavascriptBridge (callback) {
  if (window.WebViewJavascriptBridge) {
    callback(window.WebViewJavascriptBridge)
  } else {
    document.addEventListener('WebViewJavascriptBridgeReady', function () {
      callback(window.WebViewJavascriptBridge)
    }, false)
  }
}

connectWebViewJavascriptBridge(function (bridge) {
  bridge.init(function (message, responseCallback) {})
  // 人脸识别回调
  bridge.registerHandler('WebViewRefresh', function (data, responseCallback) {
    window.$eventHub.$emit('validateUserInfo')
  })
  // 上传身份证正反面回调
  bridge.registerHandler('BridgeUploadSuccess', function (data, responseCallback) {
    window.$eventHub.$emit('uploadiIdCard', data)
  })
})
// endregion

import Vue from 'vue'
// 该模块的初始状态
const state = {}

// 相关的 mutations
const mutations = {
  // 识别银行卡
  sp_get_cardnum (state) {
    if (process.env.NODE_ENV !== 'development') { // 生产环境
      if (window.ifNewVersion()) {
        window.WebViewJavascriptBridge.callHandler('pz_get_cardnum', '', function (response) {
          window.$eventHub.$emit('bankcardCallback', response)
        })
      } else {
        if (Vue.$device['isIphone']) {
          window.WebViewJavascriptBridge.callHandler('moral_bankcard', '', function (response) {
            window.$eventHub.$emit('bankcardCallback', response)
          })
        } else {
          window.MoralAPI.moral_view('CardIOActivity')
        }
      }
    } else { // 测试环境
      window.$eventHub.$emit('bankcardCallback', '6225750007493535')
    }
  },
  // 获取地理位置
  sp_get_location (state) {
    if (process.env.NODE_ENV !== 'development') { // 生产环境
      if (window.ifNewVersion()) {
        window.WebViewJavascriptBridge.callHandler('pz_get_location', '', function (response) {
          window.$eventHub.$emit('getLocationCallback', response)
        })
      } else {
        if (Vue.$device['isIphone']) {
          window.WebViewJavascriptBridge.callHandler('get_user_location', '', function (response) {
            window.$eventHub.$emit('getLocationCallback', response)
          })
        } else {
          window.MoralAPI.moral_location()
        }
      }
    } else { // 测试环境
      window.$eventHub.$emit('getLocationCallback', {
        'State': 'Success', 'longitude': 118.7569226148501, 'latitude': 31.97793035793655
      })
    }
  },
  // 读取通讯录
  sp_choose_contact (state) {
    if (process.env.NODE_ENV !== 'development') { // 生产环境
      if (window.ifNewVersion()) {
        window.WebViewJavascriptBridge.callHandler('pz_choose_contact', '', function (response) {
          window.$eventHub.$emit('contactCallBack', response)
        })
      } else {
        if (Vue.$device['isIphone']) {
          window.WebViewJavascriptBridge.callHandler('open_user_contacts', '', function (response) {
            window.$eventHub.$emit('contactCallBack', response)
          })
        } else {
          window.MoralAPI.readPhoneNum()
        }
      }
    } else { // 测试环境
      window.$eventHub.$emit('contactCallBack', {name: '哈哈', phone: '18652818961'})
    }
  },
  // 识别身份证正反面
  sp_idcard_recognition (state, type) {
    if (process.env.NODE_ENV !== 'development') { // 生产环境
      if (window.ifNewVersion()) {
        window.WebViewJavascriptBridge.callHandler('pz_idcard_recognition', type, function (response) {
          if (response.State.toLowerCase() === 'success') {
            window.$eventHub.$emit('uploadiIdCard', response.Msg)
          }
        })
      } else {
        if (Vue.$device['isIphone']) {
          window.WebViewJavascriptBridge.callHandler('idcard_recognition', type, function (response) {
            window.$eventHub.$emit('contactCallBack', response)
          })
        } else {
          window.MoralAPI.identifyID(type)
        }
      }
    } else { // 测试环境
      let response
      if (type === 0) {
        response = {
          rk1: 'http://www.sznews.com/ent/images/attachement/jpg/site3/20141011/4437e629783815a2bce253.jpg',
          address: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
          name: '哈哈',
          id_card_number: '321102198609061015'
        }
      } else {
        response = {
          rk2: 'http://epaper.cnsq.com.cn/jjwb/res/1/10/2011-01/07/06/res01_attpic_brief.jpg'
        }
      }
      window.$eventHub.$emit('uploadiIdCard', response)
    }
  },
  // 人脸识别
  sp_view (state) {
    if (process.env.NODE_ENV !== 'development') { // 生产环境
      if (window.ifNewVersion()) {
        window.WebViewJavascriptBridge.callHandler('pz_view', {
          'controller': 'FacePlusController',
          'activity': 'LivenessActivity'
        }, function (response) {
          if (response.State.toLowerCase() === 'success') {
            window.$eventHub.$emit('validateUserInfo')
          }
        })
      } else {
        if (Vue.$device['isIphone']) {
          window.WebViewJavascriptBridge.callHandler('moral_view', 'FacePlusController', function (response) {
          })
        } else {
          window.MoralAPI.moral_view('LivenessActivity')
        }
      }
    } else { // 测试环境
      window.$eventHub.$emit('validateUserInfo')
    }
  },
  // 调用支付密码
  sp_paykey (state) {
    if (process.env.NODE_ENV !== 'development') { // 生产环境
      if (window.ifNewVersion()) {
        window.WebViewJavascriptBridge.callHandler('pz_paykey', '', function (response) {
          window.$eventHub.$emit('payCallBack', response)
        })
      } else {
        if (Vue.$device['isIphone']) {
          window.WebViewJavascriptBridge.callHandler('moral_paykey', '', function (response) {
            window.$eventHub.$emit('payCallBack', response)
          })
        } else {
          window.MoralAPI.moral_paykey()
        }
      }
    } else { // 测试环境
      window.$eventHub.$emit('payCallBack', '测试')
    }
  },
  // 设置支付密码
  sp_view_trpassword (state) {
    if (process.env.NODE_ENV !== 'development') { // 生产环境
      if (window.ifNewVersion()) {
        let jsonData = {
          'controller': 'BusinessPwdController2',
          'activity': 'SettingTrPasswordActivity'
        }
        window.WebViewJavascriptBridge.callHandler('pz_view', jsonData, function (response) {
          window.$eventHub.$emit('payCallBack', response)
        })
      } else {
        if (Vue.$device['isIphone']) {
          window.WebViewJavascriptBridge.callHandler('moral_view', 'BusinessPwdController2', function (response) {
            window.$eventHub.$emit('payCallBack', response)
          })
        } else {
          window.MoralAPI.moral_view('SettingTrPasswordActivity')
        }
      }
    }
  },
  // 刷新并关闭
  sp_refresh_close (state) {
    if (process.env.NODE_ENV !== 'development') { // 生产环境
      Vue.$vux.loading.show('加载中...')
      if (window.ifNewVersion()) {
        // 刷新主页
        window.WebViewJavascriptBridge.callHandler('pz_refresh_homepage', '', function (response) {
          // 关闭当前页面
          let jsonData = {
            'controller': 'UIViewController',
            'activity': ''
          }
          window.WebViewJavascriptBridge.callHandler('pz_popto', jsonData, function (response) {})
        })
      } else {
        if (Vue.$device['isIphone']) {
          window.WebViewJavascriptBridge.callHandler('refresh_home_page', '', function (response) {
            window.WebViewJavascriptBridge.callHandler('moral_popto', 'UIViewController', function (response) {})
          })
        } else {
          window.MoralAPI.Refresh()
          setTimeout(() => {
            window.MoralAPI.moral_popto('y')
          }, 2000)
        }
      }
    }
  },
  // 关闭
  sp_close (state) {
    if (process.env.NODE_ENV !== 'development') { // 生产环境
      if (window.ifNewVersion()) {
        let jsonData = {
          'controller': 'UIViewController',
          'activity': ''
        }
        window.WebViewJavascriptBridge.callHandler('pz_popto', jsonData, function (response) {})
      } else {
        if (Vue.$device['isIphone']) {
          window.WebViewJavascriptBridge.callHandler('moral_popto', 'UIViewController', function (response) {})
        } else {
          window.MoralAPI.moral_popto('y')
        }
      }
    }
  }
}

// region 安卓老版本回调

// 获取地理位置回调
window.gps_callback = function (response) {
  window.$eventHub.$emit('getLocationCallback', response)
}
// 银行卡回调
window.moral_bankcard = function (response) {
  window.$eventHub.$emit('bankcardCallback', response)
}
// 读取通讯录回调
window.contact_callback = function (response) {
  window.$eventHub.$emit('contactCallBack', response)
}
// 上传身份证正反面回调
window.uploadIdCard = function (response) {
  window.$eventHub.$emit('uploadiIdCard', response)
}
// 人脸识别回调
window.WebViewRefresh = function () {
  window.$eventHub.$emit('validateUserInfo')
}
// 调用支付密码回调
window.paykey_callback = function (response) {
  window.$eventHub.$emit('payCallBack', response)
}
// 设置支付密码回调
window.setkey_callback = function (response) {
  window.$eventHub.$emit('payCallBack', response)
}

// endregion

export default {
  state,
  mutations
}
