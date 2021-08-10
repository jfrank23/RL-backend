import express, { Express, query, Request, Response } from "express";
import { Pool } from "pg";

export const createStat = (req: Request, res: Response, pool: Pool) => {
  const stat: Stat = req.body;
  if (
    !stat.gameId ||
    !stat.playerId ||
    !stat.teamId ||
    stat.goals < 0 ||
    stat.assists < 0 ||
    stat.saves < 0 ||
    stat.shots < 0
  ) {
    return res.sendStatus(400);
  }
  pool.query(
    `INSERT INTO stats(game_id, team_id, player_id, goals, assists, saves, shots)
    values($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`,
    [
      stat.gameId,
      stat.teamId,
      stat.playerId,
      stat.goals,
      stat.assists,
      stat.saves,
      stat.shots,
    ],
    (error, response) => {
      if (error) {
        console.log(error);
        return res.sendStatus(500);
      }
      console.log("Inserted stats", stat);
      return res.sendStatus(200);
    }
  );
};

export const getStats = (req: Request, res: Response, pool: Pool) => {
  pool.query(`SELECT * from stats`, (error, response) => {
    if (error) {
      console.log(error);
      return res.sendStatus(500);
    }
    return res.status(200).json(response.rows);
  });
};

export const getStatsByPlayer = (req: Request, res: Response, pool: Pool) => {
  const playerId = req.params.id;
  pool.query(
    `SELECT * from stats
  WHERE player_id = $1`,
    [playerId],
    (error, response) => {
      if (error) {
        console.log(error);
        return res.sendStatus(500);
      }
      return res.status(200).json(response.rows);
    }
  );
};

export const getStatsByTeam = (req: Request, res: Response, pool: Pool) => {
  const teamId = req.params.id;
  pool.query(
    `SELECT * from stats
  WHERE team_id = $1`,
    [teamId],
    (error, response) => {
      if (error) {
        console.log(error);
        return res.sendStatus(500);
      }
      return res.status(200).json(response.rows);
    }
  );
};

export const getStatsByGame = (req: Request, res: Response, pool: Pool) => {
  const gameId = req.params.id;
  pool.query(
    `SELECT * from stats
  WHERE game_id = $1`,
    [gameId],
    (error, response) => {
      if (error) {
        console.log(error);
        return res.sendStatus(500);
      }
      return res.status(200).json(response.rows);
    }
  );
};
