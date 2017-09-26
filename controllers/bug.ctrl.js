const Bug = require('../models/bug.model');
const Comment = require('../models/comment.model');
const moment = require("moment");

module.exports = {

    get: function (req, res) {
        Bug.find()
            .sort("-lastModified")
            .exec()
            .then(function (bugs) {

                var jsonBugs = [];

                bugs.forEach(function (element) {
                    var jsonElem = element.toJSON();
                    jsonElem.lastModified = moment(jsonElem.lastModified).format('MMMM Do YYYY');
                    jsonBugs.push(jsonElem);
                });

                res.render("pages/bugs", { bugs: jsonBugs });
            })
            .catch(function (err) {
                res.render("pages/error");
            });
    },

    getById: function (req, res) {
        Bug.findById(req.params.id, function (err, bug) {
            if (bug) {
                Comment.find({ bugId: bug._id })
                    .sort("-lastUpdated")
                    .exec()
                    .then(function (comments) {
                        var jsonBug = bug.toJSON();
                        jsonBug.comments = comments;
                        res.render("pages/bug-detail", { bug: jsonBug });
                    })
                    .catch(function (err) {
                        console.log(err);
                        res.status(500);
                        res.render("pages/error");
                    })

            }
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


    },

    saveComment: function (req, res) {

        var comment = new Comment(req.body);
        comment.save(function (err, comment) {

            if (!err) {
                res.redirect("/bugs/" + req.body.bugId);
            }
        });
    }
}