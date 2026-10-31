const { Server } = require("socket.io");

const io = new Server(8080, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected: ", socket.id);

  socket.on("room_create", () => {
    console.log(`Room create event triggered by client: ${socket.id}`);
    const room_id = "room_" + socket.id;
    socket.join(room_id);
    console.log(room_id);
  });

  socket.on("room_join", (data) => {
    const room_id = data.room_id;
    if (!room_id) return;

    const roomExists = io.sockets.adapter.rooms.has(room_id);

    if (!roomExists) {
      console.log(`Room does not exists ${data}`);
      return;
    }

    room_sockets = io.sockets.adapter.rooms.get(room_id);

    if (room_sockets.has(socket.id)) {
      console.log("Already in the room");
      return;
    }

    io.sockets.adapter.rooms.get(room_id).forEach((soc) => {
      console.log(soc);
    });

    socket.join(room_id);
    console.log(`Room joined ${room_id}`);

    io.to(room_id).emit("game_started");
  });

  socket.on("disconnect", (reason) => {
    console.log(`User disconnected due to: ${reason}`);
  });
});

console.log("Started listening on 8080...");
