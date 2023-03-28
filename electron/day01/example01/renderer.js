window.addEventListener('DOMContentLoaded',()=>{
  const setVersions = (selector,text)=>{
    const element =  document.querySelector('#'+selector)
    if(element){
      element.innerText = text
    }
  }
  for (const selector of ['node','chrome','electron']) {
    setVersions(selector,window.versions.getVersion(selector))
  }
})