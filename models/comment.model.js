const mongoose = require('mongoose');

let comment = {
    bugId: { type: String, required: true },
    name: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    lastUpdated: { type: Date, default: Date.now() }
};


const commentSchema = new mongoose.Schema(comment);

module.exports = mongoose.model("Comment",commentSchema);