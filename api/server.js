const express = require('express');
const router = require('./routes/index');
const cors = require('cors');
const logger = require('morgan');
const dbConnection = require('./middleware/db-connection');
require('dotenv').config()

const app = express();

const PORT = process.env.PORT || 8081;

// cors
app.use(cors());

// url encoded
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
// use public of uploads
app.use('/public', express.static('public'));

// logs
app.use(logger('dev'));
// db connection 
dbConnection.connect();
// Routes
app.use('/', router);

app.listen(PORT, () => {
   console.log('server is Running On port ::' + PORT);
});