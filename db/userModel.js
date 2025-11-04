const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: { type: String },
    image: { type: String },
    url: { type: String },
    song: { type: String },
});

module.exports = mongoose.model.Users || mongoose.model("Users", userSchema);
