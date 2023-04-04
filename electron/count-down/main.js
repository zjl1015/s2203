
const {app,BrowserWindow,Menu,ipcMain,nativeImage,Tray} = require('electron')
const path = require('path')
const {createSystemTray} = require('./main/index')

const createWindow = ()=>{
  const mainWindow = new BrowserWindow({
    // width:120,
    // height:40,
    width:300,
    height:300,
    x:1600,
    y:100,
    alwaysOnTop:true,
    frame:false,
    transparent:true,
    webPreferences:{
      preload:path.join(__dirname,'preload.js')
    }
  })
  mainWindow.webContents.openDevTools()
  mainWindow.loadFile('index.html')
  mainWindow.on('system-context-menu',(event)=>{
    event.preventDefault()
    console.log("system-context-menu ----");
  })
}
app.whenReady().then(()=>{
  ipcMain.handle('menu:showCustomMenu',()=>{
    console.log("用户右键了。。。");
  })
  // 创建系统托盘
  createSystemTray()
  createWindow()
  app.on('activate',()=>{
    if(BrowserWindow.getAllWindows().length === 0){
      createWindow()
    }
  })
})
app.on('window-all-closed',()=>{
  if(process.platform !=='darwin'){
    app.quit()
  }
})

// 监听右键事件
ipcMain.on('show-context-menu',(event)=>{
  const menuTemplate = [
    {
      label:'退出',
      click:()=>{event.sender.send('context-menu-command','退出')}
    }
  ]
  const menu = Menu.buildFromTemplate(menuTemplate)
  menu.popup(BrowserWindow.fromWebContents(event.sender))
  Menu.setApplicationMenu(menu)
})