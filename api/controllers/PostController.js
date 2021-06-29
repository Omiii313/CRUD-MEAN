const Post = require('../models/Post');
const mongoose = require('mongoose');
const faker = require('faker');
const requestHandler = require('../middleware/request-handler');
const create = async (req, res) => {
    try {
        let post = new Post({
            title: req.body.title,
            body: req.body.body
        });
        let data = await post.save();
        return requestHandler.handleResponse({ statusCode: 200, res: res, data: data, msg: 'Post Created Successfully!!' });
    } catch (error) {
        requestHandler.handleError({ res: res, err: error });
    }
};

const fakeCreate = async (req, res) => {
    try {
        let data;
        for (var i = 0; i < 50; i++) {
            let post = new Post({
                title: faker.name.title(),
                body: faker.lorem.paragraphs()
            });
            data = await post.save();
        }
        return requestHandler.handleResponse({ statusCode: 200, res: res, data: true, msg: 'Post Created Successfully!!' });
    } catch (error) {
        requestHandler.handleError({ res: res, err: error });
    }
};

const update = async (req, res) => {
    try {
        const query = getQuery(req.body.id);
        await Post.findOneAndUpdate(query, { title: req.body.title, body: req.body.body });
        return requestHandler.handleResponse({ statusCode: 200, res: res, data: true, msg: 'Post Updated Successfully!!' });
    } catch (error) {
        requestHandler.handleError({ res: res, err: error });
    }
};

const remove = async (req, res) => {
    try {
        const query = getQuery(req.params.id);
        await Post.findOneAndDelete(query);
        return requestHandler.handleResponse({ statusCode: 200, res: res, data: true, msg: 'Post Deleted Successfully!!' });
    } catch (error) {
        requestHandler.handleError({ res: res, err: error });
    }
};

const getQuery = (id) => {
    let query = {};
    if (id) {
        query._id = mongoose.Types.ObjectId(id);
    }
    return query;
};

const getAll = async (req, res) => {
    try {
        const query = getQuery(req.params.id);
        let data = await Post.find(query).limit(30);
        if (req.params.id && data && data.length) {
            data = data[0];
        }
        return requestHandler.handleResponse({ statusCode: 200, res: res, data: data, msg: 'Get Post Successfully !!', result: data.length });
    } catch (error) {
        requestHandler.handleError({ res: res, err: error });
    }
};
module.exports = { getAll, create, update, remove, fakeCreate };