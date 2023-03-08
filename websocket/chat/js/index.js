((doc, storage, location) => {
  const oList = doc.querySelector("#list");
  const oMsg = doc.querySelector("#message");
  const oSendBtn = doc.querySelector("#send");
  const ws = new WebSocket("ws:localhost:8000");
  let username = "";
  const init = () => {
    bindEvnet();
  };

  function bindEvnet() {
    oSendBtn.addEventListener("click", handleEnterBtnClick, false);
    ws.addEventListener("open", handleWsOpenEvent, false);
    ws.addEventListener("close", handleWsCloseEvent, false);
    ws.addEventListener("message", handleWsMessageEvent, false);
    ws.addEventListener("error", handleWsErrorEvent, false);
  }

  function handleEnterBtnClick() {
    // 发送数据
    const msg = oMsg.value;
    if (!msg.trim().length) return;
    ws.send(
      JSON.stringify({
        user: username,
        dateTime: new Date().getTime(),
        text: msg
      })
    );
    // 清空输入框
    oMsg.value = "";
  }
  function handleWsOpenEvent(e) {
    console.log("Websocket open", e);
    username = storage.getItem("username");
    if (!username) {
      location.href = "entry.html";
      return;
    }
  }
  function handleWsCloseEvent(e) {
    console.log("Websocket close", e);
  }
  function handleWsMessageEvent(e) {
    const msg = JSON.parse(e.data);
    console.log("接收到的数据为：", msg);
    oList.appendChild(createItem(msg));
  }
  function createItem(item) {
    const li = doc.createElement("li");
    li.innerHTML = `
      <p>
       <span>${item.user}</span>
       <span>${item.dateTime}</span>
      </p>
      <p>${item.text}</p>
    `;

    return li;
  }
  function handleWsErrorEvent(e) {
    console.log("Websocket error", e);
  }

  init();
})(document, localStorage, location);
