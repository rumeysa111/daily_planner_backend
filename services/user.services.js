const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// 📌 Kullanıcı kayıt
const registerUser = async (username, email, password) => {
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) throw new Error("Bu e-posta zaten kullanımda!");

        const newUser = new User({ username, email, password });
        await newUser.save();
        return { message: "Kullanıcı başarıyla kaydedildi!" };
    } catch (error) {
        throw new Error(error.message);
    }
};

// 📌 Kullanıcı giriş yapma
const loginUser = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) throw new Error("Geçersiz e-posta veya şifre!");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Geçersiz e-posta veya şifre!");

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return { token, userId: user._id };
    } catch (error) {
        throw new Error(error.message);
    }
};

// 📌 Kullanıcı bilgilerini al
const getUserProfile = async (userId) => {
    try {
        return await User.findById(userId).select("-password");
    } catch (error) {
        throw new Error("Kullanıcı bulunamadı!");
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile
};