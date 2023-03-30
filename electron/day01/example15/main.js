const { BrowserWindow, app, ipcMain } = require("electron")
const path = require('path')
let mainWindow
const createWindow = ()=>{
  mainWindow = new BrowserWindow({
    width:300,
    height:300,
    x:1600,
    y:100,
    frame:false,
    // backgroundColor:'#f00fff',
    alwaysOnTop:true,
    // titleBarStyle:"hidden",
    // titleBarStyle:"customButtonsOnHover",
    // titleBarStyle:"hidden",
    // titleBarOverlay:true
    // titleBarOverlay:{
    //   "color":"#2f3241",
    //   "symbolColor":"#74b1b1",
    //   "height":50
    // },
    transparent:true,
    // opacity:0,
    webPreferences:{
      preload:path.resolve(__dirname,'preload.js')
    }
  })
  // mainWindow.setIgnoreMouseEvents(true)
  mainWindow.setAspectRatio(1)
  mainWindow.loadFile('index.html')
}

ipcMain.on('set-ignore-mouse-events',(event,...args)=>{
  const win = BrowserWindow.fromWebContents(event.sender)
  console.log("...args=>",...args);
  win.setIgnoreMouseEvents(...args)
})

app.whenReady().then(()=>{
  createWindow()
  app.on('activate',()=>{
    if(BrowserWindow.getAllWindows().length === 0){
      createWindow()
    }
  })
})

app.on('window-all-closed',()=>{
  if(process.platform !== 'darwin'){
    app.quit()
  }
})