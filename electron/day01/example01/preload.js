const { contextBridge } = require("electron");


contextBridge.exposeInMainWorld('versions',{
  getVersion:(selector)=>process.versions[selector]
})