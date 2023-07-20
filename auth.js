const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');
const { ConnectDB } = require('./db');

passport.use(
    new LocalStrategy(
        async function verifyusr(uname, pswd, status) {
            db = await ConnectDB(process.env.MONGO_URI);
        }
    )
);