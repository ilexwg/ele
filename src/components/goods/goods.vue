<template>
  <div class="goods">
    <div class="scroll-nav-wrapper">
      <cube-scroll-nav
        :side="true"
        :data="goods"
        :options="scrollOptions"
        v-if="goods.length"
      >
        <template slot="bar" slot-scope="props">
          <cube-scroll-nav-bar
            direction="vertical"
            :labels="props.labels"
            :txts="barTxts"
            :current="props.current"
          >
            <template slot-scope="props">
              <div class="text">
                <support-ico v-if="props.txt.type>=1" :size="3" :type="props.txt.type"></support-ico>
                <span>{{props.txt.name}}</span>
                <span class="num">
                  <bubble v-if="props.txt.count" :num="props.txt.count"></bubble>
                </span>
              </div>
            </template>
          </cube-scroll-nav-bar>
        </template>
        <cube-scroll-nav-panel
          v-for="good in goods"
          :key="good.name"
          :label="good.name"
          :title="good.name"
        >
          <ul>
            <li
              v-for="food in good.foods"
              :key="food.name"
              @click.stop="selectFood(food)"
              class="food-item"
            >
              <div class="icon">
                <img :src="food.icon" width="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">¥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cart-control @add="onAdd" :food="food"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </cube-scroll-nav-panel>
      </cube-scroll-nav>
    </div>
    <div class="shop-cart-wrapper">
      <shop-cart
        ref="shopCart"
        :deliveryPrice="seller.deliveryPrice"
        :minPrice="seller.minPrice"
        :select-foods="selectFoods"
        class="shop-cart"
      >
      </shop-cart>
    </div>
    <!-- <food :food="selectedFood" ref="food"></food> -->
  </div>
</template>

<script type="text/ecmascript-6">
import { getGoods } from 'api'
import ShopCart from 'components/shop-cart/shop-cart'
import CartControl from 'components/cart-control/cart-control'
import SupportIco from 'components/support-ico/support-ico'
import Bubble from 'components/bubble/bubble'

export default {
  name: 'goods',
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      goods: [],
      selectedFood: {},
      scrollOptions: {
        click: false,
        directionLockThreshold: 0
      },
      fetched: false
    }
  },
  methods: {
    fetch() {
      if (!this.fetched) {
        this.fetched = true
        getGoods({
          id: this.seller.id
        }).then((goods) => {
          this.goods = goods
        })
      }
    },
    onAdd(el) {
      this.$refs.shopCart.drop(el)
    },
    _hideShopCartSticky() {
      this.shopCartStickyComp.hide()
    },
    _showFood() {
      this.foodComp = this.foodComp || this.$createFood({
        $props: {
          food: 'selectedFood'
        },
        $events: {
          leave: () => {
            this._hideShopCartSticky()
          },
          add: (el) => {
            this.shopCartStickyComp.drop(el)
          }
        }
      })
      this.foodComp.show()
    },
    _showShopCartSticky() {
      this.shopCartStickyComp = this.shopCartStickyComp || this.$createShopCartSticky({
        $props: {
          selectFoods: 'selectFoods',
          deliveryPrice: this.seller.deliveryPrice,
          minPrice: this.seller.minPrice,
          food: true
        }
      })
      this.shopCartStickyComp.show()
    },
    selectFood(food) {
      this.selectedFood = food
      this._showFood()
      this._showShopCartSticky()
    }
  },
  computed: {
    seller() {
      return this.data.seller
    },
    selectFoods() {
      let ret = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            ret.push(food)
          }
        })
      })
      return ret
    },
    barTxts() {
      let ret = []
      this.goods.forEach((good) => {
        const { type, name, foods } = good
        let count = 0
        foods.forEach((food) => {
          count += food.count || 0
        })
        ret.push({
          type,
          name,
          count
        })
      })
      return ret
    }
  },
  components: {
    ShopCart,
    CartControl,
    SupportIco,
    Bubble
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'

.goods
  position: relative
  text-align: left
  height: 100%
  .scroll-nav-wrapper
    position: absolute
    top: 0
    left: 0
    bottom: 48px
    width: 100%
  >>> .cube-scroll-nav-bar
    width: 80px
    white-space: normal
    overflow: hidden
  >>> .cube-scroll-nav-bar-item
    display: flex
    align-items: center
    padding: 0 10px
    height: 56px
    line-height: 14px
    font-size: $fontsize-small
    background: $color-background-ssss
    .text
      flex: 1
      position: relative
    .num
      position: absolute
      right: -8px
      top: -10px
    .support-ico
      display: inline-block
      vertical-align: top
      margin-right: 4px
  >>> .cube-scroll-nav-bar-item_active
    background: $color-white
    color: $color-dark-grey
  >>> .cube-scroll-nav-panel-title
    padding-left: 14px
    height: 26px
    line-height: 26px
    border-left: 2px solid #d9dde1
    font-size: 12px
    color: rgb(147, 153, 159)
    background: #f3f5f7
  .food-item
    display: flex
    margin: 18px
    padding-bottom: 18px
    border-1px(rgba(7, 17, 27, 0.1))
    &:last-child
      border-none()
      margin-bottom: 0
    .icon
      flex: 0 0 57px
      margin-right: 10px
    .content
      flex: 1
      .name
        margin: 2px 0 8px 0
        height: 14px
        line-height: 14px
        font-size: 14px
        color: rgb(7, 17, 27)
      .desc, .extra
        line-height: 10px
        font-size: 10px
        color: rgb(147, 153, 159)
      .desc
        margin-bottom: 8px
        line-height: 12px
      .extra
        .count
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
      .cartcontrol-wrapper
        position: absolute
        right: 0
        bottom: 12px
</style>
