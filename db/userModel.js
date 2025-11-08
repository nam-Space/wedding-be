const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: { type: String },
    image: { type: String },
    url: { type: String },
    song: { type: String },
    location: { type: String },
    lat: { type: Number },
    lng: { type: Number },
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
