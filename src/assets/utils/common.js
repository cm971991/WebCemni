module.exports = {
  getWidthHeight() {
    let w = window, d = document, e = d.documentElement, g = d.getElementsByTagName('body')[0], x = w.innerWidth || e.clientWidth || g.clientWidth, y = w.innerHeight || e.clientHeight || g.clientHeight
    return {width: x, height: y}
  },
  hasScrollBar(id){
    id = id || 'app'
    return document.getElementById(id).scrollHeight > this.getWidthHeight().height
  },
  getImageWH(imgUrl) {
    let img = new Image()
    img.src = imgUrl
    return {w: img.width, h: img.height}
  },
  hidePhone(value) {
    if (!value) {
      return ''
    }
    value = value.toString()
    if (value.length !== 11) {
      return value
    }
    return value.substring(0, 3) + '*****' + value.substring(8)
  },
  price(value, fixed) {
    value = value || 0
    if (typeof value === 'string') {
      value = parseFloat(value)
    }
    if (undefined === fixed || null === fixed) {
      fixed = 2
    }
    if (value < 0) {
      value = 0
    }
    return value.toFixed(fixed)
  },
  getParam(name, url) {
    if (!url) {
      url = window.location.href
    }
    name = name.replace(/[\[\]]/g, "\\$&")
    let regex   = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, " "))
  },
  setTitle(title){
    setTimeout(function () {
      //利用iframe的onload事件刷新页面
      document.title = title;
      var iframe = document.createElement('iframe');
      iframe.style.visibility = 'hidden';
      iframe.style.width = '1px';
      iframe.style.height = '1px';
      iframe.onload = function () {
        setTimeout(function () {
          document.body.removeChild(iframe);
        }, 0);
      };
      document.body.appendChild(iframe);
    }, 0);
  }
}