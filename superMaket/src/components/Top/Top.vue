<template>
  <div class="top">
            <el-row :gutter="20">

            <!-- 头部标题 -->
                <el-col :span="20">
                    <div class="grid-content bg-purple title">
                    <i class="el-icon-menu"></i>
                    超市后台管理系统
                    </div>
                </el-col>
            <!-- 个人头像部分 -->
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                            <el-row>
                                <!-- 头像 -->
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                      
                                        <img src="../../assets/u.jpg" class='avatar'>
                                        
                                    </div>
                                </el-col>
                                <!-- 下拉菜单 -->
                                <el-col :span="12">
                                    <div class="grid-content bg-purple-light">
                                            <!-- 下拉组件 -->
                                            <Dropdown></Dropdown>
                                    </div>
                                </el-col>
                            </el-row>
                    </div>
                </el-col>
            </el-row>
  </div>
</template>

<script>

import Dropdown from '@/components/Dropdown/Dropdown.vue'

export default {
    components:{
        Dropdown
    }
};
</script>

<style lang='less'>
@import "./top.less";
</style>
