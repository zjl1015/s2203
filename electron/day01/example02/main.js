const { app, BrowserWindow, ipcMain, nativeImage, nativeTheme } = require("electron");
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

  // win.webContents.openDevTools()
  win.loadFile('./index.html')
  ipcMain.handle('dark-mode:toggle',()=>{
    if(nativeTheme.shouldUseDarkColors){
      nativeTheme.themeSource = 'light'
    }else{
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })

  ipcMain.handle('dark-mode:system',()=>{
    nativeTheme.themeSource = 'system'
  })
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