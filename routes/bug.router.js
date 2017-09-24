const express = require("express");
const router = express.Router();
const bugCtrl = require('../controllers/bug.ctrl');

router.get('/', bugCtrl.get);
router.get('/new', bugCtrl.new);
router.post('/new', bugCtrl.save);

router.get('/:id', bugCtrl.getById);

router.post('/comments', bugCtrl.saveComment);





module.exports = router;