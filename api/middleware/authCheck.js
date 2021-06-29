const jwt = require('jsonwebtoken');
const auth = require('../controllers/AuthController');
const skipUrls = [
    '/auth/registration',
    '/auth/login',
    '/auth/socialmediaLogin',
    '/uploads'
];
const requestHandler = require('../middleware/request-handler');

const authenticate = async (req, res, next) => {
    let token;
    if (skipUrls.indexOf(req.url) !== -1 || !skipUrls.includes(req.url)) {
        return next();
    }
    if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1];
    }
    try {
        const user = jwt.verify(token, process.env.APP_SECRET);
        req.user = await auth.get(user.userName, 'userName');
        if (!req.user) {
            throw 'Invalid token,No user exists';
        }
        if (req.user.token !== token) {
            throw 'Your login session has expired';
        }
        return next();
    } catch (error) {
        return requestHandler.handleError({ res: res, err: error, statusCode: 401 });
    }
};
module.exports = authenticate;