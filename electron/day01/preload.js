/**
 * 主进程 ： 无法直接和渲染进程通信
 * 渲染进程
 * 
 * 预加载脚本：在渲染进程加载前加载，并且可以同时访问主进程(nodejs环境)和渲染进程(window document环境)
 * 
 */

window.addEventListener('DOMContentLoaded',()=>{
  const replaceText = (selector,text)=>{
    const element = document.querySelector(selector)
    if(element) {
      element.innerText = text
    }
  }

  for (const selector of ['chrome','node','electron']) {
    replaceText("#"+selector,process.versions[selector])
  }
})