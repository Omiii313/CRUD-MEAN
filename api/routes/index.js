const express = require('express');
const router = express.Router();
const auth = require('./auth');
const post = require('./post');
const imageUpload = require('./image-upload');
const authenticate = require('../middleware/authCheck');

router.use(authenticate);

router.use('/auth', auth);
router.use('/image', imageUpload);
router.use('/post', post);

module.exports = router;


