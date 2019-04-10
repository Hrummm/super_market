<template>
    <div class="home">

            <el-container>
              <!-- 左边导航栏 -->
                <el-aside width="280px">
                  <LeftNav></LeftNav>
                </el-aside>

                <el-container>
                  <!-- 头部 -->
                    <el-header height='80px'>
                      <Top></Top>

                    </el-header>
                  <!-- 内容main -->
                    <el-main>
                       <router-view></router-view>
                    </el-main>

                    <!-- 尾部 -->
                    <el-footer>
                      <Bottom></Bottom>
                    </el-footer>
                </el-container>
                
            </el-container>


       
    </div>
</template>

<script>
// 引入组件
import LeftNav from '@/components/LeftNav/LeftNav.vue'
import Top from '@/components/Top/Top.vue'
import Bottom from '@/components/Bottom/Bottom.vue'


export default {
  // 注册组件
      components: {
        LeftNav,Top,Bottom
    }
}
</script>

<style lang='less'>
  @import './home.less';
</style>
