<template>
  <div class="transfer-main">
    <!-- 选择器 -->
    <div class="selector">
      <select @change="selectorChange($event.target.value)">
        <option v-for="(title,index) in titleArray" :key="title" :value="index" >{{ title }}</option>
      </select>
    </div>
    <!-- 容器下分三列 -->
    <div class="transfer">
      <div class="box transfer-left" @drop="rightDragEndEvent" @dragover.prevent>
        <h1 class="title">{{ leftTitle }}</h1>
        <ul class="list-container">
          <li @dragstart="dragItemEvent(item)" :draggable="!item.disabled" v-for="item in leftListData" :key="item.id" :class="['item',item.disabled?'disabled':'']">
            <input type="checkbox"  :id="item.id" :disabled="item.disabled" @change="leftItemChecked($event.target.checked,item)">
            <label :for="item.id">{{ item.phone_name }}</label>
          </li>
        </ul>
      </div>
      <div class="box btn-group">
        <button @click="addLeftListData" class="btn-item" :disabled="checkedRightListData.length===0">&lt;</button>
        <button @click="addRightListData" class="btn-item" :disabled="checkedLeftListData.length===0">&gt;</button>
      </div>
      <div class="box transfer-right" @dragover.prevent @drop="dragEndEvent">
        <h1 class="title">{{ rightTitle }}</h1>
        <ul class="list-container">
          <li :draggable="!item.disabled" @dragstart="dragItemEvent(item)" v-for="item in rightListData" :key="item.id" :class="['item',item.disabled?'disabled':'']">
            <input type="checkbox"  :id="item.id" :disabled="item.disabled" @change="rightItemChecked($event.target.checked,item)">
            <label :for="item.id">{{ item.phone_name }}</label>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  data:{
    type:Array,
    default:()=>[]
  },
  rightTitle:{
    type:String,
    default:'已选择'
  }
})
const current = ref(0)
const checkedRightListData = ref([])
const checkedLeftListData = ref([])
const rightListData = ref([])
const titleArray = props.data.map(item=>item.title)
const selectorChange = (index)=>{
  current.value = index
}
let leftListData = computed(()=>{
  const currentData = props.data[current.value]
  return currentData.data.filter(item=>{
    if(!rightListData.value.find(({id})=>item.id === id)){
      return item
    }
  })
})
const leftTitle = computed(()=>{
  
  return titleArray[current.value]
})

const leftItemChecked = (checked,item)=>{
  if(checked){
    checkedLeftListData.value.push(item)
  }else{
    checkedLeftListData.value = checkedLeftListData.value.filter(product=>product.id !==item.id)
  }
}
const rightItemChecked = (checked,item)=>{
  if(checked){
    checkedRightListData.value.push(item)
  }else{
    checkedRightListData.value = checkedRightListData.value.filter(product=>product.id !==item.id)
  }
}
const addRightListData = ()=>{
  // 将左边选中的数据存放到右边列表容器中
  rightListData.value.push(...checkedLeftListData.value)
  // 清空左边的选中的数据容器
  checkedLeftListData.value = []
}
// 移除右边的选中的数据
const addLeftListData = ()=>{
  rightListData.value = rightListData.value.filter((item)=>{
    if(!checkedRightListData.value.find(({id})=>item.id===id)){
      return item
    }
  })
  checkedRightListData.value = []
}
const dragItem = ref({})
const dragItemEvent = (item)=>{
  dragItem.value = item
}

const dragEndEvent = ()=>{
// 将左边选中的数据存放到右边列表容器中
  rightListData.value.push(...[dragItem.value])
  // 清空左边的选中的数据容器
  checkedLeftListData.value = []
}
const rightDragEndEvent = ()=>{
  rightListData.value = rightListData.value.filter((item)=>item.id!==dragItem.value.id)
  checkedRightListData.value = []
}
</script>
<style lang="scss" scoped>
.transfer-main{
  .transfer{
    display: flex;
    width: 600px;
    height: 450px;
    border: 1px solid black;
    box-sizing: border-box;
    .box{
      flex: 1;
      &.btn-group{
        border-left: 1px solid black;
        border-right:1px solid black;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        .btn-item{
          width: 38px;
          height: 38px;
          border: none;
          outline: none;
          background-color: orange;
          border-radius: 5px;
          font-size: 12px;
          color: #fff;
          &:nth-child(2){
            margin-left: 10px;
          }
          &:disabled{
            opacity: .6;
          }
        }
      }
      .title{
        margin: 0;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #fff;
        font-size: 16px;
        background-color: #333;
      }
      .list-container{
        list-style: none;
        margin: 0;
        padding: 0;
        .item{
          &.disabled{
            opacity: .6;
          }
        }
      }
    }
  }
}
</style>