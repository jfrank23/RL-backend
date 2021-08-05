import express, { Express, Request, Response } from "express";
import pg from "pg";

const PORT = 3001;
const app: Express = express();
app.use(express.json());

const env = require("../env.json");
const Pool = pg.Pool;
const pool = new Pool(env);
pool.connect().then(function () {
  console.log(`Connected to database ${env.database}`);
});

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Hello from the RL Backend!</h1>");
});

app.post("/players", (req: Request, res: Response) => {
  const player: Player = req.body;
  pool
    .query(
      `INSERT INTO players(first_name, last_name)
    Values($1, $2)
    RETURNING *`,
      [player.firstName, player.lastName]
    )
    .then((response) => {
      console.log("Inserted player", player);
      res.sendStatus(200);
    })
    .catch((response) => {
      console.log("ERROR inserting player");
      res.sendStatus(500);
    });
});

app.put("/players", (req: Request, res: Response) => {
  const player: Player = req.body;
  pool
    .query(
      `UPDATE players
      SET first_name = $1, last_name = $2
      WHERE player_id=$3`,
      [player.firstName, player.lastName,player.id]
    )
    .then((response) => {
      console.log("Updated player", player);
      res.sendStatus(200);
    })
    .catch((response) => {
      console.log("ERROR inserting player");
      res.sendStatus(500);
    });
});

app.get("/players", (req: Request, res: Response) => {
  pool
    .query(`SELECT * FROM players`)
    .then((response) => {
      res.status(200).json(response.rows);
    })
    .catch((response) => {
      res.sendStatus(500);
    });
});

app.get("/players/:id", (req: Request, res: Response) => {
  const playerId = req.params.id;
  pool
    .query(`SELECT * FROM players WHERE player_id = $1`, [playerId])
    .then((response) => {
      res.status(200).json(response.rows[0]);
    })
    .catch((response) => {
      res.sendStatus(500);
    });
});

app.listen(PORT, () => console.log(`Running on ${PORT}`));
