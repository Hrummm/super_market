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
                                              <el-dropdown trigger="click" @command='handleCommand'>
                                                <span class="el-dropdown-link">
                                                    {{account}}<i class="el-icon-arrow-down el-icon--right"></i>
                                                </span>
                                                <el-dropdown-menu slot="dropdown">
                                                    <el-dropdown-item command="personal">个人中心</el-dropdown-item>
                                                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                                                </el-dropdown-menu>
                                                </el-dropdown>
                                    </div>
                                </el-col>
                            </el-row>
                    </div>
                </el-col>
            </el-row>
  </div>
</template>

<script>

import local from '@/utils/local'

export default {
    data(){
        return {
            account:''
        }
    },
        methods:{
            handleCommand(val){
                if(val==='personal'){
                    console.log('个人中心');
                    
                }
                else if(val ==='logout'){
                    local.remove('lululu');

                    this.$message.success('退出成功，欢迎登录')
                    setTimeout(()=>{

                        this.$router.push('/login');
                    },1000)
                }
                
            },
            getCurrentAccount(){
                this.request.get('login/currentaccount')
                            .then(res=>{
                                this.account = res;
                                
                            })
                            .catch(err=>{
                                console.log(err);
                                
                            })
            }
        },
        created(){
            this.getCurrentAccount();
        }
};
</script>

<style lang='less'>
@import "./top.less";
</style>
