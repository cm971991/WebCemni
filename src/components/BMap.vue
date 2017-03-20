<template>
  <div>
    <flexbox :gutter="0" wrap="wrap" class="search-contain">
      <flexbox-item>
        <!--搜索框-->
        <search :auto-fixed="false" placeholder="请输入关键字" cancel-text="" @on-submit="searchClick"
                v-model="searchName"></search>
      </flexbox-item>
    </flexbox>
    <div id="allmap" :style="mapStyle" style="position: absolute;" ref="mapHeight"></div>
    <!--底部窗口-->
    <div class="map-tips" v-show="selMark.show" v-if="markerList.length>0">
      <div v-for="item in markerList" v-show="item.storeNo==currentStoreNo">
        <div class="tips-info">
          <div class="tips-name">
            <span>{{item.name}}</span>
          </div>
          <div class="tips-address">
            <span>{{item.addr}}</span>
          </div>
        </div>
        <div class="tips-navigation">
          <a class="navigation-btn" target="_blank" v-model="navigationName" @click="navigation">
            <span class="plan">路线</span>
          </a>
          <i class="navigation-sep"></i>
          <a class="navigation-phone " v-bind:href="'tel:'+(item.tel||4008881016)">
            <span class="phone">电话</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
	import {Search, Flexbox, FlexboxItem, XButton} from 'vux'
	import selfImg from '../assets/images/self.png'
	import othersImg from  '../assets/images/others.png'

	export default{
		components: {Search, Flexbox, FlexboxItem, XButton},
		data: function () {
			return {
				currentStoreNo: 0,
				selMark: {
					show: false,
					info: {}
				},
				searchName: '',
				navigationName: '',
				resultList: [],
				markerList: [],
				mapStyle: {
					width: '100%',
					height: this.mapHeight + 'px',
					top: this.top + 'px',
				},
				areaInfo: {
					storeNo: '10001',
					lng: 0,
					lat: 0,
					name: '千年珠宝(金鹰国际购物中心新街口店)',
					addr: '汉中路89号 '
				},
				locationLoad: false,
				location: this.mapLocation
			}
		},
		props: {
			top: {
				type: Number,
				default: 0
			},
			// 地图在该视图上的高度
			mapHeight: {
				type: Number,
				default: 500
			},
			level: {
				type: Number,
				default: 13
			},
			mapLocation: [Number, Number],
			mapAddress: {
				type: String,
				default: ''
			},
			mapCity: {
				type: String,
				default: ''
			}
		},
		created () {},
		mounted () {
			this.$refs.mapHeight.style.height = (this.$utils.Common.getWidthHeight().height - 40) + 'px'

			window.map = new BMap.Map("allmap", {enableDblclickZoom: false, enableMapClick: false})
			map.centerAndZoom(new BMap.Point(this.location[0], this.location[1]), 14)
//      map.addControl(new BMap.ZoomControl())

			window.mk = new BMap.Marker(
				new BMap.Point(this.location[0], this.location[1]),
				{
					icon: new BMap.Icon(selfImg, new BMap.Size(20, 30))
				})
			map.addOverlay(mk)
		},
		methods: {
			resetMark: function (list, type) {
				let vm = this
				window.map.clearOverlays()
				map.addOverlay(window.mk)
				if (list) {
					if (type === 1) {
						this.resultList = list
					}
					this.markerList = list

					list.map((item) => {
						let currentItem = item
						let point = new BMap.Point(item.lng, item.lat)
						let marker = new BMap.Marker(
							point, {
								icon: new BMap.Icon(othersImg, new BMap.Size(20, 30))
							})
						window.map.addOverlay(marker)
						marker.addEventListener("click", () => {
							vm.selMark.show = true
							vm.currentStoreNo = currentItem.storeNo
							this.selMark.info = currentItem
							this.$refs.mapHeight.style.height = (this.$utils.Common.getWidthHeight().height - 154) + 'px'
							map.centerAndZoom(new BMap.Point(currentItem.lng, currentItem.lat), 14)
						})
					})
				}
			},
			navigation(){
				let start = {
					name: this.mapAddress,
				}
				let end = {
					name: this.selMark.info.addr
				}
				let opts = {
					mode: BMAP_MODE_DRIVING,
					origin_region: this.mapCity,
					destination_region: this.selMark.info.city
				}
				let local = new BMap.RouteSearch()
				local.routeCall(start, end, opts)
			},
			searchClick () {
				let result = this.resultList.filter(item => (item.name.includes(this.searchName)))
				this.resetMark(result, 2)
			}
		}
	}
</script>