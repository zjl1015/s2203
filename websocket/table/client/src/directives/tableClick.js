
import {toRefs} from 'vue'
const tableClick = {
    // 由于数据是后台发过来后，才渲染数据的，所以
    // 在 updated 钩子里面来操作数据比较合适
    // mounted(el,bindings){
    //     console.log(el,bindings);
    // }
    updated(el,bindings){
        console.log(el,bindings);
        const {status,userList,field,index,socket} = toRefs(bindings.value)
        tableClick.el = el
        tableClick.status = status
        tableClick.userList = userList
        tableClick.field = field
        tableClick.index = index
        tableClick.socket = socket
        bindEvent()
    }
}

// 获取目标元素
function getTarget(e){
    const tagName = e.target.tagName.toLowerCase()
    switch(tagName){
        case 'span':
            return e.target.parentNode;
        case 'td':
            return e.target
        default:
            return e.target
    }
}
function handleTableClick(e){
    handleStopPropaganation(e)
    handleWindowClick()
    // console.log("e===>",e.target.tagName.toLowerCase());
    // console.log("e===>",e.target.dataset);
    // 可能点击到 td,也有可能点击到span上
    tableClick.target = getTarget(e)
    const target = tableClick.target
    const field =target.dataset.field
    if(field){
        const index = target.dataset.index
        // console.log(field,index);
        const tdText = target.innerText
        tableClick.oInput = createInputElement(tdText)
        target.appendChild(tableClick.oInput)
        tableClick.oInput.select()
        tableClick.field.value = field
        tableClick.index.value = index
        bindInputEvent()
        // 通知状态发生改变
        tableClick.socket.value.emit('changeStatus',true)

    }
}
function removeInput(){
    tableClick.target.removeChild(tableClick.oInput)
    unbindInputEvent()
    // 断开引用方便垃圾回收机制及时回收
    tableClick.oInput = null
    tableClick.target = null
     // 通知状态发生改变
     tableClick.socket.value.emit('changeStatus',false)
}
function handleWindowClick(){
  if(tableClick.oInput){
    removeInput()
  }
}
function bindEvent (){
    // 事件代理
    tableClick.el.addEventListener('click',handleTableClick,false)
    window.addEventListener('click',handleWindowClick,false)
}
function bindInputEvent(){
    tableClick.oInput.addEventListener('click',handleStopPropaganation,false)
    tableClick.oInput.addEventListener('input',handleInput,false)
}
function unbindInputEvent(){
    tableClick.oInput.removeEventListener('click',handleStopPropaganation,false)
    tableClick.oInput.removeEventListener('input',handleInput,false)
}

function handleInput(e){
    tableClick.socket.value.emit('changeInputValue',{
        index:tableClick.index.value,
        field:tableClick.field.value,
        value:e.target.value
    })
}
function handleStopPropaganation(e){
    e.stopPropagation()
}

function createInputElement(value){
    const inputElem = document.createElement('input')
    inputElem.value = value

    inputElem.style.cssText = `
     position:absolute;
     top:0;
     left:0;
     width:100%;
     height:100%;
     border:none;
     box-sizing:border-box;
    `
    return inputElem
}


export default tableClick

