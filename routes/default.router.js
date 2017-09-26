
const express = require("express");
const router = express.Router();

router.get('/', function (req, res) {
    res.render("pages/home", { title: 'Home' });
});

router.get('/about', function (req, res) {
    res.render("pages/about");
});

router.get('/contact', function (req, res) {
    res.render("pages/contact");
});


module.exports = router;

