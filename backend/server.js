require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const port = process.env.port || 4000;

const authorsRouter = require("./routes/authors");
const booksRouter = require("./routes/books");
const addBookRouter = require("./routes/addBook");
const deleteBookRouter = require("./routes/delete");
const viewRouter = require("./routes/view");
const authRoute = require("./routes/Auth")

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
});const cors = require('cors'); 

app.use(cors({credentials: true, origin: 'http://localhost:3001'}));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use("/", authRoute)

app.use("/authors", authorsRouter);
app.use("/books", booksRouter);
app.use("/addBook", addBookRouter);
app.use("/delete", deleteBookRouter);
app.use("/view", viewRouter);

app.listen(port, () => {
  console.log(`Application listening on ${port}`);
});
