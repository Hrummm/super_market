<template>
    <div class="login">
        <div class='login-box'>
            <div class="title">
                <span  class='el-icon-menu'>
                    
               超市后台管理系统
                </span>
            </div>
            <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="账号" prop="account">
                    <el-input type="text" v-model.number="loginForm.account" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="loginForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>


                <el-form-item>
                    <el-button type="primary" @click="submitForm()">提交</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>

            </el-form>
            </div>
        </div>
    
</template>

<script>
//引入表单验证函数
import { passwordReg } from '@/utils/validator';

import local from '@/utils/local'




export default {
    data(){
        // 确认密码自定义验证函数
        const confirmPassword = (rule, value, callback) => { 
            // rules: 验证规则对象 value：用户输入的值 callback: 回调函数
            if (value === '') {
                callback(new Error('确认密码不能为空')) // 输出错误提示信息
            } else if (value !== this.loginForm.password) {
                callback(new Error('两次密码不一致')) // 输出错误提示信息
            } else {
                callback() // 成功 （绿色勾勾）
            }
        }
        // 密码的自定义验证函数
        const checkPassword = (rule, value, callback) => {
            if (value === '') { // 非空验证
                callback(new Error('密码不能为空')) // 错误提示
            } else if (!passwordReg(value)) {
                callback(new Error('以字母开头，长度在3~6之间，只能包含字符、数字和下划线'))  // 错误提示
            } else {
                if (this.loginForm.checkPass !== '') { // 如果确认密码不为空
                    // 触发一致性验证
                    this.$refs.loginForm.validateField('checkPass')
                }
                callback() // 成功回调
            }
        }
        return{
            loginForm:{
                account:'',
                password:'',
                checkPass:''
            },
           
                rules: {
                // 账号
                account: [ //内置的
                    {required: true, message: '请输入账号', trigger: 'blur'},  // 非空
                    {min: 3, max: 6, message: '账号长度 3~6 位', trigger: 'blur'} // 长度
                ],
                // 密码
                password: [
                   {required: true, validator: checkPassword, trigger: 'blur'} // 自定义验证
                ],
                // 确认密码
                checkPass: [
                    {required: true, validator: confirmPassword, trigger: 'blur'} // 自定义验证
                ]
            
            }
        }
       
    },
    methods:{
               // 登录
        submitForm() {
            this.$refs.loginForm.validate(valid => {
                // 如果所有前端验证都通过 valid就是true 否则就是false
                if (valid) {
                    // 提交数据给后端
                    let params = {
                        account: this.loginForm.account,
                        password: this.loginForm.password
                    }
                    this.request.post('/login/checklogin',params)
                                .then(res=>{
                                    let{code,reason,token} = res;
                                    if(code===0){
                                        // 把token 存入浏览器
                                        local.save('lululu',token)
                                        this.$message.success(reason)
                                        //路由跳转
                                        this.$router.push('/home');
                                    }
                                    else if(code===1){
                                        this.$message.error(reason)
                                    }
                                })
                                .catch(err=>{
                                    console.log(err);
                                    
                                })

                    
                  
                } else {
                    console.log('前端验证不通过，不允许提交！')
                    return
                }
            })
        },
        // 重置
        resetForm() {
            // 重置表单
            this.$refs.loginForm.resetFields()
        }
    }

}
</script>

<style lang='less'>
 @import "./login.less";
   
</style>
