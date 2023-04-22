<template>
    <CIput  v-for="item in list" :key="item.id" v-model="item.dictDesc"></CIput> 
</template>
<script setup>
import { onBeforeMount,ref } from 'vue'
import CIput from '../component/CIput.vue';
import {getDevLogType} from '@/api/public'
const list = ref([])
onBeforeMount(async ()=>{
    const res = await getDevLogType()
    list.value = res.data
})
</script>
<style lang="scss" scoped></style>