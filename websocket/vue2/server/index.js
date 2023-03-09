const Ws = require('ws')
;((Ws)=>{
  const server = new Ws.Server({port:3000})
  const init = ()=>{
    bindEvent()
  }

  function bindEvent(){
    server.on('open',handleOpen)
    server.on('close',handleClose)
    server.on('error',handleError)
    server.on('connection',handleConnection)
  }

  function handleOpen(e){
    console.log("Server Open",e);
  }
  function handleClose(e){
    console.log("Server handleClose",e);
  }
  function handleError(e){
    console.log("Server Error",e);
  }
  function handleConnection(ws){
    console.log("Server Connection");
    ws.on('message',handleMessage)
  }
  function handleMessage(msg){
    console.log(msg.toString());
    server.clients.forEach(c => {
      // 把消息转发给所有的客户端
      c.send(msg.toString())
    });
    
  }

  init()
})(Ws)