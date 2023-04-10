import {
  computed,
  reactive,
  ref
} from "vue";

export function useTargetIndex(initIndex) {
  const targetIndex = ref(initIndex)

  function setTargetIndex(index) {
    targetIndex.value = Number(index)
  }
  return [
    targetIndex,
    setTargetIndex
  ]
}
export function useCheckedData(){
  const checkedData = reactive({
    left:[],
    right:[]
  })
  function addCheckedData(leftOrRight,itemData){
    switch(leftOrRight){
      case 'left':
        checkedData.left.push(itemData)
        break;
      case 'right':
        checkedData.right.push(itemData)
        break;
      default:
        break
    }
  }
  function removeCheckedData(leftOrRight,id){
    switch(leftOrRight){
      case 'left':
        checkedData.left = checkedData.left.filter(item=>item.id!==id)
        break;
      case 'right':
        checkedData.right = checkedData.right.filter(item=>item.id!==id)
        break;
      default:
        break;
    }
  }

  return [
    checkedData,
    addCheckedData,
    removeCheckedData
  ]

}
export function useRightListData(initRightList,checkedData){
  const rightList = ref(initRightList)
  function addRightList(newListData){
    rightList.value = [
      ...rightList.value,
      ...newListData
    ]
    checkedData.left = []
  }
  function removeRightList(newListData){
    rightList.value = rightList.value.filter((item)=>{
      if(!newListData.find(({id})=>item.id==id)){
        return item
      }
    })
    checkedData.right = []
  }
  return [
    rightList,
    addRightList,
    removeRightList
  ]
}

export function useComputed(data, targetIndex,rightList) {
  const leftTitle = computed(() => data[targetIndex.value].title)
  const leftList = computed(() => {
    const {data:currentData} =data[targetIndex.value]
    return currentData.filter(item => {
      if (!rightList.value.find(({id}) => item.id === id)) {
        return item
      }
    })
  })
  return [
    leftTitle,
    leftList
  ]
}

export function useDragItem(){
  const dragItem = ref(null)
  function setDragItem(item){
    dragItem.value = item
  }
  return [
    dragItem,
    setDragItem
  ]
}