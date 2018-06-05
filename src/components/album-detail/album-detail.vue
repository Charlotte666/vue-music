<template>
  <transition name="slide">
    <div class="album-detail">
        <div class="m-header">
            <span class="albumTitle">专辑</span>
        </div>
        <div class="back" @click="back">
            <i class="icon-back"></i>
        </div>
            <span class="adate" :style="colorStyle">{{data.aDate}}</span>
            <div class="image-bg" >
                  <img class="image" width="125px" height="125px" v-lazy="`https://y.gtimg.cn/music/photo_new/T002R300x300M000${this.$route.params.albummid}.jpg?max_age=2592000`" />
                  <div class="diss" :style="computWidth">
                      <span class="albumname">{{data.name}}</span>
                      <div class="avatar-wrapper">
                        <img class="avatar" v-lazy="`https://y.gtimg.cn/music/photo_new/T001R300x300M000${data.singermid}.jpg?max_age=2592000`" v-show="data.singermid">
                        <span class="singername">{{data.singername}}</span>
                      </div>
                      <div class="desc" @click="todesc">
                        <span class="info">简介：{{data.desc}}</span>
                        <i class="new-icon-rightarrow"></i>
                      </div>
                  </div>
            </div>
            <div class="suiji">
              <div class="button">
                  <i class="icon-play"></i>
                  <span class="text">随机播放</span>
                  <span class="count">共{{data.list.length}}首</span>
              </div>
            </div>
            <scroll :probe-type="probeType" :listen-scroll="listenScroll" :data="data.list" class="list" ref="list">
               <ul class="song-list">
                 <li class="item" v-for="(song, index) in data.list">
                    <div class="wrapper">
                      <span class="index" v-text="getRankText(index)"></span>
                      <div class="content">
                        <h2 class="name">{{song.songname}}</h2>
                        <p class="desc">{{song.singer[0].name}}</p>
                      </div>
                    </div>
                 </li>
               </ul>
            </scroll>
          <div v-show="!data.list.length" class="loading-container">
            <loading></loading>
          </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">

  import {mapGetters,mapMutations} from 'vuex'
  import {playlistMixin} from 'common/js/mixin'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {getColor} from 'common/js/dom'
  import {ERR_OK} from 'api/config'
  import {getAlbumDetail} from 'api/album'
  export default {
    // mixins: [playlistMixin],
    data(){
      return{
          data:{}
      }
    },
    computed:{
      computWidth(){
         return 'width:'+(window.innerWidth/1.8)+'px'
      },
      bgStyle(){
        return 'background:' + getColor(this.data.color)
      },
      colorStyle(){
        return this.data.color == 0 ? 'color:#956d39' : 'color:#fff'
      }
    },
    methods:{
        // handlePlaylist(playlist){
        //   const bottom = playlist.length > 0 ? '60px' : ''
        //   this.$refs.list.$el.style.bottom = bottom
        //   this.$refs.list.refresh()
        // },
        back(){
          this.$router.back()
        },
        todesc(){
          this.$router.push({
            path:`/appShow/recommend/album/desc/info`
          })
          this.setAlbumDesc(this.data)
        },
        getRankText(index) {
            return index + 1
        },
        _getAlbumDetail(albummid){
          getAlbumDetail(albummid).then((res) => {
            console.log(res)
                this.data = res.data
          })
        },
        ...mapMutations({
          setAlbumDesc:'SET_ALBUM_DESC'
        })
    },
    components: {
      Scroll,
      Loading
    },
    created(){
        this.probeType = 3 //better-scroll的probeType属性默认是1,如果想要在scroll快速滚动的时候,正确的监听scroll,需把该属性设置为3。
        this.listenScroll = true
        this._getAlbumDetail(this.$route.params.albummid)
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .album-detail
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    // background-size:100% 100%
    .m-header
      height:30px
      .albumTitle
        display:flex
        font-size: $font-size-large
        color:$color-theme
        justify-content :center
        margin-top :10px
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .adate
      z-index : 10
      position:absolute
      top 165px
      left 30px
    .image-bg
      display :flex
      flex-direction :row
      margin-left :25px
      margin-top : 20px
      height :165px
      width:100%
      .image
        margin-right :8px
      .diss
        display :flex
        flex-direction :column
        margin-top :15px
        .albumname
          no-wrap()
          margin-bottom :15px
          font-size :$font-size-medium-xl
          color:$color-text
        .avatar-wrapper
          display :flex
          align-items :center
          margin-bottom :20px
          .avatar
            width: 30px
            height: 30px
            border-radius: 50%
          .singername
            no-wrap()
            margin-left :8px
            font-size :$font-size-medium-s
            color:$color-text
        .desc
          display :flex
          align-items :center
          .info
            no-wrap()
            font-size :$font-size-small
            color:$color-text
          .new-icon-rightarrow
            color :$color-text
    .suiji
      display :flex
      height:45px
      background : $color-highlight-background
      align-items :center
      .button
        display :flex
        align-items :center
        margin-left :15px
        .icon-play
          margin-right :5px
          color:$color-theme
        .text
          color:$color-theme
          margin-right :8px
        .count
          font-size :$font-size-small
          color:$color-theme
    .list
      position: fixed
      top: 280px
      bottom: 0
      width: 100%
      background: $color-background
      .song-list
        .item
          display: flex
          align-items: center
          box-sizing: border-box
          height: 64px
          font-size: $font-size-medium
          margin-left:20px
          .wrapper
            display :flex
            flex-direction :row
            align-items :center
            .index
              color: $color-theme
              font-size: $font-size-large
              margin-right :25px
            .content
              flex: 1
              line-height: 20px
              Zoverflow: hidden
              .name
                no-wrap()
                color: $color-text
              .desc
                no-wrap()
                margin-top: 4px
                color: $color-text-d
                font-size: $font-size-small
    .loading-container
      position: absolute
      width: 100%
      top: 60%
      transform: translateY(-50%)


</style>