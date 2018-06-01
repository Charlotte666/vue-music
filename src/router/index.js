import Vue from 'vue'
import Router from 'vue-router'
import rank from 'components/rank/rank'
import recommend from 'components/recommend/recommend'
import search from 'components/search/search'
import singer from 'components/singer/singer'
import SingerDetail from 'components/singer-detail/singer-detail'
import Disc from 'components/disc/disc'
import TopList from 'components/top-list/top-list'
import appShow from 'components/appShow/appShow'
import Splash from 'components/splash/splash'
import UserCenter from 'components/user-center/user-center'
import Type from 'components/type/type'
import TypeAllKey from 'components/type-all-key/type-all-key'
import TypeSong from 'components/type-song/type-song'
import NewSong from 'components/new-song/new-song'
import AlbumDetail from 'components/album-detail/album-detail'



Vue.use(Router)

export default new Router({
  routes: [
    {
         path: "*", 
         redirect: '/splash'
    },
    {
      path:'/splash',
      component: Splash,
    },
    {
      path:'/appShow',
      component: appShow,
      children:[
      {
        path: "", 
        redirect: '/appShow/recommend'
      },
      {
        name: 'recommend',
        path: 'recommend', 
        component: recommend,
        children:[
        {
          path: ':id',
          component: Disc
        },
        {
          path: ':disstid1/:disstid2', 
          component: NewSong
        },
        {
          path: 'album/detail/:albummid', 
          component: AlbumDetail
        }
      ]
    },{
      path: 'rank', 
      component: rank,
      children:[
        {
          path: ':id',
          component: TopList
        }
      ]
    },{
      path: 'search', 
      component: search,
      children:[
        {
          path: ':id',
          component: SingerDetail
        }
    ]
    },{
      path: 'type', 
      component: Type,
      children:[
        {
          path: 'typeAll',
          component: TypeAllKey,
          children:[
            {
             path: ':categoryId/:categoryName',
             component: TypeSong,
             children:[
                {
                  path: ':id',
                  component: Disc
                }
              ]
            }
          ]
        },
        {
          path: ':id',
          component: Disc
        }
    ]
    },{
      path: 'singer', 
      component: singer,
      children:[
        {
          path: ':id',
          component: SingerDetail
        }
    ]
    },{
      path: 'user', 
      component: UserCenter
    }
  ]
  }]
})
