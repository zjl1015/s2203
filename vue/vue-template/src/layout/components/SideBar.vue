<template>
  <div class="menu-container">
   
    <el-menu
      :collapse="isCollapse"
      class="menu-demo"
      mode="vertical"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#ff00ff"
      :unique-opened="false"
      menu-trigger="hover"
    >
      <el-submenu index="1">
        <template slot="title">选项一</template>
        <el-menu-item index="1-1"> 选项1-1 </el-menu-item>
        <el-menu-item index="1-2"> 选项1-2 </el-menu-item>
        <el-menu-item index="1-3"> 选项1-3 </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">选项二</template>
        <el-menu-item index="2-1"> 选项2-1 </el-menu-item>
        <el-menu-item index="2-2"> 选项2-2 </el-menu-item>
        <el-menu-item index="2-3"> 选项2-3 </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  props:{
    isCollapse:{
      type:Boolean,
      default:false
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-container {
  width: 200px;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden !important;
  background-color: #304156;

  &::-webkit-scrollbar-track-piece {
    // background: #d3dce6;
    background: skyblue;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    // background: #99a9bf;
    background: red;
    border-radius: 20px;
  }
  // &::-webkit-scrollbar {
  //   /* 设置水平滚动条的高度，垂直滚动的宽度 */
  //   // height: 0;
  //   // width: 0;
  // }

  // &::-webkit-scrollbar-thumb {
  //   /* 设置滚动条里面的滑块样式 */
  //   background-color: red;
  // }

  &::-webkit-scrollbar-track {
    /* 设置滚动条的轨道背景样式 */
    background-color: orange;
  }
 
  .menu-demo {
    // height: 100%;
    width: 200px;
    background-color: #304156;
    ::v-deep .el-submenu .el-menu-item{
       background-color: red !important;
    }
  }
  //  .menu-demo:not(.el-menu--collapse) {
  //   width: 100px;
  // }
}
</style>