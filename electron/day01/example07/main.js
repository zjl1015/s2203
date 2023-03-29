const { BrowserWindow, app, Notification } = require("electron")


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

const NOTIFICATION_TITLE = 'Basic Notification'
const NOTIFICATION_BODY = 'Notification from the Main process'

function showNotification(){
  new Notification({
    title:NOTIFICATION_TITLE,
    body:NOTIFICATION_BODY
  }).show()
}


app.whenReady().then(()=>{
  createWindow()
}).then(showNotification)

app.on('window-all-closed',()=>{
  
  if(process.platform !=='darwin') app.quit()
})

app.on('activate',()=>{
  if(BrowserWindow.getAllWindows().length === 0){
    createWindow()
  }
})