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

  //  **********************访问HID设备*************************

  // 调用 navigator.hid.requestDevice 并选择高清设备，将会触发会话内的 select-hid-device 事件
  win.webContents.session.on('select-hid-device',(event,details,callback)=>{
    // hid-device-added/removed 两种事件可以处理高清设备的插拔
    win.webContents.session.on('hid-device-added',(event,device)=>{
      console.log('hid-device-added Frist width ',device);
    })
    win.webContents.session.on('hid-device-removed',(event,device)=>{
      console.log('hid-device-removed Frist width ',device);
    })
    event.preventDefault()
    if(details.deviceList && details.deviceList.length > 0){
      callback(details.deviceList[0].deviceId)
    }
  })

  // 该函数用于禁用特定来源的 HID 访问
  win.webContents.session.setPermissionCheckHandler((webContents,permission,requestingOrigin,details)=>{
    if(permission === 'hid' && details.securityOrigin === 'file:///'){
      return true
    }
  })
 // 第一次调用 navigator.hid.requestDevice 前，可以通过该函数给予设备默认权限
  win.webContents.session.setDevicePermissionHandler((details)=>{
    if(details.deviceType === 'hid' && details.origin === 'file:///'){
      return true
    }
  })




  //  **********************访问串口设备 如：USB 蓝牙*************************

  // 调用 navigator.serial.requestPort ，将会触发会话内的 select-serial-port 事件
  win.webContents.session.on('select-serial-port',(event,portList,webContents,callback)=>{
    // serial-port-added/removed 两种事件可以处理串口设备的插拔
    win.webContents.session.on('serial-port-added',(event,port)=>{
      console.log('serial-port-added Frist width ',port);
    })
    win.webContents.session.on('serial-port-removed',(event,port)=>{
      console.log('serial-port-removed Frist width ',port);
    })
    event.preventDefault()
    if(portList && portList.length > 0){
      callback(portList[0].portId)
    }else{
      callback('')
    }
  })

  // 该函数用于禁用特定来源的串口访问
  win.webContents.session.setPermissionCheckHandler((webContents,permission,requestingOrigin,details)=>{
    if(permission === 'serial' && details.securityOrigin === 'file:///'){
      return true
    }
    return false
  })
 // 第一次调用 navigator.serial.requestPort 前，可以通过该函数给予设备默认权限
  win.webContents.session.setDevicePermissionHandler((details)=>{
    if(details.deviceType === 'serial' && details.origin === 'file:///'){
      return true
    }
    return false
  })

  //  **********************访问 Web USE*************************
  let grantedDeviceThroughPermHandler
  // 调用 navigator.serial.requestPort ，将会触发会话内的 select-serial-port 事件
  win.webContents.session.on('select-usb-device',(event,details,callback)=>{
    // usb-device-added/removed 两种事件可以处理串口设备的插拔
    win.webContents.session.on('usb-device-added',(event,device)=>{
      console.log('usb-device-added Frist width ',device);
    })
    win.webContents.session.on('usb-device-removed',(event,device)=>{
      console.log('usb-device-removed Frist width ',device);
    })
    event.preventDefault()
    if(details.deviceList && details.deviceList.length > 0){
      const deviceToReturn = details.deviceList.find((device)=>{
        if(!grantedDeviceThroughPermHandler || (device.deviceId != grantedDeviceThroughPermHandler.deviceId)){
          return true
        }
      })
      if(deviceToReturn) {
        callback(deviceToReturn.deviceId)
      }
    }else{
      callback()
    }
  })

 
  win.webContents.session.setPermissionCheckHandler((webContents,permission,requestingOrigin,details)=>{
    if(permission === 'usb' && details.securityOrigin === 'file:///'){
      return true
    }
    return false
  })

  win.webContents.session.setDevicePermissionHandler((details)=>{
    if(details.deviceType === 'usb' && details.origin === 'file:///'){
      if(!grantedDeviceThroughPermHandler){
        grantedDeviceThroughPermHandler = details.device
        return true
      }else{
        return false
      }
    }
    return false
  })



  // win.webContents.openDevTools()
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