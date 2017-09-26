const express = require('express');
const hbs = require('express-hbs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const bugRouter = require('./routes/bug.router');
const userRouter = require('./routes/user.router');
const defaultRouter = require('./routes/default.router');
const middlewares = require('./utilities/middlewares');

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

const auth = require('./utilities/auth')(app);
auth.configure();


app.use('/', defaultRouter);
app.use('/user', userRouter);   

//authentication middleware
app.use(middlewares.isAuthenticated);
app.use(middlewares.isLoggedin);
app.use(middlewares.noCache);

app.use('/bugs', bugRouter);
