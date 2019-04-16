<template>
      <div class="passwordmodify">
        
            <el-container>
            <!--表单标题  -->
            <el-header>修改密码</el-header>
            <!-- 表单内容 -->
            <div class="formcontent">
                 <el-main>
                    <el-form :model="passwordForm" status-icon :rules="rules" ref="passwordForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="原密码" prop="oldPassword">
                        <el-input type="password" v-model="passwordForm.oldPassword" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="新密码" prop="newPassword">
                        <el-input type="password" v-model="passwordForm.newPassword" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="passwordForm.checkPass" autocomplete="off"></el-input>
                    </el-form-item>
                    </el-form>

              

                    <!-- 提交按钮 -->
                    <div class='submitbutton'><el-button round type='success' @click='modify'>修改</el-button></div>
                </el-main> 
            </div>

            </el-container>
    </div>
</template>

<script>
import {passwordReg} from '@/utils/validator'
import local from '@/utils/local'
export default {
   data(){
            // 自定义密码查询函数
            const passwordModify = (rule,value,callback) =>{
                this.request.get('/account/passwordmodify',{value})
                            .then(res=>{
                               let {code,message} = res;
                               if(code===0){
                                   callback();
                               }
                               else if(code===1){
                                    callback(new Error(message));
                               }
                                
                            })
                            .catch(err=>{
                                console.log(err);
                                
                            })
            }


            // 确认密码自定义验证函数
            const confirmPassword = (rule, value, callback) => { 
                // rules: 验证规则对象 value：用户输入的值 callback: 回调函数
                if (value === '') {
                    callback(new Error('确认密码不能为空')) // 输出错误提示信息
                } else if (value !== this.passwordForm.newPassword) {
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
                    if (this.passwordForm.checkPassword !== '') { // 如果确认密码不为空
                        // 触发一致性验证
                        this.$refs.passwordForm.validateField('checkPass')
                    }
                    callback() // 成功回调
                }
            }
            return{
                passwordForm:{
                    oldPassword:'',
                    newPassword:'',
                    checkPassword:''
                },
            
                rules: {
                    // 原密码
                    oldPassword: [ 
                        {required: true, validator:passwordModify, trigger: 'blur'},  
                        
                    ],
                    // 新密码
                    newPassword: [
                    {required: true, validator: checkPassword, trigger: 'blur'} // 自定义验证
                    ],
                    // 确认密码
                    checkPass: [
                        {required: true, validator: confirmPassword, trigger: 'blur'} // 自定义验证
                    ]
                
                },
         
            }
        
        },
        methods:{
          modify(){
                 this.$refs.passwordForm.validate(valid => {
                // 如果所有前端验证都通过 valid就是true 否则就是false
                if (valid) {
                    // 提交数据给后端
                    let params = {
                        // account: this.loginForm.account,
                        password: this.passwordForm.newPassword
                    }
                    this.request.get('/account/comfirmmodify',params)
                                .then(res=>{
                                    let{code,reason} = res;
                                    if(code===0){
                                        this.$message.success(reason);
                                        local.remove('lululu')
                                        this.$router.push('/')
                                    }
                                    else if(code===1){
                                        this.$message.error(reason)

                                    }
                                    
                                })
                                .catch(err=>{
                                    console.log(err);
                                    
                                })
                 
                } else {
                    
                    return
                }
            })
            },
            
                
            
        }
}
</script>

<style lang='less'>
    @import './passwordmodify.less';
</style>
