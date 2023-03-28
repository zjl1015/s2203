async function testIt(){
  const device = await navigator.bluetooth.requestDevice({
    acceptAllDevices:true
  })
  document.querySelector('#device-name').innerHTML = device.name || `ID:${device.id}`
}
window.addEventListener('DOMContentLoaded',()=>{

  const btnEle = document.querySelector('#clickme')
  btnEle.addEventListener('click',testIt)
})

window.electronAPI.bluetoothPairingRequest((event,details)=>{
  const response = {}
  console.log("event=%o,details=%o",event,details);
  switch(details.pairingKind){
    case 'confirm':
      response.confirmed = confirm(`Do you want to connect device:${details.deviceId}?`)
      break;
      case 'confirmPin':
      response.confirmed = confirm(`Does the pin :${details.pin} match the pin displayed on device ${details.deviceId}`)
      break;
    case 'providePin':
      const pin = prompt(`please provide a pin for ${details.deviceId}.`)
      if(pin){
        response.pin = pin
        response.confirmed = true

      }else{
        response.confirmed = false
      }
      break;
    
  }
  window.electronAPI.bluetoothPairingResponse(response)
})


// ********************访问 HID 设备********************

async function testClick(){
  const grantedDevices = await navigator.hid.getDevices()
  console.log('grantedDevices===>',grantedDevices);
  let grantedDeviceList = ''
  grantedDevices.forEach(device=>{
    grantedDeviceList+=`<hr>${device.productName}</hr>`
  })
  document.querySelector('#granted-devices').innerHTML = grantedDeviceList
  
  const grantedDevices2 = await navigator.hid.requestDevice({
    filters:[]
  })
  
  console.log('grantedDevices2===>',grantedDevices2);
  grantedDeviceList = ''
  grantedDevices2.forEach(device=>{
    grantedDeviceList+=`<hr>${device.productName}</hr>`
  })
  document.querySelector('#granted-devices2').innerHTML = grantedDeviceList
}
window.addEventListener('DOMContentLoaded',()=>{
  const btnEleHID = document.querySelector('#btn')
  btnEleHID.addEventListener('click',testClick)
})



// ********************访问串口设备********************

async function  testSerialClick(){
  const filters = [
    { usbVendorId: 0x2341, usbProductId: 0x0043 },
    { usbVendorId: 0x2341, usbProductId: 0x0001 }
  ];

  try {
    const port = await navigator.serial.requestPort({filters})
    const portInfo = port.getInfo()
    console.log("portInfo=%o",portInfo);
    document.getElementById('#serial-device-name').innerHTML = `vendorId:${portInfo.usbVendorId} | productId:${portInfo.usbProductId} `
  } catch (ex) {
    if(ex.name === 'NotFoundError'){
      document.getElementById('serial-device-name').innerHTML = `Device NOT found`
    }else{
      document.getElementById('serial-device-name').innerHTML = ex
    }  
  }
}
window.addEventListener('DOMContentLoaded',()=>{

  document.getElementById('btnSerial').addEventListener('click',testSerialClick)
})

// ********************访问 USB 设备********************
function getDeviceDetail(device){
  return device.productName || `Unknown device ${device.deviceId}`
}
async function testClickUSB(){
  const noDevicesFoundMsg = 'No Devices Found'

  const grantedDevices = await navigator.usb.getDevices()
  let grantedDeviceList = ''
  if(grantedDevices.length > 0){
    grantedDevices.forEach(device => {
      grantedDeviceList +=`<hr>${getDeviceDetail(device)}</hr>`
    })
  }else{
    grantedDeviceList = noDevicesFoundMsg
  }
  document.getElementById('granted-devices-usb').innerHTML = grantedDeviceList

  grantedDeviceList = ''
  try {
      const grantedDevices = await navigator.usb.requestDevice({
        filters:[]
      })
      grantedDevices.forEach(device=>{
        grantedDeviceList+=`<hr>${getDeviceDetail(device)}</hr>`
      })
      
  } catch (ex) {
    if(ex.name === 'NotFoundError'){
      grantedDeviceList = noDevicesFoundMsg
    }
  }
  document.getElementById('granted-devices2-usb').innerHTML = grantedDeviceList
}

document.getElementById('clickUSB').addEventListener('click',testClickUSB)