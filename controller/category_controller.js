const categoryService = require("../services/category_services");

// 📌 1. Kullanıcının Kategorilerini Getir (GET)
const getCategories = async (req, res) => {
    try {
        console.log(" Kullanıcının Kategorileri Getiriliyor:", req.params.id);

        const categories = await categoryService.getCategoriesByUser(req.params.id);
        res.json(categories);
    } catch (error) {
        console.log(" Hata:", error.message);

        res.status(500).json({ message: error.message });
    }
};

//  2. Yeni Kategori Ekle (POST)
const createCategory = async (req, res) => {
    try {
        console.log(" Gelen Kategori Verisi:", req.body); // Debug için log ekledik
        const { userId, name, icon, color } = req.body;
        if (!userId) {
            throw new Error("userId eksik! Lütfen userId bilgisini gönderin.");
        }
        const newCategory = await categoryService.addCategory({ userId, name, icon, color });
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 📌 3. Kategoriyi Güncelle (PUT)
const editCategory = async (req, res) => {
    try {
        const { name, icon, color } = req.body; // Değerleri al

        const updatedCategory = await categoryService.updateCategory(req.params.id, {name, icon, color});
        res.json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//  4. Kategoriyi Sil (DELETE)
const removeCategory = async (req, res) => {
    try {
        await categoryService.deleteCategory(req.params.id);
        res.json({ message: "Kategori silindi." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCategories,
    createCategory,
    editCategory,
    removeCategory
};
