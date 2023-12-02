const express = require("express");
const router = express.Router();
const Book = require("../models/book");

router.get("/", async (req, res) => {
  let bookData = await Book.find();
  if (bookData.length <= 0) {
    bookData = null;
    return res.json({success: true, message: "No Books are available", books: null});
  }
  bookData.map((e) => {
    e.description = e.description.substring(0,100) + " ...";
    
  })
  res.json({success: true, message: "success", books: bookData});
});


router.get("/:bookId", async (req, res) => {

  let bookData = await Book.find({"_id": `${req.params.bookId}`})

  if (bookData != null) {
    return res.json({success: true,  message: "success", books: bookData});
  }
  res.json({success: true,  message: "No Book", books: null})

  
});

module.exports = router;
