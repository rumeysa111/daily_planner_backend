const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 📌 Kullanıcı bazlı kategori
    name: { type: String, required: true }, // 📌 Kategori adı
    icon: { type: String, required: true }, // 📌 Kategorinin ikonu (örn. "📚", "🎯")
    color: { type: String, default: "#000000" }, // 📌 Varsayılan renk (isteğe bağlı)
});
CategorySchema.index({ userId: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('Category', CategorySchema);
