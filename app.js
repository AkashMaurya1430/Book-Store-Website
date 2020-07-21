const express = require('express');
const app = express();
const path = require("path");


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'js')));

// view engine setup
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render('homepage');
});

let port = (process.env.PORT || '3000')

app.listen(port, process.env.IP, function () {
    console.log("server is running");
});
