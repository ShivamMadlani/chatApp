const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const UserSchema = require("../../model/model");

function initialize(passport) {
  const authenticateLocalUser = async (name, password, done) => {
    UserSchema.findOne({ name: name }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "No such user" });
      }
      if (user.password != password) {
        return done(null, false, { message: "Invalid password." });
      }
      return done(null, user);
    });
  };

  const authenticateGoogleUser = async (
    accessToken,
    refreshToken,
    profile,
    done
  ) => {
    UserSchema.findOne({ googleId: profile.id }, (err, existingUser) => {
      if (err) {
        return done(err);
      }

      if (existingUser) {
        return done(null, existingUser);
      }

      try {
        const newUser = new UserSchema({
          googleId: profile.id,
          name: profile.displayName
        });

        newUser.save((err) => {
          if (err) {
            return done(err);
          }

          return done(null, newUser);
        });
      } catch (err) {
        return done(err);
      }
    });
  };

  passport.use(
    new LocalStrategy({ usernameField: "name" }, authenticateLocalUser)
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
      },
      authenticateGoogleUser
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    UserSchema.findById(id, (err, user) => {
      done(err, user);
    });
  });
}

module.exports = initialize;
