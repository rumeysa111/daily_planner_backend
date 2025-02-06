const mongoose = require('mongoose');
const TodoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 📌 Kullanıcıya ait görev

    title: { type: String, required: true },
    category: { type: String, default: "General" },
    dueDate: { type: Date },
    time: { type: String },
    reminder: { type: Date },
    color: { type: String, default: "#000000" }, // Varsayılan siyah renk
    notes: { type: String },
    isCompleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Todo', TodoSchema);
