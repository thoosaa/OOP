const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require("./config");

const PORT = 5000;
let login = false;
const app = express();

let user = {
    username: "", 
    password: "",
};

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render("login");
})

app.get('/login', (req, res) => {
    res.render("login");
})

app.get('/signup', (req, res) => {
    res.render("signup");
})

app.get('/userData', (req, res) => {
    res.json({ username: user.username, password: user.password });
})

app.get('/inbox', (req, res) => {
    if (login) {
        res.render("inbox");
    }
    else {
        res.redirect("login");
    }
})

app.get('/today', (req, res) => {
    if (login) {
        res.render("today");
    }
    else {
        res.redirect("login");
    }
})

app.post('/signup', async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    }

    const existingUser = await collection.findOne({ name: data.name });

    if (existingUser) {
        res.send("another one");
    }
    else {
        const hashedPassword = await bcrypt.hash(data.password, 7);

        data.password = hashedPassword;

        const userData = await collection.insertMany(data);
        //console.log(userData);

        //login succesfully show on page
        res.redirect("login");
    }

    
})

app.post('/login', async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            res.send("user cannot find");
        }

        const passwordMatch = await bcrypt.compare(req.body.password, check.password);
        if (passwordMatch) {
            login = true;
            user.username = req.body.username;
            user.password = req.body.password;
            res.redirect("inbox");
        }
        else {
            res.send("wrong password"); //
        }
    }
    catch {
        res.send("wrong"); //
    }
})

app.post('/addTask', async (req, res) => {
    console.log(req.body);
    collection.updateOne({name: user.username},{
        $push: {
          tasks: req.body
        }
      }).exec();
})

app.post('/addProject', async (req, res) => {
    console.log(req.body);
    collection.updateOne({name: user.username},{
        $push: {
          projects: req.body
        }
      }).exec();
})

app.post('/addLabel', async (req, res) => {
    console.log(req.body);
    collection.updateOne({name: user.username},{
        $push: {
          labels: req.body
        }
      }).exec();
})

app.get('/getTasks', async (req, res) => {
    const check = await collection.findOne({ name: user.username });
    res.json(check.tasks);
})

app.get('/getProjects', async (req, res) => {
    const check = await collection.findOne({ name: user.username });
    res.json(check.projects);
})

app.get('/getLabels', async (req, res) => {
    const check = await collection.findOne({ name: user.username });
    res.json(check.labels);
})

app.post('/updateTask', async (req, res) => {
    console.log(req.body);
    const taskName = req.body["oldObject"].name;
    await collection.updateOne(
        { name: user.username, "tasks.name": taskName },
        {
          $set: {
            "tasks.$": req.body["newObject"]
          }
        }
      );
})

app.listen(PORT, () => {
    console.log('Server running on port 5000')
})