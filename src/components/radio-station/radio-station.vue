<template>
<transition name="slider">
  <div id="radio" ref="radio">
    <div class="m-header">
          <span class="radioTitle">电台</span>
    </div>
    <div class="back" @click="back">
          <i class="icon-back"></i>
    </div>
    <div class="img-wrapper">
      <div class="img-bg">
        <img class="img" src="./radio.gif" alt="">
      </div>
    </div>
    <div class="group-radio-wrapper">
      <scroll class="group-wrapper" :data="groupList">
        <div>
          <ul >
          <li v-for="item in groupList" class="group-item">
            <span class="text border-1px">{{item.name}}</span>
          </li>
        </ul>
        </div>
        
      </scroll>
      <!-- <scroll class="radio-wrapper" :data="groupList">

      </scroll> -->
    </div>


    <router-view></router-view>
  </div>
</transition>
</template>

<script>
import {ERR_OK} from 'api/config'
import {getGroupRadioList} from 'api/radio'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {playlistMixin} from 'common/js/mixin'
import {mapMutations} from 'vuex'

export default {
//   mixins: [playlistMixin],
  data(){
    return{
      groupList:[]
    }
  },
  created(){
    this._getGroupRadioList()
  },
  computed:{
  },
  methods:{
    back(){
      this.$router.push({
        path:'/appShow/recommend'
      })
    },
    // handlePlaylist(playlist){
    //       const bottom = playlist.length > 0 ? '100px' : '' // 播放器高度加上原有bottom 等于148
    //       this.$refs.type.style.bottom = bottom
    //       this.$refs.typeList.refresh()
    // },
    _getGroupRadioList(){
      getGroupRadioList().then((res) => {
          if(res.code === ERR_OK){
              this.groupList = res.data.data.groupList
              console.log(this.groupList)
          }
      })
    }
  },
  components: {
      Scroll,
      Loading
  }
}

</script>

<style lang="stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .slider-enter-active, .slider-leave-active
    transition: all 0.3s
  .slider-enter, .slider-leave-to
    transform : translate3d(100%,0,0)
  #radio
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom:0
    right: 0
    background: $color-background
    .m-header
      height:30px
      .radioTitle
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
        font-size:  $font-size-large-xl
        color: $color-theme
    .img-wrapper
      display :flex
      justify-content :center
      .img-bg
        display :flex
        justify-content :center
        align-items :center
        margin-top :15px
        height:200px
        width:230px
        background-size:100%
        border-radius: 50%
        background-color:rgba(255, 255, 255, 0.2)
        z-index :2
        .img
          height:180px
          width:210px
          border-radius: 50%
    .group-radio-wrapper
      position:fixed
      top:300px
      left :0
      right :0
      bottom :0
      display :flex
      flex-direction :row
      .group-wrapper
        flex:0 0 80px
        overflow: hidden
        width:80px
        background :$color-highlight-background
        .group-item
          display :table // 垂直居中
          height:60px
          width:56px
          padding:0 25px
          line-height :14px
          .text
            display :table-cell
            width:56px
            vertical-align :middle
            font-size :12px
            color :$color-text
            // border-1px($color-background) 1px边框
      .radio-wrapper
        overflow: hidden
        flex:1

</style>
