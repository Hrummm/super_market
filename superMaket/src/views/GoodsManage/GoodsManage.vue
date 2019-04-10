<template>
    <div class="goodsManage">
        <el-container>
            <el-header>Header</el-header>
            <el-main>
                <!-- 商品列表 -->
                 <el-table :data="tableData" style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" >

                    <el-table-column prop="date" label="日期" sortable width="300px">
                    </el-table-column>

                    <el-table-column prop="name" label="姓名" sortable width="300px">
                    </el-table-column>

                    <el-table-column prop="name" label="姓名" sortable width="300px">
                    </el-table-column>

                    <el-table-column prop="name" label="姓名" sortable width="300px">
                    </el-table-column>
                   
                </el-table>

                       <!-- 分页 -->
                 <el-pagination
                    :current-page="1"
                    :page-sizes="[1, 5, 10, 15]"
                    :page-size="5"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="4">
                    
                </el-pagination>

            </el-main>

        </el-container>
    </div>
</template>

<script>
export default {
         data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
}
</script>

<style>

</style>
