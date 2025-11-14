import express from 'express';
import { createServer } from 'http';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { log } from 'console';


const app = express();
const server = createServer(app);

dotenv.config();
const PORT = process.env.PORT;

const io = new Server(server);

// Socket.io connection
io.on('connection', (socket) => {
  // console.log('A new user connected', socket.id);
  socket.on("chatMessage", (msg) => {
    // io.emit("chatMessage", msg);
    console.log("A new user message :", msg);
    io.emit("message", msg);
  });
});

app.use(express.static('/views'));

app.get('/', (req, res) => {
  res.sendFile('/views/index.html', { root: '.' });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});