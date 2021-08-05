import express, { Express, query, Request, Response } from "express";
import { Pool } from "pg";

export const createStat = (req: Request, res: Response, pool: Pool) => {
  const stat:Stat = req.body;
  pool.query(
    `INSERT INTO stats(game_id, team_id, player_id, goals, assists, saves, shots)
    values($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`,
    [stat.gameId,stat.teamId,stat.playerId, stat.goals,stat.assists, stat.saves,stat.shots],
    (error, response) => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      }
      console.log("Inserted stats", stat);
      res.sendStatus(200);
    }
  );
};

export const getStats = (req: Request, res: Response, pool: Pool) => {
  pool.query(
    `SELECT * from stats`,
    (error, response) => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      }
      res.sendStatus(200).json(response.rows);
    }
  );
};