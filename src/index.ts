import express, { Express, Request, Response } from 'express';
import pg from "pg";

const PORT = 3001;
const app: Express = express();

const env = require("../env.json");
const Pool = pg.Pool;
const pool = new Pool(env);
pool.connect().then(function () {
  console.log(`Connected to database ${env.database}`);
});


app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Hello from the TypeScript world!</h1>');
});

app.listen(PORT, () => console.log(`Running on ${PORT}`));
