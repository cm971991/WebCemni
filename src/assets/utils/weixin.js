// 微信jssdk初始化
import wx from 'weixin-js-sdk';
let config = require('../../../config/index')
import Vue from 'vue'

module.exports = {
	init (before, success) {
		if (before) {
			before()
		}
		let wx_config = {
			debug: true, // 如果出错，打开调试
			appId: "wxdb3c9c5015f2e23a",
			timestamp: 0,
			nonceStr: "",
			signature: "",
			jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseImage', 'uploadImage', 'getLocation'] // 需要使用的JS接口列表
		};
		
		// 服务器缓存key，一般按照自己的项目起个特殊的名字，防止重复
		let cacheName = config.build.assetsPublicPath.replace(/\//g, '') + "_wx_config";
		// 当前网页的URL，不包含#及其后面部分
		let request_url_array = window.location.href.split('#');
		let request_url = request_url_array[0] + "";
		console.log("request_url:", request_url)
		
		// 获取appid对应公众号的accesstoken
		let apiUrl = 'http://121.40.231.28:8080/ApiCemni/getAccessToken'
		let getSignUrl = 'http://121.40.231.28:8080/ApiCemni/getSign'
		
		// 获取签名数据
		Vue.$api.xHttp.post(getSignUrl, {
			url: encodeURI(request_url)
		}, null, {load: false}).then((res) => {
			if (res) {
				//设置config
				wx_config.timestamp = res.timestamp;
				wx_config.nonceStr = res.nonceStr;
				wx_config.signature = res.signature;
				wx.config(wx_config);
				console.log("ticket:", res.ticket);
				if (success) {
					success()
				}
			} else {
				console.log('res:', res)
			}
		}).catch(({code, msg}) => {
			Vue.$vux.alert.show({content: msg})
		})
	},
	share(params) {
		wx.onMenuShareTimeline(params);
		wx.onMenuShareAppMessage(params)
	},
	chooseImage(success, count = 1) {
		wx.chooseImage({
			count, // 默认9
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success(res) {
				success(res.localIds)
			}
		})
	},
	uploadImage(localId, folder, success, showLoad = true) {
		if (showLoad) {
			Vue.$vux.loading.show('图片上传中')
		}
		wx.uploadImage({
			localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
			isShowProgressTips: 0, // 默认为1，显示进度提示
			success(res) {
				// 上传图片到服务器
				// todo 因为是同域名下，不需要设定代理，其他域名需处理跨域问题
				Vue.$api.xHttp.post('http://dxb.51pinzhi.cn/imoral_leaper/api/Common/UploadImageWx', {
					mediaid: res.serverId,
					database: "iwx_wxd944a4e7e4fbb863",
					folder: folder
				}, null, {load: false}).then((res) => {
					if (showLoad) {
						Vue.$vux.loading.hide()
					}
					success(res.file_path);
				}).catch(({code, msg}) => {
					if (showLoad) {
						Vue.$vux.loading.hide()
					}
					Vue.$vux.alert.show({content: msg})
				})
			}
		})
	},
	getLocation(success){
		console.log("location in")
		wx.getLocation({
			type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
			success: function (res) {
				success(res);
			}
		});
	},
	checkJsApi(){
		wx.checkJsApi({
			jsApiList: ['getLocation'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
			success: function(res) {
				console.log("checkJsApi:",res)
				// 以键值对的形式返回，可用的api值true，不可用为false
				// 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
			}
		});
	}
}