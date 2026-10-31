const {Server} = require("socket.io");

const io = new Server(8080,{
    cors:{
        origin:"*",
    }
})

io.on("connection",(socket)=>{
    console.log("User connected: ",socket.id);
})

console.log("Started listening on 8080...")