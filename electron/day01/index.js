// app 模块，控制应用程序的事件生命周期
// BrowserWindow 模块，创建和管理应用程序窗口
const { app, BrowserWindow,ipcMain,dialog } = require("electron");
const path = require('path')
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
    webPreferences:{
      preload:path.resolve(__dirname,'preload.js')
    }
  });
  // 在加载页面前设置监听自定义事件
  ipcMain.handle('ping',()=>'ipc ping')
  ipcMain.on('set-title',(event,title)=>{
    const win = BrowserWindow.fromWebContents(event.sender)
    win.setTitle(title)
  })
  // 把页面加载到当前窗口
  win.loadFile("index.html");
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
