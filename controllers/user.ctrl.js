const User = require('../models/user.model');

module.exports = {

    //GET user/login
    login: function (req, res) {
        //login.hbs
        res.render("pages/login");
    },

    //POST user/login
    validate: function (email, password, done) {

        User.findOne({ email: email, password: password })
            .exec()
            .then(function (user) {
                if (user) done(null, user);
                else done("wrong username or password");
            })
            .catch(function () {
                res.redirect("/user/login");
            });


    }
}