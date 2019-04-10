<template>
    <div class="accountManage">
        <el-container>
                <el-header>账号管理</el-header>
                <!-- userlist -->
                <div class="userlist">
                    <el-main>
                        <el-table :data="tableData" style="width: 100%">
                            <el-table-column label="姓名" width="380">
                                <template slot-scope="scope">
                                         <p>{{ scope.row.name }}</p>
                                </template>
                            </el-table-column>

                            <el-table-column label="用户组" width="380">
                                <template slot-scope="scope">
                                    <i class="el-icon-time"></i>
                                    <span style="margin-left: 10px">{{ scope.row.usergroup }}</span>
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
export default {
    data(){
        return{
              tableData: [{
                usergroup: '普通',
                name: '王小虎',

                }, {
                usergroup: '中等',
                name: '王小虎',
               
                }, {
                usergroup: '中等',
                name: '王小虎',
             
                }, {
                usergroup: '中等',
                name: '王小虎',
               
                }
             ]
      }
    },
        methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
}

</script>

<style>

</style>
