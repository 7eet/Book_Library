const mongoose = require('mongoose');
const { Schema } = mongoose;

const authorSchema = new Schema({
  _id: String,
  name:  String,
  bookCount: Number,
  books: Array,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Author", authorSchema);