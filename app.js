const express = require('express');
const app = express();
const path = require("path");
const mongoose = require('mongoose');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'js')));

// view engine setup
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render('homepage');
});
app.get('/readbook', (req, res) => {
    res.render('book');
})

const MONGODB_URI = "mongodb+srv://Akash3030:Akash3030@book-store.uxbek.mongodb.net/<dbname>?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log("DB connected");
});


let port = (process.env.PORT || '3000')

app.listen(port, process.env.IP, function () {
    console.log("server is running");
});
