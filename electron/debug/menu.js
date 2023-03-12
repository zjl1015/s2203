const { Menu } = require("electron");

// 主进程向渲染进程通信
const createMenu = (win)=>{
    const menu = [
        {
            label:"electron",
            submenu:[
                {
                    label:'增加',
                    click:()=>{
                        console.log(win);
                    }
                }
            ]
        }
    ]

    Menu.setApplicationMenu(Menu.buildFromTemplate(menu))
}



module.exports = {
    createMenu
}