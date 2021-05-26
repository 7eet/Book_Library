require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const port = process.env.port || 3000;

const authorsRouter = require("./routes/authors");
const booksRouter = require("./routes/books");
const addBookRouter = require("./routes/addBook");
const deleteBookRouter = require("./routes/delete");
const viewRouter = require("./routes/view");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.log(`Error occurred on DB ${error}`);
});
db.once("open", () => {
  console.log("DB CONNECTED!!!!!!!!");
});

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index", { title: "My Library" });
});

app.use("/authors", authorsRouter);
app.use("/books", booksRouter);
app.use("/addBook", addBookRouter);
app.use("/delete", deleteBookRouter);
app.use("/view", viewRouter);

app.listen(port, () => {
  console.log(`Application listening on ${port}`);
});
