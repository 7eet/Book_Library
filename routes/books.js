const express = require("express");
const router = express.Router();
const Book = require("../models/book");

router.get("/", async (req, res) => {
  let bookData = await Book.find();
  if (bookData.length <= 0) {
    bookData = null;
  }
  res.render("books.pug", { title: "Books", data: bookData });
});

module.exports = router;
