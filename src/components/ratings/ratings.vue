<template>
  <cube-scroll class="ratings" :data="computedRatings" :options="scrollOptions">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <rating-select
        v-if="ratings.length"
        :ratings="ratings"
        :onlyContent="onlyContent"
        :selectType="selectType"
        @select="onSelect"
        @content="onToggleContent"
      ></rating-select>
      <div class="rating-wrapper">
        <ul>
          <li
            v-for="(rating, index) in computedRatings"
            :key="index"
            class="rating-item"
          >
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score" class="star"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend clear-fix" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="(item, index) in rating.recommend" :key="index">{{item}}</span>
              </div>
              <div class="time">
                {{format(rating.rateTime)}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </cube-scroll>
</template>

<script>
import moment from 'moment'
import { getRatings } from 'api'
import ratingMixin from 'common/mixins/rating'
import Star from 'components/star/star'
import Split from 'components/split/split'
import RatingSelect from 'components/rating-select/rating-select'

export default {
  name: 'ratings',
  mixins: [ratingMixin],
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      ratings: [],
      scrollOptions: {
        click: false,
        directionLockThreshold: 0
      },
      fetched: false
    }
  },
  computed: {
    seller() {
      return this.data.seller || {}
    }
  },
  methods: {
    format(time) {
      return moment(time).format('YYYY-MM-DD hh:mm')
    },
    fetch() {
      if (!this.fetched) {
        this.fetched = true
        getRatings({
          id: this.seller.id
        }).then((ratings) => {
          this.ratings = ratings
        })
      }
    }
  },
  components: {
    Star,
    Split,
    RatingSelect
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'

.ratings
  width: 100%
  .overview
    display: flex
    padding: 18px 0
    .overview-left
      flex: 0 0 137px
      padding: 6px 0
      width: 137px
      border-right: 1px solid rgba(7, 17, 27, 0.1)
      text-align: center
      @media only screen and (max-width: 320px)
        flex: 0 0 120px
        width: 120px
      .score
        margin-bottom: 6px
        line-height: 28px
        font-size: 24px
        color: rgb(255, 153, 0)
      .title
        margin-bottom: 8px
        line-height: 12px
        font-size: 12px
        color: rgb(7, 17, 27)
      .rank
        line-height: 10px
        font-size: 10px
        color: rgb(147, 153, 159)
    .overview-right
      flex: 1
      padding: 6px 0 6px 24px
      @media only screen and (max-width: 320px)
        padding-left: 6px
      .score-wrapper
        display: flex
        align-items: flex-start
        margin-bottom: 8px
        font-size: 0
        .title
          display: inline-block
          line-height: 18px
          font-size: 12px
          color: rgb(7, 17, 27)
        .star
          margin: 0 12px
          line-height: 18px
        .score
          line-height: 18px
          font-size: 12px
          color: rgb(255, 153, 0)
      .delivery-wrapper
        font-size: 0
        .title
          line-height: 18px
          font-size: 12px
          color: rgb(7, 17, 27)
        .delivery
          margin-left: 12px
          font-size: 12px
          color: rgb(147, 153, 159)
  .rating-wrapper
    padding: 0 18px
    .rating-item
      display: flex
      padding: 18px 0
      border-1px(rgba(7, 17, 27, 0.1))
      .avatar
        flex: 0 0 28px
        margin-right: 6px
        width: 28px
        img
          border-radius: 50%
      .content
        position: relative
        flex: 1
        .name
          margin-bottom: 4px
          line-height: 12px
          font-size: 10px
          color: rgb(7, 17, 27)
        .star-wrapper
          display: flex
          align-items: center
          margin-bottom: 6px
          font-size: 0
          .star
            margin-right: 6px
          .delivery
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
        .text
          margin-bottom: 8px
          white-space: normal
          line-height: 18px
          font-size: 12px
          color: rgb(7, 17, 27)
        .recommend
          line-height: 16px
          font-size: 0
          .icon-thumb_up, .item
            display: inline-block
            float: left
            margin: 0 3px 4px 0
            font-size: 9px
          .icon-thumb_up
            color: rgb(0, 160, 220)
          .item
            padding: 0 6px
            border: 1px solid rgba(7, 17, 27, 0.1)
            border-radius: 1px
            color: rgb(147, 153, 159)
            background: #fff
        .time
          position: absolute
          top: 0
          right: 0
          line-height: 12px
          font-size: 10px
          color: rgb(147, 153, 159)
</style>
