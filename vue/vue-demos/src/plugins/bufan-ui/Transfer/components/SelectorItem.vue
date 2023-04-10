<template>
  <ul class="list-container">
    <li @dragstart="dragStartEvent(item)" :draggable="!item.disabled" v-for="item in list" :key="item.id"
      :class="['item', item.disabled ? 'disabled' : '']">
      <input type="checkbox" :id="item.id" :disabled="item.disabled"
        @change="inputChangeEvent($event.target.checked, leftOrRight, item)">
      <label :for="item.id">{{ item.phone_name }}</label>
    </li>
  </ul>
</template>
<script setup>
defineProps({
  list:{
    type:Array,
    default:[]
  },
  leftOrRight:{
    type:String,
    validator:(val)=>{
      return ['left','right'].includes(val)
    }
  }
})
const emit = defineEmits(['dragItem','clickEvent'])
const dragStartEvent = (item)=>{
  emit('dragItem',item)
}
const inputChangeEvent = (checked,leftOrRight,item)=>{
  emit('clickEvent',checked,leftOrRight,item)
}
</script>
<style lang="scss" scoped>
.list-container {
  list-style: none;
  margin: 0;
  padding: 0;

  .item {
    &.disabled {
      opacity: .6;
    }
  }
}
</style>