<template>
  <span class="bubble">
    {{ num }}
  </span>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'bubble',
  props: {
    num: {
      type: Number
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.bubble
  display: inline-block
  padding: 0 5px
  height: 16px
  line-height: 16px
  text-align: center
  border-radius: 16px
  background: $color-red
  box-shadow: 0 0 4px 0 $color-red
  font-family: Helvetica, sans-serif
  font-size: $fontsize-small-s
  font-weight: 700
  color: $color-white
</style>
