const express = require('express')
const {Server} = require('socket.io')
const app = express()
const io = new Server(3000,{
  cors:{
    origin:['http://localhost:8080']
  }
})

/**
 * 用户集合中的某一项为
 * {
 *    username:xxx
 *    id:xxx
 * }
 */
const userList = []
const handleConnection = (socket)=>{
  console.log("Server connection...");
  // console.log(socket.id);
  // console.log(socket.handshake.query.username);
  const username = socket.handshake.query.username;
  // 由于用户每次登录 id 会发生改变
  // 所有每次登录时要判断该用户是否存在
  const userInfo = userList.find(user=>user.username === username)
  if(userInfo){
    userInfo.id = socket.id
  }else{
    userList.push({
      username,
      id:socket.id
    })
  }
  // 自定义事件
  io.emit("online",{userList})
  socket.on('send',({fromUsername,targetId,msg,dateTime})=>{
    // console.log("Server msg=>",fromUsername,targetId,msg,dateTime);
    // 需要获取当前链接的socket
    const targetSocket = io.sockets.sockets.get(targetId)
    const targetUser = userList.find(user=>user.id === targetId)
    console.log("targetUser=>",targetUser);
    if(!targetUser) return
    targetSocket.emit('receive',{
      fromUsername,
      msg,
      dateTime,
      toUsername:targetUser.username
    })
  })

}
const handleError = (err)=>{
  console.log("Server error",err);
}


const bindEvent = ()=>{
  io.on('connection',handleConnection)
  io.on('error',handleError)
}

const init = ()=>{
  bindEvent()
}
init()
app.listen(8000,()=>{
  console.log("服务已启动...");
})