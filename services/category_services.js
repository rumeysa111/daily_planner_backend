const Category = require("../model/category_model");
//kullanıcı kargotirelrini getir
const getCategoriesByUser = async (userId) => {
    return await Category.find({ userId });
};

//  Yeni Kategori Ekle (Tüm veriyi tek obje olarak alır)
const addCategory = async (categoryData) => {
    const { userId, name, icon, color } = categoryData;

    // Kullanıcının aynı isimde bir kategorisi var mı?
    const existingCategory = await Category.findOne({ userId, name });
    if (existingCategory) {
        throw new Error("Bu isimde bir kategori zaten mevcut!");
    }

    const newCategory = new Category(categoryData);
    return await newCategory.save();
};

//  Kategoriyi Güncelle (Tek obje alır)
const updateCategory = async (id, updatedData) => {
    return await Category.findByIdAndUpdate(id, updatedData, { new: true });
};

//  Kategoriyi Sil
const deleteCategory = async (id) => {
    return await Category.findByIdAndDelete(id);
};

module.exports = {
    getCategoriesByUser,
    addCategory,
    updateCategory,
    deleteCategory
};