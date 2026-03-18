const express = require('express')
const {Server}=require('socket.io')
const http = require('http')
const path = require('path')
const setupSocket = require("./socket.js");
const setupRedis = require("./redis.js");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;


const server = http.createServer(app);
const io = new Server(server);


app.use(express.static(path.join(__dirname,'./Client')));
// console.log(__dirname)


setupRedis(io);

setupSocket(io);


server.listen(PORT, () => {
    console.log(`Server Started at Port ${PORT}`);
});


// ------------------------------------------------------------------------------------------
// const server = app.listen(4000,()=>{
//     console.log("Server Started.\nListening at Port 4000\nhttp://localhost:4000")
// })

// const io = new Server(server);

