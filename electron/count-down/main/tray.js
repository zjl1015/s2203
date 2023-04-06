
const {nativeImage,Tray, Menu} = require('electron')
const path = require('path')
// 创建系统托盘
const createSystemTray = ()=>{
  const icon = nativeImage.createFromPath(path.join(__dirname,'../icons/count-down.png'))
  const menu = Menu.buildFromTemplate([
    {
      label:'首选项',
      click:()=>{console.log('你点击了首选项...');}
    },
    {
      label:'退出',
      click:()=>{console.log('你点击了退出...');}
    }
  ])
  const tray = new Tray(icon)
  tray.setToolTip('倒计时')
  tray.setContextMenu(menu)
}

exports.createSystemTray = createSystemTray
// module.exports = {
//   createSystemTray
// }

