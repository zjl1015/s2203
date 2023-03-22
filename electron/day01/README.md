# 准备工作
  1. 安装最新版本的 Node.js
  2. 新建文件夹
  3. npm init -y
  4. cnpm install electron
  5. 新建 index.js 文件
  6. 在 package.json 中修改脚本 dev:electron .
  7. 新建 index.html 文件
## 修改 package.json 
  1. 全局安装 nodemon : cnpm i -g nodemon
  2. dev:electron . 每次修改代码都需要重启项目，这比较麻烦，
     需要使用 nodemon,修改后的值为：dev:nodemon  --exec npx electron .

## 打包
  1. 安装 electron forge
     npm install --save-dev @electron-forge/cli
  2. 设置脚手架
     npx electron-forge import
  3. 打包
     npm run make
