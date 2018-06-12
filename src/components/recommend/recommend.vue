<template>
  
  <div class="recommend" ref="recommend">
    <!-- <mheader></mheader> -->
      <scroll ref="scroll" class="recommend-content" :data="discList">
        <div>
          <div v-if="recommends.length" class="slider-wrapper">
              <slider>
                  <div v-for="item in recommends">
                      <a :href="item.linkUrl">
                         <img class="needsclick" @load="loadImage" :src="item.picUrl">
                      </a>
                  </div>
              </slider>
          </div>
          <div class="tab">
            <div class="people" @click="toSinger">
              <i class="new-icon-people"></i>
              <span class="people-span">歌手</span>
            </div>
            <div class="rank" @click="toRank">
              <i class="new-icon-rank" ></i>
              <span class="rank-span">排行</span>
            </div>
            <div class="type" @click="toType">
              <i class="new-icon-type"></i>
              <span class="type-span">分类歌单</span>
            </div> 
            <div class="new">
              <i class="new-icon-new"></i>
              <span class="new-span">新歌</span>
            </div>
          </div>
          <div class="new-songs" @click="toNew(0,0)">
            <div class="new-song" v-show="info1.cover">
              <img width="58" height="58" v-lazy="info1.cover"/>
            </div>
            <div class="info">
              <div class="song">
                <span class="title">新歌推荐</span>
                <span class="text" v-html="info1.title"></span>
              </div>
            </div>
          </div>
          <div class="new-songs" @click="toNew(0,0)">
            <div class="new-song" v-show="info2.cover">
              <img width="58" height="58" v-lazy="info2.cover"/>
            </div>
            <div class="info">
              <div class="song">
                <span class="title">编辑推荐</span>
                <span class="text" v-html="info2.title"></span>
              </div>
            </div>
          </div>
          <div class="recommend-list">
            <div class="title-wrapper">
              <h1 class="list-title">为 你 推 荐 歌 单</h1>
              <i class="new-icon-right" @click="toType"></i>
            </div>
          </div>
          <three-column-list :items="discList" @select="selectItem"></three-column-list>
          <div class="refsh-wrapper" @click="_getDiscList">
            <div class="refsh">
              <i class="new-icon-change" v-show="!loading"></i>
              <div class="custom-load-icon" v-show="loading">
                 <custom-load></custom-load>
              </div>
              <span>换一批</span>
            </div>
          </div>
          <div class="new-album-list">
            <div class="title-wrapper">
              <h1 class="list-title">最 新 专 辑</h1>
              <i class="new-icon-right" @click="toNew(0,1)"></i>
            </div>
          </div>
          <recommend-album :items="newAlbumList" @select="toAlbum"></recommend-album>
        </div>
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
      </scroll>
      <router-view></router-view>
  </div>
</template>

<script>
import {getRecommend,getDiscList,getNewList} from 'api/recommend'
import mheader from 'components/header/header'
import RecommendAlbum from 'components/recommend-album/recommend-album'
import {ERR_OK} from 'api/config'
import slider from 'base/slider/slider'
import scroll from 'base/scroll/scroll'
import ThreeColumnList from 'base/three-column-list/three-column-list'
import loading from 'base/loading/loading'
import CustomLoad from 'base/custom-load/custom-load'
import {playlistMixin} from 'common/js/mixin'
import {mapMutations} from 'vuex'

//换一批参数
let startNo = 0
let endNo = 5

