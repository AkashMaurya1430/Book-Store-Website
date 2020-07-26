var mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        text: true,
    },
    category: {
        type: String,
        required: true,
        enum: [
            "Science Fiction",
            "Fantasy",
            "Adventure",
            "Mystery",
            "Romance",
            "Horror"
        ],
    },
    // cost: {
    //     type: String,
    //     required: true,
    //     enum: [
    //         "Paid",
    //         "Free"
    //     ]
    // },
    Price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        text: true,
    },
    chapter: [{
        chapterName: {
            type: String,
            required: true
        },
        story: {
            type: String,
            required: true
        }
    }],
    // pages: {
    //     type: Number,
    //     required: true,
    // },
    imageUrl: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
});

// on every save, add the date
bookSchema.pre('save', function (next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});


var book = mongoose.model("Book", bookSchema);
module.exports = book;