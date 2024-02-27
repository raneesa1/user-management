const mongoose = require('mongoose');

const { Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,

    },
    phoneNumber: {
        type: Number
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        default: "user"
    },
    profileImage: {
        type: String
    }
})

module.exports = mongoose.model('User', userSchema);