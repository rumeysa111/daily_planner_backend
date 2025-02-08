const todoService = require("../services/todo.services");

// Yeni görev ekleme
const createTodo = async (req, res) => {
    const userId = req.user.userId;
    try {
        const newTodo = await todoService.createTodo(userId, req.body);
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Tüm görevleri listeleme
const getTodos = async (req, res) => {
    const userId = req.user.userId;
    try {
        const todos = await todoService.getTodos(userId);
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getTodosByDate = async (req, res) => {
    const userId = req.user.userId;
    const selectedDate = req.query.date;
    if(!selectedDate){
        return res.status(400).json({message: "Tarih bilgisi eksik!"});
    }
    try {
        const todos = await todoService.getTodosByDate(userId, selectedDate);
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
}
// Görev Güncelleme
const updateTodo = async (req, res) => {
    const userId = req.user.userId;
    const todoId = req.params.id;
    try {
        console.log("📢 Görev güncelleniyor:", todoId);
        console.log("📄 Güncellenmiş Veriler:", req.body);
        const updatedTodo = await todoService.updateTodo(userId, todoId, req.body);
        if (!updatedTodo) {
            return res.status(404).json({ message: "Görev bulunamadı!" });
        }
        res.status(200).json(updatedTodo);
    } catch (error) {
        console.log("⚠️ Hata:", error.message);

        res.status(500).json({ message: error.message });
    }
};

// Görev Silme
const deleteTodo = async (req, res) => {
    const userId = req.user.userId;
    const todoId = req.params.id;
    try {
        const deletedTodo = await todoService.deleteTodo(userId, todoId);
        if (!deletedTodo) {
            return res.status(404).json({ message: "Görev bulunamadı!" });
        }
        res.status(200).json({ message: "Görev başarıyla silindi!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo,
    getTodosByDate,
};