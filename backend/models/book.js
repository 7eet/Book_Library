const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
  _id: String,
  title:  String,
  author: {
    _id: String,
    author: String
  },
  description:   String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Book", bookSchema);