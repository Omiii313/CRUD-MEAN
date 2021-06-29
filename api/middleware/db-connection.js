
const mongoose = require('mongoose');

const connect = () => {
    mongoose
        .connect('mongodb://' + process.env.DATABASE_HOST + ':' + process.env.DATABASE_PORT + '/' + process.env.DATABASE_NAME, {
            auto_reconnect: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        .then(() => {
            console.log('Mongo Connected');
        })
        .catch(() => console.log('Mongo connection Failed'));
};

module.exports = {
    connect: connect
};