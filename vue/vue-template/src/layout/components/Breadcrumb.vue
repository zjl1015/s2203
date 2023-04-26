<template>
    <div class="nav-container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
</template>

<script>
export default {
  name:'BreadCrumb'
}
</script>

<style lang="scss" scoped>
.nav-container{
  height: 50px;
  line-height: 50px;
  padding: 0 10px;
  ::v-deep .el-breadcrumb{
    height: 100%;
    line-height: 50px;
  }
}
</style>