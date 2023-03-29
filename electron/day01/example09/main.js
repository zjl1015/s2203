const { BrowserWindow, app } = require('electron')

let  mainWindow
const createWindow = ()=>{
  mainWindow = new BrowserWindow({
    width:300,
    height:300
  })
  mainWindow.loadFile('index.html')
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