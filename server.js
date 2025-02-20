const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // front end isteklerini yönetmek için ekliyoruz
const userRoutes = require('./routes/user.router');
const todoRoutes = require('./routes/todoRouters'); // 📌 To-Do rotalarını ekledik
const categoryRoutes = require('./routes/categoryRoutes');
const statisticsRoutes = require('./routes/statistics_routes');

const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); // JSON formatındaki istekleri anlamak için
app.use('/api/auth', userRoutes);
app.use('/api/todos', todoRoutes); // 📌 To-Do rotalarını tanımladık
app.use('/api/categories', categoryRoutes);
app.use('/api/statistics', statisticsRoutes);
connectDB();
app.get('/', (req, res) => {
    res.send('🚀 Sunucu çalışıyor');
});
app.get('/api/health', (req, res) => {
    const dbState = mongoose.connection.readyState;
    const dbStatus = {
        0: "Disconnected",
        1: "Connected",
        2: "Connecting",
        3: "Disconnecting"
    };
    
    res.json({
        server: "🚀 Running",
        database: dbStatus[dbState],
        mongodb: dbState === 1 ? "✅ Connected" : "❌ Not Connected"
    });
});
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`🚀 Sunucu ${port} portunda çalışıyor`));
