const Bug = require('../models/bug.model');

module.exports = {

    get: function (req, res) {
        Bug.find()
            .exec()
            .then(function (bugs) {
                res.render("pages/bugs", { bugs: bugs });
            })
            .catch(function (err) {
                console.log(err);
                //res.render("pages/error");
            });
    },

    getById: function (req, res) {
        Bug.findById(req.params.id, function (err, bug) {
            if (!err) res.render("pages/bug-detail", { bug: bug });
            else res.render("pages/error");
        });
    },

    new: function (req, res) {
        res.render("pages/new");
    },

    save: function (req, res) {

        var bug = new Bug(req.body);

        bug.save(function (err, bug) {
            if (!err) res.redirect("/bugs");
            else res.render("/pages/error");
        });


    }
}