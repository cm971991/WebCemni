<template>
  <div>
    <cell :title="hideValue" @click.native="idCardClick"
          v-show="currentValue.length==18&&!showInput">
      <div slot="icon" style="display:block;margin-right:1em;">
        身份证号
      </div>
    </cell>
    <x-input :title=title :placeholder=placeholder v-model="currentValue" :max="18"
             v-show="currentValue.length!==18||showInput" ref="idCardInput" @on-blur="onBlur"></x-input>
  </div>
</template>

<script>
  import { XInput, Cell } from 'vux'
  export default{
    props: {
      value: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: '身份证号'
      },
      placeholder: {
        type: String,
        default: '请输入您的身份证号'
      }
    },
    components: {
      XInput,
      Cell
    },
    data () {
      return {
        currentValue: '',
        showInput: false
      }
    },
    computed: {
      hideValue () {
        if (this.currentValue && this.currentValue.length === 18) {
          return this.currentValue.replace(/(\d{2})\d{14}(\d{2})/, '$1∗∗∗∗∗∗∗∗∗∗∗∗∗∗$2')
        }
        return ''
      }
    },
    created () {},
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
      onBlur () {
        this.showInput = false
      },
      idCardClick () {
        this.showInput = true
        this.$nextTick(() => {
          this.$refs.idCardInput.focus()
        })
      }
    },
    watch: {
      value (val) {
        this.currentValue = val
      },
      currentValue (val) {
        this.$emit('input', val)
      }
    }
  }
</script>
