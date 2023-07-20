const LocalStrategy = require('passport-local').Strategy;
const UserSchema = require('./model/model');

function initialize(passport, getUserbyName, getUserbyId) {
    const authenticateUser = async (name, password, done) => {
        const user = getUserbyName(name);
        if (user == null) {
            return done(null, false, { message: 'No user with that name' });
        }

        try {
            if (password == user.password) {
                return done(null, user);
            }
            else {
                return done(null, false, { message: 'Incorrect password' });
            }
        }
        catch (err) {
            return done(err);
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'name' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        return done(null, getUserbyId(id))
    });
}

module.exports = initialize;