// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vant, {Toast} from 'vant'
import 'vant/lib/index.css';
import reset from '../src/assets/css/reset.css'
import QS from 'qs'
import JQ from '../src/assets/jquery-3.5.1'
import { Lazyload } from 'vant';
Vue.use(Lazyload);

// import axios from 'axios'
// //设置访问根路径
// axios.defaults.baseURL = "http://localhost:9000"
// //挂载axios
// Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.use(vant)
Vue.use(QS)

Vue.use(Toast)
Vue.prototype.$toast = Toast



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
