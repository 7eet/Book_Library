const express = require("express");
const Book = require("../models/book");
const Author = require("../models/author");

const router = express.Router();

router.get("/", async (req, res) => {
  let bookData = await Book.find();
  if (bookData.length <= 0) {
    bookData = null;
  }
  res.render("delete", {title: "Delete Book", data: bookData});
});

router.get("/:bookId", async (req, res) => {

  let bookData = await Book.find({"_id": `${req.params.bookId}`})

  if (bookData.length === 0) {
    return res.redirect("/delete");
  }

  let authorData = await Author.find({"_id": bookData[0].author._id})

  if (authorData[0].bookCount > 1) {
    authorData[0].bookCount = authorData[0].bookCount - 1;
    authorData[0].books = authorData[0].books.filter((value,index,arr) => value != bookData[0].title);
    await authorData[0].save().then(() => {console.log("Updated Author")}).catch((er) => {console.log("Error while updating author")});
    let removeBook = await Book.remove({"_id": `${req.params.bookId}`});
    return res.redirect("/delete");
  }

  let authorRemoved = await Author.remove({"_id": bookData[0].author._id});
  console.log(`removed author`)

  let bookRemoved = await Book.remove({"_id": `${req.params.bookId}`});
  console.log(`removed book`)

  res.redirect("/delete")
});

module.exports = router;