const {app,BrowserWindow} = require('electron')
const createWindow = ()=>{
  const mainWindow = new BrowserWindow({
    width:120,
    height:40,
    x:1600,
    y:100,
    alwaysOnTop:true,
    frame:false,
    transparent:true,
    resizable:false
  })
  // mainWindow.webContents.openDevTools()
  mainWindow.loadFile('index.html')
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
  if(process.platform !=='darwin'){
    app.quit()
  }
})