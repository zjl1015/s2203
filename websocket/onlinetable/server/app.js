const express = require('express')
const {Server} = require('socket.io')
const app = express()
const io = new Server(3000,{
   cors:{
    origin:['http://localhost:5173']
   }
})
// 准备数据
const data = [
    {
        id:1,
        name:'张三',
        age:18,
        score:88
    },
    {
        id:2,
        name:'李四',
        age:10,
        score:87
    },
    {
        id:3,
        name:'王五',
        age:19,
        score:98
    }
]
io.on('connection',(socket)=>{
    console.log("Server connection...");
    io.emit('loadData',data)
    socket.on('changeInput',(data)=>{
        // console.log("data=>",data);
        io.emit('changeInput',data)
    })
    socket.on('changeStatus',(status)=>{
        console.log(status);
        io.emit('changeStatus',status)
    })
})
app.listen(8000,()=>{
    console.log("服务已启动...");
})