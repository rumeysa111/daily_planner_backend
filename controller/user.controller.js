const userService = require('../services/user.services');
// 📌 Kullanıcı kayıt
const registerUser = async (req, res) => {
    try {
        const result = await userService.registerUser(req.body.username, req.body.email, req.body.password);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 📌 Kullanıcı giriş yapma
const loginUser = async (req, res) => {
    try {
        const result = await userService.loginUser(req.body.email, req.body.password);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 📌 Kullanıcı bilgilerini al
const getUserProfile = async (req, res) => {
    try {
        const user = await userService.getUserProfile(req.user.userId);
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile
};