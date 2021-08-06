import express, { Express, Request, Response } from "express";
import pg from "pg";
import { createGame, getGames } from "./queries/GamesQueries";
import {
  addPlayer,
  getPlayer,
  getPlayers,
  updatePlayer,
} from "./queries/PlayerQueries";
import { createRank, getRanks } from "./queries/RankQueries";
import { createStat, getStats } from "./queries/StatQueries";
import { createTeam, getTeams } from "./queries/TeamsQueries";

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
  addPlayer(req, res, pool);
});

app.put("/players", (req: Request, res: Response) => {
  updatePlayer(req, res, pool);
});

app.get("/players", (req: Request, res: Response) => {
  getPlayers(req, res, pool);
});

app.get("/players/:id", (req: Request, res: Response) => {
  getPlayer(req, res, pool);
});

app.post("/games", (req: Request, res: Response) => {
  createGame(req, res, pool);
});

app.get("/games", (req: Request, res: Response) => {
  getGames(req, res, pool);
});

//TODO /games DELETE, search by teams involved

app.post("/ranks", (req: Request, res: Response) => {
  createRank(req, res, pool);
});

app.get("/ranks", (req: Request, res: Response) => {
  getRanks(req, res, pool);
});

//TODO /ranks DELETE, search by team

app.post("/stats", (req: Request, res: Response) => {
  createStat(req, res, pool);
});

//TODO /stats DELETE, search by player, team

app.get("/stats", (req: Request, res: Response) => {
  getStats(req, res, pool);
});

app.post("/teams", (req: Request, res: Response) => {
  createTeam(req, res, pool);
});

app.get("/teams", (req: Request, res: Response) => {
  getTeams(req, res, pool);
});

app.listen(PORT, () => console.log(`Running on ${PORT}`));
