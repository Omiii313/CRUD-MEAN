const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    token: {
        type: String,
    },
    type: {
        type: String,
        required: true
    },
    socialId: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('user', userSchema);