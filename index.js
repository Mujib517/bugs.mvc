const express = require('express');
const hbs = require('express-hbs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const bugRouter = require('./routes/bug.router');
const userRouter = require('./routes/user.router');
const userCtrl = require('./controllers/user.ctrl');


const app = express();

const port = process.env.PORT | 3000;

app.listen(3000, function () {
    console.log("Running on port ", port);
});

mongoose.connection.openUri("mongodb://admin:admin@ds143744.mlab.com:43744/bugsdb");

app.use(express.static("lib"));
app.use(bodyParser.urlencoded());

app.set('view engine', 'hbs');
app.engine('hbs', hbs.express4({
    defaultLayout: __dirname + "/views/index.hbs",
    layoutsDir: __dirname + "/pages",
    partialsDir: __dirname + "/views/partials"
}));

//authentication config
app.use(session({ secret: 'pwd' }));
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function (email, done) {
    done(null, email);
});

passport.deserializeUser(function (email, done) {
    console.log('deserializing', email);
    done(null, email);
});


passport.use('local-login', new Strategy({
    usernameField: 'email',
    passwordField: 'password'
}, function (email, password, done) {
    userCtrl.validate(email, password, done);
}));



app.get('/', function (req, res) {
    res.render("pages/home", { title: 'Home' });
});

app.get('/about', function (req, res) {
    res.render("pages/about");
});

app.get('/contact', function (req, res) {
    res.render("pages/contact");
});


app.post('/user/login', passport.authenticate('local-login', { successRedirect: '/bugs', failureRedirect: '/user/login' }));

app.post('/user/logout', function (req, res) {
    req.logout();
    req.session.destroy(function () {
        res.render("pages/login");
    });
});
app.use('/user', userRouter);

//authentication middleware
app.use(function (req, res, next) {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) next();
    else res.render("pages/login");
});

app.use(function (req, res, next) {
    res.locals.isLoggedin = true;
    next();
})

app.use(function (req, res, next) {
    res.header('Cache-Control', 'private no-cache,no-store,must-revalidate');
    next();
});

app.use('/bugs', bugRouter);
