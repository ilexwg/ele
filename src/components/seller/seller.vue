<template>
  <cube-scroll class="seller" :options="sellerScrollOptions">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star :size="36" :score="seller.score" class="star"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>元
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <span class="icon-favorite" :class="{'active': favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li
            class="support-item border-1px" v-for="(item, index) in seller.supports"
            :key="index"
          >
            <support-ico :size="4" :type="seller.supports[index].type" class="support-ico"></support-ico>
            <span class="text">{{ seller.supports[index].description }}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <cube-scroll :data="seller" class="pic-wrapper" :options="picScrollOptions">
          <ul class="pic-list">
            <li
              class="pic-item"
              v-for="(pic, index) in seller.pics"
              :key="index"
            >
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </cube-scroll>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li
            class="info-item"
            v-for="(info, index) in seller.infos"
            :key="index"
          >{{info}}</li>
        </ul>
      </div>
      <split></split>
      <div class="pictures">
        <h1 class="title">商家实景</h1>
        <cube-scroll :data="seller" class="picture-wrapper" :options="picScrollOptions">
          <ul class="picture-list">
            <li
              class="picture-item"
              v-for="(pic, index) in seller.pics"
              :key="index"
            >
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </cube-scroll>
      </div>
    </div>
  </cube-scroll>
</template>

<script>
import SupportIco from 'components/support-ico/support-ico'
import Split from 'components/split/split'
import Star from 'components/star/star'

export default {
  name: 'seller',
  data() {
    return {
      favorite: false,
      sellerScrollOptions: {
        click: false,
        directionLockThreshold: 0
      },
      picScrollOptions: {
        scrollX: true,
        stopPropagation: true,
        directionLockThreshold: 0
      }
    }
  },
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    Star,
    Split,
    SupportIco
  },
  computed: {
    seller() {
      return this.data.seller || {}
    },
    favoriteText() {
      return this.favorite ? '已收藏' : '收藏'
    }
  },
  methods: {
    toggleFavorite(event) {
      if (!event._constructed) {
        return
      }
      this.favorite = !this.favorite
    }
  }
}

</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin'
@import '~common/stylus/variable'

.seller
  width: 100%
  text-align: left
  .overview
    position: relative
    padding: 18px
    .title
      margin-bottom: 8px
      line-height: 14px
      font-size: $fontsize-medium
      color: $color-dark-grey
    .desc
      display: flex
      align-items: flex-start
      padding-bottom: 18px
      border-1px(rgba(7, 17, 27, 0.1))
      font-size: 0
      .star
        margin-right: 8px
      .text
        margin-right: 12px
        line-height: 18px
        font-size: 10px
        color: rgb(77, 85, 93)
    .remark
      display: flex
      padding-top: 18px
      .block
        flex: 1
        text-align: center
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        &:last-child
          border: none
        h2
          margin-bottom: 4px
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
        .content
          line-height: 24px
          font-size: 10px
          color: rgb(7, 17, 27)
        .stress
          font-size: 24px
          font-weight: 200
    .favorite
      position: absolute
      top: 18px
      right: 11px
      width: 50px
      text-align: center
      .icon-favorite
        display: block
        margin-bottom: 4px
        line-height: 24px
        font-size: 24px
        color: #d4d6d9
        &.active
          color: rgb(240, 20, 20)
      .text
        line-height: 10px
        font-size: 10px
        color: rgb(77, 85, 93)
  .bulletin
    padding: 18px 18px 0 18px
    .title
      margin-bottom: 8px
      line-height: 14px
      font-size: 14px
      color: rgb(7, 17, 27)
    .content-wrapper
      padding: 0 12px 16px 12px
      border-1px(rgba(7, 17, 27, 0.1))
      .content
        white-space: normal
        line-height: 20px
        font-size: 12px
        color: rgb(240, 20, 20)
    .supports
      .support-item
        display: flex
        align-items: flex-start
        padding: 16px 12px
        border-1px(rgba(7, 17, 27, 0.1))
        font-size: 0
        &:last-child
          border-none()
        .support-ico
          margin-right: 4px
        .text
          line-height: 16px
          font-size: 12px
          color: rgb(7, 17, 27)
  .pics
    padding: 18px
    .title
      margin-bottom: 12px
      line-height: 14px
      font-size: 14px
      color: rgb(7, 17, 27)
    .pic-wrapper
      // width: 100%
      // overflow: hidden
      // white-space: nowrap
      .pic-list
        font-size: 0
        .pic-item
          display: inline-block
          margin-right: 6px
          width: 120px
          height: 90px
          &:last-child
            margin: 0
          img
            display: block
  .info
    padding: 18px 18px 0 18px
    color: rgb(7, 17, 27)
    .title
      padding-bottom: 12px
      line-height: 14px
      border-1px(rgba(7, 17, 27, 0.1))
      font-size: 14px
    .info-item
      padding: 16px 12px
      line-height: 16px
      border-1px(rgba(7, 17, 27, 0.1))
      font-size: 12px
      &:last-child
        border-none()
  .pictures
    padding: 18px
    .title
      margin-bottom: 12px
      line-height: 14px
      font-size: 14px
      color: rgb(7, 17, 27)
    .picture-wrapper
      // width: 100%
      // overflow: hidden
      // white-space: nowrap
      .picture-list
        font-size: 0
        .picture-item
          display: inline-block
          margin-right: 6px
          width: 120px
          height: 90px
          &:last-child
            margin: 0
          img
            display: block
</style>
