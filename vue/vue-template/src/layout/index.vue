<template>
  <div class="layout-main">
    <SideBarVue :is-collapse="isCollapse"></SideBarVue>
    <div class="content-container">
      <div class="nav">
        <div class="toggle-menu">
          <i v-show="!isCollapse" @click="toggleMenu(true)" class="el-icon-s-fold"></i>
          <i v-show="isCollapse" @click="toggleMenu(false)" class="el-icon-s-unfold"></i>
        </div>
         <Breadcrumb></Breadcrumb>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>

import SideBarVue from './components/SideBar.vue'
import Breadcrumb from './components/Breadcrumb.vue'
export default {
  data(){
    return {
      isCollapse:false
    }
  },
  computed: {
    routerList() {
      return this.$router.options
    }
  },
  components: {
    SideBarVue,
    Breadcrumb
  },
  created() {
    console.log(this.$router)
  },
  methods:{
    toggleMenu(toggle){
      console.log("toggle==>",toggle);
      this.isCollapse = toggle
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-main {
  display: flex;
  .nav{
    display: flex;
    .toggle-menu{
      height: 50px;
      line-height: 50px;
      cursor: pointer;
    }
  }
}
</style>