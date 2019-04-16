<template>
    <div class="goodsManage">
        <el-container>
            <el-header>Header</el-header>
            <el-main>

                  <!-- 查询 -->
                  <div>
                    <el-form size="mini" :inline="true" :model="searchForm" class="demo-form-inline">
                      <!-- 分类 -->
                      <el-form-item label="选择分类" prop="goodsClass">
                          <el-select v-model="searchForm.goods_class" placeholder="请选择分类">
                          <el-option label="全部" value="all"></el-option>
                          <el-option label="日用品" value="daily"></el-option>
                          <el-option label="小吃" value="snack"></el-option>
                          <el-option label="饮料" value="drink"></el-option>
                      
                          </el-select>
                      </el-form-item>
                      <!-- 关键字 -->
                      <el-form-item label="关键字">
                        <el-input v-model="searchForm.keyword" placeholder="商品名称或条形码"></el-input>
                      </el-form-item>
                      <!-- 查询按钮 -->
                      <el-form-item>
                        <el-button type="primary" @click="search">查询</el-button>
                      </el-form-item>
                    </el-form>
                  </div>

              <!-- 商品列表 -->
                        <el-table ref="goodsTableData" :data="goodsTableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                         <!-- 选择框 -->
                        <el-table-column type="selection" width="55"></el-table-column>

                        <!-- 商品条形码 -->
                        <el-table-column prop="barcode" label="商品条形码"></el-table-column>

                        <!-- 商品名称 -->
                        <el-table-column prop="goods_name" label="商品名称"></el-table-column>

                        <!-- 所属分类 -->
                        <el-table-column prop="goods_class" label="所属分类"></el-table-column>

                        <!-- 售价 -->
                        <el-table-column prop="price" label="售价"></el-table-column>

                        <!-- 是否促销 -->
                        <el-table-column prop="discount" label="是否促销"></el-table-column>


              <!-- 操作 -->
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <!-- 修改按钮 -->
                    <el-button
                        size="mini"
                        type="primary"
                        @click="handleEdit(scope.row.id)"
                        >编辑
                        <i class="el-icon-edit"></i>
                    </el-button>
                    <!-- 删除按钮 -->
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row.id)"
                        >删除
                        <i class="el-icon-delete"></i>
                    </el-button>
                </template>
            </el-table-column>

        </el-table>


              <!-- 修改模态框 -->
              <el-dialog width="400px" title="修改账号" :visible.sync="dialogFormVisible">
                            <!-- 修改表单 -->
                            <el-form :model="editForm" :rules="rules" ref="editForm">
                                        <!-- 选择分类 -->
                                        <el-form-item label="所属分类" prop="goods_class">
                                        <el-select v-model="editForm.goods_class" placeholder="请选择类别">
                                        <el-option label="日用品" value="daily"></el-option>
                                        <el-option label="小吃" value="snack"></el-option>
                                        <el-option label="饮料" value="drink"></el-option>
                                      
                                        </el-select>
                                        </el-form-item>
                                        <!-- 商品条形码 -->
                                        <el-form-item label="商品条形码" prop="barcode">
                                        <el-input v-model="editForm.barcode"></el-input>
                                        <el-button type="primary" @click='getBarCode'>生成条形码</el-button>
                                        </el-form-item>
                                        <!-- 商品名称 -->
                                          <el-form-item label="商品名称" prop="goods_name">
                                        <el-input v-model="editForm.goods_name"></el-input>
                                        </el-form-item>
                                        <!-- 商品售价 -->
                                          <el-form-item label="商品售价" prop="price">
                                        <el-input v-model="editForm.price"></el-input>
                                        </el-form-item>
                                        <!-- 是否促销 -->
                                          <el-form-item label="是否促销" prop="discount">
                                        <el-radio-group v-model="editForm.discount">
                                        <el-radio label="是"></el-radio>
                                        <el-radio label="否"></el-radio>
                                        </el-radio-group>
                                        </el-form-item>
                                        <!-- 商品简介 -->
                                        <el-form-item label="商品简介" prop="goods_desc">
                                        <el-input type="textarea" v-model="editForm.goods_desc"></el-input>
                                        </el-form-item>
                          </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="saveEdit">确 定</el-button>
                </div>
              </el-dialog>

              <!-- 批量删除&取消选择 -->
              <div style="margin-top: 10px;margin-left:30px">
                <el-button type="danger" @click="batchDel">批量删除</el-button>
                <el-button type="success" @click="cancelSelect">取消选择</el-button>
              </div>


                       <!-- 分页 -->
                 <el-pagination
                    style="margin:0 auto;width:500px"
                    @size-change='sizeChange'
                    @current-change = 'currentChange'
                    :current-page="this.pagething.currentpage"
                    :page-sizes="[1, 5, 10, 15]"
                    :page-size="this.pagething.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="this.pagething.total"
                    >
                  </el-pagination>

            </el-main>

        </el-container>
    </div>
</template>

<script>
import { getBarCode } from "@/utils/barcode";


