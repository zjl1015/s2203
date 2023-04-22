<template>
  <input :value="modelValue" @input="inputChangeEvent" />
</template>
<script setup land="ts">
defineProps(['modelValue']);
cosnt emit = defineEmits(['update:modelValue']);
const inputChangeEvent = (event)=>{
  emit('update:modelValue',event.target.value);
}
</script>
<style lang="less" scoped></style>
