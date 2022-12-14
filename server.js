import express, { json } from "express";

import sqlite3 from "sqlite3";

const app = express();
const sqlite = sqlite3.verbose();

const db = new sqlite.Database("./tinkergram.db", sqlite.OPEN_READWRITE);

app.use(json());

const sql = `
CREATE TABLE if not exists posts (
  id integer primary key AUTOINCREMENT,
  caption varchar(255) not null,
  image varchar(255) not null
);
`;

db.run(sql, (err) => {
  if (err) console.log(err);
});

function addNote(caption, image) {
  const sql = `insert into posts (caption, image) values (?,?)`;
  db.run(sql, [caption, image], (err) => {
    if (err) console.log("addNote error:", err);
  });
}

app.post("/note/new", (req, res) => {
  const { caption, image } = req.body;
  addNote(caption, image);
  return res.json({ status: 200, success: true });
});

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});
