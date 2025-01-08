const express = require('express');
const { createServer } = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = createServer(app);

app.use(cors);

const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000/play",
        methods: ["GET", "POST"],
    }
});

io.on('connection', (socket) => {
    console.log('User connected');
})

const PORT = 8000;

// Sends to localhost:8000
// app.get('/', (req, res) => {
//     res.send('<h1>Hello world</h1>  ');
// });

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});