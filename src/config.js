const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/TODOIST");

connect.then(() => {
    console.log('Database connected');
})
.catch(() => {
    console.log("Cannot connect DataBase");
})

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dailyGoal: {
        type: Number,
        default: 5,
        required: false
    },
    tasks: {
        type: Array,
        required: false
    },
    projects: {
        type: Array,
        required: false
    },
    labels: {
        type: Array,
        required: false
    }
});

const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;