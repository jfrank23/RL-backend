import express, { Express, Request, Response } from "express";
import pg from "pg";
import { createGame, getGames, getGamesByTeam } from "./queries/GamesQueries";
import {
  addPlayer,
  getPlayer,
  getPlayers,
  updatePlayer,
} from "./queries/PlayerQueries";
import {
  createRank,
  getMostRecentRankByTeam,
  getRanks,
  getRanksByTeam,
} from "./queries/RankQueries";
import {
  createStat,
  getStats,
  getStatsByGame,
  getStatsByPlayer,
  getStatsByTeam,
} from "./queries/StatQueries";
import {
  createTeam,
  getSinglePlayersTeams,
  getTeams,
  getTeamsById,
} from "./queries/TeamsQueries";
import cors from "cors";

const PORT = 3001;
const app: Express = express();
app.use(express.json());
app.use(cors());

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
app.get("/games/team/:id", (req: Request, res: Response) => {
  getGamesByTeam(req, res, pool);
});

//TODO /games DELETE, search by teams involved

app.post("/ranks", (req: Request, res: Response) => {
  createRank(req, res, pool);
});

app.get("/ranks", (req: Request, res: Response) => {
  getRanks(req, res, pool);
});

app.get("/ranks/team/:id", (req: Request, res: Response) => {
  getRanksByTeam(req, res, pool);
});

app.get("/ranks/team/recent/:id", (req: Request, res: Response) => {
  getMostRecentRankByTeam(req, res, pool);
});
//TODO /ranks DELETE

app.post("/stats", (req: Request, res: Response) => {
  createStat(req, res, pool);
});

app.get("/stats", (req: Request, res: Response) => {
  getStats(req, res, pool);
});

app.get("/stats/team/:id", (req: Request, res: Response) => {
  getStatsByTeam(req, res, pool);
});

app.get("/stats/player/:id", (req: Request, res: Response) => {
  getStatsByPlayer(req, res, pool);
});

app.get("/stats/game/:id", (req: Request, res: Response) => {
  getStatsByGame(req, res, pool);
});

app.post("/teams", (req: Request, res: Response) => {
  createTeam(req, res, pool);
});

app.get("/teams", (req: Request, res: Response) => {
  getTeams(req, res, pool);
});

app.get("/teams/:id", (req: Request, res: Response) => {
  getTeamsById(req, res, pool);
});
app.get("/teams/player/:id", (req: Request, res: Response) => {
  getSinglePlayersTeams(req, res, pool);
});

app.listen(PORT, () => console.log(`Running on ${PORT}`));
