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

let games = [];

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('userJoin', (name, room, questions) => {
        socket.join(room);

        let game = games.find(game => game.id === room);

        if (!game) {
            games.push(
                {
                    id: room,
                    players: [],
                    questions: questions,
                }
            );
            game = games.find(game => game.id === room);
        } else if (!game.players.includes(name)) {
            socket.name = name;
            socket.room = room;

            game.players.push(name);

            io.to(room).emit('userJoinToast', name, game.players);
        } else {
            io.to(room).emit('invalidName');
        }
    });

    socket.on('disconnect', () => {
        let game = games.find(game => game.id === socket.room);
        
        if (game) {
            game.players = game.players.filter(player => player != socket.name);

            io.to(socket.room).emit('userLeave', game.players);

            if (game.players.length === 0) {
                games = games.filter(game => game.id !== socket.room);
            }
        }

        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});