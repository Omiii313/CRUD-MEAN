const express = require('express');
const router = express.Router();
const imageUpload = require('../controllers/imageUploadController');
var upload = require('../middleware/file-upload');

router.post('/upload', upload.single('data'), imageUpload.upload);

module.exports = router;