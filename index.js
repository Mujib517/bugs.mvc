const express = require('express');
const hbs = require('express-hbs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const bugRouter = require('./routes/bug.router');
const userRouter = require('./routes/user.router');


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



app.get('/', function (req, res) {
    res.render("pages/home", { title: 'Home' });
});

app.get('/about', function (req, res) {
    res.render("pages/about");
});

app.get('/contact', function (req, res) {
    res.render("pages/contact");
});

app.use('/bugs', bugRouter);
app.use('/user', userRouter);