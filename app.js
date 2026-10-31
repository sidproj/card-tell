import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket) => {
  console.log("Client connected!", socket);
  socket.on("error", console.error);

  socket.on("message", function message(data) {
    console.log(data);
  });

  socket.on("close",()=>{
    console.log("Client closed connection")
  })
});
