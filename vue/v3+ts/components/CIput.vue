<template>
   <!-- <input :value="modelValue" @input="inputChangeEvent" /> -->
   <input type="text" v-model="value">
</template>
<script setup land="ts">
  const props = defineProps(['modelValue'])
  const emit = defineEmits(['update:modelValue'])
//   const inputChangeEvent = (event)=>{
//     emit('update:modelValue',event.target.value)
//   }

 const value = computed({
    get(){
        return props.modelValue
    },
    set(val){
        emit('update:modelValue',val)
    }
 })
</script>
<style lang="less" scoped></style>
