<template>
<transition name="slider">
  <div id="radio" ref="radio">
    <div class="m-header">
          <span class="radioTitle">电台</span>
    </div>
    <div class="back" @click="back">
          <i class="icon-back"></i>
    </div>
    <router-view></router-view>
  </div>
</transition>
</template>

<script>
import {ERR_OK} from 'api/config'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {playlistMixin} from 'common/js/mixin'
import {mapMutations} from 'vuex'
export default {
//   mixins: [playlistMixin],
  data(){
    return{
    }
  },
  created(){
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
      .typeTitle
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


</style>
