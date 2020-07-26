var mongoose = require("mongoose");
var encrypt = require('mongoose-encryption');
// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now()
//     }

// });


// module.exports = mongoose.model("User", userSchema);;

const userSchema = new mongoose.Schema( {
    
    email : String,
    password :String,
    name :String
})

const secret = "Thisisourlittlesecret"
userSchema.plugin(encrypt, {secret : secret, encryptedFields : ['password']});

const User = new mongoose.model("User",userSchema);