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

  win.webContents.on('select-bluetooth-device',(event,deviceList,callback)=>{
    event.preventDefault()
    if(deviceList && deviceList.length>0){
      console.log(deviceList);
      console.log("deviceList=%o",deviceList);
      callback(deviceList[0].deviceId)
      // callback(deviceList[0].deviceName)
    }
  })

  ipcMain.on('bluetooth-pairing-response',(event,response)=>{
    bluetoothPinCallback(response)
  })

  win.webContents.session.setBluetoothPairingHandler((details,callback)=>{
    bluetoothPinCallback = callback
    win.webContents.send('bluetooth-pairing-request',details)
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