import {playMode} from 'common/js/config'
import {loadSearch,loadPlay,loadFavorite} from 'common/js/cache'
const state = {
    singer: {},
    playing: false,
    fullScreen: false,
    playlist: [],
    sequenceList: [],
    mode:playMode.sequence,
    currentIndex: -1,
    disc: {},
    topList: {},
    hotSearchList: {},
    searchHistory: loadSearch(),
    playHistory: loadPlay(),
    favoriteList: loadFavorite(),
    newSongRefsh:-1 //控制new-song页面刷新
}

export default state