const mongoose = require("mongoose");

const avengerSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 4,
        maxlength: 20,
        required: true
    },
    birthName: String,
    movies: {
        type: String,
        enum: ["Infinty War", "Endgame", "Iron Man 2", "First Avenger"] //enum validator
    },
    imgUrl: String,
    likeCount: Number,
    deceased: Boolean
});

const Avenger = mongoose.model("Avenger", avengerSchema);

module.exports = Avenger