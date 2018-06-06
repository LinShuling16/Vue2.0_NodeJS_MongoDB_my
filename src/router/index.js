import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/views/GoodsList'

Vue.use(Router)

export default new Router({
    /*这里mode可以设置路由模式，默认是哈希hash(#),也可以设置为history*/
    mode  :'history',
    routes: [
        {
          path: '/goods/:goodsId/user/:name',
          name: 'GoodsList',
          component: GoodsList
        }
    ]
})
