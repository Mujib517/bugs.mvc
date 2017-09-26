const express = require("express");
const router = express.Router();
const userCtrl = require('../controllers/user.ctrl');
const passport = require('passport');

router.get('/login', userCtrl.login);
router.post('/login', passport.authenticate('local-login', { successRedirect: '/bugs', failureRedirect: '/user/login' }));
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect("/user/login");
});




module.exports = router;