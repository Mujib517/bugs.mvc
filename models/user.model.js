const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    email: { type: String, required: true,unique:true },
    password: { type: String, required: true },
    active: { type: Boolean, default: true },
    lastUpdated: {type:Date,default:Date.now()}
});


module.exports = mongoose.model("User", userSchema);