const {BrowserWindow,app, ipcMain} = require('electron')
const path = require('path')
const {createMenu} = require('./menu.js')
const createWindow = ()=>{
    const win = new BrowserWindow({
        width:300,
        height:300,
        x:1200,
        y:100,
        alwaysOnTop:true,
        webPreferences:{
            nodeIntegration:true,
            // 指定预加载脚本
            preload:path.resolve(__dirname,'preload.js')
        }
    })
    win.webContents.openDevTools()
    win.loadFile(path.resolve(__dirname,'index.html'))
    createMenu(win)    
}


app.whenReady().then(()=>{
    createWindow()
})

// 监听预加载进程自定义事件 saveFile
ipcMain.on("saveFile",()=>{
    console.log("saveFile");
})
