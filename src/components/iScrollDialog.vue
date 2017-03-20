<template>
  <x-dialog v-model="currentValue" :scroll="false" :hide-on-blur="true">
    <div style="margin: 20px auto;">
      <slot name="scrollTitle"></slot>
      <scroller lock-x :scrollbar-y="true" :height="scrollHeight+'px'" :prevent-default="false"
                ref="iDialogScrollerDemo">
        <!--content slot-->
        <slot></slot>
      </scroller>
    </div>
    <span class="vux-close" @click="currentValue=false"></span>
  </x-dialog>
</template>

<script>
  import { XDialog, Scroller } from 'vux'
  
  export default{
    components: {
      XDialog, Scroller
    },
    props: {
      bottomHeight: {
        type: Number,
        default: 150
      },
      value: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      scrollHeight: function () {
        return this.$utils.Common.getWidthHeight().height - this.bottomHeight
      }
    },
    data () {
      return {
        currentValue: false
      }
    },
    watch: {
      value (val) {
        this.currentValue = val
        if (val) {
          this.$nextTick(() => {
            this.$refs.iDialogScrollerDemo.reset()
          })
        }
      },
      currentValue (val) {
        this.$emit('input', val)
      }
    }
  }
</script>
