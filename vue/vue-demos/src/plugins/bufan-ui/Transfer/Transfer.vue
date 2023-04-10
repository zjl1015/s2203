<template>
  <div class="transfer-main">
    <!-- 选择器 -->
    <Selector :title-array="titleArray" @set-target-index="setTargetIndex"></Selector>
    <!-- 容器下分三列 -->
    <div class="transfer">
      <div class="box transfer-left" @drop="removeRightList([dragItem])" @dragover.prevent>
        <h1 class="title">{{ leftTitle }}</h1>
        <SelectorItem :list="leftList" left-or-right="left" @drag-item="setDragItem" @click-event="itemClickEvent"></SelectorItem>
      </div>
      <ButtonGroup :checked-data-left="checkedData.left" :checked-data-right="checkedData.right" @add-right-list="addRightList" @remove-right-list="removeRightList"></ButtonGroup>
      <div class="box transfer-right" @dragover.prevent @drop="addRightList([dragItem])">
        <h1 class="title">{{ rightTitle }}</h1>
        <SelectorItem :list="rightList" left-or-right="right" @drag-item="setDragItem" @click-event="itemClickEvent"></SelectorItem>
      </div>
    </div>
  </div>
</template>
<script setup>
import Selector from './components/Selector.vue';
import SelectorItem from './components/SelectorItem.vue';
import ButtonGroup from './components/ButtonGroup.vue';
import defineProps from './extend/props'
import {useTargetIndex,useComputed,useRightListData,useCheckedData,useDragItem} from './hooks/index'
const props = defineProps(defineProps)
const [targetIndex,setTargetIndex] = useTargetIndex(0)
const titleArray = props.data.map(item=>item.title)
const [checkedData,addCheckedData,removeCheckedData] = useCheckedData()
const [rightList,addRightList,removeRightList] = useRightListData([],checkedData)
const [leftTitle,leftList] = useComputed(props.data,targetIndex,rightList)
const [dragItem,setDragItem] = useDragItem()
const itemClickEvent = (checked,leftOrRight,item)=>{
  if(checked){
    addCheckedData(leftOrRight,item)
  }else{
    removeCheckedData(leftOrRight,item.id)
  }
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
      .title{
        margin: 0;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #fff;
        font-size: 16px;
        background-color: #333;
      }
     
    }
  }
}
</style>