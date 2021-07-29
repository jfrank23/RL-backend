import express from "express";
import pg from "pg";
const app = express();
app.use(express.json());
const port = 3000;
const hostname = "localhost";

import env from "./env.json";
const Pool = pg.Pool;
const pool = new Pool(env);
pool.connect().then(function () {
  console.log(`Connected to database ${env.database}`);
});

app.listen(port, hostname, () => {
  console.log(`Listening at: http://${hostname}:${port}`);
});