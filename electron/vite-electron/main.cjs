const { BrowserWindow, app } = require("electron");
const path = require("path");
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 300,
    height: 300,
    alwaysOnTop: true,
    x: 1500,
    y: 100
    // transparent: true,
    // frame: false
  });
  // mainWindow.loadFile(path.resolve(__dirname, "index.html"));
  mainWindow.loadURL("http://localhost:5173/");
};
app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  createWindow();
});
