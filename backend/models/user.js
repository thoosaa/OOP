const mongoose = require("mongoose");

const User = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    picture: {
        type: String,
        default:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png",
        required: false,
    },
    dailyGoal: { type: Number, default: 5, required: false },
    tasks: { type: Array, required: false },
    projects: { type: Array, required: false },
    labels: { type: Array, required: false },
});

module.exports = mongoose.model("users", User);
