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
    imageUrl: {
        type: String,
        required: true,
    },
    author: {
        type: String,
    }
});



var book = mongoose.model("Book", bookSchema);
module.exports = book;