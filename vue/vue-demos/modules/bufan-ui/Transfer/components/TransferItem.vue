<template>
  <div
    v-for="item in data"
    :key="item.id"
    :class="['list-item', item.disabled ? 'disabled' : '']"
    :draggable="!item.disabled"
    @dragstart="dragItem(item)"
  >
    <input
      type="checkbox"
      :disabled="item.disabled"
      :id="'__checkbox__' + item.id"
      @click="inputClick($event.target.checked, leftOrRight, item)"
    />
    <label :for="'__checkbox__' + item.id">{{ item.phone_name }}</label>
  </div>
</template>
<script setup>
const props = defineProps({
  data:{
    type:Array,
    default:()=>[]
  },
  leftOrRight:{
    type:String,
    validator:(value)=>{
      return ['left','right'].includes(value)
    }
  }
})

const emit = defineEmits(['inputClick','dragItem'])

const inputClick = (checked,leftOrRight,item)=>{
  emit('inputClick',checked,leftOrRight,item)
}

const dragItem = (item)=>{
  emit('dragItem',item)
}
</script>
<style lang='scss' scoped>
.list-item {
  &.disabled {
    opacity: 0.5;
  }
}
</style>
