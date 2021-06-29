const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const images = new Schema({
    name: {
        type: String,
    },
    path: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('images', images);
