const express = require("express");
const router = express.Router();
const Book = require("../models/book");

router.get("/:bookId", async (req, res) => {
  let book = await Book.findOne({_id: `${req.params.bookId}`})
  console.log(`View ${book}`);
  res.render("books", {title: "View", view: true, data: book});
})

module.exports = router;