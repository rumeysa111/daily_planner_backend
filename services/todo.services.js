const Todo=require('../model/todo.model');
// 📌 Yeni görev ekleme
const createTodo = async (userId, todoData) => {
    try {
        const newTodo = new Todo({
            userId,
            ...todoData
        });

        await newTodo.save();
        return newTodo;
    } catch (error) {
        throw new Error("Görev eklenirken hata oluştu!");
    }
};

const getTodos = async (userId) => {
    try {
        return await Todo.find({ userId }); // Sadece userId'ye göre görevleri getir
    } catch (error) {
        throw new Error("Görevler alınırken hata oluştu!");
    }
};

// 📌 Görev Güncelleme
const updateTodo = async (userId, todoId, updateData) => {
    try {
        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: todoId, userId },
            updateData,
            { new: true }
        );
        return updatedTodo;
    } catch (error) {
        throw new Error("Görev güncellenirken hata oluştu!");
    }
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
    deleteTodo
};