const { BrowserWindow, app } = require('electron')
const fs = require('fs')
const path = require('path')

const createWindow = ()=>{
  const mainWindow = new BrowserWindow({
    width:300,
    height:300,
    x:1600,
    y:100,
    alwaysOnTop:true
  })
  mainWindow.loadFile('index.html')
 
}

const fileName = 'recently-used.md'
fs.writeFile(fileName,'好好学习',()=>{
  app.addRecentDocument(path.join(__dirname,fileName))
})




app.whenReady().then(()=>{
  createWindow()
})

app.on('window-all-closed',()=>{
  app.clearRecentDocuments()
  if(process.platform !=='darwin') app.quit()
})

app.on('activate',()=>{
  if(BrowserWindow.getAllWindows().length === 0){
    createWindow()
  }
})
