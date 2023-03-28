// window.addEventListener('DOMContentLoaded',()=>{
//   document.body.innerHTML = "你好啊哈哈"
// })

// const { ipcRenderer } = require("electron");

window.addEventListener('DOMContentLoaded',()=>{
  const replaceText = (selector,version)=>{
    document.querySelector(selector).innerText = version
  }
  for (const selector of ['chrome','node','electron']) {
    // 在渲染进程中可以直接使用预加载脚本中的暴露的 versions 对象
    replaceText('#'+selector,versions[selector]())
  }
  console.log(versions);
})


async function func(){
  const res = await window.versions.ping()
  console.log("res==>",res);
}

func()



window.addEventListener('DOMContentLoaded',()=>{
  const btn = document.querySelector('#btn')
  const titleInput = document.querySelector('#title')
  const btnOpenFile = document.querySelector('#open-file')
  const filePathElement = document.querySelector('#filepath')
  const countElement = document.querySelector('#count')
  btn.addEventListener('click',()=>{
    const title = titleInput.value
    window.electronApi.setTitle(title)
  })

  btnOpenFile.addEventListener('click',async ()=>{
    const filePath = await window.electronApi.openFile()
    filePathElement.innerText = filePath
  })


  window.electronApi.handleCounter((event,val)=>{
    const oldValue = Number(countElement.innerText)
    const newValue = oldValue + val
    countElement.innerText = newValue
    event.sender.send('counter-value',newValue)

  })
})


// 消息端口
const channel = new MessageChannel()
console.log("channel===>",channel);
// 消息发送到 port1 将被 port2 接收
const port1 = channel.port1
const port2 = channel.port2
console.log("port1=%o,port2=%o",port1,port2);

port2.postMessage({answer:42})
// ipcRenderer.postMessage('port',null,[port1])


// window.electronMessagePort.postMessage('hello electron port')
