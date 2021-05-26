const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const Author = require("../models/author")
const crypto = require("crypto");


router.get("/", (req, res) => {
  res.render("addBook.pug", {title: "Add Book"});
});

router.post("/", async (req, res) => {
  const {title, author, description} = req.body;

  let bookId = getBookId(title);

  let authorId = getAuthorId(author);

  console.log(`title: ${title} author: ${author} desc: ${description}`);
  console.log(`bookId: ${bookId}  authorId: ${authorId}`)

  let findResult = await Book.find({_id: bookId});

  console.log(`findResult is ${findResult.length}`);

  if (findResult.length > 0) {
    console.log("Book is their returning same page.")
    return res.render("addBook.pug", {title: "Add Book", errorMsg: "Sorry. Book is already there."})
  }


  let authorDetails = {
    _id: authorId,
    name: author
  };

  console.log(`AuthorDetails -> ${authorDetails}`)

  let book = new Book({_id: bookId, title, author: authorDetails, description});
  book.save().then(() => {console.log("Book Saved")}).catch((er) => {console.log(`Error: ${er}`)});


  let findAuthorResult = await Author.find({_id: authorId});
  console.log(`length of findAuthorResult is ${findAuthorResult.length}`);

  if (findAuthorResult.length === 0) {
    let bookArray = [];
    bookArray.push(title);

    let data = new Author({_id: authorId, name: author, bookCount: 1, books: bookArray});
    data.save().then(() => {console.log("New Author Saved Successfully")}).catch((er) => {console.log(`Error on saving Author: ${er}`)});
    return res.redirect("/books");
  }

  console.log(`Found Author ${findAuthorResult[0]}`)

  var bookCountAuthor = findAuthorResult[0].bookCount;
  bookCountAuthor = bookCountAuthor + 1;
  findAuthorResult[0].bookCount = bookCountAuthor;

  findAuthorResult[0].books.push(title);


  findAuthorResult[0].save().then(() => {console.log("Author updated")}).catch((er) => {console.log("error occurred while updating Author")});


  console.log(`Updated Author -> ${findAuthorResult[0]}`);
  res.redirect("/books");
})

function getBookId(title) {
  return crypto.createHash("sha256")
  .update(title)
  .digest("hex");
}

function getAuthorId(name) {
  return crypto.createHash("sha256")
  .update(name)
  .digest("hex");
}

module.exports = router;