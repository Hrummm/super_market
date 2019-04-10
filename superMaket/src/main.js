import Vue from 'vue'
import App from './App.vue'
import router from './router'
//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/base.css'

// 引入封装好的request
import request from './utils/request';

//注册ElementUI
Vue.use(ElementUI);
Vue.prototype.request = request;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
