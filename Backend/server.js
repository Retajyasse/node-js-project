require("dotenv").config();

const http = require("http");
const app = require("./src/app");
const connectDB = require("./src/config/db");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 3000;


connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});


io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


app.set("io", io);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});