export default {
  mixins: [playlistMixin],
  data(){
    return {
        recommends : [],
        discList : [],
        newAlbumList : [],
        info1:[],
        info2:[],
        loading:false,
    }
  },
  created(){
    this._getRecommend()
    this._getDiscList()
    this._getNewList()
  },
  methods:{
    selectItem(item){
      this.$router.push({
        path: `/appShow/recommend/${item.dissid}`
      })
      this.setDisc(item)
    },
    toAlbum(item){
      this.$router.push({
        path: `/appShow/recommend/${this.info1.content_id}/${this.info2.content_id}/${0}/${item.album_mid}`
      })
    },
     handlePlaylist(playlist){
          const bottom = playlist.length > 0 ? '60px' : '' //播放器高度加上原有bottom 等于148
          this.$refs.recommend.style.bottom = bottom
          this.$refs.scroll.refresh()
    },
      _getRecommend(){
          getRecommend().then((res) => {
              if(res.code === ERR_OK){
                  this.recommends = res.data.slider
              }
          })
      },
      _getDiscList(){
        this.loading = true
        getDiscList(startNo,endNo).then((res) => {
              if(res.code === ERR_OK){
                  this.discList = res.data.list
                  startNo = startNo + 6
                  endNo = endNo + 6
                  this.loading = false
              }
          })
      },
      _getNewList(){
         // 新歌推荐和编辑推荐
         getNewList(0).then((res) => {
              if(res.code === ERR_OK){
                let data = res.recomPlaylist.data.v_hot
                this.info1 = data[0]
                this.info2 = data[1]
              }
          })
          // 最新专辑
         getNewList(2,0,7).then((res) => {
              if(res.code === ERR_OK){
                this.newAlbumList = res.new_album.data.list.slice(0,6) // 截取前6个元素
                this.$refs.scroll.refresh()
              }
          })
      },
      loadImage() {
        if (!this.checkloaded) {
          this.checkloaded = true
          this.$refs.scroll.refresh()
        }
      },
      toSinger(){
        this.$router.push({
          path:'/appShow/singer'
        })
      },
      toRank(){
        this.$router.push({
          path:'/appShow/rank'
        })
      },
      toType(){
        this.$router.push({
          path:'/appShow/type'
        })
      },
      toNew(state,switchIndex){
         this.$router.push({
          path:`/appShow/recommend/${this.info1.content_id}/${this.info2.content_id}/${switchIndex}`
        })
        this.setNewSongRefsh(state)
      },
      ...mapMutations({
        setDisc : 'SET_DISC',
        setNewSongRefsh : 'SET_NEW_SONG_REFSH'
      })
  },
  components:{
      slider,
      scroll,
      loading,
      mheader,
      ThreeColumnList,
      CustomLoad,
      RecommendAlbum
  }
}

</script>

<style lang="stylus">
 @import "~common/stylus/variable"
  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .tab
        display :flex
        // position :absolute
        // top:150px
        // left:0
        // border: 1px solid red
        justify-content :center
        align-items :center
        margin-top :10px
        height:80px
        .people
          display :flex
          flex-direction :column
          align-items :center
          .new-icon-people
            font-size :28px
            margin-bottom :10px
          .people-span
            color:$color-text
            font-size :$font-size-small
        .rank
          display :flex
          flex-direction :column
          align-items :center
          margin-left :65px
          .new-icon-rank
            font-size :28px
            margin-bottom :10px
          .rank-span
            color:$color-text
            font-size :$font-size-small
        .type
          display :flex
          flex-direction :column
          align-items :center
          margin-left :65px
          .new-icon-type
            font-size :28px
            margin-bottom :10px
          .type-span
            color:$color-text
            font-size :$font-size-small
        .new
          display :flex
          flex-direction :column
          align-items :center
          margin-left :65px
          .new-icon-new
            font-size :28px
            margin-bottom :10px
          .new-span
            color:$color-text
            font-size :$font-size-small
      .new-songs
        display: flex
        margin: 0 10px
        padding-top: 10px
        height: 58px
        .new-song
          flex: 0 0 58px
        .info
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 15px
          height: 58px
          overflow: hidden
          background: $color-highlight-background
          color: $color-text-d
          .song
            display :flex
            flex-direction :column
            no-wrap()
            line-height: 20px
            .title
              font-size: $font-size-medium-x
              color:$color-text-new
            .text
              font-size: $font-size-small
      .recommend-list
        .title-wrapper
          display :flex
          flex-direction :row
          align-items :center
          justify-content :center
        .list-title
          flex:1
          height: 65px
          line-height: 65px
          text-align: center
          margin-left:35px
          font-size: $font-size-medium-xl
          font-weight :500
          color: $color-theme
        .new-icon-right
          font-size :20px
          font-weight :500
          margin-right:15px
      .refsh-wrapper
        display :flex
        justify-content :center
        .refsh
          display :flex
          padding: 6px
          align-items :center
          justify-content :center
          width:100px
          font-size: $font-size-medium
          color: $color-theme
          border: 1px solid $color-theme
          border-radius: 5px
          .custom-load-icon
            margin-right:8px
          .new-icon-change
            font-size :16px
            margin-right:8px
      .new-album-list
        .title-wrapper
          display :flex
          flex-direction :row
          align-items :center
          justify-content :center
        .list-title
          flex:1
          height: 65px
          line-height: 65px
          text-align: center
          margin-left:35px
          font-size: $font-size-medium-xl
          font-weight :500
          color: $color-theme
        .new-icon-right
          font-size :20px
          font-weight :500
          margin-right:15px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)

</style>
