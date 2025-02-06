const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controller/user.controller');
const authMiddleware = require('../middleware/authMiddleware');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

// 📌 Kullanıcı işlemleri
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user', authMiddleware, getUserProfile);

module.exports = router;