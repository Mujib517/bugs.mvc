const userCtrl = require('../controllers/user.ctrl');
const session = require('express-session');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

//dependency Injection
function Auth(app) {

    var configure = function () {

        //authentication config
        app.use(session({ secret: 'pwd' }));
        app.use(passport.initialize());
        app.use(passport.session());


        passport.serializeUser(function (email, done) {
            done(null, email);
        });

        passport.deserializeUser(function (email, done) {
            done(null, email);
        });


        passport.use('local-login', new Strategy({
            usernameField: 'email',
            passwordField: 'password'
        }, function (email, password, done) {
            userCtrl.validate(email, password, done);
        }));
    }

    return {
        configure: configure
    }
}


module.exports = Auth;