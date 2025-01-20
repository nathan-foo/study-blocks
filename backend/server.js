const express = require('express');
const { createServer } = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const fs = require("fs");

const app = express();
const server = createServer({
    key: fs.readFileSync("/etc/letsencrypt/live/sb.nathanfoo.com/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/sb.nathanfoo.com/fullchain.pem"),
}, app);

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const io = socketIo(server, {
    connectionStateRecovery: {},
    cors: {
        origin: "https://study-blocks.nathanfoo.com",
        methods: ["GET", "POST"],
        credentials: true,
    }
});

let games = [];

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle user joining a room
    socket.on('userJoin', (name, room, questions) => {
        socket.join(room);

        let game = games.find(game => game.id === room);

        if (!game) {
            games.push(
                {
                    id: room,
                    players: [],
                    questions: questions,
                    currentQuestion: 0,
                    answers: 0,
                    correctAnswers: 0,
                }
            );
            game = games.find(game => game.id === room);
        }

        if (game.currentQuestion > 0) {
            socket.emit('ongoingGame');
        } else if (!game.players.some(player => player.name === name)) {
            socket.name = name;
            socket.room = room;

            const player = { name: name, points: 0 };

            game.players.push(player);

            io.to(room).emit('setUserJoin', player, game.players);
        } else {
            io.to(room).emit('invalidName');
        }
    });

    // Handle game start
    socket.on('gameStart', (room) => {
        let game = games.find(game => game.id === room);
        io.to(room).emit('setGameStart');

        const currentQuestion = game.questions[game.currentQuestion].question;
        const currentAnswers = game.questions[game.currentQuestion].answers;
        game.currentQuestion += 1;

        io.to(room).emit('setNewQuestion', currentQuestion, currentAnswers, game.currentQuestion);

        const currentIndex = game.currentQuestion;

        setTimeout(() => {
            // In case question moves on early due to everyone finishing
            if (currentIndex === game.currentQuestion) {
                io.to(room).emit('endQuestion', game.players);
            }
        }, 20000);
    });

    // Handle when a player answers
    socket.on('playerAnswer', (room, answer) => {
        let game = games.find(game => game.id === room);
        let player = game.players.find(player => player.name === socket.name);

        if (answer) {
            player.points += 1000 - Math.floor((Math.random() * 100) + (game.correctAnswers / game.players.length * 800));
            game.correctAnswers += 1;
        }
        game.answers += 1;

        if (game.answers === game.players.length) {
            io.to(room).emit('endQuestion', game.players);
            game.answers = 0;
            game.correctAnswers = 0;
        }
    });

    // Handle leaderboard
    socket.on('showLeaderboard', (room) => {
        io.to(room).emit('setLeaderboard');
    });

    // Handle new question request
    socket.on('nextQuestion', (room) => {
        let game = games.find(game => game.id === room);

        if (game?.currentQuestion >= game.questions.length) {
            io.to(room).emit('endGame', game.players);
        } else {
            const currentQuestion = game.questions[game.currentQuestion].question;
            const currentAnswers = game.questions[game.currentQuestion].answers;
            game.currentQuestion += 1;

            io.to(room).emit('setNewQuestion', currentQuestion, currentAnswers, game.currentQuestion);

            const currentIndex = game.currentQuestion;

            setTimeout(() => {
                // In case question moves on early due to everyone finishing
                if (currentIndex === game.currentQuestion) {
                    io.to(room).emit('endQuestion', game.players);
                }
            }, 20000);
        }
    });

    // Handle user leave
    socket.on('disconnect', () => {
        let game = games.find(game => game.id === socket.room);

        if (game) {
            game.players = game.players.filter(player => player.name != socket.name);

            io.to(socket.room).emit('userLeave', game.players);

            if (game.players.length === 0) {
                games = games.filter(game => game.id !== socket.room);
            }
        }

        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 80;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});