const mongoose = require('mongoose');

let bugSchema = new mongoose.Schema({
    name: String,
    category: String,
    description: String,
    lastModified: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Bug", bugSchema);
