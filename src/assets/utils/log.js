import Vue from 'vue'
import common from './common'

module.exports = {
  save(userphone, page, eventname, activename, channel) {
    let ip = localStorage.getItem("ipaddress");
    if (!ip) {
      Vue.$api.xHttp.get('/wxApi/wx_new/api/IPAddress/Get', null, {load: false}).then((res) => {
        ip = res.ipaddress;
        localStorage.setItem("ipaddress", ip);
        saveLog(userphone, page, eventname, activename, channel, ip)
      }).catch(({code, msg}) => {
      })
    } else {
      saveLog(userphone, page, eventname, activename, channel, ip)
    }
  }
}

function saveLog(userphone, page, eventname, activename, channel, ip) {
  let postData = {
    "userid": 0,
    "userphone": userphone || "0",
    pagename: page,
    pageurl: window.location.href,
    eventname: eventname,
    activename: activename,
    channel: common.getParam('channel') || channel,
    flag: 0,
    ip: ip || '127.0.0.1'
  }
  
  Vue.http.post('http://api.pinzhi.xin/sb/log', postData, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(function (response) {})
}
