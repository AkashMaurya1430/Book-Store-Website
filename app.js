var express = require('express');
var app = express();
var path = require("path");
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var Book = require('./modal/book');
var User = require('./modal/user');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'js')));
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render('homepage');
});
app.get('/readbook', (req, res) => {
    res.render('book');
})

const MONGODB_URI = "mongodb+srv://Akash3030:Akash3030@book-store.uxbek.mongodb.net/book-store?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

mongoose.connection.on('connected', () => {
    console.log("DB connected");
});

mongoose.connection.on("error", (err) => {
    console.log(err);
});

mongoose.connection.on("disconnected", () => {
    console.log("Disconnected");
});


// Create User
// var akash = new User({
//     name: "Akash",
//     email: "akashmauyra@1212",
//     password: "Pass@123"
// })

// Save User
// akash.save((err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("user saved");
//     }
// })

//Add book
// var book = new Book({
//     name: "Wisdom of the Ancients",
//     category: "Science Fiction",
//     cost: "Free",
//     description: "A possible future in less than 500 words, if plastic wins."
// });

let port = (process.env.PORT || '3000')

app.listen(port, process.env.IP, function () {
    console.log("server is running");
});
