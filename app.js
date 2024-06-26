const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");
const authRouter = require("./backend/routers/authRouter");
const pagesRouter = require("./backend/routers/pagesRouter");
const taskRouter = require("./backend/routers/taskRouter");
const projectRouter = require("./backend/routers/projectRouter");
const labelRouter = require("./backend/routers/labelRouter");
const dailyGoalRouter = require("./backend/routers/dailyGoalRouter");
const userRouter = require("./backend/routers/userRouter");
const notificationRouter = require("./backend/routers/notificationRouter");

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
    session({
        secret: "ksjklflkdflhh",
        resave: false,
        saveUninitialized: true,
    })
);

app.set("view engine", "ejs");

app.use("/auth", authRouter);
app.use("/", pagesRouter);
app.use("/task", taskRouter);
app.use("/project", projectRouter);
app.use("/label", labelRouter);
app.use("/dailyGoal", dailyGoalRouter);
app.use("/user", userRouter);
app.use("/notification", notificationRouter);

const start = async () => {
    try {
        try {
            await mongoose.connect("mongodb://localhost:27017/TODOIST");
            console.log("Database connected");
        } catch (error) {
            console.error("Cannot connect to database:", error);
        }
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
};

start();
