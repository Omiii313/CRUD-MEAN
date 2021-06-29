const Images = require('../models/image-upload');
const requestHandler = require('../middleware/request-handler');
const upload = async (req, res) => {
    try {
        if (req.file) {
            let image = new Images({
                name: req.file.originalName,
                path: req.file.path
            });
            const data = await image.save();
            return requestHandler.handleResponse({ statusCode: 200, res: res, data: { link: process.env.HOST + ':' + process.env.PORT + '/' + req.file.path }, msg: 'Image Uploaded Successfully!!' });
        } else {
            requestHandler.handleError({ res: res, err: 'Choose Proper File !' });
        }
    } catch (error) {
        requestHandler.handleError({ res: res, err: error });
    }
};

module.exports = { upload };