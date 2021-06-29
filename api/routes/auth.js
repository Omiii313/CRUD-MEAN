const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

router.post('/registration', authController.registration);
router.post('/login', authController.login);
router.post('/socialLogin', authController.socialLogin);
router.post('/logout', authController.logout);
module.exports = router;