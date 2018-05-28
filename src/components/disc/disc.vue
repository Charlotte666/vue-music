<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getSongList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  import {getVkey} from 'api/song'
  export default {
    data(){
      return{
        songs: [],
        newSongs:[]
      }
    },
    computed:{
      title(){
        return this.disc.dissname
      },
      bgImage(){
        return this.disc.imgurl
      },
      ...mapGetters([
        'disc'
      ])
    },
    methods:{
      _getSongList(){
        if(!this.disc.dissid){
           this.$router.back()
           return
        }
        getSongList(this.disc.dissid).then((res) =>{
          if(res.code === ERR_OK){
             this.songs = this._normalizeSongs(res.cdlist[0].songlist)
          }
        })
      },
      _normalizeSongs(list){
        list.forEach((musicData) => {
          if(musicData.songid && musicData.albumid){
            getVkey(musicData.songmid).then(res=>{
             if(res.code === ERR_OK){
                let data = res.data.items[0]
                let url = `http://dl.stream.qqmusic.qq.com/${data.filename}?vkey=${data.vkey}&guid=7332953645&fromtag=66`
                this.newSongs.push(createSong(musicData,url))
              }
           })
          }
        })
        return this.newSongs
      }
    },
    components: {
      MusicList
    },
    created(){
      this._getSongList()
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>