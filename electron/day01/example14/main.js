const {app, BrowserWindow} = require('electron')
const path = require('path')
const createWindow = ()=>{
  const mainWindow = new BrowserWindow({
    width:300,
    height:300,
    x:1600,
    y:100,
    // alwaysOnTop:true
  })
  // 给窗口设置缩略图工具栏
  mainWindow.setThumbarButtons([
    {
      tooltip:'button1',
      icon:path.join(__dirname,'../images/button.png'),
      click:()=>{console.log('button1 clicked');}
    }
    ,
    {
      tooltip:'button2',
      icon:path.join(__dirname,'../images/button2.png'),
      flags:['enabled','dismissonclick'],
      click:()=>{console.log('button2 clicked');}
    }
  ])

  mainWindow.setOverlayIcon(path.join(__dirname,'../images/button.png'),'这个是描述')
  mainWindow.once('focus',()=>mainWindow.flashFrame(false))
  mainWindow.flashFrame(true)
  mainWindow.loadFile('index.html')

}

app.whenReady().then(()=>{
  createWindow()
})

app.setUserTasks([
  {
    program:process.execPath,
    arguments:'--new-window',
    iconPath:process.execPath,
    iconIndex:0,
    title:'New Window',
    description:'Create a new window'
  }
])


console.log("path===>",process.execPath);


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

