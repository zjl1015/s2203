<template>
  <div>
    <CIput v-for="item in list" :key="item.id" v-model="item"></CIput>
  </div>
</template>
<script setup lang="ts">
  import {getDevLogType} from '@/api/public'
  import CIput from '@/components/CIput.vue'
import { onBeforeMount, ref } from 'vue';
  //  要求  v-model实现数据双向绑定

  // 主要考点：v-model替换掉了那两个语法糖

  // 1. 从components文件夹中导入子组件CInput

  // 2. 创建Dict[]类型的数组，变量命名为：list，

  // 3. 在dom未渲染前，调用接口 getDevLogType ，将返回值(res.data)存储到list中

  // 4. 循环渲染子组件CInput，并将list中每一项的dictDesc, 通过v-model传入子组件CInput

  // 5. 在子组件CInput中修改传入的值，并更新父组件v-model的绑定值
  const list = ref([])
  onBeforeMount(async ()=>{
    const res = await getDevLogType()
    list.value = res.data
  })
</script>
<style lang="less" scoped></style>
