const mongoose = require('mongoose');
const StatisticsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    completedTasks: { type: Number, default: 0 }, // 📌 Tamamlanan görev sayısı
    totalTasks: { type: Number, default: 0 }, // 📌 Toplam görev sayısı
    categoryCompletion: { type: Map, of: Number, default: new Map() },
    weeklyProgress: [Number],
    currentStreak: { type: Number, default: 0 },
    pendingTasks: { type: Number, default: 0 },
    completionRate: { type: Number, default: 0 },
    categoryDistribution: { type: Map, of: Number, default: new Map() },
    updatedAt: { type: Date, default: Date.now },



});
module.exports=mongoose.model('Statistics',StatisticsSchema);