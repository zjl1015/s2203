const { app, BrowserWindow } = require("electron");
const path = require('path')
const createWindow = ()=>{
  const win = new BrowserWindow({
     width:300,
     height:300,
     alwaysOnTop:true,
     x:1600,
     y:100,
     webPreferences:{
      preload:path.resolve(__dirname,'./preload.js')
     }
  })

  win.webContents.openDevTools()
  win.loadFile('./index.html')
}

app.whenReady().then(()=>{
  createWindow()
  app.on('activate',()=>{
    if(BrowserWindow.getAllWindows().length === 0){
      createWindow()
    }
  })
})

app.on('window-all-closed',()=>{
  if(process.platform!=='darwin'){
    app.quit()
  }
})