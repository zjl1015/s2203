<template>
  <div class="box btn-group">
    <button
      class="btn"
      :disabled="leftDisabled"
      @click="leftBtnClick"
    >
      &lt;
    </button>
    <button
      class="btn"
      :disabled="rightDisabled"
      @click="rightBtnClick"
    >
      &gt;
    </button>
  </div>
</template>
<script setup>
const props = defineProps({
  leftDisabled:{
    type:Boolean,
    default:true
  },
  rightDisabled:{
    type:Boolean,
    default:true
  },
  leftData:{
    type:Array,
    default:()=>[]
  },
  rightData:{
    type:Array,
    default:()=>[]
  }
})
const emit = defineEmits(['leftBtnClick','rightBtnClick'])

const leftBtnClick = ()=>{
  emit('leftBtnClick',props.leftData)
}
const rightBtnClick = ()=>{
  emit('rightBtnClick',props.rightData)
}
</script>
<style lang='scss' scoped>
.btn-group {
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #000;
  border-right: 1px solid #000;
  .btn {
    width: 30px;
    height: 30px;
    background-color: orange;
    border: none;
    color: #fff;
    font-size: 12px;
    border-radius: 5px;
    &:disabled {
      opacity: 0.6;
    }

    &:nth-child(2) {
      margin-left: 5px;
    }
  }
}
</style>
