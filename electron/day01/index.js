// app 模块，控制应用程序的事件生命周期
// BrowserWindow 模块，创建和管理应用程序窗口
const { app, BrowserWindow,ipcMain,dialog,Menu ,MessageChannelMain} = require("electron");
const path = require('path');
async function handleDialogOpen(){
  const {canceled,filePaths} =await dialog.showOpenDialog()
  if(canceled){
    return
  }else{
    return filePaths[0]
  }
}
const createWindow = ()=>{
   // 创建一个应用程序窗口
   const win = new BrowserWindow({
    width: 300,
    height: 300,
    y:100,
    x:1600,
    icon:'/images/icon.png',
    alwaysOnTop:true,// 总是在桌面上层
    // show:false,
    webPreferences:{
      // contextIsolation:false,
      preload:path.resolve(__dirname,'preload.js')
    }
  });
  const secondWin = new BrowserWindow({
    // show:false,
    webPreferences:{
      // contextIsolation:false,
      preload:path.resolve(__dirname,'secondPreload.js')
    }
  })

  const {port1,port2} = new MessageChannelMain()
  win.once('ready-to-show',()=>{
    win.webContents.postMessage('port',null,[port1])
  })
  secondWin.once('ready-to-show',()=>{
    secondWin.webContents.postMessage('port',null,[port2])
  })
  const menu = Menu.buildFromTemplate([
    {
      label:app.name,
      submenu:[
        {
          label:'Increment',
          click:()=>win.webContents.send('update-counter',1)
        },
        {
          label:'Decrement',
          click:()=>win.webContents.send('update-counter',-1)
        }
      ]
    }
  ])

  Menu.setApplicationMenu(menu)
  win.webContents.openDevTools()
  // 在加载页面前设置监听自定义事件
  ipcMain.handle('ping',()=>'ipc ping')
  ipcMain.on('set-title',(event,title)=>{
    const win = BrowserWindow.fromWebContents(event.sender)
    win.setTitle(title)
  })

  // 旧方式双向通信
  ipcMain.on('message',(event,arg)=>{
    console.log("arg==>",arg);
    event.reply('message-back','123')
  })
  // 旧方式2
  ipcMain.on('message2',(event,arg)=>{
    event.returnValue = arg+'123'
  })
  // 把页面加载到当前窗口
  win.loadFile("index.html");
  secondWin.loadFile('index.html')
}
// 只有在 app 模块的 ready 事件被激发后才能创建浏览器窗口，app.whenReady() api 监听 ready 事件
app.whenReady().then(() => {
  // 处理 dialog 打开文件
  ipcMain.handle('dialog:openFile',handleDialogOpen)
  createWindow()
  app.on('activate',()=>{
    if(BrowserWindow.getAllWindows().length === 0) createWindow()
  })
});

// 监听窗口关闭事件
app.on("window-all-closed",()=>{
  // darwin 是 MacOS ,因为 macOS 并没有真正关闭应该用
  if(process.platform!=='darwin') app.quit()
})



ipcMain.on('port',(event)=>{
  const port = event.ports[0]
  port.on('message',(event)=>{
    const data = event.data
    console.log("data===>",data);
  })
  port.start()
})
