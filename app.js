var express = require('express');
var app = express();
var path = require("path");
// var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var Book = require('./modal/book');
const user = require("./routes/user");
const InitiateMongoServer = require("./config/db");
const User = require('./modal/User');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'js')));
app.use(bodyParser.urlencoded({ extended: true }));

// Initiate Mongo Server
InitiateMongoServer();

// view engine setup
app.set("view engine", "ejs");

// Middleware
app.use(bodyParser.json());


app.get("/addbook", function (req, res) {
    res.render("index")
})


app.get('/readbook', (req, res) => {
    res.render('book');
})

app.get('/login', (req, res) => {
    res.render('login')
});

app.get("/home", function (req, res) {
    Book.find({ category: "Adventure" }).then((book, err) => {
        // console.log(book);
        Book.find({ category: "Fantasy" }).then((Fantasybooks, err) => {
            // console.log(Fantasybooks);
            Book.find({ category: "Horror" }).then((Horrorbooks, err) => {
                // console.log(Horrorbooks);
                Book.find({ category: "Romance" }).then((Romancebooks, err) => {
                    // console.log(Romancebooks);
                    Book.find({ category: "ScienceFiction" }).then((ScienceFictionbooks, err) => {
                        // console.log(ScienceFictionbooks);
                        Book.find({ category: "Mystery" }).then((Mysterybooks, err) => {
                            // console.log(Mysterybooks);
                            res.render("Home", {
                                // name : book.name,
                                // author : book.author,
                                // category : book.category,
                                // description : book.description,
                                // pages : book.pages,
                                // imageUrl : book.imageUrl  
                                booker: book,
                                Fantasybooks,
                                Horrorbooks,
                                Romancebooks,
                                ScienceFictionbooks,
                                Mysterybooks


                            });
                        });
                    });
                });
            });
        });
    });

});


app.get("/Adventure", function (req, res) {
    Book.find({ category: "Adventure" }).then((book, err) => {
        // console.log(book);
        res.render("Adventure", {
            booker: book
        })
    })
})

app.get("/Horror", function (req, res) {
    Book.find({ category: "Horror" }).then((book, err) => {
        // console.log(book);
        res.render("Horror", {
            booker: book
        })
    })
})

app.get("/Fantasy", function (req, res) {
    Book.find({ category: "Fantasy" }).then((book, err) => {
        // console.log(book);
        res.render("Fantasy", {
            booker: book
        })
    })
})

app.get("/Mystery", function (req, res) {
    Book.find({ category: "Mystery" }).then((book, err) => {
        // console.log(book);
        res.render("Mystery", {
            booker: book
        })
    })
})

app.get("/Romance", function (req, res) {
    Book.find({ category: "Romance" }).then((book, err) => {
        // console.log(book);
        res.render("Romance", {
            booker: book
        })
    })
})


app.get("/ScienceFiction", function (req, res) {
    Book.find({ category: "ScienceFiction" }).then((book, err) => {
        // console.log(book);
        res.render("ScienceFiction", {
            booker: book
        })
    })
})

app.get("/free", function (req, res) {
    Book.find({ Price: "Free" }).then((book, err) => {
        // console.log(book);
        res.render("free", {
            booker: book
        })
    })
})

app.get("/Paid", function (req, res) {
    Book.find({ Price: "Paid" }).then((book, err) => {
        // console.log(book);
        res.render("Paid", {
            booker: book
        })
    })
})


let port = (process.env.PORT || '3000')

app.listen(port, process.env.IP, function () {
    console.log("server is running");
});



// const book = new Book({

//     name: "Akash",
//     category: "Fictional",
//     // author: "akash",
//     description: "kuch nahi",
//     review: "mast hai",
//     imageUrl: "abhi nahi hai",
//     cost: "Free",
//     chapter: [
//         {
//             name: "chap 1",
//             story: " 11111111"
//         },
//         {
//             name: "chap 2",
//             story: " 222"
//         }
//     ]

// });
// book.save();
