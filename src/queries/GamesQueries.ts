import express, { Express, Request, Response } from "express";
import { Pool } from "pg";

export const createGame = (req: Request, res: Response, pool: Pool) => {
  const game: Game = req.body;
  pool.query(
    `INSERT INTO games(blue_team, red_team, game_time, red_score, blue_score)
      Values($1, $2, $3, $4, $5)
      RETURNING *`,
    [game.blueTeam, game.redTeam, game.gameTime,game.redScore, game.blueScore],
    (error, response) => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      }
      console.log("Inserted game", game);
      res.sendStatus(200).json(response.rows);
    }
  );
};

export const getGames = (req: Request, res: Response, pool: Pool) => {
  pool.query(
    `SELECT * from games`,
    (error, response) => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      }
      res.sendStatus(200).json(response.rows);
    }
  );
};