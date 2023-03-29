const { BrowserWindow, app, ipcMain } = require("electron")
const fs = require('fs')
const https = require('https')
const path = require('path')

const createWindow = ()=>{
  const mainWindow  = new BrowserWindow({
    width:300,
    height:300,
    x:1600,
    y:100,
    alwaysOnTop:true,
    webPreferences:{
      preload:path.resolve(__dirname,'preload.js')
    }
  })
  mainWindow.loadFile('index.html')
}

const iconName = path.join(__dirname,'../images/drag-drop-line.png')
const icon = fs.createWriteStream(iconName)

fs.writeFileSync(path.join(__dirname,'../drag-and-drop-1.md'),'# First file to test drag and drop')
fs.writeFileSync(path.join(__dirname,'../drag-and-drop-2.md'),'# Second file to test drag and drop')

https.get('https://img.icons8.com/ios/452/drag-and-drop.png',(response)=>{
  response.pipe(icon)
})


app.whenReady().then(()=>{
  createWindow()
})

ipcMain.on('ondragstart',(event,filePath)=>{
  event.sender.startDrag({
    file:path.join(__dirname,filePath),
    icon:iconName
  })
})

app.on('activate',()=>{
  if(BrowserWindow.getAllWindows().length === 0) createWindow()
})
app.on('window-all-closed',()=>{
  if(process.platform !== 'darwin') app.quit()
})