// require('dotenv').config();
// const mongoose = require('mongoose');
// const routes = require('./routes/messages')
const express = require('express');
const app = express();
const socket = require('socket.io');

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.json());

// app.use(routes)

const server = app.listen(3000, () => {
    console.log('listening on 3000...');
})

const io = socket(server)
io.on("connection", (socket) => {
    console.log('new connection');
    socket.on('chat-message', (message) => {
        console.log(message);
    })
})
