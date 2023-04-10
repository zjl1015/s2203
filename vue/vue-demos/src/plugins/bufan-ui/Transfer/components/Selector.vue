<template>
   <div class="selector">
      <select @change="selectorChange($event.target.value)">
        <option v-for="(title,index) in titleArray" :key="title" :value="index" >{{ title }}</option>
      </select>
    </div>
</template>
<script setup>
defineProps({
  titleArray:{
    type:Array,
    default:[]
  }
})
const emit = defineEmits(['setTargetIndex'])
const selectorChange = (index)=>{
  emit('setTargetIndex',index)
}
</script>
<style lang="scss" scoped>
</style>