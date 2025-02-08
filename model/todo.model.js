const mongoose = require('mongoose');
const TodoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 📌 Kullanıcıya ait görev

    title: { type: String, required: true },
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Category",  // 📌 Kategori artık ayrı bir koleksiyon!
        required: true 
    },
    dueDate: { type: Date },
    time: { type: String },

    notes: { type: String },
    isCompleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Todo', TodoSchema);
