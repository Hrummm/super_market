<template>
    <div class="accountManage">
        <el-container>
                <el-header>账号管理</el-header>
                <!-- userlist -->
                <div class="userlist">
                    <el-main>
                        <el-table :data="tableData" style="width: 100%">
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
                                <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-main>
                </div>

                <!-- 分页 -->
                 <el-pagination
                    :current-page="1"
                    :page-sizes="[1, 5, 10, 15]"
                    :page-size="5"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="4">
                </el-pagination>
                
        </el-container>
    </div>
</template>

<script>
import moment from 'moment';
export default {
    data(){
        return{
              tableData: []
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
    created(){
        this.request.get('/account/accountlist')
                    .then(res=>{
                        this.tableData = res;
                        
                    })
                    .catch(err=>{
                        console.log(err);
                        
                    })
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
