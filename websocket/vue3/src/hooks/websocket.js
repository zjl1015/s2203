import HOST from '@/configs'
const ws = new WebSocket(HOST)
const useWebsocket = (handleMessage)=>{
  const init = ()=>{
    bindEvent()
  }
  function bindEvent(){
    ws.addEventListener('open',handleOpen,false)
    ws.addEventListener('close',handleClose,false)
    ws.addEventListener('error',handleError,false)
    ws.addEventListener('message',handleMessage,false)
  }
  init()
  return ws
}



function handleOpen(e){
  console.log("Ws Open,",e);
}
function handleClose(e){
  console.log("Ws handleClose,",e);
}
function handleError(e){
  console.log("Ws Error,",e);
}




export {useWebsocket} 