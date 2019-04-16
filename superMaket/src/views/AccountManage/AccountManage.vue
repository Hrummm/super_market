<template>
  <div class="accountManage">
    <el-container>
      <el-header>账号管理</el-header>
      <!-- userlist -->
      <div class="userlist">
        <el-main>
          <el-table
            @selection-change="handleSelectionChange"
            ref="accountTableData"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
          >
            <!-- 选择框 -->
            <el-table-column type="selection" width="55"></el-table-column>

            <el-table-column label="姓名" width="260">
              <template slot-scope="scope">
                <p>{{ scope.row.account }}</p>
              </template>
            </el-table-column>

            <el-table-column label="用户组" width="260">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.user_group }}</span>
              </template>
            </el-table-column>

            <el-table-column label="时间" width="260">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.create_date | filterDate }}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="edit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="del(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </div>
      <!-- 修改模态框 -->
      <el-dialog width="400px" title="修改账号" :visible.sync="dialogFormVisible">
        <!-- 修改表单 -->
        <el-form :model="editForm" :rules="rules" ref="editForm">
          <!-- 账号 -->
          <el-form-item
            prop="account"
            style="width: 320px;"
            label="账号"
            :label-width="formLabelWidth"
          >
            <el-input v-model="editForm.account" auto-complete="off"></el-input>
          </el-form-item>

          <!-- 用户组 -->
          <el-form-item prop="userGroup" label="用户组" :label-width="formLabelWidth">
            <el-select v-model="editForm.userGroup" placeholder="请选择用户组">
              <el-option label="普通" value="normal"></el-option>
              <el-option label="中等" value="middle"></el-option>
              <el-option label="高级" value="top"></el-option>
            </el-select>
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
        style="margin:0 auto"
        @size-change='sizeChange'
        @current-change = 'currentChange'
        :current-page="this.pagething.currentpage"
        :page-sizes="[1, 5, 10, 15]"
        :page-size="this.pagething.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.pagething.total"
      ></el-pagination>
    </el-container>
  </div>
</template>

<script>
import moment from 'moment';
export default {
    data(){
        return{
            pagething:{//分页的内容
                total:3,
                currentpage:1,
                pagesize:5
            },
            tableData: [],
            editForm: { // 修改模态框的数据对象
                account: '',
                userGroup: ''
            },
            editId: '', // 要修改的数据的id
            dialogFormVisible: false,  // 模态框的显示和隐藏状态
            formLabelWidth: '100px', // 修改表单标签的宽度
            rules: { // 修改表单验证规则
        // 账号
            account: [
            {required: true, message: '账号不能为空', trigger: 'blur'}, // 非空
            {min: 2, max: 6, message: '账号长度 2~6 位', trigger: 'blur'} // 非空
            ]
            },
            // 存放批量删除的id数组
            selectedId:[],
        }
    },
    methods: {
        currentChange(val){
            this.pagething.currentpage = val;
        this.getAccountList(); 
            
        },
        sizeChange(val){
            this.pagething.pagesize = val;
        this.getAccountList();

        },
        cancelSelect(){
            this.$refs.accountTableData.clearSelection();
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
                            }).then(()=>{

                                 let params = {id : this.selectedId};
                        this.request.get('/account/batchDel',params)
                                    .then(res=>{
                                        let {code,reason} = res
                                        if(code===0){
                                            this.$message.success(reason)
                                            this.getAccountList();  
                                    }
                                        else if(code ===1){
                                            this.$message.error(reason);
                                        }    
                                    })
                                    .catch(err=>{
                                        console.log(err);              
                                    })

                            }).catch(()=>{
                                 this.$message({
                            type: 'info',
                            message: '已取消删除'
                            })
                            })
                    }
       
        },
        handleSelectionChange(val){
            this.selectedId = val.map(v =>v.id);    
        
                    
            
        },
        getAccountList(){
              let params = {
                currentpage: this.pagething.currentpage,
                pagesize :this.pagething.pagesize
            }
           this.request.get('/account/getaccountlist',params)
                        .then(res=>{
                            let {total,data} = res;
                           this.pagething.total = total;
                           this.tableData = data;
                    
                           if (!data.length && this.pagething.currentpage !== 1) {
                               this.pagething.currentpage -= 1;
                               this.getAccountList();
                           }
                           
                        })
                        .catch(err=>{
                            console.log(err);
                            
                        })
        },

        edit(index, row) {
            this.dialogFormVisible = true;
            this.editId = row.id;
          this.request.get('/account/accountedit',row)
          .then(res=>{
              this.editForm.account = res[0].account;
              this.editForm.userGroup = res[0].user_group         
          })
          .catch(err=>{
              console.log(err);   
          })
        
        },
        del(index, row) {        
            
            this.$confirm('你确定要删除吗?', '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(()=>{
                        this.request.get('/account/del',row)
                                    .then(res=>{
                                        let { code, reason } = res;
                                            if (code === 0) {
                                                    //成功
                                                    this.$message({
                                                    type: 'success',
                                                    message: reason
                                                    });
                                                    //请求列表
                                                    this.getAccountList();
                                                    //刷新页面
                                                    this.$router.push("/home/accountmanage");
                                                
                                                    
                                            } else if (code === 1) {
                                                //失败
                                                this.$message.error(reason);
                                            }
                                        
                                    })
                                    .catch(err=>{
                                        console.log(err);
                                        
                                    })
                    }).catch(()=>{
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                    })
                    })
                        
        },
        saveEdit(row){
            this.$refs.editForm.validate(valid=>{
                if(valid){
                        this.dialogFormVisible = false;

                        // 收集参数
                        let params = {
                        account: this.editForm.account,
                        userGroup: this.editForm.userGroup,
                        editId: this.editId
                        }
                        console.log(params);
                        
                        this.request.post('/account/saveedit',params)
                                .then(res=>{
                                        let {code, reason} = res;
                                        if (code === 0) {
                                        // 弹提示 
                                        this.$message({
                                            type: 'success',
                                            message: reason
                                        })
                                        // 刷列表
                                        this.getAccountListByPage()
                                        
                                        } else if (code === 1) {
                                        // 弹提示
                                        this.$message.error(reason)
                                        }

                                       
                                })
                                .catch(err=>{
                                    console.log(err);                               
                                })

                                 this.getAccountList();
                }else{
                    return false;
                }


            })
        }

    },
    created(){
        this.getAccountList();
       
    },
    filters:{
        filterDate(time){
            return moment(time).format('YYYY-MM-DD hh:mm:ss')
        }
    }
}

</script>

<style>
</style>
