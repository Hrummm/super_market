import Vue from 'vue'
import App from './App.vue'
import router from './router'
//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/base.css'

// 引入封装好的request
import request from './utils/request';
import echarts from 'echarts'

import local from '@/utils/local'

//注册ElementUI
Vue.use(ElementUI);
Vue.prototype.request = request;
Vue.prototype.echarts = echarts;

Vue.config.productionTip = false

// 路由守卫
router.beforeEach((to,from,next)=>{
  const token = local.get('lululu');
  if(token){
    next()
  }
  else{
    if(to.path ==='/login'){
      next()
    }
    else{
      next('/login');
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
