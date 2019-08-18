import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Recommend from '../components/recommend/recommend'
import Disc from '../components/disc/disc'
import Rank from '../components/rank/rank'
import Singer from '../components/singer/singer'
import Search from '../components/search/search'

const routes = [
    { path: '/recommend', component: Recommend,children:[{path:':id', component:Disc}]},
    { path: '/rank', component: Rank },
    { path: '/singer', component: Singer },
    { path: '/search', component: Search },
    { path: '/', redirect: '/recommend' }
  ]

  const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
  })

  export default router;