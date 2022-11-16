// require('dotenv').config();
// const mongoose = require('mongoose');
// const routes = require('./routes/messages')
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.json());
// app.use(routes)

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (sokt) => {
    console.log('new connection');
    sokt.on('chat-message', (message) => {
        sokt.broadcast.emit('message', message);
    })
})

console.log('listening on port 3000...');
httpServer.listen(3000);
