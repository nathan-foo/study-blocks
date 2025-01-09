const express = require('express');
const { createServer } = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = createServer(app);

app.use(cors);

const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000", // TODO update route for production
        methods: ["GET", "POST"],
    }
});

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);  
    socket.on('joinRoom', (name, room, questions) => {
        console.log(name);
        console.log(room);
        console.log(questions);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    })
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});