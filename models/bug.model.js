const mongoose = require('mongoose');

let bugSchema = new mongoose.Schema({
    name: String,
    category: String,
    description: String
});

module.exports = mongoose.model("Bug", bugSchema);
