const User = require('../models/user.model');

module.exports = {

    //GET user/login
    login: function (req, res) {
        //login.hbs
        res.render("pages/login");
    },

    //POST user/login
    validate: function (req, res) {

        User.findOne({ email: req.body.email, password: req.body.password })
            .exec()
            .then(function (user) {
                if (user) {
                    //localhost:3000/bugs
                    res.redirect("/bugs");
                }
                else {
                    res.locals.errMsg = "Wrong username or password";
                    res.redirect("/user/login");
                }
            })
            .catch(function () {
                res.redirect("/user/login");
            });


    }
}