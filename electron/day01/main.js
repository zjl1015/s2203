const {app,BrowserWindow, MessageChannelMain} = require('electron')
const path = require('path')
app.whenReady().then(async ()=>{
  const worker = new BrowserWindow({
    show:false,
    webPreferences:{
      nodeIntegration:true
    }
  })

  await worker.loadFile('worker.html')
  
  const mainWindow = new BrowserWindow({
    webPreferences:{
      nodeIntegration:true
    }
  })
  mainWindow.loadFile('app.html')

  mainWindow.webContents.mainFrame.on('request-worker-channel',(event)=>{
    const {port1,port2} = new MessageChannelMain()
    worker.webContents.postMessage('new-client',null,[port1])
    event.senderFrame.postMessage('provide-worker-channel',null,[port2])
    
  })
})