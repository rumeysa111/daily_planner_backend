const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createCategory, getCategories, editCategory, removeCategory } = require('../controller/category_controller');

// Yeni kategori oluşturma
router.post('/', authMiddleware, createCategory);
// Kullanıcının kategorilerini listeleme
router.get('/:id', authMiddleware, getCategories);
// Kategori güncelleme
router.put('/:id', authMiddleware, editCategory);
// Kategori silme
router.delete('/:id', authMiddleware, removeCategory);
module.exports = router;