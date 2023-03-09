/* const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { 
  cors:{
    origin:['http://localhost:8080','http://localhost:5173']
  }
 });

io.on("connection", (socket) => {
  console.log("Server connection...");
});

httpServer.listen(3000); */

const express = require('express')
const { createServer } = require("http");
const {Server} = require('socket.io')
const cors = require('cors')
const app = express()
app.use(cors())
const httpServer = createServer(app);
const io = new Server(httpServer,{
  cors:{
    origin:['http://localhost:8080','http://localhost:5173']
  }
})

// 收集链接到 socket 的用户名
/**
 * {
 *   username:xxxx
 *   id:xxxx
 * }
 */
const userList = []

io.on('connection',(socket)=>{
  // console.log("socket=>",socket);
  // console.log("Server username=>",socket.handshake.query.username);
  // console.log("Server socket.id=>",socket.id);
  const username = socket.handshake.query.username
  if(!username) return
  const userInfo = userList.find(user=>user.username === username)
  if(userInfo){
    // 因为同一个用户退出后再次登录时 id 会发生改变
    userInfo.id = socket.id
  }else{
    userList.push({
      username:username,
      id:socket.id
    })
  }

  // console.log(userList);
  // 发送自定义事件 
  io.emit('online',{userList})

  socket.on('send',({fromUsername,targetId,msg})=>{
    // console.log(fromUsername,targetId,msg);
    // io.sockets.sockets 是一个 map 集合
    // 里面存在的是每个一与当前 socket 链接的 客户端
    // console.log(io.sockets.sockets);

    const targetSocket = io.sockets.sockets.get(targetId)
    const toUser = userList.find(user=>user.id === targetId)

    targetSocket.emit('receive',{
      fromUsername,
      toUsername:toUser.username,
      msg:msg,
      dateTime:new Date().getTime()
    })
  })
})


httpServer.listen(3000,()=>{
  console.log("服务已启动...");
})