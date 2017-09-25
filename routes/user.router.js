const express = require("express");
const router = express.Router();
const userCtrl = require('../controllers/user.ctrl');

router.get('/login', userCtrl.login);
//router.post('/login', userCtrl.validate);


module.exports = router;