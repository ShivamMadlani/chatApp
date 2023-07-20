const LocalStrategy = require('passport-local').Strategy;
const UserSchema = require('./model/model');

function initialize(passport) {
    const authenticateUser = async (name, password, done) => {
        UserSchema.findOne({ name: name }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'No such user' });
            }
            if (user.password != password) {
                return done(null, false, { message: 'Invalid password.' });
            }
            return done(null, user);
        })
    }
    passport.use(new LocalStrategy({ usernameField: 'name' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        UserSchema.findById(id, (err, user) => {
            done(err, user);
        })
    });
}

module.exports = initialize;