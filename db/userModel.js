const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: { type: String },
    image: { type: String },
    url: { type: String },
    song: { type: String },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model.Users || mongoose.model("Users", userSchema);
