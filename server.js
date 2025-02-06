const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // front end isteklerini yönetmek için ekliyoruz
const userRoutes = require('./routes/user.router');
const todoRoutes = require('./routes/todoRouters'); // 📌 To-Do rotalarını ekledik
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); // JSON formatındaki istekleri anlamak için
app.use('/api/auth',userRoutes);
app.use('/api/todos', todoRoutes); // 📌 To-Do rotalarını tanımladık

connectDB();
app.get('/', (req, res) => {
    res.send('🚀 Sunucu çalışıyor');
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 Sunucu ${port} portunda çalışıyor`));
