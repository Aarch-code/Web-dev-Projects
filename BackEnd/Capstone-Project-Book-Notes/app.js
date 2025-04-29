import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import methodOverride from "method-override";
import path from "path";
import { fileURLToPath } from "url";
import booksRouter from "./routes/books.js";

// Setup for ES modules (to resolve __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Database setup
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "bookNotes",
  password: "abc1234",
  port: 5432,
});
db.connect();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Inject db into req
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Routes
app.use("/books", booksRouter);

// Home route
app.get("/", (req, res) => {
  res.redirect("/books");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
