const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    name: { type: String, required: true }, 
    icon: { type: String, required: true }, 
    color: { type: String, default: "#000000" }, 
});
CategorySchema.index({ userId: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('Category', CategorySchema);
