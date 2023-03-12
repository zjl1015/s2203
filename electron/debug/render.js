// for(let i=0;i<10;i++){
//     console.log(i);
// }

// 在渲染进程向主进程发送消息的机制是通过预加载进程
// 在预加载进程中使用 contextBridge

window.addEventListener("DOMContentLoaded",()=>{
    const btn = document.querySelector('#btn')
    btn.addEventListener('click',()=>{
        // saveFile 方法是在预加载进程中定义的
        // 因为预加载进程可以与主进程通信
        window.api.saveFile()
    })
})