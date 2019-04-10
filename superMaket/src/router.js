import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    //重定向使一进入页面就跳转到登录界面
    {
      path:'/',
      redirect:'/login'
    },
    //登录界面
    {
      path:'/login',
      component:()=>import('./views/Login/Login.vue')
    },
    //后台主界面
    {
      path:'/home',
      component:()=>import('./views/Home/Home.vue'),
      children:[
        {
          path:'/home',
          redirect:'/home/systeminfo'
        },
        //系统信息
        {
          path:'/home/systeminfo',
          component:()=>import('./views/SystemInfo/SystemInfo.vue')
        },
        //添加账号
        {
          path:'/home/accountadd',
          component:()=>import('./views/AccountAdd/AccountAdd.vue')
        },
        //账号管理
        {
          path:'/home/accountmanage',
          component:()=>import('./views/AccountManage/AccountManage.vue')
        },
        //密码修改
        {
          path:'/home/passwordmodify',
          component:()=>import('./views/PasswordModify/PasswordModify.vue')
        },
        //添加商品
        {
          path:'/home/goodsadd',
          component:()=>import('./views/GoodsAdd/GoodsAdd.vue')
        },
        //商品管理
        {
          path:'/home/goodsmanage',
          component:()=>import('./views/GoodsManage/GoodsManage.vue')
        },
        //销售统计
        {
          path:'/home/saletotal',
          component:()=>import('./views/SaleTotal/SaleTotal.vue')
        },
        //进货统计
        {
          path:'/home/stocktotal',
          component:()=>import('./views/StockTotal/StockTotal.vue')
        }
      ]
    }

  ]
})