const Todo = require('../model/todo.model');
const Category = require('../model/category_model');
// 📌 Yeni görev ekleme
const createTodo = async (userId, todoData) => {
    try {
        const { title, category, dueDate, time, notes } = todoData;

        // 📌 1. Kategori ID'si gerçekten var mı kontrol et
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            throw new Error("Belirtilen kategori bulunamadı!");
        }

        // 📌 2. Yeni görev oluştur
        const newTodo = new Todo({
            userId,
            title,
            category, // ✅ Kategori ID'sini ekledik!
            dueDate,
            time,
            notes,
            isCompleted: false, // Varsayılan olarak tamamlanmamış olacak
        });

        // 📌 3. Kaydettikten sonra, kategori bilgisiyle birlikte döndür
        return await newTodo.save().then(todo => todo.populate("category"));
    } catch (error) {
        throw new Error(error.message);
    }
};
const getTodos = async (userId) => {
    try {
        return await Todo.find({ userId }).populate("category"); // Sadece userId'ye göre görevleri getir
    } catch (error) {
        throw new Error("Görevler alınırken hata oluştu!");
    }
};
const getTodosByDate = async (userId, selectedDate) => {
    try {
        const startOfDay = new Date(selectedDate);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(selectedDate);
        endOfDay.setHours(23, 59, 59, 999);
        return await Todo.find({
            userId,
            dueDate: {
                $gte: startOfDay,
                $lt: endOfDay
            }
        });
    } catch (error) {
        throw new Error("Seçili tarihe göre görevler alınırken hata oluştu!");
        
    }
};

const updateTodo = async (userId, todoId, updateData) => {
    console.log("🔍 Güncellenmek istenen görev ID:", todoId);
    console.log("👤 Güncellenmek istenen kullanıcı ID:", userId);

    // 📌 1. Veritabanında gerçekten o görev var mı kontrol et (userId de eşleşmeli)
    const todo = await Todo.findOne({ _id: todoId, userId });

    if (!todo) {
        console.log("❌ Görev bulunamadı veya kullanıcı yetkisi yok!");
        throw new Error("Görev bulunamadı veya yetkiniz yok!");
    }

    console.log("✅ Görev bulundu, güncelleniyor...");

    // 📌 2. Görevi güncelle ve kategori bilgisini getir
    return await Todo.findOneAndUpdate(
        { _id: todoId, userId },  // 🔥 Kullanıcıya ait olup olmadığını da kontrol ediyoruz
        updateData,
        { new: true }
    ).populate("category"); // ✅ Kategoriyi de getiriyoruz
};


// 📌 Görev Silme
const deleteTodo = async (userId, todoId) => {
    try {
        return await Todo.findOneAndDelete({ _id: todoId, userId });
    } catch (error) {
        throw new Error("Görev silinirken hata oluştu!");
    }
};

module.exports = {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo,
    getTodosByDate,
};