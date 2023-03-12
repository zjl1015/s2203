import {toRefs} from 'vue'
const tableClick = {
   updated(el,bindings){
    tableClick.el = el
    const {userList,socket} =toRefs(bindings.value)
    tableClick.userList = userList
    tableClick.socket =socket
    bindEvent()
   }
}


function bindEvent(){
    tableClick.el.addEventListener('click',handleTableClick,false)
    window.addEventListener('click',handleWindowClick,false)
}

function handleTableClick(e){
    handleStopPropagation(e)
    // 点击非编辑单元格也需要清除已编辑的单元格
    handleWindowClick()
    tableClick.target = getTarget(e)
    const target = tableClick.target
    const field = target.dataset.field
    tableClick.field = field
    if(field){
        tableClick.index = target.dataset.index
        const tdText = target.innerText
        tableClick.oInput= createInput(tdText)
        target.appendChild(tableClick.oInput)
        tableClick.oInput.select()
        bindInputEvent()
        tableClick.socket.value.emit('changeStatus',true)
    } 
}
function handleWindowClick(){
    removeInput()
    tableClick.socket.value.emit('changeStatus',false)
}
function removeInput(){
    if(tableClick.oInput){
        tableClick.target.removeChild(tableClick.oInput)
        unbindInputEvent()
        tableClick.oInput = null
        tableClick.tableClick = null
    }
}
function handleStopPropagation(e){
    e.stopPropagation()
}
function bindInputEvent(){
    tableClick.oInput.addEventListener('click',handleInputClick,false)
    tableClick.oInput.addEventListener('input',handleInputEvent,false)
}
function unbindInputEvent(){
    tableClick.oInput.removeEventListener('click',handleInputClick,false)
    tableClick.oInput.removeEventListener('input',handleInputEvent,false)
}
function handleInputClick(e){
    handleStopPropagation(e)
}
function handleInputEvent(e){
    tableClick.socket.value.emit('changeInput',{
        index:tableClick.index,
        field:tableClick.field,
        value:e.target.value
    })
}
function getTarget(e){
    const tagName = e.target.tagName.toLowerCase()
    switch(tagName){
        case "td":
            return e.target
        case "span":
            return e.target.parentNode
        default:
            return e.target
    }
}

function createInput(value){
    const oInput = document.createElement('input')
    oInput.value = value
    oInput.style.cssText = `
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        border:none;
        box-sizing:border-box;
    `
    return oInput
}

export default tableClick