function setupSocket(io) {

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

}

module.exports = setupSocket;