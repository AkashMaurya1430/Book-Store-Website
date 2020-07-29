var express = require('express');
var app = express();
var path = require("path");
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var Book = require('./modal/book');
// const user = require("./routes/user");
const InitiateMongoServer = require("./config/db");
const User = require('./modal/User');
const { realpath } = require('fs');
var userData = {};


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


// app.get('/readbook', (req, res) => {
//     res.render('book');
// })

app.get('/login', (req, res) => {
    res.render('login')
});

app.get("/Home", function (req, res) {
    User.findOne({
        email: userData.email
    }).then((user, err) => {
        // console.log(user);
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
                                Book.find({}).then((allbooks, err) => {
                                    // console.log(allbooks);
                                    res.render("Home", {
                                        userData: user,
                                        booker: book,
                                        Fantasybooks,
                                        Horrorbooks,
                                        Romancebooks,
                                        ScienceFictionbooks,
                                        Mysterybooks,
                                        allbooks
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

});


app.get("/Adventure", function (req, res) {
    User.findOne({
        email: userData.email
    }).then((user, err) => {
        Book.find({ category: "Adventure" }).then((book, err) => {
            // console.log(book);
            res.render("Adventure", {
                booker: book,
                userData: user
            })
        })
    })
})

app.get("/Horror", function (req, res) {
    User.findOne({
        email: userData.email
    }).then((user, err) => {
        Book.find({ category: "Horror" }).then((book, err) => {
            // console.log(book);
            res.render("Horror", {
                booker: book,
                userData: user
            })
        })
    })
})

app.get("/Fantasy", function (req, res) {
    User.findOne({
        email: userData.email
    }).then((user, err) => {
        Book.find({ category: "Fantasy" }).then((book, err) => {
            // console.log(book);
            res.render("Fantasy", {
                booker: book,
                userData: user
            })
        })
    })
})

app.get("/Mystery", function (req, res) {
    User.findOne({
        email: userData.email
    }).then((user, err) => {
        Book.find({ category: "Mystery" }).then((book, err) => {
            // console.log(book);
            res.render("Mystery", {
                booker: book,
                userData: user
            })
        })
    })
})

app.get("/Romance", function (req, res) {
    User.findOne({
        email: userData.email
    }).then((user, err) => {
        Book.find({ category: "Romance" }).then((book, err) => {
            // console.log(book);
            res.render("Romance", {
                booker: book,
                userData: user
            })
        })
    })
})


app.get("/ScienceFiction", function (req, res) {
    User.findOne({
        email: userData.email
    }).then((user, err) => {
        Book.find({ category: "ScienceFiction" }).then((book, err) => {
            // console.log(book);
            res.render("ScienceFiction", {
                booker: book,
                userData: user
            })
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


app.get("/login", function (req, res) {
    res.render("login")
    userData = {}
})

app.get("/signUp", function (req, res) {
    res.render("signup")
})


app.post("/signup", function (req, res) {
    const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
    });
    User.findOne({ email: req.body.email }).then((req, res) => {
        res.redirect("login")
        return (console.log("User already Exist"))
    });
    newUser.save(function (err) {
        if (err) {
            console.log(err);

        } else {
            res.redirect("Home")
            userData = newUser;
        }
    });
})

app.post("/login", function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }, function (err, foundUser) {
        if (err) {
            console.log(err);

        } else {
            if (foundUser) {
                if (foundUser.password === password) {
                    res.redirect("Home");
                    userData = foundUser;
                }
            }
        }
    })
})

let port = (process.env.PORT || '3000')

app.listen(port, process.env.IP, function () {
    console.log("server is running");
});


app.post('/uploadbook', function (req, res) {
    let bookInfo = req.body;
    let chapterNames = req.body.chapterName;
    console.log(chapterNames.length);
    let storys = req.body.story;
    let chapters = [];
    let author = userData.name;
    let i = 0;
    if (chapterNames.length === 1) {
        chapters.push({ chapterName: chapterNames[i], story: storys[i] });
    } else {
        req.body.chapterName.forEach(element => {
            chapters.push({ chapterName: chapterNames[i], story: storys[i] });
            i++;
        });
    }
    // console.log("Book Data", req.body);
    const book = new Book({
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        Price: req.body.Price,
        imageUrl: req.body.imageUrl,
        author: author,
        chapter: chapters
    });
    book.save(function (err) {
        if (!err) {
            res.redirect('Home');
            console.log("Book Added ");
        } else {
            console.log(err);
        }
    })
});


app.get('/readbook', function (req, res) {
    var id = req.query.id;
    Book.findOne({ _id: id }).then((book, err) => {
        // console.log(book);
        res.render("book", {
            book: book
        })
    })
});

app.post('/buy', function (req, res) {
    var id = req.query.id;
    console.log(id);
    Book.findByIdAndUpdate({ _id: id }, { $push: { ownedBy: [userData._id] } }).then((book, err) => {
        res.redirect("Home");
        console.log("Bought");
    })
});

// Book.findByAndUpdate({ Price: { $gt: 0 } }, { $addFields: { ownedBy: mongoose.Schema.ObjectId } });
