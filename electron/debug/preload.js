const { ipcRenderer, contextBridge } = require('electron');
const fs = require('fs')
const content = fs.readFileSync('package.json','utf-8')
console.log(content);

// 在 node 环境下也可以进行 DOM 操作，但是这种 DOM 操作还是放在渲染进程中比较正确
// 正确的人做正确的事情
// window.addEventListener('DOMContentLoaded',()=>{
//    const h1 = document.querySelector('h1')
//    console.log(h1);
// })

// ipcMain.send('saveFile')
// ipcRenderer.send('saveFile')

contextBridge.exposeInMainWorld("api",{
    saveFile:()=>{
        ipcRenderer.send('saveFile')
    }
})


window.addEventListener('DOMContentLoaded',()=>{

    for (const app of ['chrome','node','electron']) {
        // console.log("app=>",app);
        const el = document.querySelector(`#${app}`)
        el.innerHTML = `${app}:${process.versions[app]}`
    }
})