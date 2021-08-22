import express, { Express, Request, Response } from "express";
import { Pool } from "pg";

export const createGame = (req: Request, res: Response, pool: Pool) => {
  const game: Game = req.body;
  if (
    !game.blueTeam ||
    !game.redTeam ||
    !game.gameTime ||
    game.redScore < 0 ||
    game.blueScore < 0
  ) {
    return res.sendStatus(400);
  }
  pool.query(
    `INSERT INTO games(blue_team, red_team, game_time, red_score, blue_score)
      Values($1, $2, $3, $4, $5)
      RETURNING *`,
    [game.blueTeam, game.redTeam, game.gameTime, game.redScore, game.blueScore],
    (error, response) => {
      if (error) {
        console.log(error);
        return res.sendStatus(500);
      }
      console.log("Inserted game", game);
      return res.status(200).json(response.rows);
    }
  );
};

export const getGames = (req: Request, res: Response, pool: Pool) => {
  pool.query(`SELECT * from games`, (error, response) => {
    if (error) {
      console.log(error);
      return res.sendStatus(500);
    }
    return res.status(200).json(response.rows);
  });
};

export const getGamesByTeam = (req: Request, res: Response, pool: Pool) => {
  const teamId = req.params.id;
  pool.query(
    `SELECT * from games 
    WHERE blue_team=$1 or red_team=$1`,
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
