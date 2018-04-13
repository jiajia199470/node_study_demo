// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'

import './assets/css/base.css'
import './assets/css/checkout.css'
import './assets/css/login.css'
import './assets/css/product.css'
import axios from 'axios'
import infiniteScroll from 'vue-infinite-scroll'//滚动加载
Vue.config.productionTip = false
Vue.prototype.$http = axios;

Vue.use(VueLazyload, {
    loading: '/static/loading-svg/loading-bars.svg',
});
Vue.use(infiniteScroll);//Vue.use()引用vue-infinite-scroll滚动加载插件

// router.push("/goods");//自动跳到goods页面

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
})
