<template>
    <div class="goodsAdd">
            <el-container>
                <el-header>添加商品</el-header>
                <el-main>
                    <!-- 添加商品的输入框 -->
                    <div class="goods-describe">
                        <el-form :model="goodsForm" :rules="rules" ref="goodsForm" label-width="100px" class="demo-ruleForm">
                                <!-- 选择分类 -->
                                <el-form-item label="所属分类" prop="goodsClass">
                                <el-select v-model="goodsForm.goodsClass" placeholder="请选择类别">
                                <el-option label="日用品" value="daily"></el-option>
                                <el-option label="小吃" value="snack"></el-option>
                                <el-option label="饮料" value="drink"></el-option>
                               
                                </el-select>
                                </el-form-item>
                                <!-- 商品条形码 -->
                                 <el-form-item label="商品条形码" prop="barcode">
                                <el-input v-model="goodsForm.barcode" disabled></el-input>
                                <el-button type="primary" @click = 'getBarCode'>生成条形码</el-button>
                                </el-form-item>
                                <!-- 商品名称 -->
                                   <el-form-item label="商品名称" prop="name">
                                <el-input v-model="goodsForm.name"></el-input>
                                </el-form-item>
                                <!-- 商品售价 -->
                                   <el-form-item label="商品售价" prop="price">
                                <el-input v-model="goodsForm.price"></el-input>
                                </el-form-item>
                                <!-- 是否促销 -->
                                   <el-form-item label="是否促销" prop="discount">
                                <el-radio-group v-model="goodsForm.discount">
                                <el-radio label="是"></el-radio>
                                <el-radio label="否"></el-radio>
                                </el-radio-group>
                                </el-form-item>
                                <!-- 商品简介 -->
                                <el-form-item label="商品简介" prop="desc">
                                <el-input type="textarea" v-model="goodsForm.desc"></el-input>
                                </el-form-item>
                               
  
                                <el-form-item>
                                <el-button type="primary" @click="submitForm">添加</el-button>
                                <el-button type="success" @click="resetForm">重置</el-button>
                                </el-form-item>
                        </el-form>
                    </div>


                </el-main>
            </el-container>


    </div>
</template>

<script>

import { getBarCode } from "@/utils/barcode";
export default {
    data() {
      return {
        goodsForm: {
          name: '',
          goodsClass: '',
          barcode: '',
          price: '',
          discount:'',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          goodsClass: [
            { required: true, message: '请选择类别', trigger: 'change' }
          ],
          barcode: [
            { required: true, message: '请创建商品条形码', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请输入价格', trigger: 'blur' }
          ],
          discount: [
            {  required: true, message: '请选择是否打折', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请输入商品描述', trigger: 'blur' }
          ]
        },
      };
    },
    methods: {
      getBarCode(){
        this.goodsForm.barcode = getBarCode();
      },
      submitForm() {
      this.$refs.goodsForm.validate(valid => {
          if(valid){
                  let params = {
            name:this.goodsForm.name,
            goodsClass:this.goodsForm.goodsClass,
            barcode: this.goodsForm.barcode,
            price: this.goodsForm.price,
            discount:this.goodsForm.discount,
            desc: this.goodsForm.desc
          }
          this.request.post('/goods/goodsAdd',params)
                      .then(res=>{
                        let{code,reason} = res;
                        if(code===0){
                          this.$message.success(reason);

                          this.$router.push('/home/goodsmanage');
                        }
                        else if(code===1){
                          this.$message.error(reason)
                        }
                        
                      })
                      .catch(err=>{
                        console.log(err);
                        
                      })
          }
          else{
            return;
          }
    
      })
      },
      resetForm() {
        
      }
    }
}
</script>

<style lang='less'>
  @import './goodsadd.less';
</style>
