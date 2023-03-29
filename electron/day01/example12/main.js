const { BrowserWindow, app, Menu, MenuItem, } = require('electron')

let mainWindow 
const createWindow = ()=>{
  mainWindow = new BrowserWindow({
    width:300,
    height:300,
    x:1600,
    y:100,
    alwaysOnTop:true
  })
 
  // 所有可用语言代码的数组
  const possibleLanguages = mainWindow.webContents.session.availableSpellCheckerLanguages
  console.log("possibleLanguage==>",possibleLanguages);
  mainWindow.webContents.on('context-menu',(event,params)=>{
    console.log("params==>",params);
    const menu = new Menu()
    // 添加拼写建议
    for (const suggestion of params.dictionarySuggestions) {
      menu.append(new MenuItem({
        label:suggestion,
        click:()=>mainWindow.webContents.replaceMisspelling(suggestion)
      }))
    }
    // 允许用户将拼错的单词添加到字典中
    if(params.misspelledWord){
      menu.append(new MenuItem({
        label:'Add to dictionary',
        click:()=>mainWindow.webContents.session.addWordToSpellCheckerDictionary(params.misspelledWord)
      }))
    }
    menu.popup()
  })
  mainWindow.loadFile('index.html')
}









app.whenReady().then(()=>{
  createWindow()
})

app.on('window-all-closed',()=>{
  if(process.platform !=='darwin') app.quit()
})

app.on('activate',()=>{
  if(BrowserWindow.getAllWindows().length === 0){
    createWindow()
  }
})
