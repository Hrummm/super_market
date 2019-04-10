<template>
    <div class="dropdown">
        <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        个人信息<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </div>
</template>

<script>
export default {

}
</script>

<style lang='less'>
    @import './dropdown.less';
</style>
