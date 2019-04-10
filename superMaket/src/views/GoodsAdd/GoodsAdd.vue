<template>
    <div class="goodsAdd">
            <el-container>
                <el-header>添加商品</el-header>
                <el-main>
                    <!-- 添加商品的输入框 -->
                    <div class="goods-describe">
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                                <!-- 选择分类 -->
                                <el-form-item label="活动区域" prop="region">
                                <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                                </el-form-item>
                                <!-- 商品条形码 -->
                                 <el-form-item label="商品条形码" prop="name">
                                <el-input v-model="ruleForm.name"></el-input>
                                <el-button type="primary">生成条形码</el-button>
                                </el-form-item>
                                <!-- 商品名称 -->
                                   <el-form-item label="商品名称" prop="name">
                                <el-input v-model="ruleForm.name"></el-input>
                                </el-form-item>
                                <!-- 商品售价 -->
                                   <el-form-item label="商品售价" prop="name">
                                <el-input v-model="ruleForm.name"></el-input>
                                </el-form-item>
                                <!-- 是否促销 -->
                                   <el-form-item label="是否促销" prop="resource">
                                <el-radio-group v-model="ruleForm.resource">
                                <el-radio label="是"></el-radio>
                                <el-radio label="否"></el-radio>
                                </el-radio-group>
                                </el-form-item>
                                <!-- 商品简介 -->
                                <el-form-item label="商品简介" prop="desc">
                                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                                </el-form-item>
                               

                                
                              
                                
                               
                               

                                
                                <el-form-item>
                                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                                </el-form-item>
                        </el-form>
                    </div>


                </el-main>
            </el-container>


    </div>
</template>

<script>
export default {
    data() {
      return {
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style lang='less'>
  @import './goodsadd.less';
</style>
