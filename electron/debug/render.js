// for(let i=0;i<10;i++){
//     console.log(i);
// }

// 在渲染进程向主进程发送消息的机制是通过预加载进程
// 在预加载进程中使用 contextBridge

window.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector("#btn");
  const btnSelectFile = document.querySelector("#selectFile");
  const changeTitleBtn = document.querySelector("#changeTitleBtn");
  btn.addEventListener("click", () => {
    // saveFile 方法是在预加载进程中定义的
    // 因为预加载进程可以与主进程通信
    window.api.saveFile();
  });
  //   btnSelectFile.addEventListener("click", async () => {
  //     const file = await window.api.selectFile();
  //     document.querySelector("input").value = file;
  //   });
  btnSelectFile.addEventListener("click", () => {
    window.api.selectFile((file) => {
      document.querySelector("input").value = file;
    });
  });
  changeTitleBtn.addEventListener("click", () => {
    const newTitle = document.querySelector("#title").value;
    window.api.changeTitle(newTitle);
  });
});

window.api.counter((value) => {
  const el = document.querySelector("#counter");
  el.innerHTML = Number(el.textContent) + value;
});
