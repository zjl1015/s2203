const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('electronApi',{
  showCustomMenu:()=>ipcRenderer.invoke('menu:showCustomMenu')
})
