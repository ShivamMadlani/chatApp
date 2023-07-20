require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
const connectDb = require('./db');
const UserSchema = require('./model/model');

const APP_PORT = process.env.APP_PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

const httpserver = createServer(app);

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/public/register.html');
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
})

app.post('/register', async (req, res) => {
    try {
        const user = await UserSchema.create({
            name: req.body.name,
            password: req.body.password
        });
        res.redirect('/login');
        // res.status(201).json({ user });
    }
    catch (err) {
        res.redirect('/register');
        // res.status(500).json({ msg: err })
    }
})


const io = new Server(httpserver, {
    cors: {
        origin: 'http://localhost:3000', //change this in production
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

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI);
        httpserver.listen(APP_PORT, () => { console.log(`listening on port ${APP_PORT}`); });
    } catch (error) {
        console.log(error);
    }
}

start();