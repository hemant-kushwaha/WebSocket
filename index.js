const express = require('express')
const {Server}=require('socket.io')
const http = require('http')
const path = require('path')

const app = express();

const server = http.createServer(app);
const io = new Server(server);


app.use(express.static(__dirname));

app.get('/',(req,res)=>{

    res.sendFile(path.join(__dirname,'index.html'))
})




io.on("connection",(socket)=>{ //connectionName : connection is fixed

    // socket.on("msg",(data)=>{
    //     // io.emit("new msg", data)// --> TO everyone including SELF
    //     socket.broadcast.emit('new msg',data)
    // })

    socket.on('msg',({room,msg})=>{
        // io.to(room).emit('new msg',msg)// --> SELF Send Also
        socket.to(room).emit('new msg',msg)
    })

    socket.on('join-room',(room)=>{
        socket.join(room)
    })

    socket.on("disconnect", ()=>{
        console.log(" Socket Disconnected From Server")
    })
})


server.listen(4000,()=>{
    console.log("Server Started.\nListening at Port 4000\nhttp://localhost:4000")
})


// ------------------------------------------------------------------------------------------
// const server = app.listen(4000,()=>{
//     console.log("Server Started.\nListening at Port 4000\nhttp://localhost:4000")
// })

// const io = new Server(server);

