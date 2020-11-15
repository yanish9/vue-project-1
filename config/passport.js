var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var db = require("../models");

var configAuth = require('./auth');

// Telling passport we want to use a Local Strategy.
// In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
    // Our user will sign in using an email, rather than a "username"
    {
        usernameField: "email_address"
    },
    function(email_address, password, done) {

        console.log("login check")
        

        // When a user tries to sign in this code runs
        db.User.findOne({
            where: {
                email_address: email_address
            }
        }).then(function(dbUser) {
            // If there's no user with the given email

            if (!dbUser) {
                return done(null, false, {
                    message: "Incorrect email."
                });
            }
            // If there is a user with the given email, but the password
            // the user gives us is incorrect
            else if (!dbUser.validPassword(password)) {
                return done(null, false, {
                    message: "Incorrect password."
                });
            }
            // If none of the above, return the user
            return done(null, dbUser);
        }).catch(function(e) {
  console.log(e);
});
    }
));


passport.use(new GoogleStrategy({

        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL,

    },
    function(token, refreshToken, profile, done) {

        // make the code asynchronous
        // Member.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {

            // try to find the user based on their google id

            db.User.findOne({
                    where: { email: profile.emails[0].value }
                }).then(function(user, err) {

                    if (err)
                        return done(err);

                    if (user) {

                        // if a user is found, log them in
                        return done(null, user);
                    } else {

                        if (err)
                            return done(err);

                        if (user) {

                            // if a user is found, log them in
                            return done(null, user);
                        } else {
                            db.User.create({
                                username: "",
                                first_name: "",
                                last_name: "",
                                email: profile.emails[0].value,
                                password: ""
                            }).then(function(data) {
                              return done(null, data);
                            }).catch(function(err) {
                                //res.json(err);
                            });
                        }
                        // save the user

                    }


                })
                // save the user

        });

    }));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