export default {
         data() {
            return {
              pagething:{
                total:6,
                pagesize:5,
                currentpage:1,

              },
              searchForm:{
                goods_class: '',
                keyword: ''
              },
            goodsTableData:[],
            dialogFormVisible:false, 
             editForm: { // 修改模态框的数据对象
                // goodsClass: '',
                // barcode: '',
                // name:'',
                // barcode:'',
                // price:'',
                // discount:''
            },
            goodsForm:{},
            rules: {
                  goods_name: [
                    { required: true, message: '请输入商品名称', trigger: 'blur' },
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
              selectedId:[],

            }
        },
        methods:{
           search(){
      
              this.getCurrentListbysearchandpage();
          },
            currentChange(val){
              this.pagething.currentpage = val;              
              this.getCurrentListbysearchandpage(); 
            
            },
            sizeChange(val){
                this.pagething.pagesize = val;
                this.getCurrentListbysearchandpage();
            },

          handleSelectionChange(val){
              this.selectedId = val.map(v =>v.id);  
          },
          batchDel(){
                if(!this.selectedId.length){
                        this.$message.error('请选择要删除的选项')
                        return;
                    }
                else{
                     this.$confirm('你确定要删除吗?', '温馨提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                            })
                            .then(()=>{
                                let params = {selectedIds:this.selectedId}
            
                                  this.request.get('/goods/batchdel',params)
                                              .then(res=>{
                                                let{code,reason} = res;
                                                if(code===0){
                                                  this.$message.success(reason)
                                                  this.getCurrentListbysearchandpage();
                                                }
                                                else if(code===1){
                                                  this.$message.error(reason)
                                                }
                                                
                                              })
                                              .catch(err=>{
                                                console.log(err);
                                                
                                              })
                            })
                            .catch(()=>{
                                 this.$message({
                                    type: 'info',
                                    message: '已取消删除'
                                  })
                            })
                }


              this.$confirm('你确定要删除吗?', '温馨提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                            })
                            .then(()=>{
                                let params = {selectedIds:this.selectedId}
            
                                  this.request.get('/goods/batchdel',params)
                                              .then(res=>{
                                                let{code,reason} = res;
                                                if(code===0){
                                                  this.$message.success(reason)
                                                  this.getCurrentList();
                                                }
                                                else if(code===1){
                                                  this.$message.error(reason)
                                                }
                                                
                                              })
                                              .catch(err=>{
                                                console.log(err);
                                                
                                              })
                            })
                            .catch(()=>{
                                 this.$message({
                                    type: 'info',
                                    message: '已取消删除'
                                  })
                            })
              
          },
          cancelSelect(){
            this.$refs.goodsTableData.clearSelection();

          },
          getBarCode(){
            this.editForm.barcode = getBarCode();
          },
         
          saveEdit(){//拟态框的保存键
              this.dialogFormVisible = false;
              let params = {
                goods_class : this.editForm.goods_class,
                barcode:this.editForm.barcode,
                goods_name:this.editForm.goods_name,
                price:this.editForm.price,
                discount:this.editForm.discount,
                goods_desc:this.editForm.goods_desc,
                id : this.editForm.id
              }
         
              
              this.request.post('/goods/saveedit',params)
                          .then(res=>{
                            let{code,reason} = res;
                            if(code===0){
                              this.$message.success(reason);
                              this.getCurrentListbysearchandpage();

                            }
                            else if(code===1){
                              this.$message.error(reason)

                            }
                            
                          })
                          .catch(err=>{
                            console.log(err);
                            
                          })
          },
          handleEdit(id){
            this.dialogFormVisible = true;
            this.request.get('goods/edit',{id})
                        .then(res=>{
                          this.editForm = res[0]
                          
                          
                        })
                        .catch(err=>{
                          console.log(err);
                          
                        })
            
          },
          handleDelete(id){

              this.$confirm('你确定要删除吗?', '温馨提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                            })
                   .then(()=>{
                        this.request.get('/goods/del',{id})
                          .then(res=>{
                            let{code,reason} = res;
                            if(code===0){
                              this.$message.success(reason);
                              this.getCurrentListbysearchandpage();
                            }
                            else if(code===1){
                              this.$message.error(reason)
                              }  
                          })
                          .catch(err=>{
                            console.log(err);
                          })

                        })
                    .catch(()=>{
                           this.$message({
                            type: 'info',
                            message: '已取消删除'
                    })
                    })         




            
            
          },

          getCurrentListbysearchandpage(){


               let params = {
                  currentpage: this.pagething.currentpage,
                  pagesize :this.pagething.pagesize,
                  goods_class:this.searchForm.goods_class,
                  keyword:this.searchForm.keyword
                  }                
                  this.request.get('/goods/goodslist',params)
                        .then(res=>{
                            let {total,data} = res;
                            this.pagething.total = total;
                            this.goodsTableData = data;
                    
                            if (!data.length && this.pagething.currentpage !== 1) {
                                this.pagething.currentpage -= 1;
                                this.getCurrentListbysearchandpage();
                            }
                       
                          
                            
                            
                        })
                        .catch(err=>{
                            console.log(err);
                            
                        })
          }


        },
        created(){
          this.getCurrentListbysearchandpage();
        }
}
</script>

<style>

</style>
