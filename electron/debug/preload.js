const { ipcRenderer, contextBridge } = require("electron");
const fs = require("fs");
const content = fs.readFileSync("package.json", "utf-8");
console.log(content);

// 在 node 环境下也可以进行 DOM 操作，但是这种 DOM 操作还是放在渲染进程中比较正确
// 正确的人做正确的事情
// window.addEventListener('DOMContentLoaded',()=>{
//    const h1 = document.querySelector('h1')
//    console.log(h1);
// })

// ipcRenderer.send('saveFile')

// contextBridge.exposeInMainWorld("api", {
//   saveFile: () => {
//     ipcRenderer.send("saveFile");
//   }
// });

window.addEventListener("DOMContentLoaded", () => {
  for (const app of ["chrome", "node", "electron"]) {
    // console.log("app=>",app);
    const el = document.querySelector(`#${app}`);
    el.innerHTML = `${app}:${process.versions[app]}`;
  }
});

// ipcRenderer.on("test", (event, value) => {
//   //   console.log("test...");
//   //   虽然在预加载进程中也可以操作 DOM 但是，我们还是需要各司其职
//   // 在渲染进程中操作 DOM
//   //   const el = document.querySelector("#counter");
//   //   el.innerHTML = Number(el.textContent) + 1;
// });

contextBridge.exposeInMainWorld("api", {
  counter: (callback) => {
    ipcRenderer.on("test", (event, value) => {
      callback(value);
    });
  },
  saveFile: () => {
    ipcRenderer.send("saveFile");
  },
  selectFile: async (callback) => {
    // invoke handle 是另外的一种主进程和预加载进程通信的方式，
    // 这种方式可以直接 return 数据(promise)
    const file = await ipcRenderer.invoke("selectFile");
    // console.log("file===>", file);
    // return file;
    callback(file);
  },
  changeTitle: (newTitle) => {
    ipcRenderer.send("updateTitle", newTitle);
  }
});
ipcRenderer.on("msg", (event, value) => {
  console.log("value==>", value);
});
