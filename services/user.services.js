const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const Category = require("../model/category_model"); // Eklediğiniz kısım

const bcrypt = require("bcrypt");
const defaultCategories = require("../config/defaultCategories");
// 📌 Kullanıcı kayıt işlemi + Varsayılan kategoriler
const registerUser = async (username, email, password) => {
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) throw new Error("Bu e-posta zaten kullanımda!");

        const newUser = new User({ username, email, password });
        await newUser.save();

        // 📌 Kullanıcı oluşturulduktan sonra varsayılan kategorileri ekleyelim
        const categoriesToInsert = defaultCategories.map(category => ({
            userId: newUser._id,
            name: category.name,
            icon: category.icon,
            color: category.color,
        }));

        await Category.insertMany(categoriesToInsert);
        console.log("✅ Kullanıcı başarıyla kaydedildi ve varsayılan kategoriler eklendi!");
        //kullanıcın varsayılan kategorileirni geçerli_category_id
        const userCategories=await Category.find({userId:newUser._id});

        return { 
            message: "Kullanıcı başarıyla kaydedildi ve varsayılan kategoriler eklendi!", 
            userId: newUser._id, 
            categories: userCategories // ✅ Kullanıcının varsayılan kategorilerini de döndürüyoruz
        };
    } catch (error) {
        throw new Error(error.message);
    }
};



const loginUser = async (email, password) => {
    try {
        console.log("🟢 Giriş denemesi:", email, password);

        const user = await User.findOne({ email });
        if (!user) {
            console.log("❌ Kullanıcı bulunamadı!");
            throw new Error("Geçersiz e-posta veya şifre!");
        }

        console.log("✅ Kullanıcı bulundu:", user.email);
        console.log("🔵 Hashlenmiş şifre MongoDB’den:", user.password);
        console.log("🟠 Girilen şifre:", password);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("🔴 Karşılaştırma sonucu:", isMatch);

        if (!isMatch) {
            console.log("❌ Şifre yanlış!");
            throw new Error("Geçersiz e-posta veya şifre!");
        }

        console.log("✅ Şifre doğru, giriş başarılı!");
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        const categories = await Category.find({ userId: user._id });

        return { 
            token, 
            userId: user._id ,
            categories
        };
    } catch (error) {
        console.log("⚠️ Hata:", error.message);
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