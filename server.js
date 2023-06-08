const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const APP_PORT = process.env.APP_PORT || 3000;

const app = express();

app.use(cors());
app.use(express.static('public'))

const httpserver = createServer(app);
const io = new Server(httpserver, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log(`new connection ${socket.id}`);
    socket.on('chat-message', (mssg) => {
        io.emit('new_message', mssg);
    });
    // socket.broadcast.emit('chat-message', 'A user has joined');

    // io.on('disconnect', ()=>{
    //     io.emit('chat-message', 'A user left');
    // })
});

httpserver.listen(APP_PORT, () => {
    console.log(`listening on port ${APP_PORT}`);
});
