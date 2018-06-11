<template>
<transition name="slider">
  <div id="new-song">
    <div class="m-header">
      <div class="switches-wrapper">
        <switches @switch="switchItem" :switches="switches" :currentIndex="currentIndex"></switches>
      </div>
    </div>
    <div class="back" @click="back">
        <i class="icon-back"></i>
    </div>
    <div>
      <tab :line-width=3 active-color='#956d39' v-model="index">
        <tab-item   v-for="(item, index) in list" :key="index">{{item}}</tab-item>
      </tab>
      <swiper v-model="index" :height="computHeight" :show-dots="false">
        <swiper-item v-for="(item, index) in list" :key="index" >
            <scroll :data="changeData(index)" :probe-type="probeType" :listen-scroll="listenScroll" class="list" ref="list">
              <div class="song-list-wrapper">
                  <song-list :songs="changeData(index)"></song-list>
              </div>
              <div v-show="!showLoading(index)" class="loading-container">
               <loading></loading>
              </div>
            </scroll>
        </swiper-item>
      </swiper>
      
    </div>
    <router-view></router-view>
  </div>
</transition>
</template>

<script type="text/ecmascript-6">
  import {getNewList,getSongList} from 'api/recommend'
  import {mapGetters,mapMutations} from 'vuex'
  import {ERR_OK} from 'api/config'
  import Switches from 'base/switches/switches'
  import SongList from 'base/song-list/song-list'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {getVkey} from 'api/song'
  import {createSong} from 'common/js/song'
  import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
  const list1 = () => ['最新','内地','港台','欧美','日本','韩国']
  const list2 = () => ['内地','港台','欧美','韩国','日本']
  export default {
    data() {
      return {
        currentIndex: 0,
        disstid1:'',
        disstid2:'',
        songs0:[],songs1:[],songs2:[],songs3:[],songs4:[],songs5:[],
        switches: [
          {
            name: '新歌'
          },
          {
            name: '新碟'
          }
        ],
        list: list1(),
        index: 0 
      }
     },
     created(){
       this.disstid1 = this.$route.params.disstid1 //最新
       this.disstid2 = this.$route.params.disstid2 //推荐
       this.probeType = 3 //better-scroll的probeType属性默认是1,如果想要在scroll快速滚动的时候,正确的监听scroll,需把该属性设置为3。
       this.listenScroll = true
       this._getSongList()
     },
      methods:{
        back(){
            this.$router.push({
                path:'/appShow/recommend'
            })
        },
        switchItem(index) {
         this.currentIndex = index
        },
        _getSongList(){
          let dissitid = this.newSongRefsh == 0 ? this.disstid1 : this.disstid2
          getSongList(dissitid).then(async (res) =>{
            if(res.code === ERR_OK){
                this.songs0 = await this._normalizeSongs1(res.cdlist[0].songlist)
            }
          })
        },
        _getNewList(i,type,area){
          getNewList(i,type,area).then(async (res) => {
              if(res.code === ERR_OK){
               let song = await this._normalizeSongs2(res.new_song.data.song_list)
                switch (this.newSongRefsh) {
                  case 1:
                     this.songs1 = song
                     break
                  case 2:
                     this.songs2 = song
                     break
                  case 3:
                     this.songs3 = song
                     break
                  case 4:
                     this.songs4 = song
                     break
                  case 5:
                     this.songs5 = song
                     break
                  default:
                      return false
              }
                
              }
          })
        },
         _normalizeSongs1(list){
          let songItems = []
           list.forEach((musicData) => {
            if(musicData.songid && musicData.albumid){
              getVkey(musicData.songmid).then(res=>{
              if(res.code === ERR_OK){
                  let data = res.data.items[0]
                  let url = `http://dl.stream.qqmusic.qq.com/${data.filename}?vkey=${data.vkey}&guid=7332953645&fromtag=66`
                  songItems.push(createSong(musicData,url))
                }
            })
            }
          })
          return songItems
        },
        _normalizeSongs2(list){
          let songItems = []
           list.forEach((item) => {
            let musicData = item
            if(musicData.id && musicData.mid){
              getVkey(musicData.mid).then(res=>{
                if(res.code === ERR_OK){
                    let data = res.data.items[0]
                    let url = `http://dl.stream.qqmusic.qq.com/${data.filename}?vkey=${data.vkey}&guid=7332953645&fromtag=66`
                    songItems.push(createSong(musicData,url,true))
                  }
              })
            }
          })
          return songItems
        },
       changeData(index){
        switch (index) {
            case 0:
              return this.songs0
              break
            case 1:
              return this.songs1
              break
            case 2:
              return this.songs2
              break
            case 3:
              return this.songs3
              break
            case 4:
              return this.songs4
              break
            case 5:
              return this.songs5
              break
            default:
                return false
        }
       },
       changeIndex(index){
        console.log(index+"---"+"index")
        switch (index) {
            case 0://最新
                 this.setNewSongRefsh(index)
                 if(this.songs0.length !== 0 ){
                   return false
                 }
                 this._getSongList()
                 break
            case 1://内地
                this.setNewSongRefsh(index)
                if(this.songs1.length !== 0){
                   return false
                 }
                this._getNewList(1,1,0)
                break
            case 2://港台
                this.setNewSongRefsh(index)
                if(this.songs2.length !== 0){
                   return false
                 }
                this._getNewList(1,2,0)
                break
            case 3://欧美
                 this.setNewSongRefsh(index)
                 if(this.songs3.length !== 0){
                   return false
                 }
                 this._getNewList(1,3,0)
                 break
            case 4://日本
                 this.setNewSongRefsh(index)
                 if(this.songs4.length !== 0){
                   return false
                 }
                 this._getNewList(1,4,0)
                 break
            case 5://韩国
                 this.setNewSongRefsh(index)
                 if(this.songs5.length !== 0){
                   return false
                 }
                 this._getNewList(1,5,0)
                 break
            default:
                return false
        }
       },
       showLoading(index){
          switch (index) {
            case 0:
              return this.songs0.length
              break
            case 1:
              return this.songs1.length
              break
            case 2:
              return this.songs2.length
              break
            case 3:
              return this.songs3.length
              break
            case 4:
              return this.songs4.length
              break
            case 5:
              return this.songs5.length
              break
            default:
                return false
        }
       },
        ...mapMutations({
          setNewSongRefsh : 'SET_NEW_SONG_REFSH'
        })
      },
      computed:{
        computHeight(){
          return window.innerHeight+'px'
        },
        // select(){
        //   return this.newSongRefsh == 0 ? '最新' : '推荐'
        // },
        ...mapGetters([
          'newSongRefsh'
        ])
      },
      components: {
        Switches,
        Tab,
        TabItem,
        Swiper,
        SwiperItem,
        Loading,
        SongList,
        Scroll
      },
      // 检测index变化 请求数据 渲染页面
      watch:{
        index(val){
          this.changeIndex(val)
        }
      }
}
</script>


<style lang="stylus" >
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .slider-enter-active, .slider-leave-active
    transition: all 0.3s
  .slider-enter, .slider-leave-to
    transform : translate3d(100%,0,0)

  #new-song
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom:0
    right: 0
    background: $color-background
    // vux tab 样式修改 已符合项目主题颜色
    .vux-tab 
      background-color :$color-background !important
     .vux-tab-item
       background-size: 0% !important
    .m-header
      height:30px
      margin-bottom :10px
      .switches-wrapper
        margin-top :10px
    .back
      position absolute
      top: 5px
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-xl
        color: $color-theme
    .list
      height:90%
      overflow hidden
      background: $color-background
      // .song-list-wrapper
      //   padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 40%
        transform: translateY(-50%)

</style>
