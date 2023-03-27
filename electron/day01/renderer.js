// window.addEventListener('DOMContentLoaded',()=>{
//   document.body.innerHTML = "你好啊哈哈"
// })

window.addEventListener('DOMContentLoaded',()=>{
  const replaceText = (selector,version)=>{
    document.querySelector(selector).innerText = version
  }
  for (const selector of ['chrome','node','electron']) {
    // 在渲染进程中可以直接使用预加载脚本中的暴露的 versions 对象
    replaceText('#'+selector,versions[selector]())
  }
  console.log(versions);
})


async function func(){
  const res = await window.versions.ping()
  console.log("res==>",res);
}

func()



window.addEventListener('DOMContentLoaded',()=>{
  const btn = document.querySelector('#btn')
  const titleInput = document.querySelector('#title')
  const btnOpenFile = document.querySelector('#open-file')
  const filePathElement = document.querySelector('#filepath')
  btn.addEventListener('click',()=>{
    const title = titleInput.value
    window.electronApi.setTitle(title)
  })

  btnOpenFile.addEventListener('click',async ()=>{
    const filePath = await window.electronApi.openFile()
    filePathElement.innerText = filePath
  })
})