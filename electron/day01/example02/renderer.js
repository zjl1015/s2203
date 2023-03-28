window.addEventListener('DOMContentLoaded',()=>{
  const btnToggleDark = document.querySelector('#toggle-dark-mode')
  const btnResetSystemTheme = document.querySelector('#reset-to-system')
  const themeSourceEle = document.querySelector('#theme-source')
  btnToggleDark.addEventListener('click',async ()=>{
    const isDarkMode = await window.darkMode.toggle()
    themeSourceEle.innerHTML = isDarkMode?'Dark':'Light'
  })
  btnResetSystemTheme.addEventListener('click',async ()=>{
    await window.darkMode.system()
    themeSourceEle.innerHTML= 'System'
  })
})