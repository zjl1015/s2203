// app 模块，控制应用程序的事件生命周期
// BrowserWindow 模块，创建和管理应用程序窗口
const { app, BrowserWindow } = require("electron");

const createWindow = ()=>{
   // 创建一个应用程序窗口
   const win = new BrowserWindow({
    width: 300,
    height: 300,
  });
  // 把页面加载到当前窗口
  win.loadFile("index.html");
}
// 只有在 app 模块的 ready 事件被激发后才能创建浏览器窗口，app.whenReady() api 监听 ready 事件
app.whenReady().then(() => {
  createWindow()
});
