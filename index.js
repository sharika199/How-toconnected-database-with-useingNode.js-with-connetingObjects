const express = require("express");
const app = express();
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
let db = null;
let dbPath = path.join(__dirname, "goodreads.db");
const ini = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("sever Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error:${e.message}`);
    process.exit(1);
  }
};
ini();

app.get("/books/", async (request, response) => {
  const getBooks = `
        SELECT * FORM book ORDER BY book_id;
    `;
  const ges = await db.all(getBooks);
  response.send(ges);
});
