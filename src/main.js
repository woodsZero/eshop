// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入自适应屏幕js
import './assets/js/remScale.js'
// 引入重置样式
import './assets/css/reset.css'
// 引入vant  UI框架
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
// 引入axios并挂载到原型链
import axios from 'axios'
Vue.prototype.$axios = axios
// 引入qs模块并挂载到原型链上
import qs from 'qs'
Vue.prototype.$qs = qs
// jquery使用


// 引入api接口，并挂载到原型链(未用到接口，暂不引用)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
