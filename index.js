const express = require('express');
const hbs = require('express-hbs');

const app = express();

const port = process.env.PORT | 3000;

app.listen(3000, function () {
    console.log("Running on port ", port);
});

app.use(express.static("lib"));

app.set('view engine', 'hbs');
app.engine('hbs', hbs.express4({
    defaultLayout: __dirname + "/views/index.hbs",
    layoutsDir: __dirname + "/pages",
    partialsDir: __dirname + "/views/partials"
}));



app.get('/', function (req, res) {
    res.render("pages/home");
});

app.get('/about', function (req, res) {
    res.render("pages/about");
});

app.get('/contact', function (req, res) {
    res.render("pages/contact");
});

app.get('/bugs', function (req, res) {
    res.render("pages/bugs");
});