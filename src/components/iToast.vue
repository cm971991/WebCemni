<template>
  <div v-show='show' class='i-toast-contain'>
    <div class='weui_mask_transparent'></div>
    <div class='center-container is-table'>
      <div class='table-cell'>
        <div class='center-block' id='iToastDiv'>
          {{text}}
        </div>
      </div>
    </div>
  </div>

</template>
<style lang="less" rel="stylesheet/less">
  .i-toast-contain {
    position: fixed;
    top: 50%;
    width: 100%;
    z-index: 5001;
    @modalDuration: 400ms;
    .center-container.is-table {
      display: table;
      width: 100%;
      text-align: center;
    }

    .is-table .table-cell {
      display: table-cell;
      vertical-align: middle;
    }

    .is-table .center-block {
      max-width: 60%;
      margin: 0 auto;
      z-index: 11000;
      text-align: center;
      opacity: 0;
      transform: translate3d(0, 0, 0) scale(1.185);
      transition-property: transform, opacity;
      color: white;
      background: rgba(0, 0, 0, 0.8);
      border-radius: 0.4rem;
      padding: 0 0.8rem;
      min-height: 2.1rem;
      line-height: 2.1rem;
      font-size: 14px;
      &.modal-in {
        opacity: 1;
        transition-duration: @modalDuration;
        transform: translate3d(0, 0, 0) scale(1);
      }
      &.modal-out {
        opacity: 0;
        z-index: 11000-1;
        transition-duration: @modalDuration;
        transform: translate3d(0, 0, 0) scale(0.815);
      }
    }
  }
</style>
<script lang='babel'>
  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      },
      text: {
        type: String
      },
      time: {
        type: Number,
        default: 1500
      }
    },
    computed: {},
    data () {
      return {
        show: false
      }
    },
    created () {
      if (this.value) {
        this.show = true
      }
    },
    watch: {
      show (val) {
        if (val) {
          this.$emit('input', true)
          this.$nextTick(() => {
            let modal = document.getElementById('iToastDiv')
            let size = textSize('14px', this.text)
            if (size.width + getStyle(modal, 'padding-right') * 2 < modal.offsetWidth && modal.offsetWidth) {
              modal.style.width = size.width + 'px'
            } else {
              modal.style.width = '80%'
            }
            removeClass(modal, 'modal-out')
            addClass(modal, 'modal-in')
            clearTimeout(this.timeout)
            this.timeout = setTimeout(() => {
              removeClass(modal, 'modal-in')
              addClass(modal, 'modal-out')
              setTimeout(() => {
                removeClass(modal, 'modal-out')
                modal.style.width = '80%'
                this.show = false
                this.$emit('input', false)
              }, 500)
            }, this.time)
          })
        }
      },
      value (val) {
        this.show = val
      }
    }
  }

  // region utils
  function getStyle (oElm, strCssRule) {
    let strValue = ''
    if (document.defaultView && document.defaultView.getComputedStyle) {
      strValue = document.defaultView.getComputedStyle(oElm, '').getPropertyValue(strCssRule)
    } else if (oElm.currentStyle) {
      strCssRule = strCssRule.replace(/\\-(\w)/g, function (strMatch, p1) {
        return p1.toUpperCase()
      })
      strValue = oElm.currentStyle[strCssRule]
    }
    return strValue.replace('px', '')
  }

  // 计算字符串宽度
  function textSize (fontSize, text) {
    let span = document.createElement('span')
    let result = {}
    result.width = span.offsetWidth
    result.height = span.offsetWidth
    span.style.visibility = 'hidden'
    document.body.appendChild(span)
    if (typeof span.textContent !== 'undefined') {
      span.textContent = text
    } else {
      span.innerText = text
    }
    result.width = span.offsetWidth - result.width
    result.height = span.offsetHeight - result.height
    span.parentNode.removeChild(span)
    return result
  }

  function addClass (el, className) {
    if (el.classList) {
      el.classList.add(className)
    } else {
      el.className += ' ' + className
    }
  }
  function removeClass (el, className) {
    if (el.classList) {
      el.classList.remove(className)
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
    }
  }
  // endregion
</script>
