const {app,Tray,nativeImage, Menu, BrowserWindow} = require('electron')
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
let tray
app.whenReady().then(()=>{
  createWindow()
  const icon = nativeImage.createFromPath('../images/head.png')
  tray = new Tray(icon)
  const contextMenu = Menu.buildFromTemplate([
    {
      label:'Item1',
      type:'radio'
    },
    {
      label:'Item2',
      type:'radio'
    },
    {
      label:'Item3',
      type:'radio',
      checked:true
    },
    {
      label:'Item4',
      type:'radio'
    }
  ])

  tray.setContextMenu(contextMenu)
  tray.setToolTip('This is my application')
  tray.setTitle('This is my title')
})

