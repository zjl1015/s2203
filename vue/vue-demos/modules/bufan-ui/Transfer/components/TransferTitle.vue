<template>
  <h1 class="list-title">{{ title }}</h1>
</template>
<script setup>
defineProps({
  title:{
    type:String,
    default:'标题'
  }
})
</script>
<style lang='scss' scoped>
.list-title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: normal;
  font-size: 14px;
  height: 30px;
  background-color: #333;
  color: #fff;
  margin: 0;
}
</style>
