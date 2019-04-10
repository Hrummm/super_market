<template>
    
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      unique-opened
      router
      >

      

      <el-submenu  v-for="(menu,index) in menus" :key="index" :index="(index+1)+''">
        <template slot="title">
          <i :class='menu.iconClass'></i>
          <span>{{menu.title}}</span>
        </template>
        <el-menu-item-group v-for='(item,i) in menu.branch' :key='i'>
          <el-menu-item :index='item.path'>{{item.subtitle}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

    </el-menu>
</template>

<script>
export default {
  data(){
    return {
      menus:[
        {
          icnoClass:'el-icon-menu',
          title:'系统管理',
          branch:[{
            subtitle:'系统信息',
            path:'/home/systeminfo'
            }]
        },{
          icnoClass:'el-icon-rank',
          title:'账号管理',
          branch:[{subtitle:'添加账号',path:'/home/accountadd'},
                  {subtitle:'密码修改',path:'/home/passwordmodify'},
                  {subtitle:'账号管理',path:'/home/accountmanage'}]
        },{
          icnoClass:'el-icon-goods',
          title:'商品管理',
          branch:[{subtitle:'添加商品',path:'/home/goodsadd'},
                  {subtitle:'商品管理',path:'/home/goodsmanage'}]
        },{
          icnoClass:'el-icon-document',
          title:'统计管理',
          branch:[{subtitle:'销售统计',path:'/home/saletotal'},
                  {subtitle:'进货统计',path:'/home/stocktotal'}]
        }
      ]
    }
  }


}
</script>

<style lang='less'>
    @import './leftnav.less';
</style>
