const Ws = require("ws");
((Ws) => {
  const server = new Ws.Server({ port: 8000 });
  const init = () => {
    bindEvent();
  };

  const bindEvent = () => {
    server.on("open", handleOpen);
    server.on("close", handleClose);
    server.on("error", handleError);
    server.on("connection", handleConnection);
  };

  function handleOpen() {
    console.log("Server open");
  }
  function handleClose() {
    console.log("Server close");
  }
  function handleError() {
    console.log("Server error");
  }
  function handleConnection(ws) {
    console.log("Server connection");
    ws.on("message", handleMessage);
  }
  function handleMessage(msg) {
    console.log("Server message", msg.toString());
    // 服务器再把消息广播出去
    server.clients.forEach(function (c) {
      c.send(msg.toString());
    });
  }

  init();
})(Ws);
