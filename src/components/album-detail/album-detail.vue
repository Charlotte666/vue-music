<template>
  <transition name="slide">
    <div class="album-detail">
      <div class="m-header">
          <span class="albumTitle">专辑</span>
      </div>
      <div class="back" @click="back">
          <i class="icon-back"></i>
      </div>
      <div class="image-bg">
            <img  width="100px" height="100px" v-lazy="`https://y.gtimg.cn/music/photo_new/T002R300x300M000${this.$route.params.albummid}.jpg?max_age=2592000`"/>
            <div class="diss">
                <span class="albumname">{{data.name}}</span>
                <span class="singername">{{data.singername}}</span>
                <span class="info">简介：{{data.name}}</span>
            </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">

  import {mapGetters} from 'vuex'
  import {ERR_OK} from 'api/config'
  import {getAlbumDetail} from 'api/album'
  export default {
    data(){
      return{
          data:{}
      }
    },
    computed:{
        bgStyle(){
            let url = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${this.$route.params.albummid}.jpg?max_age=2592000`
            return 'background-image:url('+url+')'
        }
    //  computWidth(){
    //      let url = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${this.$route.params.albummid}.jpg?max_age=2592000`
         
    //      return 'background:url('+url+') 0 0 no-repeat'
    //   }
    },
    methods:{
        back(){
          this.$router.back()
        },
        _getAlbumDetail(albummid){
          getAlbumDetail(albummid).then((res) => {
                this.data = res.data
                console.log(this.data.name)
            //   console.log(res)
            //   if(res.code === ERR_OK){
            //       this.recommends = res.data.slider
            //   }
          })
        }
    },
    components: {
    },
    created(){
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
    .image-bg
      display :flex
      flex-direction :row
      margin-left :15px
      height :200px
</style>