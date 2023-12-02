const express = require("express");
const router = express.Router();
const Author = require("../models/author");

router.get("/", async (req, res) => {
  let authorData = await Author.find({});
  if (authorData.length <= 0) {
    authorData = null;
  }
  res.json({success: true, message: "success", authors: authorData});
})

module.exports = router;