<script setup>
import Selector from './components/Selector.vue'
import TransferTitle from './components/TransferTitle.vue'
import GroupButton from './components/GroupButton.vue'
import TransferItem from './components/TransferItem.vue'
import propsDefined from './extends/props'
import {
  useTargetIndex,
  useComputedData,
  useRightListData,
  useCheckedData,
  useDragItem
} from './extends/hooks'
const props = defineProps(propsDefined)
const options = props.data.map(({ title }) => title)
const [targetIndex, setTargetIndex] = useTargetIndex(0)
const { checkedData, addCheckedData, removeCheckedData } = useCheckedData()

const { rightListData, addRightListData, removeRightListData } =
  useRightListData([], checkedData)

const [dragItem, setDragItem] = useDragItem()
const { leftTitle, leftList, transferButtonDisabled } = useComputedData(
  props.data,
  targetIndex,
  rightListData,
  checkedData
)
const setCheckedData = (checked, leftOrRight, item) => {
  console.log(checked, leftOrRight, item)
  checked
    ? addCheckedData(leftOrRight, item)
    : removeCheckedData(leftOrRight, item.id)
}
</script>


<template>
  <div>
    <div>
      <selector :data="options" @select-change="setTargetIndex"></selector>
    </div>
    <div class="transfer">
      <div class="box left-list" @dragover.prevent  @drop="removeRightListData([dragItem])">
        <TransferTitle :title="leftTitle"></TransferTitle>
        <div
       
        >
          <TransferItem
            @drag-item="setDragItem"
            :data="leftList"
            left-or-right="left"
            @input-click="setCheckedData"
          ></TransferItem>
        </div>
      </div>
      <GroupButton
        :left-disabled="transferButtonDisabled.left"
        :right-disabled="transferButtonDisabled.right"
        :left-data="checkedData.right"
        :right-data="checkedData.left"
        @left-btn-click="removeRightListData"
        @right-btn-click="addRightListData"
      ></GroupButton>
      <div class="box right-list"  @dragover.prevent  @drop="addRightListData([dragItem])">
        <TransferTitle :title="rightTitle"></TransferTitle>
        <div
         
        >
          <TransferItem
            @drag-item="setDragItem"
            :data="rightListData"
            left-or-right="right"
            @input-click="setCheckedData"
          ></TransferItem>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang='scss' scoped>
.transfer {
  display: flex;
  width: 660px;
  height: 300px;
  border: 1px solid #000;

  .box {
    flex: 1;
  }
}
</style>
