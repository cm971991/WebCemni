<template>
    <div class="nearbyStores-contain">
        <div class="nearbyStores-div" v-if="isShow">
            <!--百度地图-->
            <b-map :map-height="mapInfo.height" :top="mapInfo.top" :mapLocation="mapInfo.location"
                   :mapAddress="mapInfo.address" :mapCity="mapInfo.city" ref="BMap"></b-map>
        </div>
    </div>
</template>

<script>
  import {Search, Flexbox, FlexboxItem} from 'vux'
  import BMap from '../components/BMap.vue'
  import wx from 'weixin-js-sdk'

  export default{
    components: {Search, Flexbox, FlexboxItem, BMap},
    data () {
      return {
        isShow: false,
        chooseTxt: '列表',
        mapInfo: {
          height: 650,
          top: 43,
          location: [1, 1],
          address: '',
          city: ''
        },
        selMark: {
          show: false,
          info: {}
        },
        markerListInfo: []
      }
    },
    computed: {},
    created () {
      let apiUrl = "http://121.40.231.28:8080/ApiCemni/queryAllStores"

      this.$api.xHttp.post(apiUrl, {}).then((res) => {
        if (res) {
          this.markerListInfo = res
          let vm = this
          vm.weChatInit(function () {
            vm.weChatGetLocation(function (res) {
              vm.getDetailLocation(res.longitude, res.latitude, function (data) {
                if (data) {
                  vm.mapInfo.location[0] = data.lng
                  vm.mapInfo.location[1] = data.lat
                  vm.mapInfo.address = data.formatted_address
                  vm.mapInfo.city = data.city

                  setTimeout(() => {
                    setTimeout(() => {
                      vm.resetMapMark()
                    }, 200)
                    vm.isShow = true
                  }, 100)
                }
              })
            })
          })
        }
      }).catch(({code, msg}) => {
        this.$vux.alert.show({content: msg})
      })
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
      resetMapMark: function () {
        this.$refs.BMap.resetMark(this.markerListInfo, 1)
      },
      weChatInit (success) {
        let wx_config = {
          debug: false, // 如果出错，打开调试
          appId: "wxdb3c9c5015f2e23a",
          timestamp: 0,
          nonceStr: "",
          signature: "",
          jsApiList: ['getLocation'] // 需要使用的JS接口列表
        }

        // 当前网页的URL，不包含#及其后面部分
        let request_url = window.location.href.split('#')[0] + ""
        let getSignUrl = 'http://121.40.231.28:8080/ApiCemni/getSign'

        // 获取签名数据
        this.$api.xHttp.post(getSignUrl, {url: encodeURI(request_url)}, null, {load: false}).then((res) => {
          if (res) {
            //设置config
            wx_config.timestamp = res.timestamp
            wx_config.nonceStr = res.nonceStr
            wx_config.signature = res.signature
            wx.config(wx_config)
            if (success) {
              success()
            }
          } else {
            console.log('res:', res)
          }
        }).catch(({code, msg}) => {
          this.$vux.alert.show({content: msg})
        })
      },
      weChatGetLocation(success){
        wx.ready(function () {
          wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
              if (success) {
                success(res)
              }
            },
            error: function (res) {
              console.log("location error:" + res)
            }
          })
        })
      },
      getDetailLocation(lng, lat, success){
        let locationUrl = 'http://121.40.231.28:8080/ApiCemni/getLocation'
        let body = {longitude: lng, latitude: lat}
        this.$api.xHttp.post(locationUrl, body,{}, {load: false}).then((res) => {
          if (success) {
            success(res)
          }
        }).catch(({code, msg}) => {
          this.$vux.alert.show({content: msg})
        })
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../assets/styles/nearbystores";
</style>
