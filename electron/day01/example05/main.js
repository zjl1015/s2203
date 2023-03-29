
const {app,BrowserWindow,shell, dialog, ipcMain} = require('electron')
const path = require('path')
let mainWindow
// 将应用注册为 'electron-fiddle://' 协议的处理器
if(process.defaultApp){
  if(process.argv.length >=2){
    app.setAsDefaultProtocolClient('electron-fiddle',process.execPath,[path.resolve(process.argv[1])])
  }
}else{
  app.setAsDefaultProtocolClient('electron-fiddle')
}

if(process.platform !=='darwin'){
  const goTheLock = app.requestSingleInstanceLock()
  if(!goTheLock){
    app.quit()
  }else{
    app.on('second-instance',(event,commandLine,workingDirectory)=>{
      // 用户正在尝试运行第二个实例，我们需要让焦点指向我们的窗口
      if(mainWindow){
        if(mainWindow.isMaximized())  mainWindow.restore()
        mainWindow.focus()
      }
      dialog.showErrorBox('Welcome back ',`You arrived from ${commandLine.pop().slice(0,-1)}`)
    })
  }
}

const createWindow = ()=>{
    mainWindow = new BrowserWindow({
    width:300,
    height:300,
    alwaysOnTop:true,
    x:1600,
    y:100,
    webPreferences:{
      preload:path.resolve(__dirname,'renderer.js')
    }
  })
  mainWindow.loadFile('index.html')
}

app.whenReady().then(()=>{
  createWindow()
})

ipcMain.on('shell:open',()=>{
  const pageDirectory = __dirname.replace('app.asar','app.asar.unpacked')
  const pagePath = path.join("file://",pageDirectory,'index.html')
  shell.openExternal(pagePath)
})



// MacOS / Liunx 写法
app.on('open-url',(event,url)=>{
  dialog.showErrorBox('欢迎回来，',`导向自：${url}`)
})






app.on('window-all-closed',()=>{
  if(process.platform !== 'darwin') app.quit()
})