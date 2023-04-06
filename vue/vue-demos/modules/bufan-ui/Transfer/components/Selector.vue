<template>
  <select @change="selectChange($event.target.value)">
    <option v-for="(title, index) in data" :key="index" :value="index">
      {{ title }}
    </option>
  </select>
</template>
<script setup>
defineProps({
  data: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['selectChange'])
const selectChange =(value)=>{
  emit('selectChange',value)
}
</script>
<style lang='scss' scoped>
</style>
