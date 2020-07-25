app.post("/addbook", function (req, res) {

    const book = new Book({

        name: req.body.postTitle,
        author: req.body.postAuthor,
        category: req.body.postCategory,
        description: req.body.postDescription,
        review: req.body.postReview,
        pages: req.body.postPage,
        imageUrl: req.body.postImageUrl,
        Price: req.body.postPrice

    });
    book.save(function (err) {
        if (!err) {
            res.redirect("/Home");
        } else {
            console.log(err);

        }
    });
});

