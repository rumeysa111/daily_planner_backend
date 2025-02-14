const express = require('express');
const { registerUser, loginUser, getUserProfile, updateProfile, changePassword } = require('../controller/user.controller');
const authMiddleware = require('../middleware/authMiddleware');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

// 📌 Kullanıcı işlemleri
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user', authMiddleware, getUserProfile);

// Profil güncelleme ve şifre değiştirme route'larını ekleyelim
router.put('/profile', authMiddleware, updateProfile);
router.post('/change-password', authMiddleware, changePassword);

module.exports = router;