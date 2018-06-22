// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import infiniteScroll from 'vue-infinite-scroll'

import VueLazyLoad from 'vue-lazyload'

import {currency} from './util/currency'

Vue.use(Vuex);

Vue.config.productionTip = false;

//全局过滤器
Vue.filter("currency" , currency);

const store = new Vuex.Store({
    state : {
        nickName  : '',
        cartCount : 0
    },
    mutations : {
        updateUserInfo(state, nickName){
            state.nickName = nickName;
        },
        updateCartCount(state, cartCount){
            state.cartCount += cartCount;
        }   
    }
});

Vue.use(infiniteScroll);
Vue.use(VueLazyLoad,{
    loading:"/static/loading-svg/loading-bars.svg"
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
