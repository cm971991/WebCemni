import Vue from 'vue'
import config from '../../config'

function successParse(res, load) {
  if (load) {
    Vue.$vux.loading.hide()
  }
  try {
    return JSON.parse(res.data)
  } catch (e) {
    return res.data
  }
}

function errorParse(ex, load) {
  if (load) {
    Vue.$vux.loading.hide()
  }
  switch (ex.status) {
    // oauth权限
    // case 401:
    //   location.href = '../login'
    //   break
    // 请求参数错误
    // case 400:
    //   return Promise.reject(ex.data);
    // 系统错误
    default:
      return Promise.reject({msg: '传输异常，请稍后再试'})
  }
}

function send(url, method, body, options, load, loadMsg) {
  if (load) {
    Vue.$vux.loading.show(loadMsg)
  }
  // if (process.env.NODE_ENV === 'production') { // 生产环境
  //   if (url.startsWith('/dxbApi')) {    // 同域名下还原请求地址
  //     url = 'http://dxb.51pinzhi.cn/' + url.substring(8)
  //   } else if (!url.startsWith('http')) { // 线上地址加上项目名区分
  //     url = config.build.assetsPublicPath + url.substring(1)
  //   }
  // } else if (process.env.NODE_ENV === 'testing') { // 测试环境
  //   if (!url.startsWith('http')) { // 线上地址加上项目名区分
  //     url = config.build.assetsPublicPath + url.substring(1)
  //   }
  // }
  const opts = {...options}
  opts.headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...opts.headers
  }
  switch (method) {
    case 'get':
      return Vue.http.get(url, opts)
        .then(res => successParse(res, load))
        .catch(ex => errorParse(ex, load))
    case 'post':
      return Vue.http.post(url, body, opts)
        .then(res => successParse(res, load))
        .catch(ex => errorParse(ex, load))
  }
}

module.exports = {
  get (url, options, {load = true, loadMsg = '加载中...'} = {}) {
    alert(url)
    return send(url, 'get', null, options, load, loadMsg)
  },
  post (url, body, options, {load = true, loadMsg = '加载中...'} = {}) {
    return send(url, 'post', body, options, load, loadMsg)
  }
}
