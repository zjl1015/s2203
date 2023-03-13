# 进程间通信

1. 渲染进程通过预加载脚本调用主进程方法
   1.1 预加载脚本通过 contextBridge.exposeInMainWorld 暴露出来的 api 直接挂载到渲染进程中全局对象 window 上了
   1.2 渲染进程通过 window.api.XXX 来调用渲染进程中的方法
   1.3 预加载脚本中通过 ipcRender.send/invoke 方法调用主进程中的方法
   1.4 主进程通过 ipcMain.on/handle 方法来执行或返回 promise
2. 主进程中
   2.1 获取窗口对象：BrowserWindow.fromWebContents(event.sender)
   2.2 打开对话框选取文件：dialog.showOpenDialog()
