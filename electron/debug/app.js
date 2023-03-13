const { BrowserWindow, app, ipcMain, dialog } = require("electron");
const path = require("path");
const { createMenu } = require("./menu.js");
const createWindow = () => {
  const win = new BrowserWindow({
    width: 300,
    height: 300,
    x: 1200,
    y: 100,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      // 指定预加载脚本
      preload: path.resolve(__dirname, "preload.js")
    }
  });
  win.webContents.openDevTools();
  win.loadFile(path.resolve(__dirname, "index.html"));
  createMenu(win);
};

app.whenReady().then(() => {
  createWindow();
});

// 监听预加载进程自定义事件 saveFile
ipcMain.on("saveFile", (event) => {
  console.log("saveFile");
  BrowserWindow.fromWebContents(event.sender).send("msg", "已经收到消息");
});

// handle 处理预加载进程的事件
ipcMain.handle("selectFile", async (event) => {
  const { filePaths } = await dialog.showOpenDialog();
  //   console.log(filePaths[0]);
  return filePaths[0];
});

ipcMain.on("updateTitle", (event, newTitle) => {
  BrowserWindow.fromWebContents(event.sender).title = newTitle;
});
