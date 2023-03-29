const { app, BrowserWindow, Menu, MenuItem, globalShortcut} = require("electron");
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
  const menu = new Menu()
  menu.append(new MenuItem({
    label:'Electron',
    submenu:[
      {
        role:'help',
        accelerator:process.platform === 'darwin'?'Alt+Cmd+I':'Alt+Shift+i',
        click:()=>{console.log('Electron rocks');}
      }
    ]
  }))
  Menu.setApplicationMenu(menu)
  win.webContents.openDevTools()
  // 拦截主进程中的事件
  // before-input-event 事件会在 keyup keydown 之前执行
  win.webContents.on('before-input-event',(event,input)=>{
    if(input.control && input.key.toLowerCase() === 'i'){
      console.log('Pressed Control + I');
      event.preventDefault()
    }

  })

  win.loadFile('./index.html')
}


app.whenReady().then(()=>{
  globalShortcut.register('Alt+CommandOrControl+I',()=>{
    console.log('Electron loves global shortcuts');
  })
}).then(()=>{
  createWindow()
})


app.on('activate',()=>{
  if(BrowserWindow.getAllWindows().length === 0){
    createWindow()
  }
})
app.on('window-all-closed',()=>{
  if(process.platform!=='darwin'){
    app.quit()
  }
})