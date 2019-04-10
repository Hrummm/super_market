<template>
    <div class="systemInfo">

        <el-container>
            <!-- 头部 -->
            <el-header>系统信息</el-header>
            <!-- 内容 -->
            <el-main>
                <el-alert title="消息提示的文案" type="info" show-icon> </el-alert>

                <el-alert title="消息提示的文案" type="info" show-icon> </el-alert>

                <div class="tablebox">
                    <el-row :gutter="20">
                        <el-col :span="11"><div class="grid-content bg-purple">
                                <el-container>
                                    <el-header>销售排行</el-header>
                                    <el-main>
                                        <!-- 销售排行表单 -->
                                        <el-table :data="tableData" style="width: 100%"
                                        :default-sort = "{prop: 'address', order: 'descending'}"
                                        >

                                        <el-table-column prop="date" label="商品名称" sortable width="300">
                                        </el-table-column>
                                    
                                        <el-table-column prop="address" label="销量"  sortable>
                                        </el-table-column>

                                    </el-table>

                                    </el-main>
                                </el-container>
                            </div></el-col>
                        <el-col :span="11" :offset="2"><div class="grid-content bg-purple">
                                <el-container>
                                        <el-header>缺货清单</el-header>
                                        <el-main>
                                            <!-- 缺货list内容 -->
                                            <el-table :data="tableData" style="width: 100%">
                                                    <el-table-column prop="date" label="商品名称" width="180">
                                                    </el-table-column>
                                                    <el-table-column prop="name" label="库存" width="180">
                                                    </el-table-column>
                                                    <el-table-column prop="address" label="操作">
                                                    </el-table-column>
                                            </el-table>


                                        </el-main>
                                </el-container>
                            
                            </div></el-col>
                    </el-row>

                </div>

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
          address: '江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '江路 1516 弄'
        }]
      }
    },
}
</script>

<style lang='less'>
    @import './systeminfo.less';
</style>
