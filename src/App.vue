<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab-wrapper">
      <tab :tabs="tabs" :initialIndex="0"></tab>
    </div>
  </div>
</template>

<script>
import VHeader from 'components/v-header/v-header'
import Tab from 'components/tab/tab'
import Goods from 'components/goods/goods'
import Seller from 'components/seller/seller'
import Ratings from 'components/ratings/ratings'
import { getSeller } from 'api'
import axios from 'axios'

export default {
  name: 'app',
  data() {
    return {
      seller: {}
    }
  },
  computed: {
    tabs() {
      return [
        {
          component: Goods,
          label: '商品',
          value: '商品',
          data: {
            seller: this.seller
          }
        },
        {
          component: Ratings,
          label: '评价',
          value: '评价',
          data: {
            seller: this.seller
          }
        },
        {
          component: Seller,
          label: '商家',
          value: '商家',
          data: {
            seller: this.seller
          }
        }
      ]
    }
  },
  created() {
    this._getSeller()
  },
  methods: {
    _getSeller() {
      getSeller().then((seller) => {
        this.seller = seller
      })
    }
  },
  components: {
    VHeader,
    Tab,
    Goods,
    Ratings,
    Seller
  }
}
</script>

<style lang="stylus" scoped>
#app
  .tab-wrapper
    position: fixed
    top: 136px
    left: 0
    right: 0
    bottom: 0
</style>
