const express = require('express');
const {createTodo, getTodos, updateTodo, deleteTodo,getTodosByDate} = require('../controller/todo.controller');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// 📌 Görev CRUD İşlemleri
router.post('/', authMiddleware, createTodo);
router.get('/', authMiddleware, getTodos);
router.put('/:id', authMiddleware, updateTodo);
router.delete('/:id', authMiddleware, deleteTodo);
router.get('/by-date', authMiddleware, getTodosByDate);


module.exports = router;
