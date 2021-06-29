const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const requestHandler = require('../middleware/request-handler');

const registration = async (req, res) => {
    try {
        const user = await User.findOne({ userName: req.body.userName });
        if (!user) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            let user = new User({
                userName: req.body.userName,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: hashedPassword,
                type: 'normalUser'
            });
            const data = await user.save();
            return requestHandler.handleResponse({ statusCode: 200, res: res, data: true, msg: 'User Added Successfully!!' });
        } else {
            return requestHandler.handleResponse({ statusCode: 422, res: res, data: true, msg: 'UserName already exists!!' });
        }
    } catch (error) {
        return requestHandler.handleError({ res: res, err: error });
    }
};

const login = async (req, res) => {
    try {
        const user = await User.findOne({ userName: req.body.userName });
        if (user) {
            let result = await bcrypt.compare(req.body.password, user.password);
            if (result) {
                let token = jwt.sign({ userName: req.body.userName }, process.env.APP_SECRET, { expiresIn: '1h' });
                const tokenUpdated = await updateToken(res, user._id, token);
                user.token = token;
                delete user.password;
                return requestHandler.handleResponse({ statusCode: 200, res: res, data: user, msg: 'Login Successfully!!' });
            } else {
                return requestHandler.handleError({ res: res, err: 'Password Mismatch !!' });
            }
        }
        else {
            return requestHandler.handleError({ res: res, err: 'UserName is Incorrect !!' });
        }
    } catch (error) {
        return requestHandler.handleError({ res: res, err: error });
    }
};

const socialLogin = async (req, res) => {
    try {
        const user = await User.findOne({ socialId: req.body.socialId });
        let token = jwt.sign({ userName: req.body.userName }, process.env.APP_SECRET, { expiresIn: '1h' });
        if (!user) {
            let user = new User({
                userName: req.body.userName,
                socialId: req.body.socialId,
                type: 'normalUser',
                token
            });
            user.token = token;
            const data = await user.save();
            return requestHandler.handleResponse({ statusCode: 200, res: res, data: user, msg: 'USer Added SuccessFully !!' });
        } else {
            if (user.socialId === req.body.socialId) {
                const tokenUpdated = await updateToken(res, user._id, token);
                user.token = token;
                delete user.password;
                return requestHandler.handleResponse({ statusCode: 200, res: res, data: user, msg: 'Login Successfully!!' });
            } else {
                return requestHandler.handleResponse({ statusCode: 403, res: res, data: user, msg: 'Authentication Failed!!' });
            }
        }
    } catch (error) {
        return requestHandler.handleError({ res: res, err: error });
    }
};

const logout = async (req, res) => {
    try {
        const user = await User.findOne({ userName: req.body.userName });
        if (user) {
            if (user.token) {
                const tokenUpdated = await updateToken(res, user._id, undefined);
            }
            if (req.user) {
                delete req.user;
            }
            return requestHandler.handleResponse({ statusCode: 200, res: res, data: {}, msg: 'Logout Successfully!!' });
        } else {
            return requestHandler.handleError({ res: res, err: 'UserName is Incorrect !!' });
        }
    } catch (error) {
        return requestHandler.handleError({ res: res, err: error });
    }
};

const get = async (userName, fieldName = '_id') => {
    const data = await User.findOne({
        [fieldName]: `${userName}`,
    });
    return data;
};

const getQuery = (id) => {
    let query = {};
    if (id) {
        query._id = mongoose.Types.ObjectId(id);
    }
    return query;
};

const updateToken = async (res, id, token) => {
    try {
        const query = getQuery(id);
        const data = await User.findOneAndUpdate(query, { token: token });
        return data;
    } catch (error) {
        return requestHandler.handleError({ res: res, err: error });
    }
};

module.exports = { registration, login, get, logout, socialLogin };