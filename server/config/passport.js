var passport = require('passport'),
    mongoose = require('mongoose'),
    //Using local (db) authentication, no social logons etc
    LocalStrategy = require('passport-local').Strategy,
    User = mongoose.model('User');

//Implement passport interface

module.exports = function () {
    //Tell passport how to authenticate users
    passport.use(new LocalStrategy(
            function (username, password, done) {
                User.findOne({ username: username }).exec(function (err, user) {
                    if (user && user.authenticate(password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                })
            }
        ));
    
    //Serialize the user id to the session (only the id is stored on the session)
    passport.serializeUser(function (user, done) {
        if (user) {
            done(null, user._id);
        }
    });
    
    //Gets user object from mongo (based on the session user id)
    passport.deserializeUser(function (id, done) {
        User.findOne({ _id: id }).exec(function (err, user) {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    })

}