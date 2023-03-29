const { BrowserWindow, app } = require('electron')
const fs = require('fs')
const path = require('path')
app.disableHardwareAcceleration()
let  mainWindow
const createWindow = ()=>{
  mainWindow = new BrowserWindow({
    webPreferences:{
      offscreen:true
    }
  })
  mainWindow.loadURL('https://github.com')
  mainWindow.webContents.on('paint',(event,dirty,image)=>{
    fs.writeFileSync('ex.png',image.toPNG())
  })
  mainWindow.webContents.setFrameRate(60)
  console.log(`The screenshot has been successfully saved to ${path.join(process.cwd(),'ex.png')}`);
}




app.whenReady().then(()=>{
  createWindow()
})

app.on('window-all-closed',()=>{
  
  if(process.platform !=='darwin') app.quit()
})

app.on('activate',()=>{
  if(BrowserWindow.getAllWindows().length === 0){
    createWindow()
  }
})