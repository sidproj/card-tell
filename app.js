import express from "express"
import WebSocket, { WebSocketServer } from "ws";

const app = express();

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection",
    function connection(ws){
        ws.on("error",console.error);

        ws.on("message",function message(data){
            console.log(data)
        })
    }
)

app.use("/", (req, res) => {
  console.log("New req.");
  res.json({ message: "Hello world" });
});

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
