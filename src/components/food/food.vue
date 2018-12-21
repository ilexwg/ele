<template>
  <transition name="move" @after-leave="afterLeave">
    <div class="food" v-show="visible">
      <cube-scroll ref="scroll">
        <div class="food-content">
          <div class="image-header">
            <img :src="food.image">
            <div class="back" @click="hide">
              <i class="icon-arrow_lift"></i>
            </div>
          </div>
          <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <div class="detail">
              <span class="sell-count">月售{{food.sellCount}}份</span>
              <span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
              <span class="now">¥{{food.price}}</span>
              <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
            </div>
            <div class="cart-control-wrapper">
              <cart-control @add="addFood" :food="food"></cart-control>
            </div>
            <transition name="fade">
              <div @click.stop="addFirst" class="buy" v-show="!food.count">
                加入购物车
              </div>
            </transition>
          </div>
          <split v-show="food.info"></split>
          <div class="info" v-show="food.info">
            <h1 class="title">商品信息</h1>
            <p class="text">{{food.info}}</p>
          </div>
          <split></split>
        </div>
      </cube-scroll>
    </div>
  </transition>
</template>

<script>
import popupMixin from 'common/mixins/popup'
import CartControl from 'components/cart-control/cart-control'
import Split from 'components/split/split'

const EVENT_SHOW = 'show'
const EVENT_LEAVE = 'leave'
const EVENT_ADD = 'add'

export default {
  mixins: [popupMixin],
  name: 'food',
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    afterLeave() {
      this.$emit(EVENT_LEAVE)
    },
    addFirst(event) {
      this.$set(this.food, 'count', 1)
      this.$emit(EVENT_ADD, event.target)
    },
    addFood(target) {
      this.$emit(EVENT_ADD, target)
    }
  },
  created() {
    this.$on(EVENT_SHOW, () => {
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    })
  },
  components: {
    CartControl,
    Split
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'

.food
  position: fixed
  left: 0
  top: 0
  bottom: 48px
  z-index: 30
  width: 100%
  background: $color-white
  &.move-enter-active, &.move-leave-active
    transition: all 0.3s linear
  &.move-enter, &.move-leave-active
    transform: translate3d(100%, 0, 0)
  .image-header
    position: relative
    width: 100%
    height: 0
    padding-top: 100%
    img
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
    .back
      position: absolute
      top: 10px
      left: 0
      .icon-arrow_lift
        display: block
        padding: 10px
        font-size: $fontsize-large-xx
        color: $color-white
  .content
    position: relative
    padding: 18px
    .title
      line-height: 14px
      margin-bottom: 8px
      font-size: $fontsize-medium
      font-weight: 700
      color: $color-dark-grey
    .detail
      margin-bottom: 18px
      line-height: 10px
      height: 10px
      font-size: 0
      .sell-count, .rating
        font-size: 10px
        color: rgb(147, 153, 159)
      .sell-count
        margin-right: 12px
    .price
      font-weight: 700
      line-height: 24px
      .now
        margin-right: 8px
        font-size: 14px
        color: rgb(240, 20, 20)
      .old
        text-decoration: line-through
        font-size: 10px
        color: rgb(147, 153, 159)
    .cart-control-wrapper
      position: absolute
      right: 12px
      bottom: 12px
    .buy
      position: absolute
      right: 18px
      bottom: 18px
      z-index: 10
      line-height: 24px
      height: 24px
      padding: 0 12px
      box-sizing: border-box
      border-radius: 12px
      font-size: 10px
      color: #fff
      background: rgb(0, 160, 220)
      &.fade-transition
        transition: all 0.2s
        opacity: 1
      &.fade-enter, &.fade-leave
        opacity: 0
  .info
    padding: 18px
    .title
      line-height: 14px
      margin-bottom: 6px
      font-size: 14px
      color: rgb(7, 17, 27)
    .text
      line-height: 20px
      padding: 0 8px
      font-size: 12px
      color: rgb(77, 85, 93)
</style>