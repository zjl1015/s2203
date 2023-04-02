const { app, BrowserWindow, nativeImage, Tray, Menu } = require("electron");
const path = require('path')

let tray 
const createWindow = ()=>{
    const mainWindow = new BrowserWindow({
        width:300,
        height:300,
        alwaysOnTop:true,
        icon:path.join(__dirname,'icons/count-down.ico')
    })

    mainWindow.loadFile('index.html')
}

app.whenReady().then(()=>{
    const icon = nativeImage.createFromPath(path.join(__dirname,'icons/count-down.png'))
    tray = new Tray(icon)
    const contextMenu = Menu.buildFromTemplate([
        {
            label:'设置',
            type:'radio',
            click:()=>{console.log('点击了。。。');}
        }
    ])

    tray.setContextMenu(contextMenu)
    createWindow()
})

app.on('activate',()=>{
    if(BrowserWindow.getAllWindows().length === 0){
        createWindow()
    }
})

app.on('window-all-closed',()=>{
    if(process.platform !== 'darwin'){
        app.quit()
    }
})