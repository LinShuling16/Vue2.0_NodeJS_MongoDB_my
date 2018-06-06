import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/views/GoodsList'
import Title from '@/views/Title'
import Image from '@/views/Image'
import Cart from '@/views/Cart'

Vue.use(Router)

export default new Router({
    //动态路由测试
    /*这里mode可以设置路由模式，默认是哈希hash(#),也可以设置为history*/
    // mode  :'history',
    // routes: [
    //     {
    //       path: '/goods/:goodsId/user/:name',
    //       name: 'GoodsList',
    //       component: GoodsList
    //     }
    // ]
    
    //嵌套路由测试
    mode  :'history',
    routes: [
        {
          path: '/goods',
          name: 'GoodsList',
          component: GoodsList,
          children :[
              {
                /*
                
                注意这里不要写成"/title",
                写成"/title"是绝对地址,
                而不是/goods下的title。

                */
                path : 'title',
                name : 'title',
                component : Title
              },
              {
                path : 'img',
                name : 'img',
                component : Image
              }
          ]
        },
        {
            path: '/cart',
            name: 'Cart',
            component: Cart
        }
    ]
    

})
