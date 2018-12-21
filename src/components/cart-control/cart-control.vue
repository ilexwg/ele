<template>
  <div class="cartcontrol">
    <transition name="move">
      <div
        class="cart-decrease" v-show="food.count>0"
        @click.stop="remove"
        transition="move"
      >
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div
      class="cart-add icon-add_circle"
      @click.stop="add"
    ></div>
  </div>
</template>

<script type="text/ecmascript-6">
const EVENT_ADD = 'add'

export default {
  name: 'cart-control',
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    add(event) {
      if (!this.food.count) {
        this.$set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
      this.$emit(EVENT_ADD, event.target)
    },
    remove() {
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.cartcontrol
  display: flex
  align-items: center
  .cart-decrease
    flex: 1
    display: inline-block
    padding: 6px
    opacity: 1
    .inner
      display: inline-block
      line-height: 24px
      font-size: $fontsize-large-xxx
      color: $color-blue
      transition: all 0.3s linear
      transform: rotate(0)
    &.move-enter-active, &.move-leave-active
      transition: all 0.3s linear
    &.move-enter, &.move-leave-active
      opacity: 0
      transform: translate3d(24px, 0, 0)
      .inner
        transform: rotate(180deg)
  .cart-count
    flex: 1
    width: 10px
    line-height: 24px
    text-align: center
    font-size: $fontsize-small-s
    color: $color-grey
  .cart-add
    flex: 1
    display: inline-block
    padding: 6px
    line-height: 24px
    font-size: $fontsize-large-xxx
    color: $color-blue
</style>
