const express = require('express')
const {Server} = require('socket.io')
const app = express()
const io = new Server(3000,{
    cors:{
        origin:['http://localhost:5173']
    }
})

const data = [
    {
        id:1,
        name:"张三",
        score:88,
        age:4
    },
    {
        id:2,
        name:"李四",
        score:8,
        age:5
    },
    {
        id:3,
        name:"王五",
        score:90,
        age:7
    }
]

io.on('connection',(socket)=>{
    console.log("Server connected...");
    socket.emit('loadData',data)
    socket.on('changeStatus',(status)=>{
        io.emit('changeStatus',status)
    })

    socket.on('changeInputValue',(data)=>{
        io.emit('changeInputValue',data)
    })
})
app.listen(8000,()=>{
    console.log("服务已经启动...");
})