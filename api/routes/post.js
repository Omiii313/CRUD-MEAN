const express = require('express');
const router = express.Router();
const post = require('../controllers/PostController');


router.get('/get/:id?', post.getAll);
router.post('/create', post.create);
router.put('/update', post.update);
router.delete('/remove/:id', post.remove);
router.get('/create/fake', post.fakeCreate);
module.exports = router;