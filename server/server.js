require('dotenv').config();

//server imports
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');

const connectDb = require('./config/db');
const UserSchema = require('../model/model');
const messagesSchema = require('../model/messages_model');

//passport imports and init
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const initializePassport = require('./config/auth');
initializePassport(passport);

const APP_PORT = process.env.APP_PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, '../views')));
app.set('view engine', 'ejs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//create socket instance
const httpserver = createServer(app);
const io = new Server(httpserver, {
    cors: {
        origin: 'http://localhost:3000', //change this in production
        methods: ['GET', 'POST'],
    },
});

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function checkNotAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

app.get('/auth/google/callback', passport.authenticate( 'google', {
    successRedirect: '/',
    failureRedirect: '/login'
 }));

app.get('/login', checkNotAuth, (req, res) => {
    try {
        res.render('login');
        res.status(200);
    } catch (error) {
        console.error(error);
        res.status(500);
    }
});

app.post('/login', checkNotAuth, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));


app.get('/register', checkNotAuth, (req, res) => {
    try {
        res.render('register');
        res.status(200);
    } catch (error) {
        console.error(error);
        res.status(500);
    }
});

app.post('/register', checkNotAuth, async (req, res) => {
    try {
        await UserSchema.create({
            name: req.body.name,
            password: req.body.password
        });
        res.redirect('/login');
        res.status(201);
    }
    catch (error) {
        console.error(error);
        res.redirect('/register');
        res.status(500);
    }
})

app.get('/', checkAuth, (req, res) => {
    try {
        res.render('index', { name: req.user.name });
        res.status(200);
    } catch (error) {
        console.error(error);
    }
})

io.on('connection', (socket) => {
    console.log(`new connection ${socket.id}`);

    const fetchMessagesfromDB = async () => {
        try {
            const messagesfromDB = await messagesSchema.find({});
            if (messagesfromDB) {
                messagesfromDB.forEach(element => {
                    socket.emit('new_message', {
                        sender: element.name,
                        text: element.message,
                        time: element.time
                    });
                });
            }
        } catch (err) {
            console.log(err);
        }
    }
    fetchMessagesfromDB();

    socket.on('chat-message', (data) => {
        io.emit('new_message', {
            sender: data.sender,
            text: data.text,
            time: data.time
        });

        try {
            messagesSchema.create({
                name: data.sender,
                message: data.text,
                time: data.time
            });
        }
        catch (err) {
            console.warn(err);
        }
    });
});

app.post('/logout', (req, res) => {
    req.logOut(req.user, err => {
        if (err) return next(err);
        res.redirect('/login');
        res.status(200);
    });
})

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI);
        httpserver.listen(APP_PORT, () => { console.log(`listening on port ${APP_PORT}`); });
    } catch (error) {
        console.warn(error);
    }
}

start();