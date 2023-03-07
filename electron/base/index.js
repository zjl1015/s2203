// 主进程 运行 nodejs
// 使用 electron 中的 BrowserWindow 模块
const { BrowserWindow, app } = require("electron");
const path = require("path");
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 300,
    height: 300,
    alwaysOnTop: true, // 窗口置顶
    x: 1500,
    y: 100,
    frame: false, // 隐藏标题栏
    transparent: true // 窗口透明
  });

  // 让窗口加载网页
  // mainWindow.loadURL("http://www.bufanui.com");
  // 设置拖放时的比例
  mainWindow.setAspectRatio(1);
  // 让窗口加载文件
  mainWindow.loadFile(path.resolve(__dirname, "index.html"));
  // console.log("__dirname===>", __dirname);
};
app.whenReady().then(() => {
  // 窗口运行时就打开调试工具
  // mainWindow.webContents.toggleDevTools();
  createWindow();
});

// 监听窗口全部关闭事件
app.on("window-all-closed", () => {
  // darwin 是 mac 系统
  // 如果是 mac 系统 就不推出
  if (process.platform !== "darwin") app.quit();
});
app.on("activate", () => {
  // 重新打开窗口
  createWindow();
});
