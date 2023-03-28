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