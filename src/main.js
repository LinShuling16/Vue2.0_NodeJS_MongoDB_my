// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import infiniteScroll from 'vue-infinite-scroll'

import VueLazyLoad from 'vue-lazyload'

import {currency} from './util/currency'

Vue.config.productionTip = false;

//全局过滤器
Vue.filter("currency" , currency);

Vue.use(infiniteScroll);
Vue.use(VueLazyLoad,{
    loading:"/static/loading-svg/loading-bars.svg"
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
