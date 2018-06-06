<template>
  <div class="song-list">
    <ul>
      <li @click="selectItem(song, index)" class="item" v-for="(song, index) in songs">
        <div class="rank" v-show="rank">
          <span :class="getRankCls(index)" v-text="getRankText(index)"></span>
          <div class="rank-count">
             <img height="15" width="15" src="./img/incount.png">
             <span class="incount">{{Math.round(inCount[index]*100)}}%</span>
          </div>
        </div>
        <span class="index" v-text="getIndexText(index)" v-show="!rank"></span>
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      songs: {
        type: Array,
        default: []
      },
      rank: {
        type: Boolean,
        default: false
      },
      //若果为排行页面 则显示排行上升%
      inCount:{
        type: Array,
        default: () => []
      }
    },
    methods: {
      selectItem(item, index) {
        this.$emit('select', item, index)
      },
      getDesc(song) {
        return `${song.singer}·${song.album}`
      },
      getRankCls(index) {
        if (index <= 2) {
          return `icon icon${index}`
        } else {
          return 'text'
        }
      },
      getRankText(index) {
        if (index > 2) {
          return index + 1
        }
      },
      getIndexText(index){
        return index + 1
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .song-list
    .item
      display: flex
      align-items: center
      box-sizing: border-box
      height: 64px
      font-size: $font-size-medium
      .rank
        flex: 0 0 25px
        width: 25px
        margin-right: 30px
        text-align: center
        .rank-count
          display: flex
          flex-direction: row
          margin-left:-8px
          margin-top:4px
          img 
            margin-right:2px
          .incount
            margin-top:3px
            font-size :10px
            color:$color-text-d
        .icon
          display: inline-block
          width: 25px
          height: 24px
          background-size: 25px 24px
          &.icon0
            bg-image('./img/first')
          &.icon1
            bg-image('./img/second')
          &.icon2
            bg-image('./img/third')
        .text
          color: $color-theme
          font-size: $font-size-large
      .index
        color: $color-theme
        font-size: $font-size-large
        text-align: center
        margin-right :30px
        width: 25px
      .content
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          no-wrap()
          color: $color-text
        .desc
          no-wrap()
          margin-top: 4px
          color: $color-text-d
</style>