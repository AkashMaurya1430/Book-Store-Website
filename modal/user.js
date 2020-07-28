var mongoose = require("mongoose");
var encrypt = require('mongoose-encryption');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    booksOwned: [
        {
            type: String
        }
    ]

});



const secret = "Thisisourlittlesecret"
userSchema.plugin(encrypt, { secret: secret, encryptedFields: ['password'] });

module.exports = mongoose.model("User", userSchema);
// const User = new mongoose.model("User", userSchema);