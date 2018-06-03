<template>
  <transition name="slide">
    <div class="album-detail">
        <div class="m-header">
            <span class="albumTitle">专辑</span>
        </div>
        <div class="back" @click="back">
            <i class="icon-back"></i>
        </div>
        <span class="adate">{{data.aDate}}</span>
        <div class="image-bg" >
              <img class="image" width="125px" height="125px" v-lazy="`https://y.gtimg.cn/music/photo_new/T002R300x300M000${this.$route.params.albummid}.jpg?max_age=2592000`"/>
              <div class="diss">
                  <span class="albumname">{{data.name}}</span>
                  <div class="avatar-wrapper">
                    <img class="avatar" v-lazy="`https://y.gtimg.cn/music/photo_new/T001R300x300M000${data.singermid}.jpg?max_age=2592000`">
                    <span class="singername">{{data.singername}}</span>
                  </div>
                  <div class="desc" @click="todesc">
                    <span class="info" :style="computWidth">简介：{{data.desc}}</span>
                    <i class="new-icon-rightarrow"></i>
                  </div>
              </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">

  import {mapGetters,mapMutations} from 'vuex'
  import {getColor} from 'common/js/dom'
  import {ERR_OK} from 'api/config'
  import {getAlbumDetail} from 'api/album'
  export default {
    data(){
      return{
          data:{}
      }
    },
    computed:{
      computWidth(){
         return 'width:'+(window.innerWidth/2)+'px'
      },
      bgStyle(){
        return 'background:' + getColor(this.data.color)
      }
    },
    methods:{
        back(){
          this.$router.back()
        },
        todesc(){
          this.$router.push({
            path:`/appShow/recommend/album/desc/info`
          })
          this.setAlbumDesc(this.data)
        },
        _getAlbumDetail(albummid){
          getAlbumDetail(albummid).then((res) => {
                this.data = res.data
          })
        },
        ...mapMutations({
          setAlbumDesc:'SET_ALBUM_DESC'
        })
    },
    components: {
    },
    created(){
        this._getAlbumDetail(this.$route.params.albummid)
    //     var value = parseInt(-val);  
    //     var val = 0xff000000 | value;  
    //     val = val.toString(16).substring(1);  
    //     var str = '';  
    //     //当返回的颜色值没有达到六位时  
    //     if (val.length < 6) {  
    //         var i = 6 - val.length;  
    //         for (var t = 0; t < i; t++) {  
    //             str += '0';  
    //         }  
    //     }  
    //     console.log('color:' + '#' + str + val);
    // }
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
      color:$color-text
    .image-bg
      display :flex
      flex-direction :row
      margin-left :25px
      margin-top : 20px
      height :200px
      width:100%
      .image
        margin-right :8px
      .diss
        display :flex
        flex-direction :column
        margin-top :15px
        .albumname
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
</style>