const { BrowserWindow, app } = require('electron')

let processInterval
const createWindow = ()=>{
  const mainWindow = new BrowserWindow({
    width:300,
    height:300,
    x:1600,
    y:100,
    alwaysOnTop:true
  })
  mainWindow.loadFile('index.html')
  const INCRMENT = 0.03
  const INTERVAL_DELAY = 100 // ms
  let c = 0

  processInterval = setInterval(() => {
    mainWindow.setProgressBar(c)
    if(c < 2){
      c+=INCRMENT
    }else {
      c = (-INCRMENT * 5)
    }
  }, INTERVAL_DELAY);
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

app.on('before-quit',()=>{
  clearInterval(processInterval)
})