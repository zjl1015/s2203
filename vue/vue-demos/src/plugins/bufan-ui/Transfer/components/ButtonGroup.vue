<template>
  <div class="box btn-group">
    <button @click="leftBtnClick(checkedDataRight)" class="btn-item"
      :disabled="checkedDataRight.length === 0">&lt;</button>
    <button @click="rightBtnClick(checkedDataLeft)" class="btn-item" :disabled="checkedDataLeft.length === 0">&gt;</button>
  </div>
</template>
<script setup>
defineProps({
  checkedDataLeft:{
    type:Array,
    default:()=>[]
  },
  checkedDataRight:{
    type:Array,
    default:()=>[]
  }
})
const emit = defineEmits(['removeRightList', 'addRightList'])
const leftBtnClick = (checkedRightList)=>{
  emit('removeRightList',checkedRightList)
}
const rightBtnClick = (checkedLeftList)=>{
  emit('addRightList',checkedLeftList)
}
</script>
<style lang="scss" scoped>
.btn-group {
  border-left: 1px solid black;
  border-right: 1px solid black;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;

  .btn-item {
    width: 38px;
    height: 38px;
    border: none;
    outline: none;
    background-color: orange;
    border-radius: 5px;
    font-size: 12px;
    color: #fff;

    &:nth-child(2) {
      margin-left: 10px;
    }

    &:disabled {
      opacity: .6;
    }
  }
}</style>