const Ws = require('ws')
;((Ws)=>{
  const serve = new Ws.Server({port:3000})
  const init = ()=>{
    bindEvent()
  }
  function bindEvent(){
    serve.on('open',handleOpen)
    serve.on('close',handleClose)
    serve.on('error',handleError)
    serve.on('connection',handleConnection)
  }


  function  handleOpen(e){
    console.log("Server Open",e);
  }
  function  handleClose(e){
    console.log("Server Close",e);
  }
  function  handleError(e){
    console.log("Server Error",e);
  }
  function  handleConnection(ws){
    console.log("Server Connection");
    ws.on("message",handleMessage)
  }

  function handleMessage (msg){
    console.log("Server msg=>",msg.toString());
    serve.clients.forEach((c)=>{
      c.send(msg.toString())
    })
  }

  init()
})(Ws)